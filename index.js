'use strict';

const koa = require('koa');
const app = koa();
const config = require('config');
const path = require('path');
const fs = require('fs');
const middlewares = fs.readdirSync(path.join(__dirname, 'middlewares')).sort();
const co = require('co');
const moment = require('moment');
const Router = require('koa-router');
const router = new Router();

const connect = require('./db/connect');
const query = require('./db/query');


function getByMonthLimit(offset) {
  let bookers = 0, curentBooker = 0, sum = 0;

  return function* (){
    const db = yield connect();
    const finish = yield query.get(db, 'select * from bookingitems order by id desc limit 1');

    const endTimestamp = finish.end_timestamp * 1000;
    const finishDate = offset ? +moment(endTimestamp).month(moment(endTimestamp).month() - offset) : +endTimestamp;
    const startDate = +moment(finishDate).month(moment(finishDate).month() - 1);

    let queryString = '';
    queryString += 'select bookingitems.locked_total_price ,bookingitems.booking_id, bookings.booker_id from bookingitems ';
    queryString += 'join bookings on bookingitems.booking_id = bookings.id ';
    queryString += `where (start_timestamp >= ${startDate  / 1000} and end_timestamp <= ${finishDate / 1000}) `;
    queryString += `order by bookings.booker_id asc`;

    const rows = yield query.each(db, queryString);
    db.close();

    rows.forEach(row => {
      if (curentBooker < row.booker_id) {
        bookers++;
        curentBooker = row.booker_id;
      }

      sum += row.locked_total_price;
    });

    const turnover = sum / rows.length;

    return {
      month: moment(startDate).format('MMMM YYYY'),
      bookers: bookers,
      bookings: rows.length / bookers,
      turnover: turnover,
      tlv: turnover * 0.1
    }
  }
}

router
  .get('/api/report/:offset', function* () {
    const offset = parseInt(this.params.offset, 10);

    if (offset === NaN) this.throw(404);

    this.body = yield getByMonthLimit(offset);
  })
  .get('/', function* () {
    yield this.render('index.jade', {
      user: 'bat'
    });
  });


middlewares.forEach(middleware => app.use(require('./middlewares/' + middleware)));

app.use(router.routes());

app.listen(config.port, console.log.bind(null, `The server run in port ${config.port}`));


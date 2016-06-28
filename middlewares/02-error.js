'use strict';

module.exports = function* (next) {
  try {
    yield * next;
  } catch (e) { 
    if (e.status) {
      this.status = e.status;
      this.body = e.message;
    } else {
      this.status = 500;
      this.body = {status: 500, message: e.message};
      console.error(e.message, e.stack);
    }
  } 
};
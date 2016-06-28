#!/bin/bash

if [ -e  ./db/deskbookers.db ]; then
  rm ./db/deskbookers.db
fi

touch ./db/deskbookers.db
cat ./db/fixture/database.sql | sqlite3 ./db/deskbookers.db
cat ./db/fixture/data.sql | sqlite3 ./db/deskbookers.db
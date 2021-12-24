var express = require('express');
var router = express.Router();

const connection = require('../connection');

//GET All data
router.get('/', (req, res) => {
  console.log('in list route');
  connection.query('select * from weather_data', (err, results, field) => {
    if (err) {
      console.log(err);
    } else {
      res.status(200).send(results);
    }
  });
});

//GET filter city by delhi or bhubaneshwar
router.get('/filter/:city', (req, res) => {
  const location = req.params.city;
  connection.query(
    'select * from weather_data where city=?',
    [location],
    (err, results, field) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

//GET table sorted by tempreature in ascending or descending order
router.get('/sort/:sortby', (req, res) => {
  const sortby = req.params.sortby;
  if (sortby === 'desc') {
    connection.query(
      `select * from weather_data order by temperature desc`,
      (err, results, field) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      }
    );
  } else {
    connection.query(
      `select * from weather_data order by temperature`,
      (err, results, field) => {
        if (err) {
          console.log(err);
        } else {
          res.status(200).send(results);
        }
      }
    );
  }
});

//Get min and max temperature of a specified date (yyyy-mm-dt)
router.get('/min/:date', (req, res) => {
  const date = req.params.date;
  console.log(typeof date);
  connection.query(
    `select max(temperature) as highesttemperature, min(temperature) as lowesttemperature from weather_data where dt=?`,
    [date],
    (err, results, field) => {
      if (err) {
        console.log(err);
      } else {
        res.status(200).send(results);
      }
    }
  );
});

module.exports = router;

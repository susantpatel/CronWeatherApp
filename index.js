const express = require('express');
const app = express();
const path = require('path');
const hbs = require('hbs');
var cron = require('node-cron');
const axios = require('axios');
var list = require('./routes/dataRetrival.js');

const connection = require('./connection');

const port = 3001;

const publicDirectoryPath = path.join(__dirname, './public');
const viewsPath = path.join(__dirname, './templates/views');

app.set('views', viewsPath);
app.set('view engine', 'hbs');

app.use(express.static(publicDirectoryPath));

app.use(express.json());

app.get('/', (req, res) => {
  res.render('index', {
    title: 'Wather App',
  });
});

app.use('/list', list);

app.listen(port, () => {
  connection.query(
    `CREATE TABLE weather_data(id int not null auto_increment primary key,dt date, city varchar(255), temperature float(2))`,
    (err, results, field) => {
      if (err) {
        console.log(err);
      } else {
        console.log(results);
      }
    }
  );

  cron.schedule('* * * * *', async () => {
    const bhubaneshawarresponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=bhubaneshwar&units=metric&appid=2f5e9a7699ace605d4cbf50f813d7b0b'
    );
    const bhubaneshwartemperature = bhubaneshawarresponse.data.main.temp;
    const delhiresponse = await axios.get(
      'https://api.openweathermap.org/data/2.5/weather?q=delhi&units=metric&appid=2f5e9a7699ace605d4cbf50f813d7b0b'
    );
    const delhitemperature = delhiresponse.data.main.temp;
    connection.query(
      `INSERT INTO weather_data VALUES (default,curdate(),"bhubaneshwar", ${bhubaneshwartemperature})`,
      (err, results, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      }
    );
    connection.query(
      `INSERT INTO weather_data VALUES (default,curdate(),"delhi", ${delhitemperature})`,
      (err, results, field) => {
        if (err) {
          console.log(err);
        } else {
          console.log(results);
        }
      }
    );
    console.log(response.data.main.temp);
  });
});

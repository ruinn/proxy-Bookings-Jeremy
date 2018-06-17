const express = require('express');
const morgan = require('morgan');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors');

const port = process.env.PORT || 3000;
app.use(cors());
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use('/:id', express.static(`${__dirname}/../public`));

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});


//HEADER
app.get('/api/locations/hostels/:id/info', (req, res) => {
  const { id } = req.params;
  axios
  .get(`http://18.191.246.21/api/locations/hostels/${id}/info`)
  .then(response => {
    console.log('eric response:', response);
    return res.send(response.data)})
    .catch(err => {
      console.log('Error:', err);
      res.status(404).json({ Error: err});
    });
  });
  
app.get('/api/locations/:id/info', (req, res) => {
  const { id } = req.params;
  axios
  .get(`http://18.191.246.21/api/locations/${id}/info`)
  .then(response => {
    console.log('eric response:', response);
    return res.send(response.data)})
    .catch(err => {
      console.log('Error:', err);
      res.json({ message: 'Cannot GET /api/locations/:id/info' });
    });
  });
  
  app.get('/api/locations/hostels', (req, res) => {
    const { id } = req.params;
    axios
    .get(`http://18.191.246.21/api/locations/${id}/hostels`)
    .then(response => {
      console.log('eric response:', response);
      return res.send(response.data)})
      .catch(err => {
        console.log('Error:', err);
        res.json({ message: 'Cannot GET /locations/hostels' });
      });
    });
    
    // OVERVIEW
    app.get('/api/overview/:id', (req, res) => {
      const { id } = req.params;
      axios
        .get(`http://54.237.214.214/api/overview/${id}`)
        .then(response => res.send(response.data))
        .catch(err => res.send(`Cannot get /overview/:id, ${err}`));
    });
    app.get('/api/hostels', (req, res) => {
      axios
        .get('http://54.237.214.214/api/hostels')
        .then(response => res.send(response.data))
        .catch(err => res.send(`Cannot get /hostels ${err}`));
    });
    
    app.get('/api/hostels/:id/info', (req, res) => {
      const { id } = req.params;
      axios
        .get(`http://54.237.214.214/api/hostels/${id}/info`)
        .then(response => res.send(response.data))
        .catch(err => res.send(`Cannot get /hostels ${err}`));
    });
    
    
    //BOOKING
    app.get('/api/hostels/:id/reservations', (req, res) => {
      const { id } = req.params;
      axios
        .get(`http://13.57.253.197/api/hostels/${id}/reservations`)
        .then(response => res.send(response.data))
        .catch(err => {
          console.log('Error:', err);
          res.json({ message: 'Cannot GET /api/reviews/overview/id' });
        });
    });

    //REVIEWS
    app.get('/api/reviews/:id/all', (req, res) => {
      const { id } = req.params;
      axios
        .get(`http://54.172.255.74/api/reviews/${id}/all`)
        .then(response => res.send(response.data))
        .catch(err => {
          console.log('Error:', err);
          res.status(404).json({ message: 'Cannot GET /api/reviews/id/all' });
        });
    });
    
    app.get('/api/reviews/overview/:id', (req, res) => {
      const { id } = req.params;
      axios
        .get(`http://54.172.255.74/api/reviews/overview/${id}`)
        .then(response => res.send(response.data))
        .catch(err => {
          console.log('Error:', err);
          res.json({ message: 'Cannot GET /api/reviews/overview/id' });
        });
    });


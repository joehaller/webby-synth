const express = require('express');
const axios = require('axios');
const path = require('path');
let app = express();
let API_KEY = "xdGsw3EkGFRz7gFbkdZfh2hKBUK5J2gtooglva8x";
let sound_url = 'https://freesound.org/apiv2/search/text';
let sample_url = 'https://freesound.org/apiv2/sounds/';

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/sound', (req, res) => {
  let options = {};
  console.log(req.query.query)
  options.params = {};
  options.params.token = API_KEY;
  options.params.query = req.query.query;
  axios.get(sound_url, options)
    .then((data) => {
      res.send(data.data.results);
    })
})

app.get('/sample', (req, res) => {
  let options = {};
  options.params = {
    token: API_KEY
  }
  axios.get(sample_url + req.query.query, options)
    .then((data) => {
      // console.log(data);
      res.send(data.data);
    });
})


let port = 3002;
app.listen(port, function() {
  console.log(`listening on port ${port}, visit http://localhost:${port}`);
});

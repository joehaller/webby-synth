const express = require('express');
const axios = require('axios');
const path = require('path');
let app = express();

app.use(express.static(path.join(__dirname, '../client')));

app.get('/impulse', (req, res) => {
  axios.get("http://reverbjs.org/Library/AbernyteGrainSilo.m4a")
    .then((data) => {
      console.log(data);
      res.send(data.data);
    })
})


let port = 3000;
app.listen(port, function() {
  console.log(`listening on port ${port}, visit http://localhost:${port}`);
});

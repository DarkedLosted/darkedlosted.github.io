const express = require('express');
const cors = require('cors');
const app = express();

app
  .use(cors())
  .use(express.static('./'))
  .get('/', function(req, res) {
      res.sendFile('index.html');
  })
  .listen(8000);

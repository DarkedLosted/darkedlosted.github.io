const express = require('express');
const cors = require('cors');
const app = express();

app
  .use(cors())
  .use(express.static('./'))
  .get('/streams/:path/:source', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })
  .listen(2222);

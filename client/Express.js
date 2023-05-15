const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');

const app = express();

app.use(cors());

app.get('/cosdna', async (req, res) => {
  const query = req.query.query;
  const response = await fetch(`https://cosdna.com/cgi-bin/ingredients.php?query=${query}`);
  const data = await response.text();
  res.send(data);
});

app.listen(3001, () => {
  console.log('Server started on port 3001');
});

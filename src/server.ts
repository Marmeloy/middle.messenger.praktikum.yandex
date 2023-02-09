// @ts-ignore
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// @ts-ignore
app.use(express.static(`${__dirname}./../dist`));

app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, './../dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});

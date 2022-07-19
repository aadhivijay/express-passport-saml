const express = require('express');

const router = require('./router');

const PORT = 3000;

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use((req, res, next) => {
  const { path, method } = req;
  console.log(`${method} ${path}`);
  next();
});
app.use(router);

app.listen(PORT, () => {
  console.log(`App listening in ${PORT}`);
});

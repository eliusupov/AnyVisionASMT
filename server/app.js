const express = require('express');
const bodyParser = require('body-parser');
// initialize our express app
const app = express();

let port = 3000;

app.get('/', (req, res, next) => {
	res.send('<div>Hello!</div>');
	console.log(1123);
});

app.listen(port, () => {
	console.log('Server is up and running ' + port);
});
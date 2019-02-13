const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const pool = require('./modules/pool');
const restaurantRouter = require('./routes/restaurant.router');


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/', restaurantRouter);

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
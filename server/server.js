const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const pool = require('./modules/pool');


app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/restaurant', (req, res) => {
    console.log('/restaurant GET received');
    pool.query(`SELECT * FROM "restaurants"`).then((response) => {
        console.log('Response from DB:', response);
        res.send(response.rows);
    }).catch((error) => {
        console.log('/restaurant GET DB error:', error);
    });
});

app.post('/restaurant', (req, res) => {
    console.log('/restaurant POST received');
    pool.query(`INSERT INTO "restaurants" (name, type) VALUES ($1, $2);`, [req.body.name, req.body.type])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('/restaurant POST error:', error);
        res.sendStatus(500);
    });
});

app.delete('/restaurant', (req, res) => {
    pool.query(`DELETE FROM "restaurant" WHERE "name" = $1;`, [req.body.name])
})

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
});
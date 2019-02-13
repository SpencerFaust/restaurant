const express = require('express');
let app = express();
const bodyParser = require('body-parser');
const PORT = 5000;
const pg = require('pg');

const pool = pg.Pool({
    host: 'localhost',
    port: 5432,
    database: 'restaurant',
    max: 10,
    idleTimeoutMillis: 30000
});

pool.on('connect', () => {
    console.log('PostgreSQL Initialized');
});

pool.on('error', (error) => {
    console.log('PostgreSQL error:', error); 
});

app.use(express.static('server/public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get('/restaurant', (req, res) => {
    console.log('/restaurant GET received');
    pool.query(`SELECT * FROM "restaurant"`).then((response) => {
        console.log('Response from DB:', response);
        res.send(response.rows);
    }).catch((error) => {
        console.log('/restaurant GET DB error:', error);
    });
});

app.post('/restaurant', (req, res) => {
    console.log('/restaurant POST received');
    pool.query(`INSERT INTO "restaurant" (name, type) VALUES ($1, $2);`, [req.body.name, req.body.type])
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
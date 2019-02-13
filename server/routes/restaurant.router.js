const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get('/', (req, res) => {
    console.log('/restaurant GET received');
    pool.query(`SELECT * FROM "restaurants"`).then((response) => {
        console.log('Response from DB:', response);
        res.send(response.rows);
    }).catch((error) => {
        console.log('/restaurant GET DB error:', error);
    });
});

router.post('/', (req, res) => {
    console.log('/restaurant POST received');
    pool.query(`INSERT INTO "restaurants" (name, type) VALUES ($1, $2);`, [req.body.name, req.body.type])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('/restaurant POST error:', error);
        res.sendStatus(500);
    });
});

module.exports = router;
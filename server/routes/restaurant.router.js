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
    pool.query(`INSERT INTO "restaurants" (name, type, rating) VALUES ($1, $2, $3);`, [req.body.name, req.body.type, req.body.rating])
    .then(() => {
        res.sendStatus(201);
    }).catch((error) => {
        console.log('/restaurant POST error:', error);
        res.sendStatus(500);
    });
});

router.delete('/:id', (req, res) => {
    console.log('/restaurant DELETE received');
    pool.query(`DELETE FROM "restaurants" WHERE "id" = $1;`, [req.params.id])
    .then(() => {
        res.sendStatus(204);
    }).catch((error) => {
        console.log('/restaurant DELETE error:', error);
        res.sendStatus(500);
    });
});

module.exports = router;
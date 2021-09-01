const express = require('express');
const { rejectUnauthenticated,} = require ('../modules/authentication-middleware');
const pool = require('../modules/pool');

const router = express.Router();

router.get('/', rejectUnauthenticated, (req, res) => {
    res.sendStatus(200); // because we made it in...?
    let queryString = `SELECT * FROM "secrets"
        WHERE "secrecy_level" <= $1
    `;
    let queryParams = [req.user.clearance_level];
    pool.query(queryString, queryParams).then(dbRes => {
        res.send(dbRes.rows);
    }).catch(error => {
        console.log('failed to retrieve secrets');
        res.sendStatus(500);
    })
});



module.exports = router;
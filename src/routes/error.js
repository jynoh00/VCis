const express = require('express');
const router = express.Router();

//404 error
router.use((req, res) => {
    console.log('error.js Router run : error.ejs[404] render');
    res.status(404).render('error', {
        statusCode: 404,
        message: '페이지를 찾을 수 없습니다.',
    });
});

//others. server error
router.use((req, res) => {
    console.error(err.stack); // error log
    res.status(500).json({error: 'Internal Server Error'});
});

module.exports = router;
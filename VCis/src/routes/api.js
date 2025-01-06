const express = require('express');
const router = express.Router();

router.get('/users', (req, res) => {
    return res.json({message: 'Get all users', a: '123'});
})

module.exports = router;
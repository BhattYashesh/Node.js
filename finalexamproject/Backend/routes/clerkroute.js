const express = require('express')
const route = express.Router()
const { getClerks, addClerk, updateClerk, deleteClerk } = require('../controller/clerk_ctl');

route.get('/getclerks', getClerks);
route.post('/addclerk', addClerk);
route.put('/updateclerk/:id', updateClerk);
route.delete('/deleteclerk/:id', deleteClerk);

module.exports = route

let express = require('express');
let router = express.Router();

let bankController = require('../controller/bankController');

router.get('/', (req, res) => {
    res.redirect('/home');
});

//route to get the Home page
router.get('/home', bankController.getHome);

//route to get all the customers
router.get('/customers', bankController.getCustomers);

//route to get a specific customer
router.get('/customer/:id', bankController.getCustomerById);

//route to get update customers data on successful transaction
router.post('/update', bankController.updateCustomers);

// route to get transaction history
router.get('/history', bankController.transactionHistory);

module.exports = router;
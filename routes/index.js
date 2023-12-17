const express = require('express');
const router = express.Router();

const customerController = require('../controllers/customerController.js');
const productsController = require('../controllers/productsController.js');
const ordersController = require('../controllers/ordersController.js');


module.exports = function() {

    // CUSTOMERS
    
    // Add new customers with POST
    router.post('/customers', customerController.newCustomer);

    // Get all customer
    router.get('/customers', customerController.showCustomers);

    // Show an specific customer
    router.get('/customers/:idCustomer', customerController.showCustomer);

    // Update customer
    router.put('/customers/:idCustomer', customerController.putCustomer);

    // Delete customer
    router.delete('/customers/:idCustomer', customerController.deleteCustomer);

    // PRODUCTS

    // New products
    router.post('/products', 
    productsController.uploadFiles,
    productsController.newProduct);
   
    // Show all products 
    router.get('/products', productsController.showProducts);

    // Show a product by Id
    router.get('/products/:idProduct', productsController.showAProduct);

    // Update products
    router.put('/products/:idProduct',
        productsController.uploadFiles,
        productsController.updateProduct
    );

    // Delete products
    router.delete('/products/:idProduct', productsController.deleteProduct);

    // ORDERS

    // Create order
    router.post('/orders', ordersController.newOrder);

    // Show all orders
    router.get('/orders', ordersController.showOrders);

    // Show order by Id
    router.get('/orders/:idOrder', ordersController.showOrder);

    // Update order
    router.put('/orders/:idOrder', ordersController.updateOrder);

    // Delete order
    router.delete('/orders/:idOrder', ordersController.deleteOrder);
    
    return router;
}
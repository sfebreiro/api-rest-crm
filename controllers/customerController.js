const Customers = require('../models/Customers.js');

// Add new customer
exports.newCustomer = async (req, res, next) => {
    const customer = new Customers(req.body);

    try {
        // Save the record
        await customer.save();
        res.json({message: 'Cliente agregado correctamente'});

    } catch (error) {
        // If error, next
        console.log(error);
        next();
    }
}

// Show all customers
exports.showCustomers = async (req, res, next) => {

    try {
        const customers = await Customers.find({});
        res.json(customers);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Show an specific customer
exports.showCustomer = async (req, res, next) => {
    const customer = await Customers.findById(req.params.idCustomer);

    if (!customer) {
        res.json({message: 'El cliente especificado no existe'});
        return next();
    }

    // Show if all is OK
    res.json(customer);
}

// Update customer by Id
exports.putCustomer = async (req, res, next) => {
    
    try {
        const customer = await Customers.findByIdAndUpdate({_id: req.params.idCustomer}, 
            req.body, {
                new: true
            });
            res.json(customer);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete customer by Id
exports.deleteCustomer = async (req, res, next) => {

    try {
        await Customers.findOneAndDelete({_id: req.params.idCustomer});
        res.json({message: 'Cliente eliminado correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
}


const Orders = require('../models/Orders.js');

// Create order
exports.newOrder = async (req, res, next) => {
    const order = new Orders(req.body);

    try {
        await order.save();
        res.json({message: 'Pedido realizado correctamente'});

    } catch (error) {
        console.log(error);
        next();
    }
}

// Show all orders
exports.showOrders = async (req, res, next) => {
    try {
        const orders = await Orders.find({}).populate('customer').populate({
            path: 'order.product',
            model: 'Products'
        });
        res.json(orders);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Show order by Id
exports.showOrder = async (req, res, next) => {
    const order = await Orders.findById(req.params.idOrder).populate('customer').populate({
        path: 'order.product',
        model: 'Products'
    });

    if (!order) {
        res.json({message: 'Ese pedido no existe'});
        return next();
    }

    res.json(order);
}

// Update order
exports.updateOrder = async (req, res, next) => {
    try {
        let order = await Orders.findOneAndUpdate({_id: req.params.idOrder}, 
            req.body,
            {
                new: true
            })
            .populate('customer')
            .populate({
                path: 'order.product',
                model: 'Products'
            });

            res.json(order);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete order
exports.deleteOrder = async (req, res, next) => {
    try {
        await Orders.findOneAndDelete({_id: req.params.idOrder});
        res.json({message: 'Pedido eliminado correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
}
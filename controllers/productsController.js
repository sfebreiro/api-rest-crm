const Products = require('../models/Products.js');
const multer = require('multer');
const shortId = require('shortid');

const configurationMulter = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, __dirname+'../../uploads/');
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortId.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if ( file.mimetype === 'image/jpeg' ||  file.mimetype ==='image/png' ) {
            cb(null, true);
        } else {
            cb(new Error('Formato no válido'))
        }
    },
}

// Add configuration and field
const upload = multer(configurationMulter).single('image');

// Upload a file
exports.uploadFiles = (req, res, next) => {
    upload(req, res, function(error) {

        if (error) {
            res.json(error);
        }
        return next();
    })
}

// Add new products
exports.newProduct = async (req, res, next) => {
    const product = new Products(req.body);

    try {

        if (req.file.filename) {
            product.image = req.file.filename
        }

        product.save();
        res.json({message: 'Producto añadido correctamente'});

    } catch (error) {
        console.log(error);
        next();
    }
}

// Show all products
exports.showProducts = async (req, res, next) => {
    try {
        const products = await Products.find({});
        res.json(products);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Show a product by Id
exports.showAProduct = async (req, res, next) => {
    const product = await Products.findById(req.params.idProduct);

    if (!product) {
        res.json({message: 'Ese producto no existe'});
        return next();
    }

    res.json(product);
}

// Update product by Id
exports.updateProduct = async (req, res, next) => {
    try {
        
        // Build new product
        let newProduct = req.body;

        // Verify if image exists
        if (req.file) {
            newProduct.image = req.file.filename;
        } else {
            let lastProduct = await Products.findById(req.params.idProduct);
            newProduct.image = lastProduct.image;
        }

        let product = await Products.findOneAndUpdate({_id: req.params.idProduct}, 
            newProduct, 
            {
                new: true
            });

            res.json(product);

    } catch (error) {
        console.log(error);
        next();
    }
}

// Delete product
exports.deleteProduct = async (req, res, next) => {
    try {
        await Products.findOneAndDelete({_id: req.params.idProduct});
        res.json({message: 'Producto eliminado correctamente'});
        
    } catch (error) {
        console.log(error);
        next();
    }
}


var Product = require('../models/product');

//Simple version, without validation or sanitation
exports.test = function (req, res) {
    res.send('Greetings from the Test controller!');
};

exports.product_create = function (req, res, next) {

    // console.log('NAME => ', req.body.name);
    console.log('BODY => ', req.body);

    var product = new Product(
        {
            name: req.body.name,
            price: req.body.price
        }
    );

    product.save(function (err) {
        if (err) {
            return next(err);
        }
        res.send('Product Created successfully')
    })
};

exports.product_details = function (req, res, next) {
    Product.findOne({ name: req.params.name }).exec(function(err, product) {
        if (err) return console.log(err)

        console.log('PRODUCT => ', product)
        res.send(`Product retrieved: ${JSON.stringify(product)}`)
    })
    // Product.findById(req.params.id, function (err, product) {
    //     if (err) return next(err);
    //     res.send(product);
    // })
};

exports.product_update = function (req, res, next) {
    Product.findByIdAndUpdate(req.params.id, {$set: req.body}, function (err, product) {
        if (err) return next(err);
        res.send('Product udpated.');
    });
};

exports.product_delete = function (req, res, next) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) return next(err);
        res.send('Deleted successfully!');
    })
};
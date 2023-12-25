//This is a temporray controller
const Brand = require('../models/brand.Schema');
const Product = require('../models/product.Schema');
const Customer = require('../models/customer.Schema');

//add supplier/brand
exports.add_supplier = async (req, res) => {
    try {
        //creating a new supplier/brand
        const brand = new Brand({
            name: req.body.name,
            products: [],
            followers: req.body.followers,
            image: req.body.image
        });

        //save brand
        await brand.save();
        res.status(201).json({ message: 'Brand created ' + brand.name });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to add brand/suppplier' })
    }
}

//add product
exports.add_Product = async (req, res) => {
    try {
        const brand = await Brand.findById(req.params.id);

        if (!brand) {
            return res.status(404).json({ message: 'Brand not found' })
        }

        console.log(req.body)

        //adding entire product for now
        const product = new Product({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            image: req.body.image,
            categories: req.body.categories,
            options: req.body.options,
            brand: brand._id,
            discount: req.body.discount,
            comments: req.body.comments,
            ratings: req.body.ratings
        })


        //saving new product in database
        const newproduct = await product.save();

        //saving the product to brand
        brand.products.push(newproduct._id);
        await brand.save();

        //sending out notifications
        const newNotification = "New Product Added by " + brand.name + ". Start Shopping";

        //get all follower ids
        const followers = brand.followers;

        //saing notifications with customer
        await Customer.updateMany(
            { _id: { $in: followers } },
            { $push: { notification: newNotification } }
        );

        res.status(201).json({ message: 'New Product added ' + newproduct.name });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to add product' })
    }
}

//get products filtering for search happens here
exports.getProducts = async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = req.query.limit || 10;

        let query = {};

        if (req.query.search) {
            const searchRegex = new RegExp(req.query.search, 'i');
            query = {
                $or: [
                    { name: searchRegex },
                    { brandname: searchRegex },
                    { sport: searchRegex },
                    { categories: searchRegex },
                    { Collection: searchRegex },
                    { gender: searchRegex }
                ],
            };
        }

        if (req.query.priceMin && req.query.priceMax) {
            query.price = { $gte: req.query.priceMin, $lte: req.query.priceMax };
        }

        if (req.query.Collection) {
            query.Collection = req.query.Collection;
        }

        if (req.query.categories) {
            query.categories = req.query.categories;
        }

        if (req.query.sport) {
            query.sport = req.query.sport;
        }

        if (req.query.brandname) {
            query.brandname = req.query.brandname
        }

        if (req.query.gender) {
            query.gender = req.query.gender
        }

        const sortOptions = {};
        if (req.query.sortBy) {
            sortOptions[req.query.sortBy] = req.query.sortOrder === 'desc' ? -1 : 1;
        }

        const products = await Product.find(query)
            .sort(sortOptions)
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();

        res.status(200).json(products);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get products' })
    }
}

//get specific product
exports.getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const response = await Product.findOne({ _id: id })

        if (!response) {
            return res.status(404).json({ message: 'Product Not Found' })
        }

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to find Product' })
    }
}

//getting filters for filter side bar
exports.getFilters = async (req, res) => {
    try {
        const filters = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    genders: { $addToSet: '$gender' },
                    sports: { $addToSet: '$sport' },
                    categories: { $addToSet: '$categories' },
                    brandnames: { $addToSet: '$brandname' },
                    Collections: { $addToSet: '$Collection' },
                    minPrice: { $min: '$price' },
                    maxPrice: { $max: '$price' },
                }
            },
            { $project: { _id: 0 } },
        ]);

        const response = {
            gender: filters.length > 0 ? filters[0].genders : [],
            sports: filters.length > 0 ? filters[0].sports : [],
            categories: filters.length > 0 ? filters.flat(Infinity).map(filter => filter.categories).flat() : [],
            brandnames: filters.length > 0 ? filters[0].brandnames : [],
            Collections: filters.length > 0 ? filters[0].Collections : [],
            minPrice: filters.length > 0 ? filters[0].minPrice : 0,
            maxPrice: filters.length > 0 ? filters[0].maxPrice : 0,
        };

        res.status(200).json(response);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Failed to get Filters' })
    }
}
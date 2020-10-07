const router = require('express').Router();
let Category = require('../models/category.model');

router.route('/').get((req, res) => {
    Category.find({}, (err, categories) => {
        res.status(200).send(categories)
    })
});

router.route('/add').post((req, res) => {
    const category = new Category(req.body)

    category.save((err, doc) => {
        if (err) return res.status(400).send(err);
        res.status(200).json({
            post: true,
            categoryId: doc._id
        })
    })
});

router.route('/delete_category').delete( (req, res) => {
    let id = req.query.id;

    Category.findByIdAndRemove(id, (err, doc) => {
        if (err) return res.status(400).send(err);
        res.json(true)
    })
});

module.exports = router;

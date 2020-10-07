const router = require('express').Router();
const Item = require('../models/item.model');

router.route('/').get((req, res) => {
    Item.find()
        .then(items => res.json(items))
        .catch(err => err.status(400).json('Error : ' + err));
});

router.route('/add').post((req, res) => {
    const name = req.body.name;
    const description = req.body.description;
    const price = Number(req.body.price);
    const size = req.body.size;
    const category = req.body.category;

    const newItem = new Item({
        name,
        description,
        price,
        size,
        category,
    });

    newItem.save()
        .then(() => res.json('Item Added!!'))
        .catch(err => res.status(400).json('Error : ' +err));

});

router.route('/:id').get((req, res) => {
    Item.findById(req.params.id)
        .then(item => res.json(item))
        .catch(err => res.status(400).json('Error :' +err));
});

router.route('/edit/:id').put((req, res, next) => {
    const item = new Item({
        _id : req.params.id,
        name : req.body.name,
        description: req.body.description,
        price: Number(req.body.price),
        size: req.body.size,
        category: req.body.category
    });
    Item.updateOne({_id: req.params.id}, item)
        .then(() => {
            res.status(201).json('Item Updated Successfully!!')
        })
        .catch(err => res.status(400).json('Error : ' +err));
})

router.route('/:id').delete((req, res) => {
    Item.findByIdAndDelete(req.params.id)
        .then(() => res.json('Item Deleted!! '))
        .catch(err => res.status(400).json('Error : ' +err));
});

module.exports = router;

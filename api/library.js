const express = require('express');
const router = express.Router();

// Example data
const libraryItems = [
    { id: 1, title: 'Book 1', author: 'Author 1' },
    { id: 2, title: 'Book 2', author: 'Author 2' },
    { id: 3, title: 'Book 3', author: 'Author 3' },
];

// Get all library items
router.get('/', (req, res) => {
    res.json(libraryItems);
});

// Get a specific library item by id
router.get('/:id', (req, res) => {
    const item = libraryItems.find(i => i.id === parseInt(req.params.id));
    if (item) {
        res.json(item);
    } else {
        res.status(404).send('Library item not found');
    }
});

// Add a new library item
router.post('/', (req, res) => {
    const newItem = {
        id: libraryItems.length + 1,
        title: req.body.title,
        author: req.body.author
    };
    libraryItems.push(newItem);
    res.status(201).json(newItem);
});

module.exports = router;

const express = require('express');
const router = express.Router();

// Example data
const lawyers = [
    { id: 1, name: 'Lawyer 1', specialty: 'Criminal Law' },
    { id: 2, name: 'Lawyer 2', specialty: 'Family Law' },
    { id: 3, name: 'Lawyer 3', specialty: 'Corporate Law' },
];

// Get all lawyers
router.get('/', (req, res) => {
    res.json(lawyers);
});

// Get a specific lawyer by id
router.get('/:id', (req, res) => {
    const lawyer = lawyers.find(l => l.id === parseInt(req.params.id));
    if (lawyer) {
        res.json(lawyer);
    } else {
        res.status(404).send('Lawyer not found');
    }
});

// Add a new lawyer
router.post('/', (req, res) => {
    const newLawyer = {
        id: lawyers.length + 1,
        name: req.body.name,
        specialty: req.body.specialty
    };
    lawyers.push(newLawyer);
    res.status(201).json(newLawyer);
});

module.exports = router;

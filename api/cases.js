const express = require('express');
const router = express.Router();

// Example data
const cases = [
    { id: 1, caseName: 'Case 1', status: 'Open' },
    { id: 2, caseName: 'Case 2', status: 'Closed' },
    { id: 3, caseName: 'Case 3', status: 'Pending' },
];

// Get all cases
router.get('/', (req, res) => {
    res.json(cases);
});

// Get a specific case by id
router.get('/:id', (req, res) => {
    const caseItem = cases.find(c => c.id === parseInt(req.params.id));
    if (caseItem) {
        res.json(caseItem);
    } else {
        res.status(404).send('Case not found');
    }
});

// Add a new case
router.post('/', (req, res) => {
    const newCase = {
        id: cases.length + 1,
        caseName: req.body.caseName,
        status: req.body.status
    };
    cases.push(newCase);
    res.status(201).json(newCase);
});

module.exports = router;

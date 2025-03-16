const express = require('express');
const { createInvoice,getAllInvoices ,getInvoiceById } = require('../controllers/invoiceController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/create', authMiddleware, createInvoice);
// router.get('/:name', authMiddleware, getInvoicesByUser);
router.get('/all', authMiddleware, getAllInvoices);
router.get('/id/:id', authMiddleware, getInvoiceById);


module.exports = router;

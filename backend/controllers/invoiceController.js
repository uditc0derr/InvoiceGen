const Invoice = require('../models/Invoice');
const sendInvoiceEmail = require('../utils/emailService');

// Create an invoice
const createInvoice = async (req, res) => {
    console.log("Received Data:", req.body); // Debugging output

    const { customerName, customerEmail, products, totalAmount } = req.body;
    
    try {
        if (!customerName || !products.length || !totalAmount) {
            return res.status(400).json({ message: "All required fields must be filled" });
        }

        const invoice = await Invoice.create({
            owner: req.user.id,
            customerName,
            customerEmail,
            products,
            totalAmount,
        });

        console.log("Invoice Saved:", invoice); 

        if (customerEmail) {
            await sendInvoiceEmail(customerEmail, 'New Invoice', 'Your invoice details', JSON.stringify(invoice));
        }

        res.status(201).json(invoice);
    } catch (error) {
        console.error("Invoice Creation Error:", error);
        res.status(500).json({ message: "Error creating invoice" });
    }
};


const getInvoicesByUser = async (req, res) => {
    try {
        const invoices = await Invoice.find({ customerName: req.params.name, owner: req.user.id });
        res.status(200).json(invoices);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching invoices' });
    }
};
const getInvoiceById = async (req, res) => {
  try {
    const invoice = await Invoice.findById(req.params.id);
    if (!invoice) {
      return res.status(404).json({ message: "Invoice not found" });
    }
    res.json(invoice);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


const getAllInvoices = async (req, res) => {
    try {
        const invoices = await Invoice.find({ owner: req.user.id }).sort({ createdAt: -1 });;
        res.status(200).json(invoices);
    } catch (error) {
        console.error("Error fetching all invoices:", error);
        res.status(500).json({ message: "Error fetching invoices" });
    }
};

module.exports = { createInvoice, getInvoicesByUser, getAllInvoices ,getInvoiceById};


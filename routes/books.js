const express = require('express');
const router = express.Router();
const Book = require('../models/Book');
const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
    let token;
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, 'secretkey');
            req.user = decoded;
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Not authorized' });
        }
    }
    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
};

router.get('/', async (req, res) => {
    try {
        const books = await Book.find().populate('user', 'username email');
        res.json(books);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
});

router.post('/', protect, async (req, res) => {
    const { title, author, condition, price, image } = req.body;
    try {
        const book = new Book({ title, author, condition, price, image, user: req.user.id });
        await book.save();
        res.status(201).json(book);
    } catch (error) {
        res.status(400).json({ message: 'Error creating book', error });
    }
});

router.put('/:id', protect, async (req, res) => {
    const { title, author, condition, price, image } = req.body;
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        book.title = title;
        book.author = author;
        book.condition = condition;
        book.price = price;
        book.image = image;
        await book.save();
        res.json(book);
    } catch (error) {
        res.status(400).json({ message: 'Error updating book', error });
    }
});

router.delete('/:id', protect, async (req, res) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        if (book.user.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }
        await book.remove();
        res.json({ message: 'Book removed' });
    } catch (error) {
        res.status(400).json({ message: 'Error deleting book', error });
    }
});

module.exports = router;

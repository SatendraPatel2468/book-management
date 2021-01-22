const express = require('express');
const expressAsyncHandler = require('express-async-handler');
const Book = require('../models/book')


const bookRouter = express.Router()


//Create Book
bookRouter.post('/', expressAsyncHandler(async (req, res) => {
    const book = await Book.create(req.body)

    if (book) {
        res.status(200)
        res.json(book)
    } else {
        res.join(500);
        throw new Error('Book creating failed');
    }
}));


//finding Books
bookRouter.get('/', expressAsyncHandler(async (req, res) => {
    const book = await Book.find({})

    if (book) {
        res.status(200)
        res.json(book)
    } else {
        res.join(500);
        throw new Error('Their is no books');
    }
}));


//Update books by id
bookRouter.put('/:id', expressAsyncHandler(async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (book) {
        const updateBook = await Book.findByIdAndUpdate(
            req.params.id,
            req.body, {
            new: true,
            runValidators: true
        });
        res.status(200)
        res.json(updateBook)
    } else {
        res.status(500)
        throw new Error('Update failed')
    }
}));

bookRouter.delete('/:id', expressAsyncHandler(async (req, res) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        res.status(200)
        res.send(book)
    } catch (error) {
        res.json(error)
    }
}))




module.exports = bookRouter
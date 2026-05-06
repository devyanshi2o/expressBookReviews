const express = require('express');
const public_users = express.Router();

const axios = require('axios');
let books = require("./booksdb.js");

// Get all books
public_users.get('/', function (req, res) {
    return res.status(200).json(books);
});

// Get by ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn]);
});

// Get by author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;

    const filteredBooks = Object.keys(books)
        .filter(key => books[key].author === author)
        .reduce((result, key) => {
            result[key] = books[key];
            return result;
        }, {});

    return res.status(200).json(filteredBooks);
});

// Get by title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    const filteredBooks = Object.keys(books)
        .filter(key => books[key].title === title)
        .reduce((result, key) => {
            result[key] = books[key];
            return result;
        }, {});

    return res.status(200).json(filteredBooks);
});

// Get reviews
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;
    return res.status(200).json(books[isbn].reviews);
});

// Task 10
public_users.get('/async/books', async function (req, res) {

    try {

        const response = await axios.get('http://localhost:5000/');

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
});

// Task 11
public_users.get('/promise/isbn/:isbn', function (req, res) {

    const isbn = req.params.isbn;

    axios.get(`http://localhost:5000/isbn/${isbn}`)
        .then(response => {

            return res.status(200).json(response.data);

        })
        .catch(error => {

            return res.status(500).json({
                message: error.message
            });

        });
});

// Task 12
public_users.get('/async/author/:author', async function (req, res) {

    const author = req.params.author;

    try {

        const response = await axios.get(`http://localhost:5000/author/${author}`);

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
});

// Task 13
public_users.get('/async/title/:title', async function (req, res) {

    const title = req.params.title;

    try {

        const response = await axios.get(`http://localhost:5000/title/${title}`);

        return res.status(200).json(response.data);

    } catch (error) {

        return res.status(500).json({
            message: error.message
        });
    }
});

module.exports.general = public_users;

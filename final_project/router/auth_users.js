const express = require('express');
const jwt = require('jsonwebtoken');
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return username && username.length > 0;
};

const authenticatedUser = (username, password) => {
    return users.some(
        (user) => user.username === username && user.password === password
    );
};

// REGISTER NEW USER
regd_users.post("/register", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({
            message: "Unable to register user."
        });
    }

    if (users.find((user) => user.username === username)) {
        return res.status(404).json({
            message: "User already exists!"
        });
    }

    users.push({
        username: username,
        password: password
    });

    return res.status(200).json({
        message: "User successfully registered. Now you can login"
    });
});

// LOGIN REGISTERED USER
regd_users.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if (!username || !password) {
        return res.status(404).json({
            message: "Error logging in"
        });
    }

    if (authenticatedUser(username, password)) {

        let accessToken = jwt.sign(
            {
                data: password
            },
            'access',
            { expiresIn: 60 * 60 }
        );

        req.session.authorization = {
            accessToken,
            username
        };

        return res.status(200).json({
            message: "Login successful!"
        });

    } else {

        return res.status(208).json({
            message: "Invalid Login. Check username and password"
        });
    }
});

// ADD/MODIFY REVIEW
regd_users.put("/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;

    const books = require("./booksdb.js");

    if (books[isbn]) {

        books[isbn].reviews[username] = review;

        return res.status(200).json({
            message: "Review added/modified successfully"
        });

    } else {

        return res.status(404).json({
            message: "Book not found"
        });
    }
});

// DELETE REVIEW
regd_users.delete("/review/:isbn", (req, res) => {

    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    const books = require("./booksdb.js");

    if (books[isbn]) {

        delete books[isbn].reviews[username];

        return res.status(200).json({
            message: `Review for ISBN ${isbn} deleted`
        });

    } else {

        return res.status(404).json({
            message: "Book not found"
        });
    }
});

module.exports.authenticated = regd_users;

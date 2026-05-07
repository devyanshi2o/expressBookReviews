const express = require('express');
const jwt = require('jsonwebtoken');

let users = [];

const regd_users = express.Router();

const isValid = (username) => {
  let userswithsameusername = users.filter(
    (user) => user.username === username
  );

  if (userswithsameusername.length > 0) {
    
    return true;
  } else {
    return false;
  }
};

const authenticatedUser = (username, password) => {

  let validusers = users.filter(
    (user) => user.username === username && user.password === password
  );

  if (validusers.length > 0) {
    return true;
  } else {
    return false;
  }
};

// Register a new user
regd_users.post("/register", (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  if (!username || !password) {
    return res.status(404).json({
      message: "Unable to register user."
    });
  }

  if (isValid(username)) {
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

// Login registered user
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

    return res.status(200).send("Customer successfully logged in.");
  } else {

    return res.status(208).json({
      message: "Invalid Login. Check username and password"
    });

  }

});

// Add or modify a book review
regd_users.put("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;
  const review = req.query.review;

  books[isbn].reviews[req.session.authorization.username] = review;

  return res.status(200).json({
    message: "Review added/modified successfully"
  });

});

// Delete book review added by user
regd_users.delete("/auth/review/:isbn", (req, res) => {

  const isbn = req.params.isbn;

  delete books[isbn].reviews[req.session.authorization.username];

return res.status(200).json({
  message: `Review for ISBN ${isbn} deleted`
});

});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;

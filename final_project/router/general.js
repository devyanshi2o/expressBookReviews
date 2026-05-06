const axios = require('axios');

public_users.get('/async/books', async function (req, res) {
    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data);
});

public_users.get('/async/isbn/:isbn', async function (req, res) {
    const isbn = req.params.isbn;

    const response = await axios.get('http://localhost:5000/');
    return res.status(200).json(response.data[isbn]);
});

public_users.get('/async/author/:author', async function (req, res) {
    const author = req.params.author;

    const response = await axios.get('http://localhost:5000/');

    const filtered = Object.values(response.data).filter(
        (book) => book.author === author
    );

    return res.status(200).json(filtered);
});

public_users.get('/async/title/:title', async function (req, res) {
    const title = req.params.title;

    const response = await axios.get('http://localhost:5000/');

    const filtered = Object.values(response.data).filter(
        (book) => book.title === title
    );

    return res.status(200).json(filtered);
});

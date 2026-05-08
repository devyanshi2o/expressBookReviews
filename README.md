# Book Review Application

A backend Book Review Application built using Node.js and Express.js. This project allows users to browse books, add reviews, update reviews, and manage book-related data through RESTful APIs.

## Features

* User Registration and Login
* Add Book Reviews
* Update and Delete Reviews
* Fetch Book Details
* Search Books by Title or Author
* REST API Architecture
* Express.js Routing
* JSON Data Handling
* Secure Backend Development

## Technologies Used

* Node.js
* Express.js
* JavaScript
* REST APIs
* Postman
* npm

## Project Structure

```bash
book-review-application/
│
├── routes/
├── controllers/
├── middleware/
├── models/
├── public/
├── server.js
├── package.json
└── README.md
```

## Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/book-review-application.git
```

2. Navigate to the project folder:

```bash
cd book-review-application
```

3. Install dependencies:

```bash
npm install
```

4. Start the server:

```bash
npm start
```

Server will run on:

```bash
http://localhost:5000
```

## API Endpoints

### User Routes

| Method | Endpoint  | Description         |
| ------ | --------- | ------------------- |
| POST   | /register | Register a new user |
| POST   | /login    | Login user          |

### Book Routes

| Method | Endpoint          | Description      |
| ------ | ----------------- | ---------------- |
| GET    | /books            | Get all books    |
| GET    | /books/:id        | Get book details |
| POST   | /books/:id/review | Add review       |
| PUT    | /books/:id/review | Update review    |
| DELETE | /books/:id/review | Delete review    |

## Testing

Use Postman or Thunder Client to test all API endpoints.

## Learning Outcomes

* Building REST APIs using Express.js
* Managing backend routes and middleware
* Handling CRUD operations
* Working with JSON data
* Developing scalable backend applications

## Auth

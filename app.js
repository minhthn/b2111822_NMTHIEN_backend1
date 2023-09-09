const express = require('express');
const cors = require('cors');

const contactsRouter = require('./app/routes/contact.route');
const ApiError = require('./app/api-error');

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use('/api/contacts', contactsRouter);

// error handler middlewares
app.use((req, res, next) => {
    return next(new ApiError(404, 'Resource not found'));
});
app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        message: err.message || 'Internal server error'
    });
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello, this is contact book application.' });
});

module.exports = app;

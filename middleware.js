const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

const secretKey = 'your-secret-key';

function authenticateJWT(req, res, next) {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, secretKey, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
            req.user = user;
            next();
        });  
    } else {
        res.sendStatus(401);
    }
}

function authorize(role) {
    return (req, res, next) => {
        const authHeader = res.headers.autorization;

        if (authHeader) {
            const token = authHeader.split('')[1];

            jwt.verify(token, secretKey, (err, user) => {
                if (err) {
                    return res.sendStatus(403);
                }

                if (user.role === role) {
                    req.user = user;
                    next();
                } else {
                    res.sendStatus(403);
                }
            });
        } else {
            res.sendStatus(401);
        }
    };
}

module.exports = { authenticateJWT, authorize };
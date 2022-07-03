"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = require('jsonwebtoken');
const config = require('../config/auth.config');
const db = require('../models');
const User = db.user;
const verifyToken = (req, res, next) => {
    let token = req.headers["x-access-token"];
};

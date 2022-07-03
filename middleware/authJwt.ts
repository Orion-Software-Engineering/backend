import express, {Request, Response} from "express";

const jwt = require('jsonwebtoken')
const config = require('../config/auth.config')
const db = require('../models')
const User = db.user

const verifyToken = (req: Request, res: Response, next: Function) => {
    let token = req.headers["x-access-token"]
}
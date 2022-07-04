import {Request, Response} from "express";

const db = require('../models')
const config = require('../config/auth.config')
const User = db.user
const Role = db.role
const Op = db.Sequelize.Op
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

const SibApiV3Sdk = require('sib-api-v3-sdk'); // sdk for mailing api
const dotenv = require('dotenv');
dotenv.config();


exports.signup = (req: Request, res: Response) => {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    }).then(user => {
        if (req.body.roles) {
            Role.findAll({
                where: {
                    name: {
                        [Op.or]: req.body.roles
                    }
                }
            }).then(roles => {
                user.setRoles(roles).then(() => {
                    res.send({
                        message: "User registered successfully!"
                    })
                })
            })
        } else {
            user.setRoles([1]).then(() => {
                res.send({message: "User registered successfully!"})
            })
        }
    }).catch(err => {
        res.status(500).send({message: err.message})
    })
}

exports.signin = (req: Request, res: Response) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if (!user) {
            return res.status(404).send({message: "User not found"})
        }
        const passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        )
        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password."
            })
        }
        const token = jwt.sign({id: user.id}, config.secret, {
            expiresIn: 5184000
        })
        const authorities = []
        user.getRoles().then(roles => {
            for (let i = 0; i < roles.length; i++) {
                authorities.push("ROLE_" + roles[i].name.toUpperCase())
            }
            res.status(200).send({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: authorities,
                accessToken: token
            })
        })
    }).catch(err => {
        res.status(500).send({
            message: err.message
        })
    })
}

exports.verify = (req: Request, res: Response) => {
    let defaultClient = SibApiV3Sdk.ApiClient.instance;

    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SMTP_API_KEY;

    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    var link = "https://orion-meet.heroku.app/auth/checkUser"

    sendSmtpEmail.subject = "Verify your email address.";
    sendSmtpEmail.htmlContent = "<html><body><h1>Use the link to verify your email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = {"name":"Orion","email":"support@orion.com"};
    sendSmtpEmail.to = [{"email":req.body.email}]; //
    sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"Orion"};
    sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    sendSmtpEmail.params = {"parameter":link,"subject":"New Subject"};

    apiInstance.sendTransacEmail(sendSmtpEmail).then(function(data) {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function(error) {
        console.error(error);
    });
};
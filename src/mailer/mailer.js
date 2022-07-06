/* eslint-disable prettier/prettier */
const SibApiV3Sdk = require('sib-api-v3-sdk');
const dotenv = require('dotenv');


dotenv.config();

exports.sendmail = (email, verificationLink) => {
    const defaultClient = SibApiV3Sdk.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SMTP_API_KEY;
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.subject = 'Verify your email address.';
    sendSmtpEmail.htmlContent = '<html><body><h1>Verify your email with this link:  {{params.parameter}}</h1></body></html>';
    sendSmtpEmail.sender = {'name':'Orion','email':'support@orion.com'};
    sendSmtpEmail.to = [{'email': email}];
    sendSmtpEmail.replyTo = {'email':'replyto@orion.com','name':'orion'};
    sendSmtpEmail.headers = {'Orion-Email-Verification':'unique-id-1234'};

    sendSmtpEmail.params = {'parameter':verificationLink, 'subject':'Verify your E-mail.'};

    apiInstance.sendTransacEmail(sendSmtpEmail).then((data) => {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, (error) => {
        console.error(error);
    });
};

/* eslint-disable prettier/prettier */
const sib = require('sib-api-v3-sdk')

exports.sendmail = (email: string, verificationLink: string) => {
    const defaultClient = sib.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SMTP_API_KEY;
    const apiInstance = new sib.TransactionalEmailsApi();
    const sendSmtpEmail = new sib.SendSmtpEmail();

    sendSmtpEmail.subject = 'Verify your email address.';
    sendSmtpEmail.htmlContent =
        '<html lang="en">' +
        '<body>' +
        '<h1>Verify your email with this link:  {{params.parameter}}</h1>' +
        '</body>' +
        '</html>';
    sendSmtpEmail.sender = {'name': 'Orion', 'email': 'support@orion.com'};
    sendSmtpEmail.to = [{'email': email}];
    sendSmtpEmail.replyTo = {'email': 'replyto@orion.com', 'name': 'orion'};
    sendSmtpEmail.headers = {'Orion-Email-Verification': 'unique-id-1234'};

    sendSmtpEmail.params = {'parameter': verificationLink, 'subject': 'Verify your E-mail.'};

    apiInstance.sendTransacEmail(sendSmtpEmail).then((data: any) => {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, (error: any) => {
        console.error(error);
    });
};

const sib = require('sib-api-v3-sdk')
require('dotenv').config()

export const sendresetmail = (email: string, resetPasswordLink: string) => {
    const defaultClient = sib.ApiClient.instance;
    const apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = process.env.SMTP_API_KEY;
    const apiInstance = new sib.TransactionalEmailsApi();
    const sendSmtpEmail = new sib.SendSmtpEmail();

    sendSmtpEmail.subject = 'Password Reset.';
    sendSmtpEmail.htmlContent =
        '<html lang="en">' +
        '<body>' +
        '<h1>Reset Password.</h1>' +
        '<a href={{params.parameter}}>Click here to Reset Password</a>' +
        '</body>' +
        '</html>';
    sendSmtpEmail.sender = {'name': 'Orion', 'email': 'support@orion.com'};
    sendSmtpEmail.to = [{'email': email}];
    sendSmtpEmail.replyTo = {'email': 'noreply@orion.com', 'name': 'noreply'};
    sendSmtpEmail.headers = {'Orion-Email-Reset': 'unique-id-1234'};

    sendSmtpEmail.params = {'parameter': resetPasswordLink, 'subject': 'Reset Password.'};

    apiInstance.sendTransacEmail(sendSmtpEmail).then((data: any) => {
        console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, (error: any) => {
        console.error(error);
    });
};

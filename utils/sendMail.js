const nodemailer = require('nodemailer');
const sendGridTransport = require('nodemailer-sendgrid-transport');
const config = require('config');
const transporter = nodemailer.createTransport(sendGridTransport({
    // go to settings -> get api keys -> create new 
    auth: {
        api_key: config.get('sendGridKey')
    }
}));

function sendEmail(orderId, customerEmail) {
    return new Promise((resolve, reject) => {
        transporter.sendMail({
            to: config.get('sellerEmail'),
            from: config.get('adminEmail'),
            subject: 'New Order Notification',
            html: `<h1>
            Hi, This is a new order notification.
            </h1>
            <p> 
                OrderId: ${orderId}, Customer email: ${customerEmail}        
            </p>`
        }).then(data => {
            resolve(data);
        }).catch(err => {
            reject(new Error(err));
        });
    })
}

module.exports = sendEmail;
import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();

let mailTransporter = createTransport({
	service: 'gmail',
    host:'smtp.gmail.com',
    port:587,
    secure:false,
    requireTLS:true,
	auth: {
		user: process.env.GMAIL_ID,
		pass: process.env.GMAIL_PASSWORD
	} 
});

let mailDetails = {
	from: 'Aakashsumanpurple3012@gmail.com',
	to: 'Aakashsumanpurple306@gmail.com',
	subject: 'Test mail',
	html: "<h1>email Task done PASSWORD SAVED IN .ENV FILE</h1>"
};

mailTransporter.sendMail(mailDetails, function(err) {
	if(err) {
		console.log('Error Occurs',err);
	} else {
		console.log('Email sent successfully ', mailDetails.html);
	}
});


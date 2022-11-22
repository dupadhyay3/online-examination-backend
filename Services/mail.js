import { createTransport } from 'nodemailer';
import dotenv from 'dotenv';
dotenv.config();




/**
 * Send Email 
 * @param {*} from from Email
 * @param {*} to To Email
 * @param {*} subject Email Subject
 * @param {*} text Email Body
 */
export function sendEmail(from,to, subject,text){

	const mailTransporter = createTransport({
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
	
	const mailDetails = {
		from: from,
		to: to,
		subject: subject,
		text:text 
	};


	
	
	mailTransporter.sendMail(mailDetails, function(err) {
		if(err) {
			console.log('Error Occurs',err);
		} else {
			console.log('Email sent successfully ', mailDetails.text);
		}
	});
}

import nodemailer from 'nodemailer';
import formidable from 'formidable';
import fs from 'fs';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    // Initialize formidable
    const form = formidable({ multiples: true }); // Initialize form, allowing multiple file uploads

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Error parsing the form: ', err);
        return res.status(500).json({ error: 'Error parsing form data' });
      }

      // Extract fields
      const { name, email, mess, budget, service } = fields;
      
      // Format the services field into a readable format
      const servicesSelected = Array.isArray(service) ? service.join(', ') : service;

      // Process file attachments
      const attachments = [];
      if (files.attachments) {
        const filesArray = Array.isArray(files.attachments) ? files.attachments : [files.attachments];
        filesArray.forEach((file) => {
          attachments.push({
            filename: file.originalFilename,
            path: file.filepath,
          });
        });
      }

      // Configure Nodemailer transport
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'siddiquetestemail@gmail.com', // Your email address
          pass: 'kdox juvy mjln unxt', // Your email password
        },
      });

      // Set up email options
      const mailOptions = {
        from: 'siddiquetestemail@gmail.com', // Sender address
        to: 'siddiqueofl@gmail.com', // Recipient address
        subject: 'New Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${mess}\nBudget: ${budget}\nInterested in: ${servicesSelected}`,
        attachments: attachments, // Attachments added to email
      };

      // Send the email
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error('Error sending email: ', error);
          return res.status(500).json({ error: 'Error sending email' });
        }
        res.status(200).json({ message: 'Email sent successfully!' });
      });
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ error: `Method ${req.method} not allowed` });
  }
}

export const config = {
  api: {
    bodyParser: false, // Disables body parsing to handle multipart form data
  },
};

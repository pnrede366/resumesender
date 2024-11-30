const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const path = require('path'); // This helps resolve the path of the attachment file

const app = express();

// Set up body parser to parse incoming form data
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Set up SMTP transporter (using Gmail as an example)
const transporter = nodemailer.createTransport({
    service: 'gmail', // Change this if you're using another email provider
    auth: {
        user: 'pnrede2001@gmail.com', // Replace with your email
        pass: 'yics cjvi xzok nxfb',  // Replace with your email password or app password
    },
});

// Function to send email with attachment
async function sendEmail(toEmail) {
    try {
        const mailOptions = {
            from: 'pnrede2001@gmail.com', // Your email address
            to: toEmail,                  // Recipient email address
            subject: 'Resume For ReactJs Position', // Email subject
            html: `<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Cover Letter</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        margin: 0;
                        padding: 20px;
                        line-height: 1.6;
                    }
                    .content {
                        max-width: 600px;
                        margin: 0 auto;
                    }
                    .header {
                        text-align: center;
                        margin-bottom: 20px;
                    }
                    .footer {
                        margin-top: 20px;
                        text-align: center;
                    }
                </style>
            </head>
            <body>
                <div class="content">
                    <div class="header">
                        <p><strong>Purushottam Rede</strong></p>
                        <p>Phone: +91-8483955960</p>
                        <p>Email: <a href="mailto:pnrede2001@gmail.com">pnrede2001@gmail.com</a></p>
                    </div>
                    
                    <p>Hi,</p>
                    
                    <p>I am writing to express my interest in the Senior Frontend Developer position. With over 4 years of experience in frontend development, particularly with <strong>UI</strong>, <strong>ReactJs</strong>, and <strong>Optimization</strong>, I am confident in my ability to deliver high-quality, user-centric web applications.</p>
                    
                    <p>I am excited about the opportunity to bring my technical expertise and passion for frontend development to your company. I look forward to discussing how I can contribute to your projects.</p>
                    
                    <p>Thank you for your consideration.</p>
                    
                    <p>Sincerely,<br>
                    Purushottam Rede</p>
                    
                    <div class="footer">
                        <p>&copy; 2024 Purushottam Rede</p>
                    </div>
                </div>
            </body>
            </html>
            `,
            attachments: [
                {
                    filename: 'Purushottam Rede_Resume.pdf',  // Name of the file (this can be changed)
                    path: path.resolve(__dirname, 'Purushottam Rede_Resume.pdf'), // Path to the resume file
                }
            ]
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent to:', toEmail);
    } catch (error) {
        console.error('Error sending email to', toEmail, error);
    }
}

// Set up a basic route to serve the HTML form
app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Send Resume</title>
        </head>
        <body>
            <h2>Send Resume for ReactJs Position</h2>
            <form action="/send-email" method="POST">
                <label for="email">Recipient Email:</label><br>
                <input type="email" id="email" name="email" required><br><br>
                <button type="submit">Send Email</button>
            </form>
        </body>
        </html>
    `);
});

// Handle form submission and send email
app.post('/send-email', async (req, res) => {
    const { email } = req.body;  // Get the email from the form
    if (email) {
        await sendEmail(email);
        res.send(`<h2>Email sent to ${email} successfully!</h2><a href="/">Go back</a>`);
    } else {
        res.send('<h2>Failed to send email. Please try again.</h2>');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});

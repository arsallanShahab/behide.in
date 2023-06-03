import nodemailer from 'nodemailer';

let transpoter = nodemailer.createTransport({
  service: 'gmail',
  host: process.env.NEXT_PUBLIC_EMAIL_HOST,
  port: process.env.NEXT_PUBLIC_EMAIL_PORT,
  auth: {
    user: process.env.NEXT_PUBLIC_EMAIL_ID,
    pass: process.env.NEXT_PUBLIC_EMAIL_PASSWORD,
  },
});

export default async function handler(req, res) {
  const { firstName, lastName, email, company, phone, message } = req.body;
  const msg = {
    to: process.env.NEXT_PUBLIC_EMAIL_ID,
    from: `${firstName} ${lastName}`,
    subject: `Bulk & Corporate Enquiry: ${firstName} ${lastName}`,
    text: message,
    html: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Form Submission: Behide.in</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 16px;
            line-height: 1.5;
        }
        .container {
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
        }
        h1 {
            margin-top: 0;
        }
        p {
            margin-bottom: 20px;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-bottom: 20px;
        }
        th, td {
            padding: 10px;
            text-align: left;
            border: 1px solid #ccc;
        }
    </style>
</head>
<body>
    <div class="container">
        <h1>Bulk & Corporate Form Submission: Behide.in</h1>
        <p>${
          firstName + ' ' + lastName
        } has submitted a message via the contact form behide.in . The details are as follows:</p>
        <table>
            <tr>
                <th>Name</th>
                <td>${firstName + ' ' + lastName}</td>
            </tr>
            <tr>
                <th>Email</th>
                <td>${email}</td>
            </tr>
            <tr>
                <th>Company</th>
                <td>${company}</td>
            </tr>
            <tr>
                <th>Phone Number</th>
                <td>${phone}</td>
            </tr>
            <tr>
                <th>Message</th>
                <td>${message}</td>
            </tr>
        </table>
        <p>tag: #bulk-n-corporate</p>
    </div>
</body>
</html>`,
  };
  try {
    const info = await transpoter.sendMail(msg);
    res.status(200).json({
      success: true,
      msg: `Message sent successfully, we will contact you as soon as possible.`,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, msg: 'Error sending email' });
  }
}

import catchAsyncErrors from "../middlewares/catchAsyncErrors";
import nodemailer from 'nodemailer'

const sendEmail = catchAsyncErrors(async (req, res) => {

    const { fullName, email, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW,
        },
    });

    // Create and send the email
    const mailOptions = {
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: email,
        html: `<h1>Message from ${fullName}</h1><div><p>${message}</p></div>`,
    };

    const info = await transporter.sendMail(mailOptions);

    return res.status(200).json({
        success: true,
        info: info,
    });
});

export {
    sendEmail
}
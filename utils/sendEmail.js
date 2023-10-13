import nodemailer from 'nodemailer'

const sendEmail = async options => {

    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.NODEMAILER_EMAIL,
            pass: process.env.NODEMAILER_PW
        }
    });

    const message = {
        from: `${process.env.NODEMAILER_FROM_NAME} < ${process.env.NODEMAILER_FROM_EMAIL}>`,
        to: options.email,
        subject: options.subject,
        text: options.message
    }

    await transporter.sendMail(message)
}

export default sendEmail;
import functions from "firebase-functions";
import admin from "firebase-admin";
import nodemailer from "nodemailer";

admin.initializeApp();

const transporter = nodemailer.createTransport({
    host: functions.config().smtp.host,
    port: Number(functions.config().smtp.port),
    secure: true, // true for 465, false for 587
    auth: {
        user: functions.config().smtp.user,
        pass: functions.config().smtp.pass,
    },
});

export const sendLeadEmail = functions.firestore
    .document("leads/{leadId}")
    .onCreate(async (snap) => {
        const data = snap.data();

        // 📩 Email to YOU
        await transporter.sendMail({
            from: `"Trovina.io" <${functions.config().smtp.user}>`,
            to: "johngospel003@gmail.com",
            subject: `🚀 New Project Lead — ${data.service}`,
            html: `
        <h2>New Project Lead</h2>
        <p><strong>Name:</strong> ${data.name}</p>
        <p><strong>Email:</strong> ${data.email}</p>
        <p><strong>Phone:</strong> ${data.phone}</p>
        <p><strong>Country:</strong> ${data.country}</p>
        <p><strong>Service:</strong> ${data.service}</p>
        <p><strong>Description:</strong></p>
        <p>${data.description}</p>
        <hr />
        <small>Submitted at ${data.createdAt}</small>
      `,
        });

        // 📬 Auto-reply to CLIENT
        await transporter.sendMail({
            from: `"Trovina.io" <${functions.config().smtp.user}>`,
            to: data.email,
            subject: "We received your request 🚀",
            html: `
        <p>Hi ${data.name},</p>

        <p>Thank you for contacting <strong>Trovina.io</strong>.</p>

        <p>We’ve received your request regarding <strong>${data.service}</strong> and will reach out to you shortly.</p>

        <p>
          <a href="https://calendly.com/YOUR_CALENDLY_LINK"
             style="display:inline-block;padding:12px 20px;background:#000;color:#fff;text-decoration:none;border-radius:6px;">
            Book a Call
          </a>
        </p>

        <br />
        <p>— Trovina Team</p>
      `,
        });

        return null;
    });

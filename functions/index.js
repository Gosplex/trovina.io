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


export const sendFreeWebsitePromoEmail = functions.firestore
  .document("free_website_promo/{docId}")
  .onCreate(async (snap) => {
    const data = snap.data();

    const whatsappNumber = "234XXXXXXXXXX"; // 🔴 replace with your WhatsApp Business number

    const whatsappMessage = encodeURIComponent(
      `Hello Trovina 👋

I just applied for the *Free Website Promo*.

Business Name: ${data.businessName}
Name: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Country: ${data.country}
`
    );

    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

    /* ===============================
       📩 EMAIL TO YOU (ADMIN)
    =============================== */
    await transporter.sendMail({
      from: `"Trovina.io" <${functions.config().smtp.user}>`,
      to: "johngospel003@gmail.com",
      subject: "🔥 New Free Website Promo Lead",
      html: `
                <h2>New Free Website Promo Lead</h2>
                <p><strong>Business Name:</strong> ${data.businessName}</p>
                <p><strong>Full Name:</strong> ${data.fullName}</p>
                <p><strong>Email:</strong> ${data.email}</p>
                <p><strong>Phone:</strong> ${data.phone}</p>
                <p><strong>Business Type:</strong> ${data.businessType}</p>
                <p><strong>Has Website:</strong> ${data.hasWebsite}</p>
                <p><strong>Country:</strong> ${data.country}</p>
                <hr />
                <small>Submitted at ${data.createdAt}</small>
            `,
    });

    /* ===============================
       📬 AUTO-REPLY TO CLIENT
    =============================== */
    await transporter.sendMail({
      from: `"Trovina.io" <${functions.config().smtp.user}>`,
      to: data.email,
      subject: "Your Free Website Request Was Received 🚀",
      html: `
                <p>Hi ${data.fullName},</p>

                <p>
                    Thank you for applying for our <strong>Free Website Promo</strong>.
                    We’ve received your details and our team is already reviewing them.
                </p>

                <p>
                    To speed things up, you can message us directly on WhatsApp:
                </p>

                <p>
                    <a href="${whatsappLink}"
                       style="
                         display:inline-block;
                         padding:14px 22px;
                         background:#25D366;
                         color:#fff;
                         text-decoration:none;
                         border-radius:8px;
                         font-weight:bold;
                       ">
                        Chat with Us on WhatsApp
                    </a>
                </p>

                <p style="margin-top:20px;">
                    We’ll respond within <strong>24 hours</strong>.
                </p>

                <p>—<br />Trovina Team</p>
            `,
    });

    return null;
  });

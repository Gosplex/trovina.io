/* eslint-env node */
/* global process */
import { onDocumentCreated } from "firebase-functions/v2/firestore";
import { setGlobalOptions } from "firebase-functions/v2";
import admin from "firebase-admin";
import nodemailer from "nodemailer";

admin.initializeApp();

setGlobalOptions({ region: "us-central1" });


const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// Professional Email Template
const getEmailTemplate = (content) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Trovina.io</title>
</head>
<body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.05);">
          
          <!-- Header with Logo -->
          <tr>
                <td style="background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%); padding: 40px 40px 30px 40px; text-align: center;">
                  
                  <!-- LOGO -->
                  <img
                    src="https://trovina.io/logo.png"
                    alt="Trovina.io"
                    width="140"
                    style="
                      display:block;
                      margin:0 auto 16px auto;
                      max-width:140px;
                      height:auto;
                    "
                  />

                  <!-- Brand Name (fallback + branding) -->
                  <h1 style="margin: 0; color: #ffffff; font-size: 26px; font-weight: 700; letter-spacing: -0.5px;">
                    Trovina<span style="color:#4da3ff;">.io</span>
                  </h1>

                </td>
          </tr>


          <!-- Content -->
          <tr>
            <td style="padding: 40px 40px 20px 40px;">
              ${content}
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding: 20px 40px 40px 40px; border-top: 1px solid #e5e5e5;">
              <p style="margin: 0 0 10px 0; color: #666666; font-size: 13px; line-height: 20px;">
                Best regards,<br>
                <strong style="color: #1a1a1a;">The Trovina Team</strong>
              </p>
              <p style="margin: 15px 0 0 0; color: #999999; font-size: 12px; line-height: 18px;">
                📧 hello@trovina.io | 🌐 <a href="https://trovina.io" style="color: #0066cc; text-decoration: none;">trovina.io</a>
              </p>
            </td>
          </tr>

        </table>

        <!-- Footer Note -->
        <table width="600" cellpadding="0" cellspacing="0" style="margin-top: 20px;">
          <tr>
            <td style="text-align: center; padding: 0 20px;">
              <p style="margin: 0; color: #999999; font-size: 12px; line-height: 18px;">
                © ${new Date().getFullYear()} Trovina Technologies Limited. All rights reserved.
              </p>
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>
</body>
</html>
`;

// Admin Notification Template
const getAdminEmailContent = (data, isFreeWebsite) => {
  if (isFreeWebsite) {
    return `
      <div style="background-color: #f8f9fa; border-left: 4px solid #0066cc; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 20px; font-weight: 600;">
          🔥 New Free Website Lead
        </h2>
        <p style="margin: 0; color: #666666; font-size: 14px;">
          Received: ${new Date().toLocaleString()}
        </p>
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Business Name</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${data.businessName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Person</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${data.fullName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
              <a href="mailto:${data.emailAddress}" style="color: #0066cc; text-decoration: none;">${data.emailAddress}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
              <a href="tel:${data.phoneNumber}" style="color: #0066cc; text-decoration: none;">${data.phoneNumber}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Business Type</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${data.businessType}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Has Website</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
              ${data.hasAWebsite ? '✅ Yes' : '❌ No'}
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Country</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${data.country}</p>
          </td>
        </tr>
      </table>
    `;
  } else {
    return `
      <div style="background-color: #f8f9fa; border-left: 4px solid #0066cc; padding: 20px; border-radius: 4px; margin-bottom: 20px;">
        <h2 style="margin: 0 0 5px 0; color: #1a1a1a; font-size: 20px; font-weight: 600;">
          🚀 New Project Lead
        </h2>
        <p style="margin: 0; color: #666666; font-size: 14px;">
          Received: ${new Date().toLocaleString()}
        </p>
      </div>

      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Contact Name</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${data.fullName}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Email Address</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
              <a href="mailto:${data.emailAddress}" style="color: #0066cc; text-decoration: none;">${data.emailAddress}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Phone Number</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
              <a href="tel:${data.phoneNumber}" style="color: #0066cc; text-decoration: none;">${data.phoneNumber}</a>
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0; border-bottom: 1px solid #e5e5e5;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Interested Service</p>
            <p style="margin: 5px 0 0 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">${data.interestedService}</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 12px 0;">
            <p style="margin: 0; color: #666666; font-size: 13px; text-transform: uppercase; letter-spacing: 0.5px;">Project Description</p>
            <p style="margin: 10px 0 0 0; color: #1a1a1a; font-size: 15px; line-height: 24px;">${data.projectDescription}</p>
          </td>
        </tr>
      </table>
    `;
  }
};

// Client Auto-Reply Template
const getClientEmailContent = (data, isFreeWebsite, whatsappLink = '') => {
  if (isFreeWebsite) {
    return `
      <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
        Hi ${data.fullName}! 👋
      </h2>
      
      <p style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 15px; line-height: 24px;">
        Thank you for applying for our <strong>Free Website Promo</strong>! We're excited to help bring your business online.
      </p>

      <p style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 15px; line-height: 24px;">
        We've received your application for <strong>${data.businessName}</strong> and our team is reviewing the details right now.
      </p>

      <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
          Want to get started faster? Chat with us on WhatsApp:
        </p>
        <a href="${whatsappLink}" style="display: inline-block; background-color: #25D366; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 500; font-size: 15px;">
          💬 Chat on WhatsApp
        </a>
      </div>

      <p style="margin: 24px 0 0 0; color: #666666; font-size: 14px; line-height: 22px;">
        We'll be in touch within 24 hours. In the meantime, feel free to reach out if you have any questions!
      </p>
    `;
  } else {
    return `
      <h2 style="margin: 0 0 20px 0; color: #1a1a1a; font-size: 24px; font-weight: 600;">
        Hi ${data.fullName}! 👋
      </h2>
      
      <p style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 15px; line-height: 24px;">
        Thank you for reaching out to <strong>Trovina.io</strong>! We've received your inquiry about <strong>${data.interestedService}</strong>.
      </p>

      <p style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 15px; line-height: 24px;">
        Our team is reviewing your project details and we'll get back to you within 24 hours with next steps.
      </p>

      <div style="background-color: #f8f9fa; border-radius: 6px; padding: 20px; margin: 24px 0;">
        <p style="margin: 0 0 16px 0; color: #1a1a1a; font-size: 15px; font-weight: 500;">
          Want to discuss your project right away?
        </p>
        <a href="https://calendly.com/YOUR_CALENDLY_LINK" style="display: inline-block; background-color: #1a1a1a; color: #ffffff; text-decoration: none; padding: 14px 28px; border-radius: 6px; font-weight: 500; font-size: 15px;">
          📅 Schedule a Call
        </a>
      </div>

      <p style="margin: 24px 0 0 0; color: #666666; font-size: 14px; line-height: 22px;">
        We're excited to learn more about your project and help bring your vision to life!
      </p>
    `;
  }
};

export const sendLeadEmail = onDocumentCreated(
  "leads/{leadId}",
  async (event) => {
    const data = event.data.data();
    const isFreeWebsite = data.source === "free-website-landing";

    try {
      /* ===============================
         📩 ADMIN NOTIFICATION
      =============================== */
      await transporter.sendMail({
        from: `"Trovina.io" <${process.env.SMTP_USER}>`,
        to: "hello@trovina.io, trovinatechnologieslimited@gmail.com",
        subject: isFreeWebsite
          ? "🔥 New Free Website Lead"
          : "🚀 New Project Lead",
        html: getEmailTemplate(
          getAdminEmailContent(data, isFreeWebsite)
        ),
      });

      /* ===============================
         📬 CLIENT AUTO-REPLY
      =============================== */
      if (isFreeWebsite) {
        const whatsappMessage = encodeURIComponent(
          `Hello Trovina 👋\n\nI just applied for the *Free Website Offer*.\n\nBusiness Name: ${data.businessName}\nName: ${data.fullName}\nEmail: ${data.emailAddress}`
        );

        const whatsappLink = `https://wa.me/2349037248511?text=${whatsappMessage}`;

        await transporter.sendMail({
          from: `"Trovina.io" <${process.env.SMTP_USER}>`,
          to: data.emailAddress,
          subject: "Your Free Website Request Was Received 🚀",
          html: getEmailTemplate(
            getClientEmailContent(data, true, whatsappLink)
          ),
        });
      } else {
        await transporter.sendMail({
          from: `"Trovina.io" <${process.env.SMTP_USER}>`,
          to: data.emailAddress,
          subject: "We Received Your Request 🚀",
          html: getEmailTemplate(
            getClientEmailContent(data, false)
          ),
        });
      }

      console.log(`✅ Emails sent successfully for lead: ${event.id}`);
      return;
    } catch (error) {
      console.error("❌ Error sending emails:", error);
      throw error;
    }
  }
);

import { NextResponse } from "next/server";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY!);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if SendGrid API key is configured
    if (!process.env.SENDGRID_API_KEY || process.env.SENDGRID_API_KEY === "your_sendgrid_api_key_here") {
      console.log("SendGrid API key not configured, logging contact inquiry:");
      console.log("Name:", body.name);
      console.log("Email:", body.email);
      console.log("Message:", body.message);
      console.log("Timestamp:", new Date().toISOString());
      return NextResponse.json({ ok: true, message: "Contact logged (email not configured)" });
    }

    // Send email to joshlanius@yahoo.com
    const msg = {
      to: "joshlanius@yahoo.com",
      from: "noreply@prediction.bet",
      subject: `New Contact Inquiry from ${body.name}`,
      html: `
        <h2>New Contact Inquiry from Prediction.bet</h2>
        <p><strong>Name:</strong> ${body.name}</p>
        <p><strong>Email:</strong> ${body.email}</p>
        <p><strong>Message:</strong></p>
        <p>${body.message.replace(/\n/g, '<br>')}</p>
        <hr>
        <p><em>Sent from Prediction.bet contact form</em></p>
      `,
    };

    try {
      await sgMail.send(msg);
      console.log("Email sent successfully via SendGrid");
      return NextResponse.json({ ok: true, message: "Email sent successfully" });
    } catch (error) {
      console.error("SendGrid error:", error);
      // Log the contact inquiry as fallback
      console.log("=== FALLBACK: Contact inquiry logged due to email error ===");
      console.log("Name:", body.name);
      console.log("Email:", body.email);
      console.log("Message:", body.message);
      console.log("Timestamp:", new Date().toISOString());
      console.log("========================================================");
      return NextResponse.json({ ok: true, message: "Contact logged (email service error)" });
    }
    
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

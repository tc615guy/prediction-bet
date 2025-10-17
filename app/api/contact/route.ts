import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    if (!body || !body.name || !body.email || !body.message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "your_resend_api_key_here") {
      console.log("Resend API key not configured, logging contact inquiry:");
      console.log("Name:", body.name);
      console.log("Email:", body.email);
      console.log("Message:", body.message);
      console.log("Timestamp:", new Date().toISOString());
      return NextResponse.json({ ok: true, message: "Contact logged (email not configured)" });
    }

    // Send email to joshlanius@yahoo.com
    const { data, error } = await resend.emails.send({
      from: "Prediction.bet <noreply@prediction.bet>",
      to: ["joshlanius@yahoo.com"],
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
    });

    if (error) {
      console.error("Resend error:", error);
      // Log the contact inquiry as fallback
      console.log("=== FALLBACK: Contact inquiry logged due to email error ===");
      console.log("Name:", body.name);
      console.log("Email:", body.email);
      console.log("Message:", body.message);
      console.log("Timestamp:", new Date().toISOString());
      console.log("========================================================");
      return NextResponse.json({ ok: true, message: "Contact logged (email service error)" });
    }

    console.log("Email sent successfully:", data);
    return NextResponse.json({ ok: true, messageId: data?.id });
    
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

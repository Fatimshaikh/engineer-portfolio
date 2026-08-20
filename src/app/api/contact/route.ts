import { Resend } from "resend";
import { NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const name = body.name;
    const email = body.email;
    const message = body.message;

    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    await resend.emails.send({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to: "fshaikhh15@gmail.com",
      replyTo: email,
      subject: "New message from " + name + " via portfolio",
      text: "From: " + name + " (" + email + ")\n\n" + message,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}

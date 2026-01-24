import nodemailer from "nodemailer"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const { email, message } = await req.json()

  if (!email || !message) {
    return NextResponse.json({ success: false }, { status: 400 })
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_PASS,
    },
  })

  await transporter.sendMail({
    from: email,
    to: "selmaalaoui22@gmail.com",
    subject: "New Contact Message",
    html: `
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  })

  return NextResponse.json({ success: true })
}

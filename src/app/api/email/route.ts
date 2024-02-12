import { infoData } from "@/utils/api/info";
import { createTransport } from "nodemailer";

export async function POST(req: Request) {
  const { name, email, subject, message } = await req.json();

  const transporter = createTransport({
    host: process.env.EMAIL_HOST,
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `${name} <${email}>`,
    to: process.env.EMAIL_TO,
    subject,
    html: `
    <h1 style="font-size: 24px; font-weight: 400; color: #333; margin-bottom: 10px;">Messagem de <b>${name}</b> - <b>${email}</b></h1>
    <p style="font-size: 18px">${message}</p>
    `,
  });

  return Response.json({
    message: "Success",
  });
}

// pages/api/send-email.ts
import type { NextApiRequest, NextApiResponse } from "next";
import sendEmail  from "@/lib/email";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== "POST") return res.status(405).end();

    const { email, subject, message } = req.body;

    try {
        await sendEmail({
        email,
        subject,
        message,
        });

        res.status(200).json({ success: true });
    } catch (error) {
        console.error("EmailJS error:", error);
        res.status(500).json({ error: "Email failed to send" });
    }
}

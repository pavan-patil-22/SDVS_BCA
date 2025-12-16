import ContactMessage from "../models/ContactMessage.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASSWORD,
  },
});


//*******************EMAIL REPLY FUNCTION *******************/
const sendEmail = async (to, subject, html) => {
  await transporter.sendMail({
    from: `"SDVS'S BCA COLLEGE, Sankeshwar" <${process.env.EMAIL}>`,
    to,
    subject,
    html,
  });
};

//*******************EMAIL REPLY *******************/
export const submitMessage = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newMessage = new ContactMessage({ name, email, phone, subject, message });
    await newMessage.save();

    res.status(201).json({ message: "Message stored successfully!" });
  } catch (error) {
    console.error("Error submitting message:", error);
    res.status(500).json({ error: "Failed to store message" });
  }
};

///*******************ADMIN REPLY *******************/
export const replyToMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;

    const message = await ContactMessage.findById(id);
    if (!message) return res.status(404).json({ error: "Message not found" });

    message.reply = reply;
    message.repliedAt = new Date();
    await message.save();

    //****************************************EMAIL CONTENT IN TML FORMAT******************************//
    const emailTemplate = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; background: #ffffff; border: 1px solid #e0e0e0; border-radius: 10px; padding: 20px;">
        <h2 style="text-align: center; color: #1f3b88;">SDVS'S BCA COLLEGE</h2>
        <h4 style="text-align: center; color: #666; margin-top: 0;">Sankeshwar</h4>
        
        <hr style="border: none; border-top: 2px solid #f5a623; margin: 15px 0;">

        <p style="font-size: 16px; color: #333;">Hi <b>${message.name}</b>,</p>

        <p style="font-size: 15px; color: #555; background: #f8f9fa; padding: 10px; border-left: 4px solid #1f3b88;">
          <b>Your Question:</b><br/>${message.message}
        </p>

        <p style="font-size: 16px; color: #333;"><b>Our Reply:</b></p>
        <p style="font-size: 15px; color: #444; background: #eef4ff; padding: 12px; border-radius: 6px;">
          ${reply}
        </p>

        <p style="margin-top: 25px; font-size: 14px; color: #666;">
          <b>Regards,</b><br/>
          SDVS'S BCA COLLEGE, Sankeshwar
        </p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
        <p style="text-align: center; font-size: 12px; color: #999;">
          This is an auto-generated email. Please do not reply to this message.
        </p>
      </div>
    `;

    await sendEmail(
      message.email,
      `Reply to Your Query: ${message.subject}`,
      emailTemplate
    );

    res.status(200).json({ message: "Reply sent successfully!" });
  } catch (error) {
    console.error("Error sending reply:", error);
    res.status(500).json({ error: "Failed to send reply" });
  }
};

//**********************GET ALL MESSAGE FOR ADMIN VIEW*****************************//
export const getAllMessages = async (req, res) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userroutes from "./routes/user.js";
import questionroutes from "./routes/question.js";
import answerroutes from "./routes/answer.js";
import nodemailer from "nodemailer";

// Load environment variables
dotenv.config();

const app = express();
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());



// Email transporter setup
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: 'chavarahul7@gmail.com',
    pass: 'mnwdnezejybjordb'
  },
});

// Verify transporter configuration
transporter.verify((error, success) => {
  if (error) {
    console.error("Transporter verification failed:", error.message);
  } else {
    console.log("Transporter is ready to send emails");
  }
});

// Store OTPs temporarily
const otps = new Map();

// Translation templates for OTP email
const emailTemplates = {
  en: {
    subject: "Your OTP for Codequest Verification",
    body: (otp) => `Dear User,\n\nYour OTP for verification is: ${otp}\n\nThis OTP is valid for 10 minutes.\n\nBest regards,\nCodequest Team`,
  },
  es: {
    subject: "Su OTP para la verificación de Codequest",
    body: (otp) => `Estimado usuario,\n\nSu OTP para la verificación es: ${otp}\n\nEste OTP es válido por 10 minutos.\n\nSaludos cordiales,\nEquipo de Codequest`,
  },
  hi: {
    subject: "कोडक्वेस्ट सत्यापन के लिए आपका OTP",
    body: (otp) => `प्रिय उपयोगकर्ता,\n\nसत्यापन के लिए आपका OTP है: ${otp}\n\nयह OTP 10 मिनट के लिए मान्य है।\n\nसादर,\nकोडक्वेस्ट टीम`,
  },
  pt: {
    subject: "Seu OTP para Verificação no Codequest",
    body: (otp) => `Prezado Usuário,\n\nSeu OTP para verificação é: ${otp}\n\nEste OTP é válido por 10 minutos.\n\nAtenciosamente,\nEquipe Codequest`,
  },
  zh: {
    subject: "您的Codequest验证OTP",
    body: (otp) => `尊敬的用户，\n\n您的验证OTP是：${otp}\n\n此OTP有效期为10分钟。\n\n此致，\nCodequest团队`,
  },
  fr: {
    subject: "Votre OTP pour la vérification Codequest",
    body: (otp) => `Cher utilisateur,\n\nVotre OTP pour la vérification est : ${otp}\n\nCet OTP est valide pendant 10 minutes.\n\nCordialement,\nÉquipe Codequest`,
  },
};

// Endpoint to send OTP
app.post("/send-otp", async (req, res) => {
  const { email, language } = req.body;
  if (!email || !language) {
    return res.status(400).json({ message: "Email and language are required" });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otps.set(email, { otp, expires: Date.now() + 10 * 60 * 1000 });

  const template = emailTemplates[language] || emailTemplates.en;
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: template.subject,
    text: template.body(otp),
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`OTP sent to ${email}: ${otp}`);
    res.status(200).json({ message: "OTP sent successfully" });
  } catch (error) {
    console.error(`Error sending email to ${email}:`, error.message);
    res.status(500).json({ message: "Failed to send OTP", error: error.message });
  }
});

// Endpoint to verify OTP
app.post("/verify-otp", (req, res) => {
  const { email, otp } = req.body;
  const storedOtp = otps.get(email);

  if (!storedOtp) {
    return res.status(400).json({ message: "No OTP found for this email" });
  }

  if (storedOtp.expires < Date.now()) {
    otps.delete(email);
    return res.status(400).json({ message: "OTP has expired" });
  }

  if (storedOtp.otp === otp) {
    otps.delete(email);
    return res.status(200).json({ message: "OTP verified successfully" });
  }

  return res.status(400).json({ message: "Invalid OTP" });
});

app.use("/user", userroutes);
app.use("/questions", questionroutes);
app.use("/answer", answerroutes);

app.get("/", (req, res) => {
  res.send("Codequest is running perfect");
});

const PORT = process.env.PORT || 5000;
const database_url = process.env.MONGODB_URL;

mongoose
  .connect(database_url)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err.message));
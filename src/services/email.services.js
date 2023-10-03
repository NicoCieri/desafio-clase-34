import { createTransport } from "nodemailer";
import { EMAIL, EMAIL_PASSWORD } from "../config.js";

export const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: EMAIL,
    pass: EMAIL_PASSWORD,
  },
});

export const sendEmailWithText = async ({ email, subject, text }) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject,
      text,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

export const sendEmailWithTemplate = async ({ email, subject, html }) => {
  try {
    await transporter.sendMail({
      from: EMAIL,
      to: email,
      subject,
      html,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

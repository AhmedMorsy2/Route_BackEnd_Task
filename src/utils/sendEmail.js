import nodemailer from "nodemailer";
export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "ahmedaboalgoud2@gmail.com",
      pass: "sjhazidjnntrjwzn",
    },
  });

  const info = await transporter.sendMail({
    from: '"Verification" <ahmedaboalgoud2@gmail.com>',
    to: email,
    subject: "Email Verification",
    html: `Your verify code is ${otp}`,
  });
};

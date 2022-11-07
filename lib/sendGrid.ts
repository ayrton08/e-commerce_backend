import sgMail from "@sendgrid/mail";

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface SendEmail {
  addressee: string;
  title: string;
  message: string;
}

export const sendEmail = async ({
  addressee,
  message,
  title,
}: SendEmail): Promise<void> => {
  const msg = {
    to: addressee,
    from: "ayrtonjuarez90@gmail.com",
    subject: `${title}`,
    text: `${message}`,
    html: `<strong>${message}</strong>`,
  };
  try {
    await sgMail.send(msg);
    console.log("Email sent");
  } catch (error) {
    console.error(error);
  }
};

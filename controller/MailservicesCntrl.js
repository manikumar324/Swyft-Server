const nodemailer = require("nodemailer");
const ejs = require("ejs");
const path = require("path");

// Load and render EJS templates
const renderTemplate = (templatePath, data) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(templatePath, data, (err, html) => {
      if (err) {
        return reject(err);
      }
      resolve(html);
    });
  });
};

exports.MailSend = async (req, res) => {
  const { name, email, suggestions } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587, 
      secure: false, 
      auth: {
        user: "swiftycare1@gmail.com",
        pass: "aimommznaciqancb",
      },
      tls: {
        rejectUnauthorized: false, 
      },
    });

    // Render EJS templates
    const userTemplatePath = path.join(__dirname, "../views", "userMail.ejs");
    console.log("User Template Path:", userTemplatePath);

    const adminTemplatePath = path.join(
      __dirname,
      "../views",
      "adminMail.ejs"
    );
    console.log("Admin Template Path:", adminTemplatePath);

    // Render email HTML
    const userHtml = await renderTemplate(userTemplatePath, {
      name,
      email,
      suggestions,
    });
    const adminHtml = await renderTemplate(adminTemplatePath, {
      name,
      email,
      suggestions,
    });

    // Send email to user
    await transporter.sendMail({
      from: "swiftycare1@gmail.com",
      to: email,
      subject: "Welcome to Swifty Care",
      html: userHtml,
    });

    // Send email to admin (self)
    await transporter.sendMail({
      from: "swiftycare1@gmail.com",
      to: "swiftycare1@gmail.com", // Same as 'from' address
      subject: "New User Inquiry",
      html: adminHtml,
    });

    console.log("Emails sent successfully");
    res.status(200).send("Emails sent successfully");
  } catch (error) {
    console.error("Error sending emails:", error);
    res.status(500).send("Error sending emails");
  }
};
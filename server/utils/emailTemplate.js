export const accountVerificationEmail = (otp) => `
<html>
<body style="font-family: Arial, sans-serif; background-color: #f7f7f7; text-align: center;">
  <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
    <img src="https://res.cloudinary.com/cloudverse/image/upload/v1721893242/CODSIFY/codsify.png"
      alt="Company Logo" width="150" style="display: block; margin: 0 auto;" />
    <h2 style="color: #333; font-weight: bold; margin-top: 20px;">Account Verification OTP</h2>
    <p style="color: #777;">Welcome to our platform! To activate your account, please use the following One-Time Password (OTP) for account verification:</p>
    <h1 style="background-color: #007bff; color: #fff; font-size: 36px; padding: 10px; border-radius: 5px;">${otp}</h1>
    <p style="color: #777; margin-top: 20px;">This OTP is valid for a single use and will expire shortly. If you did not register for an account with us, please disregard this message.</p>
    <p style="color: #777;">Thank you for choosing us!</p>
  </div>
</body>
</html>
`;

export const passwordResetEmail = (otp) => `
  <html>
    <body style="font-family: Arial, sans-serif; background-color: #f7f7f7; text-align: center;">
      <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
        <img 
          src="https://res.cloudinary.com/cloudverse/image/upload/v1721893242/CODSIFY/codsify.png"
          alt="Company Logo" 
          width="150" 
          style="display: block; margin: 0 auto;"
        />
        <h2 style="color: #333; font-weight: bold; margin-top: 20px;">Password Reset OTP</h2>
        <p style="color: #777;">You've requested a password reset for your account. Please use the following One-Time Password (OTP) to reset your password:</p>
        <h1 style="background-color: #007bff; color: #fff; font-size: 36px; padding: 10px; border-radius: 5px;">${otp}</h1>
        <p style="color: #777; margin-top: 20px;">This OTP is valid for a single use and will expire shortly. If you did not request a password reset, please disregard this message.</p>
        <p style="color: #777;">Thank you for using our services!</p>
      </div>
    </body>
  </html>
`;

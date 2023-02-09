<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Email Verification</title>
</head>
<body>
    <h1>Welcome to our website!</h1>
    <p>Thank you for signing up. To complete the registration process, please click the following link to verify your email address:</p>
    <p><a href="{{ $verification_link }}">{{ $verification_link }}</a></p>
    <p>If you did not request this verification, please ignore this email.</p>
    <p>Best regards,</p>
    <p>The Team</p>
</body>
</html>

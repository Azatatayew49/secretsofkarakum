<?php

$to = "secretsofkarakumyakup@gmail.com"; // recipient
$cc = ""; // no CC by default

$from = "info@secretsofkarakum.com"; // domain email as From/envelope sender



$name    = isset($_POST['name'])    ? trim($_POST['name'])    : '';

$email   = isset($_POST['email'])   ? trim($_POST['email'])   : '';

$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';

$message = isset($_POST['message']) ? trim($_POST['message']) : '';



$errors = [];
if (empty($name))    $errors[] = "Name is required.";
if (empty($email))   $errors[] = "Email is required.";
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = "Invalid email address.";
if (empty($message)) $errors[] = "Message is required.";


if (count($errors) === 0) {

    $mail_subject = !empty($subject) ? $subject : "Website Contact Form";

    $mail_body = "Name: $name\nEmail: $email\n\nMessage:\n$message";

    $headers  = "From: $from\r\n";
    $headers .= "Reply-To: $email\r\n";
    if (!empty($cc)) {
        $headers .= "CC: $cc\r\n";
    }
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Try to set envelope sender (-f) to improve deliverability on some hosts
    $mail_sent = mail($to, $mail_subject, $mail_body, $headers, "-f" . $from);
    if ($mail_sent) {
        echo "<div style='padding:20px; background:#e6ffe6; color:#2d662d; border-radius:8px; max-width:400px; margin:40px auto; text-align:center;'>Thank you, your message has been sent!</div>";
    } else {
        echo "<div style='padding:20px; background:#ffe6e6; color:#662d2d; border-radius:8px; max-width:400px; margin:40px auto; text-align:center;'>Sorry, there was a problem sending your message. Please try again later.</div>";
    }

} else {

    echo "<div style='padding:20px; background:#ffe6e6; color:#662d2d; border-radius:8px; max-width:400px; margin:40px auto; text-align:left;'>";
    echo "<strong>Please fix the following errors:</strong><ul>";
    foreach ($errors as $error) {
        echo "<li>" . htmlspecialchars($error) . "</li>";
    }
    echo "</ul></div>";

}

?>
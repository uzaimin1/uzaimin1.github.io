<?php
// Allow requests from GitHub Pages domain
header("Access-Control-Allow-Origin: https://uzaimin1.github.io");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight OPTIONS request
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    echo json_encode(['success' => false, 'message' => 'Invalid request method.']);
    exit();
}

// Get and sanitize form data
$name    = htmlspecialchars(strip_tags(trim($_POST['name'] ?? '')));
$email   = htmlspecialchars(strip_tags(trim($_POST['email'] ?? '')));
$subject = htmlspecialchars(strip_tags(trim($_POST['subject'] ?? '')));
$message = htmlspecialchars(strip_tags(trim($_POST['message'] ?? '')));

// Validate required fields
if (empty($name) || empty($email) || empty($subject) || empty($message)) {
    echo json_encode(['success' => false, 'message' => 'All fields are required.']);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    echo json_encode(['success' => false, 'message' => 'Invalid email address.']);
    exit();
}

// Destination email
$to = 'usaimin@uzeetechnology.com';

// Email subject
$email_subject = "Portfolio Contact: $subject";

// Email body
$email_body = "You have received a new message from your portfolio contact form.\n\n";
$email_body .= "Name:    $name\n";
$email_body .= "Email:   $email\n";
$email_body .= "Subject: $subject\n\n";
$email_body .= "Message:\n$message\n";

// Email headers
$headers  = "From: noreply@uzeetechnology.com\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send email
if (mail($to, $email_subject, $email_body, $headers)) {
    echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
} else {
    echo json_encode(['success' => false, 'message' => 'Failed to send message. Please try again.']);
}
?>

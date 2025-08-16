<?php
// Simple PHP contact form handler for shared hosting
// This file should be placed in the public directory

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Get JSON input
$input = file_get_contents('php://input');
$data = json_decode($input, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid JSON data']);
    exit;
}

// Validate required fields
$required_fields = ['name', 'phone', 'service', 'message'];
foreach ($required_fields as $field) {
    if (empty($data[$field])) {
        http_response_code(400);
        echo json_encode(['error' => "Field '$field' is required"]);
        exit;
    }
}

// Sanitize data
$name = htmlspecialchars(trim($data['name']));
$phone = htmlspecialchars(trim($data['phone']));
$email = isset($data['email']) ? htmlspecialchars(trim($data['email'])) : '';
$service = htmlspecialchars(trim($data['service']));
$message = htmlspecialchars(trim($data['message']));

// Email configuration
$to = 'info@republicaattorneys.co.tz';
$subject = 'New Legal Consultation Request - ' . $service;

// Email body
$email_body = "
New legal consultation request received:

Name: $name
Phone: $phone
Email: $email
Service: $service

Message:
$message

---
Sent from Republica Attorneys website
Date: " . date('Y-m-d H:i:s') . "
IP Address: " . $_SERVER['REMOTE_ADDR'] . "
";

// Email headers
$headers = "From: noreply@republicaattorneys.co.tz\r\n";
$headers .= "Reply-To: $email\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

// Send email
if (mail($to, $subject, $email_body, $headers)) {
    // Log the submission (optional)
    $log_entry = date('Y-m-d H:i:s') . " - Contact form submission from $name ($email) for $service\n";
    file_put_contents('contact_log.txt', $log_entry, FILE_APPEND | LOCK_EX);
    
    echo json_encode(['success' => true, 'message' => 'Form submitted successfully']);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to send email']);
}
?>
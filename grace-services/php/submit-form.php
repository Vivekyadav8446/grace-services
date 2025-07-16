<?php
header('Content-Type: application/json');

// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "grace_services";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode([
        'success' => false,
        'message' => 'Connection failed: ' . $conn->connect_error
    ]));
}

// Log received POST data
file_put_contents('form_debug.log', print_r($_POST, true), FILE_APPEND);

// Get form data with proper sanitization
$serviceType = isset($_POST['serviceType']) ? $conn->real_escape_string($_POST['serviceType']) : '';
$name = isset($_POST['name']) ? $conn->real_escape_string($_POST['name']) : '';
$email = isset($_POST['email']) ? $conn->real_escape_string($_POST['email']) : '';
$phone = isset($_POST['phone']) ? $conn->real_escape_string($_POST['phone']) : '';
$location = isset($_POST['location']) ? $conn->real_escape_string($_POST['location']) : '';
$message = isset($_POST['message']) ? $conn->real_escape_string($_POST['message']) : '';

// Validate required fields
if (empty($serviceType) || empty($name) || empty($email) || empty($phone) || empty($location)) {
    echo json_encode([
        'success' => false,
        'message' => 'All required fields must be filled',
        'received_data' => $_POST  // For debugging
    ]);
    exit;
}

// Insert into database
$stmt = $conn->prepare("INSERT INTO inquiries (service_type, name, email, phone, location, message, created_at) VALUES (?, ?, ?, ?, ?, ?, NOW())");
$stmt->bind_param("ssssss", $serviceType, $name, $email, $phone, $location, $message);

if ($stmt->execute()) {
    // For debugging, check if mail function works
    $mailResult = @mail(
        "admin@graceservices.com",
        "New Inquiry: $serviceType",
        "Name: $name\nEmail: $email\nPhone: $phone\nLocation: $location\nMessage: $message",
        "From: webmaster@graceservices.com"
    );
    
    file_put_contents('mail_debug.log', "Mail sent: " . ($mailResult ? 'Yes' : 'No'), FILE_APPEND);
    
    echo json_encode(['success' => true]);
} else {
    file_put_contents('db_error.log', $stmt->error, FILE_APPEND);
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $stmt->error
    ]);
}

$stmt->close();
$conn->close();
?>
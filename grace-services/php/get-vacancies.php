<?php
header('Content-Type: application/json');

// Database connection
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "grace_services";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die(json_encode(['error' => 'Connection failed: ' . $conn->connect_error]));
}

// Get filter parameters from request
$location = $_GET['location'] ?? '';
$type = $_GET['type'] ?? '';

// Build query
$sql = "SELECT * FROM vacancies WHERE 1=1";
$params = [];
$types = '';

if (!empty($location)) {
    $sql .= " AND location = ?";
    $params[] = $location;
    $types .= 's';
}

if (!empty($type)) {
    $sql .= " AND type = ?";
    $params[] = $type;
    $types .= 's';
}

$stmt = $conn->prepare($sql);

if (!empty($params)) {
    $stmt->bind_param($types, ...$params);
}

$stmt->execute();
$result = $stmt->get_result();

$vacancies = [];
while ($row = $result->fetch_assoc()) {
    $vacancies[] = $row;
}

echo json_encode($vacancies);

$stmt->close();
$conn->close();
?>
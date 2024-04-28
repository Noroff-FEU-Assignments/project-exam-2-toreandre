<?php
// Allow requests from specific origins
header('Access-Control-Allow-Origin: http://localhost:3000');

// Respond to preflight requests
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_METHOD']))
        header("Access-Control-Allow-Methods: GET, POST, OPTIONS");         
    if (isset($_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']))
        header("Access-Control-Allow-Headers: {$_SERVER['HTTP_ACCESS_CONTROL_REQUEST_HEADERS']}");
    exit(0);
}

// URL of the Flask app
$flaskAppUrl = 'http://127.0.0.1:8000/movai-alpha-travel-node-01';

// Collect the POST data
$jsonData = file_get_contents('php://input');

// check that the data does contain "<script>" or "alert" "<" "/" ">" characters
if (strpos($jsonData, '<script>') !== false || strpos($jsonData, '<') !== false || strpos($jsonData, '/') !== false || strpos($jsonData, '>') !== false) {
    // if it does, return an error message
    echo json_encode(array('error' => 'Det var en feil med input data'));
    exit();
}

// Use cURL to forward the request to the Flask app
$ch = curl_init($flaskAppUrl);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $jsonData);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, array(
    'Content-Type: application/json',
    'Content-Length: ' . strlen($jsonData))
);

// Execute the cURL session
$result = curl_exec($ch);

// Close cURL session handle
curl_close($ch);

// Forward the response back to the client
echo $result;
?>
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

// connect to database
$conn = mysqli_connect('feenix-mariadb.swin.edu.au', 's104454546', 'Maple123!', 's104454546_db');
mysqli_set_charset($conn, 'utf8');

$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

switch ($method) {
    // get all users or single user by id
    case 'GET':
        $id = isset($_GET['id']) ? $_GET['id'] : null;
        if ($id) {
            $id = mysqli_real_escape_string($conn, $id);
            $result = mysqli_query($conn, "SELECT id, username, email, phone, is_admin FROM users WHERE id='$id'");
        } else {
            $result = mysqli_query($conn, "SELECT id, username, email, phone, is_admin FROM users");
        }
        $rows = [];
        while ($row = mysqli_fetch_object($result)) {
            $rows[] = $row;
        }
        echo json_encode($rows);
        break;

    // register a new user
    case 'POST':
        $username = mysqli_real_escape_string($conn, $input['username']);
        $email = mysqli_real_escape_string($conn, $input['email']);
        $password = password_hash($input['password'], PASSWORD_DEFAULT);
        $phone = mysqli_real_escape_string($conn, $input['phone']);
        $result = mysqli_query($conn, "INSERT INTO users (username, email, password, phone) VALUES ('$username', '$email', '$password', '$phone')");
        echo json_encode(['id' => mysqli_insert_id($conn)]);
        break;

    // login - check username and password
    case 'PUT':
        $username = mysqli_real_escape_string($conn, $input['username']);
        $result = mysqli_query($conn, "SELECT * FROM users WHERE username='$username'");
        $user = mysqli_fetch_object($result);
        if ($user && password_verify($input['password'], $user->password)) {
            // don't send the password back to the frontend
            unset($user->password);
            echo json_encode($user);
        } else {
            echo json_encode(null);
        }
        break;
}

mysqli_close($conn);
?>
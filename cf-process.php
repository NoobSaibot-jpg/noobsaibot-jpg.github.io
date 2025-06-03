<?php
// Включаем отображение ошибок для отладки
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Проверяем, что это PHP-скрипт
if (!defined('PHP_VERSION')) {
    die('Этот файл должен быть обработан PHP-сервером');
}

// Разрешаем CORS
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header('Content-Type: application/json; charset=utf-8');

// Обработка preflight OPTIONS запроса
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Проверяем метод запроса
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode([
        'status' => 'error',
        'message' => 'Метод не разрешен. Используйте POST.',
        'debug' => [
            'method' => $_SERVER['REQUEST_METHOD'],
            'server' => $_SERVER['SERVER_SOFTWARE'] ?? 'Unknown'
        ]
    ]);
    exit();
}

// Получаем данные формы
$name = isset($_POST['name']) ? trim($_POST['name']) : '';
$email = isset($_POST['email']) ? trim($_POST['email']) : '';
$subject = isset($_POST['subject']) ? trim($_POST['subject']) : '';
$message = isset($_POST['message']) ? trim($_POST['message']) : '';

// Валидация входных данных
$errors = [];

if (strlen($name) < 3) {
    $errors[] = 'Имя должно содержать минимум 3 символа';
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Пожалуйста, введите корректный email адрес';
}

if (strlen($subject) < 3) {
    $errors[] = 'Тема должна содержать минимум 3 символа';
}

if (strlen($message) < 3) {
    $errors[] = 'Сообщение должно содержать минимум 3 символа';
}

if (!empty($errors)) {
    echo json_encode([
        'status' => 'error',
        'message' => implode(', ', $errors)
    ]);
    exit();
}

// Подготовка email
$to = "kra4kas@gmail.com";
$headers = [
    'MIME-Version: 1.0',
    'Content-type: text/html; charset=utf-8',
    'From: ' . $name . ' <' . $email . '>',
    'Reply-To: ' . $email,
    'X-Mailer: PHP/' . phpversion()
];

$emailBody = "
<html>
<head>
    <title>Новое сообщение с сайта</title>
    <meta charset='utf-8'>
</head>
<body>
    <h2>Новое сообщение с сайта</h2>
    <p><strong>Имя:</strong> {$name}</p>
    <p><strong>Email:</strong> {$email}</p>
    <p><strong>Тема:</strong> {$subject}</p>
    <p><strong>Сообщение:</strong></p>
    <p>" . nl2br(htmlspecialchars($message)) . "</p>
</body>
</html>
";

// Отправка email
try {
    if (mail($to, $subject, $emailBody, implode("\r\n", $headers))) {
        echo json_encode([
            'status' => 'success',
            'message' => 'Ваше сообщение успешно отправлено!'
        ]);
    } else {
        throw new Exception('Ошибка отправки письма');
    }
} catch (Exception $e) {
    echo json_encode([
        'status' => 'error',
        'message' => 'Не удалось отправить сообщение. Пожалуйста, попробуйте позже.',
        'debug' => [
            'error' => $e->getMessage(),
            'php_version' => PHP_VERSION,
            'mail_function' => function_exists('mail') ? 'available' : 'not available'
        ]
    ]);
}
?>

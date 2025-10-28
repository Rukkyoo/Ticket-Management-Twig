<?php
require_once __DIR__ . '/../vendor/autoload.php';

$loader = new \Twig\Loader\FilesystemLoader(__DIR__ . '/templates');
$twig = new \Twig\Environment($loader,[
    'cache' => __DIR__ . '/../cache/twig',
    'auto_reload' => true,
]);

$path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);


switch($path){
    case '/':
    case '/home':
        echo $twig->render('landing.twig',[
            'title'=> "Landing Page - Twig Starter Template",

        ]);
        break;
    case '/dashboard':
        echo $twig->render('dashboard.twig',[
            'title'=> "Dashboard - Twig Starter Template",
        ]);
        break;
    case '/dashboard/tickets':
        echo $twig->render('tickets.twig',[
            'title'=> "Ticket Management - Twig Starter Template",
        ]);
        break;
    case '/login':
        echo $twig->render('login.twig',[
            'title'=> "Login - Twig Starter Template",
        ]);
        break;
    case '/signup':
        echo $twig->render('signup.twig',[
            'title'=> "Signup - Twig Starter Template",
        ]);
        break;
    case '/api/login':
        // Handle login POST request
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $email = $_POST['email'] ?? '';
            $password = $_POST['password'] ?? '';

            // Simple validation - in a real app, check against database
            if (!empty($email) && !empty($password)) {
                // Success - redirect to dashboard
                header('Location: /dashboard');
                exit;
            } else {
                // Error - redirect back to login with error
                header('Location: /login?error=Invalid credentials');
                exit;
            }
        }
        break;
    default:
    echo $twig->render('404.twig',[
        'title'=> "404 Not Found - Twig Starter Template",
    ]);
};
?>
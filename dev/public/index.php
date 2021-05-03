<?php
require '../../vendor/autoload.php';

define('DEBUG_TIME', microtime(true));

$whoops = new \Whoops\Run();
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());
$whoops->register();


$router = new App\Router('../views');
//dump($router);

// https://altorouter.com/usage/mapping-routes.html
if ($router->isDefaultLayout()) {
    $router
        ->load('../app/config/routes.json')
        ->run();
    // $router
    //     ->get('/', 'home', 'home')
    //     ->get('/[i:page]', 'home', 'home_page')
    //     ->get('/produit:[id:id]', 'produit', 'produit')
    //     ->get('/panier', 'panier', 'panier')
    //     ->get('/order', 'panier_confirmation', 'panier_confirmation')
    //     //->get('/', '404', '404')
    //     ->get('/test', 'test', 'test')
    //     ->run();
}

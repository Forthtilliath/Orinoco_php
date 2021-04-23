<?php
require '../../vendor/autoload.php';

define('DEBUG_TIME', microtime(true));

$whoops = new \Whoops\Run();
$whoops->pushHandler(new \Whoops\Handler\PrettyPageHandler());
$whoops->register();


$router = new App\Router('../views', 'forth');
//dump($router);

if ($router->isDefaultLayout()) {
    $router
        ->get('/', '/views_will/home', 'home')
        ->get('/produit:[*:id]', '/views_will/produit', 'produit')
        ->get('/panier', '/views_will/panier', 'panier')
        ->get('/order', '/views_will/panier_confirmation', 'panier_confirmation')
        ->run();
} else {
    $router
        ->get('/', 'home', 'home')
        ->get('/[i:page]', 'home', 'home_page')
        ->get('/produit:[id:id]', 'produit', 'produit')
        ->get('/panier', 'panier', 'panier')
        ->get('/order', 'panier_confirmation', 'panier_confirmation')
        ->get('/', '404', '404')
        ->run();
}

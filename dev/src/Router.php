<?php

namespace App;

class Router
{
    /**
     * @var string
     */
    private $viewPath;

    /**
     * @var AltoRouter
     */
    private $router;

    public function __construct(string $viewPath, ?string $layout = 'default')
    {
        $this->viewPath = $viewPath;
        $this->router = new \AltoRouter();
        $this->layout = $layout;
        $this->addMatches();
    }

    /**
     * Ajoute des params à l'url
     */
    public function addMatches(): self
    {
        $this->router->addMatchTypes(array('id' => '[a-z0-9]{24}'));
        return $this;
    }

    /**
     * Vérifie si le layout courant est le layout défault
     */
    public function isDefaultLayout(): bool
    {
        return (strcmp($this->layout, 'default') === 0);
    }

    /**
     * Récupère une route
     */
    public function get(string $url, string $view, ?string $name = null): self
    {
        $this->router->map('GET', $url, $view, $name);
        return $this;
    }

    /**
     * Lance le router
     */
    public function run(): self
    {

        $match = $this->router->match();
        
        // Si la page n'est pas existant, on redirige vers la page 404
        if (!$match) {
            $match = [
                "target" => "404",
                "params" => [],
                "name" => "404"
            ];
        }

        if (is_array($match)) {
            $view = $match['target'];
            if (is_callable($view)) {
                call_user_func_array($view, $match['params']);
            } else {
                $params = $match['params'];
                ob_start();
                require $this->viewPath . DIRECTORY_SEPARATOR . $view . '.php';
                $pageContent = ob_get_clean();
            }
            require $this->viewPath . DIRECTORY_SEPARATOR . 'layouts/' . $this->layout . '.php';
        }

        return $this;
    }
}

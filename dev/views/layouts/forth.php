<!DOCTYPE html>
<html lang="fr" class="h-100">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="images/favicon.ico" />
    <!-- Bootstrap v5 -->
    <!-- <link rel="stylesheet" href="assets/css/libs/bootstrap-v5.0.min.css" /> -->
    <link rel="stylesheet" href="assets/css/libs/bootstrap.css" />
    <link rel="stylesheet" href="assets/css/libs/bootstrap-icons.css" />
    <link rel="stylesheet" href="assets/css/main.css" />

    <title><?= $pageTitle ?? 'Orinoco' ?></title>
    <meta name="description" content="<?= $pageDescription ?? '' ?>" />
</head>

<body class="d-flex flex-column h-100">
    <nav class="navbar fixed-top navbar-light bg-primary px-2">
        <div class="container-fluid">
            <a class="navbar-brand" href="./" aria-label="Accueil">
                <img class="d-block d-xss-none" src="images/logo.png" width="auto" height="auto" alt="Logo" />
                <img class="d-none d-xss-inline" src="images/logo_w_text.png" width="auto" height="auto" alt="Logo" />
            </a>
            <a class="navbar-brand" href="./panier">
                <button type="button" class="btn btn-quaternary" id="bt_panier" aria-label="Panier"><i class="bi bi-basket"></i><span class="d-none d-sm-inline ps-3">Panier</span></button>
            </a>
        </div>
    </nav>

    <div class="container-fluid p-4 pt-6 bg-image">
        <?= $pageContent ?>
    </div>

    <footer class="footer mt-auto py-3 bg-primary text-inv-primary">
        <div class="container text-center">
            <div>&Oslash;rinoco &copy; 2021 Forth</div>
            <div>Tout droits réservés</div>
            <div>
                <hr />
            </div>
            <div>
                <span class="d-inline">Affichage : </span>
                <span class="d-inline d-sm-none">&lt; Small (&lt; 576px) </span>
                <span class="d-none d-sm-inline d-md-none">Small (sm) (&ge; 576px)</span>
                <span class="d-none d-md-inline d-lg-none">Medium (md) (&ge; 768px)</span>
                <span class="d-none d-lg-inline d-xl-none">Large (lg) (&ge; 992px)</span>
                <span class="d-none d-xl-inline d-xxl-none">X-Large (xl) (&ge; 1200px)</span>
                <span class="d-none d-xxl-inline">XX-Large (xxl) (&ge; 1400px)</span>
            </div>
            <?php if (defined('DEBUG_TIME')) : ?>
                <div>
                    Page générée en <?= round(1000 * (microtime(true) - DEBUG_TIME)) ?>ms
                </div>
            <?php endif ?>
        </div>
    </footer>

    <!-- Script-->
    <script src="./assets/js/libs/jquery.min.js"></script>
    <script src="./assets/js/libs/bootstrap-v5.0.min.js"></script>
    <script src="./assets/js/classes/extendsHTML.js"></script>
    <script src="./assets/js/classes/extendsTypes.js"></script>
    <script src="./assets/js/classes/prototypes.js"></script>
    <script src="./assets/js/classes/api.js"></script>
    <script src="./assets/js/classes/indexedDB.js"></script>
    <script src="./assets/js/classes/produit.js"></script>
    <script src="./assets/js/classes/panier.js"></script>
    <?= $pageScripts ?? '' ?>
</body>

</html>
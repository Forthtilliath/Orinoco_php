<!DOCTYPE html>
<html lang="fr" class="h-100">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="shortcut icon" href="/images/favicon.ico" />
    <!-- Bootstrap v5 -->
    <link rel="stylesheet" href="/assets/css/libs/bootstrap-icons.css" />
    <link rel="stylesheet" href="/assets/css/main.min.css" />

    <title><?= $pageTitle ?? 'Orinoco' ?></title>
    <meta name="description" content="<?= $pageDescription ?? '' ?>" />

    <style>
        #cart-dropdown {
            background-color: #181a1b;
            box-shadow: rgb(82 88 92) 0px 0px 5px;
        }

        #mini-basket {
            position: fixed;
            z-index: 1031;
            width: 300px;
            top: 55px;
            right: 5px;
            border-radius: 2px;
            box-shadow: 0 0 5px hsl(0deg 0% 60%);
            transition: -webkit-transform .2s ease-in;
            transition: transform .2s ease-in;
            transition: transform .2s ease-in, -webkit-transform .2s ease-in;
            -webkit-transform: scale(0);
            transform: scale(0);
            -webkit-transform-origin: top right;
            transform-origin: top right;
        }

        #mini-basket.show {
            transform: scale(1);
        }
    </style>
</head>

<body class="d-flex flex-column h-100">
    <header>
        <nav class="navbar fixed-top navbar-light bg-primary px-2">
            <div class="container-fluid">
                <a class="navbar-brand" href="/" aria-label="Accueil">
                    <img class="d-inline d-330-none" src="/images/logo.png" width="auto" height="auto" alt="Logo" />
                    <img class="d-none d-330-inline" src="/images/logo_w_text.png" width="auto" height="auto" alt="Logo" />
                </a>

                <a class="navbar-brand" href="/panier" aria-label="Panier" id="link_panier">
                    <button type="button" class="btn btn-quaternary" id="bt_panier" data-items=""><i class="bi bi-basket"></i><span class="d-none d-sm-inline ps-3">Panier</span></button>
                </a>
            </div>
        </nav>
    </header>

    <div id="mini-basket" class="bg-tertiary border border-primary">
        <div class="d-flex justify-content-between px-2 py-1 border-1 border-bottom"><span>Mon panier</span> <span><span id="mini-basket-nbproduits"></span> article(s)</span></div>

        <ul class="px-2 list-unstyled mb-1 overflow-auto" style="max-height:500px"></ul>

        <div class="px-3 pb-1">
            <div class="d-flex justify-content-between px-2 py-1 fw-bold"><span>Sous-total</span> <span id="mini-basket-total"></span></div>
            <a class="" href="/panier" aria-label="Panier" id="link_panier">
                <button type="button" class="btn btn-quaternary my-1 w-100 border-primary"><i class="bi bi-basket"></i><span class="ps-3">Voir le panier</span></button>
            </a>
        </div>
    </div>

    <div class="container-fluid p-4 pt-6 bg-image" id="pageContent">
        <?= $pageContent ?>
    </div>

    <footer class="footer mt-auto py-3 bg-primary text-senary">
        <div class="container text-center">
            <div>&Oslash;rinoco &copy; 2021 Forth</div>
            <div>Tout droits réservés</div>
            <div>
            </div>
            <?php if (defined('DEBUG') && DEBUG) : ?>
                <div>
                    <hr />
                    <span class="d-inline">Affichage : </span>
                    <span class="d-inline d-xxs-none">XSS (&lt; 300px) </span>
                    <span class="d-none d-xxs-inline d-xs-none">Extremly small (xxs) (&ge; 300px)</span>
                    <span class="d-none d-xs-inline d-sm-none">Extra small (xs) (&ge; 500px)</span>
                    <span class="d-none d-sm-inline d-md-none">Small (sm) (&ge; 576px)</span>
                    <span class="d-none d-md-inline d-lg-none">Medium (md) (&ge; 768px)</span>
                    <span class="d-none d-lg-inline d-xl-none">Large (lg) (&ge; 992px)</span>
                    <span class="d-none d-xl-inline d-xxl-none">X-Large (xl) (&ge; 1200px)</span>
                    <span class="d-none d-xxl-inline">XX-Large (xxl) (&ge; 1400px)</span>
                </div>
                <div>
                    Page générée en <?= round(1000 * (microtime(true) - DEBUG_TIME)) ?>ms
                </div>
            <?php endif ?>
        </div>
    </footer>

    <!-- Début scripts -->
    <script src="/assets/js/libs/jquery.min.js"></script>
    <script src="/assets/js/libs/jquery.number.js"></script>
    <script src="/assets/js/libs/bootstrap-v5.0.min.js"></script>
    <script src="/assets/js/libs/jspdf.min.js"></script>
    <!-- <script src="/assets/js/libs/jspdf.plugin.autotable.js"></script> -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf-autotable/2.3.5/jspdf.plugin.autotable.js"></script>
    <script src="/assets/js/classes/extends/html.js"></script>
    <script src="/assets/js/classes/extends/types.js"></script>
    <script src="/assets/js/classes/extends/storage.js"></script>
    <script src="/assets/js/classes/api.js"></script>
    <script src="/assets/js/classes/router.js"></script>
    <script src="/assets/js/classes/indexedDB.js"></script>
    <script src="/assets/js/classes/produit.js"></script>
    <script src="/assets/js/classes/panier.js"></script>
    <script src="/assets/js/app/helpers.js"></script>

    <script src="/assets/js/app/home.js"></script>
    <script src="/assets/js/app/produit.js"></script>
    <script src="/assets/js/app/panier.js"></script>
    <script src="/assets/js/app/commande.js"></script>
    <script src="/assets/js/app/commande_confirmation.js"></script>
    <script src="/assets/js/app/default.js"></script>
    <!-- Fin scripts -->
</body>

</html>
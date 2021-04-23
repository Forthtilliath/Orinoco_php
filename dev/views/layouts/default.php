<!DOCTYPE html>
<html lang="fr">

<head>
    <!-- meta -->
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <!--style-->
    <link rel="shortcut icon" href="images/favicon.ico" />
    <link rel="stylesheet" href="assets/css/libs/bootstrap-v4.6.min.css" />
    <link rel="stylesheet" href="assets/css/libs/bootstrap-icons.css" />
    <link rel="stylesheet" href="assets/css/style.css" />

    <title><?= $pageTitle ?? 'Orinoco' ?></title>
    <meta name="description" content="<?= $pageDescription ?? '' ?>">
</head>

<body>
    <header class="bg-secondary sticky-top navbar">
        <div class="container-fluid">
            <a class="navbar-brand" href="./">
                <img class="" src="images/logo_w_text.png" width="auto" height="auto" alt="Logo" />
            </a>
            <a class="navbar-brand" href="./panier">
                <button type="button" class="btn btn-secondary color-primary" id="bt_panier"><i class="bi bi-basket"></i><span class="d-none d-sm-inline pl-3">Panier</span></button>
            </a>
        </div>
    </header>
    <section class="container p-0">
        <div class="alert alert-light alert-dismissible fade show mt-4" role="alert">
            <h1 id="order-alert-title" class="alert-heading justify-content-center text-center"><?= $pageMessageTitle ?></h1>
            <p id="order-alert-contentfull" class="justify-content-center text-center"><?= $pageMessageDescription ?></p>
            <p id="order-alert-contentempty" class="justify-content-center text-center d-none">
                Hum ! Il manque un petit quelque chose...
            </p>
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
    </section>

    <?= $pageContent ?>

    <footer class="container bg-secondary mt-1">
        <div class="row pt-4 pb-3">
            <div class="col text-light">
                <ul class="list-inline text-center">
                    <li class="list-inline-item">
                        <a href="#" data-toggle="modal" data-target="#bannerformmodal" class="text-light">Contactez-nous</a>
                    </li>
                    <li class="list-inline-item">&middot;</li>
                    <li class="list-inline-item"><a href="#" class="text-light">Conditions d'utilisation</a></li>
                </ul>
                <ul class="list-inline text-center">
                    <li class="list-inline-item">&Oslash;rinoco &copy; 2021 Williamh&oslash;d</li>
                </ul>
            </div>
        </div>
    </footer>
    <div class="modal fade bannerformmodal" tabindex="-1" role="dialog" aria-labelledby="bannerformmodal" aria-hidden="true" id="bannerformmodal">
        <div class="modal-dialog modal-md modal-dialog-centered mx-auto">
            <div class="modal-content">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title" id="myModalLabel">Contactez-nous</h4>
                        <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Nom de famille" name="last_name" aria-label="Nom de famille" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Prénom" name="first_name" aria-label="Prénom" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Adresse e-mail" name="email" aria-label="Adresse e-mail" />
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Numéro de téléphone" name="phone_mobile" aria-label="numéro de téléphone" />
                            </div>
                        </div>
                        <div class="control-group">
                            <div class="controls">
                                <textarea type="text" class="form-control" name="description" placeholder="Ici votre message avec nos remerciements pour cette prise de contact."></textarea>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-info">Envoyer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <footer class="bg-light py-4 footer mt-auto">
        <div class="container text-center">
            <?php if (defined('DEBUG_TIME')) : ?>
                Page générée en <?= round(1000 * (microtime(true) - DEBUG_TIME)) ?>ms
            <?php endif ?>
        </div>
    </footer>

    <!-- Script-->
    <script src="./assets/js/libs/jquery.min.js"></script>
    <script src="./assets/js/libs/bootstrap-v4.6.min.js"></script>
    <script src="./assets/js/classes/prototypes.js"></script>
    <script src="./assets/js/classes/api_will.js"></script>
    <script src="./assets/js/classes/indexedDB.js"></script>
    <script src="./assets/js/classes/produit.js"></script>
    <script src="./assets/js/classes/panier.js"></script>
    <?= $pageScripts ?? '' ?>
</body>

</html>
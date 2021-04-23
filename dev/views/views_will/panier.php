<?php
$pageTitle = 'Orinoco - Panier - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
$pageMessageTitle = 'Dernière Etape !';
$pageMessageDescription = 'Votre commande est si proche, encore un petit pas à faire.';
?>

<section class="container pb-3 mb-3 bg-white">
    <div class="row d-flex justify-content-center mb-2" id="order-title">
        <h2>Votre panier</h2>
    </div>
    <div class="d-none justify-content-center" id="basket-empty">
        <div class="row justify-content-center mt-4">
            <div class="card mb-4" style="width: 100%">
                <img src="images/basket.png" class="card-img-top" alt="" />
                <div class="card-body">
                    <h2 class="card-title text-center" id="product-name">Votre panier est vide !</h2>
                    <div class="row">
                        <div class="col-12 text-center">
                            <a href="./" class="btn btn-info mt-1" id="">Retour à la boutique</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Article -->
    <div id="list_cards">
        <article class="border-secondary mb-4 d-none" id="cards_0">
            <form class="row" action="#" method="GET" id="cards_0_form">
                <input type="hidden" value="" name="id" id="cards_0_id" />
                <div class="col-4 col-md-4 col-lg-2 pr-0 pl-0 pl-md-3 mb-4 mb-md-0">
                    <img src="" class="card-img-older img-content" alt="..." />
                </div>
                <div class="col-8 col-md-4 col-lg-3 pl-md-4 pr-0 pl-0">
                    <div class="card-body border-right">
                        <h5 class="card-title"><a href="#"></a></h5>
                        <p>Lentilles : <span id="cards_0_lenses"></span></p>
                    </div>
                </div>
                <div class="col-0 col-md-4 col-lg-2 align-manuel-item pl-0 pr-0 border-right pl-md-2 ml-1 ml-md-0">
                    <span class="justify-self-center">Prix : <span id="cards_0_price"></span></span>
                </div>
                <div class="col-0 col-lg-2 align-manuel-item justify-content-lg-center ml-1 ml-md-0 pl-0 pr-0 pl-md-2 mt-md-2 mt-lg-0 border-right">
                    <select class="form-select inputGroupSelect02" id="cards_0_quantity"></select>
                    <button class="btn border-secondary p-1 mx-2 ml-3 btn-order" id="cards_0_remove" data-toggle="modal" data-target="#modalConfirmRemove">
                        Supprimer
                    </button>
                </div>
                <div class="col-0 col-lg-2 align-manuel-item pl-0 pl-md-2 ml-1 ml-md-0">
                    <span>Sous-total : <span id="cards_0_subtotal"></span></span>
                </div>
            </form>
        </article>
    </div>
    <div class="row justify-content-around mt-2" id="order-total">
        <h3>Total : <span id="cards_total"></span></h3>
    </div>
</section>
<section class="container p-0" id="order-modal-container">
    <div class="modal-dialog modal-xl">
        <div class="modal-content">
            <div class="modal-content">
                <div class="mt-4 mb-1">
                    <h4 class="text-center">Formulaire de commande</h4>
                </div>
                <form class="modal-body" method="POST" id="order_form">
                    <div class="form-group row">
                        <div class="col-0 col-md-4">
                            <label for="name">Nom :</label>
                            <input type="text" class="form-control" placeholder="Nom de famille" name="lastName" aria-label="Nom de famille" id="order_last_name" required value="Jacquouille" />
                        </div>
                        <div class="col-0 col-md-4">
                            <label for="first_name">Prénom :</label>
                            <input type="text" class="form-control" placeholder="Prénom" name="firstName" aria-label="Prénom" id="order_first_name" required value="La Fripouille" />
                        </div>
                        <div class="col-0 col-md-4">
                            <label for="name">N° de télephone:</label>
                            <input type="tel" class="form-control" placeholder="N° téléphone" name="phoneNumber" aria-label="numéro de téléphone" id="order_phone_number" pattern="\d{10}" />
                        </div>
                    </div>
                    <div class="form-group row">
                        <div class="col-0 col-md-4">
                            <label for="adresse"> Votre adresse:</label>
                            <input type="text" class="form-control" placeholder="Votre Adresse" name="address" aria-label="Adresse postal" id="order_adress" required value="69 rue de l'anus" />
                        </div>
                        <div class="col-0 col-md-4">
                            <label for="city">Votre Ville :</label>
                            <input type="text" class="form-control" placeholder="Ville" name="city" aria-label="city" id="order_city" required value="Trou Duc" />
                        </div>
                        <div class="col-0 col-md-4">
                            <label for="mail"> Votre e-mail :</label>
                            <input type="email" class="form-control" placeholder="Votre e-mail" name="email" aria-label="Adresse e-mail" id="order_email" pattern="[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*" required="true" value="jacqouille.la.fripouille@trouduc.fr" />
                        </div>
                    </div>
                    <div class="control-group"></div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-info">Commander</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</section>
<!-- Modal Bouton Supprimer -->
<div class="modal fade" id="modalConfirmRemove" data-backdrop="static" data-keyboard="false" tabindex="-1" aria-labelledby="modalConfirmRemoveLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="modalConfirmRemoveLabel">Supprimer un article</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body" id="modalConfirmRemoveBody">
                Souhaitez-vous retirer l'article
                <span id="modal-body-article" class="font-italic font-weight-bold"></span> avec la lentille
                <span id="modal-body-lentilles" class="font-italic font-weight-bold"></span> de votre panier ?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Non, je garde l'article</button>
                <button type="button" class="btn btn-danger" data-dismiss="modal" id="modalConfirmRemoveValid">
                    Oui, je supprime l'article
                </button>
            </div>
        </div>
    </div>
</div>

<?php ob_start(); ?>
<script src="./assets/js/app_will/order.js"></script>
<?php $pageScripts = ob_get_clean(); ?>
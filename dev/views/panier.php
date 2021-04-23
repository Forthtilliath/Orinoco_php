<?php
$pageTitle = 'Orinoco - Panier - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
$pageMessageTitle = 'Dernière Etape !';
$pageMessageDescription = 'Votre commande est si proche, encore un petit pas à faire.';
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xss-inline"> - Affichage du panier</span></h1>
<section id="list_alerts"></section>

<section class="container" id="list_cards">
    <?php for ($i = 0; $i < 1; $i++) : ?>
        <exp-article class="row mb-3 g-md-1" id="card_0">
            <input type="hidden" value="" name="id" id="card_0_id" />
            <div class="col-md-3 col-lg-2 bg-tertiary p-0 border-md border-quinary"><img src="images/loader.gif" id="card_0_image" class="card-img-top card-img-250 card-img-md-150" alt="..."></div>

            <div class="col-xs-6 col-sm-6 col-md-9 col-lg bg-tertiary p-xs-3 border-md border-quinary border-start-0 order-1">
                <div class="card-body d-flex flex-column h-100 justify-content-center align-items-center align-items-center align-items-md-start">
                    <h5 class="card-title"><a href="./" class="text-decoration-none text-dark"><i class="bi bi-link"></i> <span id="card_0_title"></span></a></h5>
                    <p class="card-text text-right">Lentille : <span id="card_0_lenses"></span></p>
                </div>
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-2 bg-tertiary p-md-3 border-start-0 border-md border-quinary order-2 order-xs-3 order-sm-3 order-md-2">
                <div class="pb-3 pt-md-3 text-center">
                    <div class="card-text text-right pb-1">Prix unitaire</div>
                    <div id="card_0_price" class="badge bg-primary text-wrap" style="width: 6rem;font-size:1em">1 657 €</div>
                </div>
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 bg-tertiary p-3 border-start-0 border-md border-quinary text-center order-3 order-xs-2 order-sm-2 order-md-3">
                <div class="align-items-center d-flex flex-column h-100 justify-content-center">
                    <div class="form-floating w-100 form-select-quantity">
                        <select is="exp-select" class="bg-denary form-select text-primary border-primary" id="card_0_quantity"></select>
                        <label class="text-primary" for="card_0_quantity">Quantité</label>
                    </div>
                    <div><button class="btn btn-danger w-auto w-md-100 px-3 mt-2" id="card_0_remove"><i class="bi bi-trash pe-3 d-none d-xxs-inline"></i><span>Supprimer</span></button></div>
                </div>
            </div>

            <div class="col-xs-6 col-sm-6 col-md-4 col-lg-2 bg-tertiary p-md-3 border-start-0 border-md border-quinary order-4">
                <div class="pb-3 pt-md-3 text-center">
                    <div class="card-text text-right pb-1">Sous-total</div>
                    <div id="card_0_subtotal" class="badge bg-primary text-wrap" style="width: 6rem;font-size:1em"></div>
                </div>
            </div>
        </exp-article>
    <?php endfor ?>
</section>
<section class="container">
    <div class="row mb-3 g-md-1">
        <div class="d-none d-lg-block col-lg p-3"></div>
        <div class="col-sm-6 col-lg-4 bg-tertiary p-lg-3 border border-quinary text-center">
            <div class="card-body text-center">
                <div class="card-text text-right fs-5 pb-1">Nombre d'articles</div>
                <div id="cards_nbarticles" class="badge bg-secondary text-wrap fs-5" style="width: 6rem">15</div>
            </div>
        </div>
        <div class="col-sm-6 col-lg-2 bg-tertiary p-lg-3 border border-quinary text-center">
            <div class="card-body text-center">
                <div class="card-text text-right fs-5 pb-1">Total</div>
                <div id="cards_total" class="badge bg-primary text-wrap fs-5" style="width: 6rem"></div>
            </div>
        </div>
</section>

<!-- Modal Bouton Supprimer -->
<section id="list_modals">
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
</section>

<?php ob_start(); ?>
<script src="./assets/js/app/order.js"></script>
<?php $pageScripts = ob_get_clean(); ?>
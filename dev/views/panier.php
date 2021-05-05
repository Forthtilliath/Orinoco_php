<?php
$pageTitle = 'Orinoco - Panier - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
$pageMessageTitle = 'Dernière Etape !';
$pageMessageDescription = 'Votre commande est si proche, encore un petit pas à faire.';
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xss-inline"> - Affichage du panier</span></h1>
<section id="list_alerts"></section>

<section class="container" id="list_cards">
    <exp-article class="row mb-3 g-md-1" id="card_0">
        <input type="hidden" value="" name="id" id="card_0_id" />
        <div class="col-md-3 col-lg-2 bg-tertiary p-0 border-md"><img src="images/spinning-circles.svg" id="card_0_image" class="card-img-top card-img-250 card-img-md-150 object-fit-cover" alt="..."></div>

        <div class="col-xs-6 col-md-9 col-lg bg-tertiary p-xs-3 border-md border-start-0 order-1">
            <div class="card-body d-flex flex-column h-100 justify-content-center align-items-center align-items-center align-items-md-start">
                <h5 class="card-title"><a href="/" class="text-decoration-none text-dark" data-js-link="product" data-js-product-id=""><i class="bi bi-link"></i> <span id="card_0_title"></span></a></h5>
                <p class="card-text text-right">Lentille : <span id="card_0_lenses"></span></p>
            </div>
        </div>

        <div class="col-xs-6 col-md-4 col-lg-2 bg-tertiary p-md-3 border-start-0 border-md order-2 order-xs-3 order-md-2">
            <div class="pb-3 pt-md-3 text-center">
                <div class="card-text text-right pb-1">Prix unitaire</div>
                <div id="card_0_price" class="badge bg-primary text-wrap" style="width: 6rem;font-size:1em">1 657 €</div>
            </div>
        </div>

        <div class="col-xs-6 col-md-4 col-lg-3 col-xl-2 bg-tertiary p-3 border-start-0 border-md text-center order-3 order-xs-2 order-md-3">
            <div class="align-items-center d-flex flex-column h-100 justify-content-center">
                <div class="form-floating w-100 form-select-quantity">
                    <select is="exp-select" class="bg-quaternary form-select text-primary border-primary" id="card_0_quantity"></select>
                    <label class="text-primary" for="card_0_quantity">Quantité</label>
                </div>
                <div class="w-100">
                    <button class="btn btn-danger w-100 px-3 mt-2 form-button-remove" id="card_0_remove" data-bs-toggle="modal" data-bs-target="#modalConfirmRemove">
                        <i class="bi bi-trash pe-2 d-none d-xxs-inline"></i>
                        <span>Supprimer</span>
                    </button>
                </div>
            </div>
        </div>

        <div class="col-xs-6 col-md-4 col-lg-2 bg-tertiary p-md-3 border-start-0 border-md order-4">
            <div class="pb-3 pt-md-3 text-center">
                <div class="card-text text-right pb-1">Sous-total</div>
                <div id="card_0_subtotal" class="badge bg-primary text-wrap" style="width: 6rem;font-size:1em"></div>
            </div>
        </div>
    </exp-article>
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
    <div class="modal fade" id="modalConfirmRemove" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="modalConfirmRemoveLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="modalConfirmRemoveLabel">Supprimer un article</h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body" id="modalConfirmRemoveBody">
                    Souhaitez-vous retirer l'article
                    <span id="modal-body-article" class="font-italic font-weight-bold"></span> avec la lentille
                    <span id="modal-body-lentilles" class="font-italic font-weight-bold"></span> de votre panier ?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Non, je garde l'article</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal" id="modalConfirmRemoveValid">
                        Oui, je supprime l'article
                    </button>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    $page = {
        title: '<?= $pageTitle ?>',
        description: '<?= $pageDescription ?>'
    };
</script>
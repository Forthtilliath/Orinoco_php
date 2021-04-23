<?php
$pageTitle = 'Orinoco - Page produit - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
$pageMessageTitle = 'Voici votre article';
$pageMessageDescription = 'Très bon choix ! Moins cher que gratuit !';
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xss-inline"> - Affichage d'un produit</span></h1>
<section id="list_alerts"></section>
<section class="container-md">
    <div class="mt-3">
        <div class="row g-4" id="list_cards">
            <div class="col" id="card_0">
                <div class="card bg-tertiary">
                    <input type="hidden" value="" name="id" id="card_0_id" />
                    <img src="" id="card_0_image" class="card-img-top card-img-300 card-img-sm-400 card-img-xl-500" alt="...">
                    <div class="card-body">
                        <h5 class="card-title" id="card_0_title"></h5>
                        <p class="card-text nl2cut-4" id="card_0_desc"></p>
                        <p class="card-text text-right">Prix : <span id="card_0_price" class="fw-bold"></span></p>
                    </div>
                    <div class="card-body st-2">
                        <form id="card_0_form">
                            <div class="row g-2">
                                <div class="col-md">
                                    <div class="form-floating">
                                        <select is="exp-select" class="bg-denary form-select text-primary border-primary" id="card_0_lenses"></select>
                                        <label class="text-primary" for="card_0_lenses">Lentille</label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-floating">
                                        <select is="exp-select" class="bg-denary form-select text-primary border-primary" id="card_0_quantity"></select>
                                        <label class="text-primary" for="card_0_quantity">Quantité</label>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center pt-3">
                                <input class="btn btn-secondary w-100 w-sm-auto px-4" type="submit" value="Ajouter au panier" />
                            </div>
                        </form>
                    </div>
                    <div class="card-body st-2">
                        <div class="text-center">
                            <a class="btn btn-primary w-100 w-sm-auto px-4" href="./">Retourner voir tous les articles</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<?php ob_start(); ?>
<script>
    let $id = '<?= $params['id']; ?>';
</script>
<script src="./assets/js/app/produit.js"></script>
<?php $pageScripts = ob_get_clean(); ?>
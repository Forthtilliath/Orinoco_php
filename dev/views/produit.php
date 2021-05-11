<?php
$pageTitle = 'Orinoco - Page produit - Le e-commerce moins cher que gratuit !';
$pageDescription = 'Produit desc';
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xxs-inline"> - Affichage d'un produit</span></h1>
<section id="list_alerts"></section>
<section class="container-md">
    <div class="mt-3">
        <div class="row g-4" id="list_cards">
            <div class="col" id="card_0">
                <div class="card bg-tertiary">
                    <input type="hidden" value="<?= $params['id'] ?>" name="id" id="card_0_id" />
                    <img src="" id="card_0_image" class="card-img-top card-img-300 card-img-sm-400 card-img-xl-500 object-fit-cover" alt="...">
                    <div class="card-body">
                        <h5 class="card-title" id="card_0_title"></h5>
                        <p class="card-text nl2cut-4" id="card_0_desc"></p>
                        <p class="card-text text-right">Prix : <span id="card_0_price" class="fw-bold"></span></p>
                    </div>
                    <div class="card-body border-top border-quinary">
                        <form id="card_0_form">
                            <div class="row g-2">
                                <div class="col-md">
                                    <div class="form-floating">
                                        <select is="exp-select" class="bg-quaternary form-select text-primary border-primary" id="card_0_lenses"></select>
                                        <label class="text-primary" for="card_0_lenses">Lentille</label>
                                    </div>
                                </div>
                                <div class="col-md">
                                    <div class="form-floating">
                                        <select is="exp-select" class="bg-quaternary form-select text-primary border-primary" id="card_0_quantity"></select>
                                        <label class="text-primary" for="card_0_quantity">Quantité</label>
                                    </div>
                                </div>
                            </div>
                            <div class="text-center pt-3">
                                <input class="btn btn-secondary text-senary w-100 w-sm-auto px-4" type="submit" value="Ajouter au panier" />
                            </div>
                        </form>
                    </div>
                    <div class="card-body border-top border-quinary">
                        <div class="text-center">
                            <a class="btn btn-primary text-senary w-100 w-sm-auto px-4" href="/">Retourner voir tous les articles</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<script>
    $page = {
        title: '<?= $pageTitle ?>',
        description: '<?= addslashes($pageDescription) ?>'
    };
</script>
<?php
$pageTitle = "Orinoco - Le e-commerce moins cher que gratuit !";
$pageDescription = "";
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xxs-inline"> - Le e-commerce moins cher que gratuit</span></h1>
<section id="list_alerts"></section>
<section class="mt-4">
    <div class="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-xl-4 g-4 justify-content-center" id="list_cards">
        <exp-article class="col" id="card_0">
            <div class="card bg-tertiary">
                <input type="hidden" value="" name="id" id="card_0_id" />
                <a href="" data-js-link="product" data-js-product-id="">
                    <img src="images/loader.gif" id="card_0_image" class="card-img-top card-img-200 card-img-lg-250 card-img-xl-300 object-fit-cover" alt="...">
                </a>
                <div class="card-body">
                    <h5 class="card-title" id="card_0_title"></h5>
                    <p class="card-text nl2cut-3" id="card_0_desc"></p>
                    <p class="card-text text-right">Prix : <span id="card_0_price" class="fw-bold"></span></p>
                </div>
                <div class="card-body border-top border-quinary">
                    <form id="card_0_form">
                        <div class="row g-2">
                            <div class="col-xl">
                                <div class="form-floating">
                                    <select is="exp-select" class="bg-quaternary form-select text-primary border-primary" id="card_0_lenses"></select>
                                    <label class="text-primary" for="card_0_lenses">Lentille</label>
                                </div>
                            </div>
                            <div class="col-lg">
                                <div class="form-floating">
                                    <select is="exp-select" class="bg-quaternary form-select text-primary border-primary" id="card_0_quantity"></select>
                                    <label class="text-primary" for="card_0_quantity">Quantité</label>
                                </div>
                            </div>
                        </div>
                        <div class="text-center pt-3">
                            <input class="btn btn-secondary text-senary w-100 w-xl-auto px-4" type="submit" value="Ajouter au panier" />
                        </div>
                    </form>
                </div>
                <div class="card-body border-top border-quinary">
                    <div class="text-center">
                        <a class="btn btn-primary text-senary w-100 w-xl-auto px-4" href="" data-js-link="product" data-js-product-id="">Voir le produit</a>
                    </div>
                </div>
            </div>
        </exp-article>
    </div>
    <?php $nbPages = 1; ?>
    <?php if ($nbPages > 1) : ?>
        <nav aria-label="Pagination">
            <ul class="pagination justify-content-center mt-5">
                <li class="page-item disabled">
                    <a class="page-link">Précédente</a>
                </li>
                <li class="page-item active" aria-current="page">
                    <span class="page-link">1</span>
                </li>
                <li class="page-item">
                    <a class="page-link" href="/2">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="/3">3</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="/2">Suivante</a>
                </li>
            </ul>
        </nav>
    <?php endif ?>
</section>

<script>
    $page = {
        title: '<?= $pageTitle ?>',
        description: '<?= $pageDescription ?>'
    };
</script>
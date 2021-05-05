<?php
$pageTitle = "Orinoco - Le e-commerce moins cher que gratuit !";
$pageDescription = "";
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xxs-inline"> - Le e-commerce moins cher que gratuit</span></h1>
<section id="list_alerts">
    <!--<div class="alert alert-danger alert-dismissible fade show" role="alert">
        <strong>Holy guacamole!</strong> You should check in on some of those fields below.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    <div class="row fixed-bottom">
        <div class="col-lg-5 col-md-12">
            <div class="alert alert-success alert-dismissible fade show" role="alert">
                <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                <h4 class="alert-heading">Well done!</h4>
                <p>This is an alert within a column. The column can be made any size at different viewpoints.</p>
            </div>
        </div>
    </div>
    <div class="row">
        <div class="col-lg-6 col-md-12">
            <div class="alert-warning alert-dismissible shadow my-3 pe-3" role="alert" style="border-radius: 0px">
                <div class="row">
                    <div class="col-2">
                        <div class="d-flex h-100 text-center" style="background:#856404">
                            <svg width="3em" height="3em" style="color:#FFF3CD" viewBox="0 0 16 16" class="m-2 bi bi-cone-striped mx-auto" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.97 4.88l.953 3.811C10.159 8.878 9.14 9 8 9c-1.14 0-2.158-.122-2.923-.309L6.03 4.88C6.635 4.957 7.3 5 8 5s1.365-.043 1.97-.12zm-.245-.978L8.97.88C8.718-.13 7.282-.13 7.03.88L6.275 3.9C6.8 3.965 7.382 4 8 4c.618 0 1.2-.036 1.725-.098zm4.396 8.613a.5.5 0 0 1 .037.96l-6 2a.5.5 0 0 1-.316 0l-6-2a.5.5 0 0 1 .037-.96l2.391-.598.565-2.257c.862.212 1.964.339 3.165.339s2.303-.127 3.165-.339l.565 2.257 2.391.598z" />
                            </svg>
                        </div>
                    </div>
                    <div class="alert col my-auto ps-1 pe-5">
                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        <div class="row">
                            <p style="font-size:18px" class="mb-0 font-weight-light"><b class="mr-1">Warning:</b> This example text in a custom alert.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>-->
</section>
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
                    <a class="page-link" href="./2">2</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="./3">3</a>
                </li>
                <li class="page-item">
                    <a class="page-link" href="./2">Suivante</a>
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
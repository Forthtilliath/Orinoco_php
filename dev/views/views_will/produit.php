<?php
$pageTitle = 'Orinoco - Page produit - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
$pageMessageTitle = 'Voici votre article';
$pageMessageDescription = 'Très bon choix ! Moins cher que gratuit !';
?>

<section class="container d-none" id="message-error">
    <input type="hidden" id="page" value="product" />
    <div class="alert alert-light alert-dismissible fade show mt-4" role="alert">
        <h1 class="alert-heading text-center">Erreur</h1>
        <p class="text-center text-danger">Produit non trouvé, veuillez retourner sur la page d'accueil.</p>
        <p class="text-center btn-dark "><a class="text-white" href="index.html">Retour sur la page d'accueil</a></p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
    </div>
</section>
<section class="container mt-3" id="cards_0">
    <form action="#" method="GET" id="cards_0_form">
        <input type="hidden" value="" name="id" id="cards_0_id" />
        <div class="row justify-content-center">
            <div class="card mb-4" style="width: 90%">
                <img src="" class="card-img-top card-img-product" alt="" />
                <div class="card-body">
                    <h5 class="card-title" id="product-name"></h5>
                    <p class="card-text" id="product-description"></p>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item"><span>Prix : </span><span id="cards_0_price"></span></li>
                        <li class="list-group-item">
                            <select class="form-select inputGroupSelect01" name="product-lens" id="cards_0_lenses">
                                <option value="" selected>Lentilles</option>
                            </select>
                            <select class="form-select inputGroupSelect02" id="cards_0_quantity">
                                <option value="0" selected>Quantité</option>
                                <!-- Les autres options sont générés via javascript -->
                            </select>
                            <span id="cards_0_select-msg" class="msg-select d-flex mt-3"></span>
                        </li>
                    </ul>
                    <div class="row">
                        <div class="col-12 col-md-6 text-center text-md-left">
                            <input type="submit" class="btn btn-success mt-1" value="Ajouter au panier" />
                        </div>
                        <div class="col-12 col-md-6 text-center text-md-right">
                            <a href="./" class="btn btn-info mt-1">Voir les autres articles</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </form>
</section>

<?php ob_start(); ?>
<script>
    let $id = '<?= $params['id']; ?>';
</script>
<script src="./assets/js/app_will/produit.js"></script>
<?php $pageScripts = ob_get_clean(); ?>
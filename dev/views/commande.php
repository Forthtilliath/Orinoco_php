<?php
$pageTitle = 'Orinoco - Validation de la commande - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xxs-inline"> - Validation de votre commande</span></h1>

<section class="container-sm bg-tertiary rounded mt-4 p-3" id="commande" style="max-width:800px">
    <h2>Vos coordonnées</h2>
    <form class="needs-validation" id='formContact' novalidate>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="prenom">Prénom</label>
                <input type="text" class="form-control" id="prenom" placeholder="Prénom" required pattern="[A-Za-z \-]+">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="nom">Nom de famille</label>
                <input type="text" class="form-control" id="nom" placeholder="Nom de famille" required pattern="[A-Za-z \-]+">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="adresse">Adresse</label>
                <input type="text" class="form-control" id="adresse" placeholder="Adresse" required pattern="[A-Za-z0-9,. \-]+">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="ville">Ville</label>
                <input type="text" class="form-control" id="ville" placeholder="Ville" required pattern="[A-Za-z \-]+">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col mb-3">
                <label for="email">Email</label>
                <input type="email" class="form-control" id="email" placeholder="Email" required pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
        </div>
        <div class=" text-end">
            <button class="btn btn-primary" type="submit">Valider la commande</button>
        </div>
    </form>
</section>



<script>
    $page = {
        title: '<?= $pageTitle ?>',
        description: '<?= addslashes($pageDescription) ?>'
    };
</script>
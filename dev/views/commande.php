<?php
$pageTitle = 'Orinoco - Validation de la commande - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
?>

<h1 class="text-center page-title">Orinoco<span class="d-none d-xxs-inline"> - Validation de votre commande</span></h1>

<section class="container-sm bg-tertiary" id="commande" style="max-width:800px">
    <h1>Formulaires</h1>
    <form class="needs-validation" novalidate>
        <div class="row">
            <div class="col-md-6 mb-3">
                <label for="prenom">Prénom</label>
                <input type="text" class="form-control" id="prenom" placeholder="Pierre" required pattern="[A-Za-z \-]*">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="nom">Nom de famille</label>
                <input type="text" class="form-control" id="nom" placeholder="Giraud" required pattern="[A-Za-z \-]*">
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="adresse">Adresse</label>
                <input type="text" class="form-control" id="adresse" placeholder="Adresse" required>
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col-md-6 mb-3">
                <label for="ville">Ville</label>
                <input type="text" class="form-control" id="ville" placeholder="Ville" required>
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
            <div class="col mb-3">
                <label for="email">Email</label>
                <input type="text" class="form-control" id="email" placeholder="Email" required>
                <div class="valid-feedback">Ok !</div>
                <div class="invalid-feedback">Valeur incorrecte</div>
            </div>
        </div>
        <button class="btn btn-primary" type="submit">Envoyer</button>
    </form>
    <script>
        /*La fonction principale de ce script est d'empêcher l'envoi du formulaire si un champ a été mal rempli
         *et d'appliquer les styles de validation aux différents éléments de formulaire*/
        (function() {
            'use strict';
            window.addEventListener('load', function() {
                let forms = document.getElementsByClassName('needs-validation');
                let validation = Array.prototype.filter.call(forms, function(form) {
                    form.addEventListener('submit', function(event) {
                        if (form.checkValidity() === false) {
                            event.preventDefault();
                            event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                    }, false);
                });
            }, false);
        })();
    </script>
</section>



<script>
    $page = {
        title: '<?= $pageTitle ?>',
        description: '<?= addslashes($pageDescription) ?>'
    };
</script>
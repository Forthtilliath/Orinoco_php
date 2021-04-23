<?php
$pageTitle = "Orinoco - Le e-commerce moins cher que gratuit !";
$pageDescription = "";
$pageMessageTitle = "Bienvenue chez Orinoco";
$pageMessageDescription = "Nous sommes ravis de votre visite sur notre boutique en ligne !";
?>

<section class="container">
    <div id="list_cards" class="row justify-content-center mt-4 mx-0 w-md-100"></div>
</section>

<?php ob_start(); ?>
<script src="./assets/js/app_will/index.js"></script>
<?php $pageScripts = ob_get_clean(); ?>
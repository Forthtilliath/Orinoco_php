<?php
$pageTitle = 'Orinoco - Bon de commande - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
$pageMessageTitle = '';
$pageMessageDescription = '';
?>

<section class="container mt-3 mb-3 bg-white opacity-change">
    <div class="row justify-content-center pt-5 pb-5">
        <div class="text-center">
            <h1 class="text-responsive-3">Confirmation de votre commande n°</h1>
            <h2 class="text-responsive-3" id="order_number"></h2>
        </div>
    </div>
    <div class="row justify-content-center pt-2 pb-2">
        <p class="text-responsive-2">Nous vous remercions pour votre confiance.</p>
    </div>
    <div class="row justify-content-center pt-2 pb-2">
        <p class="text-responsive-2">Votre commande sera expediée dans les plus bref délais !</p>
    </div>
    <div class="row justify-content-center text-center pt-2 pb-5">
        <p class="text-responsive-2">
            Pour toute demande complémentaire, veuillez nous contacter depuis le lien "contactez-nous" en bas de
            votre page.
        </p>
    </div>
</section>

<?php ob_start(); ?>
<script src="./assets/js/app_will/order-confirmation.js"></script>
<?php $pageScripts = ob_get_clean();
?>
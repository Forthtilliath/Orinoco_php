<?php
$pageTitle = 'Orinoco - Bon de commande - Le e-commerce moins cher que gratuit !';
$pageDescription = '';
?>

<div id="order-success" class="container d-none">
    <h1 class="text-center page-title rounded bg-success py-2">Merci pour votre commande</h1>

    <section class="mt-3 mb-3 bg-tertiary rounded p-3">
        <div class="row row-cols-1 justify-content-center text-center">
            <div class="col">
                <img width="300" src="/images/order-confirmation-1000_1000.jpg" />
                <h2 class="fw-bold">Merci <span id="order-contact-name"></span>,</h2>
                <h3>A bientot !</h3>
            </div>
            <div class="col-auto my-2 border border-primary rounded p-2">
                <div id="order-orderId"></div>
                <div class="h4 text-muted">Numéro de la commande</div>
            </div>
            <div class="col my-2">
                <div class="text-responsive-2">Un e-mail de confirmation a été envoyé à <span id="order-contact-email"></span></div>
                <?php date_default_timezone_set('Europe/Paris'); ?>
                <div>Votre commande a été effectuée à <?= date('H\hi'); ?>. Des questions ? Contactez-nous depuis le lien en bas de votre page.</div>
            </div>
            <div class="col my-2">
                <div>
                    <button type="button" class="btn btn-quaternary border-primary" onclick="generatePdf()">
                        <i class="bi bi-save pe-2"></i>Télécharger ma facture
                    </button>
                </div>
            </div>
            <div></div>
        </div>
    </section>
    <section class="bg-tertiary" id="contentPdf">
        <table id="tab_products" class="table table-striped">
            <colgroup>
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
                <col width="20%">
            </colgroup>
            <thead>
                <tr class='warning'>
                    <th>Article</th>
                    <th>Lentille</th>
                    <th>Prix unité</th>
                    <th>Quantité</th>
                    <th>Prix</th>
                </tr>
            </thead>
            <tbody>
            </tbody>
        </table>
    </section>
</div>

<div id="order-fail" class="container d-none">
    <h1 class="text-center page-title rounded bg-danger">Une erreur inattendue est survenue</h1>
</div>

<script>
    $page = {
        title: '<?= $pageTitle ?>',
        description: '<?= addslashes($pageDescription) ?>'
    };
</script>
let monApi = new Api('panier', 'http://localhost:3000/api/cameras/');
let monRouter = monApi.router.loadRoutes();
let monPanier = monApi.getPanier();

window.onload = () => {
    monPanier.loadMiniBascket();
    // Chargement du fichier json contenant les données des produits
    monApi
        .loadDatas()
        .then(() => {
            // Une fois les données des produits et des routes chargées
            monRouter.done(() => {
                let routeName = monApi.router.getCurrentPageName();
                if (routeName !== undefined) {
                    executeFunctionByName(
                        monApi.router.getMainFunction(routeName),
                        window,
                        monApi.getProduit($('#card_0_id').val()),
                    );
                    $('#pageContent a').on('click', monApi.clickLien);
                } else {
                    monApi.router.changePage('/404');
                }
            });
        })
        .catch((error) => {
            if (error.status === 404) monApi.router.changePage('/404/json', error.responseURL);
        });

    $('#bt_panier').attr('data-items', monPanier.NbProduits);
};

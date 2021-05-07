let monApi = new Api('panier', '/assets/js/datas/cameras.json', 'http://localhost:3000/api/cameras/');
// Initialisation du chargement des routes
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
                    executeFunctionByName(monApi.router.getMainFunction(routeName), window);
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

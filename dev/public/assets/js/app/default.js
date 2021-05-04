let monApi = new Api('panier', '/assets/js/datas/cameras.json', 'http://localhost:3000/api/cameras/');
// Initialisation du chargement des routes
let monRouter = monApi.router.loadRoutes();
let monPanier = monApi.getPanier();
monApi.addScript($('#scriptPage').attr('src'));
// console.log("Liste des scripts", monApi.listScripts);

window.onload = () => {
    // Chargement du fichier json contenant les données des produits
    monApi
        .loadDatas()
        .then(async () => {
            // Une fois les données des produits et des routes chargées
            monRouter.done(() => {
                let routeName = monApi.router.getCurrentPageName();
                executeFunctionByName(monApi.router.getMainFunction(routeName), this);
                monApi.router.addPage(routeName, $('#pageContent').html());
            });
        })
        .catch((error) => {
            console.error('Erreur', error.status, ':', error.statusText);
            console.error('URL :', error.responseURL);
            monApi.jsonLoaded = false;
        });
};

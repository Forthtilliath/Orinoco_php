// window.onload = () => {
    // Création de l'objet Api avec le cookie 'panier'
    // let monApi = new Api('panier', 'assets/js/datas/cameras.json', 'http://localhost:3000/api/cameras/');
    // let monPanier = monApi.getPanier();

    const editCard = async (camera) => {
        // Id de l'article (dans le code)
        let id = monApi.getElementId('article', 0); // 'cards_{{i}}'

        let img = monApi.getElement('image', id);
        // Récupération des données en mettant la fonction + le nom attribué dans l'api
        img.setAttribute('src', monApi.isLocal() ? camera.Image.replace('http://localhost:3000/', '') : camera.Image);

        monApi.getElement('idProduit', id).value = camera.Id;
        monApi.getElement('nom', id).textContent = camera.Nom;
        monApi.getElement('description', id).textContent = camera.Description;
        monApi.getElement('lentilles', id).addOptions(camera.Lentilles);
        // Ajoute les options allant de 1 à camera.Stock
        monApi.getElement('quantity', id).addOptions(getArrayWithValues(1, camera.Stock));
        monApi.getElement('prix', id).textContent = camera.Prix.numberFormat();

        // Ajout de l'evenement sur le bouton Ajouter au panier
        monApi.getElement('form', id).addEventListener('submit', monPanier.setPanier);
    };

    // la fonction loadPage a ces données mise dans la fonction camera.
    const showCard = (cameras) => {
        // Si un seul élément
        let id = monApi.router.getUri().split('/').splice(-1)[0];
        let produit = monApi.getProduit(id);
        
        if (produit instanceof Array) {
            editCard(produit[0]);
        
        } else {
            console.log("Produit non trouvé");
        }
    };

    let datas = {};

    function loadDatasFromLocal() {
        console.log("Liste des produits",monApi.ListeProduits);
        console.log("Id du produit",monApi.idProduitToShow);
        monApi.ListeProduits.some((e) => e.id === monApi.idProduitToShow);
        console.log(monApi.ListeProduits.some((e) => e.id === monApi.idProduitToShow));
        if (monApi.ListeProduits.length > 0) {
            $id = monApi.idProduitToShow;
        }
    };

    function loadDatasFromServer() {

    }

    const loadDatas = async () => {
        // Récupère le param get pour l'id de l'objet afin d'avoir une fiche produit
        //let $id = getQueryString('id'); // NOTE Définit dans le php
        const datas = monApi.isLocal() ? loadDatasFromLocal() : loadDatasFromServer();
        showCard(datas);
    };

window['showCard'] = showCard;

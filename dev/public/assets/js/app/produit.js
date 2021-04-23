window.onload = () => {
    // Création de l'objet Api avec le cookie 'panier'
    let monApi = new Api('panier', 'assets/js/datas/cameras.json', 'http://localhost:3000/api/cameras/');
    let monPanier = monApi.getPanier();

    const editCard = async (i, camera) => {
        // Id de l'article (dans le code)
        let id = monApi.getElementId('article', i); // 'cards_{{i}}'

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
    };;

    // le i permet d avoir l'indice de l article.
    let i = 0;
    // la fonction loadPage a ces données mise dans la fonction camera.
    const loadPage = (cameras) => {
        // Si un seul élément
        if (monApi.ListeProduits.length == 1) {
            editCard(i, monApi.ListeProduits[0]);
        } else {
            // Produit non trouvé
            document.querySelector('#message-error').show('');
            document.querySelector('#cards_0').hide();
            document.querySelector('#message-valid').hide();
            redirigeVersHome();
        }
    };

    let datas = {};
    const loadDatas = async () => {
        // Récupère le param get pour l'id de l'objet afin d'avoir une fiche produit
        //let $id = getQueryString('id'); // NOTE Définit dans le php

        //if (SERVER_LOCAL) {
        if (monApi.isLocal()) {
            // NOTE Version avec le fichier json
            datas = await monApi.getProducts();
            if (typeof $id === 'string') {
                datas.forEach((val) => {
                    if (val['_id'] == $id) {
                        datas = val;
                        return;
                    }
                });
            }
        } else {
            // NOTE Version avec le lien localhost
            if (typeof $id === 'string') {
                //monApi.setUrl('http://localhost:3000/api/cameras/' + $id);
                monApi.addIdToUrl($id);
            }
            datas = await monApi.getProducts();
        }
        //monApi.addProduits('camera', datas);
        monApi.addProduits('camera', [datas]);
        loadPage(datas);
    };

    loadDatas();
};

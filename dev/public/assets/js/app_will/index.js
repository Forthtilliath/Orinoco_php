window.onload = () => {
    //const SERVER_LOCAL = true;
    // Création de l'objet Api avec le cookie 'panier'
    //let monApi = new Api('panier', SERVER_LOCAL ? 'js/datas/cameras.json' : 'http://localhost:3000/api/cameras/');
    let monApi = new Api('panier', 'assets/js/datas/cameras.json', 'http://localhost:3000/api/cameras/');
    let monPanier = monApi.getPanier();

    const createCard = async (i, camera) => {
        // Id de l'article (dans le code)
        let id = 'cards_' + i;

        template = `<form action="#" method="GET" id="${id}_form">\
                <input type="hidden" value="" name="id" id="${id}_id" />\
                <img src="" class="card-img-top card-img-index" alt="" />\
                <div class="card-body">\
                    <h5 class="card-title"></h5>\
                    <p class="card-text unstretched-link"></p>\
                    <ul class="list-group list-group-flush">\
                        <li class="list-group-item unstretched-link"><span>Prix : </span><span id="${id}_price" ></span></li>\
                        <li class="list-group-item unstretched-link">\
                            <select class="form-select inputGroupSelect01 unstretched-link" id="${id}_lenses">\
                            <option value="" selected>Lentilles</option>\
                            </select>\
                        <li class="list-group-item unstretched-link">\
                            <select class="form-select inputGroupSelect02 unstretched-link" id="${id}_quantity">\
                                <option value="0" selected>Quantité</option>\
                            </select>\
                        </li>\
                    </ul>\
                    <span id="${id}_select-msg" class="d-flex msg-select mb-3"></span>\
                    <div class="row">\
                        <div class="col-auto text-left unstretched-link ">\
                            <input type="submit" class="unstretched-link btn btn-success" value="Ajouter au panier" />\
                        </div>\
                        <div class="col-auto text-right position-static">\
                            <a href="#" class="stretched-link btn btn-info" id="${id}_link">Détails</a>\
                        </div>\
                    </div>\
                </div>\
            </form>`;

        // Création de l'article
        let div = document.createElement('div');
        div.id = id;
        div.classList.add('card', 'mb-4', 'mx-2', 'border-0', 'shadow', 'w-md-100');
        div.innerHTML = template;
        monApi.getElement('parent').appendChild(div);

        let img = monApi.getElement('image', id);
        // Récupération des données en mettant la fonction + le nom attribué dans l'api
        //img.setAttribute('src', SERVER_LOCAL ? camera.Image.replace('http://localhost:3000/', '') : camera.Image);
        img.setAttribute('src', monApi.isLocal() ? camera.Image.replace('http://localhost:3000/', '') : camera.Image);
        img.onload = () => img.replaceWith(getThumbnail(img, 200));

        monApi.getElement('idProduit', id).value = camera.Id;
        monApi.getElement('nom', id).textContent = camera.Nom;
        monApi.getElement('description', id).textContent = camera.Description;
        monApi.getElement('lentilles', id).addOptions(camera.Lentilles);
        // Ajoute les options allant de 1 à camera.Stock
        monApi.getElement('quantity', id).addOptions(getArrayWithValues(1, camera.Stock));
        monApi.getElement('prix', id).textContent = camera.Prix.numberFormat();
        //monApi.getElement('lien', id).href = '/produit:' + camera.Id;
        monApi.getElement('lien', id).href = monApi.goToProduct(camera.Id);

        // Ajout de l'evenement sur le bouton Ajouter au panier
        monApi.getElement('form', id).addEventListener('submit', monPanier.setPanier);
    };

    // le i permet d avoir l'indice de l article.
    let i = 0;
    // la fonction loadPage a ces données mise dans la fonction camera.
    const loadPage = () => {
        // Si le tableau des produits contient au moins un article
        if (monApi.ListeProduits.length > 0) {
            for (let unProduit of monApi.ListeProduits) {
                createCard(i, unProduit);
                i++;
            }
        } else {
            // TODO Afficher un message sur le site si aucun article n'est disponible
            console.error('Erreur');
        }
    };

    const loadDatas = async () => {
        // Récupération des données de l'api pour les mettre dans la fonction loadPage
        let datas = await monApi.getProducts();
        monApi.addProduits('camera', datas);
        loadPage();
    };

    loadDatas();
};

window.onload = () => {
    // Création de l'objet Api avec le cookie 'panier'
    let monApi = new Api('panier', 'assets/js/datas/cameras.json', 'http://localhost:3000/api/cameras/');
    let monPanier = monApi.getPanier();

    const createCard = async (i, camera) => {
        let id = monApi.getElementId('article', i); // 'cards_{{i}}'

        // Si y'a plus d'un élément, on clone le premier élément
        if (i == 0) {
            // On affiche le premier élément (le seul disponible dans le html)
            monApi.getElement('article', 0, '#').show('');
        } else {
            // Clone le premier card
            let card = monApi.getElement('article', 0, '#').cloneNode(true);
            // Ajoute au DOM
            monApi.getElement('parent').appendChild(card);
            // Remplace les id cards_0 par l'id dynamique
            card.outerHTML = card.outerHTML.replaceAll(
                monApi.getElementId('article', 0),
                monApi.getElementId('article', i),
            );
        }

        let img = monApi.getElement('image', id);
        // Récupération des données en mettant la fonction + le nom attribué dans l'api
        img.setAttribute('src', monApi.isLocal() ? camera.Image.replace('http://localhost:3000/', '') : camera.Image);
        //img.onload = () => img.replaceWith(getThumbnail(img, 200));

        monApi.getElement('idProduit', id).value = camera.Id;
        monApi.getElement('nom', id).textContent = camera.Nom;
        monApi.getElement('description', id).textContent = camera.Description;
        monApi.getElement('lentilles', id).removeOptions();
        monApi.getElement('lentilles', id).addOptions(camera.Lentilles);
        // Ajoute les options allant de 1 à camera.Stock
        if (i == 0) monApi.getElement('quantity', id).addOptions(getArrayWithValues(1, camera.Stock));
        monApi.getElement('prix', id).textContent = camera.Prix.numberFormat();
        monApi.getElements('links', id).forEach((element) => {
            element.href = './produit:' + camera.Id;
        });

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

    loadDatas()
        .then(() => {
            console.log('Connected');
        })
        .catch((error) => {
            console.error('Erreur', error.status, ':', error.statusText);
            console.error('URL :', error.responseURL);
        });
};

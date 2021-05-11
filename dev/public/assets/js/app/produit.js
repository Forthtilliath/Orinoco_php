const editCard = async (camera) => {
    let id = monApi.getElementId('article', 0);

    let img = monApi.getElement('image', id);
    // Récupération des données en mettant la fonction + le nom attribué dans l'api
    img.setAttribute('src', camera.Image);

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
const showCard = (produit) => {
    if (produit instanceof Camera) {
        editCard(produit);
    } else {
        console.log('Produit non trouvé');
    }
};

window['showCard'] = showCard;

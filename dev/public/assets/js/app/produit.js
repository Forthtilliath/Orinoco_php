const editCard = async (camera) => {
    let id = monApi.getElementId('article', 0);

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
        editCard(produit);
    } else {
        console.log('Produit non trouvé');
    }
};

function loadDatasFromLocal() {
    monApi.ListeProduits.some((e) => e.id === monApi.idProduitToShow);
    console.log(monApi.ListeProduits.some((e) => e.id === monApi.idProduitToShow));
    if (monApi.ListeProduits.length > 0) {
        $id = monApi.idProduitToShow;
    }
}

function loadDatasFromServer() {}

const loadDatas = async () => {
    const datas = monApi.isLocal() ? loadDatasFromLocal() : loadDatasFromServer();
    showCard(datas);
};

window['showCard'] = showCard;

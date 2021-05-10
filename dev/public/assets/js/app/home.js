/**
 *
 * @param {number} i Indice de la carte
 * @param {object} camera Objet Camera
 * @param {string} camera.Stock Id de l'article
 * @param {number} camera.Stock Quantité en stock de l'article
 * @param {string} camera.Image URL vers l'image de l'article
 * @param {string} camera.Nom Nom de l'article
 * @param {string} camera.Description Description de l'article
 * @param {string[]} camera.Lentilles Lentilles de l'article
 * @param {number} camera.Prix Prix de l'article
 */
const createCard = (i, camera) => {
    let id = monApi.getElementId('article', i);

    if (i == 0) {
        monApi.getElement('quantity', id).addOptions(getArrayWithValues(1, camera.Stock));
    } else {
        createNewCard(i);
    }

    monApi.getElement('image', id).setAttribute('src', camera.Image);
    //img.onload = () => img.replaceWith(getThumbnail(img, 200));

    monApi.getElement('idProduit', id).value = camera.Id;
    monApi.getElement('nom', id).textContent = camera.Nom;
    monApi.getElement('description', id).textContent = camera.Description;
    monApi.getElement('lentilles', id).removeOptions();
    monApi.getElement('lentilles', id).addOptions(camera.Lentilles);
    monApi.getElement('prix', id).textContent = camera.Prix.numberFormat();
    monApi.getElements('lienProduit', id).forEach((element) => {
        element.href = monApi.goToProduct(camera.Id);
        element.setAttribute('data-js-product-id', camera.Id);
    });

    // Ajout de l'evenement sur le bouton Ajouter au panier
    monApi.getElement('form', id).addEventListener('submit', monPanier.setPanier);
};

const showCards = () => {
    if (monApi.ListeProduits.length > 0) {
        let i = 0;
        for (let unProduit of monApi.ListeProduits) {
            createCard(i++, unProduit);
        }
        hideAndShow($('#no_products'), $('#list_cards'));
    } else {
        hideAndShow($('#list_cards'), $('#no_products'));
    }
};

window['showCards'] = showCards;

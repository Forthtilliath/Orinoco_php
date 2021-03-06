/**
 *
 */
class Panier {
    /**
     *
     * @param {string} nameCookie Nom du cookie
     */
    constructor(nameCookie, options = {}, api) {
        this.nameCookie = nameCookie;
        this.tabProduits = this.loadPanier();
        this.total = this.calcTotal();
        this.nbProduits = this.calcNbProduits();
        this.options = options;
        this.quantityMax = 5; // TODO mettre une quantité max de 5 article present dans le panier
        this.api = api;
        this.timeout = null;
    }

    get Total() {
        return this.total;
    }

    get NbProduits() {
        return this.nbProduits;
    }

    calcNbProduits() {
        return this.tabProduits.reduce((a, b) => a + b.quantity, 0);
    }

    calcTotal() {
        return this.tabProduits.reduce((a, b) => a + b.quantity * b.price, 0);
    }

    reset = () => {
        this.nbProduits = 0;
        this.total = 0;
        this.tabProduits = [];
    };

    /**
     * Réinitialise le panier
     */
    resetPanier = () => {
        this.total = 0;
        this.tabProduits = this.loadPanier();

        let id = this.api.getElementId('article', ''); // cards_
        // Ensemble des cards sauf l'article 0
        let allCardsExceptFirst = document.querySelectorAll(`article[id^=${id}]:not(:first-child)`);

        // Cache l'element 0
        this.api.getElement('article', 0, '#').hide();
        this.setDisplayMiniBascketNbProduits();
        // Supprime tous les autres
        allCardsExceptFirst.forEach((elem) => elem.remove());
    };

    /** Ajoute un écouteur pour savoir si le storage a ét modifié */
    createListener = () => {
        window.addEventListener(
            'storage',
            () => {
                this.resetPanier();
                this.setDisplayPanier();
                this.display();
            },
            false,
        );
    };

    /**
     * Modifie le storage
     */
    setCookie = () => {
        localStorage.set(this.nameCookie, this.tabProduits);
    };

    /**
     * Charge le panier à partir d'un cookie
     * @returns {Array}
     */
    loadPanier = () => {
        // Initialisation du panier s'il n'existe toujours pas, sinon on récupère son contenu
        return localStorage.has(this.nameCookie) ? localStorage.get(this.nameCookie) : [];
    };

    /**
     * Retourne la position d'un id associé à une lentille dans le panier
     * @param {string} id Id du produit
     * @param {string} lentille Lentille choisie
     * @returns {number} Position du produit dans le panier
     */
    getPosition = (id, lentille) => {
        for (let i = 0, imax = this.tabProduits.length; i < imax; i++) {
            if (this.tabProduits[i]['lenses'] == lentille && this.tabProduits[i]['id'] == id) {
                return i;
            }
        }
        return -1;
    };

    /**
     * Modifie l'affiche de la page panier en fonction de si le panier contient ou non des articles
     */
    setDisplayPanier = () => {
        if (this.options.elemsBasketFull === null || this.options.elemsBasketEmpty === null) return;

        let elemsToShow = []; // Tableau des éléments que l'on souhaite afficher
        let elemsToHide = []; // Tableau des éléments que l'on souhaite masquer
        if (this.tabProduits.length > 0) {
            elemsToShow = this.api.options.elemsBasketFull;
            elemsToHide = this.api.options.elemsBasketEmpty;
        } else {
            elemsToShow = this.api.options.elemsBasketEmpty;
            elemsToHide = this.api.options.elemsBasketFull;
        }
        // $(elemsToShow.join(',')).removeClass('d-none').addClass('d-block');
        // $(elemsToHide.join(',')).removeClass('d-block').addClass('d-none');
        hideAndShow($(elemsToHide.join(',')), $(elemsToShow.join(',')), 'd-block', 'd-block');
    };

    /**
     * Affiche l'ensemble des articles du panier
     */
    display = () => {
        for (let i = 0, imax = this.tabProduits.length; i < imax; i++) {
            let id = this.api.getElementId('article', i); // 'cards_{{i}}'

            // Si y'a plus d'un élément, on clone le premier élément
            if (i == 0) {
                // On affiche le premier élément (le seul disponible dans le html)
                // this.api.getElement('article', 0, '#').show();
            } else {
                createNewCard(i);
            }

            this.api.getElement('idProduit', id).value = this.tabProduits[i].id;
            this.api.getElement('lentilles', id).textContent = this.tabProduits[i].lenses;
            this.api.getElement('prix', id).textContent = this.tabProduits[i].price.numberFormat();
            this.api.getElement('image', id).src = this.tabProduits[i].img;
            // TODO Si image existe, ajouter la classe object-fit-cover (object-fit-none)
            this.api.getElement('nom', id).textContent = this.tabProduits[i].name;
            // this.api.getElement('linknom', id).href = this.api.goToProduct(this.tabProduits[i].id);
            this.api.getElement('lienProduit', id).href = this.api.goToProduct(this.tabProduits[i].id);
            this.api.getElement('lienProduit', id).setAttribute('data-js-product-id', this.tabProduits[i].id);
            this.api.getElement('lienProduit', id).addEventListener('click', this.api.clickLienProduit);

            let selectQuantity = this.api.getElement('quantity', id);
            // Récupère la quantité choisit, sachant qu'elle est cappé à quantityMax
            let quantityInSelect =
                this.tabProduits[i].quantity > this.quantityMax ? this.quantityMax : this.tabProduits[i].quantity;
            // Si premier élément, on génère les options
            if (i == 0) {
                this.api
                    .getElement('quantity', id)
                    .addOptions(getArrayWithValues(1, this.quantityMax), quantityInSelect);
            } else {
                // Parcours toutes les quantités jusqu'à trouver celle choisit
                for (let n = 1; n <= selectQuantity.length; n++) {
                    if (quantityInSelect == n) {
                        selectQuantity[n - 1].selected = true;
                        break;
                    }
                }
            }

            let subTotal = quantityInSelect * this.tabProduits[i].price;
            this.api.getElement('sousTotal', id).textContent = subTotal.numberFormat();

            selectQuantity.addEventListener('change', this.editQuantityProduit);
            let buttonRemove = this.api.getElement('btRemove', id);
            buttonRemove.addEventListener('click', (e) => {
                e.preventDefault();
            });
        }

        this.api.getElement('nbarticles').textContent = this.nbProduits;
        this.api.getElement('total').textContent = this.calcTotal().numberFormat();
    };

    /**
     * Modifie la quantité de l'article dans le panier
     * Page : panier
     * @param {Event} e Select du produit dont la quantité a été modifié
     */
    editQuantityProduit = (e) => {
        let articleID = e.target.getAttribute('id').numberID();
        let id = this.api.getElementId('article', articleID);

        let pos = this.getPosition(
            this.api.getElement('idProduit', id).value,
            this.api.getElement('lentilles', id).textContent,
        );

        // MAJ Quantité
        this.nbProduits -= this.tabProduits[pos].quantity;
        this.tabProduits[pos].quantity = parseInt(this.api.getElement('quantity', id).value);
        this.nbProduits += this.tabProduits[pos].quantity;
        this.api.getElement('nbarticles').textContent = this.nbProduits;

        // MAJ Total
        this.total -= this.api.getElement('sousTotal', id).textContent.reverseNumberFormat();
        let subTotal = this.tabProduits[pos].quantity * this.tabProduits[pos].price;
        this.api.getElement('sousTotal', id).textContent = subTotal.numberFormat();
        this.total += subTotal;
        this.api.getElement('total', id).textContent = this.total.numberFormat();

        this.setDisplayMiniBascketNbProduits();
        this.setCookie();
    };

    /**
     * Supprime un élément du panier
     * @param {HTMLElement} target Element à l'origine de l'appel de la méthode
     */
    removeProduit = (target) => {
        let articleID = target.getAttribute('id').numberID();

        // Récupère le numéro de l'article via l'id du button
        let id = this.api.getElementId('article', articleID); // 'cards_{{i}}'

        // Récupère la position de l'article dans le panier à l'aide de son id et de la lentille
        let pos = this.getPosition(
            this.api.getElement('idProduit', id).value,
            this.api.getElement('lentilles', id).textContent,
        );

        // Retire la quantité du produit à supprimer
        this.nbProduits -= this.tabProduits[pos].quantity;
        // Mise à jour du nombre de produits
        this.api.getElement('nbarticles').textContent = this.nbProduits;

        // Supprime l'élément à la position pos (le 1 signifie 1 élément supprimé)
        this.tabProduits.splice(pos, 1);

        // Mise a jour du prix à la supression par la soustraction du sous-total au total
        // this.api.getProduit(idArt.value);
        this.total -= this.api.getElement('sousTotal', id).textContent.reverseNumberFormat();
        this.api.getElement('total', id).textContent = this.total.numberFormat();

        // Met à jour le panier
        this.setCookie();
        // Retire l'élément du DOM
        if (articleID == 0) {
            // Si c'est le premier élément, on le cache car il sert de base pour
            // de nouveau élément, donc à ne pas supprimer !!!
            this.api.getElement('article', articleID, '#').hide();
        } else {
            this.api.getElement('article', articleID, '#').remove();
        }
        // Met à jour la page s'il n'y a plus d'éléments dans le panier
        $('#bt_panier').attr('data-items', this.nbProduits);
        this.setDisplayPanier();
    };

    /**
     * Ajoute un produit au panier
     * @param {Event} e
     */
    setPanier = (e) => {
        // Stop l'event du lien
        e.preventDefault();

        // Récupère le numéro de l'article via l'id du button
        let id = this.api.getElementId('article', e.target.getAttribute('id').numberID());

        // Vérifie si une lentille et une quantité ont été sélectionnées
        let idArt = this.api.getElement('idProduit', id);
        let lenses = this.api.getElement('lentilles', id);
        let quantity = this.api.getElement('quantity', id);

        let produit = this.api.getProduit(idArt.value);

        if (typeof produit === 'undefined') {
            this.api.createAlert(
                'danger',
                'Identifiant du produit introuvable !',
                'Une erreur est survenue. Veuillez nous excuser pour la gêne occasionnée.',
            );
            return false;
        }

        if (!produit.Lentilles.includes(lenses.value) || !quantity.isPositiveNumberAndMax(produit.Stock)) {
            this.api.createAlert('danger', 'Valeur incorrecte !', 'Veuillez sélectionner une valeur correcte.');
            return false;
        }

        this.tabProduits = this.loadPanier();

        // Récupère la position de l'article dans le panier
        let pos = this.getPosition(idArt.value, lenses.value);
        // Si l'article est déjà dans le panier
        if (pos >= 0) {
            if (this.tabProduits[pos]['quantity'] == produit.Stock) {
                this.api.createAlert(
                    'danger',
                    'Rupture de stock !',
                    "Le produit que vous souhaitez ajouter n'est plus en stock.",
                );
            } else {
                this.tabProduits[pos]['quantity'] += parseInt(quantity.value); // 6 = 4 + 2
                if (this.tabProduits[pos]['quantity'] > produit.Stock) {
                    let n = parseInt(quantity.value) - this.tabProduits[pos]['quantity'] + produit.Stock;
                    let a = n == 1 ? 'a' : 'ont';
                    this.tabProduits[pos]['quantity'] = produit.Stock;
                    this.api.createAlert(
                        'warning',
                        'Stock insuffisant !',
                        `Seulement ${n} ${a} été ajouté dans le panier.`,
                    );
                } else {
                    let s = parseInt(quantity.value) == 1 ? '' : 's';
                    let a = parseInt(quantity.value) == 1 ? 'a' : 'ont';
                    this.api.createAlert(
                        'success',
                        `Produit${s} ajouté${s}`,
                        `Le${s} produit${s} ${a} été correctement ajouté dans le panier.`,
                    );
                }
            }
        } else {
            // Création d'un objet pour stocker les éléments du panier
            // prettier-ignore
            let donneesPanier = {
                id      : idArt.value,
                img     : produit.Image,
                name    : produit.Nom,
                price   : produit.Prix,
                quantity: parseInt(quantity.value),
                lenses  : lenses.value,
            };
            // Ajoute le produit au panier tableau
            this.tabProduits.push(donneesPanier);

            let s = parseInt(quantity.value) == 1 ? '' : 's';
            let a = parseInt(quantity.value) == 1 ? 'a' : 'ont';
            this.api.createAlert(
                'success',
                `Produit${s} ajouté${s}`,
                `Le${s} produit${s} ${a} été correctement ajouté dans le panier.`,
            );
        }
        this.tabProduits.sort(this.sortProductsById);
        this.nbProduits = this.calcNbProduits();
        this.total = this.calcTotal();
        this.setDisplayMiniBascketNbProduits();
        this.setCookie();
    };

    sortProductsById = (a, b) => {
        let idProduitA = a.id;
        let idProduitB = b.id;
        return idProduitA < idProduitB ? -1 : idProduitA > idProduitB ? 1 : 0;
    };

    /**
     * Récupère l'ensemble des id des produits contenu dans le panier
     * @return {string[]} Tableau d'id
     */
    getListProductsId = () => {
        let tab = [];
        for (let produit of this.tabProduits) {
            tab.push(produit.id);
        }
        return tab;
    };

    /**
     *
     * @returns
     */
    getListProductsForOrder = () => {
        let tab = [];
        for (let produit of this.tabProduits) {
            // prettier-ignore
            tab.push({
                Id      : produit.id,
                Quantity: produit.quantity,
                Lense   : produit.lenses,
            });
        }
        return tab;
    };

    loadMiniBascket = () => {
        $('#mini-basket ul li').remove();
        if (monPanier.NbProduits == 0) {
            $('#mini-basket ul').append(
                $('<li>').addClass('border-1 border-bottom pb-1 mt-1 w-100 d-table text-center').text('Votre panier est vide !'),
            );
        } else {
            for (let produit of this.tabProduits) {
                $('#mini-basket ul').append(
                    this.createElemMiniBascket(
                        produit.name,
                        produit.quantity,
                        produit.lenses,
                        (produit.price * produit.quantity).numberFormat(),
                        produit.img,
                        monApi.goToProduct(produit.id),
                    ),
                );
            }
        }
        $('#mini-basket-nbproduits').text(monPanier.NbProduits);
        $('#mini-basket-total').text(monPanier.calcTotal().numberFormat());
    };

    createElemMiniBascket = (name, quantity, lentille, prix, srcimg, url) => {
        return $('<li>')
            .addClass('border-1 border-bottom pb-1 mt-1 w-100 d-table')
            .append(
                $('<img>')
                    .attr({ width: 50, height: 50, src: srcimg })
                    .addClass('h-auto d-table-cell me-2 align-middle object-fit-cover card-img-50'),
                $('<div>')
                    .addClass('d-table-cell w-100 align-middle')
                    .append(
                        $('<div>')
                            .addClass('lh-sm fw-bold')
                            .css({ fontSize: '0.8rem' })
                            .append($('<a>').attr('href', url).text(name)),
                        $('<div>')
                            .addClass('lh-sm d-flex justify-content-between')
                            .css({ fontSize: '0.8rem' })
                            .append(
                                $('<span>').text(`Lentille : ${lentille},`),
                                $('<span>').text(`Quantité : ${quantity}`),
                            ),
                        $('<div>').text(prix),
                    ),
            );
    };

    setDisplayMiniBascketNbProduits = () => {
        $('#bt_panier').attr('data-items', this.NbProduits);
        // $('#mini-basket-nbproduits').text(this.NbProduits);
    };

    // setDisplayMiniBascketTotal = () => {
    //     $('#mini-basket-total').text(this.Total.numberFormat());
    // };

    // setDisplayMiniBascket = () => {
    //     this.setDisplayMiniBascketNbProduits();
    //     this.setDisplayMiniBascketTotal();
    // };
}

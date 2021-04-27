/**
 * TODO List
 * [x] Ajouter dans le panier depuis la page produit
 * [x] Bouton supprimer : Supprime un élément du panier
 *  [x] Si plus d'article, set styles
 * [x] Ajout dans le panier :
 *  [x] Vérifier si qté & lentilles non vide
 *  [x] Si produit existe déjà avec même lentille
 * [x] Set quantité => set panier
 *  [x] réaliser les sous totaux dynamique
 *  [x] realiser le total dynamique
 * [x] realiser la boucle pour les cartes dans la page order afficher et dupliquer
 * [x] Si panier vide
 *  [x] disable la partie form  ou le boutton a voir suivant style de page
 *  [x] Masquer article par défaut
 * [ ] Vérifier les qté avant envoi
 * [v] Adapter les id de la page produit avec home
 * [x] Ajouter une span de notification d'ajout de l'article ds le panier
 * [x] Ajouter un modal de suppression du panier
 * [x] Lien en cliquant sur le nom du produit sur le panier
 * [ ] Page index & produit
 *  [x] Prendre en compte un système de stock (5 maxi par article)
 *  [ ] Au chargement, adapter le menu select à la quantité restante disponible
 *  [ ] Lorsqu'un article est ajouté au panier => modifie le menu select
 *  [x] Afficher un message si Out of stock
 */

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
        this.total = 0;
        this.nbProduits = 0;
        this.options = options;
        this.quantityMax = 5; // TODO mettre une quantité max de 5 article present dans le panier
        this.api = api;
        this.timeout = null;
    }

    /**
     * Réinitialise le panier
     */
    resetPanier = () => {
        this.total = 0;
        this.tabProduits = this.loadPanier();

        let id = this.api.getElementId('article', ''); // cards_
        // Ensemble des cards sauf l'article 0
        //let allCardsExceptFirst = document.querySelectorAll(`article[id^=${id}]:not(#${this.api.getElementId('article', 0)})`);
        let allCardsExceptFirst = document.querySelectorAll(`article[id^=${id}]:not(:first-child)`);

        // Cache l'element 0
        this.api.getElement('article', 0, '#').hide();
        // Supprime tous les autres
        allCardsExceptFirst.forEach((elem) => elem.remove());
    };

    /** Ajoute un écouteur pour savoir si le storage a ét modifié */
    createListener = () => {
        window.addEventListener('storage', () => {
            this.resetPanier();
            this.setDisplayPanier();
            this.display();
        });
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
            elemsToShow = this.options.elemsBasketFull;
            elemsToHide = this.options.elemsBasketEmpty;
        } else {
            elemsToShow = this.options.elemsBasketEmpty;
            elemsToHide = this.options.elemsBasketFull;
        }
        elemsToShow.forEach((elem) => document.getElementById(elem).show());
        elemsToHide.forEach((elem) => document.getElementById(elem).hide());
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
                this.api.getElement('article', 0, '#').show();
            } else {
                // Clone le premier card
                let card = this.api.getElement('article', 0, '#').cloneNode(true);
                // Ajoute au DOM
                this.api.getElement('parent').appendChild(card);
                // Remplace les id cards_0 par l'id dynamique
                card.outerHTML = card.outerHTML.replaceAll(
                    this.api.getElementId('article', 0),
                    this.api.getElementId('article', i),
                );
            }

            this.api.getElement('idProduit', id).value = this.tabProduits[i].id;
            this.api.getElement('lentilles', id).textContent = this.tabProduits[i].lenses;
            this.api.getElement('prix', id).textContent = this.tabProduits[i].price;
            this.api.getElement('image', id).src = this.api.localServer
                ? this.tabProduits[i].img.replace('http://localhost:3000/', '')
                : this.tabProduits[i].img;
            this.api.getElement('nom', id).textContent = this.tabProduits[i].name;
            this.api.getElement('linknom', id).href = this.api.goToProduct(this.tabProduits[i].id);

            let selectQuantity = this.api.getElement('quantity', id);
            // Récupère la quantité choisit, sachant qu'elle est cappé à quantityMax
            let quantityInSelect =
                this.tabProduits[i].quantity > this.quantityMax ? this.quantityMax : this.tabProduits[i].quantity;
            // Si premier élément, on génère les options
            if (i == 0) {
                for (let n = 1; n <= this.quantityMax; n++) {
                    selectQuantity.addOption(n, n, quantityInSelect == n);
                }
            } else {
                // Parcours toutes les quantités jusqu'à trouver celle choisit
                for (let n = 1, nmax = selectQuantity.length; n <= nmax; n++) {
                    if (quantityInSelect == n) {
                        selectQuantity[n - 1].selected = true;
                        break;
                    }
                }
            }
            this.nbProduits += this.tabProduits[i].quantity;

            let subTotal = quantityInSelect * this.tabProduits[i].price.reverseNumberFormat();
            this.api.getElement('sousTotal', id).textContent = subTotal.numberFormat();
            this.total += subTotal;

            selectQuantity.addEventListener('change', this.editQuantityProduit);
            let buttonRemove = this.api.getElement('btRemove', id);
            buttonRemove.addEventListener('click', (e) => {
                console.log("bt remov");
                // Sans cela, la page se réactualise en cliquant sur le bouton supprimer
                e.preventDefault();
            });
        }

        this.api.getElement('nbarticles').textContent = this.nbProduits;
        this.api.getElement('total').textContent = this.total.numberFormat();
    };

    /**
     * Modifie la quantité de l'article dans le panier
     * @param {Event} e
     */
    editQuantityProduit = (e) => {
        // Récupère le numéro de l'article via le numéro du button
        let articleID = e.target.getAttribute('id').numberID();
        // Récupère l'id de l'article via le numéro
        let id = this.api.getElementId('article', articleID); // 'cards_{{i}}'

        // Récupère la position de l'article dans le panier à l'aide de son id et de la lentille
        let pos = this.getPosition(
            this.api.getElement('idProduit', id).value,
            this.api.getElement('lentilles', id).textContent,
        );

        // Retire l'ancienne quantité
        this.nbProduits -= this.tabProduits[pos].quantity;
        // Met à jour la quantité dans le panier
        this.tabProduits[pos].quantity = parseInt(this.api.getElement('quantity', id).value);
        // Ajoute la nouvelle quantité
        this.nbProduits += this.tabProduits[pos].quantity;
        // Mise à jour du nombre de produits
        this.api.getElement('nbarticles').textContent = this.nbProduits;

        // Retire l'ancien sous-total du total
        this.total -= this.api.getElement('sousTotal', id).textContent.reverseNumberFormat();
        // Calcul le nouveau sous-total
        let subTotal = this.tabProduits[pos].quantity * this.tabProduits[pos].price.reverseNumberFormat();
        this.api.getElement('sousTotal', id).textContent = subTotal.numberFormat();
        // Calcul le nouveau total
        this.total += subTotal;
        // Mise a jour du total
        this.api.getElement('total', id).textContent = this.total.numberFormat();

        // Met à jour le panier
        this.setCookie();
    };;

    /**
     * Supprime un élément du panier
     * @param {HTMLElement} target Element à l'origine de l'appel de la méthode
     */
    removeProduit = (target) => {
        console.log('remove');
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
        this.setDisplayPanier();
    };;

    setPanier = (e) => {
        // Stop l'event du lien
        e.preventDefault();

        let form = e.target;
        console.log(form);

        //let bt = this.lastEvent.action == 'remove' ? this.lastEvent.target : null;
        //let articleID = form.numberID();
        let articleID = form.getAttribute('id').numberID();
        console.log(articleID);
        console.log(this);
        console.log(this.api.getElementId('article', articleID));

        // Récupère le numéro de l'article via l'id du button
        let id = this.api.getElementId('article', articleID);

        // Vérifie si une lentille et une quantité ont été sélectionnées
        let idArt = this.api.getElement('idProduit', id);
        let lenses = this.api.getElement('lentilles', id);
        let quantity = this.api.getElement('quantity', id);
        let name = this.api.getElement('nom', id);
        let price = this.api.getElement('prix', id);
        let img = this.api.getElement('image', id);
        let canvas = this.api.getElement('canvas', id);
        let error = false;

        // On vérifie qu'une lentille a été sélectionnée
        // TODO Check value in array
        error = lenses.checkSelectValue('');

        // On vérifie qu'une quantité a été sélectionnée
        error = quantity.checkSelectValue(0);

        // Si aucun des deux, on affiche une erreur et on stop l'ajout dans le panier
        if (error) {
            this.api.createAlert('danger', 'Valeur incorrecte !', 'Veuillez sélectionner une valeur correcte.');
            return false;
        }

        // Remet à jour le contenu du panier avant d'ajouter les nouveaux éléments
        this.tabProduits = this.loadPanier();

        // Récupère la position de l'article dans le panier
        let pos = this.getPosition(idArt.value, lenses.value);
        // Si l'article est déjà dans le panier
        if (pos >= 0) {
            if (this.tabProduits[pos]['quantity'] == 5) {
                this.api.createAlert(
                    'danger',
                    'Rupture de stock !',
                    "Le produit que vous souhaitez ajouté n'est plus en stock.",
                );
            } else {
                let prevQty = this.tabProduits[pos]['quantity'];
                this.tabProduits[pos]['quantity'] += parseInt(quantity.value); // 6 = 4 + 2
                if (this.tabProduits[pos]['quantity'] > 5 /** produit.Stock */) {
                    // Affiche un msg
                    let n = parseInt(quantity.value) - this.tabProduits[pos]['quantity'] + 5;
                    let a = n == 1 ? 'a' : 'ont';
                    this.tabProduits[pos]['quantity'] = 5;
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
            let imgsrc;
            if (canvas === null) imgsrc = img.getAttribute('src');
            else imgsrc = canvas.getAttribute('data-src');
            // prettier-ignore
            let donneesPanier = {
                id      : idArt.value,
                img     : imgsrc,
                name    : name.textContent,
                price   : price.textContent,
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
        // Met à jour le panier
        this.setCookie();
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
}

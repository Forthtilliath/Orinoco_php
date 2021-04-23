// recupération des données du ou des produits depuis l api
class Api {
    constructor(cookieName, urlLocal, urlServer) {
        /**
         * @type {string} Nom du cookie utilisé dans l'API
         */
        this.cookieName = cookieName;
        /**
         * Liste des options contenant l'id des éléments du panier
         */
        this.options = this.loadOptions();
        // Créer le panier pour l'application
        this.panier = new Panier(cookieName, this.getOptions(), this);
        /**
         * @type {Produit[]} Liste de l'ensemble des produits
         */
        this.listeProduits = [];
        /**
         * @type {string} URL locale du fichier de données
         */
        this.urlLocal = urlLocal;
        /**
         * @type {string} URL distance du fichier de données
         */
        this.urlServer = urlServer;
        /**
         * @type {boolean} Permet de savoir quelle URL utiliser sur l'API
         */
        this.localServer = true;
        /**
         * @type {string} URL du fichier de données
         */
        this.url = this.localServer ? this.urlLocal : this.urlServer;
    }

    get ListeProduits() {
        return this.listeProduits;
    }

    getPanier = () => {
        return this.panier;
    };

    setUrl = (newUrl) => {
        this.url = newUrl;
    };

    getUrl = () => {
        return this.url;
    };

    addIdToUrl = (id) => {
        this.url += id;
    };

    isLocal = () => {
        return this.localServer;
    };

    /**
     * Ajoute un produit à la liste des produits de l'api
     * @param {string} _type Type de produits (camera, furniture, teddy)
     * @param {any[]} lesProduits Tableau contenant l'ensemble des produits
     */
    addProduits = (type, lesProduits) => {
        for (let unProduit of lesProduits) {
            this.listeProduits.push(
                new Produit(
                    type,
                    unProduit._id,
                    unProduit.name,
                    unProduit.description,
                    unProduit.price / 100,
                    unProduit.lenses,
                    unProduit.imageUrl,
                ),
            );
        }
    };

    /**
     * Récupère les articles via l'url choisit dans l'api
     * @returns {object[]} Tableau des articles
     */
    getProducts = () => {
        return new Promise((response) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status == 200) {
                        // Si tout se passe bien
                        response(JSON.parse(this.responseText));
                        console.log('Connected');
                    } else {
                        // Si tout va mal
                        console.error('Erreur :', this.statusText);
                    }
                }
            };
            request.open('get', this.url, true);
            request.send();
        });
    };

    /**
     * Charge l'ensemble des options
     * @returns Objet contenant l'ensemble des options pour l'api
     */
    loadOptions = () => {
        return {
            // les élèments a voir quand le panier contient un article
            elemsBasketFull: [
                'order-title',
                'order-total',
                'order-modal-container',
                'order-alert-contentfull',
                'order-alert-title',
            ],
            // Les éléments à masquer lorsque le panier est vide
            elemsBasketEmpty: ['basket-empty', 'order-alert-contentempty'],
            // L'élément parent des éléments
            elemsParentId: '#list_cards',
            // Id distingant les éléments entre eux
            elemsIds: 'card_{{i}}',
            elemsForms: '#{{id}} #{{id}}_form',
            elemsMessage: '#{{id}} #{{id}}_select-msg',
            // prettier-ignore
            elemsBasket: {
                idProduit: '#{{id}} #{{id}}_id',
                lentilles: '#{{id}} #{{id}}_lenses',
                prix: '#{{id}} #{{id}}_price',
                nom: '#{{id}} h5',
                linknom: '#{{id}} h5 > a',
                description: '#{{id}} p',
                image: '#{{id}} img',
                canvas: '#{{id}} canvas',
                quantity: '#{{id}} #{{id}}_quantity',
                sousTotal: '#{{id}} #{{id}}_subtotal',
                btRemove: '#{{id}}_remove',
                total: '#cards_total',
                lien: '#{{id}} #{{id}}_link',
            },
        };
    };

    /**
     * Récupère l'ensemble des options
     * @returns {object} Liste des options
     */
    getOptions = () => {
        return this.options;
    };

    /**
     * Récupère un élément du panier à partir de son id
     * @param {string} elementID Nom de l'élément souhaité
     * @param {string} value Valeur pour remplacer le paramètre entre {{param}}
     * @param {string} prefix Chaine à ajouter au début de l'id récupéré (ex: #)
     * @returns {HTMLElement} Element souhaité
     */
    getElement = (elementID, value = null, prefix = '') => {
        let element = null;
        try {
            element = document.querySelector(prefix + this.getElementId(elementID, value));
        } catch (e) {
            throw new Error(`L'élément avec l'id '${elementID}' n'a pas été trouvé !`);
        }
        return element;
    };

    /**
     * Récupère un id du panier
     * @param {string} elementID Nom de l'élément souhaité
     * @param {string} value Valeur pour remplacer le paramètre entre {{param}}
     * @returns {string} Identifiant
     */
    getElementId = (elementID, value = null) => {
        let id = null;
        switch (elementID) {
            case 'parent':
                id = this.options.elemsParentId;
                break;
            case 'form':
                id = this.options.elemsForms.replaceAll('{{id}}', value);
                break;
            case 'article':
                id = this.options.elemsIds.replaceAll('{{i}}', value);
                break;
            case 'message':
                id = this.options.elemsMessage.replaceAll('{{id}}', value);
                break;
            default:
                id = this.options.elemsBasket[elementID].replaceAll('{{id}}', value);
        }
        return id;
    };

    goToProduct = (id) => {
        return `/produit:${id}`;
    };
}

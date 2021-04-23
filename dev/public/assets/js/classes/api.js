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
        /**
         * @type {number} ID de timeout de l'alert
         */
        this.timeoutAlert = null;
        /**
         * @type {number} Durée de l'alerte
         */
        this.delaiAlert = 5000;
    }

    get ListeProduits() {
        return this.listeProduits;
    }

    getPanier() {
        return this.panier;
    }

    setUrl(newUrl) {
        this.url = newUrl;
    }

    getUrl() {
        return this.url;
    }

    addIdToUrl(id) {
        this.url += id;
    }

    isLocal() {
        return this.localServer;
    }

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
     * @returns {Promise} Promesse contenant le tableau des articles
     */
    getProducts = () => {
        return new Promise((resolve, reject) => {
            let request = new XMLHttpRequest();
            request.onreadystatechange = function () {
                if (this.readyState == XMLHttpRequest.DONE) {
                    if (this.status == 200) {
                        // Si tout se passe bien
                        resolve(JSON.parse(this.responseText));
                    } else {
                        // Si tout va mal
                        reject(this);
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
            /*elemsBasketFull: [
                'order-title',
                'order-total',
                'order-modal-container',
                'order-alert-contentfull',
                'order-alert-title',
            ],*/
            elemsBasketFull: [],
            // Les éléments à masquer lorsque le panier est vide
            //elemsBasketEmpty: ['basket-empty', 'order-alert-contentempty'],
            elemsBasketEmpty: [],
            // L'élément parent des éléments
            elemsParentId: '#list_cards',
            // Id distingant les éléments entre eux
            elemsIds: 'card_{{i}}',
            elemsForms: '#{{id}} #{{id}}_form',
            elemsMessage: '#{{id}} #{{id}}_select-msg',
            elemAlerts: '#list_alerts',
            elemsBasket: {
                linknom: '#{{id}} h5 > a',
                lien: '#{{id}} #{{id}}_link',
                // Utiles
                idProduit: '#{{id}} #{{id}}_id',
                image: '#{{id}} #{{id}}_image',
                canvas: '#{{id}} canvas',
                nom: '#{{id}} #{{id}}_title',
                description: '#{{id}} #{{id}}_desc',
                prix: '#{{id}} #{{id}}_price',
                lentilles: '#{{id}} #{{id}}_lenses',
                quantity: '#{{id}} #{{id}}_quantity',
                // Panier uniquement
                sousTotal: '#{{id}} #{{id}}_subtotal',
                btRemove: '#{{id}} #{{id}}_remove',
                total: '#cards_total',
                // Ajouts
                links: '#{{id}} a', // Liens index
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
     * Récupère un élément du panier à partir de son id
     * @param {string} elementID Nom de l'élément souhaité
     * @param {string} value Valeur pour remplacer le paramètre entre {{param}}
     * @param {string} prefix Chaine à ajouter au début de l'id récupéré (ex: #)
     * @returns {HTMLElement} Element souhaité
     */
    getElements = (elementID, value = null, prefix = '') => {
        let element = null;
        try {
            element = document.querySelectorAll(prefix + this.getElementId(elementID, value));
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
            case 'alert':
                id = this.options.elemAlerts;
                break;
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

    /**
     * Affiche une alerte avec un titre et un message pendant un certain délai avant de disparaitre. L'alerte est complètement retiré du DOM lors de sa disparition.
     * @param {string} alertType C'est le type d'alerte à afficher. La valeur est l'une de celles ci : primary, secondary, success, danger, warning, info, light, dark.
     * @param {*} title C'est le titre du message qui apparait sur l'alerte.
     * @param {*} description C'est le message plus détaillé de l'alerte.
     * @param {*} delai C'est la durée d'affichage de l'alerte avant de disparaitre.
     * @returns
     */
    createAlert = (alertType, title, description, delai = this.delaiAlert) => {
        let main_block = document.createElement('div');
        main_block.classList.add('row', 'fixed-bottom');
        let sous_block = document.createElement('div');
        sous_block.classList.add('col-lg-5', 'col-md-12');
        main_block.appendChild(sous_block);

        let arrAlertTypes = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark'];
        let classType = 'alert-light';
        if (arrAlertTypes.includes(alertType)) {
            classType = 'alert-' + alertType;
        }
        // Add show or hide
        let alert_block = document.createElement('div');
        alert_block.classList.add('alert', 'alert-dismissible', 'fade', 'show', classType);
        alert_block.setAttribute('role', 'alert');
        sous_block.appendChild(alert_block);

        let bt_close = document.createElement('button');
        bt_close.classList.add('btn-close');
        bt_close.setAttribute('type', 'button');
        bt_close.setAttribute('data-bs-dismiss', 'alert');
        bt_close.setAttribute('aria-label', 'Close');
        let titleAlert = document.createElement('h4');
        titleAlert.classList.add('alert-heading');
        titleAlert.textContent = title;
        let titleDesc = document.createElement('p');
        titleDesc.textContent = description;
        alert_block.appendChild(bt_close);
        alert_block.appendChild(titleAlert);
        alert_block.appendChild(titleDesc);

        // Si un timeout est en cours
        // On supprime toutes les alertes
        // Puis on supprime le timeout en cours
        // Et enfin on remet la valeur à null
        if (this.timeoutAlert !== null) {
            const parent = this.getElement('alert');
            while (parent.firstChild) {
                parent.firstChild.remove();
            }
            clearTimeout(this.timeoutAlert);
            this.timeoutAlert = null;
        }

        this.getElement('alert').appendChild(main_block);
        this.timeoutAlert = setTimeout(() => {
            main_block.remove();
            clearTimeout(this.timeoutAlert);
            this.timeoutAlert = null;
        }, delai);

        // Version 2 qui permet d'avoir plusieurs alertes affichées en même temps
        // Le seul soucis c'est que cela prend la ligne entière et block le contenu derrière
        // donc la version mobile est illisible
        /*document.querySelectorAll(this.getElementId('alert') + ' > *').forEach((elem) => {
            let bottom = parseInt(elem.style.bottom) || 0;
            elem.style.bottom = bottom + 150 + 'px';
        });

        this.getElement('alert').appendChild(main_block);

        $(main_block)
            .first()
            .hide()
            .fadeIn(200)
            .delay(2000)
            .fadeOut(1000, function () {
                $(this).remove();
            });*/

        return main_block;
    };
}
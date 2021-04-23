console.log('before constructor HTMLElementExtends');
class HTMLElementExtends extends HTMLElement {
    constructor() {
        super();
        console.log('constructor HTMLElementExtends');
    }
    connectedCallback() {
        console.log('added');
    }
    /**
     * Affiche un élement en remplaçant la classe de d-none
     * @param {String} classes Classes qui remplaçent la classe d-none
     */
    show(classes = 'd-flex') {
        console.log('extends');
        this.classList.remove('d-none');
        if (classes != '') this.classList.add(classes);
    }

    /**
     * Cache un élément en remplaçant les classes choisies par d-none
     * @param {String} classes Classes que la classe d-none remplace
     */
    hide(classes = 'd-flex') {
        this.classList.add('d-none');
        if (classes != '') this.classList.remove(classes);
    }

    /**
     * Récupère la partie numérique de l'id d'un élément
     * @returns {number} Id de l'élément
     */
    numberID() {
        return this.getAttribute('id').match(/([\d]+)/)[0];
    }
}
customElements.define('exp-article', HTMLElementExtends);

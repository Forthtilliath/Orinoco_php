class HTMLElementExtends extends HTMLElement {
    constructor() {
        super();
    }

    //https://flaviocopes.com/web-components-custom-elements/
    /**
     * Appelé lorsque l'élément est inséré dans le DOM
     */
    connectedCallback() {
        //console.log(this.getAttribute('id'));
    }

    /**
     * Appelé lorsque l'élément est supprimé du DOM
     */
    disconnectedCallback() {}

    /**
     * Appelé lorsque l'élément est déplacé dans le DOM
     */
    adoptedCallback() {}

    /**
     * Appelé lorsque qu'un attribut observé est modifié, ajouté ou supprimé
     */
    attributeChangedCallback(attrName, oldVal, newVal) {}

    /**
     * Retourne le tableau des attributs écoutés
     */
    static get observedAttributes() {
        return [];
    }

    /**
     * Affiche un élement en remplaçant la classe de d-none
     * @param {String} classes Classes qui remplaçent la classe d-none
     */
    show(classes = 'd-flex') {
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
}

class HTMLInputElementExtends extends HTMLInputElement {
    constructor() {
        super();
    }

    //https://flaviocopes.com/web-components-custom-elements/
    /**
     * Appelé lorsque l'élément est inséré dans le DOM
     */
    connectedCallback() {
        console.log(this.getAttribute('id'));
    }

    /**
     * Appelé lorsque l'élément est supprimé du DOM
     */
    disconnectedCallback() {}

    /**
     * Appelé lorsque l'élément est déplacé dans le DOM
     */
    adoptedCallback() {}

    /**
     * Appelé lorsque qu'un attribut observé est modifié, ajouté ou supprimé
     */
    attributeChangedCallback(attrName, oldVal, newVal) {}

    /**
     * Retourne le tableau des attributs écoutés
     */
    static get observedAttributes() {
        return [];
    }

    /**
     * Récupère la partie numérique de l'id d'un élément
     * @returns {number} Id de l'élément
     */
    numberID() {
        return this.getAttribute('id').match(/([\d]+)/)[0];
    }
}

class HTMLSelectElementExtends extends HTMLSelectElement {
    constructor() {
        super();
    }

    //https://flaviocopes.com/web-components-custom-elements/
    /**
     * Appelé lorsque l'élément est inséré dans le DOM
     */
    connectedCallback() {}

    /**
     * Appelé lorsque l'élément est supprimé du DOM
     */
    disconnectedCallback() {}

    /**
     * Appelé lorsque l'élément est déplacé dans le DOM
     */
    adoptedCallback() {}

    /**
     * Appelé lorsque qu'un attribé observé est modifié, ajouté ou supprimé
     */
    attributeChangedCallback(attrName, oldVal, newVal) {}

    /**
     * Retourne le tableau des attributs écoutés
     */
    static get observedAttributes() {
        return [];
    }

    /**
     * Ajoute un élément option au menu select
     * @param {String|number} value Valeur de l'élément option
     * @param {String} text Contenu de l'élément option
     * @param {boolean} selected Option séléectionnée ou non
     */
    addOption(value, text, selected = false) {
        let option = document.createElement('option');
        option.value = value;
        option.text = text;
        option.selected = selected;
        this.add(option);
    }

    /**
     * Ajoute un tableau d'éléments en option au menu select
     * @param {String[]} values Tableau de valeurs
     */
    addOptions(values, selectedValue) {
        for (let value of values) {
            this.addOption(value, value, value === selectedValue);
        }
    }

    /**
     * Supprime les options d'un menu select
     * @param {number} start Index du premier option à supprimer
     * @param {number} end Index du dernier option à supprimer
     */
    removeOptions(start = 0, end) {
        let imax = typeof end === 'number' ? end : this.options.length - 1;
        for (let i = imax; i >= start; i--) {
            this.remove(i);
        }
    }

    /**
     * Vérifie si la valeur du menu select correspond à la valeur à tester,
     * si oui, la classe 'border-danger' est ajoutée au menu select,
     * sinon la classe 'border-danger' est retirée.
     * @param {String} valueToCheck Valeur à tester
     * @returns {boolean} Retourne vrai si la valeur testé correspond à valueToCheck
     */
    checkSelectValue(valueToCheck = '') {
        let error = false;
        if (this.value == valueToCheck) {
            error = true;
            this.classList.add('border-danger');
        } else {
            this.classList.remove('border-danger');
        }
        return error;
    }

    /**
     * Vérifie si la chaine est un nombre
     * @param {String} value Valeur à tester
     * @returns
     */
    isNumber() {
        return !isNaN(this.value) && !isNaN(parseFloat(this.value));
    }

    isPositiveNumber() {
        return this.isNumber() && this.value > 0;
    }

    isPositiveNumberAndMax(max) {
        return this.isPositiveNumber() && this.value <= max;
    }
}

// Ajoute un nouvel type d'élément dans le DOM : exp-article correspond à la
// classe HTMLElementExtends
customElements.define('exp-article', HTMLElementExtends);
customElements.define('exp-input', HTMLInputElementExtends, { extends: 'input' });
customElements.define('exp-select', HTMLSelectElementExtends, { extends: 'select' });

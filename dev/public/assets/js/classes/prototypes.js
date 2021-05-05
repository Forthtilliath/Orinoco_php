// if (!HTMLElement.prototype.show) {
//     /**
//      * Affiche un élement en remplaçant la classe de d-none
//      * @param {String} classes Classes qui remplaçent la classe d-none
//      */
//     HTMLElement.prototype.show = function (classes = 'd-flex') {
//         this.classList.remove('d-none');
//         if (classes != '') this.classList.add(classes);
//     };
// } else {
//     console.error(`Collision ! Le prototype show de HTMLElement existe déjà !`);
// }

// if (!HTMLElement.prototype.hide) {
//     /**
//      * Cache un élément en remplaçant les classes choisies par d-none
//      * @param {String} classes Classes que la classe d-none remplace
//      */
//     HTMLElement.prototype.hide = function (classes = 'd-flex') {
//         this.classList.add('d-none');
//         if (classes != '') this.classList.remove(classes);
//     };
// } else {
//     console.error(`Collision ! Le prototype hide de HTMLElement existe déjà !`);
// }

// if (!HTMLSelectElement.prototype.addOption) {
//     /**
//      * Ajoute un élément option au menu select
//      * @param {String|number} value Valeur de l'élément option
//      * @param {String} text Contenu de l'élément option
//      * @param {boolean} selected Option séléectionnée ou non
//      */
//     HTMLSelectElement.prototype.addOption = function (value, text, selected = false) {
//         let option = document.createElement('option');
//         option.value = value;
//         option.text = text;
//         option.selected = selected;
//         this.add(option);
//     };
// } else {
//     console.error(`Collision ! Le prototype addOption de HTMLSelectElement existe déjà !`);
// }

// if (!HTMLSelectElement.prototype.addOptions) {
//     /**
//      * Ajoute un tableau d'éléments en option au menu select
//      * @param {String[]} values Tableau de valeurs
//      */
//     HTMLSelectElement.prototype.addOptions = function (values) {
//         for (let value of values) {
//             this.addOption(value, value);
//         }
//     };
// } else {
//     console.error(`Collision ! Le prototype addOptions de HTMLSelectElement existe déjà !`);
// }

// if (!HTMLSelectElement.prototype.removeOptions) {
//     /**
//      * Supprime les options d'un menu select
//      * @param {number} start Index du premier option à supprimer
//      * @param {number} end Index du dernier option à supprimer
//      */
//     HTMLSelectElement.prototype.removeOptions = function (start = 0, end) {
//         let imax = typeof end === 'number' ? end : this.options.length - 1;
//         for (let i = imax; i >= start; i--) {
//             this.remove(i);
//         }
//     };
// } else {
//     console.error(`Collision ! Le prototype removeOptions de HTMLSelectElement existe déjà !`);
// }

// if (!String.prototype.reverseNumberFormat) {
//     /**
//      * Transforme un prix d'un format chaine vers nombre
//      * @param {String} locale Une chaine de caractères avec un identifiant de langue BCP 47
//      * @returns {number} Prix sous forme numérique (ex: 123456.79)
//      */
//     String.prototype.reverseNumberFormat = function (locale = 'fr-FR') {
//         let thousandSeparator = Intl.NumberFormat(locale)
//             .format(11111)
//             .replace(/\p{Number}/gu, '');
//         let decimalSeparator = Intl.NumberFormat(locale)
//             .format(1.1)
//             .replace(/\p{Number}/gu, '');

//         return parseFloat(
//             this.replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(
//                 new RegExp('\\' + decimalSeparator),
//                 '.',
//             ),
//         );
//     };
// } else {
//     console.error(`Collision ! Le prototype reverseNumberFormat de String existe déjà !`);
// }

// if (!Number.prototype.numberFormat) {
//     /**
//      * Transforme un prix d'un format nombre vers chaine
//      * @param {String} locale Une chaine de caractères avec un identifiant de langue BCP 47
//      * @returns {String} Prix sous forme de chaine (ex: 123 456,79 €)
//      */
//     Number.prototype.numberFormat = function (locale = 'fr-FR') {
//         return new Intl.NumberFormat(locale, {
//             style: 'currency',
//             currency: 'EUR',
//             minimumFractionDigits: 0,
//         }).format(this);
//     };
// } else {
//     console.error(`Collision ! Le prototype numberFormat de Number existe déjà !`);
// }

// if (!HTMLElement.prototype.numberID) {
//     /**
//      * Récupère la partie numérique de l'id d'un élément
//      * @returns {number} Id de l'élément
//      */
//     HTMLElement.prototype.numberID = function () {
//         return this.getAttribute('id').match(/([\d]+)/)[0];
//     };
// } else {
//     console.error(`Collision ! Le prototype numberID de HTMLElement existe déjà !`);
// }

// if (!HTMLSelectElement.prototype.checkSelectValue) {
//     /**
//      * Vérifie si la valeur du menu select correspond à la valeur à tester,
//      * si oui, la classe 'border-danger' est ajoutée au menu select,
//      * sinon la classe 'border-danger' est retirée.
//      * @param {String} valueToCheck Valeur à tester
//      * @returns {boolean} Retourne vrai si la valeur testé correspond à valueToCheck
//      */
//     HTMLSelectElement.prototype.checkSelectValue = function (valueToCheck = '') {
//         let error = false;
//         if (this.value == valueToCheck) {
//             error = true;
//             this.classList.add('border-danger');
//         } else {
//             this.classList.remove('border-danger');
//         }
//         return error;
//     };
// } else {
//     console.error(`Collision ! Le prototype checkSelectValue de HTMLSelectElement existe déjà !`);
// }

// if (!String.prototype.isNumber) {
//     /**
//      * Vérifie si la chaine est un nombre
//      * @param {String} value Vaeur à tester
//      * @returns
//      */
//     String.prototype.isNumber = (value) => {
//         return !isNaN(value) && !isNaN(parseFloat(value));
//     };
// } else {
//     console.error(`Collision ! Le prototype isNumber de String existe déjà !`);
// }


// https://github.com/zevero/simpleWebstorage
if (!Storage.prototype.set) {
    /**
     * Modifie un cookie
     * @param {String} key Identifiant du cookie
     * @param {*} obj Contenu du cookie
     * @returns
     */
    Storage.prototype.set = function (key, obj) {
        var t = typeof obj;
        if (t === 'undefined' || obj === null) this.removeItem(key);
        this.setItem(key, t === 'object' ? JSON.stringify(obj) : obj);
        return obj;
    };
} else {
    console.error(`Collision ! Le prototype set de Storage existe déjà !`);
}

if (!Storage.prototype.get) {
    /**
     * Retourne le contenu d'un cookie
     * @param {String} key Identifiant du cookie
     * @returns {*} Contenu du cookie
     */
    Storage.prototype.get = function (key) {
        var obj = this.getItem(key);
        try {
            var j = JSON.parse(obj);
            if (j && typeof j === 'object') return j;
        } catch (e) {}
        return obj;
    };
} else {
    console.error(`Collision ! Le prototype get de Storage existe déjà !`);
}

if (!Storage.prototype.assign) {
    /**
     * Merge le contenu d'un objet dans un cookie
     * @param {String} key Identifiant du cookie
     * @param {*} obj_merge Object à merger dans le cookie
     * @returns
     */
    Storage.prototype.assign = function (key, obj_merge) {
        var obj = this.get(key);
        if (typeof obj !== 'object' || typeof obj_merge !== 'object') return null;
        Object.assign(obj, obj_merge);
        return this.set(key, obj);
    };
} else {
    console.error(`Collision ! Le prototype assign de Storage existe déjà !`);
}

if (!Storage.prototype.has) {
    /**
     * Vérifie si un cookie existe
     * @param {string} name Nom du cookie
     * @returns {boolean} True si le cookie existe, False sinon
     */
    Storage.prototype.has = window.hasOwnProperty;
} else {
    console.error(`Collision ! Le prototype has de Storage existe déjà !`);
}

if (!Storage.prototype.remove) {
    /**
     * Supprime un cookie à l'aide de son nom
     * @param {string} name Nom du cookie
     */
    Storage.prototype.remove = localStorage.removeItem;
} else {
    console.error(`Collision ! Le prototype remove de Storage existe déjà !`);
}

if (!Storage.prototype.keys) {
    /**
     * Retourne la liste des cookies
     * @returns {String[]} Liste des cookies
     */
    Storage.prototype.keys = function () {
        return Object.keys(this.valueOf());
    };
} else {
    console.error(`Collision ! Le prototype keys de Storage existe déjà !`);
}
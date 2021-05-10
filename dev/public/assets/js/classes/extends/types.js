Object.assign(String.prototype, {
    /**
     * Transforme un prix d'un format chaine vers nombre
     * @param {String} locale Une chaine de caractères avec un identifiant de langue BCP 47
     * @returns {number} Prix sous forme numérique (ex: 123456.79)
     */
    reverseNumberFormat(locale = 'fr-FR') {
        let thousandSeparator = Intl.NumberFormat(locale)
            .format(11111)
            .replace(/\p{Number}/gu, '');
        let decimalSeparator = Intl.NumberFormat(locale)
            .format(1.1)
            .replace(/\p{Number}/gu, '');

        return parseFloat(
            this.replace(new RegExp('\\' + thousandSeparator, 'g'), '').replace(
                new RegExp('\\' + decimalSeparator),
                '.',
            ),
        );
    },

    /**
     * Vérifie si la chaine est un nombre
     * @param {String} value Valeur à tester
     * @returns
     */
    isNumber() {
        console.log(this);
        return !isNaN(this) && !isNaN(parseFloat(this));
    },

    /**
     * Récupère la partie numérique de l'id d'un élément
     * @returns {number} Id de l'élément
     */
    numberID() {
        return this.match(/([\d]+)/)[0];
    },
});

Object.assign(Number.prototype, {
    /**
     * Transforme un prix d'un format nombre vers chaine
     * @param {String} locale Une chaine de caractères avec un identifiant de langue BCP 47
     * @returns {String} Prix sous forme de chaine (ex: 123 456,79 €)
     */
    numberFormat(locale = 'fr-FR') {
        return new Intl.NumberFormat(locale, {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(this);
    },

    jqNumberFormat(minimumFractionDigits = 0, decimalSeparator = ',', thousandSeparator = ' ') {
        return $.number(this, minimumFractionDigits, decimalSeparator, thousandSeparator) + ' €';
    },
});
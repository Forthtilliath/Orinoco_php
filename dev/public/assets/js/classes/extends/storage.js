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

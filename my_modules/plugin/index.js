/**
 * Création d'un object Plugin
 * @param {string} name Nom du plugin
 * @param {boolean} installed True si installé, False sinon
 * @param {*} plugin Liste des fonctions du plugin
 */
class Plugin {
    constructor(name, installed, plugin) {
        this.name = name;
        this.installed = installed;
        this.plugin = plugin;
    }
    /**
     * Récupère le nom du plugin
     * @returns {string} Nom du plugin
     */
    getName() {
        return this.name;
    }
    /**
     * Permet de savoir si le plugin est installé
     * @returns {boolean} Vrai si le plugin est installé
     */
    isInstalled() {
        return this.installed;
    }
    /**
     * Récupère le plugin en lui-même pour utiliser ses méthodes
     * @returns {File} Fichier du plugin
     */
    get() {
        return this.plugin;
    }
}


export default Plugin;
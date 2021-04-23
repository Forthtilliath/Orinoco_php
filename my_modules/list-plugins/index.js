const Plugin = require('../plugin');

// Création d'un object ListPlugins
class ListPlugins {
    constructor() {
        this.lesPluginsNames = Array.from(arguments);
        this.lesPlugins = [];
        this.launch();
    }
    /**
     * On lance tous les require et on les ajoute dans un tableau
     * De plus, on enlève tous les 'gulp-' des noms pour les appels futurs
     */
    launch() {
        // On récupère la liste des plugins
        let lesPlugins = this.lesPlugins;
        // Permet de changer la couleur du texte dans la console
        let color = this.get('chalk');
        // On crée un tableau afin d'afficher tous les plugins manquant en une seule commande
        let tabPluginsToInstall = [];
        // Pour chaque plugins
        this.lesPluginsNames.forEach((unPlugin) => {
            try {
                // On fait le require et on l'ajoute dans le tableau
                //lesPlugins.push(new Plugin(unPlugin.replace(/gulp-/i, ''), true, require(unPlugin)));
                lesPlugins.push(new Plugin(unPlugin.replace(/gulp-/i, ''), true, require(unPlugin)));
            } catch (e) {
                // Si une erreur survient
                // On détecte si le module est installé ou non
                if (e.code === 'MODULE_NOT_FOUND') {
                    // On affiche un message d'erreur avec une commande pour ajouter le module manquant
                    console.log(color.red(`Le module '${color.blue(unPlugin)}' n'est pas installé !`));
                    // On l'ajoute au tableau
                    tabPluginsToInstall.push(unPlugin);
                } else {
                    // Si une autre erreur survient, on stop complètement le script
                    throw `Erreur ${e.code} avec le module ${unPlugin} !`;
                }
                // On ajoute tout de même le module dans le tableau en précisant bien que le module n'est pas installé
                // Ca permettra que le script fonctionne tant qu'on n'appelle pas de tache nécessitant celui ci
                lesPlugins.push(new Plugin(unPlugin.replace(/gulp-/i, ''), false, null));
            }
        });
        if (tabPluginsToInstall.length > 0) {
            // On affiche la commande pour installer tous les plugins manquant
            console.log(color.red(`|-- `) + color.green(`${cmdInstall} ${tabPluginsToInstall.join(' ')}`));
        }
    }
    /**
     * Recherche un plugin et indique s'il est installé ou non
     * @param   {string} unPluginName Nom du plugin à trouver
     * @returns {boolean} Vrai si le plugin est installé, Faux le cas échéant
     */
    find(unPluginName) {
        for (let i = 0; i < this.lesPlugins.length; i++) {
            if (this.lesPlugins[i].getName() == unPluginName) {
                return this.lesPlugins[i].isInstalled();
            }
        }
        return false;
    }
    /**
     * Récupère le module demandé
     * @param   {string} unPluginName Nom du plugin
     * @returns {Plugin} Plugin demandé
     */
    get(unPluginName) {
        for (let i = 0; i < this.lesPlugins.length; i++) {
            if (this.lesPlugins[i].getName() == unPluginName) {
                return this.lesPlugins[i].get();
            }
        }
        return null;
    }
}

module.exports = ListPlugins;

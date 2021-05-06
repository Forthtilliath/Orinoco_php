/**
 * Utilise une fonction à l'aide de son nom
 * @param {String} functionName Nom de la fonction
 * @param {Object} context Context
 * @returns Le résultat de la fonction
 */
function executeFunctionByName(functionName, context = window /*, args */) {
    if (functionName === '') {
        return;
    }
    var args = Array.prototype.slice.call(arguments, 2);
    var namespaces = functionName.split('.');
    var func = namespaces.pop();
    for (var i = 0; i < namespaces.length; i++) {
        context = context[namespaces[i]];
    }
    return context[func].apply(context, args);
}

/**
 * Récupère les paramètres d'une URL
 * source: https://css-tricks.com/snippets/javascript/get-url-variables/
 * @param  {String} url L'URL
 * @return {Object}     Les paramètres de l'URL
 */
const getParams = (url = window.location) => {
    let params = {};
    new URL(url).searchParams.forEach(function (val, key) {
        if (params[key] !== undefined) {
            if (!Array.isArray(params[key])) {
                params[key] = [params[key]];
            }
            params[key].push(val);
        } else {
            params[key] = val;
        }
    });
    return params;
};

/**
 * Récupère la valeur d'un paramètre
 * @param  {String} field L'identifiant du paramètre dont on souhaite récupérer la valeur
 * @param  {String} url   L'URL de laquelle on souhaite récupérer la valeur du paramètre
 * @return {String}       La valeur du paramètre
 */
const getQueryString = (field, url = window.location.href) => {
    let reg = new RegExp('[?&]' + field + '=([^&#]*)', 'i');
    let string = reg.exec(url);
    return string ? string[1] : null;
};

/**
 * Retourne un tableau d'entiers allant d'une valeur à une autre
 * Si start = 1 et end = 10 => [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
 * @param {string|number} start
 * @param {string|number} end
 * @returns {number[]} Tableau de valeur allant de start à end
 */
const getArrayWithValues = (start, end) => {
    // Si le nombre est sous forme de chaine, on vérifie que ce soit bien un nombre
    // Si oui, on le convertit en entier
    if (typeof start === 'string') {
        if (start.isNumber()) start = parseInt(start);
        else return [];
    }
    if (typeof end === 'string') {
        if (end.isNumber()) end = parseInt(end);
        else return [];
    }

    return [...Array(end - start + 1).keys()].map((x) => (x += start));
};

/**
 * Génère un élément thumbnail responsive pour remplacer une image
 * @param {HTMLImageElement} original Image d'origine
 * @param {number} newHeight          Nouvelle hauteur
 * @returns
 */
const getThumbnail = (original, newHeight) => {
    var canvas = document.createElement('canvas');
    canvas.classList.add('canvas', 'card-img-top');
    canvas.setAttribute('data-src', original.src);
    let scale = original.height / newHeight;

    canvas.getContext('2d').drawImage(original, 0, 0);
    canvas.width = original.width * scale;
    canvas.height = newHeight;

    //canvas.width = '100%';
    //canvas.height = '100vh';
    //canvas.height = 'auto';

    canvas.getContext('2d').drawImage(original, 0, 0, canvas.width, canvas.height);
    //canvas.getContext('2d').drawImage(original, 0, 0);

    return canvas;
};
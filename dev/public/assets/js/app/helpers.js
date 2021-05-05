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

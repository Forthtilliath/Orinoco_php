class Router {
    constructor() {
        /**
         * @type {Page[]}
         */
        this.tabPages = [];
        this.router = {};
        //this.loadRoutes();
    }

    loadRoutes() {
        return $.getJSON('http://localhost:3000/api/routes')
            .done((datas) => (this.router = datas))
            .fail(() => {})
            .always(() => {});
    }

    addPage(name, html, js) {
        this.tabPages.push(new Page(name, html));
    }

    getPage(name) {
        for (let page of this.tabPages) {
            if (page.Name === name) return page;
        }
        return null;
    }

    getPageName(uri) {
        // NOTE Fonctionne pas pour produit (regex)
        for (let route of this.router.routes) {
            // TODO Regex avec pattern
            // if (route.pattern === uri) return route.name;
            // /produit/[id:id]
            let rbracket = new RegExp(/\[(\w+:\w+)\]/g);
            let pattern = route.pattern;

            let m, res, regex, newpattern = pattern;
            console.log('""""""""""""""""""""""""""""""""""""""');
            console.log('    pattern', pattern);
            while ((m = rbracket.exec(pattern)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === rbracket.lastIndex) {
                    rbracket.lastIndex++;
                }
                res = m[1].split(':');
                switch (res[0]) {
                    case 'id':
                        regex = '[a-z0-9]{24}';
                        break;
                    case 'i':
                        regex = '[\\d]+';
                        break;
                    case 'a':
                        regex = '[\\w]+';
                        break;
                    default:
                        console.error('Type de données non trouvé');
                }
                newpattern = newpattern.replace(m[0], regex);
            }
            newpattern = '^' + newpattern + '$';
            console.log('new pattern', newpattern);
            if (new RegExp(newpattern,'m').test(uri)) {
                console.log("La route de merde correspond !!!");
                return route.name;
            }
        }
    }

    getCurrentPageName() {
        return this.getPageName(this.getUri());
    }

    getUri() {
        console.log('uri', location.pathname + location.search);
        return location.pathname + location.search;
    }

    /**
     *
     * @param {String} routeName
     * @returns {String}
     */
    getMainFunction(routeName) {
        for (let routes of this.router.routes) {
            if (routes.name == routeName) return routes.mainFunction;
        }
        return null;
    }
}

class Page {
    constructor(name, html) {
        this.name = name;
        this.html = html;
    }

    get Name() {
        return this.name;
    }

    get Html() {
        return this.html;
    }
}

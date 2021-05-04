class Router {
    constructor() {
        /**
         * @type {Page[]}
         */
        this.tabPages = [];

        this.router = {};
        this.loaded = false;
        this.loadRoutes();
        
        console.log('Router loaded');
    }

    loadRoutes() {
        return new Promise((resolve, reject) => {
            $.getJSON('http://localhost:3000/api/routes')
                .done((datas) => (this.router = datas))
                .fail(() => {})
                .always(() => (this.loaded = true));
        });
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
            if (route.pattern === uri) return route.name;
        }
    }

    getCurrentPageName() {
        return this.getPageName(this.getUri());
    }

    getUri() {
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

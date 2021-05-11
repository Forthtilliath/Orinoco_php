class Router {
    constructor() {
        this.router = {};
        //this.loadRoutes();
        this.addEventOnHistory();
    }

    addEventOnHistory() {
        window.onpopstate = (event) => {
            let params = [];
            if (event.state) {
                if (Camera.hasInstance(Object.values(event.state))) {
                    params.push(new Camera(...Camera.fromObject(event.state)));
                }
            }

            this.changePage(this.getUri(), ...params);
        };
    }

    loadRoutes() {
        return $.getJSON('http://localhost:3000/api/routes')
            .done((datas) => (this.router = datas))
            .fail(() => {})
            .always(() => {});
    }

    getPageName(uri) {
        for (let route of this.router.routes) {
            let rbracket = new RegExp(/(?<param>\[(?<id>\w+:\w+)\])/g);
            let pattern = route.pattern;

            let m,
                res,
                regex,
                newpattern = pattern;
            while ((m = rbracket.exec(pattern)) !== null) {
                // This is necessary to avoid infinite loops with zero-width matches
                if (m.index === rbracket.lastIndex) {
                    rbracket.lastIndex++;
                }
                res = m['groups']['id'].split(':');
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
            if (new RegExp(`^${newpattern}$`, 'm').test(uri)) {
                return route.name;
            }
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

    changePage(lien, ...args) {
        $('html, body').animate({ scrollTop: 0 }, 'fast');
        let routeName = this.getPageName(lien);
        var jqxhr = $.get(lien, (data) => {
            /**
             * pushState :
             *  datas =>
             * {
             *     0: Camera
             * }
             */
            let datas = args[0] ? { ...args } : {};
            history.pushState(datas[0], routeName, lien);
            this.setPageContent($(data).filter('#pageContent').html());
            this.setPageTitle($page.title);
            this.setPageDescription($page.description);
            executeFunctionByName(this.getMainFunction(routeName), window, ...args);
            $('#pageContent a').on('click', monApi.clickLien);
        });
        // jqxhr
        //     .done(function () {})
        //     .fail(function () {})
        //     .always(function () {});
    }

    setPageTitle(title) {
        document.title = title;
    }

    setPageDescription(description) {
        $('meta[name="description"]').attr('content', description);
    }

    setPageContent(content) {
        $('#pageContent').html(content);
    }
}

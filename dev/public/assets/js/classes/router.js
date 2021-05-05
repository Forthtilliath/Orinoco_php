class Router {
    constructor() {
        this.router = {};
        //this.loadRoutes();
    }

    loadRoutes() {
        return $.getJSON('http://localhost:3000/api/routes')
            .done((datas) => (this.router = datas))
            .fail(() => {})
            .always(() => {});
    }

    getPageName(uri) {
        // NOTE Fonctionne pas pour produit (regex)
        for (let route of this.router.routes) {
            // TODO Regex avec pattern
            // if (route.pattern === uri) return route.name;
            // /produit/[id:id]
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
            // newpattern = '^' + newpattern + '$';
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
            // Récupère le contenu de la page et l'insère dans la page actuelle
            $('#pageContent').html($(data).filter('#pageContent').html());

            // Changer url sans reload
            history.pushState(null, routeName, lien);
            document.title = $page.title;
            $('meta[name="description"]').attr('content', $page.description);

            executeFunctionByName(this.getMainFunction(routeName), window, args);
            $('#pageContent a').on('click', monApi.clickLien);
        });
        jqxhr
            .done(function () {
                //alert( "second success" );
            })
            .fail(function () {
                //alert( "error" );
            })
            .always(function () {
                //alert( "finished" );
            });
    }
}

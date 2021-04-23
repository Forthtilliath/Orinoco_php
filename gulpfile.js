'use strict';

/**
 *[=] Commandes importantes à exécuter pour démarrer un nouveau projet    *
 *[=] npm install gulp -g                                                 *
 *[=] npm init                                                            *
 *[=] npm install --save-dev gulp chalk gulp-imagemin                     *
 *
 *! Liste des ERREURS possibles                         *
 *! TypeError: lesPlugins.get(...) is not a function    *
 *! |-> Erreur dans le nom du plugin appelé             *
 *
 * TODO Ajouts à faire
 * [ ] Vérifier les tableaux si modifier par un set ne serait pas mieux
 * https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Set
 * [ ] Mettre en place task, src, dest
 * 
 * [ ] Vérifier pour inclure avec Grunt-Processhtml :
 * https://github.com/dciccale/grunt-processhtml#buildincludetargets-value
 * NOTE : Remplacera useref
 * 
 * https://github.com/Paul-Browne/HTMLInclude
 */

// Requis
const gulp = require('gulp');

// Importation de mon module
const ListPlugins = require('./my_modules/list-plugins');
// Importation de mes configurations
const params = require('./gulpconfig');
//const { dir, source, dest, filesIn, filesOut, groupTasks, tabWatch } = require('./gulpconfig');

// TODO A Améliorer
const dir = params.dir;
const source = params.dirIn;
const dest = params.dirOut;
const filesIn = params.filesIn;
const filesOut = params.filesOut;
const groupTasks = params.groupTasks;
const tabWatch = params.tabWatch;

// Compression des fichiers js
let tabJs = [dir.dev + source.js + filesIn.js]; // Fichiers js à compresser, par défaut on les prend tous
let jsInIndex = []; // Afin de ne pas le prendre en compte dans les fichiers js de l'index car compressés via useref
// Compression des fichiers css
let tabCss = [dir.dev + source.css + filesIn.css]; // Fichiers css à compresser, par défaut on les prend tous
let cssInIndex = []; // Afin de ne pas le prendre en compte dans les fichiers css de l'index car compressés via useref

// On crée l'objet pour gérer les plugins
let lesPlugins = new ListPlugins(...params.PLUGINS);
// Permet de changer la couleur du texte dans la console
const color = lesPlugins.get('chalk');

// Configuration pour la compression des images
const configCompImg = [
    lesPlugins.get('imagemin').gifsicle({
        interlaced: true,
    }),
    lesPlugins.get('imagemin').mozjpeg({
        quality: 75,
        progressive: true,
    }),
    lesPlugins.get('imagemin-jpegtran')({
        progressive: true,
    }),
    lesPlugins.get('imagemin').optipng({
        optimizationLevel: 7, //7 for max
    }),
    lesPlugins.get('imagemin').svgo({
        plugins: [
            {
                removeViewBox: true,
            },
            {
                cleanupIDs: false,
            },
        ],
    }),
];

/****************************************************
 ** Liste des fonctions                             *
 ***************************************************/

/**
 * Permet de créer une tache vide lorsque les plugins requis ne sont pas installés
 * Cela évite de créer une tache qui ne fonctionnera pas ou d'appeler une tache qui n'existe pas
 */
const createEmptyTask = (taskName) => {
    gulp.task(taskName, (done) => {
        console.log(
            color.red(
                `Certains plugins de la tache ${color.yellow(taskName)} n'ont pas été trouvé,\
                 donc n'a pas été exécutée.`,
            ),
        );
        return done();
    });
};

/**
 * Vérifie si tous les plugins requis sont bien installés
 * @returns {boolean} allGood
 */
const checkPluginsRequired = () => {
    let allGood = true; // Si tous les plugins sont installés, sa valeur restera à vrai
    Array.from(...arguments).forEach((unPlugin) => {
        // Si le plugin n'est pas trouvé ou installé
        if (!lesPlugins.find(unPlugin.replace(/gulp-/i, ''))) {
            console.log(`Le plugin ${unPlugin} est nécessaire pour cette tâche !`);
            allGood = false;
        }
    });
    return allGood;
};

/**
 *
 * @param {{taskName:string, pluginsRequired:string[], taskFunction:Function}} task
 */
const createTask = (task) => {
    if (checkPluginsRequired(...task.pluginsRequired)) {
        gulp.task(task.taskName, task.taskFunction);
    } else {
        createEmptyTask(task.taskName);
    }
};

/****************************************************
 ** Taches liées à linstallation des plugins        *
 ***************************************************/

// Supprime le cache des images compressées
createTask({
    taskName: 'clear-cache',
    pluginsRequired: ['gulp-cache'],
    taskFunction: (done) => {
        lesPlugins.get('cache').clearAll();
        done();
    },
});

/****************************************************
 ** Taches liées à l'application en elle-même       *
 ** |-- Compression des images pour la promotion    *
 ** |-- Compression des icones pour la promotion    *
 ***************************************************/

// Compresse les images
createTask({
    taskName: 'app:images',
    pluginsRequired: ['gulp-plumber', 'gulp-cache', 'gulp-imagemin'],
    taskFunction: () => {
        return gulp
            .src([dir.dev + source.app_images + filesIn.images, dir.dev + source.app_icons + filesIn.icons])
            .pipe(lesPlugins.get('plumber')())
            .pipe(
                lesPlugins.get('cache')(
                    lesPlugins.get('imagemin')(configCompImg, {
                        verbose: true,
                    }),
                ),
            )
            .pipe(
                gulp.dest(
                    // On retire les / du chemin de départ et d'arrivée
                    // Pour ensuite envoyer chaque fichier dans les dossiers correspondant
                    (file) => file.base.replace(dir.dev.replace('/', ''), dir.dist.replace('/', '')),
                ),
            );
    },
});

/****************************************************
 ** Taches liées à l'execution de l'application     *
 ** |-- Compilation des svg en sprites              *
 ** |-- Compilation des sass en css                 *
 ***************************************************/

// Unify les fichiers svg pour en faire un sprite
createTask({
    taskName: 'build:svg',
    pluginsRequired: [
        'gulp-plumber',
        'gulp-svgmin',
        'gulp-cheerio',
        'gulp-svg-sprite',
        'gulp-replace',
        'merge-stream',
        'path',
        'glob',
    ],
    taskFunction: async () => {
        // On utilise merge afin de nommer le svg par le nom du dossier
        // 1 dossier donnera donc 1 svg
        // Ca permet d'avoir par exemple 1 dossier pour les boutons, 1 pour les réseaux sociaux, etc
        return lesPlugins.get('merge-stream')(
            lesPlugins
                .get('glob')
                .sync(dir.dev + source.svg)
                .map(function (svgDir) {
                    var svgName = lesPlugins.get('path').basename(svgDir); // On récupère le nom du dossier
                    return gulp
                        .src(svgDir + filesIn.svg) // Récupère les fichiers
                        .pipe(lesPlugins.get('plumber')()) // Controles les erreurs
                        .pipe(
                            lesPlugins.get('svgmin')({
                                js2svg: {
                                    pretty: true,
                                },
                            }),
                        )
                        .pipe(
                            lesPlugins.get('cheerio')({
                                // Supprime les attributs non utilisés pour la suite
                                run: function ($) {
                                    //$('[fill]').removeAttr('fill');
                                    $('[stroke]').removeAttr('stroke');
                                    $('[style]').removeAttr('style');
                                    $('[xmlns]').removeAttr('xmlns'); // Pas utile car obligatoirement ajouté via le code
                                    $('[class]').removeAttr('class');
                                },
                                parserOptions: {
                                    xmlMode: true,
                                },
                            }),
                        )
                        .pipe(lesPlugins.get('replace')('&gt;', '>')) // cheerio plugin create unnecessary string '&gt;', so replace it.
                        .pipe(
                            lesPlugins.get('svg-sprite')({
                                // Crée le sprite
                                mode: {
                                    symbol: {
                                        dest: '.', // Ne pas toucher
                                        sprite: svgName + filesOut.svgExt, // Le fichier porte le nom du dossier
                                    },
                                },
                            }),
                        )
                        .pipe(gulp.dest(dir.dev + dest.svg)) // Envoi le résultat sur dev
                        .pipe(gulp.dest(dir.dist + dest.svg)); // Envoi le résultat sur dist
                }),
        );
    },
});

createTask({
    taskName: 'prebuild:html',
    pluginsRequired: ['file-include'],
    taskFunction: () => {
        return gulp
            .src([
                dir.dev + 'index.html',
                dir.dev + source.views + '*.html',
                '!' + dir.dev + source.views + 'main.html',
            ])
            .pipe(
                lesPlugins.get('file-include')({
                    prefix: '@@',
                    basepath: '@file',
                }),
            )
            .pipe(gulp.dest(dir.prebuild));
    },
});

// TODO Faire ca pour toutes les taches
// Voir pour mettre directement dans la fonction
createTask({
    taskName: 'sass',
    pluginsRequired: ['gulp-sass'],
    taskFunction: () => {
        return gulp
            .src(dir.dev + source.sass + filesIn.sass) // Gets all files ending with .scss in app/scss and children directories
            .pipe(lesPlugins.get('sass')())
            .pipe(gulp.dest(dir.dev + dest.sass));
    },
});

/****************************************************
 ** Taches liées à la distribution de l'application *
 ** |-- Supprime le dossier dist                    *
 ** |-- Compression des images                      *
 ** |-- Compression des js/css                      *
 ** |-- Minimisation des js/css                     *
 ** |-- Copie des fonts                             *
 ** |-- Copie des fichiers à la racine              *
 ***************************************************/

// Supprime le dossier dist
createTask({
    taskName: 'clean:dist',
    pluginsRequired: ['del'],
    taskFunction: () => {
        return lesPlugins.get('del')(dir.dist);
    },
});

// Supprime le dossier prebuild
createTask({
    taskName: 'clean:prebuild',
    pluginsRequired: ['del'],
    taskFunction: () => {
        return lesPlugins.get('del')(dir.prebuild);
    },
});

// Compresse les images
// TODO fix avec svg
createTask({
    taskName: 'min:images',
    pluginsRequired: ['plumber', 'imagemin'],
    taskFunction: () => {
        ////return gulp.src([dir.dev + source.images + filesIn.images, '!' + dir.dev + source.svg + filesIn.svg])
        return gulp
            .src(dir.dev + source.images + filesIn.images)
            .pipe(lesPlugins.get('plumber')())
            .pipe(
                lesPlugins.get('imagemin')({
                    interlaced: true,
                }),
            )
            .pipe(gulp.dest(dir.dist + dest.images));
    },
});

createTask({
    taskName: 'build:html',
    pluginsRequired: ['useref', 'if', 'terser', 'minify-css'],
    taskFunction: () => {
        return gulp
            .src([dir.prebuild + '*.html'])
            .pipe(lesPlugins.get('useref')())
            .pipe(lesPlugins.get('if')(filesIn.js, lesPlugins.get('terser')())) // pour minifier les fichiers Javascript
            .pipe(lesPlugins.get('if')(filesIn.css, lesPlugins.get('minify-css')())) // pour minifier les fichiers CSS
            .pipe(gulp.dest(dir.dist));
    },
});

// Compression + Minimisation des js/css du fichier html
createTask({
    taskName: 'min:useref',
    pluginsRequired: ['useref', 'if', 'terser', 'minify-css'],
    taskFunction: () => {
        console.log('min:useref', dir.dev + source.useref + filesIn.useref);
        return (
            gulp
                ////.src([dir.dev + filesIn.useref, dir.dev + source.useref + filesIn.useref])
                .src(dir.dev + source.useref + filesIn.useref)
                .pipe(lesPlugins.get('useref')())
                .pipe(lesPlugins.get('if')(filesIn.js, lesPlugins.get('terser')())) // pour minifier les fichiers Javascript
                .pipe(lesPlugins.get('if')(filesIn.css, lesPlugins.get('minify-css')())) // pour minifier les fichiers CSS
                .pipe(lesPlugins.get('if')(filesIn.html, gulp.dest(dir.dist + source.useref)))
        );
    },
});
createTask({
    taskName: 'min:useref2',
    pluginsRequired: ['useref', 'if', 'terser', 'minify-css'],
    taskFunction: () => {
        return (
            gulp
                ////.src([dir.dev + filesIn.useref, dir.dev + source.useref + filesIn.useref])
                .src(dir.dev + source.useref + filesIn.useref)
                .pipe(lesPlugins.get('useref')())
                .pipe(lesPlugins.get('if')(filesIn.js, lesPlugins.get('terser')())) // pour minifier les fichiers Javascript
                .pipe(lesPlugins.get('if')(filesIn.css, lesPlugins.get('minify-css')())) // pour minifier les fichiers CSS
                .pipe(lesPlugins.get('if')(filesIn.html, gulp.dest(dir.dist + source.useref)))
        );
    },
});

// Compression + Minimisation des js du dossier scripts
createTask({
    taskName: 'min:js',
    pluginsRequired: ['rename', 'terser'],
    taskFunction: () => {
        jsInIndex.forEach(function (js) {
            tabJs.push('!' + dir.dev + source.js + js);
        });
        return (
            gulp
                .src(tabJs)
                ////.pipe(lesPlugins.get('terser')()) // pour minifier les fichiers Javascript
                .pipe(
                    lesPlugins.get('rename')({
                        extname: filesOut.minExt + '.js',
                    }),
                )
                .pipe(gulp.dest(dir.dist + dest.js))
        );
    },
});

// Compression + Minimisation des css du dossier styles
createTask({
    taskName: 'min:css',
    pluginsRequired: ['rename'],
    taskFunction: () => {
        cssInIndex.forEach(function (css) {
            tabCss.push('!' + dir.dev + source.css + css);
        });
        return (
            gulp
                .src(tabCss)
                ////.pipe(lesPlugins.get('minify-css')()) // pour minifier les fichiers Javascript
                .pipe(
                    lesPlugins.get('rename')({
                        extname: filesOut.minExt + '.css',
                    }),
                )
                .pipe(gulp.dest(dir.dist + dest.css))
        );
    },
});

// Copie des fonts
createTask({
    taskName: 'copy:fonts',
    pluginsRequired: [],
    taskFunction: () => {
        return gulp.src(dir.dev + source.fonts + filesIn.fonts).pipe(gulp.dest(dir.dist + dest.fonts));
    },
});

// Copie des sons
createTask({
    taskName: 'copy:sounds',
    pluginsRequired: [],
    taskFunction: () => {
        return gulp.src(dir.dev + source.sounds + filesIn.sounds).pipe(gulp.dest(dir.dist + dest.sounds));
    },
});

// Copie des styles
createTask({
    taskName: 'copy:styles',
    pluginsRequired: [],
    taskFunction: () => {
        return gulp.src(dir.dev + source.styles + filesIn.css).pipe(gulp.dest(dir.prebuild + dest.styles));
    },
});

// Copie des scripts
createTask({
    taskName: 'copy:scripts',
    pluginsRequired: [],
    taskFunction: () => {
        return gulp.src(dir.dev + source.scripts + filesIn.js).pipe(gulp.dest(dir.prebuild + dest.scripts));
    },
});

// Copie des fichiers à la racine de l'application
createTask({
    taskName: 'copy:racine',
    pluginsRequired: [],
    taskFunction: () => {
        return gulp.src(dir.dev + source.racine + filesIn.racine).pipe(gulp.dest(dir.dist));
    },
});

// Permet d'executer create_zip à partir du dossier dist
// (ca permet d'avoir uniquement le contenu du dossier dist dans le zip)
createTask({
    taskName: 'archive',
    pluginsRequired: ['child_process'],
    taskFunction: (done) => {
        lesPlugins.get('child_process').execSync('call_create_zip.bat');
        done();
    },
});

/****************************************************
 ** Creation des groupes de taches                  *
 ** Creation des watchers                           *
 ***************************************************/

// Création des groupes de taches
for (let key in groupTasks) {
    gulp.task(key, gulp.series(...groupTasks[key]));
}

// Tâche "watch"
gulp.task('watch', function () {
    // Lance un watch pour chaque tache dans le tableau
    tabWatch.forEach(function (uneTache) {
        console.log('Démarrage du watch de ' + uneTache + '...');
        gulp.watch(dir.dev + source[uneTache] + filesIn[uneTache], gulp.series(uneTache));
    });
});

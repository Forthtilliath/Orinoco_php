// Dossier root
// prettier-ignore
const dir = {
    dev     : 'dev/',       // Dossier developpement
    prebuild: 'prebuild/',   // Dossier temporaire pour générer les html
    dist    : 'dist/',      // Dossier de distribution

    assets: 'assets/',      // Dossier des assets : scripts, styles, images
    app   : 'app/',         // Dossier lié à l'application : icones de l'appli & images pour la promo de l'app
};

// Chemin d'origine
// prettier-ignore
const dirIn = {
    app_images: dir.app + 'images/**/',
    app_icons : dir.app + 'icons/',
    svg       : dir.assets + 'images/svg/**/',
    images    : dir.assets + 'images/**/',
    styles    : dir.assets + 'styles/**/',
    scripts   : dir.assets + 'scripts/**/',
    sounds    : dir.assets + 'sounds/**/',
    fonts     : dir.assets + 'fonts/',
    views     : 'views/',
    racine    : '',
};

// Chemin de destination
// prettier-ignore
const dirOut = {
    app_images: dir.app + 'images/',
    app_icons : dir.app + 'icons/',
    svg       : dir.assets + 'images/sprites/',
    images    : dir.assets + 'images/',
    styles    : dir.assets + 'styles/',
    scripts   : dir.assets + 'scripts/',
    useref    : '',
    sounds    : dir.assets + 'sounds/',
    fonts     : dir.assets + 'fonts/',
};

// Fichiers d'origine
// prettier-ignore
const filesIn = {
    index    : 'index.html',                                     // Index de l'app
    js       : '*.js',
    css      : '*.css',
    html     : '*.html',
    images   : '*.+(png|jpg|gif|jpeg)',
    favicon  : 'favicon.(ico|png)',                              // Icone du site
    svg      : '*.svg',
    icons    : '*.png',                                          // Icones de l'app
    sass     : '*.sass',
    sounds   : '*.+(mp3|flac)',
    fonts    : '*',
    racineapp: '+(*.+(html)|manifest.json|create_zip.bat)',      // Fichiers à la racine de l'app
    racineweb: '+(*.+(html|htaccess)|robots.txt|sitemap.xml)',   // Fichiers à la racine du site
};

// Fichiers de sortie
// prettier-ignore
const filesOut = {
    svgExt: '.svg',   // Extension pour les sprites svg
    minExt: '',       // Ajout d'extension pour les fichiers minimisés
};

// Groupe des taches
// prettier-ignore
const groupTasks = {
    app     : ['app:images'],                                        // Utile pour ajouter l'application sur le store
    prebuild: ['copy:styles', 'copy:scripts', 'prebuild:html'],      // Copie les fichiers scripts et styles et include les fichiers html entre-eux
    //build   : ['build:svg', 'prebuild', 'build:html', 'clean:prebuild'],               // Utile pour exécuter l'application lors des tests
    build   : ['build:svg', 'prebuild', 'build:html', 'clean:prebuild'],               // Utile pour exécuter l'application lors des tests
    useref  : ['min:useref', 'min:useref2'],
    min     : ['min:images', 'min:js', 'min:css', 'useref'],
    copy    : ['copy:racine'],
    dist    : ['clean:dist', 'app', 'build', /*'copy', */'min', 'archive'],   // Tâche dist : Compresse et copie l'ensemble des fichiers pour la distribution
    default : ['dist'],                                              // Tâche par défaut
};

//const groupTasks = {};

const tabWatch = ['sass', 'min:images']; // Tache à écouter // TODO Array( files, tasks to call )
/* TODO Développer cette version
//let tabWatch = [
//    [dir.dev + source.images + filesIn.images,'min:images'],
//    [dir.dev + source.svg + filesIn.svg,'svg']
//];
*/

const PLUGINS = [
    'chalk',
    'gulp-load-plugins',
    'gulp-plumber',
    'gulp-imagemin',
    'gulp-cache',
    'gulp-svg-sprite',
    'del',
    'child_process',
    'gulp-rename',
    'gulp-minify-css',
    'gulp-if',
    'gulp-terser',
    'gulp-svgmin',
    'gulp-cheerio',
    'gulp-replace',
    'imagemin-jpegtran',
    'merge-stream',
    'path',
    'gulp-useref',
    'glob',
    'gulp-file-include',
];

// Préfixer pour le CSS
const AUTOPREFIXER_BROWSERS = [
    'ie >= 10',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.4',
    'bb >= 10',
];

module.exports = {
    dir,
    dirIn,
    dirOut,
    filesIn,
    filesOut,
    groupTasks,
    tabWatch,
    PLUGINS,
    AUTOPREFIXER_BROWSERS,
};

class Produit {
    constructor(type, id, nom, description, prix, options, image, stock = 5) {
        this.type = type;
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
        this.options = options;
        this.lentilles = type == 'camera' ? options : '';
        this.varnish = type == 'furniture' ? options : '';
        this.colors = type == 'teddie' ? options : '';
        this.image = image;
        this.stock = stock;
    }

    get Id() {
        return this.id;
    }

    get Nom() {
        return this.nom;
    }

    get Description() {
        return this.description;
    }

    get Prix() {
        return this.prix;
    }

    get Options() {
        return this.options;
    }

    get Lentilles() {
        return this.lentilles;
    }

    get Varnish() {
        return this.varnish;
    }

    get Colors() {
        return this.colors;
    }

    get Image() {
        return this.image;
    }

    get Stock() {
        return this.stock;
    }
}
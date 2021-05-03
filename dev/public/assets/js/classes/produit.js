const defaultStockMax = 5;

class Produit {
    constructor(id, nom, description, prix, image, stock) {
        this.id = id;
        this.nom = nom;
        this.description = description;
        this.prix = prix;
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

    get Image() {
        return this.image;
    }

    get Stock() {
        return this.stock;
    }
}

class Camera extends Produit {
    constructor(id, nom, description, prix, image, lentilles, stock = defaultStockMax) {
        super(id, nom, description, prix, image, stock);
        this.lentilles = lentilles;
    }

    get Lentilles() {
        return this.lentilles;
    }
}

class Furniture extends Produit {
    constructor(id, nom, description, prix, image, varnish, stock = defaultStockMax) {
        super(id, nom, description, prix, image, stock);
        this.varnish = varnish;
    }

    get Varnish() {
        return this.varnish;
    }
}

class Teddie extends Produit {
    constructor(id, nom, description, prix, image, colors, stock = defaultStockMax) {
        super(id, nom, description, prix, image, stock);
        this.colors = colors;
    }

    get Colors() {
        return this.colors;
    }
}

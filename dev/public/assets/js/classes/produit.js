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

    // constructor(unProduit) {
    //     this.id = unProduit.id;
    //     this.nom = unProduit.nom;
    //     this.description = unProduit.description;
    //     this.prix = unProduit.prix;
    //     this.image = unProduit.image;
    //     this.stock = unProduit.stock;
    // }

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

    static hasInstance(object) {
        if (object.id === 'undefined') return false;
        if (object.nom === 'undefined') return false;
        if (object.description === 'undefined') return false;
        if (object.prix === 'undefined') return false;
        if (object.image === 'undefined') return false;
        if (object.stock === 'undefined') return false;
        return true;
    }

    static fromObject(p) {
        return [p.id, p.nom, p.description, p.prix, p.image, p.stock];
    }
}

class Camera extends Produit {
    constructor(id, nom, description, prix, image, stock = defaultStockMax, lentilles) {
        super(id, nom, description, prix, image, stock);
        this.lentilles = lentilles;
    }

    // constructor(uneCamera) {
    //     super(uneCamera);
    //     this.lentilles = uneCamera.lentilles;
    // }

    get Lentilles() {
        return this.lentilles;
    }

    static hasInstance(object) {
        if (!super.hasInstance(object)) return false;
        if (object.lentilles === 'undefined') return false;
        return true;
    }

    static fromObject(c) {
        return [...super.fromObject(c), c.lentilles];
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

    static hasInstance(object) {
        if (!super.hasInstance(object)) return false;
        if (object.varnish === 'undefined') return false;
        return true;
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

    static hasInstance(object) {
        if (!super.hasInstance(object)) return false;
        if (object.colors === 'undefined') return false;
        return true;
    }
}

class IndexedDB {
    constructor(dbname, dbversion = 1) {
        this.dbname = dbname;
        this.dbversion = dbversion;
        this.dbconnect = null;

        this.db = null;
    }

    setDB = (db) => {
        this.db = db;
    };

    open = () => {
        return (this.dbconnect = window.indexedDB.open(this.dbname, this.dbversion));
    };

    createOrders = () => {
        let table_Orders = this.db.createObjectStore('Orders', { keyPath: 'id', autoIncrement: true });
        table_Orders.createIndex('order_Id', 'order_Id', { unique: true });
        table_Orders.createIndex('contact_LastName', 'contact_LastName', { unique: false });
        table_Orders.createIndex('contact_FirstName', 'contact_FirstName', { unique: false });
        table_Orders.createIndex('contact_AdrStreet', 'contact_AdrStreet', { unique: false });
        table_Orders.createIndex('contact_AdrCity', 'contact_AdrCity', { unique: false });
        table_Orders.createIndex('contact_Email', 'contact_Email', { unique: false });
        table_Orders.createIndex('order_Date', 'order_Date', { unique: false });
    };

    createProductsSold = () => {
        let table_ProductsSold = this.db.createObjectStore('ProductsSold', ['product_Id','lense']);
        table_ProductsSold.createIndex('product_Id', 'product_Id');
        table_ProductsSold.createIndex('product_Lense', 'product_Lense');
        table_ProductsSold.createIndex('quantity_Sold', 'quantity_Sold');
    };

    addOrders = (order) => {
        const transaction = this.db.transaction('Orders', 'readwrite');
        const store = transaction.objectStore('Orders');
        const data = [
            {
                order_Id: order.orderId,
                contact_LastName: order.contact.lastName,
                contact_FirstName: order.contact.firstName,
                contact_AdrStreet: order.contact.address,
                contact_AdrCity: order.contact.city,
                contact_Email: order.contact.email,
                order_Date: new Date().getTime(),
            },
        ];
        data.forEach((el) => store.add(el));
        console.log('Commande ajoutée à la base de donnée.');

        transaction.onerror = (ev) => {
            console.error('Une erreur est survenue!', ev.target.error.message);
        };
        transaction.oncomplete = (ev) => {
            console.log('Les données ont été ajoutées avec succès !');
        };
    };

    addProductsSold = (order) => {
        // Vérifier si la combinaison id - lense existe déjà
        // Si oui ajouté la quantité à la valeur existante
        // Sinon créer une nouvelle entrée
        const transaction = this.db.transaction('ProductsSold', 'readwrite');
        const store = transaction.objectStore('ProductsSold');
        // array
        let datas = [];
        for (let product of order.products) {
            datas.push(
                {
                    product_Id: product.product_Lense,
                    product_Lense: product.product_Lense,
                    quantity_Sold: product.quantity_Sold,
                },
            );
        }
        data.forEach((el) => store.add(el));
        console.log('Produits vendus ajoutés à la base de donnée.');

        transaction.onerror = (ev) => {
            console.error('Une erreur est survenue!', ev.target.error.message);
        };
        transaction.oncomplete = (ev) => {
            console.log('Les données ont été ajoutées avec succès !');
        };
    };
}

window.onload = () => {
    let order = localStorage.get('order');

    document.querySelector('#order_number').textContent = order.orderId;
    // Supprime le storage order
    //localStorage.remove('order');
    // Supprime le storage panier
    //localStorage.remove('panier');
    // Ou plus rapidement
    //localStorage.clear();

    if (!window.indexedDB) {
        alert('IndexedDB n’est pas supporté !');
    } else {
        let maDB = new IndexedDB('OrinocoDB', 1);
        let maDBConnect = maDB.open();

        maDBConnect.onupgradeneeded = (event) => {
            maDB.setDB(event.target.result);
            maDB.createOrders();
            maDB.createProductsSold();
        };
        
        maDBConnect.onsuccess = (event) => {
            console.log('Mise à jour DB avec succès');
            maDB.setDB(event.target.result);
            maDB.addOrders(order);
        };
    }
};

// let doc = new jsPDF('p', 'pt', 'letter');
// let doc = new jsPDF();
let genOrder = null;

const getPdfName = () => {
    let date = new Date();
    let date_str =
        date.getFullYear() +
        ('0' + (date.getMonth() + 1)).slice(-2) +
        ('0' + date.getDate()).slice(-2) +
        '_' +
        ('0' + date.getHours()).slice(-2) +
        ('0' + date.getMinutes()).slice(-2);
    return 'Orinoco_Facture_' + date_str + '.pdf';
};

const generatePdf = () => {
    let header = ['Article', 'Lentille', 'Prix unitaire', 'Quantité', 'Prix'];
    let datas = [];

    for (let produit of genOrder.products) {
        datas.push([
            produit.name,
            produit.lense,
            (produit.price / 100).jqNumberFormat(),
            produit.quantity,
            ((produit.price / 100) * produit.quantity).jqNumberFormat(),
        ]);
    }

    let doc = new jsPDF();
    doc.autoTable(header, datas);
    doc.save(getPdfName());
};

const orderSuccess = (order) => {
    genOrder = order;
    $('#order-success #order-contact-name').text(order.contact.firstName);
    $('#order-success #order-contact-email').text(order.contact.email);
    $('#order-success #order-orderId').text(order.orderId);
    $('#order-success').removeClass('d-none').addClass('d-block');

    monPanier.reset();
    monPanier.setDisplayMiniBascketNbProduits();
    localStorage.removeItem(monApi.cookieName);
};

const orderFail = () => {
    $('#order-fail').removeClass('d-none').addClass('d-block');
};

const loadOrderConfirmation = (status, order) => {
    // TODO A supprimer une fois les tests finis
    status = 201;
    order = {
        contact: {
            firstName: 'Jean-Paul',
            lastName: 'RICHARD',
            address: '13 rue des salopes',
            city: 'TROUDUC',
            email: 'jp.richard@trouduc.fr',
        },
        products: [
            {
                lenses: ['50mm 1.8', '60mm 2.8', '24-60mm 2.8/4.5'],
                _id: '5be1ef211c9d44000030b062',
                name: 'Hirsch 400DTS',
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                price: 309900,
                imageUrl: 'http://localhost:3000/images/vcam_2.jpg',
                quantity: '2',
                lense: '60mm 2.8',
            },
            {
                lenses: ['25mm 4.5'],
                _id: '5be9bc241c9d440000a730e7',
                name: 'Franck JS 105',
                price: 209900,
                description:
                    'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                imageUrl: 'http://localhost:3000/images/vcam_3.jpg',
                quantity: '1',
                lense: '25mm 4.5',
            },
        ],
        orderId: '24084260-b052-11eb-8062-d92c979ffac5',
    };
    if (status === 201) {
        orderSuccess(order);
    } else {
        orderFail();
        if (status === 400) {
        } else if (status === 500) {
        } else {
        }
    }
};

window['loadOrderConfirmation'] = loadOrderConfirmation;

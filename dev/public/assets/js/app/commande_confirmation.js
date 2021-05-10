// let doc = new jsPDF('p', 'pt', 'letter');
// let doc = new jsPDF();

const generatePdf = () => {
    // doc.fromHTML($('#contentPdf')[0], 15, 15, {
    //     width: 800,
    //     elementHandlers: {
    //         '#editor': function (element, renderer) {
    //             return true;
    //         },
    //     },
    // });

    // doc.autoTable({ html: '#tab_products' });
    // let date = new Date();
    // let date_str =
    //     date.getFullYear() +
    //     ('0' + (date.getMonth() + 1)).slice(-2) +
    //     ('0' + date.getDate()).slice(-2) +
    //     '_' +
    //     ('0' + date.getHours()).slice(-2) +
    //     ('0' + date.getMinutes()).slice(-2);
    // doc.save('Orinoco_Facture_' + date_str + '.pdf');
    var columns = ['ID', 'Name', 'Country'];
    var rows = [
        [1, 'Shaw', 'Tanzania'],
        [2, 'Nelson', 'Kazakhstan'],
        [3, 'Garcia', 'Madagascar'],
    ];

    // Only pt supported (not mm or in)
    let doc = new jsPDF('p', 'pt');
    doc.autoTable(columns, rows);
    doc.save('table.pdf');
};

const orderSuccess = (order) => {
    $('#order-success #order-contact-name').text(order.contact.firstName);
    $('#order-success #order-contact-email').text(order.contact.email);
    $('#order-success #order-orderId').text(order.orderId);
    $('#order-success').removeClass('d-none').addClass('d-block');

    for (let produit of order.products) {
        let prix_unit = produit.price / 100;
        let prix_total = (produit.price / 100) * produit.quantity;
        $('#tab_products tbody').append(
            $('<tr>').append(
                $('<td>').text(produit.name),
                $('<td>').text(produit.lense),
                $('<td>').text(prix_unit.numberFormat()),
                $('<td>').text(produit.quantity),
                $('<td>').text(prix_total.numberFormat()),
            ),
        );
    }

    monPanier.reset();
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

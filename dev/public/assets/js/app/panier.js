window.onload = () => {
    // Création de l'objet panier avec le cookie 'panier'
    // monApi = new Api('panier');
    // monPanier = monApi.getPanier();

    // TODO Ajouter un loader
    // monPanier.setDisplayPanier();
    // monPanier.display();
    // // Crée un écouteur pour savoir si le panier est modifié (sur cette page ou une autre)
    // monPanier.createListener();

    const showPanier = () => {
        monPanier.setDisplayPanier();
        monPanier.display();
        // Crée un écouteur pour savoir si le panier est modifié (sur cette page ou une autre)
        monPanier.createListener();
    }

    // Variable pour contenir le bouton supprimer
    let bt_supprimer_target = null;
    // Se déclenche lorsque le modal s'ouvre
    $('#modalConfirmRemove').on('show.bs.modal', function (e) {
        // Stocke le bouton Supprimer sur lequel l'utilisateur a cliqué
        bt_supprimer_target = e.relatedTarget;
        // Récupère l'id de l'élément
        let id = monApi.getElementId('article', bt_supprimer_target.getAttribute('id').numberID());
        // Récupère les éléments du modal
        let article = $(e.target).find('#modal-body-article'); //le find permet de recherche parmis les enfants de e.target(le modal)
        let lentilles = $(e.target).find('#modal-body-lentilles');
        // Modifie le contenue du modal
        article.textContent = monApi.getElement('nom', id).textContent;
        console.log(article.textContent);
        lentilles.textContent = monApi.getElement('lentilles', id).textContent;
    });

    $('#modalConfirmRemoveValid').on('click', function () {
        // Retire l'article du panier
        monPanier.removeProduit(bt_supprimer_target);
        // Réinitialise la variable contenant le bouton cliqué
        bt_supprimer_target = null;
    });

    /***************************************************
     ** Modal- Confirmation de commande                *
     **************************************************/

    // Declaration des id provenant des inputs de order
    /*let modalName = document.querySelector(`#order_last_name`);
    let modalFirstName = document.querySelector(`#order_first_name`);
    let modalPhone = document.querySelector(`#order_phone_number`);
    let modalAddress = document.querySelector(`#order_adress`);
    let modalCity = document.querySelector(`#order_city`);
    let modalEmail = document.querySelector(`#order_email`);
    let modalForm = document.querySelector(`#order_form`);

    // Declaration des formats
    let phoneFormat = /^\d{10}$/;
    let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    // Set up des messages des champs non complèter
    let modalErrorMessages = {
        order_last_name: "Sans le nom ca va être compliqué d'envoyer la commande",
        order_first_name: 'Le prénom est tout aussi essentiel que le nom',
        order_adress: 'Si vous nous dites pas ou envoyer la commande, on ne peut le savoir hein !',
        order_city: 'Ohh vraiment tu as oublié ta ville ? =)',
        order_email: 'Merci de renseigner votre adresse e-mail',
    };

    // permet de mettre en relation le format de l inpu email et modifier la class si match
    for (let [key, value] of Object.entries(modalErrorMessages)) {
        document.getElementById(key).setAttribute('title', value);
    }

    const validateEmail = (e) => {
        let elem = e.target;
        elem.classList.remove('is-valid', 'is-invalid');
        if (elem.value.match(emailFormat)) {
            elem.classList.add('is-valid');
            elem.setCustomValidity('');
        } else {
            elem.classList.add('is-invalid');
            elem.setCustomValidity(modalErrorMessages[e.target.getAttribute('id')]);
        }
    };

    //same pour tel
    const validatePhone = (e) => {
        let elem = e.target;
        elem.classList.remove('is-valid', 'is-invalid');
        if (elem.value.match(phoneFormat)) {
            elem.classList.add('is-valid');
        } else {
            elem.classList.add('is-invalid');
        }
    };

    // valeur minimal de 3 caractère pour les champs adresse, city, prenom et nom. avec le custom des messages des champs non remplis
    const modalChecker = (e) => {
        let elem = e.target;
        elem.classList.remove('is-valid', 'is-invalid');

        if (elem.value.length > 3) {
            elem.classList.add('is-valid');
            elem.setCustomValidity('');
        } else {
            elem.classList.add('is-invalid');
            elem.setCustomValidity(modalErrorMessages[e.target.getAttribute('id')]);
        }
    };

    modalName.addEventListener('blur', modalChecker);
    modalFirstName.addEventListener('blur', modalChecker);
    modalAddress.addEventListener('blur', modalChecker);
    modalCity.addEventListener('blur', modalChecker);
    modalEmail.addEventListener('blur', validateEmail);

    modalForm.addEventListener('submit', (e) => {
        e.preventDefault();

        let contact = {
            firstName: modalName.value,
            lastName: modalFirstName.value,
            address: modalAddress.value,
            city: modalCity.value,
            email: modalEmail.value,
        };
        //let products = monPanier.getListProductsId();
        let products = monPanier.getListProductsForOrder();
        let order = {
            contact,
            products,
        };

        let returned = () => {
            return new Promise((resolve) => {
                var xhr = new XMLHttpRequest();

                xhr.onload = function () {
                    // print JSON response
                    if (this.readyState === XMLHttpRequest.DONE && this.status === 201) {
                        localStorage.set('order', this.responseText);
                        //window.location = './order-confirmation.html';
                        window.location = '/order';
                        //resolve(JSON.parse(this.responseText));
                    } else if (this.readyState === XMLHttpRequest.DONE) {
                        // ERROR
                        console.error('Erreur', this.status, this.statusText, '!!!');
                        if (this.status === 400) {
                            console.error('Erreur !', "Toutes les données attendues n'ont pas été reçu !");
                        } else if (this.status === 500) {
                            console.error('Erreur !', "L'id d'un produit n'a pas été trouvé !");
                        }
                    }
                };
                xhr.open('POST', 'http://localhost:3000/api/cameras/order', true);
                //Envoie les informations du header adaptées avec la requête
                xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');

                xhr.send(JSON.stringify(order));
            });
        };
        returned();
    });*/
};
if (typeof monApi !== 'undefined') {
    dispatchEvent(new Event('load'));
}

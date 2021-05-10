/**
 * Génère l'objet prêt à l'envoi
 * @returns {{contact: object, products: object}}
 */
const getOrderObject = () => {
    return {
        // prettier-ignore
        contact: {
            firstName: $('#formContact #prenom').val(),
            lastName : $('#formContact #nom').val(),
            address  : $('#formContact #adresse').val(),
            city     : $('#formContact #ville').val(),
            email    : $('#formContact #email').val(),
        },
        products: monPanier.getListProductsForOrder(),
    };
};

const formChecker = () => {
    let forms = document.getElementsByClassName('needs-validation');
    Array.prototype.filter.call(forms, (form) => {
        form.addEventListener(
            'submit',
            (event) => {
                event.preventDefault();

                $('#formContact #prenom').val('Jean-Paul');
                $('#formContact #nom').val('RICHARD');
                $('#formContact #adresse').val('13 rue des salopes');
                $('#formContact #ville').val('TROUDUC');
                $('#formContact #email').val('jp.richard@trouduc.fr');

                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                } else {
                    var jqxhr = $.post('http://localhost:3000/api/cameras/order', getOrderObject());
                    jqxhr.done((reponse, status, xhr) => {
                        monApi.router.changePage('/commande_confirmation', xhr.status, reponse);
                    });
                    jqxhr.fail((status) => {
                        monApi.router.changePage('/commande_confirmation', status);
                    });
                }
                form.classList.add('was-validated');
            },
            false,
        );
    });
};

window['formChecker'] = formChecker;

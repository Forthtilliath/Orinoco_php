window['showPanier'] = () => {
    monPanier.setDisplayPanier();
    monPanier.display();
    monPanier.createListener();
    let bt_supprimer_target = null;

    $('#modalConfirmRemove').on('show.bs.modal', function (e) {
        bt_supprimer_target = e.relatedTarget;
        let id = monApi.getElementId('article', bt_supprimer_target.getAttribute('id').numberID());
        $(e.target).find('#modal-body-article').text(monApi.getElement('nom', id).textContent);
        $(e.target).find('#modal-body-lentilles').text(monApi.getElement('lentilles', id).textContent);
    });

    $('#modalConfirmRemoveValid').on('click', function () {
        monPanier.removeProduit(bt_supprimer_target);
        bt_supprimer_target = null;
    });
};
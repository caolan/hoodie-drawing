$(function () {

    $('#signUpForm').submit(function (ev) {
        ev.preventDefault();
        hoodie.account.signUp(
            $('#signUpUsername').val(),
            $('#signUpPassword').val()
        );
        return false;
    });

    $('#clearBtn').click(function (ev) {
        ev.preventDefault();
        hoodie.store.removeAll('path');
        return false;
    });

    $('#downloadBtn').click(function (ev) {
        ev.preventDefault();
        download( drawing('drawing.png') );
        return false;
    });

    $('#shareBtn').click(function (ev) {
        ev.preventDefault();
        var recipient = prompt('Who would you like to send your drawing to?');
        if (recipient) {
            hoodie.email.send({
                to: recipient,
                //from: 'user@example.com' // automatically set when using gmail
                subject: 'I drew a thing!',
                body: 'Made with hoodie-drawing',
                attachments: [
                    getDrawing('drawing.png')
                ]
            });
        }
        return false;
    });

});

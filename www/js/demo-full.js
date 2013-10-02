function demo() {

    // 1

    $('#signUpForm').submit(function (ev) {
        ev.preventDefault();
        var username = $('#signUpUsername').val();
        var password = $('#signUpPassword').val();

        hoodie.account.signUp(username, password);
    });


    // 2

    onPathEnd = function (path) {
        hoodie.store.add('path', path);
    };

    hoodie.store.findAll('path').done(function (docs) {
        docs.forEach(drawPath);
    });


    // 3

    hoodie.store.on('add:path', function (doc) {
        if (doc.by !== clientId) {
            drawPath(doc);
        }
    });


    // 4

    $('#clearBtn').click(function (ev) {
        hoodie.store.removeAll('path');
    });

    hoodie.store.on('remove:path', function (doc) {
        clearPath(doc);
    });


    // 5

    $('#downloadBtn').click(function (ev) {
        download( getDrawing('drawing.png') );
    });


    // 6

    $('#shareBtn').click(function (ev) {
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
    });

}

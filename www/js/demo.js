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
        console.log('adding path');
        hoodie.store.add('path', path).fail(function (err) {
            console.log('fail');
            console.log(err);
        }).done(function () {
            console.log('done');
            console.log(arguments);
        });
    };

    hoodie.store.findAll('path').done(function (docs) {
        console.log('findAll path');
        console.log(docs);
        docs.forEach(drawPath);
    });


    // 3

    hoodie.store.on('path:add', function (doc) {
        console.log('path:add');
        console.log(doc);
        if (doc.by !== clientId) {
            console.log('drawing Path');
            drawPath(doc);
        }
    });


    // 4

    $('#clearBtn').click(function (ev) {
        console.log('removeAll path');
        hoodie.store.removeAll('path');
    });

    hoodie.store.on('path:remove', function (doc) {
        console.log('path:remove');
        console.log(doc);
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

function demo() {

    // 1: signup

    $('#signUpForm').submit(function (ev) {
        ev.preventDefault();
        var username = $('#signUpUsername').val();
        var password = $('#signUpPassword').val();
        // ...
        hoodie.account.signUp(username, password);
    });


    // 2: persist

    // - add path to store onPathEnd
    // - on page load, find all paths and for each drawPath when done()

    onPathEnd = function (path) {
        hoodie.store.add('path', path);
    };

    hoodie.store.findAll('path').done(function (paths) {
        paths.forEach(drawPath);
    });

    // 3: synchronize

    // - on path add, drawPath if event is remote

    hoodie.store.on('path:add', function (path, options) {
        if (options.remote) {
            drawPath(path);
        }
    });

    // 4: clear

    // - on click clearBtn, remove all paths from store
    // - on path remove, clearPath from drawing

    $('#clearBtn').click(function () {
        hoodie.store.removeAll('path');
    });

    hoodie.store.on('path:remove', function (path) {
        clearPath(path);
    });

    // 5: download

    // - on click downloadBtn, getDrawing('drawing.png') and download

    $('#downloadBtn').click(function () {
        download( getDrawing('drawing.png') );
    });

    // 6: share

    // - on click shareBtn, prompt for recipient and email.send

    $('#shareBtn').click(function () {
        var recipient = prompt('Who would you like to send your drawing to?');
        if (recipient) {
            hoodie.email.send({
                to: recipient,
                subject: 'I drew a thing!',
                body: 'made with hoodie drawing',
                attachments: [
                    getDrawing('drawing.png')
                ]
            });
        }
    });

}

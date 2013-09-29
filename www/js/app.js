var hoodie = new Hoodie();

function handleSignin() {
    $('#sessionMenu .sign-in').hide();
    $('#sessionMenu .sign-up').hide();
    $('#sessionMenu .sign-out').show();
    $('#sessionMenu .username').show();
    $('#currentUsername').text(hoodie.account.username);
    $('#signInModal').modal('hide');
    $('#signUpModal').modal('hide');
    $('#shareBtn').show();
}

function handleSignout() {
    $('#sessionMenu .sign-in').show();
    $('#sessionMenu .sign-up').show();
    $('#sessionMenu .sign-out').hide();
    $('#sessionMenu .username').hide();
    $('#shareBtn').hide();
}

hoodie.account.on('signin', handleSignin);
hoodie.account.on('signout', handleSignout);

// initial state
$(function () {
    if (hoodie.account.hasAccount()) {
        handleSignin();
    }
    else {
        handleSignout();
    }
});



function extname(path) {
    var m = /\.[^\.]+$/.exec(path);
    if (m) {
        return m[1];
    }
    return null;
}

function mimetype(path) {
    // assume image for now
    return 'image/' + extname(path);
}

function drawing(filename) {
    var mime = mimetype(filename);
    var canvas = $('#draw')[0];
    return {
        fileName: filename,
        contentType: mime,
        dataURI: canvas.toDataURL(mime)
    };
}

// from hoodie-invoice
function download(data) {
    var a = $('<a>download link</a>').attr({
        href: data.dataURI.replace("image/png", "image/octet-stream"),
        download: data.fileName
    })[0];
    if (a.fireEvent) {
        a.fireEvent('onclick');
    }
    else {
        var evt = document.createEvent('MouseEvents');
        evt.initMouseEvent(
            'click', true, true, window, 1, 0, 0, 0, 0,
            false, false, false, false, 0, null
        );
        a.dispatchEvent(evt);
    }
}

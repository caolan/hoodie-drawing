function demo() {

    // 1: signup

    $('#signUpForm').submit(function (ev) {
        ev.preventDefault();
        var username = $('#signUpUsername').val();
        var password = $('#signUpPassword').val();
        // ...
    });


    // 2: persist

    // - add path to store onPathEnd
    // - find all paths and for each drawPath


    // 3: realtime

    // - on add path, drawPath if not by current clientId


    // 4: clear

    // - on click clearBtn, remove all paths from store
    // - on remove path, clearPath from drawing


    // 5: download

    // - on click downloadBtn, getDrawing and download


    // 6: share

    // - on click shareBtn, prompt for recipient and email.send

}

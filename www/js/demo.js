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
    // - on page load, find all paths and for each drawPath when done()


    // 3: synchronize

    // - on path add, drawPath if event is remote


    // 4: clear

    // - on click clearBtn, remove all paths from store
    // - on path remove, clearPath from drawing


    // 5: download

    // - on click downloadBtn, getDrawing('drawing.png') and download


    // 6: share

    // - on click shareBtn, prompt for recipient and email.send

}

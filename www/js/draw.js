var currentArtist = hoodie.uuid();

// The faster the user moves their mouse the larger the circle will be
// We dont want it to be larger/smaller than this
tool.maxDistance = 2;
tool.maxDistance = 80;

// Returns an object specifying a semi-random color
function randomColor() {
    return {
        hue: Math.random() * 360,
        saturation: 0.8,
        brightness: 0.8,
        alpha: 0.5
    };
}

// An object to keep track of the user's path
var paths = [];
var current_path = null;
var pathdoc = null;

function onMouseDown(event) {
    // Create the new path
    var color = randomColor();
    current_path = new Path();
    pathdoc = {
        by: currentArtist,
        start: event.point,
        color: color,
        route: []
    };
    startPath(current_path, event.point, color);
}

function onMouseDrag(event) {
    var step        = event.delta / 2;
    step.angle     += 90;
    var top         = event.middlePoint + step;
    var bottom      = event.middlePoint - step;
    continuePath(current_path, top, bottom);
    pathdoc.route.push([top, bottom]);
}

function onMouseUp(event) {
    endPath(current_path, event.point);
    current_path.hoodie_id = hoodie.uuid();
    pathdoc.end = event.point;
    pathdoc.id = current_path.hoodie_id;
    hoodie.store.add('path', pathdoc);
    paths.push(current_path);
    pathdoc = null;
    current_path = null;
}

function startPath(path, point, color) {
    path.fillColor = color;
    path.add(point);
}

function continuePath(path, top, bottom) {
    path.add(top);
    path.insert(0, bottom);
}

function endPath(path, point) {
    path.add(point);
    path.closed = true;
    path.smooth();
}


function drawRemotePath(doc) {
    var p = new Path();
    p.by = doc.by;
    startPath(p, doc.start, doc.color);
    for (var i = 0; i < doc.route.length; i++) {
        continuePath(p, doc.route[i][0], doc.route[i][1]);
    }
    endPath(p, doc.end);
    p.hoodie_id = doc.id;
    paths.push(p);
}
hoodie.store.findAll('path').done(function (docs) {
    docs.forEach(drawRemotePath);
    view.draw();
});

hoodie.store.on('add:path', function (doc) {
    if (doc.by !== currentArtist) {
        drawRemotePath(doc);
    }
    view.draw();
});

hoodie.store.on('remove:path', function (doc) {
    var newpaths = [];
    for (var i = 0; i < paths.length; i++) {
        if (doc.id === paths[i].hoodie_id) {
            paths[i].remove();
        }
        else {
            newpaths.push(paths[i]);
        }
    }
    paths = newpaths;
    view.draw();
});

function clearLocal() {
    for (var i = 0; i < paths.length; i++) {
        paths[i].remove();
    }
    paths = [];
    view.draw();
}

hoodie.account.on('signin', clearLocal);
hoodie.account.on('signout', clearLocal);

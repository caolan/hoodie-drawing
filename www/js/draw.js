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
    hoodie.store.add('path', pathdoc)
        .fail(function (e) {
            console.error('error saving path');
            console.error(e);
        })
        .done(function () {
            console.log('saved path');
        });

    paths.push(current_path);
    pathdoc = null;
    current_path = null;
}

function startPath(path, point, color) {
    console.log('startPath [' + path.by + '] ' + point.x + ', ' + point.y);
    path.fillColor = color;
    path.add(point);
}

function continuePath(path, top, bottom) {
    console.log('continuePath [' + path.by + '] ' + top.x + ', ' + top.y + ' - ' + bottom.x + ', ' + bottom.y);
    path.add(top);
    path.insert(0, bottom);
}

function endPath(path, point) {
    console.log('endPath [' + path.by + '] ' + point.x + ', ' + point.y);
    path.add(point);
    path.closed = true;
    path.smooth();
}


// TODO: load initial paths from db

hoodie.store.on('add:path', function (doc) {
    console.log('currentArtist: ' + currentArtist);
    console.log('store add:path\n' + JSON.stringify(doc));
    if (doc.by !== currentArtist) {
        var p = new Path();
        p.by = doc.by;
        startPath(p, doc.start, doc.color);
        for (var i = 0; i < doc.route.length; i++) {
            continuePath(p, doc.route[i][0], doc.route[i][1]);
        }
        endPath(p, doc.end);
        p.hoodie_id = doc.id;
        paths.push(p);
        // TODO: refresh paperjs somehow - it's all drawn but doesn't update
        // until a timeout or a mouse event
    }
    view.draw();
});


// TODO: on remove:path event make sure we delete the associated path
// - cal call path.remove() - so if we keep a store of all paths instead of
//   setting path=null on mouseup we can remove them on the remove:path event!
//   - still needs a manual refresh of paperjs though
//   - perhaps using view.draw() ?


hoodie.store.on('remove:path', function (doc) {
    console.log('remove path event\n' + JSON.stringify(doc));
    for (var i = 0; i < paths.length; i++) {
        console.log(doc.id + ' === ' + paths[i].hoodie_id);
        if (doc.id === paths[i].hoodie_id) {
            console.log('removing path');
            paths[i].remove();
        }
    }
    view.draw();
});

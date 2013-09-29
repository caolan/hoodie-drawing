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
var path = null;

function onMouseDown(event) {
    // Create the new path
    startPath(event.point, randomColor());
}

function onMouseDrag(event) {
    var step        = event.delta / 2;
    step.angle     += 90;
    var top         = event.middlePoint + step;
    var bottom      = event.middlePoint - step;
    continuePath(top, bottom);
}

function onMouseUp(event) {
    endPath(event.point);
}

function startPath( point, color) {
    path = new Path();
    path.fillColor = color;
    path.add(point);
}

function continuePath(top, bottom) {
    path.add(top);
    path.insert(0, bottom);
}

function endPath(point) {
    path.add(point);
    path.closed = true;
    path.smooth();
    path = null;
}

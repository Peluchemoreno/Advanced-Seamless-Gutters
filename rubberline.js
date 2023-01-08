
var enumNone = 0;
var enumLine = 1;
var enumCircle = 2;
var enumArcRadius = 3;
var enumArcAngle = 4;
var enumArc = 5;
var enumMultiline = 6;
var drawingMode = enumNone;
var canvasRubber = null;
var ctxRubber = null;
var colorRubber = "Black";
var startx;
var starty;
var arcStartx;
var arcStarty;
var callbackFunction = null;
var moveFunction = null;
var cancelFunction = null;
var oldStoreCount;
var CursorCrosshair = "url(cursors/crosshair.png) 15 15, crosshair";
var CursorCheckmark = "url(cursors/checkmark.png) 15 28, crosshair";
var CursorMercedes = "url(cursors/mercedes.png) 15 18, crosshair";
var CursorPencil = "url(cursors/pencil.png) 6 28, crosshair";
var CursorPencilStriped = "url(cursors/pencilstriped.png) 6 28, crosshair";
var CursorPencilStripedOrto = "url(cursors/pencilstripedorto.png) 6 28, crosshair";
var CursorPencilFilled = "url(cursors/pencilfilled.png) 6 28, crosshair";
var enumArcNil = 0;
var enumArcClock = 1;
var enumArcCounter = 2;
var arcStatus = enumArcNil; //arc direction
var multiPoints;


// ---------- public functions -----------

//create a transparent canvas copy for drawing rubber lines
function SetCanvasLayer (p_canvas, p_divId, p_moveFunc, p_cancelFunc) {
    var rubberDiv = document.getElementById(p_divId);
    var layer = document.getElementById(canvasRubber);
    if (layer == null) {
        canvasRubber = document.createElement('canvas');
        rubberDiv.appendChild(canvasRubber);
        ctxRubber = canvasRubber.getContext("2d");

        canvasRubber.width = p_canvas.width;
        canvasRubber.height = p_canvas.height;
        canvasRubber.setAttribute("style", p_canvas.getAttribute("style"));
        canvasRubber.style.backgroundColor = "transparent";
        canvasRubber.style.zIndex = parseInt(p_canvas.style.zIndex) + 1;
        canvasRubber.style.cursor = "url(Cursors/pencil.png) 6 28, crosshair";
        canvasRubber.style.display = "none";
        canvasRubber.innerHTML = "Your browser does not support the HTML5 canvas tag.";
        canvasRubber.onclick = LayerClick;
        canvasRubber.onmousemove = LayerMouseMove;

        window.addEventListener("keydown", LayerKeyDown, false);
        moveFunction = p_moveFunc;
        cancelFunction = p_cancelFunc;
    }
}

function SetRubberColor(p_color) {
    colorRubber = p_color;
}

function StartRubberLine(p_x, p_y, p_callBack) {
    if (canvasRubber == null) {
        drawingMode = enumNone;
        alert("Call SetCanvasLayer function before StartRubberLine!");
    }
    else {
        drawingMode = enumLine;
        startx = p_x;
        starty = p_y;
        callbackFunction = p_callBack;
        canvasRubber.style.display = "block";
        oldStoreCount = GetGravityLinesCount();
        StoreGravityLine(p_x, p_y, p_x, p_y);
    }
}

function StartRubberMultiline(p_x, p_y, p_callBack) {
    if (canvasRubber == null) {
        drawingMode = enumNone;
        alert("Call SetCanvasLayer function before StartRubberLine!");
    }
    else {
        drawingMode = enumMultiline;
        startx = p_x;
        starty = p_y;
        callbackFunction = p_callBack;
        canvasRubber.style.display = "block";
        oldStoreCount = GetGravityLinesCount();
        StoreGravityLine(p_x, p_y, p_x, p_y);
        multiPoints = new Array();
        multiPoints.push({x:startx, y:starty});
    }
}

function StartRubberCircle(p_x, p_y, p_callBack) {
    if (canvasRubber == null) {
        drawingMode = enumNone;
        alert("Call SetCanvasLayer function before StartRubberCircle!");
    }
    else {
        drawingMode = enumCircle;
        startx = p_x;
        starty = p_y;
        callbackFunction = p_callBack;
        canvasRubber.style.display = "block";
        oldStoreCount = GetGravityLinesCount();
        StoreGravityLine(p_x, p_y, p_x, p_y);
    }
}

function StartRubberArc(p_x, p_y, p_callBack) {
    if (canvasRubber == null) {
        drawingMode = enumNone;
        alert("Call SetCanvasLayer function before StartRubberArc!");
    }
    else {
        drawingMode = enumArcRadius;
        startx = p_x;
        starty = p_y;
        callbackFunction = p_callBack;
        canvasRubber.style.display = "block";
        oldStoreCount = GetGravityLinesCount();
        StoreGravityLine(p_x, p_y, p_x, p_y);
    }
}

function ClearCanvas(p_canvas, p_context) {
    p_context.clearRect(0, 0, p_canvas.width, p_canvas.height);
    var w = p_canvas.width;
    p_canvas.width = 1;
    p_canvas.width = w;
}

function OKRubber() {
    FinishMultiline();
}

function CancelRubber() {
    clearCanvas();
    RestoreGravityStorage(oldStoreCount);
    drawingMode = enumNone;
    canvasRubber.style.display = "none";
    cancelFunction(true);
}

// ---------- private functions -----------

function LayerClick(e) {
    var pos = RubberGravity(GetRubberMousePos(e));

    if (drawingMode == enumArcRadius) {
        drawingMode = enumArcAngle;
        arcStartx = pos.x;
        arcStarty = pos.y;
        StoreGravityLine(pos.x, pos.y, pos.x, pos.y);
        //RubberGravity(pos); //change cursor
        DrawRubberCircle(pos, false);
    }
    else if (drawingMode == enumMultiline) {
        if (startx == pos.x & starty == pos.y) {
            FinishMultiline();
        }
        else {
            StoreGravityLine(startx, starty, pos.x, pos.y);
            multiPoints.push({ x: pos.x, y: pos.y });
            DrawRubberLine(pos, false);
            startx = pos.x;
            starty = pos.y;
        }
    }
    else {
        clearCanvas();
        RestoreGravityStorage(oldStoreCount);
        var extra = "";
        var points = new Array();
        var c1 = CreateCoord(startx, starty);
        var c2 = CreateCoord(pos.x, pos.y);

        if (drawingMode == enumArcAngle) {
            drawingMode = enumArc;
            extra = arcStatus;
            c2 = CreateCoord(arcStartx, arcStarty);
            var c3 = GetArcPoint(startx, starty, pos.x, pos.y, PointsDistance(startx, starty, arcStartx, arcStarty));
            points.push(c1);
            points.push(c2);
            points.push(c3);
        }
        else {
            points.push(c1);
            points.push(c2);
        }
        var elem = CreateGeomElemObj(drawingMode, "Blue", extra, points);
        drawingMode = enumNone;
        canvasRubber.style.display = "none";
        if (callbackFunction != null) {
            callbackFunction(elem);
        }
    }
}

function FinishMultiline() {
    if (drawingMode == enumMultiline) {
        clearCanvas();
        RestoreGravityStorage(oldStoreCount);

        var elem = CreateGeomElemObj(drawingMode, "Blue", "", multiPoints);
        drawingMode = enumNone;
        canvasRubber.style.display = "none";
        if (callbackFunction != null) {
            callbackFunction(elem);
        }
    }
}

function LayerMouseMove(e) {
    var pos = RubberGravity(GetRubberMousePos(e));

    if (drawingMode == enumLine) {
        DrawRubberLine(pos, true);
    }
    if (drawingMode == enumMultiline) {
        DrawRubberLine(pos, true);
        ctxRubber.beginPath();
        var num = GetArrayLength(multiPoints);
        for (var i = 0; i < num - 1; i++) {
            ctxRubber.moveTo(multiPoints[i].x, multiPoints[i].y);
            ctxRubber.lineTo(multiPoints[i + 1].x, multiPoints[i + 1].y);
        }
        ctxRubber.stroke();
    }
    else if (drawingMode == enumCircle) {
        DrawRubberCircle(pos, true);
    }
    else if (drawingMode == enumArcRadius) {
        DrawRubberLine(pos, true);
        DrawRubberCircle(pos, false);
    }
    else if (drawingMode == enumArcAngle) {
        DrawRubberArc(pos);
    }
    if (moveFunction != null) {
        moveFunction(pos);
    }
}

function DrawRubberLine(pos, clear) {
    if (clear == true) {
        clearCanvas();
    }

    ctxRubber.strokeStyle = colorRubber;
    ctxRubber.beginPath();
    ctxRubber.moveTo(startx, starty);
    ctxRubber.lineTo(pos.x, pos.y);
    ctxRubber.stroke();
}

function DrawRubberCircle(pos, clear) {
    if (clear == true) {
        clearCanvas();
    }

    ctxRubber.strokeStyle = colorRubber;
    ctxRubber.beginPath();
    var r = PointsDistance(startx, starty, pos.x, pos.y);

    ctxRubber.arc(startx, starty, r, 0, Math.PI * 2, true);
    ctxRubber.stroke();
}

function DrawRubberArc(pos) {
    clearCanvas();

    ctxRubber.strokeStyle = colorRubber;
    ctxRubber.beginPath();
    var r = PointsDistance(startx, starty, arcStartx, arcStarty);
    var a0 = GetAngle(startx, starty, arcStartx, arcStarty);
    var a1 = GetAngle(startx, starty, pos.x, pos.y);

    if (arcStatus == enumArcNil) {
        if (a0 < a1) {
            arcStatus = enumArcClock;
       }
        else if (a1 < a0) {
            arcStatus = enumArcCounter;
        }

        if (a0 == Math.PI && a1 < 0) {
            arcStatus = enumArcClock;
        }
    }
    else if (GravityEqualPoints(arcStartx, arcStarty, pos.x, pos.y) == true) {
        arcStatus = enumArcNil; //whole circle before direction change
    }

    if (arcStatus == enumArcClock) {
        if (a1 < a0) {
            a1 = a1 + Math.PI * 2;
        }
        ctxRubber.arc(startx, starty, r, a0, a1, false);
    }
    else if (arcStatus == enumArcCounter) {
        if (a1 > a0) {
            a1 = a1 - Math.PI * 2;
        }
        ctxRubber.arc(startx, starty, r, a0, a1, true);
    }
    else {
        ctxRubber.arc(startx, starty, r, 0, Math.PI * 2, true);
    }

    ctxRubber.stroke();
}

function LayerKeyDown(e) {
    //alert(e.keyCode);
    if (e.keyCode == 27) { //Esc
        CancelRubber();
    }
}

function clearCanvas() {
    ctxRubber.clearRect(0, 0, canvasRubber.width, canvasRubber.height);
    var w = canvasRubber.width;
    canvasRubber.width = 1;
    canvasRubber.width = w;
}

// get mouse position relative to canvasRubber
function GetRubberMousePos(evt) {
    var rect = canvasRubber.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

// ---------- Drawing Functions ----------

//elem: see geomstorage.js/CreateGeomElemObj

//public
function DrawStorageElems(p_canvas) {
    ctx = p_canvas.getContext("2d");
    var num = GetGeomElemsCount();
    for (var i = 0; i < num; i++) {
        var elem = GetGeomElemObj(i, sessionKeyElems);
        if (elem != null) {
            if (elem.type == enumLine) {
                DrawGeomLine(ctx, elem);
            }
            else if (elem.type == enumMultiline) {
                DrawGeomMultiline(ctx, elem);
            }
            else if (elem.type == enumCircle) {
                DrawGeomCircle(ctx, elem);
            }
            else if (elem.type == enumArc) {
                DrawGeomArc(ctx, elem);
            }
        }
    }
}

//public
function DrawGeomLine(ctx, elem) {
    ctx.beginPath();
    ctx.strokeStyle = elem.color;
    ctx.moveTo(elem.points[0].x, elem.points[0].y);
    ctx.lineTo(elem.points[1].x, elem.points[1].y);
    ctx.stroke();
}

//public
function DrawGeomMultiline(ctx, elem) {
    ctx.beginPath();
    ctx.strokeStyle = elem.color;
    var num = GetArrayLength(elem.points);
    for (var i = 0; i < num - 1; i++) {
        ctx.moveTo(elem.points[i].x, elem.points[i].y);
        ctx.lineTo(elem.points[i+1].x, elem.points[i+1].y);
    }
    ctx.stroke();
}

//public
function DrawGeomCircle(ctx, elem) {
    ctx.beginPath();
    ctx.strokeStyle = elem.color;
    var r = PointsDistance(elem.points[0].x, elem.points[0].y, elem.points[1].x, elem.points[1].y);
    ctx.arc(elem.points[0].x, elem.points[0].y, r, 0, Math.PI * 2, true);
    ctx.stroke();
}

//public
function DrawGeomArc(ctx, elem) {
    ctx.beginPath();
    ctx.strokeStyle = elem.color;
    var r = PointsDistance(elem.points[0].x, elem.points[0].y, elem.points[1].x, elem.points[1].y);
    var a0 = GetAngle(elem.points[0].x, elem.points[0].y, elem.points[1].x, elem.points[1].y);
    var a1 = GetAngle(elem.points[0].x, elem.points[0].y, elem.points[2].x, elem.points[2].y);

    if (elem.extra == enumArcClock) {
        if (a1 < a0) {
            a1 = a1 + Math.PI * 2;
        }
        ctx.arc(elem.points[0].x, elem.points[0].y, r, a0, a1, false);
    }
    else if (elem.extra == enumArcCounter) {
        if (a1 > a0) {
            a1 = a1 - Math.PI * 2;
        }
        ctx.arc(elem.points[0].x, elem.points[0].y, r, a0, a1, true);
    }
    else {
        ctx.arc(elem.points[0].x, elem.points[0].y, r, 0, Math.PI * 2, true);
    }
    ctx.stroke();
}

// ---------- Gravity ----------
var gravityX;
var gravityY;
var isGravity;

//public
function GetGravityCursor(pos) {
    var cursor;
    isGravity = RubberPointGravity(pos);
    if (isGravity == true) {
        cursor = CursorPencilFilled;
    }
    else {
        cursor = RubberLineGravity(pos);
        isGravity = cursor != CursorPencil;
    }

    if (drawingMode == enumNone)
    {
        if (cursor == CursorPencil) {
            cursor = CursorCrosshair;
        }
        else if (cursor == CursorPencilStriped) {
            cursor = CursorMercedes;
        }
        else if (cursor == CursorPencilFilled) {
            cursor = CursorCheckmark;
        }
    }

    return cursor;
}

function RubberGravity(pos) {
    return DoGravity(pos, canvasRubber);
}

function DoGravity(pos, canvas) {
    canvas.style.cursor = GetGravityCursor(pos);
    if (isGravity == true) {
        return {
            x: gravityX,
            y: gravityY
        }
    }
    else {
        return {
            x: pos.x,
            y: pos.y
        }
    }
}

function RubberLineGravity(pos) {
    var num = GetGravityLinesCount();
    for (var i = 0; i < num; i++) {
        var lines = GetGravityLine(i);
        if (lines == null) {
            continue;
        }
        var linesnum = GetArrayLength(lines);
        for (var j = 0; j < linesnum; j++) {
            var line = lines[j];
            if (line == null) {
                continue;
            }
            if (drawingMode != enumNone) {
                var pp = PointProjectionOnLine(line.startx, line.starty, line.endx, line.endy, startx, starty);
                if (pp != null) {
                    if (pp.inSection == true) {
                        if (GravityEqualPoints(pp.x, pp.y, pos.x, pos.y) == true) {
                            gravityX = pp.x;
                            gravityY = pp.y;
                            return CursorPencilStripedOrto;
                        }
                    }
                }
            }

            pp = PointProjectionOnLine(line.startx, line.starty, line.endx, line.endy, pos.x, pos.y);
            if (pp != null) {
                if (pp.inSection == true) {
                    if (GravityEqualPoints(pp.x, pp.y, pos.x, pos.y) == true) {
                        gravityX = pp.x;
                        gravityY = pp.y;
                        return CursorPencilStriped;
                    }
                }
            }
        }
    }
    return CursorPencil;
}

function RubberPointGravity(pos) {
    var num = GetGravityLinesCount();
    for (var i = 0; i < num; i++) {
        var lines = GetGravityLine(i);
        if (lines == null) {
            continue;
        }
        var linesnum = GetArrayLength(lines);
        for (var j = 0; j < linesnum; j++) {
            var line = lines[j];
            if (line == null) {
                continue;
            }
            if (GravityEqualPoints(line.startx, line.starty, pos.x, pos.y) == true) {
                gravityX = line.startx;
                gravityY = line.starty;
                return true;
            }
            if (GravityEqualPoints(line.endx, line.endy, pos.x, pos.y) == true) {
                gravityX = line.endx;
                gravityY = line.endy;
                return true;
            }
        }
    }
    return false;
}

function GravityEqualPoints(x1, y1, x2, y2) {
    var radius = 2;
    if (Math.abs(x1 - x2) < radius & Math.abs(y1 - y2) < radius) {
        return true;
    }
    return false;
}

// ---------- Geometry ----------

function PointProjectionOnLine(x1, y1, x2, y2, x0, y0) {
    var v1 = y1 - y2;
    var v2 = x2 - x1;
    if (v1 == 0 & v2 == 0) {
        return null;
    }
    var xx;
    var yy;
    if (v1 == v2) {
        xx = (x0 - y0 + x1 + y1) / 2;
        yy = x1 + y1 - xx;
    }
    else {
        var cc = - v2 * y1 - v1 * x1 + v2 * x0 - (v1 * y0);
        var dd = v2 - v1;
        var ee = (v2 * (v1 + v2) - dd * v1);
        var ff = dd * (v2 * x0 - (v1 * y0)) - v2 * cc;
        if (ee == 0) {
            return null;
        }
        yy = ff / ee;
        xx = (yy * (v1 + v2) + cc) / (v2 - v1);
    }

    var inSection = (x1 - xx) * (x2 - xx) <= 0 & (y1 - yy) * (y2 - yy) <= 0;
    return {
        x: xx,
        y: yy,
        inSection: inSection
    };
}

function PointsDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function GetAngle(x0, y0, x1, y1) {
    return Math.atan2(y1 - y0, x1 - x0);
}

function GetArcPoint(x0, y0, x1, y1, radius) {
    //P0: center
    //P1: click point
    //return: arc point
    var vector = GetUnitVector(x0, y0, x1, y1);
    return {
        x: x0 + radius * vector.x,
        y: y0 + radius * vector.y
    }
}

function GetUnitVector(x1, y1, x2, y2) {
    var length = PointsDistance(x1, y1, x2, y2);
    if (length <= 0) {
        return {
        x: 0,
        y: 1
        } //error
    }
    return {
        x: (x2 - x1) / length,
        y: (y2 - y1) / length
    }
}

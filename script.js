/**
 * NOTE:
 * > KETIKA MENAMBAHKAN 'GAME PIECE' 
 *   PASTIKAN UNTUK MENAMBAHKAN JUGA 
 *   DI updateGameArea(). (Anda bebas 
 *   memberi nama game piece Anda)
 * > IN GAME CONTROLLER MEMBUTUHKAN 
 *   COMPONENT BUTTON DI DALAM CANVAS
 */

var myGamePiece
var myUpBtn
var myDownBtn
var myLeftBtn
var myRightBtn
var myObstacles = []

function startGame() {
    myGameArea.start()
    myGamePiece = new component(30, 30, "red", 10, 120)

    // BTN COMPONENT
    myUpBtn = new component(30, 30, "blue", 50, 10)
    myDownBtn = new component(30, 30, "blue", 50, 70)
    myLeftBtn = new component(30, 30, "blue", 20, 40)
    myRightBtn = new component(30, 30, "blue", 80, 40)
}

// GAME AREA
var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = 480
        this.canvas.height = 270
        this.canvas.style.backgroundColor = 'skyblue'
        // this.canvas.style.cursor = 'none'
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.frameNo = 0
        this.interval = setInterval(updateGameArea, 20)

        // KEYBOARD CONTROLLER
        window.addEventListener('keydown', function(e) {
            myGameArea.keys = (myGameArea.keys || [])
            myGameArea.keys[e.keyCode] = true
        })
        window.addEventListener('keyup', function(e) {
            myGameArea.keys[e.keyCode] = false
        })

        // MOUSE CONTROLLER
        // window.addEventListener('mousemove', function(e) {
        //     myGameArea.x = e.pageX - (myGamePiece.width * 0.75)
        //     myGameArea.y = e.pageY - (myGamePiece.height * 0.75)
        // })

        // IN GAME CONTROLLER
        window.addEventListener('mousedown', function(e) {
            myGameArea.x = e.pageX
            myGameArea.y = e.pageY
        })
        window.addEventListener('mouseup', function(e) {
            myGameArea.x = false
            myGameArea.y = false
        })
        window.addEventListener('touchstart', function(e) {
            myGameArea.x = e.pageX
            myGameArea.y = e.pageY
        })
        window.addEventListener('touchend', function(e) {
            myGameArea.x = false
            myGameArea.y = false
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    stop: function() {
        clearInterval(this.interval)
    },
}

// MAKE COMPONENT
function component(width, height, color, x, y) {
    this.width = width
    this.height = height
    this.speedX = 0
    this.speedY = 0
    this.x = x
    this.y = y
    this.update = function() {
        ctx = myGameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    this.clicked = function() {
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var clicked = true
        if((mybottom < myGameArea.y) || (mytop > myGameArea.y) || (myright < myGameArea.x) || (myleft > myGameArea.x)){
            clicked = false
        }
        return clicked
    }
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY
    }
    this.crashWith = function(otherobj) {
        var myleft = this.x
        var myright = this.x + (this.width)
        var mytop = this.y
        var mybottom = this.y + (this.height)
        var otherleft = otherobj.x
        var otherright = otherobj.x + (otherobj.width)
        var othertop = otherobj.y
        var otherbottom = otherobj.y + (otherobj.height)
        var crash = true
        if((mybottom < othertop) || (mytop > otherbottom) || (myright < otherleft) || (myleft > otherright)) {
            crash = false
        }
        return crash
    }
}

// FRAMES/UPDATE AREA
function updateGameArea() {
    var x, y

    for(i = 0; i < myObstacles.length; i++) {
        if(myGamePiece.crashWith(myObstacles[i])) {
            myGameArea.stop()
            return
        }
    }

    myGameArea.clear()
    myGameArea.frameNo++

    if(myGameArea.frameNo == 1 || everyinterval(150)) {
        x = myGameArea.canvas.width
        minHeight = 20
        maxHeight = 200
        height = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight)
        minGap = 50
        maxGap = 200
        gap = Math.floor(Math.random() * (maxGap - minGap + 1) + minGap)
        myObstacles.push(new component(10, height, 'green', x, 0))
        myObstacles.push(new component(10, x - height - gap, 'green', x, height + gap))
    }

    myGamePiece.speedX = 0
    myGamePiece.speedY = 0

    for(i = 0; i < myObstacles.length; i++) {
        myObstacles[i].x--
        myObstacles[i].update()
    }

    // KEYBOARD CONTROLLER
    if(myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -1 }
    if(myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 1 }
    if(myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -1 }
    if(myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 1 }

    // MOUSE CONTROLLER
    // if(myGameArea.x && myGameArea.y) {
    //     myGamePiece.x = myGameArea.x
    //     myGamePiece.y = myGameArea.y
    // }

    // IN GAME CONTROLLER
    if(myGameArea.x && myGameArea.y) {
        if(myUpBtn.clicked()) {
            myGamePiece.y -= 1
        }
        if(myDownBtn.clicked()) {
            myGamePiece.y += 1
        }
        if(myLeftBtn.clicked()) {
            myGamePiece.x -= 1
        }
        if(myRightBtn.clicked()) {
            myGamePiece.x += 1
        }
    }

    // BTN COMPONENT
    myUpBtn.update()
    myDownBtn.update()
    myLeftBtn.update()
    myRightBtn.update()

    myGamePiece.newPos()
    myGamePiece.update()
}

function everyinterval(n) {
    if((myGameArea.frameNo / n) % 1 == 0) {
        return true
    }

    return false
}

// MOVEMENT
function moveup() {
    myGamePiece.speedY -= 1
}

function movedown() {
    myGamePiece.speedY += 1
}

function moveleft() {
    myGamePiece.speedX -= 1
}

function moveright() {
    myGamePiece.speedX += 1
}

function stopMove() {
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0
}
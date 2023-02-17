/**
 * NOTE:
 * > KETIKA MENAMBAHKAN 'GAME PIECE' 
 *   PASTIKAN UNTUK MENAMBAHKAN JUGA 
 *   DI updateGameArea(). (Anda bebas memberi nama game piece Anda)
 * > _
 */

var myGamePiece

function startGame() {
    myGameArea.start()
    myGamePiece = new component(30, 30, "red", 10, 120)
}

// GAME AREA
var myGameArea = {
    canvas: document.createElement('canvas'),
    start: function() {
        this.canvas.width = '480'
        this.canvas.height = '270'
        this.canvas.style.backgroundColor = 'skyblue'
        this.canvas.style.cursor = 'none'
        this.context = this.canvas.getContext('2d')
        document.body.insertBefore(this.canvas, document.body.childNodes[0])
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
        window.addEventListener('mousemove', function(e) {
            myGameArea.x = e.pageX - (myGamePiece.width * 0.75)
            myGameArea.y = e.pageY - (myGamePiece.height * 0.75)
        })
    },
    clear: function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
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
    this.newPos = function() {
        this.x += this.speedX
        this.y += this.speedY
    }
}

// FRAMES
function updateGameArea() {
    myGameArea.clear()
    myGamePiece.speedX = 0
    myGamePiece.speedY = 0

    // KEYBOARD CONTROLLER
    if(myGameArea.keys && myGameArea.keys[37]) { myGamePiece.speedX = -1 }
    if(myGameArea.keys && myGameArea.keys[39]) { myGamePiece.speedX = 1 }
    if(myGameArea.keys && myGameArea.keys[38]) { myGamePiece.speedY = -1 }
    if(myGameArea.keys && myGameArea.keys[40]) { myGamePiece.speedY = 1 }

    // MOUSE CONTROLLER
    if(myGameArea.x && myGameArea.y) {
        myGamePiece.x = myGameArea.x
        myGamePiece.y = myGameArea.y
    }

    myGamePiece.newPos()
    myGamePiece.update()
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
//console.log('Hi, Shuyuan')
var canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

window.addEventListener('mousemove',
    function(event){
    mouse.x = event.x;
    mouse.y = event.y;
    console.log(mouse);

});

var colorArray = [
	'#E3B9C4',
	'#BDC1E0',
	'#C4E2F6',
	'#F1F1F1',
	'#E5CFE8'
];

function Circle(x, y, dx, dy, r) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.r = r;
    this.color = colorArray[Math.floor(Math.random() * 5)];
    
    
    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.r, 0, Math.PI * 2, false);
        c.strokeStyle = this.color;
        c.stroke();
        
        c.fillStyle = this.color; 
        c.fill();   
    }

    this.update = function() {
		if (this.x + this.r > innerWidth || this.x - this.r < 0) {
		    this.dx = -this.dx;
		}
		this.x += this.dx;

		if (this.y + this.r > innerHeight || this.y - this.r < 0) {
		    this.dy = -this.dy;
		}
		this.y += this.dy;
        
        if ((Math.abs(mouse.x - this.x) < 50 && Math.abs(mouse.y - this.y) < 50) && this.r < 100) {
        	this.r +=1;
        } else { 
        	if (this.r > 5) {
                 this.r -= 1;
            }
        }
	}
}

var circleArray = [];

for (var i = 0; i < 500; i++) {
    
	var r = 30;
	var x = Math.random() * (innerWidth - 2 * r) + r ;
	var dx = (Math.random() - 0.5) * 8;
	var y = Math.random() * (innerHeight - 2 * r) + r ;
	var dy = (Math.random() - 0.5) * 8;
	circleArray.push(new Circle(x, y, dx, dy, r));

}



function animate() {
	requestAnimationFrame(animate);
	c.clearRect(0, 0, innerWidth, innerHeight);
    
    for (var i = 0; i < circleArray.length; i++) {
    	circleArray[i].update();
        circleArray[i].draw();
    }

}

animate();




let navbar = document.getElementById("nav-bar");

window.addEventListener("scroll", function () {
  if (window.scrollY > 50) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counter = entry.target;

            const target = +counter.dataset.target;
            const duration = +counter.dataset.duration;

            let count = 0;
            const increment = target / (duration / 16);

            function update() {
                if (count < target) {
                    count += increment;

                    if (count > target) count = target;

                    counter.textContent = Math.floor(count);

                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }

            update();
            observer.unobserve(counter);
        }
    });
}, {
    threshold: 0.5
});

counters.forEach(counter => observer.observe(counter));

const canvas = document.getElementById("weatherCanvas");
const ctx = canvas.getContext("2d");

function resize(){
    canvas.width=innerWidth;
    canvas.height=innerHeight;
}

resize();

addEventListener("resize",resize);

let rain=[];

class Drop{

    constructor(layer){

        this.layer=layer;
        this.reset();

    }

    reset(){

        this.x=Math.random()*canvas.width;

        this.y=Math.random()*-canvas.height;

        this.length=10+Math.random()*20*this.layer;

        this.speed=8+Math.random()*8*this.layer;

        this.wind=3.5;

        this.alpha=.15+.25*Math.random();

    }

    update(){

        this.x+=this.wind;

        this.y+=this.speed;

        if(this.y>canvas.height+50){

            this.reset();

            this.y=-20;

        }

    }

    draw(){

        ctx.beginPath();

        ctx.moveTo(this.x,this.y);

        ctx.lineTo(

            this.x-this.wind*2,

            this.y-this.length

        );

        ctx.strokeStyle=`rgba(255,255,255,${this.alpha})`;

        ctx.lineWidth=this.layer;

        ctx.stroke();

        if(this.y>canvas.height-8){

            ctx.beginPath();

            ctx.arc(this.x,canvas.height-2,2*this.layer,0,Math.PI);

            ctx.strokeStyle=`rgba(255,255,255,.25)`;

            ctx.stroke();

        }

    }

}

for(let i=0;i<50;i++) rain.push(new Drop(.8));
for(let i=0;i<35;i++) rain.push(new Drop(1.2));
for(let i=0;i<20;i++) rain.push(new Drop(1.8));

function animate(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    rain.forEach(d=>{

        d.update();

        d.draw();

    });

    requestAnimationFrame(animate);

}

animate();

setInterval(()=>{

    if(Math.random()>.75){

        document.body.classList.add("lightning");

        setTimeout(()=>{

            document.body.classList.remove("lightning");

        },120);

    }

},5000);

const container = document.getElementById("bubble-container");

document.addEventListener("mousemove", (e) => {

    if(Math.random() > 0.6) return;

    const bubble = document.createElement("span");
    bubble.className = "bubble";

    const size = Math.random() * 10 + 4;

    bubble.style.width = size + "px";
    bubble.style.height = size + "px";

    bubble.style.left = e.clientX + "px";
    bubble.style.top = e.clientY + "px";

    bubble.style.setProperty("--x", (Math.random()*40-20)+"px");

    container.appendChild(bubble);

    setTimeout(()=>{
        bubble.remove();
    },1800);

});
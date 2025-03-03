
function isInViewport(xel) {
    const rect = xel.getBoundingClientRect();
    return rect.top <= window.innerHeight && rect.bottom >= 0;
}

function handleScroll() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    fadeElements.forEach(el => {
        if (isInViewport(el)) {
            el.classList.add('visible');
        }
    });
}

window.addEventListener('scroll', handleScroll);
document.addEventListener('DOMContentLoaded', handleScroll);

document.addEventListener("DOMContentLoaded", function () {
    const canvas = document.getElementById("missionCanvas");
    const ctx = canvas.getContext("2d");

    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    let particles = [];
    const numParticles = 80;
    const maxDistance = 180;

    function createParticles() {
        for (let i = 0; i < numParticles; i++) {
            let gray = Math.floor(Math.random() * 200) + 55;

            particles.push({
                x: Math.random() * canvas.width ,
                y: Math.random() * canvas.height ,
                radius: Math.random() * 3 + 1,
                color: `rgb(${gray}, ${gray}, ${gray})`,
                velocityX: (Math.random() - 0.5) * 1.2,
                velocityY: (Math.random() - 0.5) * 1.2
            });
        }
    }

    function drawParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let p of particles) {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();
        }
    }

    function updateParticles() {
        for (let p of particles) {
            p.x += p.velocityX;
            p.y += p.velocityY;
            if (p.x <= 0 || p.x >= canvas.width) p.velocityX *= -1;
            if (p.y <= 0 || p.y >= canvas.height) p.velocityY *= -1;
        }
    }


    function drawParticleConnections() {
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                let dx = particles[i].x - particles[j].x;
                let dy = particles[i].y - particles[j].y;
                let distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < maxDistance) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(150, 150, 150, ${1 - distance / maxDistance})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawParticles();
        drawParticleConnections();
        updateParticles();
        requestAnimationFrame(animate);
    }

    createParticles();
    animate();

    window.addEventListener("resize", () => {
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        particles = [];
        createParticles();
    });
});




const canvas = document.getElementById('matrix');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const fontSize = 16;
const columns = canvas.width / fontSize;
const drops = [];
const userDrops = [];

for (let x = 0; x < columns; x++) {
    drops[x] = 1;
}

const matrix = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%';

function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = '#0F0';
    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
        const text = matrix[Math.floor(Math.random() * matrix.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
        }

        drops[i]++;
    }


    userDrops.forEach(drop => {
        ctx.font = `${drop.size}px monospace`;
        ctx.fillStyle = `rgba(255, 0, 0, ${drop.alpha})`;
        ctx.fillText(drop.text, drop.x, drop.y);
        drop.y += drop.speed;
        drop.alpha -= 0.01;
        if (drop.y > canvas.height || drop.alpha <= 0) {
            userDrops.splice(userDrops.indexOf(drop), 1);
        }
    });
}

setInterval(draw, 33);

document.addEventListener('keydown', function(event) {
    const text = event.key;
    if (text.length === 1) { 
        const size = Math.random() * 50 + 20; 
        const x = Math.random() * canvas.width;
        const y = 0;
        const speed = Math.random() * 3 + 1; 
        const alpha = 1; 
        userDrops.push({
            text: text,
            x: x,
            y: y,
            size: size,
            speed: speed,
            alpha: alpha
        });
    }
});

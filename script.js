/* ===== ТАЙМЕР ===== */
const weddingDate = new Date("2026-03-07T15:00:00");

function updateTimer() {
  const now = new Date();
  let diff = weddingDate - now;
  if (diff < 0) diff = 0;

  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  document.getElementById("weeks").innerText = weeks;
  document.getElementById("days").innerText = days % 7;
  document.getElementById("hours").innerText = hours % 24;
  document.getElementById("minutes").innerText = minutes % 60;
  document.getElementById("seconds").innerText = seconds % 60;
}

setInterval(updateTimer, 1000);
updateTimer();

/* ===== САЛЮТ (КРУПНЫЙ И РАЗНОЦВЕТНЫЙ) ===== */
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let particles = [];

const colors = [
  "#ff4d6d", // розовый
  "#ffd166", // золотой
  "#06d6a0", // мятный
  "#4cc9f0", // голубой
  "#c77dff", // фиолетовый
  "#ff9f1c", // оранжевый
  "#ffffff"  // белый
];

function createFirework() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height * 0.5;
  const color = colors[Math.floor(Math.random() * colors.length)];

  for (let i = 0; i < 160; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 6 + 2;

    particles.push({
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      alpha: 1,
      size: Math.random() * 3 + 2,
      color
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vy += 0.05; // гравитация
    p.alpha -= 0.008;

    ctx.fillStyle = hexToRgba(p.color, p.alpha);
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
    ctx.fill();
  });

  particles = particles.filter(p => p.alpha > 0);
  requestAnimationFrame(animate);
}

function hexToRgba(hex, a) {
  const r = parseInt(hex.substr(1,2),16);
  const g = parseInt(hex.substr(3,2),16);
  const b = parseInt(hex.substr(5,2),16);
  return `rgba(${r},${g},${b},${a})`;
}

setInterval(createFirework, 900);
animate();

/* ===== ФОРМА ===== */
function sendForm() {
  const name = document.getElementById("guestName").value;
  const att = document.querySelector('input[name="att"]:checked');

  if (!name || !att) {
    alert("Заполните имя и выберите вариант");
    return;
  }

  alert("Спасибо, " + name + "! Ваш ответ: " + att.value);
}

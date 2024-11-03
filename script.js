
const canvas = document.getElementById('constellationCanvas');
const ctx = canvas.getContext('2d');
let stars = [];
let constellation = [];
let constellations = [];

// Generate random twinkling stars on load
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    size: Math.random() * 2,
    twinkle: Math.random() > 0.5,
  });
}

// Event listener for adding stars on click
canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  constellation.push({ x, y });
  draw();
});

// Draw function to render stars, constellations, and animations
function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw static twinkling stars
  stars.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fillStyle = star.twinkle ? "rgba(255, 255, 255, 0.8)" : "rgba(255, 255, 255, 0.5)";
    ctx.fill();
    star.twinkle = !star.twinkle; // Simple twinkling effect
  });

  // Draw shooting stars
  if (Math.random() < 0.005) { // Low probability to create shooting star
    let shootingStarX = Math.random() * canvas.width;
    let shootingStarY = Math.random() * canvas.height;
    for (let i = 0; i < 20; i++) {
      ctx.beginPath();
      ctx.arc(shootingStarX - i, shootingStarY - i, 2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${1 - i / 20})`;
      ctx.fill();
    }
  }

  // Draw constellation lines
  ctx.strokeStyle = 'rgba(173, 216, 230, 0.8)';
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  constellation.forEach((star, index) => {
    if (index > 0) {
      ctx.moveTo(constellation[index - 1].x, constellation[index - 1].y);
      ctx.lineTo(star.x, star.y);
    }
  });
  ctx.stroke();

  // Draw constellation stars
  constellation.forEach((star) => {
    ctx.beginPath();
    ctx.arc(star.x, star.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = 'white';
    ctx.fill();
  });

  requestAnimationFrame(draw); // Animation loop
}

// Save constellation with a name
function saveConstellation() {
  const name = prompt("Enter a name for this constellation:");
  if (name) {
    constellations.push({ name, stars: [...constellation] });
    addToDropdown(name);
    alert(`Constellation "${name}" saved!`);
    constellation = []; // Reset for new constellation
  }
}

// Add saved constellation to dropdown
function addToDropdown(name) {
  const dropdown = document.getElementById('savedConstellations');
  const option = document.createElement('option');
  option.text = name;
  option.value = name;
  dropdown.add(option);
}

// View selected saved constellation
function viewSavedConstellation() {
  const selectedName = document.getElementById('savedConstellations').value;
  const selectedConstellation = constellations.find(c => c.name === selectedName);
  if (selectedConstellation) {
    constellation = [...selectedConstellation.stars];
    draw();
  }
}

// Clear current constellation
function clearConstellation() {
  constellation = [];
  draw();
}

// Start initial drawing
draw();

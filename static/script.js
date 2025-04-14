// Particle Effect for Landing Page with Medical Emojis
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) { // Only run if on landing page
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const particleCount = 40;
        const medicalEmojis = ['💊', '🩺', '🏥', '💉', '🩹', '🩼', '🧬']; // Medical-related emojis

        class Particle {
            constructor() {
                this.x = Math.random() * canvas.width;
                this.y = Math.random() * canvas.height;
                this.size = Math.random() * 20 + 10; // Adjust size for visibility
                this.speedX = Math.random() * 1 - 0.5;
                this.speedY = Math.random() * 1 - 0.5;
                this.emoji = medicalEmojis[Math.floor(Math.random() * medicalEmojis.length)]; // Random medical emoji
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (this.x > canvas.width) this.x = 0;
                else if (this.x < 0) this.x = canvas.width;
                if (this.y > canvas.height) this.y = 0;
                else if (this.y < 0) this.y = canvas.height;
            }

            draw() {
                ctx.font = `${this.size}px Arial`; // Set font size for emoji
                ctx.fillText(this.emoji, this.x, this.y); // Draw emoji at position
            }
        }

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            particles.forEach(particle => {
                particle.update();
                particle.draw();
            });
            requestAnimationFrame(animate);
        }

        animate();

        window.addEventListener('resize', () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        });
    }
});

// Module-Specific Functions
function getMedicineInfo() {
    const medicineName = document.getElementById('medicine-name').value;
    const outputDiv = document.getElementById('medicine-output');
    const progressBar = document.getElementById('progress-bar');

    if (!medicineName) {
        outputDiv.innerHTML = '<p style="color: orange;">Please enter a medicine name!</p>';
        return;
    }

    progressBar.classList.add('active');
    outputDiv.innerHTML = '';

    fetch('/get_medicine_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `medicine_name=${encodeURIComponent(medicineName)}`
    })
    .then(response => response.json())
    .then(data => {
        progressBar.classList.remove('active');
        if (data.error) {
            outputDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            outputDiv.innerText = data.response;
        }
    })
    .catch(error => {
        progressBar.classList.remove('active');
        outputDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
    });
}

function searchImage() {
    const fileInput = document.getElementById('medicine-image');
    const outputDiv = document.getElementById('image-output');
    const progressBar = document.getElementById('progress-bar');
    const previewDiv = document.getElementById('image-preview');

    if (!fileInput.files[0]) {
        outputDiv.innerHTML = '<p style="color: orange;">Please upload an image!</p>';
        return;
    }

    const formData = new FormData();
    formData.append('image', fileInput.files[0]);

    previewDiv.innerHTML = `<img src="${URL.createObjectURL(fileInput.files[0])}" alt="Uploaded Image">`;
    progressBar.classList.add('active');
    outputDiv.innerHTML = '';

    fetch('/upload_image', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        progressBar.classList.remove('active');
        if (data.error) {
            outputDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            outputDiv.innerText = data.response;
        }
    })
    .catch(error => {
        progressBar.classList.remove('active');
        outputDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
    });
}

function fetchHospitals() {
    const location = document.getElementById('location').value;
    const outputDiv = document.getElementById('hospital-output');
    const progressBar = document.getElementById('progress-bar');

    if (!location) {
        outputDiv.innerHTML = '<p style="color: orange;">Please enter a location!</p>';
        return;
    }

    progressBar.classList.add('active');
    outputDiv.innerHTML = 'Loading...';

    fetch('/get_hospitals', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `location=${encodeURIComponent(location)}`
    })
    .then(response => response.json())
    .then(data => {
        progressBar.classList.remove('active');
        if (data.error) {
            outputDiv.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            outputDiv.innerText = data.response;
        }
    })
    .catch(error => {
        progressBar.classList.remove('active');
        outputDiv.innerHTML = `<p style="color: red;">Error: ${error}</p>`;
    });
}

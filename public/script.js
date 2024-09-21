document.getElementById('playBtn').addEventListener('click', function() {
    document.getElementById('intro').classList.add('hidden');
    
    setTimeout(function() {
        document.getElementById('content').classList.remove('hidden');
        document.getElementById('content').classList.add('visible');
    }, 1000);
});


let currentImageIndex = 0;
const images = document.querySelectorAll('.carousel-image');


function showImage(index) {
    images.forEach((img, i) => {
        img.classList.toggle('active', i === index);
    });
}


showImage(currentImageIndex);

function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % images.length;
    showImage(currentImageIndex);
}

setInterval(nextImage, 3000); 


document.getElementById('loginBtn').addEventListener('click', function() {
    alert('Login');
});

document.getElementById('registerBtn').addEventListener('click', function() {
    alert('Register');
});


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('https://miportafolio-wh47.onrender.com/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.text();
    })
    .then(result => {
        alert(result);
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Hubo un problema al enviar el mensaje. Intenta de nuevo más tarde.');
    });
});


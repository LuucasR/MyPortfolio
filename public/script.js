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


//document.getElementById('loginBtn').addEventListener('click', function() {
   // alert('Login');
//});//

//document.getElementById('registerBtn').addEventListener('click', function() {
  //  alert('Register');//
//});//


document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    fetch('https://myportfolio-ipo0.onrender.com/send', {
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



// Obtener elementos del DOM
var modal = document.getElementById('miModal');
var btn = document.getElementById('registrarseBtn');
var span = document.getElementsByClassName('close')[0];

// Cuando el usuario hace clic en el botón, se abre la ventana modal
btn.onclick = function() {
    modal.style.display = 'block';
}

// Cuando el usuario hace clic en la 'x', se cierra la ventana modal
span.onclick = function() {
    modal.style.display = 'none';
}

// Cuando el usuario hace clic fuera de la ventana modal, se cierra
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

// Enviar el formulario usando JavaScript
document.getElementById('registroForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que la página se recargue

    // Obtener los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const pass = document.getElementById('pass').value;

    // Enviar la solicitud POST a tu API
    try {
        const response = await fetch('https://myportfolio-ipo0.onrender.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, pass })
        });

        const data = await response.json();

        // Mostrar el resultado en el HTML
        const resultado = document.getElementById('resultado');
        if (data.message === 'User registered successfully!') {
            resultado.innerText = 'Registration successful. Redirecting to download...';
            
            // Redirigir al enlace de descarga después de 2.5 segundos
            setTimeout(() => {
                window.location.href = 'https://drive.google.com/file/d/1bJSSTSuwWlbYcG73Odmb3ZprJShmuYTf/view';  // Cambia este enlace por el de tu demo
            }, 2500);  // 2 segundos de espera antes de redirigir
        } else {
            resultado.innerText = data.message || 'Registro fallido';
        }
    } catch (error) {
        document.getElementById('resultado').innerText = 'Error al registrar el usuario';
    }
});



//////////////////////////MeGusta///////////////////////////////



// Evento para manejar el clic en el botón de "Me gusta"
document.getElementById('likeBtn').addEventListener('click', async function() {
    try {
        const response = await fetch('https://myportfolio-ipo0.onrender.com/like', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        const data = await response.json();
        if (data.message === 'Like added successfully') {
            alert('¡Thanks for your Like!');
        }

        // Actualizar el contador de "Me gusta" en el frontend
        const responseLikes = await fetch('https://myportfolio-ipo0.onrender.com/');
        const likeData = await responseLikes.json();
        document.getElementById('likeCount').innerText = 'Total like: ' + likeData.total_likes;

    } catch (error) {
        console.error('Error al agregar Me gusta:', error);
    }
});

// Cargar el número de "Me gusta" al iniciar la página
async function loadLikes() {
    const response = await fetch('https://myportfolio-ipo0.onrender.com/');
    const data = await response.json();
    document.getElementById('likeCount').innerText = 'Likes: ' + data.total_likes;
}

loadLikes();

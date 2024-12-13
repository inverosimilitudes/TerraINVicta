// ------------------------------------------------------------
// VARIABLES Y ELEMENTOS DEL DOM
// ------------------------------------------------------------

// Botones de selección de dificultad
const difficultyButtons = document.querySelectorAll('.difficulty-button');
let selectedDifficulty = 'facil'; 

// Controles de sonido
let soundOn = true; 
const soundButton = document.getElementById('sound-button');
const soundText = document.getElementById('sound-text');
const soundIcon = document.getElementById('sound-icon');

// Botón de información
const infoButton = document.getElementById('info-button');

// Botón de jugar
const playButton = document.getElementById('play-button');

// ------------------------------------------------------------
// EVENTOS
// ------------------------------------------------------------

// Seleccionar dificultad
difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remueve selección previa
        difficultyButtons.forEach(btn => btn.classList.remove('selected'));
        // Añade selección a la dificultad actual
        button.classList.add('selected');
        // Actualiza la dificultad seleccionada
        selectedDifficulty = button.getAttribute('data-difficulty');
    });
});

// Actualizar botón de sonido al cargar
updateSoundButton();

// Evento: Alternar sonido
soundButton.addEventListener('click', () => {
    soundOn = !soundOn;
    isMuted = !soundOn; 
    updateSoundButton();
});

// Evento: Mostrar información
infoButton.addEventListener('click', () => {
    showInfoModal();
});

// Evento: Comenzar el juego al hacer clic en "Jugar"
playButton.addEventListener('click', startGame);

// Evento: Comenzar el juego al tocar en pantallas táctiles
// Nota: No usar e.preventDefault() aquí para compatibilidad con iOS
playButton.addEventListener('touchend', () => {
    startGame();
});

// ------------------------------------------------------------
// FUNCIONES
// ------------------------------------------------------------

/**
 * Actualiza el botón de sonido dependiendo del estado actual (soundOn).
 */
function updateSoundButton() {
    soundText.textContent = soundOn ? 'Mute Off' : 'Mute On';
    soundIcon.src = soundOn ? '/TerraINVicta/assets/mute_off.png' : '/TerraINVicta/assets/mute_on.png';
}

/**
 * Muestra el modal con la información del juego.
 */
function showInfoModal() {
    // Crear elemento modal
    const modal = document.createElement('div');
    modal.id = 'info-modal';

    // Contenido del modal (HTML)
    modal.innerHTML = `
        <div id="info-content">
            <h2>Información del Juego</h2>
            <p>En este juego eres una nave espacial encargada de defender a la Tierra de distintos enemigos que irán cayendo a ella como asteroides, lunas, gigantes gaseosos, estrellas, galaxias y agujeros negros.</p>
            <p>La forma de destruirlos es teclear lo más rápido que puedas la palabra asociada.</p>
            <h3>Atajos!</h3>
            <ul>
                <li><strong>Espacio:</strong> Sirve para soltar un enemigo cuando lo necesites. Esto no evitará que caiga a la Tierra.</li>
                <li><strong>Enter:</strong> Sirve para poner pausa cuando lo necesites. Pero cuidado, esto no te dará ventajas.</li>
            </ul>
            <h3>Cuidado!</h3>
            <p>Este juego está diseñado para ser desafiante, por eso debes tener en cuenta:</p>
            <ul>
                <li>Cuando pones pausa se te penalizará. El juego se hará más rápido por un instante.</li>
                <li>Al poner pausa no podrás ver las palabras en pantalla, para evitar a los tramposos.</li>
                <li>Cada dificultad tiene una cantidad distinta de vidas, siendo 5 para el nivel fácil, 4 para el nivel medio y 3 para el nivel difícil.</li>
            </ul>
            <h3>Niveles!</h3>
            <p><strong>Fácil:</strong> Para aquellos que están aprendiendo a escribir rápido pero buscan un desafío.</p>
            <p><strong>Medio:</strong> Para aquellos que tienen práctica pero quieren seguir mejorando.</p>
            <p><strong>Difícil:</strong> Para aquellos expertos que buscan un desafío a su nivel.</p>
            <h3>Feedback!!</h3>
            <p>Cualquier comentario será bien recibido en el Instagram del creador. ¡No dudes en escribir! Tu feedback es esencial para el desarrollo del juego.</p>
            <p>Instagram: <a href="https://www.instagram.com/_.inverosimil._/" target="_blank">@_.inverosimil._</a></p>
            <button id="close-info-button">Cerrar</button>
        </div>
    `;

    // Añadir el modal al documento
    document.body.appendChild(modal);

    // Botón para cerrar el modal
    const closeButton = document.getElementById('close-info-button');
    closeButton.addEventListener('click', () => {
        // Remover el modal al cerrar
        document.body.removeChild(modal);
    });
}

/**
 * Inicia el juego:
 *  - Oculta la pantalla de inicio.
 *  - Muestra el contenedor del juego.
 *  - Enfoca el input oculto.
 *  - Llama a la función initGame().
 */
function startGame() {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const hiddenInput = document.getElementById('hidden-input');

    // Mostrar el contenedor del juego
    gameContainer.classList.remove('hidden');
    gameContainer.style.display = 'flex';

    // Ocultar la pantalla de inicio
    startScreen.style.display = 'none';

    // Enfocar el input y arrancar el juego
    hiddenInput.focus();
    initGame(selectedDifficulty, isMuted);
}




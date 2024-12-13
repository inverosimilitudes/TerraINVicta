
const difficultyButtons = document.querySelectorAll('.difficulty-button');
let selectedDifficulty = 'facil'; 

let soundOn = true; 
const soundButton = document.getElementById('sound-button');
const soundText = document.getElementById('sound-text');
const soundIcon = document.getElementById('sound-icon');

const infoButton = document.getElementById('info-button');

const playButton = document.getElementById('play-button');


difficultyButtons.forEach(button => {
    button.addEventListener('click', () => {
        difficultyButtons.forEach(btn => btn.classList.remove('selected'));
        button.classList.add('selected');
        selectedDifficulty = button.getAttribute('data-difficulty');
    });
});

updateSoundButton();

soundButton.addEventListener('click', () => {
    soundOn = !soundOn;
    isMuted = !soundOn; 
    updateSoundButton();
});

infoButton.addEventListener('click', () => {
    showInfoModal();
});

playButton.addEventListener('click', startGame);
playButton.addEventListener('touchend', () => {
    startGame();
});

function updateSoundButton() {
    soundText.textContent = soundOn ? 'Mute Off' : 'Mute On';
    soundIcon.src = soundOn ? '/TerraINVicta/assets/mute_off.png' : '/TerraINVicta/assets/mute_on.png';
}

function showInfoModal() {
    const modal = document.createElement('div');
    modal.id = 'info-modal';

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

    document.body.appendChild(modal);

    const closeButton = document.getElementById('close-info-button');
    closeButton.addEventListener('click', () => {
        document.body.removeChild(modal);
    });
}

function startGame() {
    const startScreen = document.getElementById('start-screen');
    const gameContainer = document.getElementById('game-container');
    const hiddenInput = document.getElementById('hidden-input');

    gameContainer.classList.remove('hidden');
    gameContainer.style.display = 'flex';

    startScreen.style.display = 'none';

    hiddenInput.focus();
    initGame(selectedDifficulty, isMuted);
}




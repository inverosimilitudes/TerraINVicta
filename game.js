const w1 = 1.1; //  tiempo
const w2 = 1.3; // puntaje
let difficultySettings = {
    facil: {
        enemySpawnRateRange: { min: 1100, max: 2500 }, 
        enemySpeedRange: { 
            asteroids: { min: 1, max: 1.5 },
            moons: { min: 0.9, max: 1.5 },
            gas_giants: { min: 0.8, max: 1.4 },
            stars: { min: 0.7, max: 1.3 },
            galaxys: { min: 0.6, max: 1.1 },
            black_holes: { min: 0.5, max: 0.9 }
        }, 
        enemySpawnProbability: {
            asteroids: 65,
            moons: 13,
            gas_giants: 10,
            stars: 5,
            galaxys: 4,
            black_holes: 3
        },
        maxEnemiesOnScreen: 5,
        difficultyMultipliers: {
            enemySpawnRate: { min: 0.01, max: 0.02 }, 
            enemySpeed: {
                asteroids: { min: 0.2, max: 0.2 },
                moons: { min: 0.2, max: 0.2 },
                gas_giants: { min: 0.2, max: 0.2 },
                stars: { min: 0.2, max: 0.2 },
                galaxys: { min: 0.2, max: 0.2 },
                black_holes: { min: 0.2, max: 0.2 }
            },
            enemySpawnProbability: {
                asteroids: 0,
                moons: 1,
                gas_giants: 1.5,
                stars: 1.7,
                galaxys: 1.8,
                black_holes: 1.7
            },
            maxEnemiesOnScreen: 0.02
        }
    },
    medio: {
        enemySpawnRateRange: { min: 1000, max: 1900 }, 
        enemySpeedRange: { 
            asteroids: { min: 1.5, max: 2.5 },
            moons: { min: 1.2, max: 2.5 },
            gas_giants: { min: 1.1, max: 2.4 },
            stars: { min: 1, max: 2.3 },
            galaxys: { min: 0.9, max: 2.1 },
            black_holes: { min: 0.9, max: 1.9 }
        },
        enemySpawnProbability: {
            asteroids: 55,
            moons: 18,
            gas_giants: 15,
            stars: 5,
            galaxys: 4,
            black_holes: 3
        },
        maxEnemiesOnScreen: 6,
        difficultyMultipliers: {
            enemySpawnRate: { min: 0.05, max: 0.1 }, 
            enemySpeed: {
                asteroids: { min: 0.3, max: 0.3 },
                moons: { min: 0.3, max: 0.3 },
                gas_giants: { min: 0.3, max: 0.3 },
                stars: { min: 0.3, max: 0.3 },
                galaxys: { min: 0.3, max: 0.3 },
                black_holes: { min: 0.3, max: 0.3 }
            },
            enemySpawnProbability: {
                asteroids: -0.1,
                moons: -0.7,
                gas_giants: 2.5,
                stars: 2.2,
                galaxys: 2,
                black_holes: 1.6
            },
            maxEnemiesOnScreen: 0.03
        }
    },
    dificil: {
        enemySpawnRateRange: { min: 800, max: 1400 }, 
        enemySpeedRange: {
            asteroids: { min: 1.5, max: 3 },
            moons: { min: 1.5, max: 3 },
            gas_giants: { min: 1.4 , max: 2.6 },
            stars: { min: 1.3, max: 2.4 },
            galaxys: { min: 1.1, max: 2.2 },
            black_holes: { min: 1, max: 2 }
        },
        enemySpawnProbability: {
            asteroids: 30,
            moons: 25,
            gas_giants: 15,
            stars: 15,
            galaxys: 10,
            black_holes: 5
        },
        maxEnemiesOnScreen:7 ,
        difficultyMultipliers: {
            enemySpawnRate: { min: 0.1, max: 0.2 }, 
            enemySpeed: {
                asteroids: { min: 0.05, max: 0.1 },
                moons: { min: 0.05, max: 0.1 },
                gas_giants: { min: 0.04, max: 0.08 },
                stars: { min: 0.03, max: 0.06 },
                galaxys: { min: 0.02, max: 0.04 },
                black_holes: { min: 0.01, max: 0.02 }
            },
            enemySpawnProbability: {
                asteroids: -0.5,
                moons: -0.3,
                gas_giants: 0.2,
                stars: 0.3,
                galaxys: 0.4,
                black_holes: 0.5
            },
            maxEnemiesOnScreen: 0.1
        }
    }
};
const enemySpawnRateLimits = {
    min: { min: 500, max: 1000 }, 
    max: { min: 4000, max: 5000 } 
};
const enemySpawnProbabilityLimits = {
    asteroids: { min: 1, max: 70 },
    moons: { min: 1, max: 70 },
    gas_giants: { min: 1, max: 65 },
    stars: { min: 1, max: 55 },
    galaxys: { min: 1, max: 50 },
    black_holes: { min: 1, max: 50 }
};
const maxEnemiesOnScreenLimit = 9;
const enemySpeedRangeLimits = {
    asteroids: { min: { max: 8 }, max: { max: 12 } },
    moons: { min: { max: 8 }, max: { max: 11 } },
    gas_giants: { min: { max: 8 }, max: { max: 9 } },
    stars: { min: { max: 7 }, max: { max: 8 } },
    galaxys: { min: { max: 7 }, max: { max: 7 } },
    black_holes: { min: { max: 6 }, max: { max: 6 } }
};
let enemySpawnTimeout;
let initialEnemySpawnRateRange = {};
let initialEnemySpeedRange = {};
let initialEnemySpawnProbability = {};
let initialMaxEnemiesOnScreen = 0;
let difficultyAdjustmentInterval;
let currentEnemySpawnRateRange = { min: 0, max: 0 };
let currentEnemySpeedRange = {};
let currentEnemySpawnProbability = {};
let currentMaxEnemiesOnScreen = 0;
let difficultyFactor = 0;
let animationFrameId;
function calculateProgressFactor() {
    const timeInSeconds = time / 1000; 
    const PF = w1 * timeInSeconds + w2 * score;
    return PF;
}
function adjustDifficultyParameters() {
    const PF = calculateProgressFactor();
    const settings = difficultySettings[selectedDifficulty];
    const multipliers = settings.difficultyMultipliers;
    currentEnemySpawnRateRange.min = initialEnemySpawnRateRange.min * (PF * multipliers.enemySpawnRate.min);
    currentEnemySpawnRateRange.max = initialEnemySpawnRateRange.max * (PF * multipliers.enemySpawnRate.max);
    currentEnemySpawnRateRange.min = Math.max(currentEnemySpawnRateRange.min, 0);
    currentEnemySpawnRateRange.max = Math.max(currentEnemySpawnRateRange.max, 0);
    currentEnemySpawnRateRange.min = Math.max(currentEnemySpawnRateRange.min, enemySpawnRateLimits.min.min);
    currentEnemySpawnRateRange.min = Math.min(currentEnemySpawnRateRange.min, enemySpawnRateLimits.min.max);
    currentEnemySpawnRateRange.max = Math.max(currentEnemySpawnRateRange.max, enemySpawnRateLimits.max.min);
    currentEnemySpawnRateRange.max = Math.min(currentEnemySpawnRateRange.max, enemySpawnRateLimits.max.max);
    for (let type in currentEnemySpeedRange) {
        const M_min = multipliers.enemySpeed[type].min;
        const M_max = multipliers.enemySpeed[type].max;
        const V_i_min = initialEnemySpeedRange[type].min;
        const V_i_max = initialEnemySpeedRange[type].max;
        currentEnemySpeedRange[type].min = V_i_min * (PF * M_min);
        currentEnemySpeedRange[type].max = V_i_max * (PF * M_max);
        currentEnemySpeedRange[type].min = Math.max(currentEnemySpeedRange[type].min, 0.1);
        currentEnemySpeedRange[type].max = Math.max(currentEnemySpeedRange[type].max, 0.1);
        currentEnemySpeedRange[type].min = Math.min(currentEnemySpeedRange[type].min, enemySpeedRangeLimits[type].min.max);
        currentEnemySpeedRange[type].max = Math.min(currentEnemySpeedRange[type].max, enemySpeedRangeLimits[type].max.max);
        if (currentEnemySpeedRange[type].max < currentEnemySpeedRange[type].min) {
            currentEnemySpeedRange[type].max = currentEnemySpeedRange[type].min;
        }
    }
    for (let type in currentEnemySpawnProbability) {
        const M = multipliers.enemySpawnProbability[type];
        const V_i = initialEnemySpawnProbability[type];
        currentEnemySpawnProbability[type] = V_i * (PF * M);
        currentEnemySpawnProbability[type] = Math.max(currentEnemySpawnProbability[type], 0);
        currentEnemySpawnProbability[type] = Math.max(currentEnemySpawnProbability[type], enemySpawnProbabilityLimits[type].min);
        currentEnemySpawnProbability[type] = Math.min(currentEnemySpawnProbability[type], enemySpawnProbabilityLimits[type].max);
    }
    normalizeEnemySpawnProbabilities();
    currentMaxEnemiesOnScreen = initialMaxEnemiesOnScreen * (PF * multipliers.maxEnemiesOnScreen);
    currentMaxEnemiesOnScreen = Math.max(Math.round(currentMaxEnemiesOnScreen), 1); 
    currentMaxEnemiesOnScreen = Math.min(currentMaxEnemiesOnScreen, maxEnemiesOnScreenLimit);
}
function isMobileDevice() {
    return /Mobi|Android|iPhone|iPad|iPod|Opera Mini|IEMobile|WPDesktop/i.test(navigator.userAgent);
}
const isMobile = isMobileDevice();
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');
ctx.imageSmoothingEnabled = false;
ctx.webkitImageSmoothingEnabled = false;
ctx.msImageSmoothingEnabled = false;
ctx.textRendering = 'geometricPrecision';
const resetButton = document.getElementById('reset-button');
const pauseButton = document.getElementById('pause-button');
const muteButton = document.getElementById('mute-button');
const muteIcon = document.getElementById('mute-icon');
const playerScale = 1.5;
const enemyScale = 1.3;
resetButton.tabIndex = -1;
pauseButton.tabIndex = -1;
muteButton.tabIndex = -1;
let isMuted = false;
let specialKeyPressed = null;
let gameInterval;
let enemySpawnInterval;
let isPaused = false;
let isGameOver = false;
let isGameStarted = false;
let score = 0;
let bestScore = 0;
let lives = 3;
let time = 0;
let startTime;
let enemies = [];
let explosions = [];
let lasers = [];
let currentEnemy = null;
let playerAngle = 0; 
let wasPausedByVisibility = false;
let earthDamageEffect = false;
let gameSpeedMultiplier = 1;
const playerMarginBottom = 20; 
const playerImg = new Image();
const laserImg = new Image();
const explosionImg = new Image();
const laserSound = new Audio('assets/sounds/laser.mp3');
laserSound.preload = 'auto';
const explosionSound = new Audio('assets/sounds/explotion.mp3');
explosionSound.preload = 'auto';
const explosion2Sound = new Audio('assets/sounds/explotion2.mp3');
explosion2Sound.preload = 'auto';
const heartsContainer = document.getElementById('hearts-container');
let hearts = []; 
const heartOnImg = new Image();
const heartOffImg = new Image();
heartOnImg.src = 'assets/heart_on.png';
heartOffImg.src = 'assets/heart_off.png';
const muteOnImg = new Image();
const muteOffImg = new Image();
muteOnImg.src = 'assets/mute_on.png';
muteOffImg.src = 'assets/mute_off.png';
const spriteSheets = {
    asteroids: [],
    moons: [],
    gas_giants: [],
    stars: [],
    galaxys: [],
    black_holes: []
};
const scoreDisplay = document.getElementById('score');
const bestScoreDisplay = document.getElementById('best-score');
const timeDisplay = document.getElementById('time');
const backToMenuButton = document.getElementById('back-to-menu-button');
backToMenuButton.addEventListener('click', () => {
    const gameContainer = document.getElementById('game-container');
    const startScreen = document.getElementById('start-screen');
    gameContainer.classList.add('slide-up-out');
    setTimeout(() => {
        gameContainer.style.display = 'none';
        gameContainer.classList.remove('slide-up-out');
        startScreen.style.display = 'flex'; 
        startScreen.classList.remove('slide-up-in');
        void startScreen.offsetWidth; 
        startScreen.classList.add('slide-up-in');
        resetGame();
        setTimeout(() => {
            startScreen.classList.remove('slide-up-in');
        }, 1000); 
    }, 1000); 
});
function resetGame() {
    clearInterval(difficultyAdjustmentInterval);
    clearTimeout(enemySpawnTimeout);
    cancelAnimationFrame(animationFrameId);
    isGameStarted = false;
    isPaused = false;
    isGameOver = false;
    lives = 3;
    score = 0;
    time = 0;
    enemies = [];
    lasers = [];
    explosions = [];
    currentEnemy = null;
    playerAngle = 0;
    scoreDisplay.textContent = score;
    timeDisplay.textContent = '00:00';
    hearts.forEach(heart => {
        heart.src = heartOnImg.src;
    });
    updateMuteButton();
}
function loadImage(src, callback) {
    const img = new Image();
    img.src = src;
    img.onload = () => {
        if (callback) callback(img);
    };
    img.onerror = () => {
        console.error(`Error al cargar la imagen: ${src}`);
    };
}
function loadSpriteSheets() {
    const types = ['asteroids', 'moons', 'gas_giants', 'stars', 'galaxys', 'black_holes'];
    const typeToBaseName = {
        asteroids: 'asteroid',
        moons: 'moon',
        gas_giants: 'giant',
        stars: 'star',
        galaxys: 'galaxy',
        black_holes: 'hole'
    };
    const imageCounts = {
        asteroids: 3,
        moons: 2, 
        gas_giants: 2,
        stars: 3,
        galaxys: 3,
        black_holes: 1
    };
    let imagesToLoad = 0;
    let imagesLoaded = 0;
    types.forEach(type => {
        const baseName = typeToBaseName[type];
        const imageCount = imageCounts[type];
        for (let i = 1; i <= imageCount; i++) {
            const imagePath = `assets/enemies/${type}/${baseName}_${i}.png`;
            imagesToLoad++;
            loadImage(imagePath, (img) => {
                if (!spriteSheets[type]) {
                    spriteSheets[type] = [];
                }
                spriteSheets[type].push(img);
                imagesLoaded++;
                if (imagesLoaded === imagesToLoad) {
                    render(); 
                }
            });
        }
    });
    imagesToLoad += 3;
    loadImage('assets/player.png', (img) => {
        playerImg.src = img.src;
        imagesLoaded++;
        if (imagesLoaded === imagesToLoad) {
            render(); 
        }
    });
    loadImage('assets/laser.png', (img) => {
        laserImg.src = img.src;
        imagesLoaded++;
    });
    loadImage('assets/explotion_sheet2.png', (img) => {
        explosionImg.src = img.src;
        imagesLoaded++;
    });
}
function initGame(difficulty = 'facil', muted = false) {
    selectedDifficulty = difficulty;
    isMuted = muted;
    updateMuteButton();
    isPaused = false;
    isGameOver = false;
    isGameStarted = true;
    pauseButton.textContent = 'Pause'; 
    resetButton.textContent = 'Reset';
    score = 0;
    time = 0;
    startTime = Date.now();
    enemies = [];
    explosions = [];
    lasers = [];
    currentEnemy = null;
    playerAngle = 0;
    gameSpeedMultiplier = 1; 
    switch (difficulty) {
        case 'facil':
            lives = 5;
            break;
        case 'medio':
            lives = 4;
            break;
        case 'dificil':
            lives = 3;
            break;
        default:
            lives = 3;
    }
    const settings = difficultySettings[difficulty];
    currentEnemySpawnRateRange = { ...settings.enemySpawnRateRange };
    currentEnemySpeedRange = JSON.parse(JSON.stringify(settings.enemySpeedRange));
    currentEnemySpawnProbability = { ...settings.enemySpawnProbability };
    currentMaxEnemiesOnScreen = settings.maxEnemiesOnScreen;
    initialEnemySpawnRateRange = { ...currentEnemySpawnRateRange };
    initialEnemySpeedRange = JSON.parse(JSON.stringify(currentEnemySpeedRange));
    initialEnemySpawnProbability = { ...currentEnemySpawnProbability };
    initialMaxEnemiesOnScreen = currentMaxEnemiesOnScreen;
    adjustDifficultyParameters();
    difficultyAdjustmentInterval = setInterval(adjustDifficultyParameters, 1000);
    scoreDisplay.textContent = score;
    bestScoreDisplay.textContent = bestScore;
    timeDisplay.textContent = formatTime(time);
    heartsContainer.innerHTML = ''; 
    hearts = [];
    for (let i = 0; i < lives; i++) {
        const heartImg = document.createElement('img');
        heartImg.src = heartOnImg.src; 
        heartImg.classList.add('heart');
        heartsContainer.appendChild(heartImg);
        hearts.push(heartImg);
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    clearInterval(gameInterval);
    clearTimeout(enemySpawnTimeout);
    gameInterval = setInterval(gameLoop, 1000 / 60); 
    scheduleNextEnemySpawn();
    requestAnimationFrame(updateTime);
    const hiddenInput = document.getElementById('hidden-input');
    hiddenInput.focus();
    
    // Opcionalmente, para asegurarte de que siempre esté enfocado
    setInterval(() => {
        if (document.activeElement !== hiddenInput) {
            hiddenInput.focus();
        }
    }, 1000);
    
}

// Al inicio del archivo o en un lugar adecuado
const hiddenInput = document.getElementById('hidden-input');

hiddenInput.addEventListener('input', (e) => {
    const value = e.target.value;
    if (value.length > 0) {
        const key = value.charAt(value.length - 1).toLowerCase();
        handleVirtualKeyPress(key);
        // Limpiar el campo de entrada para evitar acumulaciones
        e.target.value = '';
    }
});

function updateMuteButton() {
    muteIcon.src = isMuted ? muteOnImg.src : muteOffImg.src;
    laserSound.muted = isMuted;
    explosionSound.muted = isMuted;
    explosion2Sound.muted = isMuted;
}
function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds % 60).padStart(2, '0');
    return `${minutes}:${seconds}`;
}
function updateTime() {
    if (!isPaused && !isGameOver && isGameStarted) {
        time = Date.now() - startTime;
        timeDisplay.textContent = formatTime(time);
        animationFrameId = requestAnimationFrame(updateTime);
    }
}
function gameLoop() {
    if (!isGameOver && isGameStarted) {
        if (!isPaused) {
            calculateProgressFactor(); 
            adjustDifficultyParameters(); 
            update();
        }
        render();
    } else if (!isGameStarted) {
        render();
    }
}
function adjustDifficultyParameters() {
    const settings = difficultySettings[selectedDifficulty];
    const multipliers = settings.difficultyMultipliers;
    for (let type in currentEnemySpeedRange) {
        const speedMultipliers = multipliers.enemySpeed[type];
        currentEnemySpeedRange[type].min = settings.enemySpeedRange[type].min + (difficultyFactor * speedMultipliers.min);
        currentEnemySpeedRange[type].max = settings.enemySpeedRange[type].max + (difficultyFactor * speedMultipliers.max);
    }
    const spawnRateMultipliers = multipliers.enemySpawnRate;
    currentEnemySpawnRateRange.min = settings.enemySpawnRateRange.min - (difficultyFactor * spawnRateMultipliers.min);
    currentEnemySpawnRateRange.max = settings.enemySpawnRateRange.max - (difficultyFactor * spawnRateMultipliers.max);
    const minSpawnRate = 500;
    currentEnemySpawnRateRange.min = Math.max(currentEnemySpawnRateRange.min, minSpawnRate);
    currentEnemySpawnRateRange.max = Math.max(currentEnemySpawnRateRange.max, minSpawnRate);
    currentMaxEnemiesOnScreen = settings.maxEnemiesOnScreen + Math.floor(difficultyFactor * multipliers.maxEnemiesOnScreen);
    for (let type in currentEnemySpawnProbability) {
        const probMultiplier = multipliers.enemySpawnProbability[type];
        currentEnemySpawnProbability[type] = settings.enemySpawnProbability[type] + (difficultyFactor * probMultiplier);
    }
    normalizeEnemySpawnProbabilities();
}
function normalizeEnemySpawnProbabilities() {
    for (let type in currentEnemySpawnProbability) {
        currentEnemySpawnProbability[type] = Math.max(currentEnemySpawnProbability[type], 0);
    }
    const totalProbability = Object.values(currentEnemySpawnProbability).reduce((sum, value) => sum + value, 0) || 1; 
    for (let type in currentEnemySpawnProbability) {
        currentEnemySpawnProbability[type] = (currentEnemySpawnProbability[type] / totalProbability) * 100;
        currentEnemySpawnProbability[type] = Math.min(Math.max(currentEnemySpawnProbability[type], 0), 100);
    }
}
function update() {
    enemies.forEach(enemy => {
        if (!enemy.isDestroyed) {
            enemy.y += enemy.speed * gameSpeedMultiplier;
            enemy.frameTimer += enemy.frameSpeed * gameSpeedMultiplier;
            if (enemy.frameTimer >= enemy.frameInterval) {
                enemy.frameTimer = 0;
                enemy.frameX++;
                if (enemy.frameX >= enemy.maxFrame) {
                    enemy.frameX = 0;
                }
            }
            if (enemy.y > canvas.height - enemy.height) {
                if (!isMuted) {
                    explosion2Sound.currentTime = 0;
                    explosion2Sound.play();
                }
                triggerEarthDamageEffect();
                enemies = enemies.filter(e => e !== enemy);
                if (currentEnemy === enemy) {
                    currentEnemy = null; 
                }
                loseLife();
            }
        }
    });
    explosions.forEach(explosion => {
        explosion.frameTimer += explosion.frameSpeed * gameSpeedMultiplier;
        if (explosion.frameTimer >= explosion.frameInterval) {
            explosion.frameTimer = 0;
            explosion.frameX++; 
            if (explosion.frameX >= explosion.maxFrame) {
                explosions = explosions.filter(ex => ex !== explosion);
            }
        }
    });
    lasers.forEach(laser => {
        // Mover laser hacia el enemigo
        const dx = laser.targetX - laser.x;
        const dy = laser.targetY - laser.y;
        const distance = Math.hypot(dx, dy);
        const speed = 20 * gameSpeedMultiplier;
        if (distance > speed) {
            laser.x += (dx / distance) * speed;
            laser.y += (dy / distance) * speed;
        } else {
            if (laser.isFinal) {
                createExplosion(laser.enemy.x, laser.enemy.y, laser.enemy.width, laser.enemy.height, laser.enemy.type); 
                enemies = enemies.filter(e => e !== laser.enemy); 
            }
            lasers = lasers.filter(l => l !== laser);
        }
    });
    if (lasers.length === 0) {
        playerAngle = 0;
    }
    if (gameSpeedMultiplier > 1) {
        const reductionRate = 1 / (0.5 * 60); 
        gameSpeedMultiplier -= reductionRate;
        if (gameSpeedMultiplier < 1) {
            gameSpeedMultiplier = 1;
        }
    }
}
function render() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.imageSmoothingEnabled = false;
    ctx.textRendering = 'geometricPrecision';
    ctx.save();
    const playerX = canvas.width / 2;
    const playerY = canvas.height - (playerImg.height * playerScale) / 2 - playerMarginBottom;
    ctx.translate(playerX, playerY);
    ctx.rotate(playerAngle);
    ctx.drawImage(
        playerImg,
        - (playerImg.width * playerScale) / 2,
        - (playerImg.height * playerScale) / 2,
        playerImg.width * playerScale,
        playerImg.height * playerScale
    );
    ctx.restore();
    if (!isGameStarted) {
        return; 
    }
    enemies.forEach(enemy => {
        if (!enemy.sprite) return;
        const frameWidth = enemy.sprite.width / enemy.maxFrame;
        const frameHeight = enemy.sprite.height;
        const sx = enemy.frameX * frameWidth;
        const sy = 0;
        ctx.drawImage(
            enemy.sprite,
            sx,
            sy,
            frameWidth,
            frameHeight,
            Math.floor(enemy.x),
            Math.floor(enemy.y),
            Math.floor(enemy.width),
            Math.floor(enemy.height)
        );
        let fontSize;
        if (isMobile) {
            fontSize = 50; 
        } else {
            fontSize = 25; 
        }
        ctx.font = `bold ${fontSize}px Arial`;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        const completedPart = enemy.word.slice(0, enemy.currentCharIndex);
        const remainingPart = enemy.word.slice(enemy.currentCharIndex);
        let textX;
        let textY;
        switch (enemy.type) {
            case 'asteroids':
                textY = Math.floor(enemy.y - 9);
                break;
            case 'moons':
                textY = Math.floor(enemy.y - 18);
                break;
            case 'gas_giants':
                textY = Math.floor(enemy.y + 5);
                break;
            case 'stars':
                textY = Math.floor(enemy.y + 10); 
                break;
            case 'galaxys':
                textY = Math.floor(enemy.y + 10);
                break;
            case 'black_holes':
                textY = Math.floor(enemy.y + 33);
                break;
            default:
                textY = Math.floor(enemy.y);
        }
        if (enemy.isBlurred) {
            enemy.blurFrameCounter++;
            if (enemy.blurFrameCounter >= enemy.blurFrameInterval) {
                enemy.blurFrameCounter = 0;
                const randomChars = ['%', '$', '#', '!', '?'];
                let blurredWord = '';
                for (let i = 0; i < enemy.word.length; i++) {
                    blurredWord += randomChars[Math.floor(Math.random() * randomChars.length)];
                }
                enemy.currentBlurredWord = blurredWord;
            }
            const blurredWordWidth = ctx.measureText(enemy.currentBlurredWord).width;
            textX = Math.floor(enemy.x + (enemy.width - blurredWordWidth) / 2);
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.strokeText(enemy.currentBlurredWord, textX, textY);
            ctx.fillStyle = '#fff';
            ctx.fillText(enemy.currentBlurredWord, textX, textY);
        } else {
            const wordWidth = ctx.measureText(enemy.word).width;
            textX = Math.floor(enemy.x + (enemy.width - wordWidth) / 2);
            const completedWidth = ctx.measureText(completedPart).width;
            ctx.lineWidth = 3;
            ctx.strokeStyle = 'black';
            ctx.strokeText(completedPart, textX, textY);
            ctx.fillStyle = 'red';
            ctx.fillText(completedPart, textX, textY);
            ctx.strokeText(remainingPart, textX + completedWidth, textY);
            ctx.fillStyle = '#fff';
            ctx.fillText(remainingPart, textX + completedWidth, textY);
        }
    });
    ctx.imageSmoothingEnabled = false;
    explosions.forEach(explosion => {
        const frameWidth = explosion.sprite.width / explosion.maxFrame;
        const frameHeight = explosion.sprite.height;
        const sx = explosion.frameX * frameWidth;
        const sy = 0;
        ctx.drawImage(
            explosion.sprite,
            sx,
            sy,
            frameWidth,
            frameHeight,
            Math.floor(explosion.x),
            Math.floor(explosion.y),
            Math.floor(explosion.width),
            Math.floor(explosion.height)
        );
    });
    lasers.forEach(laser => {
        ctx.drawImage(laserImg, Math.floor(laser.x), Math.floor(laser.y), laser.width, laser.height);
    });
    if (earthDamageEffect) {
        ctx.save();
        const earthHeight = 50;
        ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - earthHeight);
        ctx.quadraticCurveTo(canvas.width / 2, canvas.height - earthHeight - 20, canvas.width, canvas.height - earthHeight);
        ctx.lineTo(canvas.width, canvas.height);
        ctx.lineTo(0, canvas.height);
        ctx.closePath();
        ctx.fill();
        const gradientHeight = 50; 
        const gradient = ctx.createLinearGradient(
            0,
            canvas.height - earthHeight - gradientHeight,
            0,
            canvas.height - earthHeight
        );
        gradient.addColorStop(0, 'rgba(255, 0, 0, 0)'); 
        gradient.addColorStop(1, 'rgba(255, 0, 0, 0.5)'); 
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.moveTo(0, canvas.height - earthHeight - gradientHeight);
        ctx.quadraticCurveTo(
            canvas.width / 2,
            canvas.height - earthHeight - 20 - gradientHeight,
            canvas.width,
            canvas.height - earthHeight - gradientHeight
        );
        ctx.lineTo(canvas.width, canvas.height - earthHeight);
        ctx.quadraticCurveTo(canvas.width / 2, canvas.height - earthHeight - 20, 0, canvas.height - earthHeight);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
window.addEventListener('resize', adjustCanvasSize);

function adjustCanvasSize() {
    // Ajusta el tamaño del canvas o los elementos del juego según el tamaño de la ventana
    const gameContainer = document.getElementById('game-container');
    const newHeight = window.innerHeight;
    gameContainer.style.height = `${newHeight}px`;
    // Puedes ajustar el canvas y otros elementos aquí
}

function selectEnemyType() {
    const rand = Math.random() * 100;
    let cumulativeProbability = 0;
    for (let type in currentEnemySpawnProbability) {
        cumulativeProbability += currentEnemySpawnProbability[type];
        if (rand < cumulativeProbability) {
            return type;
        }
    }
    const types = Object.keys(currentEnemySpawnProbability);
    return types[types.length - 1];
}
function getRandomInRange(min, max) {
    return parseFloat((Math.random() * (max - min) + min).toFixed(1));
}
function spawnEnemy() {
    scheduleNextEnemySpawn();
    const enemyType = selectEnemyType();
    const word = getWordByEnemyType(enemyType);
    if (enemies.some(e => e.word.charAt(0).toLowerCase() === word.charAt(0).toLowerCase())) {
        return;
    }
    const sprite = getRandomSprite(enemyType);
    let enemyWidth = 50 * enemyScale;
    let enemyHeight = 50 * enemyScale;
    switch (enemyType) {
        case 'gas_giants':
            enemyWidth = 90 * enemyScale;
            enemyHeight = 90 * enemyScale;
            break;
        case 'stars':
            enemyWidth = 100 * enemyScale;
            enemyHeight = 100 * enemyScale;
            break;
        case 'galaxys':
            enemyWidth = 120 * enemyScale;
            enemyHeight = 120 * enemyScale;
            break;
        case 'black_holes':
            enemyWidth = 140 * enemyScale;
            enemyHeight = 140 * enemyScale;
            break;
    }
    ctx.font = `bold 20px Arial`;
    const wordWidth = ctx.measureText(word).width;
    const maxElementWidth = Math.max(enemyWidth, wordWidth);
    let enemyX = Math.random() * (canvas.width - maxElementWidth);
    enemyX = Math.max(0, Math.min(enemyX, canvas.width - maxElementWidth));
    const speedRange = currentEnemySpeedRange[enemyType];
    const enemySpeed = getRandomInRange(speedRange.min, speedRange.max);
    const enemy = {
        type: enemyType,
        word: word,
        x: enemyX,
        y: -enemyHeight,
        speed: enemySpeed,
        sprite: sprite,
        width: enemyWidth,
        height: enemyHeight,
        currentCharIndex: 0,
        frameX: 0,
        maxFrame: 60, 
        frameTimer: 0,
        frameInterval: 5, 
        frameSpeed: 1,
        isDestroyed: false,
        isBlurred: isPaused, 
        blurFrameCounter: 0,
        blurFrameInterval: 15, 
        currentBlurredWord: ''
    };
    enemies.push(enemy);
}
function scheduleNextEnemySpawn() {
    if (enemies.length >= currentMaxEnemiesOnScreen) {
        enemySpawnTimeout = setTimeout(scheduleNextEnemySpawn, 500);
    } else {
        const spawnDelay = getRandomInRange(currentEnemySpawnRateRange.min, currentEnemySpawnRateRange.max);
        enemySpawnTimeout = setTimeout(spawnEnemy, spawnDelay);
    }
}
function getWordByEnemyType(type) {
    const wordLists = {
        asteroids: ['a', 'á', 'b', 'c', 'd', 'e', 'é', 'f', 'g', 'h', 'i', 'í',
        'j', 'k', 'l', 'm', 'n', 'ñ', 'o', 'ó', 'p', 'q', 'r',
        's', 't', 'u', 'ú', 'v', 'w', 'x', 'y', 'z'],
        moons: ['sol', 'luz', 'amor', 'hola', 'paz', 'casa', 'gato', 'mesa',
        'vino', 'mano', 'foco', 'rayo', 'miel', 'coro', 'rio', 'lima',
        'saco', 'rana', 'beso', 'kilo', 'mono', 'oso', 'liso', 'azul',
        'vela', 'oro', 'ojo', 'olas', 'solo', 'pato', 'dato', 'lobo',
        'ganso', 'lata', 'fino', 'silo', 'pila', 'plata', 'sitio',
        'hasta', 'metro', 'nino', 'tino', 'bolo', 'sora', 'pila',
        'cupo', 'sopa', 'fuga', 'bajo', 'cima', 'toro', 'seda'],
        gas_giants: ['mío', 'día', 'tío', 'pío', 'fío', 'sí', 'río', 'lápiz', 'aquí',
        'sofá', 'país', 'niño', 'tía', 'tú', 'máximo', 'fácil', 'búho',
        'búfalo', 'grúa', 'débil', 'número', 'sé', 'está', 'más',
        'café', 'aéreo', 'ángel', 'rúbrica', 'género', 'círculo',
        'cráter', 'música', 'teléfono', 'zócalo', 'único', 'rústico',
        'fútbol', 'cántico', 'frágil', 'álgebra', 'último', 'cítrico',
        'técnico', 'eléctrico', 'físico', 'aéreo', 'húmedo', 'lógico',
        'súbito', 'ínterin', 'álbum', 'súper', 'rápido'],
        stars: ['café', 'sofá', 'papá', 'mamá', 'bebé', 'túnel', 'rápido', 'fácil',
        'céfiro', 'súbito', 'álgido', 'fósil', 'sólido', 'público', 'lúgubre',
        'ráfaga', 'móvil', 'trámite', 'período', 'tímido', 'túnica', 'héroe',
        'sofá', 'jardín', 'bioma', 'líder', 'plaza', 'súper', 'sátiro',
        'hábito', 'música', 'álgebra', 'dócil', 'cráter', 'ánfora', 'cúspide',
        'frágil', 'cármona', 'cálido', 'álamo', 'tímido', 'término', 'túnica',
        'cúpula', 'súbito', 'álgido', 'hábito', 'tíbet', 'bioma', 'fósil',
        'álgido'],
        galaxys: ['constél', 'univers', 'meteorí', 'astrón', 'galaxía', 'cáscara',
        'camión', 'música', 'cálido', 'bíceps', 'rústico', 'rúbrica',
        'próximo', 'fósforo', 'óptico', 'teléfono', 'biología', 'órbita',
        'árboles', 'álgidos', 'súper', 'ángeles', 'túneles', 'cómputo',
        'círculo', 'fútbol', 'móvil', 'álgebra', 'estático', 'rótulo',
        'sórdido', 'únicos', 'técnico', 'álgidos', 'sátiro', 'álgido',
        'cálidos', 'álamos', 'álgidos', 'súper', 'tránsito', 'dócil',
        'cítrico', 'álgido', 'trámite', 'físico', 'cálido', 'álgido',
        // Palabras de 7 letras con y sin tildes
        'constela', 'galaxias', 'universo', 'meteorito', 'astronom',
        'galaxy', 'universo', 'meteor', 'álgidos', 'súper',
        'constelación', 'galaxías', 'galaxy', 'interior', 'metálico',
        'astrónomo', 'cómputo', 'biología', 'súper', 'astrólogo',
        'teléfono', 'música', 'álgebra', 'súper', 'álgidos',
        'biología', 'rúbrica', 'súper', 'próximo', 'cráteres',
        'música', 'cálidos', 'círculos', 'ángeles', 'sórdidos',
        'biología', 'álgidos', 'cómputo', 'súper', 'metálico',
        'súper', 'cómputo', 'tránsito', 'álgidos', 'biología'],
        black_holes: ['singularidad', 'espaguetización', 'horizonte', 'gravedad',
        'atracción', 'colapso', 'intersticio', 'gravitacional',
        'cosmología', 'relatividad', 'hiperespacio', 'destello',
        'intermedio', 'cosmopolita', 'metamorfosis', 'relativista',
        'inercia', 'aparición', 'astronomía', 'gravitacional',
        'astronómico', 'invisibilidad', 'supernova', 'tecnología',
        'hiperespacio', 'interacción', 'astrónomo', 'colisión',
        'metafísica', 'gravitones', 'universidad', 'singular',
        'gravitacional', 'cosmológico', 'inestabilidad', 'astronómicamente',
        'intergaláctico', 'cosmológico', 'singularidades', 'relativistas',
        'hiperespacial', 'metamorfosis', 'gravitacionalmente',
        'interconexión', 'astronómicamente', 'gravitacionalidad',
        'interdimensional', 'cosmopolita', 'singularización',
        'relativización', 'interplanetario', 'hiperespacialidad',
        'gravitacionalmente', 'cosmopolíticamente']
    };
    const words = wordLists[type];
    return words[Math.floor(Math.random() * words.length)];
}
function getRandomSprite(type) {
    const sprites = spriteSheets[type];
    if (sprites && sprites.length > 0) {
        return sprites[Math.floor(Math.random() * sprites.length)];
    } else {
        return null;
    }
}
document.addEventListener('keydown', handleKeydown);
function handleKeydown(e) {
    e.preventDefault(); // Prevenir el comportamiento predeterminado si es necesario
    const key = e.key.toLowerCase();
    handleVirtualKeyPress(key);
}
function handleVirtualKeyPress(key) {
    if (!key || typeof key !== 'string') return;

    if (isGameOver) {
        if (key === 'enter') {
            const retryButton = document.getElementById('retry-button');
            if (retryButton) {
                retryButton.click();
            }
        }
        return;
    }
    if (key === 'enter') {
        pauseButton.click();
        return;
    }
    if (isPaused) {
        return;
    }
    if (!isGameStarted) {
        if (key === 'enter') {
            initGame();
        }
        return;
    }
    if (key === ' ') {
        if (currentEnemy && currentEnemy.currentCharIndex > 0) {
            const pointsToSubtract = currentEnemy.currentCharIndex;
            score = Math.max(0, score - pointsToSubtract);
            scoreDisplay.textContent = score;
            currentEnemy.currentCharIndex = 0;
            currentEnemy = null;
        }
        return;
    }
    if (key.length !== 1) return;
    if (!currentEnemy) {
        currentEnemy = enemies.find(enemy => !enemy.isDestroyed && enemy.word.charAt(0).toLowerCase() === key);
        if (!currentEnemy) return; 
    }
    const expectedChar = currentEnemy.word.charAt(currentEnemy.currentCharIndex).toLowerCase();
    if (key === expectedChar) {
        currentEnemy.currentCharIndex++;
        score++;
        scoreDisplay.textContent = score;
        animateScore(); 
        const isFinalLaser = currentEnemy.currentCharIndex === currentEnemy.word.length;
        createLaser(currentEnemy, isFinalLaser);
        if (isFinalLaser) {
            currentEnemy.isDestroyed = true;
            currentEnemy.speed = 0;
            currentEnemy = null; 
        }
    } else {
        // Puedes agregar lógica para manejar errores de tipeo si lo deseas
    }
}

function animateScore() {
    scoreDisplay.classList.add('score-animation');
    setTimeout(() => {
        scoreDisplay.classList.remove('score-animation');
    }, 200); 
}
function createLaser(enemy, isFinalLaser) {
    const playerX = canvas.width / 2;
    const playerY = canvas.height - playerImg.height / 2 - playerMarginBottom;
    const dx = (enemy.x + enemy.width / 2) - playerX;
    const dy = (enemy.y + enemy.height / 2) - playerY;
    playerAngle = Math.atan2(dy, dx) + Math.PI / 2;
    const laser = {
        x: playerX - 2, 
        y: playerY,
        width: 4, 
        height: 20, 
        targetX: enemy.x + enemy.width / 2 - 2,
        targetY: enemy.y + enemy.height / 2,
        enemy: enemy, 
        isFinal: isFinalLaser 
    };
    lasers.push(laser);
    if (!isMuted) {
        laserSound.currentTime = 0;
        laserSound.play();
    }
}
function createExplosion(x, y, enemyWidth, enemyHeight, enemyType) {
    const frameWidth = explosionImg.width / 11;
    const frameHeight = explosionImg.height;
    const explosionScales = {
        asteroids: 1.2,
        moons: 1.4,
        gas_giants: 1.6,
        stars: 1.8,
        galaxys: 2.0,
        black_holes: 2.2
    };
    const explosionScale = explosionScales[enemyType] || 1.2;
    const explosionWidth = frameWidth * explosionScale;
    const explosionHeight = frameHeight * explosionScale;
    const explosion = {
        sprite: explosionImg,
        x: x + enemyWidth / 2 - explosionWidth / 2,
        y: y + enemyHeight / 2 - explosionHeight / 2,
        width: explosionWidth,
        height: explosionHeight,
        frameX: 0,
        maxFrame: 11,
        frameTimer: 0,
        frameInterval: 5,
        frameSpeed: 1
    };
    explosions.push(explosion);
    if (!isMuted) {
        explosionSound.currentTime = 0;
        explosionSound.play();
    }
}
function triggerEarthDamageEffect() {
    earthDamageEffect = true;
    setTimeout(() => {
        earthDamageEffect = false;
    }, 200); 
}
function loseLife() {
    lives--;
    if (lives >= 0 && lives < hearts.length) {
        const heart = hearts[lives];
        heart.src = heartOffImg.src; 
        heart.classList.add('heart-animation');
        setTimeout(() => {
            heart.classList.remove('heart-animation');
        }, 200); 
    }
    if (lives <= 0) {
        endGame();
    }
}
function endGame() {
    isGameOver = true;
    clearInterval(difficultyAdjustmentInterval);
    clearTimeout(enemySpawnTimeout);
    if (score > bestScore) {
        bestScore = score;
        bestScoreDisplay.textContent = bestScore;
    }
    showGameOverScreen();
}
function showGameOverScreen() {
    const gameOverScreen = document.createElement('div');
    gameOverScreen.id = 'game-over-screen';
    gameOverScreen.innerHTML = `
        <h1>¡Juego Terminado!</h1>
        <p>Puntaje: ${score}</p>
        <p>Tiempo: ${formatTime(time)}</p>
        <button id="retry-button">Volver a Jugar</button>
    `;
    document.body.appendChild(gameOverScreen);
    const retryButton = document.getElementById('retry-button');
    retryButton.tabIndex = -1;
    retryButton.addEventListener('click', () => {
        document.body.removeChild(gameOverScreen);
        document.removeEventListener('keydown', handleRetryKey);
        isPaused = false; 
        isGameOver = false; 
        isGameStarted = false; 
        pauseButton.textContent = 'Pause'; 
        resetButton.textContent = 'Iniciar partida'; 
        render(); 
    });
    document.addEventListener('keydown', (e) => {
        // Prevenir el comportamiento predeterminado si es necesario
        e.preventDefault();
        
        const key = e.key.toLowerCase();
        handleVirtualKeyPress(key);
    });
}
function handleRetryKey(e) {
    if (e.code === 'Enter') {
        const retryButton = document.getElementById('retry-button');
        if (retryButton) {
            retryButton.click();
        }
        e.preventDefault();
    }
}
pauseButton.addEventListener('click', () => {
    if (!isGameStarted || isGameOver) return;
    if (isPaused) {
        resumeGame();
    } else {
        pauseGame();
    }
});
function pauseGame() {
    if (!isPaused) {
        isPaused = true;
        pauseButton.textContent = 'Resume';
        enemies.forEach(enemy => {
            enemy.isBlurred = true;
        });
        clearTimeout(enemySpawnTimeout);

        // Quitar el foco del campo de entrada
        hiddenInput.blur();
    }
}

function resumeGame() {
    if (isPaused) {
        isPaused = false;
        pauseButton.textContent = 'Pause';
        enemies.forEach(enemy => {
            enemy.isBlurred = false;
            enemy.blurFrameCounter = 0; 
            enemy.currentBlurredWord = '';
        });
        scheduleNextEnemySpawn();
        startTime = Date.now() - time;
        requestAnimationFrame(updateTime);
        gameSpeedMultiplier = 2;

        // Reenfocar el campo de entrada
        hiddenInput.focus();
    }
}

muteButton.addEventListener('click', () => {
    isMuted = !isMuted;
    updateMuteButton();
    hiddenInput.focus();

});
document.addEventListener('visibilitychange', handleVisibilityChange);
function handleVisibilityChange() {
    if (document.hidden) {
        if (!isPaused && isGameStarted && !isGameOver) {
            pauseGame();
            wasPausedByVisibility = true;
        }
    } else {
        if (wasPausedByVisibility) {
            wasPausedByVisibility = false;
        }
    }
}resetButton.addEventListener('click', () => {
    const difficultyButton = document.querySelector('.difficulty-button.selected');
    selectedDifficulty = difficultyButton ? difficultyButton.getAttribute('data-difficulty') : 'facil';
    if (!isGameStarted) {
        initGame(selectedDifficulty, isMuted);
    } else {
        clearInterval(gameInterval);
        clearTimeout(enemySpawnTimeout);
        isPaused = false; 
        isGameOver = false; 
        pauseButton.textContent = 'Pause'; 
        initGame(selectedDifficulty, isMuted);
    }
    hiddenInput.focus();

});
loadSpriteSheets();
window.initGame = initGame;

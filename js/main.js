import { CHARACTERS } from './character-data.js';
import { AI_MOVE_SETS, getMoveDescription } from './combat-moves.js';
import { getMovesForPrompt, getDefaultAIMoves } from './ai-integration.js';

let canvas, ctx;

let gameState = {
    selectedCharacter: null,
    gameActive: false,
    aiGenerating: false,
    currentAIPrompt: "",
    lastAIAction: 0,
    player: {
        x: 150,
        y: 350,
        width: 40,
        height: 60,
        health: 100,
        maxHealth: 100,
        character: null,
        isAttacking: false,
        isBlocking: false,
        specialCooldown: 0,
        lastMove: "idle",
        attackAnimation: 0
    },
    boss: {
        x: 750,
        y: 350,
        width: 40,
        height: 60,
        health: 100,
        maxHealth: 100,
        aiPersonality: "adaptive",
        isAttacking: false,
        specialCooldown: 0,
        behaviorPattern: "adaptive",
        aiGeneratedMoves: [],
        currentMoveIndex: 0,
        lastAction: 0,
        attackAnimation: 0
    },
    keys: {},
    round: 1,
    maxRounds: 3,
    gameStartTime: 0
};

document.addEventListener('DOMContentLoaded', () => {
    canvas = document.getElementById('gameCanvas');
    ctx = canvas.getContext('2d');

    const characterCards = document.querySelectorAll('.character-card');
    const startButton = document.getElementById('startGameButton');

    characterCards.forEach(card => {
        card.addEventListener('click', () => {
            characterCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const characterKey = card.getAttribute('data-character');
            gameState.selectedCharacter = characterKey;

            startButton.disabled = false;
            startButton.textContent = `START BATTLE AS ${card.querySelector('.character-name').textContent.toUpperCase()}`;
        });
    });

    startButton.addEventListener('click', startGame);

    document.getElementById('applyAIBtn').addEventListener('click', applyAIPrompt);
    document.getElementById('aiCombatBtn').addEventListener('click', generateAICombat);
    document.getElementById('restartBtn').addEventListener('click', restartGame);
    document.getElementById('restartGameBtn').addEventListener('click', restartGame);
});

function startGame() {
    if (!gameState.selectedCharacter) return;

    document.getElementById('characterSelection').style.display = 'none';
    document.getElementById('gameScreen').style.display = 'block';
    document.getElementById('gameOverScreen').style.display = 'none';

    initializeGame();
    setupInputListeners();
    gameLoop();
}

function initializeGame() {
    const playerChar = CHARACTERS[gameState.selectedCharacter];
    const enemyChar = gameState.selectedCharacter === 'hero' ? CHARACTERS.villain : CHARACTERS.hero;

    gameState.player = {
        ...gameState.player,
        x: 150,
        y: 350,
        health: 100,
        maxHealth: 100,
        isAttacking: false,
        isBlocking: false,
        attackAnimation: 0,
        character: playerChar,
        lastMove: 'idle',
    };

    gameState.boss = {
        ...gameState.boss,
        x: 750,
        y: 350,
        health: 100,
        maxHealth: 100,
        isAttacking: false,
        attackAnimation: 0,
        behaviorPattern: 'adaptive',
        character: enemyChar,
        currentMoveIndex: 0,
    };

    updateCharacterUI();
    updateHealthBars();

    // Setup initial AI moves
    const initialAI = getDefaultAIMoves();
    gameState.boss.aiGeneratedMoves = initialAI.moves;
    gameState.boss.behaviorPattern = initialAI.behavior;

    gameState.gameActive = true;

    setTimeout(() => {
        showDialogue('player', generateDialogue(playerChar.dialogueStyle, 'intro'));
        setTimeout(() => {
            showDialogue('boss', generateDialogue(enemyChar.dialogueStyle, 'intro'));
        }, 1500);
    }, 1000);
}

function updateCharacterUI() {
    document.getElementById('playerName').textContent = gameState.player.character.name;
    document.getElementById('playerRole').textContent = gameState.player.character.role;
    document.getElementById('playerAvatar').textContent = gameState.player.character.name;
    document.getElementById('playerAvatar').style.borderColor = gameState.player.character.color;

    document.getElementById('bossName').textContent = gameState.boss.character.name;
    document.getElementById('bossRole').textContent = gameState.boss.character.role;
    document.getElementById('bossAvatar').textContent = gameState.boss.character.name;
    document.getElementById('bossAvatar').style.borderColor = gameState.boss.character.color;
}

function updateHealthBars() {
    const playerPercent = (gameState.player.health / gameState.player.maxHealth) * 100;
    const bossPercent = (gameState.boss.health / gameState.boss.maxHealth) * 100;
    document.getElementById('playerHealth').style.width = playerPercent + '%';
    document.getElementById('bossHealth').style.width = bossPercent + '%';
}

function setupInputListeners() {
    document.removeEventListener('keydown', handleKeyDown);
    document.removeEventListener('keyup', handleKeyUp);
    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('keyup', handleKeyUp);
}

function handleKeyDown(e) {
    if (!gameState.gameActive) return;
    gameState.keys[e.code] = true;
    switch (e.code) {
        case 'Space':
            e.preventDefault();
            playerAttack();
            break;
        case 'ShiftLeft':
        case 'ShiftRight':
            e.preventDefault();
            playerBlock();
            break;
        case 'KeyQ':
            e.preventDefault();
            generateAICombat();
            break;
    }
}

function handleKeyUp(e) {
    gameState.keys[e.code] = false;
    if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') {
        gameState.player.isBlocking = false;
    }
}

function playerAttack() {
    if (gameState.player.isAttacking || gameState.player.attackAnimation > 0) return;

    gameState.player.isAttacking = true;
    gameState.player.attackAnimation = 30;
    const distance = Math.abs(gameState.player.x - gameState.boss.x);
    if (distance < GAME_CONFIG.attackRange) {
        let damage = gameState.player.character.power + Math.floor(Math.random() * 10);
        if (gameState.boss.isBlocking) {
            damage = Math.floor(damage * 0.3);
            showDialogue('boss', generateDialogue(gameState.boss.character.dialogueStyle, 'block'));
        } else {
            gameState.boss.health -= damage;
            gameState.boss.health = Math.max(0, gameState.boss.health);
            showDialogue('boss', generateDialogue(gameState.boss.character.dialogueStyle, 'hit'));
        }
        updateHealthBars();
        showDialogue('player', generateDialogue(gameState.player.character.dialogueStyle, 'attack'));
        if (gameState.boss.health <= 0) endGame('victory');
    }
}

function playerBlock() {
    gameState.player.isBlocking = true;
}

function bossAttack() {
    if (gameState.boss.isAttacking || gameState.boss.attackAnimation > 0) return;
    gameState.boss.isAttacking = true;
    gameState.boss.attackAnimation = 30;
    gameState.boss.lastAction = Date.now();
    const distance = Math.abs(gameState.player.x - gameState.boss.x);
    if (distance < GAME_CONFIG.attackRange) {
        let damage = gameState.boss.character.power + Math.floor(Math.random() * 8);
        if (gameState.player.isBlocking) {
            damage = Math.floor(damage * 0.4);
            showDialogue('player', generateDialogue(gameState.player.character.dialogueStyle, 'block'));
        } else {
            gameState.player.health -= damage;
            gameState.player.health = Math.max(0, gameState.player.health);
            showDialogue('player', generateDialogue(gameState.player.character.dialogueStyle, 'hit'));
        }
        updateHealthBars();
        showDialogue('boss', generateDialogue(gameState.boss.character.dialogueStyle, 'attack'));
        if (gameState.player.health <= 0) endGame('defeat');
    }
}

function gameLoop() {
    if (!gameState.gameActive) return;
    update();
    render();
    requestAnimationFrame(gameLoop);
}

function update() {
    updatePlayerMovement();
    updateBossAI();
    if (gameState.player.attackAnimation > 0) {
        gameState.player.attackAnimation--;
        if (gameState.player.attackAnimation === 0) {
            gameState.player.isAttacking = false;
        }
    }
    if (gameState.boss.attackAnimation > 0) {
        gameState.boss.attackAnimation--;
        if (gameState.boss.attackAnimation === 0) {
            gameState.boss.isAttacking = false;
        }
    }
    if (gameState.player.specialCooldown > 0) gameState.player.specialCooldown--;
    if (gameState.boss.specialCooldown > 0) gameState.boss.specialCooldown--;
}

function updatePlayerMovement() {
    const speed = gameState.player.character.speed;
    if (gameState.keys['KeyA'] || gameState.keys['ArrowLeft']) gameState.player.x -= speed;
    if (gameState.keys['KeyD'] || gameState.keys['ArrowRight']) gameState.player.x += speed;
    if (gameState.keys['KeyW'] || gameState.keys['ArrowUp']) gameState.player.y -= speed;
    if (gameState.keys['KeyS'] || gameState.keys['ArrowDown']) gameState.player.y += speed;
    gameState.player.x = Math.max(0, Math.min(GAME_CONFIG.width - gameState.player.width, gameState.player.x));
    gameState.player.y = Math.max(0, Math.min(GAME_CONFIG.height - gameState.player.height, gameState.player.y));
}

function updateBossAI() {
    const currentTime = Date.now();
    if (currentTime - gameState.boss.lastAction > 2000 && !gameState.boss.isAttacking) {
        const distance = Math.abs(gameState.player.x - gameState.boss.x);
        if (distance > GAME_CONFIG.attackRange * 1.5) {
            if (gameState.player.x < gameState.boss.x) gameState.boss.x -= GAME_CONFIG.bossSpeed;
            else gameState.boss.x += GAME_CONFIG.bossSpeed;
        } else if (distance < GAME_CONFIG.attackRange && Math.random() > 0.7) {
            bossAttack();
        }
        gameState.boss.x = Math.max(0, Math.min(GAME_CONFIG.width - gameState.boss.width, gameState.boss.x));
    }
}

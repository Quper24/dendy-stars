const blocks = document.querySelectorAll('.game div');
const countRow = Math.sqrt(blocks.length);

let playerIndex = Math.round(blocks.length - (countRow / 2));
let move = 1;

const indexEnemy = [
    23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36,
    43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56,
    63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76
];

for (const enemy of indexEnemy) {
    blocks[enemy].classList.add('enemy');
}

const moveEnemys = () => {
    const leftBlockEnemy = indexEnemy[0] % countRow === 0;
    const rightBlockEnemy = indexEnemy[indexEnemy.length - 1] % countRow === countRow - 1;

    if ((leftBlockEnemy && move === -1) || (rightBlockEnemy && move === 1)) {
        move = countRow;
    } else if (move === countRow) {
        move = leftBlockEnemy ? 1 : -1;
    }

    indexEnemy.forEach(index => {
        blocks[index].classList.remove('enemy')
    });

    for (let i = 0; i < indexEnemy.length; i++) {
        indexEnemy[i] += move;
    }

    indexEnemy.forEach(index => {
        blocks[index].classList.add('enemy')
    });

    if (blocks[playerIndex].classList.contains('enemy', 'player')) {
        alert('Game Over');
        return;
    }
    setTimeout(moveEnemys, 100);
};
moveEnemys();



blocks[playerIndex].classList.add('player');

const movePlayer = event => {
    blocks[playerIndex].classList.remove('player');
    if (event.key === 'ArrowLeft' && playerIndex > blocks.length - countRow) {
        playerIndex--
    }

    if (event.key === 'ArrowRight' && playerIndex < blocks.length - 1) {
        playerIndex++
    }
    blocks[playerIndex].classList.add('player');
};

document.addEventListener('keydown', movePlayer);
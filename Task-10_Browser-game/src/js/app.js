import '../scss/app.scss';

const CellText = {
    empty: '&nbsp;',
    X: 'X',
    O: 'O',
};

const CSS = {
    cell: 'cell-width',
    winCell: 'cell-width cell-red',
};

const inputFieldSize = document.getElementById('input-field-size');
const inputWinCount = document.getElementById('input-win-count');
const textOut = document.getElementById('text-out');
const gameFieldContainer = document.getElementById('game-field-container');

inputFieldSize.onchange = function() {
    let value = +inputFieldSize.value;
    inputWinCount.setAttribute('max', value);
    if (+inputWinCount.value > value) {
        inputWinCount.value = value;
    }
}

let gameData = {
    size: 3,
    winCount: 3,
    isGameRun: false,
    currentStep: CellText.X,
    gameField: [],
    stepCount: 0
};

function getCell(pos) {
    return gameData.gameField[pos.y][pos.x].innerHTML;
}

function isCellsEquals(pos1, pos2) {
    let cell1 = getCell(pos1);
    let cell2 = getCell(pos2);
    return cell1 == cell2;
}

function setWinCell(pos) {
    gameData.gameField[pos.y][pos.x].setAttribute('class', CSS.winCell);
}

function checkDiagonalLR(offsetX, offsetY) {
    let start = { x: offsetX, y: offsetY };
    if (getCell(start) == CellText.empty) return false;

    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX + i, y: offsetY + i };
        if (!isCellsEquals(start, other))
            return false;
    }

    setWinCell(start);
    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX + i, y: offsetY + i };
        setWinCell(other);
    }

    return true;
}

function checkDiagonalRL(offsetX, offsetY) {
    let start = { x: offsetX + gameData.winCount - 1, y: offsetY };
    if (getCell(start) == CellText.empty) return false;

    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX + gameData.winCount - 1 - i, y: offsetY + i };
        if (!isCellsEquals(start, other))
            return false;
    }

    setWinCell(start);
    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX + gameData.winCount - 1 - i, y: offsetY + i };
        setWinCell(other);
    }

    return true;
}

function checkVertical(offsetX, offsetY) {
    let start = { x: offsetX, y: offsetY };
    if (getCell(start) == CellText.empty) return false;

    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX, y: offsetY + i };
        if (!isCellsEquals(start, other))
            return false;
    }

    setWinCell(start);
    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX, y: offsetY + i };
        setWinCell(other);
    }

    return true;
}

function checkHorizontal(offsetX, offsetY) {
    let start = { x: offsetX, y: offsetY };
    if (getCell(start) == CellText.empty) return false;

    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX + i, y: offsetY };
        if (!isCellsEquals(start, other))
            return false;
    }

    setWinCell(start);
    for (let i = 1; i < gameData.winCount; i++) {
        let other = { x: offsetX + i, y: offsetY };
        setWinCell(other);
    }

    return true;
}

function checkInnerSquare(offsetX, offsetY) {
    if (checkDiagonalLR(offsetX, offsetY) || checkDiagonalRL(offsetX, offsetY))
        return true;
    for (let i = 0; i < gameData.winCount; i++) {
        if (checkVertical(offsetX + i, offsetY) || checkHorizontal(offsetX, offsetY + i))
            return true;
    }
    return false;
}

function checkWin() {
    let end = gameData.size - gameData.winCount + 1;
    for (let x = 0; x < end; x++) {
        for (let y = 0; y < end; y++) {
            if (checkInnerSquare(x, y))
                return true;
        }
    }
    return false;
}

function setTextStep() {
    textOut.innerHTML = 'Сейчас ходит ' + gameData.currentStep;
}

function swapStep() {
    if (gameData.currentStep == CellText.X) {
        gameData.currentStep = CellText.O;
    } else {
        gameData.currentStep = CellText.X;
    }
}

function addClickEvent(element) {
    element.onclick = function() {
        if (!gameData.isGameRun) return;
        if (element.innerHTML != CellText.empty) return;
        element.innerHTML = gameData.currentStep;
        if (checkWin()) {
            gameData.isGameRun = false;
            textOut.innerHTML = 'Победил ' + gameData.currentStep + '!<br>Нажмите Start чтобы начать'
        } else {
            swapStep();
            setTextStep();
        }
        gameData.stepCount++;
        if (gameData.stepCount >= gameData.size * gameData.size) {
            gameData.isGameRun = false;
            textOut.innerHTML = 'Ничья!<br>Нажмите Start чтобы начать'
        }
    };
}


function initGame() {
    gameData = {
        size: +(inputFieldSize.value || 3),
        winCount: +(inputWinCount.value || 3),
        isGameRun: true,
        currentStep: CellText.X,
        gameField: [],
        stepCount: 0
    };

    let tableElement = document.createElement('table');
    tableElement.setAttribute('class', "middle-table");
    tableElement.setAttribute('border', "1");
    tableElement.setAttribute('cellpadding', "5px");
    tableElement.setAttribute('cellspacing', "0");

    for (let y = 0; y < gameData.size; y++) {
        let rowElement = document.createElement('tr');
        let row = [];

        for (let x = 0; x < gameData.size; x++) {
            let cell = document.createElement('td');
            cell.setAttribute('class', CSS.cell);
            cell.innerHTML = CellText.empty;
            addClickEvent(cell);

            rowElement.appendChild(cell);
            row.push(cell);
        }

        tableElement.appendChild(rowElement);
        gameData.gameField.push(row);
    }

    gameFieldContainer.innerHTML = '';
    gameFieldContainer.appendChild(tableElement);
}

const startGameButton = document.getElementById('start-game-button');
startGameButton.onclick = function() {
    initGame();
    setTextStep();
};
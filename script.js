const modeTemplate = `Pick mode
<br>
<div class="pick-opt">
    <div class="btn" id='single'>Singleplayer</div>
    <div class="btn" id='multi'>Multiplayer</div>
</div>`;
const pickSymTemplate = `What symbol?
<br>
<div class="pick-opt">
    <div class="btn sym" id='osym'>O</div>
    <div class="btn sym" id='xsym'>X</div>
</div>`;
const boardTemplate = `<div class="board">
    <table>
        <tr>
            <td class="top left" id='1' row='0' col='0'>_</td>
            <td class="top center" id='2' row='0' col='1'>_</td>
            <td class="top right" id='3' row='0' col='2'>_</td>
        </tr>
        <tr>
            <td class="mid left" id='4' row='1' col='0'>_</td>
            <td class="mid center" id='5' row='1' col='1'>_</td>
            <td class="mid right" id='6' row='1' col='2'>_</td>
        </tr>
        <tr>
            <td class="bottom right" id='7' row='2' col='0'>_</td>
            <td class="bottom center" id='8' row='2' col='1'>_</td>
            <td class="bottom left" id='9' row='2' col='2'>_</td>
        </tr>
    </table>
</div>`;
const gameEndTemplate = `<div class="message">
    <div class="again">Play Again</div>

</div>`;
const bindGameEnd = () => {
    $('.again').on('click', () => {
        render(modeTemplate);
        bindMode();
    });
}
let boardTimeout;
let aiTimeout;
let playAI = false;
let move = 1;
let playerSym;
let opponentSym;
const boardClean = ()=>[[1,2,3],[4,5,6],[7,8,9]];
let board = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
];
const bindBoard = () => {
    board = boardClean();
    move = 1;
    $('td').on('click', function() {
        if(move<=9){

                    const sym = move % 2 === 0 ? opponentSym : playerSym;

                    const row = parseInt($(this).attr('row'));
                    const col = parseInt($(this).attr('col'));

                    board[row][col] = sym.toLowerCase();
                    $(this).text(sym);
                    console.log(board);
                    if(playAI && move<=9){
                        setTimeout(useAI, 0);
                    }
                    boardTimeout = setTimeout(checkBoard, 10);
                    move++;

        }
    });

}
const useAI = ()=>{
        playGame();
        move++;
};
const gameOver = () => {
    move = 1;
    clearTimeout(aiTimeout);
    clearTimeout(boardTimeout);
    board = boardClean();
    render(gameEndTemplate);
    bindGameEnd();
}
const bindMode = () => {
    $('.btn').on('click', function() {
        const mode = $(this).attr('id');
        if(mode === 'single'){
            playAI = true;
        }
        render(pickSymTemplate);
        bindSym();
    });
};
const bindSym = () => {
    $('.sym').on('click', function() {
        playerSym = $(this).text();
        opponentSym = playerSym === 'X' ? 'O' : 'X';
        render(boardTemplate);
        bindBoard();
    });
};
const render = (template) => {
    $('.message').html(template);
};
const playGame = () => {
    let possiblePlaces = [];
    if(playAI){
        for(let i = 0;i<3;i++){
            for(let j = 0;j<3;j++){
                if(Number.isInteger(board[i][j])){
                    possiblePlaces.push([i,j]);
                }
            }
        }
        if(possiblePlaces.length > 0){
            const pos = Math.floor(Math.random() * possiblePlaces.length);
            const row = possiblePlaces[pos][0];
            const col = possiblePlaces[pos][1];
            const id = board[row][col];
            $(`#${id}`).text(opponentSym);

            board[row][col] = opponentSym;
            aiTimeout = setTimeout(checkBoard,10);
        }
    }

}

const checkBoard = () => {
    let end = false;
    //Check rows

        for (let i = 0; i < 3; i++) {
            if (board[i][0] === board[i][1] && board[i][1] === board[i][2]) {
                alert(`${board[i][0]} won`);
                end = true;
            }
        }
        //Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === board[1][i] && board[1][i] === board[2][i]) {
                alert(`${board[0][i]} won`);
                end = true;
            }
        }

        //Check diagonals
        if (board[0][0] == board[1][1] && board[1][1] === board[2][2]) {
            alert(`${board[0][0]} won`);
            end = true;
        }
        if(board[0][2] === board[1][1] && board[1][1] === board[2][0]){
            alert(`${board[0][2]} won`);
            end = true;
        }



    //Check if draw
    const allPlaces = board.reduce((a, b) => a.concat(b), []);
    const notOver = allPlaces.some(el => Number.isInteger(el));
    if (!notOver && !end) {
        alert('Draw!');
        end = true;
    }

    if (end) {
        board = boardClean();
        gameOver();
    }

};
$('document').ready(() => {
    render(modeTemplate);
    bindMode();
});

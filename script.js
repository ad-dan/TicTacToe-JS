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
const bindGameEnd = ()=>{
    $('.again').on('click',()=>{
        render(modeTemplate);
        bindMode();
    });
}
let move = 1;
let playerSym;
let opponentSym;
let board = [[1,2,3],[4,5,6],[7,8,9]];
const bindBoard = ()=>{
    $('td').on('click',function(){

        const sym = move%2 === 0 ? opponentSym: playerSym;
        const row =  parseInt($(this).attr('row'));
        const col = parseInt($(this).attr('col'));

        board[row][col] = sym.toLowerCase();
        $(this).text(sym);
        console.log(...board);
        setTimeout(checkBoard,0);
        move++;
    });

}
const bindMode = ()=>{
    $('.btn').on('click',function(){
        render(pickSymTemplate);
        bindSym();
    });
};
const bindSym = ()=>{
    $('.sym').on('click',function(){
        playerSym = $(this).text();
        opponentSym = playerSym === 'X'? 'O': 'X';
        render(boardTemplate);
        bindBoard();
    });
};
const render = (template)=>{
    $('.message').html(template);
};

const checkBoard = ()=>{
        let end = false;
        //Check rows
        for(let i=0;i<3;i++){
            if(board[i][0] === board[i][1] && board[i][1] === board[i][2]){
                alert('Row victory');
                end = true;
            }
        }
        //Check columns
        for(let i=0;i<3;i++){
            if(board[0][i] === board[1][i] && board[1][i] === board[2][i]){
                alert('Column victory');
                end = true;
            }
        }

        //Check diagonals
        if((board[0][0] == board[1][1] && board[1][1] === board[2][2]) || (board[0][2] === board[1][1] && board[1][1] === board[2][0])){
            alert('Diagonal victory');
            end = true;
        }
        if(end){
            render(gameEndTemplate);
            bindGameEnd();
        }
};
$('document').ready(()=>{
    render(modeTemplate);
    bindMode();
});

const blocks=document.querySelectorAll('.cell');
const player1=document.querySelector('.player1');
const player2=document.querySelector('.player2');
const again=document.querySelector('.restart');
const bellring=document.querySelector('.bellring');
const gameoversound = new Audio('gameover.mp3');
let alice='X';
let bob='O';
let turn=alice;
player1.textContent=`Player1: ${alice}`;
player2.textContent=`Player1: ${bob}`;

const begin=()=>{

    blocks.forEach(cell=>{
        cell.addEventListener('click',handleclick);
    })
}
const turnchange=()=>{
    if(turn===alice){
        turn=bob;
    }
    else{
        turn=alice;
    }
}
const checkwin=()=>{
const conditions=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
];
for(let i=0;i<conditions.length;i++){
    const [pos1,pos2,pos3]=conditions[i];
    if(   blocks[pos1].textContent!=='' && blocks[pos1].textContent===blocks[pos2].textContent && blocks[pos2].textContent===blocks[pos3].textContent){
        blocks[pos1].style.backgroundColor="#F7E8F6";
        blocks[pos2].style.backgroundColor="#F7E8F6";
        blocks[pos3].style.backgroundColor="#F7E8F6";
        gameoversound.play();
           return true;
    }
}
return false;
}

const handleclick=(e)=>{
    if(e.target.textContent===''){
        e.target.textContent=turn;
        if(checkwin()){
            
            showalert(`Hurrey ${turn} wins 🥳`)
            disableboard();
        }
        else if(checktie()){
            gameoversound.play();
            showalert(`Tie Play Again`);
            disableboard();
        }
        else{
        turnchange();}
        
    }
}

const checktie=()=>{
let emptycellcount=0;
blocks.forEach(cell=>{
    if(cell.textContent===''){
        emptycellcount++;
    }
})
return emptycellcount===0 && !checkwin();
}
const disableboard=()=>{
    blocks.forEach(cell=>{
        cell.removeEventListener('click',handleclick);
        cell.classList.add('disabled');
    })
}

const restartgame=()=>{
    blocks.forEach(cell=>{
        cell.textContent='';
        cell.classList.remove('disabled');
       cell.style.backgroundColor='#1F1D36'
    })
    begin();
}
again.addEventListener('click',restartgame);

const showalert=(msg)=>{
bellring.style.display='block';
bellring.textContent=msg;
setTimeout(()=>{bellring.style.display='none';},3000)
}
begin();
import { Game, pieceRng } from './game';
// import './interface'

let game = new Game();

function tick() {
    game.tick();
}
function runInConsole() {
    setInterval(() => {
        game.tick();
        console.clear();
        console.log(game.getPrintable());
    }, 1000 / 60);
}

runInConsole();
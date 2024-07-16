class GameRules {
    static getResult(userMove, computerMove, moves) {
        const len = moves.length;
        const half = Math.floor(len / 2);
        const userMoveIndex = moves.indexOf(userMove);
        const computerMoveIndex = moves.indexOf(computerMove);

        if (userMoveIndex === computerMoveIndex) {
            return "It's a draw bro!";
        }

        const winRange = [...Array(half).keys()].map(i => (userMoveIndex + i + 1) % len);
        if (winRange.includes(computerMoveIndex)) {
            return 'You win bro!,Congrats!';
        } else {
            return 'You lose! Try again bro';
        }
    }
}

module.exports = GameRules;

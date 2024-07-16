const readlineSync = require("readline-sync");
const KeyGenerator = require("./keyGenerator");
const HmacGenerator = require("./hmacGenerator");
const GameRules = require("./gameRules");
const HelpTable = require("./helpTable");

class TheGame {
    constructor(moves) {
        this.moves = moves;
        this.key = KeyGenerator.generateKey(32);
        this.computerMove =
            this.moves[Math.floor(Math.random() * this.moves.length)];
        const hmacClass = new HmacGenerator();
        this.hmac = hmacClass.generateHmac(this.key, this.computerMove);
        // console.log(`Debug - Computer move: ${this.computerMove}`);
        // console.log(`Debug - HMAC key: ${this.key.toString('hex')}`);
        // console.log(`Debug - Generated HMAC: ${this.hmac}`);
    }

    startGame() {
        console.log(`HMAC: ${this.hmac}`);
        this.showOption();
    }

    showOption() {
        console.log("Available moves:");
        this.moves.forEach((move, index) => {
            console.log(`${index + 1} - ${move}`);
        });
        console.log("0 - exit");
        console.log("? - help");
        this.getUserMove();
    }

    getUserMove() {
        const choice = readlineSync.question("Let's Enter your move: ");

        if (choice === "0") {
            console.log("Goodbye my friend!");
            return;
        } else if (choice === "?") {
            this.showHelp();
        } else if (this.isValidMove(choice)) {
            this.evaluateGame(choice);
        } else {
            console.log("Invalid input! Choose from the options bro.");
            return

        }
    }

    isValidMove(choice) {
        const moveIndex = parseInt(choice) - 1;
        return moveIndex >= 0 && moveIndex < this.moves.length;
    }

    evaluateGame(choice) {
        const userMoveIndex = parseInt(choice) - 1;
        const userMove = this.moves[userMoveIndex];
        console.log(`Your move: ${userMove}`);
        console.log(`Computer move: ${this.computerMove}`);
        const result = GameRules.getResult(
            userMove,
            this.computerMove,
            this.moves
        );
        console.log(result);
        console.log(`HMAC key: ${this.key.toString("hex")}`);
        console.log(
            `Verify your HMAC at: https://www.freeformatter.com/hmac-generator.html`
        );
    }

    showHelp() {
        const helpMessage = HelpTable.generateHelpMessage(this.moves);
        console.log(helpMessage);
        this.showOption();
    }
}

const args = process.argv.slice(2);

if (args.length < 3 || args.length % 2 === 0) {
    console.error("Hey Bro!: You must provide an odd number of moves (≥ 3).");
    process.exit(1);
}

const uniqueMove = new Set(args);
if (uniqueMove.size !== args.length) {
    console.error("Hey Bro!: Moves must be non-repeating.");
    process.exit(1);
}

const game = new TheGame(args);
game.startGame();

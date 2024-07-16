const Table = require("cli-table3");
const chalk = require("chalk")
class HelpTable {
    static generateTable(moves) {
        const len = moves.length;
        const head = ["v PC\\User >"].concat(moves.map((move) => chalk.bgCyan.white.bold(move)));
        const table = new Table({
            head: head,
            colWidths: Array(len + 1).fill(10),
        });
        for (let i = 0; i < len; i++) {
            const row = [];
            for (let j = 0; j < len; j++) {
                if (i === j) {
                    row.push(chalk.blue("Draw"));
                } else {
                    const result = this.getResult(i, j, len);
                    row.push(result === "Win" ? chalk.green(result) : chalk.red(result));
                }
            }
            table.push({
                [chalk.bold.bgCyanBright
                    .black(moves[i])]: row
            });
        }

        return table;
    }

    static getResult(i, j, len) {
        const half = Math.floor(len / 2);
        const winRange = [...Array(half).keys()].map((k) => (i + k + 1) % len);
        return winRange.includes(j) ? "Win" : "Lose";
    }
    static generateHelpMessage(moves) {
        return ` ${this.generateTable(moves).toString()}`;
    }
}

module.exports = HelpTable;

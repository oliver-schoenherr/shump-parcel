import {Color, Engine} from 'excalibur'
import {loader} from "./resources";
import {Level} from "./level";

export function start() {
    const game = new Engine({
        width: 800,
        height: 600,
        antialiasing: false,
        backgroundColor: Color.Black
    });

    game.start(loader).then(() => {
        const level = new Level();
        game.addScene("main", level);
        game.goToScene("main");
    })
}


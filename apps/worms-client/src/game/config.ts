import Phaser, {Game} from "phaser";
import {BattlefieldScene} from "./scenes/battlefield.scene";


import {Socket} from "socket.io-client";
import SceneManager = Phaser.Scenes.SceneManager;

const FPS = 30;

export const screenDimension = {
  width: 1280,
  height: 720
}

export const createGame = async (socket: Socket, playerId: string) => {
  const scene = new BattlefieldScene(playerId);
  const config = {
    type: Phaser.AUTO,
    width: 1280,
    height: 720,
    banner: false,
    audio: false,
    parent: 'content',
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 }
      }
    },
    scene: [scene],
    fps: {
      target: FPS
    },
  } as Phaser.Types.Core.GameConfig

  const game = new Game(config);
  console.log('game created');
  await sceneBootChecker(game.scene)
  console.log('scene booted');
  scene.mapSocketToHandlers(socket)

  return game;
}

const sceneBootChecker = (scene: SceneManager) => new Promise((resolve) => {
  const interval = setInterval(() => {
    if (scene.isBooted) {
      clearInterval(interval)
      resolve(true);
    }
  }, 1000);
})

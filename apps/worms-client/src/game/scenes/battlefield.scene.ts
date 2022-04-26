import {Socket} from "socket.io-client";

export class BattlefieldScene extends Phaser.Scene {
  constructor(playerId: string) {
    super('battlefield');
  }

  preload = () => {
    this.load.image('map', 'assets/images/map-1.jpg')
  }

  create = () => {
    // Fix object
    // var ground = this.matter.add.sprite(0, 0, 'sheet', 'ground', {shape: shapes.ground});

    this.add.tileSprite(
      0,
      0,
      2000,
      2000,
      'map'
    )
  }

  mapSocketToHandlers(socket: Socket) {
    socket.on('ex_event', this.handleInitiateGame)
  }

  handleInitiateGame = () => {

  }
}

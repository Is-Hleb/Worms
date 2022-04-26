import io from 'socket.io-client'
import {FC, useEffect, useState} from "react";
import {Game} from "phaser";
import {createGame} from "./config";

export const GameComponent: FC = () => {

  const [game, setGame] = useState<Game>();

  useEffect(() => {
    initiateGame();
  }, [])

  const initiateGame = async () => {
    const socket = io("http://localhost:3001", {'transports': ['websocket']});
    let isConnected = false;

    socket.on('connect', () => {
      console.log('socket connected');
      isConnected = true
    });

    socket.on('disconnect', () => {
      console.log('socket disconnected');
      isConnected = false
    });

    await new Promise((resolve) => {
      const interval = setInterval(() => {
        if (isConnected) {
          clearInterval(interval)
          resolve(true);
        }
      }, 1000);
    })

    const instance = await createGame(socket, '');
    console.log('after instance', isConnected);

    if (!isConnected) {
      return
    }

    console.log('pay');
    // socket.emit('startGame', {
    //   battleId: searchParams.get('battle_id'),
    //   hash: searchParams.get('hash'),
    //   userId: searchParams.get('user_id'),
    //   roomId: searchParams.get('room_id')
    // } as StartGameRequest)
  }
  return (
    <div id="content"/>
  )
}

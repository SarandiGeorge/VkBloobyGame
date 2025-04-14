import React, { useEffect, useRef, useContext } from 'react';
import Phaser from 'phaser';
import { PointsContext } from '../contexts/PointsContext';

const Game = ({ onBack }) => {
  const { updatePoints } = useContext(PointsContext);
  const gameRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 600,
      parent: 'game-container',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scene: {
        preload: function() {
          this.load.image('ball', '/assets/ball.png');
          this.load.image('player', '/assets/player.png');
          this.load.image('opponent', '/assets/opponent.png');
          this.load.image('net', '/assets/net.png');
          this.load.audio('impact', '/assets/impact.wav');
          this.load.audio('whistle', '/assets/whistle.wav');
        },
        create: function() {
          // Создание игровых объектов
          this.ball = this.physics.add.image(400, 100, 'ball').setCircle(10).setBounce(0.95);
          this.player = this.physics.add.image(100, 500, 'player').setCircle(25).setImmovable(true);
          this.opponent = this.physics.add.image(700, 500, 'opponent').setCircle(25).setImmovable(true);
          this.net = this.physics.add.image(400, 500, 'net').setImmovable(true);

          // Границы мира
          this.physics.world.setBounds(0, 0, 800, 600);
          this.ball.setCollideWorldBounds(true);

          // Столкновения
          this.physics.add.collider(this.ball, this.player, () => this.sound.play('impact'));
          this.physics.add.collider(this.ball, this.opponent, () => this.sound.play('impact'));
          this.physics.add.collider(this.ball, this.net);

          // Управление игроком
          this.cursors = this.input.keyboard.createCursorKeys();

          // Дополнительные фичи
          this.speedMultiplier = 1;
          this.time.addEvent({
            delay: 10000,
            callback: () => {
              this.speedMultiplier += 0.1;
            },
            loop: true
          });

          // Замедление времени
          this.input.keyboard.on('keydown-SPACE', () => {
            this.time.timeScale = 0.5;
            this.time.delayedCall(3000, () => {
              this.time.timeScale = 1;
            });
          });

          // Отключение света
          this.isLightsOut = false;
          this.time.addEvent({
            delay: 15000,
            callback: () => {
              if (!this.isLightsOut) {
                this.isLightsOut = true;
                this.darken = this.add.rectangle(400, 300, 800, 600, 0x000000, 0.7);
                this.input.on('pointerdown', () => {
                  if (this.isLightsOut) {
                    this.darken.destroy();
                    this.isLightsOut = false;
                  }
                }, this);
              }
            },
            loop: true
          });

          // ИИ оппонента
          this.opponentVelocity = 200;

          // Подсчет очков
          this.score = 0;
          this.scoreText = this.add.text(10, 10, 'Счет: 0', { fontSize: '20px', fill: '#fff' });
          this.physics.world.on('worldbounds', (body, up, down) => {
            if (down && body.gameObject === this.ball) {
              if (this.ball.x < 400) {
                this.score -= 1;
              } else {
                this.score += 1;
                updatePoints(points => points + 1);
              }
              this.scoreText.setText(`Счет: ${this.score}`);
              this.ball.setPosition(400, 100);
              this.ball.setVelocity(0, 0);
              this.sound.play('whistle');
            }
          });
        },
        update: function() {
          // Управление игроком
          this.player.setVelocityX(0);
          if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200 * this.speedMultiplier);
          } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200 * this.speedMultiplier);
          }
          if (this.cursors.up.isDown && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
          }

          // ИИ оппонента
          if (this.ball.x < this.opponent.x - 50) {
            this.opponent.setVelocityX(-this.opponentVelocity * this.speedMultiplier);
          } else if (this.ball.x > this.opponent.x + 50) {
            this.opponent.setVelocityX(this.opponentVelocity * this.speedMultiplier);
          } else {
            this.opponent.setVelocityX(0);
          }

          // Ограничение скорости мяча
          this.ball.setVelocity(this.ball.body.velocity.x * this.speedMultiplier, this.ball.body.velocity.y);
        }
      }
    };

    const game = new Phaser.Game(config);
    gameRef.current = game;

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="w-full h-full flex flex-col">
      <button onClick={onBack} className="m-4 p-2 bg-blue-500 text-white rounded">Назад</button>
      <div id="game-container" className="flex-1"></div>
    </div>
  );
};

export default Game;
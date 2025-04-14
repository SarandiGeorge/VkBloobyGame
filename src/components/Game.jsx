// Импорт React и хуков
import React, { useEffect, useRef, useContext } from 'react';
// Импорт контекста баллов
import { PointsContext } from '../contexts/PointsContext';
// Импорт активов
import ballImage from '../assets/ball.png';
import playerImage from '../assets/player.png';
import opponentImage from '../assets/opponent.png';
import netImage from '../assets/net.png';
import impactSound from '../assets/impact.wav';
import whistleSound from '../assets/whistle.wav';
import backgroundImage from '../assets/background.png'; // Новый фон

// Компонент игры
const Game = () => {
  // Получение функции обновления баллов из контекста
  const { points, updatePoints } = useContext(PointsContext);
  // Реф для хранения экземпляра игры Phaser
  const gameRef = useRef(null);

  useEffect(() => {
    // Динамическая загрузка Phaser
    import('phaser').then((Phaser) => {
      console.log('Инициализация Phaser...'); // Лог для отладки

      const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        parent: 'game-container',
        physics: {
          default: 'arcade',
          arcade: {
            gravity: { y: 300 },
            debug: true // Включаем отладку физики для проверки hitbox
          }
        },
        scene: {
          preload: function() {
            // Загрузка изображений и звуков
            this.load.image('background', backgroundImage); // Загружаем фон
            this.load.image('ball', ballImage);
            this.load.image('player', playerImage);
            this.load.image('opponent', opponentImage);
            this.load.image('net', netImage);
            this.load.audio('impact', impactSound);
            this.load.audio('whistle', whistleSound);

            // Обработка ошибок загрузки
            this.load.on('filecomplete', (key) => {
              console.log(`Файл загружен: ${key}`);
            });
            this.load.on('loaderror', (file) => {
              console.error(`Ошибка загрузки файла: ${file.key}`);
            });
          },
          create: function() {
            // Добавляем фоновое изображение
            this.add.image(400, 300, 'background');

            // Установка фонового цвета (на случай, если фон не загрузится)
            this.cameras.main.setBackgroundColor('#87CEEB'); // Голубой фон

            // Проверка успешного создания сцены
            console.log('Сцена Phaser успешно создана');

            // Включаем интерактивность для сцены
            this.input.setGlobalTopOnly(false); // Разрешаем обработку событий на всех слоях

            // Создание игровых объектов
            this.ball = this.physics.add.image(400, 100, 'ball')
              .setScale(0.1) // Масштабирование до 40x40 px
              .setCircle(20) // Радиус hitbox — 20 px
              .setBounce(0.95);
            console.log('Мяч создан:', this.ball); // Лог для отладки

            this.player = this.physics.add.image(100, 500, 'player')
              .setScale(0.1) // Масштабирование до ~57x49 px
              .setCircle(28) // Радиус hitbox — 28 px
              .setImmovable(true);
            console.log('Игрок создан:', this.player); // Лог для отладки

            this.opponent = this.physics.add.image(700, 500, 'opponent')
              .setScale(0.1) // Масштабирование до ~57x49 px
              .setCircle(28) // Радиус hitbox — 28 px
              .setImmovable(true);
            console.log('Оппонент создан:', this.opponent); // Лог для отладки

            this.net = this.physics.add.image(400, 500, 'net')
              .setScale(0.2, 0.2) // Масштабирование до ~10x140 px
              .setImmovable(true);
            console.log('Сетка создана:', this.net); // Лог для отладки

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
                  this.darken.setInteractive(); // Делаем затемнение интерактивным
                  this.darken.on('pointerdown', (pointer) => {
                    console.log('Клик по затемнению зарегистрирован:', pointer); // Лог для отладки
                    if (this.isLightsOut) {
                      this.darken.destroy();
                      this.isLightsOut = false;
                    }
                  });
                }
              },
              loop: true
            });

            // ИИ оппонента
            this.opponentVelocity = 200;

            // Подсчет очков
            this.score = 0;
            this.scoreText = this.add.text(10, 10, 'Счет: 0', { fontSize: '20px', fill: '#fff' });
            this.pointsText = this.add.text(10, 40, `Баллы: ${points}`, { fontSize: '20px', fill: '#fff' });
            this.physics.world.on('worldbounds', (body, up, down) => {
              if (down && body.gameObject === this.ball) {
                if (this.ball.x < 400) {
                  this.score -= 1;
                } else {
                  this.score += 1;
                  updatePoints(prevPoints => prevPoints + 1);
                }
                this.scoreText.setText(`Счет: ${this.score}`);
                this.ball.setPosition(400, 100);
                this.ball.setVelocity(0, 0);
                this.sound.play('whistle');
              }
            });

            // Состояние игры (активна или на паузе)
            this.isGameActive = false;

            // Создание меню
            this.menuItems = ['START', 'SPEND POINTS', 'INSTRUCTIONS', 'CONTROLS', 'ABOUT'];
            this.menuSelection = 0; // Индекс выбранного пункта
            this.menuGroup = this.add.group(); // Группа для элементов меню

            // Фон для меню
            this.menuBackground = this.add.rectangle(400, 300, 400, 300, 0x000000, 0.8);
            this.menuGroup.add(this.menuBackground);

            // Создание пунктов меню
            this.menuTexts = [];
            this.menuItems.forEach((item, index) => {
              const text = this.add.text(400, 200 + index * 50, item, {
                fontSize: '24px',
                fill: index === this.menuSelection ? '#00ff00' : '#ffffff'
              }).setOrigin(0.5);
              this.menuGroup.add(text);
              this.menuTexts.push(text);
            });

            // Отображение баллов в меню
            this.menuPointsText = this.add.text(400, 150, `Баллы: ${points}`, {
              fontSize: '20px',
              fill: '#ffffff'
            }).setOrigin(0.5);
            this.menuGroup.add(this.menuPointsText);

            // Управление меню
            this.input.keyboard.on('keydown-UP', () => {
              if (!this.isGameActive) {
                this.menuSelection = (this.menuSelection - 1 + this.menuItems.length) % this.menuItems.length;
                this.updateMenuSelection();
              }
            });

            this.input.keyboard.on('keydown-DOWN', () => {
              if (!this.isGameActive) {
                this.menuSelection = (this.menuSelection + 1) % this.menuItems.length;
                this.updateMenuSelection();
              }
            });

            this.input.keyboard.on('keydown-ENTER', () => {
              if (!this.isGameActive) {
                this.handleMenuSelection();
              }
            });

            // Обработка клавиши Esc для вызова меню
            this.input.keyboard.on('keydown-ESC', () => {
              if (this.isGameActive) {
                this.isGameActive = false;
                this.physics.world.pause();
                this.menuGroup.setVisible(true);
                this.scoreText.setVisible(false);
                this.pointsText.setVisible(false);
              }
            });

            // Начальное состояние — игра на паузе, меню видно
            this.physics.world.pause();
            this.menuGroup.setVisible(true);
            this.scoreText.setVisible(false);
            this.pointsText.setVisible(false);

            // Привязываем методы как свойства сцены
            this.updateMenuSelection = () => {
              this.menuTexts.forEach((text, index) => {
                text.setFill(index === this.menuSelection ? '#00ff00' : '#ffffff');
              });
            };

            this.handleMenuSelection = () => {
              switch (this.menuItems[this.menuSelection]) {
                case 'START':
                  this.isGameActive = true;
                  this.physics.world.resume();
                  this.menuGroup.setVisible(false);
                  this.scoreText.setVisible(true);
                  this.pointsText.setVisible(true);
                  this.ball.setPosition(400, 100);
                  this.ball.setVelocity(0, 0);
                  this.player.setPosition(100, 500);
                  this.opponent.setPosition(700, 500);
                  break;
                case 'SPEND POINTS':
                  if (points >= 10) {
                    updatePoints(prevPoints => prevPoints - 10);
                    alert('Вы потратили 10 баллов!');
                  } else {
                    alert('Недостаточно баллов!');
                  }
                  break;
                case 'INSTRUCTIONS':
                  alert('Цель игры: забить мяч на сторону противника.\nУправление:\n- Стрелки влево/вправо — движение\n- Стрелка вверх — прыжок\n- Пробел — замедление времени (3 сек)\n- Клик мыши — включить свет\n- Esc — открыть меню');
                  break;
                case 'CONTROLS':
                  alert('Управление:\n- Стрелки влево/вправо — движение игрока\n- Стрелка вверх — прыжок\n- Пробел — замедление времени (3 секунды)\n- Клик мыши — включить свет\n- Esc — открыть меню');
                  break;
                case 'ABOUT':
                  alert('Blobby Volley — это простая игра, вдохновлённая классическими аркадами.\nРазработано для VK Mini Apps.');
                  break;
              }
            };
          },
          update: function() {
            // Обновление баллов в меню и на экране
            this.menuPointsText.setText(`Баллы: ${points}`);
            this.pointsText.setText(`Баллы: ${points}`);

            if (!this.isGameActive) return;

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

      // Создание экземпляра игры
      const game = new Phaser.Game(config);
      gameRef.current = game;

      // Очистка при размонтировании
      return () => {
        game.destroy(true);
      };
    });
  }, []); // Пустой массив зависимостей — выполняется один раз

  return (
    <div className="w-full h-full flex flex-col">
      <div id="game-container" className="flex-1"></div>
    </div>
  );
};

// Экспорт компонента
export default Game;
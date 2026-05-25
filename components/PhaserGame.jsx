"use client";

import { useEffect, useRef } from "react";
import { applyDifficultyToLayout, countDestroyableBricks } from "@/lib/brickLayouts";
import { BRICK_COLORS, getBallVelocity } from "@/lib/gameConfig";

const GAME_WIDTH = 900;
const GAME_HEIGHT = 560;

function hexToNumber(hex, fallback) {
  if (!hex || typeof hex !== "string") return fallback;
  return Number.parseInt(hex.replace("#", ""), 16);
}

export default function PhaserGame({
  playerSetup,
  ground,
  difficulty,
  isPaused,
  onStats,
  onResult,
}) {
  const containerRef = useRef(null);
  const gameRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    let mounted = true;

    async function bootGame() {
      const Phaser = (await import("phaser")).default;
      if (!mounted || !containerRef.current) return;

      const bricks = applyDifficultyToLayout(ground.id, difficulty.id);
      const destroyableCount = countDestroyableBricks(bricks);
      const ballColor = hexToNumber(playerSetup.ballColor, 0x2dd4bf);
      const paddleColor = hexToNumber(playerSetup.paddleColor, 0x38bdf8);
      const normalBrickColor = hexToNumber(playerSetup.brickColor, BRICK_COLORS[1]);
      const baseVelocity = getBallVelocity(playerSetup.speed);

      let score = 0;
      let remaining = destroyableCount;
      let lives = 3;
      let finished = false;
      let waitingForServe = false;
      let elapsedMs = 0;
      let lastStatsAt = 0;

      class BrickBreakerScene extends Phaser.Scene {
        constructor() {
          super("BrickBreakerScene");
        }

        create() {
          sceneRef.current = this;
          this.physics.world.setBoundsCollision(true, true, true, false);

          const bg = this.add.graphics();
          bg.fillGradientStyle(0x101827, 0x101827, 0x07111f, 0x07111f, 1);
          bg.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

          this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 78, GAME_WIDTH - 32, 2, 0xffffff, 0.08);

          this.paddle = this.add.rectangle(GAME_WIDTH / 2, GAME_HEIGHT - 42, 142, 18, paddleColor, 1);
          this.physics.add.existing(this.paddle, true);

          this.ball = this.add.circle(GAME_WIDTH / 2, GAME_HEIGHT - 82, 10, ballColor, 1);
          this.physics.add.existing(this.ball);
          this.ball.body.setCircle(10);
          this.ball.body.setBounce(1, 1);
          this.ball.body.setCollideWorldBounds(true);
          launchBall(this);

          this.brickGroup = this.physics.add.staticGroup();
          createBricks(this, bricks, normalBrickColor);

          this.physics.add.collider(this.ball, this.paddle, () => handlePaddleHit(this), null, this);
          this.physics.add.collider(this.ball, this.brickGroup, (ball, brick) => handleBrickHit(this, brick), null, this);

          this.cursors = this.input.keyboard.createCursorKeys();
          this.keys = this.input.keyboard.addKeys("A,D");

          this.input.on("pointermove", (pointer) => movePaddle(this, pointer.x));
          this.input.on("pointerdown", (pointer) => movePaddle(this, pointer.x));

          reportStats(true);
        }

        update(time, delta) {
          if (finished || waitingForServe) return;

          elapsedMs += delta;

          const moveSpeed = 0.62 * delta;
          if (this.cursors.left.isDown || this.keys.A.isDown) {
            movePaddle(this, this.paddle.x - moveSpeed);
          } else if (this.cursors.right.isDown || this.keys.D.isDown) {
            movePaddle(this, this.paddle.x + moveSpeed);
          }

          if (this.ball.y > GAME_HEIGHT + 26) {
            handleLifeLost(this);
            return;
          }

          if (time - lastStatsAt > 250) {
            reportStats();
          }
        }
      }

      function createBricks(scene, layoutBricks, normalBrickColorValue) {
        const brickWidth = 68;
        const brickHeight = 24;
        const gap = 8;
        const startX = (GAME_WIDTH - (11 * brickWidth + 10 * gap)) / 2 + brickWidth / 2;
        const startY = 46;

        layoutBricks.forEach((brickData) => {
          const x = startX + brickData.column * (brickWidth + gap);
          const y = startY + brickData.row * (brickHeight + gap);
          const color = brickData.unbreakable
            ? BRICK_COLORS.unbreakable
            : brickData.hp === 1
              ? normalBrickColorValue
              : BRICK_COLORS[brickData.hp];

          const brick = scene.add.rectangle(x, y, brickWidth, brickHeight, color, 1);
          brick.setStrokeStyle(1, 0xffffff, brickData.unbreakable ? 0.16 : 0.25);
          brick.setData("hp", brickData.hp);
          brick.setData("maxHp", brickData.maxHp);
          brick.setData("unbreakable", brickData.unbreakable);
          scene.brickGroup.add(brick);
        });
      }

      function movePaddle(scene, targetX) {
        const halfWidth = scene.paddle.width / 2;
        const x = Phaser.Math.Clamp(targetX, halfWidth + 10, GAME_WIDTH - halfWidth - 10);
        scene.paddle.setPosition(x, scene.paddle.y);
        scene.paddle.body.updateFromGameObject();
      }

      function handlePaddleHit(scene) {
        const offset = (scene.ball.x - scene.paddle.x) / (scene.paddle.width / 2);
        const velocityX = Phaser.Math.Clamp(offset, -1, 1) * baseVelocity * 0.9;
        scene.ball.body.setVelocity(velocityX, -Math.abs(scene.ball.body.velocity.y || baseVelocity));
      }

      function resetBall(scene) {
        scene.ball.setPosition(scene.paddle.x, GAME_HEIGHT - 82);
        scene.ball.body.setVelocity(0, 0);
      }

      function launchBall(scene) {
        scene.ball.body.setVelocity(baseVelocity * 0.45, -baseVelocity);
      }

      function handleLifeLost(scene) {
        if (waitingForServe || finished) return;

        lives -= 1;
        reportStats(true);

        if (lives <= 0) {
          finishRound("Game Over");
          return;
        }

        waitingForServe = true;
        resetBall(scene);
        scene.time.delayedCall(850, () => {
          if (finished || !scene.ball?.body) return;
          waitingForServe = false;
          launchBall(scene);
          reportStats(true);
        });
      }

      function handleBrickHit(scene, brick) {
        if (finished || brick.getData("unbreakable")) return;

        const hp = brick.getData("hp") - 1;
        if (hp <= 0) {
          score += brick.getData("maxHp") * 100;
          remaining -= 1;
          brick.destroy();
        } else {
          brick.setData("hp", hp);
          brick.setFillStyle(hp === 1 ? normalBrickColor : BRICK_COLORS[hp], 1);
          brick.setScale(0.96, 0.92);
          scene.tweens.add({ targets: brick, scaleX: 1, scaleY: 1, duration: 90 });
          score += 35;
        }

        reportStats(true);
        if (remaining <= 0) finishRound("Win");
      }

      function reportStats(force = false) {
        const scene = sceneRef.current;
        if (!scene || (!force && scene.time.now - lastStatsAt < 250)) return;
        lastStatsAt = scene.time.now;
        onStats?.({
          score,
          remaining,
          lives,
          timePlayed: Math.max(0, Math.floor(elapsedMs / 1000)),
        });
      }

      function finishRound(outcome) {
        if (finished) return;
        finished = true;
        const scene = sceneRef.current;
        const timePlayed = Math.max(0, Math.floor(elapsedMs / 1000));
        scene?.physics.pause();
        onResult?.({ outcome, score, lives, timePlayed });
      }

      gameRef.current = new Phaser.Game({
        type: Phaser.AUTO,
        parent: containerRef.current,
        width: GAME_WIDTH,
        height: GAME_HEIGHT,
        backgroundColor: "#07111f",
        physics: {
          default: "arcade",
          arcade: {
            debug: false,
          },
        },
        scale: {
          mode: Phaser.Scale.FIT,
          autoCenter: Phaser.Scale.CENTER_BOTH,
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
        },
        scene: BrickBreakerScene,
      });
    }

    bootGame();

    return () => {
      mounted = false;
      sceneRef.current = null;
      if (gameRef.current) {
        gameRef.current.destroy(true);
        gameRef.current = null;
      }
    };
  }, [difficulty.id, ground.id, onResult, onStats, playerSetup.ballColor, playerSetup.brickColor, playerSetup.paddleColor, playerSetup.speed]);

  useEffect(() => {
    const scene = sceneRef.current;
    if (!scene || !scene.physics) return;

    if (isPaused) {
      scene.physics.pause();
      scene.scene.pause();
    } else {
      scene.scene.resume();
      scene.physics.resume();
    }
  }, [isPaused]);

  return (
    <div
      ref={containerRef}
      className="h-full min-h-0 w-full overflow-hidden rounded-md border border-white/10 bg-slate-950"
      aria-label="Brick Breaker game canvas"
    />
  );
}

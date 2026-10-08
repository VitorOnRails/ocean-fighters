import { useState, useRef, useEffect } from "react";
import { Game } from "../engine/game.ts";
import { screenWidth, screenHeight, startingLives } from "../engine/config.ts";
import "../styles/ui.css";

const App = () => {

    const [started, setStarted] = useState(false);
    const [score, setScore] = useState(0);
    const [lives, setLives] = useState(startingLives);
    const [gameOver, setGameOver] = useState(false);

    const containerRef = useRef<HTMLDivElement>(null);
    const gameRef = useRef<Game | null>(null);
    const wrapperRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const game = new Game(containerRef.current!, {
            onScoreChange: setScore,
            onLivesChange: setLives,
            onGameOver: () => setGameOver(true)
        });
        game.init();
        gameRef.current = game;
    }, []);

    useEffect(() => {
        function resize() {
            const screenResize = Math.min(window.innerWidth / screenWidth, window.innerHeight / screenHeight);
                if (wrapperRef.current) {
                wrapperRef.current.style.transform = `translate(-50%, -50%) scale(${screenResize})`;
            };
        }
        resize();
        window.addEventListener("resize", resize);
        return () => window.removeEventListener("resize", resize);
    }, [])

    return (
        <>
            <div className="game-wrapper" ref={wrapperRef}>
                {!started && (
                <div className="overlay">
                    <h1 className="title">Ocean Fighters</h1>
                    <button className="button" onClick={() => { gameRef.current?.start(); setStarted(true); }}>Decolar</button>
                </div>
            )}
                <div ref={containerRef} />
                {started && !gameOver && (
                    <div className="hud">Score: {score} | Vidas: {lives}</div>
                )}
                {gameOver &&
                <div className="overlay">
                    <h1 className="game-over-title">Game Over!</h1>
                    <p className="score">Score: {score}</p>
                    <button className="button" onClick={() => { gameRef.current?.reset(); setScore(0); setLives(startingLives); setGameOver(false); }}>Decolar de novo</button>
                </div>
                }
            </div>
        </>
    );
};

export { App };
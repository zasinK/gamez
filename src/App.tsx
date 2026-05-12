import { Play, Sparkles } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { GameEngine } from './game/engine';

export default function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<'title' | 'playing' | 'gameover'>('title');

  useEffect(() => {
    if (gameState === 'playing' && canvasRef.current) {
      const engine = new GameEngine(canvasRef.current, () => {
        setGameState('gameover');
      });
      engine.start();

      return () => {
        engine.stop();
      };
    }
  }, [gameState]);

  return (
    <div className="w-full h-screen bg-[#050510] flex items-center justify-center overflow-hidden font-sans text-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,_#3a1510_0%,_transparent_60%),_radial-gradient(circle_at_10%_80%,_#1a2b3c_0%,_transparent_50%)] opacity-30 mix-blend-screen pointer-events-none" />
      
      {gameState === 'title' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
          <div className="flex flex-col items-center animate-in fade-in zoom-in duration-1000">
            <Sparkles className="w-12 h-12 text-[#a8f0ff] mb-6 opacity-80" />
            <h1 className="text-6xl md:text-8xl font-light tracking-widest text-transparent bg-clip-text bg-gradient-to-b from-[#ffffff] to-[#a8f0ff] mb-4 drop-shadow-[0_0_25px_rgba(168,240,255,0.4)]">루멘 포레스트</h1>
            <p className="text-xl md:text-2xl text-[#8E9299] mb-16 tracking-[0.3em] uppercase">Lumen Forest</p>
            
            <button 
              onClick={() => setGameState('playing')}
              className="group flex items-center gap-3 px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all tracking-widest uppercase text-sm backdrop-blur-md"
            >
              <Play className="w-4 h-4 group-hover:text-[#a8f0ff] transition-colors" />
              <span>게임 시작</span>
            </button>
          </div>
          
          <div className="absolute bottom-10 flex gap-8 text-xs text-white/40 tracking-widest uppercase">
            <div className="flex flex-col items-center gap-2"><span className="px-2 py-1 border border-white/20 rounded">← →</span> <span>이동</span></div>
            <div className="flex flex-col items-center gap-2"><span className="px-2 py-1 border border-white/20 rounded">↑ ↓</span> <span>시야이동</span></div>
            <div className="flex flex-col items-center gap-2"><span className="px-2 py-1 border border-white/20 rounded">SPACE</span> <span>점프</span></div>
            <div className="flex flex-col items-center gap-2"><span className="px-2 py-1 border border-white/20 rounded">X</span> <span>빛/어둠</span></div>
            <div className="flex flex-col items-center gap-2"><span className="px-2 py-1 border border-white/20 rounded">Z</span> <span>대시</span></div>
          </div>
        </div>
      )}

      {gameState === 'playing' && (
        <div className="relative w-full max-w-5xl aspect-video rounded-xl overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] shadow-[#a8f0ff]/10 outline outline-1 outline-white/10">
          <canvas 
            ref={canvasRef} 
            width={640} 
            height={360}
            className="w-full h-full block bg-[#030308]"
          />
          <div className="absolute top-4 left-4 text-white/50 text-xs tracking-widest font-sans">
            LUMEN FOREST : PROTOTYPE
          </div>
        </div>
      )}

      {gameState === 'gameover' && (
        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 bg-black/80 backdrop-blur-sm animate-in fade-in duration-1000">
          <h2 className="text-4xl md:text-6xl font-light tracking-widest text-[#a8f0ff] mb-8">모든 숲을 통과했습니다</h2>
          <p className="text-xl text-white/50 mb-12 tracking-widest uppercase">Thanks for playing</p>
          <button 
            onClick={() => setGameState('title')}
            className="px-8 py-3 bg-white/5 border border-white/10 rounded-full hover:bg-white/10 hover:border-white/30 transition-all tracking-widest uppercase text-sm backdrop-blur-md"
          >
            타이틀로 돌아가기
          </button>
        </div>
      )}
    </div>
  );
}

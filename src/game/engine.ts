export type BlockType = 'solid' | 'light' | 'dark' | 'hazard' | 'goal';

export interface Block {
  x: number;
  y: number;
  w: number;
  h: number;
  type: BlockType;
}

export interface Player {
  x: number;
  y: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  speed: number;
  jumpForce: number;
  grounded: boolean;
  lightMode: boolean; // true = bright, false = dark
  facingRight: boolean;
  dashCooldown: number;
  isDashing: boolean;
  dashTime: number;
}

export interface Camera {
  x: number;
  y: number;
}

export interface Level {
  width: number;
  height: number;
  blocks: Block[];
  spawn: { x: number, y: number };
}

// Temporary simple level
export const LEVEL_1: Level = {
  width: 3200,
  height: 1200,
  spawn: { x: 100, y: 900 },
  blocks: [
    // --- Starting Area (Moss Forest) ---
    { x: 0, y: 1000, w: 600, h: 200, type: 'solid' }, // Starting ground
    { x: -50, y: 0, w: 50, h: 1200, type: 'solid' },  // Left wall
    
    // Intro to jump
    { x: 400, y: 900, w: 100, h: 100, type: 'solid' },
    { x: 500, y: 800, w: 100, h: 200, type: 'solid' },
    
    // --- Water/Pit Area ---
    { x: 600, y: 1150, w: 400, h: 50, type: 'hazard' }, // Water pit underneath
    
    // Light platform to cross pit
    { x: 650, y: 800, w: 100, h: 20, type: 'light' }, 
    { x: 800, y: 750, w: 100, h: 20, type: 'light' }, 
    
    // Safe island center
    { x: 950, y: 700, w: 200, h: 500, type: 'solid' },
    
    // --- Dark Mechanism Wall ---
    // A huge solid wall that makes you climb up
    { x: 1150, y: 400, w: 100, h: 800, type: 'solid' },
    
    // Climb up dark and light platforms
    { x: 1050, y: 600, w: 80, h: 20, type: 'dark' },
    { x: 950, y: 500, w: 80, h: 20, type: 'dark' },
    { x: 1050, y: 400, w: 80, h: 20, type: 'light' }, 
    { x: 950, y: 300, w: 80, h: 20, type: 'light' }, 
    { x: 1050, y: 200, w: 80, h: 20, type: 'dark' }, 
    { x: 1150, y: 150, w: 200, h: 50, type: 'solid' }, // Top of wall passage
    
    // --- Descending into Ruins ---
    { x: 1350, y: 300, w: 100, h: 20, type: 'solid' },
    { x: 1500, y: 450, w: 100, h: 20, type: 'solid' },
    { x: 1350, y: 600, w: 100, h: 20, type: 'solid' },
    { x: 1500, y: 750, w: 100, h: 20, type: 'solid' },
    
    // Ground resumes briefly
    { x: 1650, y: 900, w: 200, h: 300, type: 'solid' },
    
    // --- Alternating Bridge Puzzle ---
    // Huge gap below
    { x: 1850, y: 1150, w: 650, h: 50, type: 'hazard' },
    
    // Bridges
    { x: 1900, y: 800, w: 120, h: 20, type: 'light' },
    { x: 2050, y: 750, w: 120, h: 20, type: 'dark' },
    { x: 2200, y: 700, w: 120, h: 20, type: 'light' },
    { x: 2350, y: 650, w: 120, h: 20, type: 'dark' },
    
    // Ground resumes before tree
    { x: 2500, y: 550, w: 200, h: 650, type: 'solid' },
    { x: 2700, y: 450, w: 150, h: 20, type: 'light' },
    
    // Main tree/Goal
    { x: 2900, y: 300, w: 400, h: 900, type: 'solid' },
    { x: 3050, y: 200, w: 100, h: 100, type: 'goal' }, // Goal block
    
    // Right boundary
    { x: 3300, y: 0, w: 50, h: 1200, type: 'solid' },
  ]
};

export const LEVEL_2: Level = {
  width: 3500,
  height: 1200,
  spawn: { x: 100, y: 800 },
  blocks: [
    // --- Starting Area (Lake Shores) ---
    { x: 0, y: 900, w: 400, h: 300, type: 'solid' },
    { x: -50, y: 0, w: 50, h: 1200, type: 'solid' },
    
    // Water pit
    { x: 400, y: 1150, w: 2800, h: 50, type: 'hazard' },
    
    // Tiny floating ruins
    { x: 550, y: 800, w: 80, h: 20, type: 'solid' },
    { x: 750, y: 700, w: 80, h: 20, type: 'dark' },
    { x: 950, y: 800, w: 80, h: 20, type: 'light' },
    { x: 1150, y: 650, w: 100, h: 20, type: 'solid' },
    
    // High platforms requiring dash
    { x: 1450, y: 650, w: 100, h: 20, type: 'solid' },
    { x: 1750, y: 650, w: 100, h: 20, type: 'dark' },
    { x: 2050, y: 650, w: 100, h: 20, type: 'light' },
    
    // Large ruins structure
    { x: 2350, y: 500, w: 300, h: 700, type: 'solid' },
    { x: 2750, y: 400, w: 150, h: 20, type: 'dark' },
    { x: 3000, y: 300, w: 150, h: 20, type: 'light' },
    
    // Goal
    { x: 3300, y: 500, w: 200, h: 700, type: 'solid' },
    { x: 3350, y: 400, w: 100, h: 100, type: 'goal' },
    
    { x: 3500, y: 0, w: 50, h: 1200, type: 'solid' },
  ]
};

const LEVELS = [LEVEL_1, LEVEL_2];

export class GameEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private lightCanvas: HTMLCanvasElement;
  private lightCtx: CanvasRenderingContext2D;
  
  private running: boolean = false;
  private lastTime: number = 0;
  private lookYOffset: number = 0;
  
  private keys: Record<string, boolean> = {};
  private prevKeys: Record<string, boolean> = {};
  
  private currentLevelIndex: number = 0;
  private level: Level;
  private camera: Camera = { x: 0, y: 0 };
  
  private player: Player = {
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    w: 24,
    h: 24,
    speed: 300,
    jumpForce: 620,
    grounded: false,
    lightMode: true,
    facingRight: true,
    dashCooldown: 0,
    isDashing: false,
    dashTime: 0
  };

  // Particles & Entities
  private particles: Array<{x: number, y: number, vx: number, vy: number, life: number, maxLife: number, color: string, size: number}> = [];
  private fireflies: Array<{x: number, y: number, vx: number, vy: number, maxV: number, tx: number, ty: number, color: string}> = [];
  
  private onWin: () => void;

  constructor(canvas: HTMLCanvasElement, onWin: () => void) {
    this.canvas = canvas;
    this.onWin = onWin;
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('2D context not found');
    this.ctx = ctx;
    
    this.lightCanvas = document.createElement('canvas');
    this.lightCanvas.width = canvas.width;
    this.lightCanvas.height = canvas.height;
    const lctx = this.lightCanvas.getContext('2d');
    if (!lctx) throw new Error('2D context not found for light canvas');
    this.lightCtx = lctx;
    
    this.level = LEVELS[this.currentLevelIndex];
    this.resetPlayer();
    
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  private resetPlayer() {
    this.player.x = this.level.spawn.x;
    this.player.y = this.level.spawn.y;
    this.player.vx = 0;
    this.player.vy = 0;
    this.camera = { x: this.player.x - this.canvas.width / 2, y: this.player.y - this.canvas.height / 2 };
    
    this.fireflies = [];
    // Spawn ambient fireflies
    for(let i=0; i<30; i++) {
        this.fireflies.push({
            x: Math.random() * this.level.width,
            y: Math.random() * this.level.height,
            vx: 0, 
            vy: 0,
            maxV: 20 + Math.random() * 20,
            tx: Math.random() * this.level.width,
            ty: Math.random() * this.level.height,
            color: Math.random() > 0.5 ? '#a8f0ff' : '#9b59b6'
        });
    }
  }

  public start() {
    this.running = true;
    window.addEventListener('keydown', this.handleKeyDown);
    window.addEventListener('keyup', this.handleKeyUp);
    requestAnimationFrame((t) => this.loop(t));
  }

  public stop() {
    this.running = false;
    window.removeEventListener('keydown', this.handleKeyDown);
    window.removeEventListener('keyup', this.handleKeyUp);
  }

  private handleKeyDown(e: KeyboardEvent) {
    this.keys[e.key] = true;
  }

  private handleKeyUp(e: KeyboardEvent) {
    this.keys[e.key] = false;
  }
  
  private wasKeyPressed(key: string): boolean {
    return this.keys[key] && !this.prevKeys[key];
  }

  private loop(time: number) {
    if (!this.running) return;
    
    const dt = (time - this.lastTime) / 1000;
    this.lastTime = time;
    
    this.update(Math.min(dt, 0.1)); // Cap dt to prevent huge jumps on lag
    this.draw();
    
    // Store previous keys
    this.prevKeys = { ...this.keys };
    
    requestAnimationFrame((t) => this.loop(t));
  }
  
  private spawnParticle(x: number, y: number, color: string) {
    this.particles.push({
      x, y,
      vx: (Math.random() - 0.5) * 100,
      vy: (Math.random() - 0.5) * 100 - 50,
      life: 0,
      maxLife: 0.5 + Math.random() * 0.5,
      color,
      size: 2 + Math.random() * 3
    });
  }

  private update(dt: number) {
    // Light mode toggle
    if (this.wasKeyPressed('x') || this.wasKeyPressed('X')) {
      this.player.lightMode = !this.player.lightMode;
      // Spawn some magical particles
      for(let i=0; i<15; i++) {
        this.spawnParticle(
          this.player.x + this.player.w/2, 
          this.player.y + this.player.h/2, 
          this.player.lightMode ? '#a8f0ff' : '#9b59b6'
        );
      }
    }

    // Input
    const left = this.keys['ArrowLeft'] || this.keys['a'];
    const right = this.keys['ArrowRight'] || this.keys['d'];
    const lookUp = this.keys['ArrowUp'] || this.keys['w'];
    const lookDown = this.keys['ArrowDown'] || this.keys['s'];
    const jump = this.wasKeyPressed(' ');
    const dash = this.wasKeyPressed('z') || this.wasKeyPressed('Z');

    // Dash logic
    if (this.player.dashCooldown > 0) this.player.dashCooldown -= dt;
    if (dash && this.player.dashCooldown <= 0 && !this.player.isDashing) {
      this.player.isDashing = true;
      this.player.dashTime = 0.2; // 200ms dash
      this.player.dashCooldown = 1.0;
      this.player.vy = 0;
    }

    if (this.player.isDashing) {
      this.player.dashTime -= dt;
      this.player.vx = (this.player.facingRight ? 1 : -1) * 800; // Dash speed
      
      // Dash trail
      this.spawnParticle(this.player.x + this.player.w/2, this.player.y + this.player.h/2, '#ffffff');

      if (this.player.dashTime <= 0) {
        this.player.isDashing = false;
      }
    } else {
      // Horizontal movement
      let targetVx = 0;
      if (left) {
        targetVx = -this.player.speed;
        this.player.facingRight = false;
      }
      if (right) {
        targetVx = this.player.speed;
        this.player.facingRight = true;
      }
      
      // Acceleration & Friction
      const accel = this.player.grounded ? 2000 : 1000;
      if (this.player.vx < targetVx) {
        this.player.vx = Math.min(this.player.vx + accel * dt, targetVx);
      } else if (this.player.vx > targetVx) {
        this.player.vx = Math.max(this.player.vx - accel * dt, targetVx);
      }
    }

    // Gravity
    if (!this.player.isDashing) {
      const gravity = 1200;
      this.player.vy += gravity * dt;
    }

    // Jump
    if (jump && this.player.grounded) {
      this.player.vy = -this.player.jumpForce;
      this.player.grounded = false;
      
      for(let i=0; i<5; i++) {
        this.spawnParticle(this.player.x + this.player.w/2, this.player.y + this.player.h, '#ffffff');
      }
    }

    // Move X
    this.player.x += this.player.vx * dt;
    this.checkCollisions(true);

    // Move Y
    this.player.y += this.player.vy * dt;
    this.player.grounded = false;
    this.checkCollisions(false);
    
    // Look logic
    if (this.player.grounded && Math.abs(this.player.vx) < 50) {
      const targetLookY = lookDown ? 200 : (lookUp ? -200 : 0);
      this.lookYOffset += (targetLookY - this.lookYOffset) * 4 * dt;
    } else {
      this.lookYOffset += (0 - this.lookYOffset) * 8 * dt;
    }
    
    // Death pit
    if (this.player.y > this.level.height + 200) {
      this.die();
    }

    // Update particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.life += dt;
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      if (p.life >= p.maxLife) {
        this.particles.splice(i, 1);
      }
    }

    // Update fireflies
    for (const f of this.fireflies) {
      if (Math.random() < 0.02) {
        f.tx = f.x + (Math.random() - 0.5) * 400;
        f.ty = f.y + (Math.random() - 0.5) * 400;
      }
      const dx = f.tx - f.x;
      const dy = f.ty - f.y;
      const dist = Math.sqrt(dx*dx + dy*dy);
      
      if (dist > 0) {
          f.vx += (dx / dist) * 50 * dt;
          f.vy += (dy / dist) * 50 * dt;
      }
      
      const v = Math.sqrt(f.vx*f.vx + f.vy*f.vy);
      if (v > f.maxV) {
          f.vx = (f.vx / v) * f.maxV;
          f.vy = (f.vy / v) * f.maxV;
      }
      
      f.x += f.vx * dt;
      f.y += f.vy * dt;
    }

    // Camera follow (smooth)
    const targetCamX = this.player.x + this.player.w/2 - this.canvas.width / 2;
    const targetCamY = this.player.y + this.player.h/2 - this.canvas.height / 2 - 50 + this.lookYOffset; // look slightly up, plus look offset
    
    this.camera.x += (targetCamX - this.camera.x) * 5 * dt;
    this.camera.y += (targetCamY - this.camera.y) * 5 * dt;
    
    // Clamp camera to level bounds somewhat (optional)
    this.camera.x = Math.max(0, Math.min(this.camera.x, this.level.width - this.canvas.width));
    this.camera.y = Math.min(this.camera.y, this.level.height - this.canvas.height + 200);
  }

  private isSolid(block: Block): boolean {
    if (block.type === 'solid') return true;
    if (block.type === 'light' && this.player.lightMode) return true;
    if (block.type === 'dark' && !this.player.lightMode) return true;
    return false;
  }

  private checkCollisions(isX: boolean) {
    for (const block of this.level.blocks) {
      const isOverlapping = this.player.x < block.x + block.w &&
                            this.player.x + this.player.w > block.x &&
                            this.player.y < block.y + block.h &&
                            this.player.y + this.player.h > block.y;
                            
      if (!isOverlapping) continue;

      if (block.type === 'hazard') {
        // Player dies
        this.die();
        return;
      }
      
      if (block.type === 'goal') {
        this.winLevel();
        return;
      }

      if (!this.isSolid(block)) continue;

      // Collision resolved
      if (isX) {
        if (this.player.vx > 0) { // moving right
          this.player.x = block.x - this.player.w;
        } else { // moving left
          this.player.x = block.x + block.w;
        }
        this.player.vx = 0;
      } else {
        if (this.player.vy > 0) { // moving down
          this.player.y = block.y - this.player.h;
          this.player.grounded = true;
        } else { // moving up
          this.player.y = block.y + block.h;
        }
        this.player.vy = 0;
      }
    }
  }

  private winLevel() {
    this.currentLevelIndex++;
    if (this.currentLevelIndex >= LEVELS.length) {
      this.stop();
      this.onWin();
    } else {
      this.level = LEVELS[this.currentLevelIndex];
      this.resetPlayer();
    }
  }

  private die() {
    this.player.x = this.level.spawn.x;
    this.player.y = this.level.spawn.y;
    this.player.vx = 0;
    this.player.vy = 0;
    
    // Spawn death particles
    for(let i=0; i<30; i++) {
      this.spawnParticle(this.player.x + this.player.w/2, this.player.y + this.player.h/2, '#ff4444');
    }
  }

  private draw() {
    // Clear main canvas with sky color
    this.ctx.fillStyle = '#060B14'; // Very dark blue sky
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Draw Parallax Backgrounds
    this.drawParallax(0.2, '#0B1526', 100);
    this.drawParallax(0.5, '#132338', 50);

    this.ctx.save();
    this.ctx.translate(-Math.floor(this.camera.x), -Math.floor(this.camera.y));

    // Draw Blocks
    for (const block of this.level.blocks) {
      if (block.type === 'solid') {
        this.ctx.fillStyle = '#1A2A3A'; // Solid ruins
        this.ctx.fillRect(block.x, block.y, block.w, block.h);
        // Add moss/grass on top
        this.ctx.fillStyle = '#2A4A4A';
        this.ctx.fillRect(block.x, block.y, block.w, 8);
      } else if (block.type === 'light') {
        // Light blocks (Plants)
        if (this.player.lightMode) {
          this.ctx.fillStyle = '#2ECC71';
        } else {
          this.ctx.fillStyle = 'rgba(46, 204, 113, 0.2)'; // Faded
        }
        this.ctx.fillRect(block.x, block.y, block.w, block.h);
      } else if (block.type === 'dark') {
        // Dark blocks (Mystic bridges)
        if (!this.player.lightMode) {
          this.ctx.fillStyle = '#9B59B6';
        } else {
          this.ctx.fillStyle = 'rgba(155, 89, 182, 0.2)'; // Faded
        }
        this.ctx.fillRect(block.x, block.y, block.w, block.h);
      } else if (block.type === 'goal') {
        this.ctx.fillStyle = '#FFD700'; // Gold goal
        this.ctx.fillRect(block.x, block.y, block.w, block.h);
        // Goal inner glow
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(block.x + 10, block.y + 10, block.w - 20, block.h - 20);
      }
    }

    // Draw Particles
    for (const p of this.particles) {
      this.ctx.fillStyle = p.color;
      const alpha = 1 - (p.life / p.maxLife);
      this.ctx.globalAlpha = alpha;
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
    this.ctx.globalAlpha = 1.0;
    
    // Draw Fireflies
    for (const f of this.fireflies) {
      this.ctx.fillStyle = f.color;
      this.ctx.beginPath();
      this.ctx.arc(f.x, f.y, 2, 0, Math.PI * 2);
      this.ctx.fill();
    }

    // Draw Player
    this.ctx.fillStyle = this.player.lightMode ? '#E0FFFF' : '#DDA0DD'; // Cyan/White vs Purple/Pink
    this.ctx.beginPath();
    // Tiny round spirit
    this.ctx.arc(this.player.x + this.player.w/2, this.player.y + this.player.h/2, this.player.w/2, 0, Math.PI * 2);
    this.ctx.fill();

    // Eyes
    this.ctx.fillStyle = '#000';
    const eyeOffset = this.player.facingRight ? 4 : -4;
    this.ctx.beginPath();
    this.ctx.arc(this.player.x + this.player.w/2 + eyeOffset, this.player.y + this.player.h/2 - 2, 2, 0, Math.PI*2);
    this.ctx.fill();

    this.ctx.restore();

    // Lighting (Overlay)
    this.drawLighting();
  }

  private drawParallax(speedMult: number, color: string, gap: number) {
    this.ctx.fillStyle = color;
    const offset = (this.camera.x * speedMult) % gap;
    // Draw simple pillar-like trees background
    for (let x = -offset; x < this.canvas.width; x += gap) {
      this.ctx.fillRect(x, -this.canvas.height, gap * 0.4, this.canvas.height * 3);
    }
  }

  private drawLighting() {
    this.lightCtx.clearRect(0, 0, this.lightCanvas.width, this.lightCanvas.height);
    
    // Fill with darkness
    this.lightCtx.fillStyle = this.player.lightMode ? 'rgba(5, 5, 10, 0.7)' : 'rgba(10, 5, 20, 0.85)';
    this.lightCtx.fillRect(0, 0, this.lightCanvas.width, this.lightCanvas.height);

    // Punch out holes for lights
    this.lightCtx.globalCompositeOperation = 'destination-out';
    
    const camX = this.camera.x;
    const camY = this.camera.y;

    // Player Light
    const plx = this.player.x + this.player.w/2 - camX;
    const ply = this.player.y + this.player.h/2 - camY;
    const baseRadius = this.player.lightMode ? 250 : 100;
    
    // slight pulsing
    const radius = baseRadius + Math.sin(Date.now() / 150) * 10;
    
    const grad = this.lightCtx.createRadialGradient(plx, ply, 0, plx, ply, radius);
    grad.addColorStop(0, 'rgba(255, 255, 255, 1)');
    grad.addColorStop(0.5, 'rgba(255, 255, 255, 0.5)');
    grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    this.lightCtx.fillStyle = grad;
    this.lightCtx.beginPath();
    this.lightCtx.arc(plx, ply, radius, 0, Math.PI * 2);
    this.lightCtx.fill();

    // Fireflies light
    for (const f of this.fireflies) {
      const flx = f.x - camX;
      const fly = f.y - camY;
      
      // Only draw if on screen
      if (flx > -50 && flx < this.canvas.width + 50 && fly > -50 && fly < this.canvas.height + 50) {
        const fradius = 40 + Math.sin(Date.now() / 200 + f.x) * 10;
        const fgrad = this.lightCtx.createRadialGradient(flx, fly, 0, flx, fly, fradius);
        fgrad.addColorStop(0, 'rgba(255, 255, 255, 0.8)');
        fgrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        this.lightCtx.fillStyle = fgrad;
        this.lightCtx.beginPath();
        this.lightCtx.arc(flx, fly, fradius, 0, Math.PI * 2);
        this.lightCtx.fill();
      }
    }

    // Reset composite operation
    this.lightCtx.globalCompositeOperation = 'source-over';

    // Draw light overlay to main canvas
    this.ctx.drawImage(this.lightCanvas, 0, 0);
  }
}

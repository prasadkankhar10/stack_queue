// Web Audio API procedural sound engine for VR Architecture Presentation
class VRAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('vr_presentation_muted') === 'true';
  }

  init() {
    if (!this.ctx && typeof window !== 'undefined' && (window.AudioContext || window.webkitAudioContext)) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  ensureContext() {
    this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('vr_presentation_muted', String(this.isMuted));
    if (!this.isMuted) {
      this.playTone(660, 'sine', 0.1, 0.08);
    }
    return this.isMuted;
  }

  playTone(freq = 440, type = 'sine', duration = 0.12, gainVal = 0.08) {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);
      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {}
  }

  playClick() {
    this.playTone(1200, 'sine', 0.04, 0.05);
  }

  playDataPacket() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(300, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, this.ctx.currentTime + 0.15);
      gain.gain.setValueAtTime(0.07, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.16);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.16);
    } catch (e) {}
  }

  playLaser() {
    if (this.isMuted) return;
    try {
      this.ensureContext();
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(1800, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.18);
      gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.18);
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start();
      osc.stop(this.ctx.currentTime + 0.18);
    } catch (e) {}
  }

  playSuccess() {
    if (this.isMuted) return;
    this.playTone(523.25, 'sine', 0.15, 0.07);
    setTimeout(() => this.playTone(659.25, 'sine', 0.15, 0.07), 80);
    setTimeout(() => this.playTone(783.99, 'sine', 0.25, 0.09), 160);
  }

  playBuzz() {
    if (this.isMuted) return;
    this.playTone(130, 'sawtooth', 0.22, 0.1);
  }

  playHum() {
    this.playTone(85, 'sine', 0.35, 0.06);
  }
}

window.vrSound = new VRAudioEngine();

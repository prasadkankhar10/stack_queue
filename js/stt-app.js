// ==========================================================================
// SPEECH TO TEXT (STT) PRESENTATION ORCHESTRATOR & INTERACTION CONTROLLER
// Handles Animations, Waveform Synthesis, Bayesian Decoding, and Speaker Notes
// ==========================================================================

class STTApp {
  constructor() {
    this.slides = window.sttSlidesData || [];
    this.currentIndex = 0;
    this.isLaserPointerActive = false;
    this.laserDot = null;
    this.isHeaderHidden = localStorage.getItem('stt_header_hidden') === 'true';
    this.audioEnabled = true;
    this.audioCtx = null;

    // Simulation states
    this.waveAnimId = null;
    this.waveType = 'word';
    this.wavePhase = 0;
    this.autoHomoInterval = null;
    this.transcriptionTimeout = null;

    // Homophone dataset for Slide 2
    this.homophones = {
      1: {
        phrase: '“wreck a nice beach” vs “recognize speech”',
        audioFeatures: 'Acoustics: /r ɛ k ə n aɪ s b iː tʃ/ (Identical phone stream)',
        acousticProb: 'Acoustic Model P(Audio|W): 98.2% for BOTH hypotheses',
        lmOptionA: 'W₁: “wreck a nice beach” — LM Probability P(W₁) = 0.0004%',
        lmOptionB: 'W₂: “recognize speech” — LM Probability P(W₂) = 8.7420%',
        decision: 'Winner: W₂ (“recognize speech”) chosen via argmax P(A|W)·P(W)',
        badge: 'Disambiguated by N-Gram / Neural LM',
        color: '#2563EB'
      },
      2: {
        phrase: '“there” vs “their” vs “they’re”',
        audioFeatures: 'Acoustics: /ð ɛər/ (Identical homophone phone sequence)',
        acousticProb: 'Acoustic Model P(Audio|W): 99.1% for all 3 spelling variants',
        lmOptionA: 'Context: “...presenting ___ findings today”',
        lmOptionB: 'P(“their” | context) = 96.8% | P(“there”) = 2.1% | P(“they’re”) = 1.1%',
        decision: 'Winner: “their” — Contextual Bi-gram/Transformer prior',
        badge: 'Contextual Syntax Disambiguation',
        color: '#059669'
      },
      3: {
        phrase: '“two” vs “to” vs “too”',
        audioFeatures: 'Acoustics: /t uː/ (Exact acoustic match)',
        acousticProb: 'Acoustic Model P(Audio|W): 99.4% uniform likelihood',
        lmOptionA: 'Context: “...going ___ the laboratory now”',
        lmOptionB: 'P(“to” | verb+dest) = 97.5% | P(“too”) = 1.8% | P(“two”) = 0.7%',
        decision: 'Winner: “to” — Directional preposition selected by LM',
        badge: 'Part-of-Speech & Semantic Prior',
        color: '#7C3AED'
      }
    };
  }

  init() {
    this.slides = window.sttSlidesData || [];
    this.stageEl = document.getElementById('slide-stage');
    this.counterEl = document.getElementById('slide-counter');
    this.progressBarEl = document.getElementById('progress-bar');
    this.sectionPillEl = document.getElementById('current-section-pill');
    this.overviewModal = document.getElementById('overview-modal');
    this.notesModal = document.getElementById('notes-modal');
    this.notesBody = document.getElementById('notes-body');

    const hash = window.location.hash;
    if (hash && hash.startsWith('#slide-')) {
      const num = parseInt(hash.replace('#slide-', ''), 10);
      if (!isNaN(num) && num >= 1 && num <= this.slides.length) {
        this.currentIndex = num - 1;
      }
    }

    if (this.isHeaderHidden) {
      document.body.classList.add('header-hidden');
      const fBtn = document.getElementById('footer-header-toggle-btn');
      if (fBtn) fBtn.classList.add('active');
    }

    this.renderSlide(this.currentIndex);
    this.bindEvents();
    this.buildOverviewGrid();
    this.initLaserPointer();
  }

  // ========================================================================
  // AUDIO SYNTHESIZER ENGINE (Web Audio API)
  // ========================================================================
  initAudio() {
    if (!this.audioCtx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.audioCtx = new AudioCtx();
    }
    if (this.audioCtx && this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
  }

  playSound(type) {
    if (!this.audioEnabled) return;
    try {
      this.initAudio();
      if (!this.audioCtx) return;
      const now = this.audioCtx.currentTime;
      const osc = this.audioCtx.createOscillator();
      const gain = this.audioCtx.createGain();
      osc.connect(gain);
      gain.connect(this.audioCtx.destination);

      if (type === 'blip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, now);
        osc.frequency.exponentialRampToValueAtTime(820, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'nav') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(420, now);
        osc.frequency.exponentialRampToValueAtTime(640, now + 0.1);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(554.37, now + 0.08);
        osc.frequency.setValueAtTime(659.25, now + 0.16);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.32);
        osc.start(now);
        osc.stop(now + 0.32);
      } else if (type === 'vowel-tone') {
        // Dual formant synthetic vowel /a/ (approx 700Hz & 1200Hz)
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        osc.start(now);
        osc.stop(now + 0.35);
      } else if (type === 'fricative-tone') {
        // High-pass noisy burst
        osc.type = 'square';
        osc.frequency.setValueAtTime(3200, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      } else if (type === 'celebrate') {
        [440, 554.37, 659.25, 880].forEach((freq, i) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.08);
          g.gain.setValueAtTime(0.08, now + i * 0.08);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.4);
          o.start(now + i * 0.08);
          o.stop(now + i * 0.08 + 0.4);
        });
      }
    } catch (e) {
      console.warn('Audio synthesis issue:', e);
    }
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.classList.toggle('active', this.audioEnabled);
      const lbl = btn.querySelector('.btn-label-text');
      if (lbl) lbl.innerText = this.audioEnabled ? 'Sound' : 'Muted';
    }
    if (this.audioEnabled) this.playSound('blip');
  }

  // ========================================================================
  // CLASSROOM LASER POINTER
  // ========================================================================
  initLaserPointer() {
    if (this.laserDot) return;
    this.laserDot = document.createElement('div');
    this.laserDot.id = 'presentation-laser-dot';
    this.laserDot.style.cssText = `
      position: fixed;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #EF4444;
      box-shadow: 0 0 10px #EF4444, 0 0 20px #DC2626;
      pointer-events: none;
      z-index: 99999;
      transform: translate(-50%, -50%);
      display: none;
      transition: transform 0.04s ease;
    `;
    document.body.appendChild(this.laserDot);

    window.addEventListener('mousemove', (e) => {
      if (this.isLaserPointerActive && this.laserDot) {
        this.laserDot.style.left = e.clientX + 'px';
        this.laserDot.style.top = e.clientY + 'px';
      }
    });
  }

  toggleLaserPointer() {
    this.isLaserPointerActive = !this.isLaserPointerActive;
    if (this.laserDot) {
      this.laserDot.style.display = this.isLaserPointerActive ? 'block' : 'none';
    }
    const btn = document.getElementById('laser-toggle-btn');
    if (btn) btn.classList.toggle('active', this.isLaserPointerActive);
    this.playSound('blip');
  }

  // ========================================================================
  // HEADER VISIBILITY
  // ========================================================================
  toggleHeader() {
    this.isHeaderHidden = !this.isHeaderHidden;
    document.body.classList.toggle('header-hidden', this.isHeaderHidden);
    localStorage.setItem('stt_header_hidden', this.isHeaderHidden ? 'true' : 'false');
    const fBtn = document.getElementById('footer-header-toggle-btn');
    if (fBtn) fBtn.classList.toggle('active', this.isHeaderHidden);
    this.playSound('blip');
  }

  // ========================================================================
  // SLIDE RENDERING & LIFECYCLE
  // ========================================================================
  renderSlide(index) {
    if (!this.slides || this.slides.length === 0) {
      this.slides = window.sttSlidesData || [];
    }
    if (index < 0 || index >= this.slides.length) return;

    // Clear animations/timers from previous slide
    if (this.waveAnimId) {
      cancelAnimationFrame(this.waveAnimId);
      this.waveAnimId = null;
    }
    if (this.autoHomoInterval) {
      clearInterval(this.autoHomoInterval);
      this.autoHomoInterval = null;
    }
    if (this.transcriptionTimeout) {
      clearTimeout(this.transcriptionTimeout);
      this.transcriptionTimeout = null;
    }

    this.currentIndex = index;
    const slide = this.slides[index];

    if (!this.stageEl) this.stageEl = document.getElementById('slide-stage');
    if (this.sectionPillEl) this.sectionPillEl.innerText = slide.part || 'ASR & NLP';

    const html = `
      <div class="slide active" id="${slide.id}">
        <div class="slide-header">
          <div class="slide-tag">
            <span aria-hidden="true">●</span>
            <span>${slide.partNumber || ''} — ${slide.part || ''}</span>
            ${slide.duration ? `<span style="margin-left: 0.5rem; color: #64748B;">⏱️ ${slide.duration}</span>` : ''}
          </div>
          <h1 class="slide-title">${slide.title}</h1>
          <div class="slide-subtitle">${slide.subtitle || ''}</div>
        </div>
        <div class="slide-body">
          ${typeof slide.render === 'function' ? slide.render() : ''}
        </div>
      </div>
    `;

    if (this.stageEl) {
      this.stageEl.innerHTML = html;
    }

    // Call slide specific lifecycle initializer
    if (typeof slide.init === 'function') {
      try {
        slide.init();
      } catch (err) {
        console.error('Error initializing slide ' + slide.id + ':', err);
      }
    }

    this.updateControls();
    window.history.replaceState(null, null, '#' + slide.id);

    // Update Notes modal content
    if (this.notesBody) {
      this.notesBody.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
          <h3 style="color: var(--accent-blue); font-size: 1.1rem; margin: 0;">Slide ${this.currentIndex + 1}: ${slide.title}</h3>
          <span style="font-size: 0.82rem; color: #64748B; font-weight: 700;">⏱️ ${slide.duration || '30s'}</span>
        </div>
        ${slide.notes || '<p style="color: #64748B;">No speaker notes for this slide.</p>'}
      `;
    }
  }

  updateControls() {
    if (this.counterEl) {
      const cur = String(this.currentIndex + 1).padStart(2, '0');
      const tot = String(this.slides.length).padStart(2, '0');
      this.counterEl.innerHTML = `SLIDE <b>${cur}</b> / ${tot}`;
    }

    if (this.progressBarEl) {
      const pct = ((this.currentIndex + 1) / this.slides.length) * 100;
      this.progressBarEl.style.width = pct + '%';
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === this.slides.length - 1;

    // Update overview grid selection
    const cards = document.querySelectorAll('.overview-card');
    cards.forEach((card, idx) => {
      card.classList.toggle('active', idx === this.currentIndex);
    });
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.playSound('nav');
      this.renderSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.playSound('nav');
      this.renderSlide(this.currentIndex - 1);
    }
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.playSound('nav');
      this.renderSlide(index);
      this.closeModals();
    }
  }

  // ========================================================================
  // KEYBOARD CONTROLS & EVENT BINDINGS
  // ========================================================================
  bindEvents() {
    window.addEventListener('keydown', (e) => {
      // Ignore if user is inside an input or editable field
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          this.toggleLaserPointer();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleAudio();
          break;
        case 'n':
        case 'N':
        case 'p':
        case 'P':
          e.preventDefault();
          this.toggleNotes();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          this.toggleOverview();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          this.toggleHeader();
          break;
        case 'Escape':
          this.closeModals();
          break;
      }
    });

    window.addEventListener('hashchange', () => {
      const hash = window.location.hash;
      if (hash && hash.startsWith('#slide-')) {
        const num = parseInt(hash.replace('#slide-', ''), 10);
        if (!isNaN(num) && num >= 1 && num <= this.slides.length && (num - 1) !== this.currentIndex) {
          this.renderSlide(num - 1);
        }
      }
    });
  }

  // ========================================================================
  // MODALS & OVERVIEW
  // ========================================================================
  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(err => console.log(err));
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
    this.playSound('blip');
  }

  toggleNotes() {
    if (!this.notesModal) return;
    const isShowing = this.notesModal.classList.contains('show') || this.notesModal.classList.contains('active');
    this.closeModals();
    if (!isShowing) {
      this.notesModal.classList.add('show', 'active');
    }
    this.playSound('blip');
  }

  toggleOverview() {
    if (!this.overviewModal) return;
    const isShowing = this.overviewModal.classList.contains('show') || this.overviewModal.classList.contains('active');
    this.closeModals();
    if (!isShowing) {
      this.overviewModal.classList.add('show', 'active');
    }
    this.playSound('blip');
  }

  closeModals() {
    if (this.overviewModal) this.overviewModal.classList.remove('show', 'active');
    if (this.notesModal) this.notesModal.classList.remove('show', 'active');
  }

  buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;
    grid.innerHTML = '';

    this.slides.forEach((slide, idx) => {
      const card = document.createElement('div');
      card.className = `overview-card ${idx === this.currentIndex ? 'active' : ''}`;
      card.onclick = () => this.goToSlide(idx);
      card.innerHTML = `
        <div class="overview-num">${slide.partNumber || `0${idx + 1}`}</div>
        <div class="overview-title">${slide.title}</div>
        <div style="font-size: 0.72rem; color: #64748B; margin-top: 0.25rem;">${slide.part || ''}</div>
      `;
      grid.appendChild(card);
    });
  }

  // ========================================================================
  // SLIDE 1 INTERACTION: TITLE SEQUENTIAL REVEAL
  // ========================================================================
  playTitleAnimation() {
    this.playSound('blip');
    const nodes = [
      document.getElementById('stt-title-node-1'),
      document.getElementById('stt-title-node-2'),
      document.getElementById('stt-title-node-3'),
      document.getElementById('stt-title-node-4')
    ];
    const status = document.getElementById('stt-title-status');

    nodes.forEach((n, idx) => {
      if (n) {
        n.style.opacity = '0.35';
        n.style.transform = 'scale(0.98)';
      }
    });

    nodes.forEach((n, idx) => {
      setTimeout(() => {
        if (n) {
          n.style.opacity = '1';
          n.style.transform = 'scale(1.02)';
          this.playSound('blip');
          setTimeout(() => { if (n) n.style.transform = 'scale(1)'; }, 200);
        }
        if (status && idx === nodes.length - 1) {
          status.innerHTML = '✓ Pipeline Active & Ready for Decoding';
          this.playSound('success');
        }
      }, (idx + 1) * 320);
    });
  }

  // ========================================================================
  // SLIDE 2 INTERACTION: HOMOPHONE DISAMBIGUATION (BAYES' THEOREM)
  // ========================================================================
  resolveHomophone(id) {
    const data = this.homophones[id];
    if (!data) return;

    // Highlight button
    [1, 2, 3].forEach(btnId => {
      const btn = document.getElementById(`btn-homo-${btnId}`);
      if (btn) {
        if (btnId === id) {
          btn.className = 'btn-action btn-action-primary';
        } else {
          btn.className = 'btn-action btn-action-secondary';
        }
      }
    });

    const display = document.getElementById('homophone-display-card');
    if (display) {
      display.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.6rem;">
          <span style="font-weight: 800; color: #0F172A; font-size: 0.95rem;">${data.phrase}</span>
          <span class="asr-badge" style="background: rgba(37,99,235,0.1); color: ${data.color}; border: 1px solid ${data.color};">${data.badge}</span>
        </div>
        <div style="font-size: 0.78rem; color: #64748B; font-family: monospace; margin-bottom: 0.5rem; background: #FFFFFF; padding: 0.35rem 0.5rem; border-radius: 4px; border: 1px solid #E2E8F0;">
          ${data.audioFeatures}
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.8rem; margin-bottom: 0.65rem;">
          <div style="color: #475569;">📊 <strong>Acoustic Model:</strong> ${data.acousticProb}</div>
          <div style="color: #475569;">📖 <strong>Language Model:</strong> ${data.lmOptionA}</div>
          <div style="color: #1E3A8A; font-weight: 700; background: #EFF6FF; padding: 0.25rem 0.5rem; border-radius: 4px;">
            ${data.lmOptionB}
          </div>
        </div>
        <div style="border-top: 1.5px dashed #CBD5E1; padding-top: 0.5rem; display: flex; align-items: center; gap: 0.4rem; font-size: 0.82rem; font-weight: 800; color: #059669;">
          <span>🎯</span>
          <span>${data.decision}</span>
        </div>
      `;
    }
    this.playSound('blip');
  }

  autoPlayHomophones() {
    let current = 1;
    if (this.autoHomoInterval) clearInterval(this.autoHomoInterval);
    this.resolveHomophone(current);
    this.autoHomoInterval = setInterval(() => {
      current = (current % 3) + 1;
      this.resolveHomophone(current);
      if (current === 3) {
        clearInterval(this.autoHomoInterval);
        this.autoHomoInterval = null;
      }
    }, 2000);
  }

  // ========================================================================
  // SLIDE 3 INTERACTION: WAVEFORM SIMULATOR & MEL FILTERBANK
  // ========================================================================
  initWaveformCanvas() {
    const canvas = document.getElementById('stt-wave-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    this.renderSpectrogramBars('word');

    const draw = () => {
      if (!document.getElementById('stt-wave-canvas')) return;
      this.wavePhase += 0.08;
      const width = canvas.width;
      const height = canvas.height;
      const centerY = height / 2;

      ctx.fillStyle = '#0F172A';
      ctx.fillRect(0, 0, width, height);

      // Draw subtle grid lines
      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      // Draw acoustic wave
      ctx.beginPath();
      ctx.lineWidth = 2.5;

      if (this.waveType === 'vowel') {
        ctx.strokeStyle = '#0284C7'; // Blue harmonic wave
        for (let x = 0; x < width; x++) {
          const t = x * 0.05 + this.wavePhase;
          // fundamental + 2nd formant
          const y = centerY + Math.sin(t) * 18 + Math.sin(t * 2.6) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else if (this.waveType === 'fricative') {
        ctx.strokeStyle = '#D97706'; // Amber turbulent noise
        for (let x = 0; x < width; x++) {
          const noise = (Math.random() - 0.5) * 32;
          const y = centerY + noise * Math.sin(x * 0.02);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        // Continuous Natural Speech Word
        ctx.strokeStyle = '#10B981'; // Emerald modulated wave
        for (let x = 0; x < width; x++) {
          const envelope = Math.sin(x * 0.015 + this.wavePhase * 0.3) * 0.6 + 0.4;
          const carrier = Math.sin(x * 0.08 + this.wavePhase * 2) * 22;
          const harmonic = Math.sin(x * 0.16 + this.wavePhase) * 6;
          const y = centerY + (carrier + harmonic) * Math.abs(envelope);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      }
      ctx.stroke();

      this.waveAnimId = requestAnimationFrame(draw);
    };

    if (this.waveAnimId) cancelAnimationFrame(this.waveAnimId);
    this.waveAnimId = requestAnimationFrame(draw);
  }

  setAudioSample(type) {
    this.waveType = type;
    const badge = document.getElementById('wave-state-badge');
    const label = document.getElementById('wave-freq-label');

    if (type === 'vowel') {
      if (badge) { badge.className = 'asr-badge asr-badge-features'; badge.innerText = 'Vowel Formants'; }
      if (label) label.innerText = 'Resonance ~ 300Hz & 2200Hz';
      this.playSound('vowel-tone');
    } else if (type === 'fricative') {
      if (badge) { badge.className = 'asr-badge asr-badge-audio'; badge.innerText = 'Turbulent Fricative'; }
      if (label) label.innerText = 'High Frequency > 3500Hz';
      this.playSound('fricative-tone');
    } else {
      if (badge) { badge.className = 'asr-badge asr-badge-text'; badge.innerText = 'Multi-Phone Word'; }
      if (label) label.innerText = 'Natural Modulated Formants';
      this.playSound('blip');
    }

    this.renderSpectrogramBars(type);
  }

  renderSpectrogramBars(type) {
    const container = document.getElementById('spectrogram-visualizer');
    if (!container) return;
    container.innerHTML = '';

    const barCount = 18;
    for (let i = 0; i < barCount; i++) {
      let heightPct = 20;
      if (type === 'vowel') {
        // Lower mel bins prominent
        heightPct = i < 7 ? (85 - i * 8 + Math.random() * 10) : (15 + Math.random() * 15);
      } else if (type === 'fricative') {
        // High mel bins prominent
        heightPct = i > 9 ? (40 + (i - 9) * 6 + Math.random() * 15) : (10 + Math.random() * 10);
      } else {
        // Multi-peak spectrum
        heightPct = Math.sin(i * 0.45) * 35 + 50 + (Math.random() * 10);
      }
      heightPct = Math.min(95, Math.max(10, heightPct));

      const bar = document.createElement('div');
      bar.className = 'spectrogram-bar';
      bar.style.height = `${heightPct}%`;
      if (type === 'vowel') bar.style.background = '#0284C7';
      else if (type === 'fricative') bar.style.background = '#D97706';
      else bar.style.background = '#10B981';

      container.appendChild(bar);
    }
  }

  // ========================================================================
  // SLIDE 4 INTERACTION: CLASSICAL VS END-TO-END ARCHITECTURES
  // ========================================================================
  showArchMode(mode) {
    const btnClassical = document.getElementById('btn-arch-classical');
    const btnE2E = document.getElementById('btn-arch-e2e');
    const display = document.getElementById('arch-diagram-display');
    const summary = document.getElementById('arch-summary-text');

    if (mode === 'classical') {
      if (btnClassical) btnClassical.className = 'btn-action btn-action-primary';
      if (btnE2E) btnE2E.className = 'btn-action btn-action-secondary';

      if (display) {
        display.innerHTML = `
          <div style="display: grid; grid-template-columns: 1fr auto 1fr auto 1fr; align-items: center; gap: 0.5rem; text-align: center;">
            <div style="background: #EFF6FF; border: 1.5px solid #2563EB; border-radius: 6px; padding: 0.65rem 0.5rem;">
              <div style="font-weight: 800; font-size: 0.8rem; color: #1E3A8A;">Acoustic Model</div>
              <div style="font-size: 0.7rem; color: #2563EB; margin-top: 0.2rem;">HMM + GMM/DNN</div>
              <div style="font-size: 0.68rem; color: #64748B; margin-top: 0.2rem;">P(Acoustics | Phonemes)</div>
            </div>
            <div style="font-size: 1.1rem; color: #2563EB; font-weight: 900;">➔</div>
            <div style="background: #FAF5FF; border: 1.5px solid #7C3AED; border-radius: 6px; padding: 0.65rem 0.5rem;">
              <div style="font-weight: 800; font-size: 0.8rem; color: #581C87;">Pronunciation Lexicon</div>
              <div style="font-size: 0.7rem; color: #7C3AED; margin-top: 0.2rem;">ARPAbet Mapping</div>
              <div style="font-size: 0.68rem; color: #64748B; margin-top: 0.2rem;">Words ➔ Phones (/k æ t/)</div>
            </div>
            <div style="font-size: 1.1rem; color: #7C3AED; font-weight: 900;">➔</div>
            <div style="background: #ECFDF5; border: 1.5px solid #059669; border-radius: 6px; padding: 0.65rem 0.5rem;">
              <div style="font-weight: 800; font-size: 0.8rem; color: #064E3B;">Language Model</div>
              <div style="font-size: 0.7rem; color: #059669; margin-top: 0.2rem;">N-Gram (SRILM / KenLM)</div>
              <div style="font-size: 0.68rem; color: #64748B; margin-top: 0.2rem;">P(W₁ W₂ ... Wₙ)</div>
            </div>
          </div>
          <div style="background: #FEF2F2; border-left: 3px solid #EF4444; border-radius: 4px; padding: 0.45rem 0.7rem; margin-top: 0.75rem; font-size: 0.75rem; color: #991B1B;">
            ⚠️ <strong>Error Cascade:</strong> If the Acoustic Model misidentifies a phoneme, the Lexicon cannot map it, and the Viterbi Decoder fails globally. Requires expensive hand-curated phonetic dictionaries.
          </div>
        `;
      }

      if (summary) {
        summary.innerHTML = '<strong>Classical Modular Pipeline:</strong> 3 separate components trained independently with distinct loss functions. Integrated via complex Weighted Finite-State Transducer (WFST) search.';
      }
    } else {
      // E2E Mode
      if (btnClassical) btnClassical.className = 'btn-action btn-action-secondary';
      if (btnE2E) btnE2E.className = 'btn-action btn-action-primary';

      if (display) {
        display.innerHTML = `
          <div style="display: grid; grid-template-columns: 0.9fr auto 1.4fr auto 0.9fr; align-items: center; gap: 0.5rem; text-align: center;">
            <div style="background: #FEF3C7; border: 1.5px solid #D97706; border-radius: 6px; padding: 0.65rem 0.5rem;">
              <div style="font-weight: 800; font-size: 0.8rem; color: #78350F;">Log Mel Spectrogram</div>
              <div style="font-size: 0.7rem; color: #D97706; margin-top: 0.2rem;">80-Channel Filterbanks</div>
              <div style="font-size: 0.68rem; color: #64748B; margin-top: 0.2rem;">Raw Audio Input</div>
            </div>
            <div style="font-size: 1.1rem; color: #2563EB; font-weight: 900;">➔</div>
            <div style="background: linear-gradient(135deg, #EFF6FF, #EEF2FF); border: 2px solid #2563EB; border-radius: 6px; padding: 0.75rem 0.6rem;">
              <div style="display: flex; justify-content: center; gap: 0.35rem; margin-bottom: 0.3rem;">
                <span class="asr-badge asr-badge-features" style="font-size: 0.65rem;">Encoder</span>
                <span class="asr-badge asr-badge-language" style="font-size: 0.65rem;">Decoder</span>
              </div>
              <div style="font-weight: 800; font-size: 0.85rem; color: #1E3A8A;">End-to-End Neural Model</div>
              <div style="font-size: 0.72rem; color: #2563EB; font-weight: 700; margin-top: 0.15rem;">Conformer / Whisper / RNN-T</div>
              <div style="font-size: 0.68rem; color: #475569; margin-top: 0.2rem;">Direct P(Text Sequence | Audio Spectrogram)</div>
            </div>
            <div style="font-size: 1.1rem; color: #059669; font-weight: 900;">➔</div>
            <div style="background: #ECFDF5; border: 1.5px solid #059669; border-radius: 6px; padding: 0.65rem 0.5rem;">
              <div style="font-weight: 800; font-size: 0.8rem; color: #064E3B;">Text Tokens</div>
              <div style="font-size: 0.7rem; color: #059669; margin-top: 0.2rem;">Byte-Pair (BPE)</div>
              <div style="font-size: 0.68rem; color: #64748B; margin-top: 0.2rem;">Punctuated Output</div>
            </div>
          </div>
          <div style="background: #F0FDF4; border-left: 3px solid #10B981; border-radius: 4px; padding: 0.45rem 0.7rem; margin-top: 0.75rem; font-size: 0.75rem; color: #065F46;">
            ✨ <strong>Single Unified Optimization:</strong> Trained end-to-end with Cross-Entropy or CTC Loss. Zero pronunciation dictionary needed; inherently models language context and accents together!
          </div>
        `;
      }

      if (summary) {
        summary.innerHTML = '<strong>Modern End-to-End Paradigm:</strong> Single deep neural network replacing all 3 classical components. Scalable across 100+ languages with zero alignment pre-processing.';
      }
    }
    this.playSound('blip');
  }

  // ========================================================================
  // SLIDE 5 INTERACTION: LIVE TRANSCRIPTION & WER EVALUATION SIMULATOR
  // ========================================================================
  simulateTranscription(sampleId) {
    const samples = {
      1: {
        domain: 'Medical Diagnosis',
        reference: 'The patient was prescribed amoxicillin 500 milligrams daily',
        hypothesis: 'The patient was prescribed amoxicillin 500 milligrams daily',
        substitutions: 0,
        deletions: 0,
        insertions: 0,
        tokens: ['The', 'patient', 'was', 'prescribed', 'amoxicillin', '500', 'milligrams', 'daily']
      },
      2: {
        domain: 'Financial Earnings Call',
        reference: 'Quarterly revenue surpassed consensus estimates by four percent',
        hypothesis: 'Quarterly revenue surpassed continuous estimates by 4 percent',
        substitutions: 1, // "continuous" instead of "consensus"
        deletions: 0,
        insertions: 0,
        tokens: ['Quarterly', 'revenue', 'surpassed', '<span style="color: #EF4444; font-weight: 800; text-decoration: underline;" title="Substitution: consensus -> continuous">continuous</span>', 'estimates', 'by', '4', 'percent']
      },
      3: {
        domain: 'Artificial Intelligence & NLP',
        reference: 'Attention is all you need for transformer speech recognition',
        hypothesis: 'Attention is all you need for transformer speech recognition',
        substitutions: 0,
        deletions: 0,
        insertions: 0,
        tokens: ['Attention', 'is', 'all', 'you', 'need', 'for', 'transformer', 'speech', 'recognition']
      }
    };

    const s = samples[sampleId] || samples[3];
    const box = document.getElementById('stt-transcription-box');
    const werOutput = document.getElementById('stt-wer-output');
    const statusBadge = document.getElementById('live-stt-status');

    if (this.transcriptionTimeout) clearTimeout(this.transcriptionTimeout);

    if (statusBadge) {
      statusBadge.className = 'asr-badge asr-badge-audio';
      statusBadge.innerText = 'Transcribing Stream...';
    }

    if (box) {
      box.innerHTML = `
        <div style="font-size: 0.74rem; font-weight: 700; color: #2563EB; text-transform: uppercase; margin-bottom: 0.4rem;">
          Input Audio Stream (${s.domain}):
        </div>
        <div id="token-stream-target" style="font-size: 1.05rem; font-weight: 700; color: #0F172A; min-height: 2.2rem; display: flex; flex-wrap: wrap; gap: 0.35rem; align-items: center;">
          <span style="color: #94A3B8; font-style: italic; font-size: 0.86rem;">Processing acoustic frames...</span>
        </div>
      `;
    }

    if (werOutput) {
      werOutput.innerHTML = `
        <div style="color: #64748B; font-style: italic;">Computing Word Error Rate alignment matrix...</div>
      `;
    }

    // Sequentially emit tokens
    let curToken = 0;
    const emitNext = () => {
      const streamTarget = document.getElementById('token-stream-target');
      if (!streamTarget) return;

      if (curToken === 0) {
        streamTarget.innerHTML = '';
      }

      if (curToken < s.tokens.length) {
        const span = document.createElement('span');
        span.innerHTML = s.tokens[curToken];
        span.style.animation = 'fadeIn 0.2s ease-in';
        streamTarget.appendChild(span);
        this.playSound('blip');
        curToken++;
        this.transcriptionTimeout = setTimeout(emitNext, 180);
      } else {
        // Completed
        if (statusBadge) {
          statusBadge.className = 'asr-badge asr-badge-language';
          statusBadge.innerText = 'Completed ✓';
        }
        this.playSound('success');

        // Calculate WER
        const N = s.tokens.length;
        const S = s.substitutions;
        const D = s.deletions;
        const I = s.insertions;
        const wer = (((S + D + I) / N) * 100).toFixed(1);
        const accuracy = (100 - parseFloat(wer)).toFixed(1);

        if (werOutput) {
          werOutput.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.35rem;">
              <span style="font-weight: 800; color: #0F172A; font-size: 0.82rem;">Reference: <i>“${s.reference}”</i></span>
              <span class="asr-badge ${wer === '0.0' ? 'asr-badge-language' : 'asr-badge-features'}">
                WER: ${wer}%
              </span>
            </div>
            <div style="display: flex; gap: 0.75rem; font-size: 0.76rem; color: #475569; background: #F8FAFC; padding: 0.4rem 0.6rem; border-radius: 4px;">
              <span>Total Words (N): <strong>${N}</strong></span>
              <span>Substitutions (S): <strong style="color: ${S > 0 ? '#EF4444' : '#059669'};">${S}</strong></span>
              <span>Deletions (D): <strong>${D}</strong></span>
              <span>Insertions (I): <strong>${I}</strong></span>
              <span style="margin-left: auto; color: #2563EB; font-weight: 800;">Accuracy: ${accuracy}%</span>
            </div>
          `;
        }
      }
    };

    this.transcriptionTimeout = setTimeout(emitNext, 300);
  }

  // ========================================================================
  // SLIDE 6 INTERACTION: CELEBRATION
  // ========================================================================
  celebratePresentation() {
    this.playSound('celebrate');
    // Visual confetti effect
    const count = 40;
    const colors = ['#2563EB', '#059669', '#7C3AED', '#D97706', '#3B82F6', '#10B981'];

    for (let i = 0; i < count; i++) {
      const c = document.createElement('div');
      c.className = 'confetti-piece';
      c.style.cssText = `
        position: fixed;
        width: ${Math.random() * 8 + 6}px;
        height: ${Math.random() * 8 + 6}px;
        background: ${colors[Math.floor(Math.random() * colors.length)]};
        left: ${Math.random() * 100}vw;
        top: -20px;
        border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
        z-index: 99999;
        pointer-events: none;
        opacity: 0.9;
        transition: transform 2.5s cubic-bezier(0.25, 1, 0.5, 1), opacity 2.5s ease;
      `;
      document.body.appendChild(c);

      setTimeout(() => {
        const destY = window.innerHeight + 50;
        const destX = (Math.random() - 0.5) * 200;
        const rotate = Math.random() * 720;
        c.style.transform = `translate(${destX}px, ${destY}px) rotate(${rotate}deg)`;
        c.style.opacity = '0';
      }, 20);

      setTimeout(() => {
        c.remove();
      }, 2600);
    }
  }
}

// Instantiate and expose globally
window.sttApp = new STTApp();

// Robust Lifecycle Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.sttApp.init();
  });
} else {
  window.sttApp.init();
}

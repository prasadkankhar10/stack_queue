// ==========================================================================
// LEX & YACC PRESENTATION ORCHESTRATOR & INTERACTION CONTROLLER
// Handles Animations, Speaker Notes Narration, Laser Pointer, and Step-by-Step Simulators
// ==========================================================================

class LexYaccApp {
  constructor() {
    this.slides = window.lexYaccSlidesData || [];
    this.currentIndex = 0;
    this.isLaserPointerActive = false;
    this.laserDot = null;
    this.isHeaderHidden = localStorage.getItem('lex_header_hidden') === 'true';
    this.audioEnabled = true;
    this.audioCtx = null;

    // Scanner state for Slide 3
    this.currentLexIndex = 0;
    this.lexTokensData = [
      { lexeme: 'total', type: 'IDENTIFIER', cls: 'token-id' },
      { lexeme: '=', type: 'ASSIGN', cls: 'token-op' },
      { lexeme: '10', type: 'NUMBER', cls: 'token-num' },
      { lexeme: '+', type: 'PLUS', cls: 'token-op' },
      { lexeme: '20', type: 'NUMBER', cls: 'token-num' },
      { lexeme: ';', type: 'SEMICOLON', cls: 'token-delim' }
    ];
    this.autoLexInterval = null;

    // Calculator step state for Slide 5
    this.currentCalcStep = 1;
    this.autoCalcInterval = null;
  }

  init() {
    // Re-bind DOM elements on init
    this.slides = window.lexYaccSlidesData || [];
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

  // Audio Engine
  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) this.audioCtx = new AudioContext();
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
        osc.frequency.setValueAtTime(540, now);
        osc.frequency.exponentialRampToValueAtTime(840, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'nav') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.exponentialRampToValueAtTime(660, now + 0.1);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.1);
        osc.start(now);
        osc.stop(now + 0.1);
      } else if (type === 'success') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.setValueAtTime(659.25, now + 0.08);
        osc.frequency.setValueAtTime(783.99, now + 0.16);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'error') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(220, now);
        osc.frequency.linearRampToValueAtTime(140, now + 0.18);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);
        osc.start(now);
        osc.stop(now + 0.2);
      } else if (type === 'celebrate') {
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.07);
          g.gain.setValueAtTime(0.08, now + i * 0.07);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.07 + 0.4);
          o.start(now + i * 0.07);
          o.stop(now + i * 0.07 + 0.4);
        });
      }
    } catch(e) {}
  }

  toggleAudio() {
    this.audioEnabled = !this.audioEnabled;
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      btn.classList.toggle('active', this.audioEnabled);
      btn.querySelector('.btn-label-text').innerText = this.audioEnabled ? 'Sound' : 'Muted';
    }
    if (this.audioEnabled) this.playSound('blip');
  }

  // Laser Pointer
  initLaserPointer() {
    if (this.laserDot) return;
    this.laserDot = document.createElement('div');
    this.laserDot.id = 'presentation-laser-dot';
    this.laserDot.style.cssText = `
      position: fixed;
      width: 12px;
      height: 12px;
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

  // Header Hide/Show
  toggleHeader() {
    this.isHeaderHidden = !this.isHeaderHidden;
    document.body.classList.toggle('header-hidden', this.isHeaderHidden);
    localStorage.setItem('lex_header_hidden', this.isHeaderHidden ? 'true' : 'false');
    const fBtn = document.getElementById('footer-header-toggle-btn');
    if (fBtn) fBtn.classList.toggle('active', this.isHeaderHidden);
    this.playSound('blip');
  }

  // Slide Rendering
  renderSlide(index) {
    if (!this.slides || this.slides.length === 0) {
      this.slides = window.lexYaccSlidesData || [];
    }
    if (index < 0 || index >= this.slides.length) return;
    
    // Clear any active auto intervals
    if (this.autoLexInterval) { clearInterval(this.autoLexInterval); this.autoLexInterval = null; }
    if (this.autoCalcInterval) { clearInterval(this.autoCalcInterval); this.autoCalcInterval = null; }

    this.currentIndex = index;
    const slide = this.slides[index];

    if (!this.stageEl) {
      this.stageEl = document.getElementById('slide-stage');
    }
    if (this.sectionPillEl) {
      this.sectionPillEl.innerText = slide.part || 'Compiler Design';
    }

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

    if (typeof slide.init === 'function') {
      try {
        slide.init();
      } catch (err) {
        console.error('Error initializing slide ' + slide.id + ':', err);
      }
    }

    this.updateControls();
    window.history.replaceState(null, null, '#' + slide.id);

    if (this.notesBody) {
      this.notesBody.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.65rem;">
          <h3 style="color: var(--accent-blue); font-size: 1.1rem; margin: 0;">Slide ${this.currentIndex + 1}: ${slide.title}</h3>
          <span style="font-size: 0.76rem; font-weight: 700; background: #F1F5F9; padding: 0.2rem 0.55rem; border-radius: 4px; color: #475569;">
            ${slide.duration || 'Presentation'}
          </span>
        </div>
        <div style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.6;">
          ${slide.notes || 'No speaker notes available for this slide.'}
        </div>
      `;
    }
  }

  updateControls() {
    const total = this.slides.length;
    const current = this.currentIndex + 1;

    if (this.counterEl) {
      const paddedCurrent = String(current).padStart(2, '0');
      const paddedTotal = String(total).padStart(2, '0');
      this.counterEl.innerHTML = 'SLIDE <b>' + paddedCurrent + '</b> / ' + paddedTotal;
    }

    if (this.progressBarEl) {
      const pct = (current / total) * 100;
      this.progressBarEl.style.width = pct + '%';
    }

    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    if (prevBtn) prevBtn.disabled = this.currentIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentIndex === total - 1;

    document.querySelectorAll('.overview-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === this.currentIndex);
    });
  }

  nextSlide() {
    if (!this.slides || this.slides.length === 0) {
      this.slides = window.lexYaccSlidesData || [];
    }
    if (this.currentIndex < this.slides.length - 1) {
      this.playSound('nav');
      this.renderSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (!this.slides || this.slides.length === 0) {
      this.slides = window.lexYaccSlidesData || [];
    }
    if (this.currentIndex > 0) {
      this.playSound('nav');
      this.renderSlide(this.currentIndex - 1);
    }
  }

  goToSlide(index) {
    if (!this.slides || this.slides.length === 0) {
      this.slides = window.lexYaccSlidesData || [];
    }
    if (index >= 0 && index < this.slides.length) {
      this.playSound('nav');
      this.renderSlide(index);
      this.closeModals();
    }
  }

  toggleOverview() {
    if (!this.overviewModal) this.overviewModal = document.getElementById('overview-modal');
    if (!this.overviewModal) return;
    const isOpen = this.overviewModal.classList.contains('show') || this.overviewModal.classList.contains('active');
    if (isOpen) {
      this.overviewModal.classList.remove('show', 'active');
    } else {
      this.overviewModal.classList.add('show', 'active');
    }
    this.playSound('blip');
  }

  toggleNotes() {
    if (!this.notesModal) this.notesModal = document.getElementById('notes-modal');
    if (!this.notesModal) return;
    const isOpen = this.notesModal.classList.contains('show') || this.notesModal.classList.contains('active');
    if (isOpen) {
      this.notesModal.classList.remove('show', 'active');
    } else {
      this.notesModal.classList.add('show', 'active');
    }
    this.playSound('blip');
  }

  closeModals() {
    if (this.overviewModal) this.overviewModal.classList.remove('show', 'active');
    if (this.notesModal) this.notesModal.classList.remove('show', 'active');
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
    this.playSound('blip');
  }

  buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;
    grid.innerHTML = '';

    this.slides.forEach((s, idx) => {
      const card = document.createElement('div');
      card.className = 'overview-thumb' + (idx === this.currentIndex ? ' active' : '');
      card.onclick = () => this.goToSlide(idx);
      card.innerHTML = `
        <div style="font-size: 0.72rem; font-weight: 800; color: var(--accent-blue); text-transform: uppercase;">
          ${s.partNumber} ${s.duration ? `• ${s.duration}` : ''}
        </div>
        <div style="font-size: 0.88rem; font-weight: 800; color: #0F172A; margin: 0.2rem 0;">
          ${s.title}
        </div>
        <div style="font-size: 0.74rem; color: #64748B; line-height: 1.3;">
          ${s.subtitle || ''}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        this.nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'Backspace' || e.key === 'PageUp') {
        e.preventDefault();
        this.prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        this.goToSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        this.goToSlide(this.slides.length - 1);
      } else if (e.key.toLowerCase() === 'h') {
        e.preventDefault();
        this.toggleHeader();
      } else if (e.key.toLowerCase() === 'l') {
        e.preventDefault();
        this.toggleLaserPointer();
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        this.toggleFullscreen();
      } else if (e.key.toLowerCase() === 'p' || e.key.toLowerCase() === 'n') {
        e.preventDefault();
        this.toggleNotes();
      } else if (e.key.toLowerCase() === 'o' || e.key === 'Escape') {
        e.preventDefault();
        this.toggleOverview();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        this.toggleAudio();
      }
    });
  }

  // ========================================================================
  // SLIDE 1: Title Simulation / Animation
  // ========================================================================
  playTitleAnimation() {
    const s1 = document.getElementById('anim-stage-1');
    const s2 = document.getElementById('anim-stage-2');
    const s3 = document.getElementById('anim-stage-3');
    const a1 = document.getElementById('anim-arrow-1');
    const aConn = document.getElementById('anim-arrow-connect');
    const status = document.getElementById('title-anim-status');

    if (!s1 || !s2 || !s3) return;

    s1.style.opacity = '0'; s1.style.transform = 'translateY(8px)';
    s2.style.opacity = '0'; s2.style.transform = 'translateY(8px)';
    s3.style.opacity = '0'; s3.style.transform = 'translateY(8px)';
    if (a1) a1.style.opacity = '0';
    if (aConn) aConn.style.opacity = '0';

    setTimeout(() => {
      s1.style.opacity = '1';
      s1.style.transform = 'translateY(0)';
      this.playSound('blip');
      if (status) status.innerHTML = '<span>1. Title Displayed</span>';
    }, 200);

    setTimeout(() => {
      if (a1) a1.style.opacity = '1';
      s2.style.opacity = '1';
      s2.style.transform = 'translateY(0)';
      this.playSound('blip');
      if (status) status.innerHTML = '<span>2. Revealed LEX — Lexical Analysis</span>';
    }, 800);

    setTimeout(() => {
      s3.style.opacity = '1';
      s3.style.transform = 'translateY(0)';
      this.playSound('blip');
      if (status) status.innerHTML = '<span>3. Revealed YACC — Syntax Analysis</span>';
    }, 1400);

    setTimeout(() => {
      if (aConn) {
        aConn.style.opacity = '1';
        aConn.style.transform = 'scale(1.05)';
        setTimeout(() => aConn.style.transform = 'scale(1)', 300);
      }
      this.playSound('success');
      if (status) status.innerHTML = '<span style="color: #059669; font-weight: 700;">4. Tools Connected (yylex passes tokens)</span>';
    }, 2000);
  }

  // ========================================================================
  // SLIDE 2: Introduction Simulation / Animation
  // ========================================================================
  revealIntroStage(step) {
    const s1 = document.getElementById('intro-stage-1');
    const s2 = document.getElementById('intro-stage-2');
    const s3 = document.getElementById('intro-stage-3');
    if (!s1 || !s2 || !s3) return;

    if (step === 1) {
      s1.style.opacity = '1'; s1.classList.add('active-step');
      s2.style.opacity = '0.35'; s2.classList.remove('active-step');
      s3.style.opacity = '0.35'; s3.classList.remove('active-step');
      this.playSound('blip');
    } else if (step === 2) {
      s1.style.opacity = '1'; s1.classList.remove('active-step');
      s2.style.opacity = '1'; s2.classList.add('active-step');
      s3.style.opacity = '0.35'; s3.classList.remove('active-step');
      this.playSound('blip');
    } else if (step === 3) {
      s1.style.opacity = '1'; s1.classList.remove('active-step');
      s2.style.opacity = '1'; s2.classList.remove('active-step');
      s3.style.opacity = '1'; s3.classList.add('active-step');
      this.playSound('success');
    }
  }

  autoPlayIntroStages() {
    this.revealIntroStage(1);
    setTimeout(() => this.revealIntroStage(2), 700);
    setTimeout(() => this.revealIntroStage(3), 1400);
  }

  // ========================================================================
  // SLIDE 3: LEX Scanner Simulation
  // ========================================================================
  updateLexScannerView() {
    const tape = document.getElementById('lex-code-tape');
    const lexemeEl = document.getElementById('scanner-current-lexeme');
    const tokenEl = document.getElementById('scanner-current-token');
    const badgeEl = document.getElementById('scanner-step-badge');
    const prevBtn = document.getElementById('scanner-prev-btn');
    const nextBtn = document.getElementById('scanner-next-btn');

    if (!tape || !lexemeEl || !tokenEl) return;

    const cur = this.lexTokensData[this.currentLexIndex];

    tape.innerHTML = this.lexTokensData.map((item, idx) => {
      const isCur = idx === this.currentLexIndex;
      return `
        <span style="
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          color: ${isCur ? '#FFFFFF' : '#94A3B8'};
          background: ${isCur ? '#2563EB' : 'transparent'};
          border: 1px solid ${isCur ? '#60A5FA' : 'transparent'};
          transition: all 0.25s ease;
        ">
          ${item.lexeme}
        </span>
      `;
    }).join(' ');

    lexemeEl.innerText = cur.lexeme;
    tokenEl.innerHTML = `<span class="token-badge ${cur.cls}" style="font-size: 1.05rem; padding: 0.35rem 0.95rem;">${cur.type}</span>`;
    if (badgeEl) badgeEl.innerText = `Token ${this.currentLexIndex + 1} of ${this.lexTokensData.length}`;

    this.lexTokensData.forEach((_, i) => {
      const row = document.getElementById(`tbl-row-${i}`);
      if (row) {
        if (i === this.currentLexIndex) {
          row.style.background = '#EFF6FF';
          row.style.fontWeight = '700';
        } else {
          row.style.background = 'transparent';
          row.style.fontWeight = 'normal';
        }
      }
    });

    if (prevBtn) prevBtn.disabled = this.currentLexIndex === 0;
    if (nextBtn) nextBtn.disabled = this.currentLexIndex === this.lexTokensData.length - 1;
  }

  nextLexToken() {
    if (this.currentLexIndex < this.lexTokensData.length - 1) {
      this.currentLexIndex++;
      this.playSound('blip');
      this.updateLexScannerView();
    }
  }

  prevLexToken() {
    if (this.currentLexIndex > 0) {
      this.currentLexIndex--;
      this.playSound('blip');
      this.updateLexScannerView();
    }
  }

  toggleAutoLexScan() {
    const btn = document.getElementById('scanner-auto-btn');
    if (this.autoLexInterval) {
      clearInterval(this.autoLexInterval);
      this.autoLexInterval = null;
      if (btn) btn.innerHTML = '▶ Auto Scan';
    } else {
      if (this.currentLexIndex >= this.lexTokensData.length - 1) {
        this.currentLexIndex = 0;
      }
      this.updateLexScannerView();
      if (btn) btn.innerHTML = '⏸ Pause';
      this.autoLexInterval = setInterval(() => {
        if (this.currentLexIndex < this.lexTokensData.length - 1) {
          this.nextLexToken();
        } else {
          clearInterval(this.autoLexInterval);
          this.autoLexInterval = null;
          if (btn) btn.innerHTML = '▶ Auto Scan';
        }
      }, 900);
    }
  }

  // ========================================================================
  // SLIDE 4: YACC Interactive Comparison
  // ========================================================================
  testYaccExpr(isValid) {
    const validBox = document.getElementById('yacc-box-valid');
    const invalidBox = document.getElementById('yacc-box-invalid');
    if (!validBox || !invalidBox) return;

    if (isValid) {
      this.playSound('success');
      validBox.style.transform = 'scale(1.03)';
      validBox.style.boxShadow = '0 6px 18px rgba(16, 185, 129, 0.25)';
      invalidBox.style.transform = 'scale(1)';
      invalidBox.style.boxShadow = 'none';
      setTimeout(() => validBox.style.transform = 'scale(1)', 400);
    } else {
      this.playSound('error');
      invalidBox.style.transform = 'scale(1.03)';
      invalidBox.style.boxShadow = '0 6px 18px rgba(239, 68, 68, 0.25)';
      validBox.style.transform = 'scale(1)';
      validBox.style.boxShadow = 'none';
      setTimeout(() => invalidBox.style.transform = 'scale(1)', 400);
    }
  }

  autoPlayYaccDemo() {
    this.testYaccExpr(true);
    setTimeout(() => this.testYaccExpr(false), 1200);
  }

  // ========================================================================
  // SLIDE 5: Calculator Demonstration
  // ========================================================================
  updateCalcStepView() {
    const card = document.getElementById('calc-step-card');
    const counter = document.getElementById('calc-step-counter');
    const prevBtn = document.getElementById('calc-prev-btn');
    const nextBtn = document.getElementById('calc-next-btn');
    if (!card) return;

    if (counter) counter.innerText = `${this.currentCalcStep} of 4`;

    if (this.currentCalcStep === 1) {
      card.innerHTML = `
        <div style="font-size: 0.78rem; font-weight: 800; color: #64748B; text-transform: uppercase; margin-bottom: 0.35rem;">
          Step 1: User input
        </div>
        <div style="font-family: var(--font-mono); font-size: 2rem; font-weight: 900; color: #2563EB; margin-bottom: 0.35rem;">
          10 + 20
        </div>
        <div style="font-size: 0.84rem; color: #475569;">
          The user enters an arithmetic expression into the calculator.
        </div>
      `;
      this.playSound('blip');
    } else if (this.currentCalcStep === 2) {
      card.innerHTML = `
        <div style="font-size: 0.78rem; font-weight: 800; color: #0284C7; text-transform: uppercase; margin-bottom: 0.35rem;">
          Step 2: LEX Lexical Analysis
        </div>
        <div style="display: flex; gap: 0.4rem; align-items: center; margin-bottom: 0.5rem;">
          <span class="token-badge token-num" style="font-size: 0.95rem;">NUMBER(10)</span>
          <span class="token-badge token-op" style="font-size: 0.95rem;">PLUS</span>
          <span class="token-badge token-num" style="font-size: 0.95rem;">NUMBER(20)</span>
        </div>
        <div style="font-size: 0.84rem; color: #475569;">
          LEX identifies the characters as numbers and arithmetic operator tokens.
        </div>
      `;
      this.playSound('blip');
    } else if (this.currentCalcStep === 3) {
      card.innerHTML = `
        <div style="font-size: 0.78rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; margin-bottom: 0.35rem;">
          Step 3: YACC Syntax Analysis
        </div>
        <div style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: #7C3AED; margin-bottom: 0.35rem;">
          expr → expr + term  ✓
        </div>
        <div style="font-size: 0.84rem; color: #475569;">
          YACC checks whether the tokens form a valid arithmetic expression according to grammar.
        </div>
      `;
      this.playSound('blip');
    } else if (this.currentCalcStep === 4) {
      card.innerHTML = `
        <div style="font-size: 0.78rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 0.35rem;">
          Step 4: Calculator Evaluation
        </div>
        <div style="font-family: var(--font-mono); font-size: 2.2rem; font-weight: 900; color: #059669; margin-bottom: 0.25rem;">
          Output: 30
        </div>
        <div style="font-size: 0.84rem; color: #475569;">
          The calculator evaluates the accepted expression and computes the result: 10 + 20 = 30.
        </div>
      `;
      this.playSound('success');
    }

    if (prevBtn) prevBtn.disabled = this.currentCalcStep === 1;
    if (nextBtn) nextBtn.disabled = this.currentCalcStep === 4;
  }

  nextCalcStep() {
    if (this.currentCalcStep < 4) {
      this.currentCalcStep++;
      this.updateCalcStepView();
    }
  }

  prevCalcStep() {
    if (this.currentCalcStep > 1) {
      this.currentCalcStep--;
      this.updateCalcStepView();
    }
  }

  autoPlayCalcDemo() {
    if (this.autoCalcInterval) {
      clearInterval(this.autoCalcInterval);
      this.autoCalcInterval = null;
    }
    this.currentCalcStep = 1;
    this.updateCalcStepView();
    this.autoCalcInterval = setInterval(() => {
      if (this.currentCalcStep < 4) {
        this.nextCalcStep();
      } else {
        clearInterval(this.autoCalcInterval);
        this.autoCalcInterval = null;
      }
    }, 1100);
  }

  // ========================================================================
  // SLIDE 6: Conclusion Animation Sequence
  // ========================================================================
  playConclusionAnimation() {
    const s1 = document.getElementById('concl-step-1');
    const s2 = document.getElementById('concl-step-2');
    const s3 = document.getElementById('concl-step-3');
    const s4 = document.getElementById('concl-step-4');

    if (!s1 || !s2 || !s3 || !s4) return;

    s1.style.opacity = '0'; s1.style.transform = 'translateY(6px)';
    s2.style.opacity = '0'; s2.style.transform = 'translateY(6px)';
    s3.style.opacity = '0'; s3.style.transform = 'translateY(6px)';
    s4.style.opacity = '0'; s4.style.transform = 'scale(0.96)';

    setTimeout(() => {
      s1.style.opacity = '1'; s1.style.transform = 'translateY(0)';
      this.playSound('blip');
    }, 200);

    setTimeout(() => {
      s2.style.opacity = '1'; s2.style.transform = 'translateY(0)';
      this.playSound('blip');
    }, 700);

    setTimeout(() => {
      s3.style.opacity = '1'; s3.style.transform = 'translateY(0)';
      this.playSound('blip');
    }, 1200);

    setTimeout(() => {
      s4.style.opacity = '1'; s4.style.transform = 'scale(1)';
      this.playSound('celebrate');
    }, 1800);
  }

  celebratePresentation() {
    this.playSound('celebrate');
    alert('🎉 Presentation successfully completed!\n\nPrasad Anil Kankhar\nDepartment of CSE • MIT');
  }
}

// Global initialization ensuring it runs regardless of DOM ready state
const lexYaccApp = new LexYaccApp();
window.lexYaccApp = lexYaccApp;
window.app = lexYaccApp;

// Direct window helper shortcuts
window.nextSlide = () => window.lexYaccApp.nextSlide();
window.prevSlide = () => window.lexYaccApp.prevSlide();
window.goToSlide = (idx) => window.lexYaccApp.goToSlide(idx);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => lexYaccApp.init());
} else {
  lexYaccApp.init();
}

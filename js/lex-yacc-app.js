// ==========================================================================
// LEX & YACC PRESENTATION ORCHESTRATOR & INTERACTION CONTROLLER
// Academic Light Theme | Full Presentation Engine
// ==========================================================================

class LexYaccApp {
  constructor() {
    this.slides = window.lexYaccSlidesData || [];
    this.currentIndex = 0;
    this.stageEl = document.getElementById('slide-stage');
    this.counterEl = document.getElementById('slide-counter');
    this.progressBarEl = document.getElementById('progress-bar');
    this.sectionPillEl = document.getElementById('current-section-pill');
    this.overviewModal = document.getElementById('overview-modal');
    this.notesModal = document.getElementById('notes-modal');
    this.notesBody = document.getElementById('notes-body');
    this.isLaserPointerActive = false;
    this.laserDot = null;
    this.isHeaderHidden = localStorage.getItem('lex_header_hidden') === 'true';
    this.audioEnabled = true;

    // Web Audio Context
    this.audioCtx = null;
  }

  init() {
    // Check URL hash for direct slide navigation
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

  // Procedural Sound Generator (Web Audio API)
  initAudio() {
    if (!this.audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.audioCtx = new AudioContext();
      }
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
        osc.frequency.exponentialRampToValueAtTime(880, now + 0.08);
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
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.setValueAtTime(659.25, now + 0.08); // E5
        osc.frequency.setValueAtTime(783.99, now + 0.16); // G5
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
        // Chord sequence
        [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
          const o = this.audioCtx.createOscillator();
          const g = this.audioCtx.createGain();
          o.connect(g);
          g.connect(this.audioCtx.destination);
          o.type = 'triangle';
          o.frequency.setValueAtTime(freq, now + i * 0.06);
          g.gain.setValueAtTime(0.07, now + i * 0.06);
          g.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.35);
          o.start(now + i * 0.06);
          o.stop(now + i * 0.06 + 0.35);
        });
      }
    } catch(e) {
      // Audio fallback silent
    }
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
    if (index < 0 || index >= this.slides.length) return;
    this.currentIndex = index;
    const slide = this.slides[index];

    if (this.sectionPillEl) {
      this.sectionPillEl.innerText = slide.part || 'Compiler Design';
    }

    const html = `
      <div class="slide active" id="${slide.id}">
        <div class="slide-header">
          <div class="slide-tag">
            <span aria-hidden="true">●</span>
            <span>${slide.partNumber || ''} — ${slide.part || ''}</span>
          </div>
          <h1 class="slide-title">${slide.title}</h1>
          <div class="slide-subtitle">${slide.subtitle || ''}</div>
        </div>
        <div class="slide-body">
          ${typeof slide.render === 'function' ? slide.render() : ''}
        </div>
      </div>
    `;

    this.stageEl.innerHTML = html;

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
        <h3 style="color: var(--accent-blue); margin-bottom: 0.5rem;">Slide ${this.currentIndex + 1}: ${slide.title}</h3>
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

  toggleOverview() {
    if (!this.overviewModal) return;
    const isOpen = this.overviewModal.classList.contains('active');
    if (isOpen) {
      this.overviewModal.classList.remove('active');
    } else {
      this.overviewModal.classList.add('active');
    }
    this.playSound('blip');
  }

  toggleNotes() {
    if (!this.notesModal) return;
    const isOpen = this.notesModal.classList.contains('active');
    if (isOpen) {
      this.notesModal.classList.remove('active');
    } else {
      this.notesModal.classList.add('active');
    }
    this.playSound('blip');
  }

  closeModals() {
    if (this.overviewModal) this.overviewModal.classList.remove('active');
    if (this.notesModal) this.notesModal.classList.remove('active');
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
        <div style="font-size: 0.75rem; font-weight: 800; color: var(--accent-blue); text-transform: uppercase;">
          ${s.partNumber}
        </div>
        <div style="font-size: 0.9rem; font-weight: 800; color: #0F172A; margin: 0.25rem 0;">
          ${s.title}
        </div>
        <div style="font-size: 0.76rem; color: #64748B; line-height: 1.3;">
          ${s.subtitle || ''}
        </div>
      `;
      grid.appendChild(card);
    });
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      // Don't hijack keys if user is editing inputs or contenteditable
      if (['INPUT', 'TEXTAREA'].includes(e.target.tagName) || e.target.isContentEditable) {
        return;
      }

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
  // SLIDE SPECIFIC INTERACTIVE SIMULATIONS
  // ========================================================================

  // Slide 1: Hero Pipeline Simulation
  testHeroPipeline() {
    const nodes = [
      document.getElementById('hero-node-1'),
      document.getElementById('hero-node-2'),
      document.getElementById('hero-node-3'),
      document.getElementById('hero-node-4')
    ];
    const statusPill = document.getElementById('hero-status-pill');

    nodes.forEach(n => { if (n) n.classList.remove('active-step'); });
    if (statusPill) statusPill.innerHTML = `<span>Simulating: <strong>Streaming Characters...</strong></span><span style="color: #2563EB;">● Processing</span>`;

    nodes.forEach((node, i) => {
      setTimeout(() => {
        nodes.forEach(n => { if (n) n.classList.remove('active-step'); });
        if (node) node.classList.add('active-step');
        this.playSound('blip');

        if (statusPill) {
          if (i === 0) statusPill.innerHTML = `<span>Input: <strong>Reading Source Code...</strong></span>`;
          if (i === 1) statusPill.innerHTML = `<span>Step 1: <strong>LEX Regex Matching & Tokenizing...</strong></span>`;
          if (i === 2) statusPill.innerHTML = `<span>Step 2: <strong>YACC Grammar & Parse Tree Building...</strong></span>`;
          if (i === 3) {
            statusPill.innerHTML = `<span>Result: <strong>AST Generated & Validated!</strong></span><span style="color: #059669; font-weight: 700;">✅ Success</span>`;
            this.playSound('success');
          }
        }
      }, i * 600);
    });
  }

  // Slide 2: Phase Visualizer
  showIntroPhase(phase) {
    const disp = document.getElementById('intro-phase-display');
    const desc = document.getElementById('intro-phase-desc');
    const btnRaw = document.getElementById('btn-phase-raw');
    const btnLex = document.getElementById('btn-phase-lex');
    const btnYacc = document.getElementById('btn-phase-yacc');

    [btnRaw, btnLex, btnYacc].forEach(b => { if (b) b.classList.remove('active'); });

    if (phase === 'raw') {
      if (btnRaw) btnRaw.classList.add('active');
      if (disp) {
        disp.innerHTML = `
          <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.4rem;">
            Raw Character Stream in RAM:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.25rem;">
            ${'position = initial + rate * 60;'.split('').map(c => `
              <span style="display: inline-block; width: 26px; height: 30px; line-height: 28px; text-align: center; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px; font-family: var(--font-mono); font-size: 0.85rem; font-weight: 700; color: #0F172A;">
                ${c === ' ' ? '␣' : c}
              </span>
            `).join('')}
          </div>
        `;
      }
      if (desc) {
        desc.innerHTML = `<strong>Step 1: Raw Characters</strong> — Source file is read as an unclassified sequence of ASCII characters, spaces, and punctuation.`;
      }
      this.playSound('blip');
    } else if (phase === 'lex') {
      if (btnLex) btnLex.classList.add('active');
      if (disp) {
        disp.innerHTML = `
          <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.4rem;">
            Tokens Emitted by LEX Scanner:
          </div>
          <div style="display: flex; flex-wrap: wrap; gap: 0.4rem;">
            <span class="token-badge token-id">&lt;ID, "position"&gt;</span>
            <span class="token-badge token-op">&lt;ASSIGN, "="&gt;</span>
            <span class="token-badge token-id">&lt;ID, "initial"&gt;</span>
            <span class="token-badge token-op">&lt;PLUS, "+"&gt;</span>
            <span class="token-badge token-id">&lt;ID, "rate"&gt;</span>
            <span class="token-badge token-op">&lt;STAR, "*"&gt;</span>
            <span class="token-badge token-num">&lt;NUM, 60&gt;</span>
            <span class="token-badge token-delim">&lt;SEMI, ";"&gt;</span>
          </div>
        `;
      }
      if (desc) {
        desc.innerHTML = `<strong>Step 2: Lexical Analysis (LEX)</strong> — Strips whitespace and comments; groups character patterns into structured token tuples with attributes.`;
      }
      this.playSound('blip');
    } else if (phase === 'yacc') {
      if (btnYacc) btnYacc.classList.add('active');
      if (disp) {
        disp.innerHTML = `
          <div style="font-size: 0.78rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; margin-bottom: 0.4rem;">
            Hierarchical Syntax Tree Built by YACC:
          </div>
          <svg viewBox="0 0 400 130" style="width: 100%; height: 120px;">
            <!-- Tree lines -->
            <line x1="200" y1="20" x2="100" y2="60" class="tree-edge-line" />
            <line x1="200" y1="20" x2="300" y2="60" class="tree-edge-line" />
            <line x1="300" y1="60" x2="240" y2="105" class="tree-edge-line" />
            <line x1="300" y1="60" x2="350" y2="105" class="tree-edge-line" />
            <!-- Root = -->
            <circle cx="200" cy="20" r="16" class="tree-node-circle" style="stroke: #7C3AED;" />
            <text x="200" y="20" class="tree-node-text">=</text>
            <!-- Left: position -->
            <circle cx="100" cy="60" r="16" class="tree-node-circle" />
            <text x="100" y="60" class="tree-node-text" style="font-size: 9px;">position</text>
            <!-- Right: + -->
            <circle cx="300" cy="60" r="16" class="tree-node-circle" style="stroke: #7C3AED;" />
            <text x="300" y="60" class="tree-node-text">+</text>
            <!-- Children of + -->
            <circle cx="240" cy="105" r="14" class="tree-node-circle" />
            <text x="240" y="105" class="tree-node-text" style="font-size: 9px;">initial</text>
            <circle cx="350" cy="105" r="14" class="tree-node-circle" style="stroke: #059669;" />
            <text x="350" y="105" class="tree-node-text" style="font-size: 8px;">rate * 60</text>
          </svg>
        `;
      }
      if (desc) {
        desc.innerHTML = `<strong>Step 3: Syntax Analysis (YACC)</strong> — Validates grammatical precedence (<code>*</code> binds before <code>+</code>) and generates a parse tree for execution.`;
      }
      this.playSound('success');
    }
  }

  // Slide 3: LEX Tokenizer Simulator
  setLexPreset(text) {
    const input = document.getElementById('lex-input-code');
    if (input) input.value = text;
    this.runLexTokenizer();
  }

  runLexTokenizer() {
    const input = document.getElementById('lex-input-code');
    const container = document.getElementById('lex-token-stream');
    const inspector = document.getElementById('lex-token-inspector');
    if (!input || !container) return;

    const code = input.value.trim();
    if (!code) return;

    // Tokenizer regex definitions
    const tokens = [];
    let pos = 0;
    while (pos < code.length) {
      const rest = code.slice(pos);

      // Whitespace
      const ws = rest.match(/^[ \t\n]+/);
      if (ws) {
        pos += ws[0].length;
        continue;
      }

      // Identifier
      const id = rest.match(/^[a-zA-Z_][a-zA-Z0-9_]*/);
      if (id) {
        tokens.push({
          type: 'IDENTIFIER',
          val: id[0],
          cls: 'token-id',
          regex: '[a-zA-Z_][a-zA-Z0-9_]*',
          action: 'return IDENTIFIER;'
        });
        pos += id[0].length;
        continue;
      }

      // Number
      const num = rest.match(/^[0-9]+/);
      if (num) {
        tokens.push({
          type: 'NUMBER',
          val: num[0],
          cls: 'token-num',
          regex: '[0-9]+',
          action: 'yylval = atoi(yytext); return NUMBER;'
        });
        pos += num[0].length;
        continue;
      }

      // Operators
      if (rest[0] === '=') {
        tokens.push({ type: 'ASSIGN_OP', val: '=', cls: 'token-op', regex: '=', action: 'return ASSIGN;' });
        pos++; continue;
      }
      if (rest[0] === '+') {
        tokens.push({ type: 'PLUS_OP', val: '+', cls: 'token-op', regex: '\\+', action: 'return PLUS;' });
        pos++; continue;
      }
      if (rest[0] === '-') {
        tokens.push({ type: 'MINUS_OP', val: '-', cls: 'token-op', regex: '-', action: 'return MINUS;' });
        pos++; continue;
      }
      if (rest[0] === '*') {
        tokens.push({ type: 'STAR_OP', val: '*', cls: 'token-op', regex: '\\*', action: 'return MULTIPLY;' });
        pos++; continue;
      }
      if (rest[0] === ';') {
        tokens.push({ type: 'SEMICOLON', val: ';', cls: 'token-delim', regex: ';', action: 'return SEMICOLON;' });
        pos++; continue;
      }

      // Unknown
      tokens.push({ type: 'CHAR', val: rest[0], cls: 'token-delim', regex: '.', action: 'return yytext[0];' });
      pos++;
    }

    container.innerHTML = tokens.map((t, idx) => `
      <span class="token-badge ${t.cls}" style="cursor: pointer;" onclick="lexYaccApp.inspectLexToken(${idx})" title="Click to inspect LEX rule">
        <strong>${t.type}:</strong> "${t.val}"
      </span>
    `).join('');

    this.currentLexTokens = tokens;
    this.playSound('blip');

    if (inspector) {
      inspector.innerHTML = `
        <span style="color: #059669; font-weight: 700;">✓ Successfully scanned ${tokens.length} tokens.</span>
        Click any token badge to view its Regular Expression and DFA rule.
      `;
    }
  }

  inspectLexToken(idx) {
    if (!this.currentLexTokens || !this.currentLexTokens[idx]) return;
    const t = this.currentLexTokens[idx];
    const inspector = document.getElementById('lex-token-inspector');
    if (!inspector) return;

    this.playSound('blip');
    inspector.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
        <span style="font-weight: 800; color: #2563EB;">Token: ${t.type} ("${t.val}")</span>
        <span class="token-badge ${t.cls}" style="font-size: 0.72rem;">LEX Rule Match</span>
      </div>
      <div style="font-family: var(--font-mono); font-size: 0.78rem; color: #334155; line-height: 1.4;">
        <div><strong>Regular Expression:</strong> <code>${t.regex}</code></div>
        <div><strong>Action in lex.l:</strong> <code>${t.action}</code></div>
      </div>
    `;
  }

  // Slide 4: YACC Grammar & Parser Simulator
  setYaccPreset(text) {
    const input = document.getElementById('yacc-input-expr');
    if (input) input.value = text;
    this.runYaccParser();
  }

  runYaccParser() {
    const input = document.getElementById('yacc-input-expr');
    const container = document.getElementById('yacc-result-container');
    const statusBar = document.getElementById('yacc-status-bar');
    if (!input || !container) return;

    const raw = input.value.trim();
    if (!raw) return;

    // Check for syntax error cases
    // Valid grammar: expression -> expression + term | term
    // Missing operand at end: ends with + or begins with +
    if (raw.endsWith('+')) {
      this.playSound('error');
      container.innerHTML = `
        <div style="text-align: center; padding: 1.5rem;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⚠️</div>
          <div style="font-size: 1rem; font-weight: 800; color: #DC2626;">YACC Parse Rejection (LALR Shift/Reduce Error)</div>
          <div style="font-size: 0.85rem; color: #475569; margin-top: 0.25rem;">Expected <code>term</code> (operand or identifier) after <code>'+'</code>, but encountered <code>EOF</code>.</div>
        </div>
      `;
      if (statusBar) {
        statusBar.innerHTML = `
          <div class="syntax-error-banner">
            <span style="font-size: 1.1rem;">❌</span>
            <div>
              <strong>yyerror("Syntax Error: Missing right operand after '+'"):</strong><br>
              In production <code>expression → expression + term</code>, right-hand <code>term</code> was not found. Parser halted immediately.
            </div>
          </div>
        `;
      }
      return;
    }

    if (raw.startsWith('+')) {
      this.playSound('error');
      container.innerHTML = `
        <div style="text-align: center; padding: 1.5rem;">
          <div style="font-size: 2.2rem; margin-bottom: 0.5rem;">⚠️</div>
          <div style="font-size: 1rem; font-weight: 800; color: #DC2626;">YACC Parse Rejection</div>
          <div style="font-size: 0.85rem; color: #475569; margin-top: 0.25rem;">Unexpected leading binary operator <code>'+'</code> without initial expression.</div>
        </div>
      `;
      if (statusBar) {
        statusBar.innerHTML = `
          <div class="syntax-error-banner">
            <span style="font-size: 1.1rem;">❌</span>
            <div>
              <strong>yyerror("Syntax Error: Unexpected token '+' at column 1"):</strong><br>
              Grammar requires an initial <code>term</code> before an operator.
            </div>
          </div>
        `;
      }
      return;
    }

    // Split by '+'
    const parts = raw.split('+').map(p => p.trim());
    if (parts.length >= 2) {
      // Valid binary expression: expression -> expression + term
      this.playSound('success');
      container.innerHTML = `
        <svg viewBox="0 0 380 200" style="width: 100%; height: 100%;">
          <!-- Edges -->
          <line x1="190" y1="30" x2="110" y2="90" class="tree-edge-line" />
          <line x1="190" y1="30" x2="190" y2="90" class="tree-edge-line" />
          <line x1="190" y1="30" x2="270" y2="90" class="tree-edge-line" />
          
          <line x1="110" y1="90" x2="110" y2="150" class="tree-edge-line" />
          <line x1="270" y1="90" x2="270" y2="150" class="tree-edge-line" />

          <!-- Root: expression -->
          <circle cx="190" cy="30" r="20" class="tree-node-circle" style="stroke: #7C3AED;" />
          <text x="190" y="30" class="tree-node-text" style="font-size: 11px;">expr</text>

          <!-- Children: expr, +, term -->
          <circle cx="110" cy="90" r="18" class="tree-node-circle" />
          <text x="110" y="90" class="tree-node-text" style="font-size: 10px;">expr</text>

          <circle cx="190" cy="90" r="16" class="tree-node-circle" style="stroke: #D97706;" />
          <text x="190" y="90" class="tree-node-text" style="font-size: 14px;">+</text>

          <circle cx="270" cy="90" r="18" class="tree-node-circle" />
          <text x="270" y="90" class="tree-node-text" style="font-size: 10px;">term</text>

          <!-- Leaves: values -->
          <circle cx="110" cy="150" r="16" class="tree-node-circle" style="stroke: #2563EB;" />
          <text x="110" y="150" class="tree-node-text" style="font-size: 10px;">${parts[0]}</text>

          <circle cx="270" cy="150" r="16" class="tree-node-circle" style="stroke: #059669;" />
          <text x="270" y="150" class="tree-node-text" style="font-size: 10px;">${parts[1]}</text>
        </svg>
      `;

      if (statusBar) {
        statusBar.innerHTML = `
          <div style="background: #ECFDF5; border: 1.5px solid #10B981; color: #065F46; border-radius: var(--radius-md); padding: 0.6rem 0.85rem; font-size: 0.82rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>✅</span>
            <div><strong>Valid Syntax Tree Generated:</strong> Matched production rule <code>expression → expression + term</code>. 0 Errors!</div>
          </div>
        `;
      }
    } else {
      // Single term
      this.playSound('success');
      container.innerHTML = `
        <svg viewBox="0 0 380 160" style="width: 100%; height: 100%;">
          <line x1="190" y1="40" x2="190" y2="110" class="tree-edge-line" />
          <circle cx="190" cy="40" r="20" class="tree-node-circle" style="stroke: #7C3AED;" />
          <text x="190" y="40" class="tree-node-text" style="font-size: 11px;">expr</text>
          <circle cx="190" cy="110" r="18" class="tree-node-circle" style="stroke: #2563EB;" />
          <text x="190" y="110" class="tree-node-text" style="font-size: 11px;">${parts[0]}</text>
        </svg>
      `;
      if (statusBar) {
        statusBar.innerHTML = `
          <div style="background: #ECFDF5; border: 1.5px solid #10B981; color: #065F46; border-radius: var(--radius-md); padding: 0.6rem 0.85rem; font-size: 0.82rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>✅</span>
            <div><strong>Valid Syntax Tree Generated:</strong> Matched rule <code>expression → term</code>. 0 Errors!</div>
          </div>
        `;
      }
    }
  }

  // Slide 5: Real-World Calculator Demo
  setCalcPreset(text) {
    const input = document.getElementById('calc-input-expr');
    if (input) input.value = text;
    this.runCalculatorDemo();
  }

  runCalculatorDemo() {
    const input = document.getElementById('calc-input-expr');
    const tokenContainer = document.getElementById('calc-lex-tokens');
    const evalOutput = document.getElementById('calc-eval-output');
    if (!input || !tokenContainer || !evalOutput) return;

    const expr = input.value.trim();
    if (!expr) return;

    // Tokenize
    const tokens = [];
    let pos = 0;
    while (pos < expr.length) {
      const c = expr[pos];
      if (c === ' ') { pos++; continue; }
      if (/\d/.test(c)) {
        let num = '';
        while (pos < expr.length && /\d/.test(expr[pos])) {
          num += expr[pos];
          pos++;
        }
        tokens.push({ type: 'NUM', val: num, cls: 'token-num' });
        continue;
      }
      if (c === '+') tokens.push({ type: 'PLUS', val: '+', cls: 'token-op' });
      else if (c === '-') tokens.push({ type: 'MINUS', val: '-', cls: 'token-op' });
      else if (c === '*') tokens.push({ type: 'MUL', val: '*', cls: 'token-op' });
      else if (c === '/') tokens.push({ type: 'DIV', val: '/', cls: 'token-op' });
      else if (c === '(') tokens.push({ type: 'LPAREN', val: '(', cls: 'token-delim' });
      else if (c === ')') tokens.push({ type: 'RPAREN', val: ')', cls: 'token-delim' });
      pos++;
    }

    tokenContainer.innerHTML = tokens.map(t => `
      <span class="token-badge ${t.cls}" style="font-size: 0.72rem; padding: 0.2rem 0.45rem;">
        ${t.type}${t.type === 'NUM' ? `(${t.val})` : ''}
      </span>
    `).join('');

    // Safe mathematical evaluation
    try {
      // Clean safe expression containing only numbers and allowed operators
      const safeExpr = expr.replace(/[^0-9+\-*/().]/g, '');
      const result = Function('"use strict";return (' + safeExpr + ')')();

      this.playSound('success');
      evalOutput.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
          <span style="color: #475569; font-size: 0.8rem;">Evaluated Expression: <code>${expr}</code></span>
          <span class="token-badge token-num" style="font-size: 0.78rem;">Result</span>
        </div>
        <div style="font-size: 1.25rem; font-weight: 800; color: #059669;">
          = ${result}
        </div>
      `;
    } catch(err) {
      this.playSound('error');
      evalOutput.innerHTML = `
        <div style="color: #DC2626; font-size: 0.82rem;">
          ❌ Evaluation Error: Invalid expression syntax.
        </div>
      `;
    }
  }

  // Slide 6: Celebrate Lecture
  celebratePresentation() {
    this.playSound('celebrate');
    alert('🎉 Presentation successfully completed! Great work teaching LEX & YACC to your students.');
  }
}

// Global initialization
window.addEventListener('DOMContentLoaded', () => {
  window.lexYaccApp = new LexYaccApp();
  window.lexYaccApp.init();
});

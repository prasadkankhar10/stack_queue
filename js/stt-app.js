// ==========================================================================
// SPEECH TO TEXT (STT) PRESENTATION ORCHESTRATOR & INTERACTION CONTROLLER
// 12-Slide Lecture Edition: Signal Processing, Physics, CTC, Conformer & Whisper
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
    this.hmmFrame = 1;
    this.transcriptionTimeout = null;
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
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(270, now);
        gain.gain.setValueAtTime(0.06, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
        osc.start(now);
        osc.stop(now + 0.3);
      } else if (type === 'fricative-tone') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(3600, now);
        gain.gain.setValueAtTime(0.035, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);
        osc.start(now);
        osc.stop(now + 0.22);
      } else if (type === 'stop-tone') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);
        osc.start(now);
        osc.stop(now + 0.06);
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
      console.warn('Audio synthesis note:', e);
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
  // CLASSROOM LASER POINTER & ZEN MODE
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

    if (this.waveAnimId) {
      cancelAnimationFrame(this.waveAnimId);
      this.waveAnimId = null;
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
          <span style="font-size: 0.82rem; color: #64748B; font-weight: 700;">⏱️ ${slide.duration || '40s'}</span>
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

    nodes.forEach(n => {
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
          setTimeout(() => { if (n) n.style.transform = 'scale(1)'; }, 180);
        }
        if (status && idx === nodes.length - 1) {
          status.innerHTML = '● Pipeline Active & Ready for Decoding';
          this.playSound('success');
        }
      }, (idx + 1) * 280);
    });
  }

  // ========================================================================
  // SLIDE 2 INTERACTION: CONTINUOUS GAP
  // ========================================================================
  showContinuousGap(id) {
    const b1 = document.getElementById('btn-gap-1');
    const b2 = document.getElementById('btn-gap-2');
    if (b1 && b2) {
      b1.className = id === 1 ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      b2.className = id === 2 ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const card = document.getElementById('gap-display-card');
    if (!card) return;

    if (id === 1) {
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="color: #0F172A; font-size: 0.9rem;">Phrase: "Speech recognition"</strong>
          <span class="asr-badge asr-badge-acoustic">2 Words | 1 Continuous Wave</span>
        </div>
        <div style="background: #0F172A; border-radius: 4px; padding: 0.5rem 0.75rem; color: #38BDF8; font-family: monospace; font-size: 0.76rem; margin-bottom: 0.5rem;">
          Continuous Audio: ~~~/\/\/\~/\/\/\/\/\/\/\/\/\/\/\~~~ (Zero physical silence between words!)
        </div>
        <div style="font-size: 0.78rem; color: #475569; line-height: 1.45;">
          • <strong>Human Auditory Perception:</strong> The brain hallucinates a clean gap between "speech" and "recognition".<br>
          • <strong>Acoustic Reality:</strong> The final /tʃ/ of "speech" blends seamlessly into the initial /r/ of "recognition" through co-articulation.
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <strong style="color: #0F172A; font-size: 0.9rem;">Phrase: "How to recognize speech"</strong>
          <span class="asr-badge asr-badge-language">Acoustic Ambiguity</span>
        </div>
        <div style="background: #0F172A; border-radius: 4px; padding: 0.5rem 0.75rem; color: #F59E0B; font-family: monospace; font-size: 0.76rem; margin-bottom: 0.5rem;">
          Identical Acoustic Stream: /haʊ tə rɛkənaɪz spiːtʃ/ &equiv; /haʊ tə rɛk ə naɪs biːtʃ/
        </div>
        <div style="font-size: 0.78rem; color: #475569; line-height: 1.45;">
          • Candidate 1: <em>"How to recognize speech"</em> (Meaningful, high LM prior)<br>
          • Candidate 2: <em>"How to wreck a nice beach"</em> (Nonsense in context, low LM prior)<br>
          • <strong>Takeaway:</strong> Without language understanding, the acoustic model cannot separate the words.
        </div>
      `;
    }
    this.playSound('blip');
  }

  // ========================================================================
  // SLIDE 3 INTERACTION: SAMPLING & DIGITIZER
  // ========================================================================
  setDigitizerMode(sampleRate, bitDepth) {
    const b16 = document.getElementById('btn-rate-16k');
    const b8 = document.getElementById('btn-rate-8k');
    if (b16 && b8) {
      b16.className = sampleRate === 16 ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      b8.className = sampleRate === 8 ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const box = document.getElementById('digitizer-telemetry-box');
    if (!box) return;

    if (sampleRate === 16) {
      this.playSound('blip');
      box.innerHTML = `
        <div style="color: #38BDF8; font-weight: 800; font-size: 0.82rem;">TELEMETRY: 16 kHz / 16-BIT LINEAR PCM</div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Nyquist Bandwidth:</span>
          <span style="color: #10B981; font-weight: 700;">Up to 8,000 Hz (Full Formant Spectrum)</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Discrete Quantization Levels:</span>
          <span style="color: #F8FAFC;">2¹⁶ = 65,536 Amplitude Steps</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Theoretical Dynamic Range:</span>
          <span style="color: #F8FAFC;">96.3 dB (Noise Floor Inaudible)</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Bitrate Stream:</span>
          <span style="color: #F8FAFC;">256 kbps Raw Audio</span>
        </div>
      `;
    } else {
      this.playSound('fricative-tone');
      box.innerHTML = `
        <div style="color: #F59E0B; font-weight: 800; font-size: 0.82rem;">TELEMETRY: 8 kHz / 8-BIT &mu;-LAW TELEPHONY</div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Nyquist Bandwidth:</span>
          <span style="color: #EF4444; font-weight: 700;">Only 4,000 Hz (High Fricatives Clipped!)</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Discrete Quantization Levels:</span>
          <span style="color: #F8FAFC;">2⁸ = 256 Amplitude Steps</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Theoretical Dynamic Range:</span>
          <span style="color: #EF4444;">48.1 dB (Noticeable Quantization Hiss)</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-top: 0.25rem;">
          <span style="color: #94A3B8;">Bitrate Stream:</span>
          <span style="color: #F8FAFC;">64 kbps Narrowband Audio</span>
        </div>
      `;
    }
  }

  // ========================================================================
  // SLIDE 4 INTERACTION: PHONEME EXPLORER
  // ========================================================================
  inspectPhoneme(type) {
    const bv = document.getElementById('btn-phone-vowel');
    const bs = document.getElementById('btn-phone-stop');
    const bf = document.getElementById('btn-phone-fric');
    if (bv && bs && bf) {
      bv.className = type === 'vowel' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      bs.className = type === 'stop' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      bf.className = type === 'fricative' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const card = document.getElementById('phoneme-display-card');
    if (!card) return;

    if (type === 'vowel') {
      this.playSound('vowel-tone');
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #1E3A8A; font-size: 0.95rem;">Vowel /i:/ (ARPAbet: IY, as in "see")</strong>
          <span class="asr-badge asr-badge-acoustic">Periodic & Harmonic</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.78rem; margin: 0.4rem 0;">
          <div style="background: #FFFFFF; padding: 0.4rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            <strong>Formant F1 (Jaw Height):</strong> 270 Hz (Low F1 = High Tongue)
          </div>
          <div style="background: #FFFFFF; padding: 0.4rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            <strong>Formant F2 (Tongue Front):</strong> 2,290 Hz (High F2 = Fronted)
          </div>
        </div>
        <div style="font-size: 0.76rem; color: #475569;">
          • Acoustic Characteristics: Vocal cords vibrate periodically; air flows unobstructed; maximum acoustic power.
        </div>
      `;
    } else if (type === 'stop') {
      this.playSound('stop-tone');
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #7C3AED; font-size: 0.95rem;">Plosive Stop /t/ (ARPAbet: T, as in "tea")</strong>
          <span class="asr-badge asr-badge-pronunciation">Transient Burst</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.78rem; margin: 0.4rem 0;">
          <div style="background: #FFFFFF; padding: 0.4rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            <strong>Silent Closure:</strong> 40–80 ms complete air blockage
          </div>
          <div style="background: #FFFFFF; padding: 0.4rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            <strong>Release Burst:</strong> Sudden spike at 3,500–4,500 Hz
          </div>
        </div>
        <div style="font-size: 0.76rem; color: #475569;">
          • Acoustic Characteristics: Total silent pressure build-up followed by an instantaneous explosive burst upon release.
        </div>
      `;
    } else {
      this.playSound('fricative-tone');
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center;">
          <strong style="color: #D97706; font-size: 0.95rem;">Fricative /s/ (ARPAbet: S, as in "sea")</strong>
          <span class="asr-badge asr-badge-audio">Turbulent Noise</span>
        </div>
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.4rem; font-size: 0.78rem; margin: 0.4rem 0;">
          <div style="background: #FFFFFF; padding: 0.4rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            <strong>Constriction Site:</strong> Alveolar ridge narrow jet
          </div>
          <div style="background: #FFFFFF; padding: 0.4rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            <strong>Acoustic Energy:</strong> Heavy high-pass noise &gt; 4,000 Hz
          </div>
        </div>
        <div style="font-size: 0.76rem; color: #475569;">
          • Acoustic Characteristics: Non-periodic aperiodic turbulence; air forced through a constricted channel against teeth.
        </div>
      `;
    }
  }

  // ========================================================================
  // SLIDE 5 INTERACTION: WAVEFORM & MEL SPECTROGRAM
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

      ctx.strokeStyle = '#1E293B';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, centerY);
      ctx.lineTo(width, centerY);
      ctx.stroke();

      ctx.beginPath();
      ctx.lineWidth = 2.5;

      if (this.waveType === 'vowel') {
        ctx.strokeStyle = '#0284C7';
        for (let x = 0; x < width; x++) {
          const t = x * 0.05 + this.wavePhase;
          const y = centerY + Math.sin(t) * 18 + Math.sin(t * 2.6) * 10;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else if (this.waveType === 'fricative') {
        ctx.strokeStyle = '#D97706';
        for (let x = 0; x < width; x++) {
          const noise = (Math.random() - 0.5) * 32;
          const y = centerY + noise * Math.sin(x * 0.02);
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
      } else {
        ctx.strokeStyle = '#10B981';
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
      if (label) label.innerText = 'F1=700Hz, F2=1200Hz Harmonics';
      this.playSound('vowel-tone');
    } else if (type === 'fricative') {
      if (badge) { badge.className = 'asr-badge asr-badge-audio'; badge.innerText = 'Turbulent Fricative'; }
      if (label) label.innerText = 'Aperiodic High Freq &gt; 3500Hz';
      this.playSound('fricative-tone');
    } else {
      if (badge) { badge.className = 'asr-badge asr-badge-text'; badge.innerText = 'Multi-Phone Word'; }
      if (label) label.innerText = 'Modulated Speech Envelope';
      this.playSound('blip');
    }

    this.renderSpectrogramBars(type);
  }

  renderSpectrogramBars(type) {
    const container = document.getElementById('spectrogram-visualizer');
    if (!container) return;
    container.innerHTML = '';

    const barCount = 20;
    for (let i = 0; i < barCount; i++) {
      let heightPct = 20;
      if (type === 'vowel') {
        heightPct = i < 8 ? (85 - i * 7 + Math.random() * 10) : (15 + Math.random() * 15);
      } else if (type === 'fricative') {
        heightPct = i > 10 ? (45 + (i - 10) * 5 + Math.random() * 15) : (10 + Math.random() * 10);
      } else {
        heightPct = Math.sin(i * 0.45) * 35 + 50 + (Math.random() * 10);
      }
      heightPct = Math.min(95, Math.max(10, heightPct));

      const bar = document.createElement('div');
      bar.style.flex = '1';
      bar.style.height = `${heightPct}%`;
      bar.style.borderRadius = '2px 2px 0 0';
      if (type === 'vowel') bar.style.background = '#0284C7';
      else if (type === 'fricative') bar.style.background = '#D97706';
      else bar.style.background = '#10B981';

      container.appendChild(bar);
    }
  }

  // ========================================================================
  // SLIDE 6 INTERACTION: HMM 3-STATE TRELLIS
  // ========================================================================
  resetHMMTrellis() {
    this.hmmFrame = 1;
    this.updateHMMDisplay();
  }

  stepHMMTrellis() {
    this.hmmFrame = (this.hmmFrame % 5) + 1;
    this.playSound('blip');
    this.updateHMMDisplay();
  }

  updateHMMDisplay() {
    const card = document.getElementById('hmm-trellis-display');
    if (!card) return;

    const frame = this.hmmFrame;
    // Map frame 1..5 to HMM State 1, 2, 3
    let activeState = 1;
    if (frame === 1 || frame === 2) activeState = 1;
    else if (frame === 3 || frame === 4) activeState = 2;
    else activeState = 3;

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
        <span style="font-weight: 800; color: #0F172A; font-size: 0.88rem;">Current Acoustic Frame: t = ${frame} (Frame ${frame * 10} ms)</span>
        <span class="asr-badge asr-badge-acoustic">Active State: S${activeState}</span>
      </div>

      <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 0.5rem;">
        <div style="background: ${activeState === 1 ? '#EFF6FF' : '#FFFFFF'}; border: 1.5px solid ${activeState === 1 ? '#2563EB' : '#E2E8F0'}; border-radius: 6px; padding: 0.5rem; text-align: center;">
          <div style="font-weight: 800; color: #1E3A8A; font-size: 0.82rem;">S₁: Onset Phase</div>
          <div style="font-size: 0.7rem; color: #64748B; margin-top: 0.2rem;">Self-loop: a₁₁ = 0.7<br>Trans: a₁₂ = 0.3</div>
        </div>

        <div style="background: ${activeState === 2 ? '#FAF5FF' : '#FFFFFF'}; border: 1.5px solid ${activeState === 2 ? '#7C3AED' : '#E2E8F0'}; border-radius: 6px; padding: 0.5rem; text-align: center;">
          <div style="font-weight: 800; color: #581C87; font-size: 0.82rem;">S₂: Kernel Steady</div>
          <div style="font-size: 0.7rem; color: #64748B; margin-top: 0.2rem;">Self-loop: a₂₂ = 0.8<br>Trans: a₂₃ = 0.2</div>
        </div>

        <div style="background: ${activeState === 3 ? '#ECFDF5' : '#FFFFFF'}; border: 1.5px solid ${activeState === 3 ? '#059669' : '#E2E8F0'}; border-radius: 6px; padding: 0.5rem; text-align: center;">
          <div style="font-weight: 800; color: #064E3B; font-size: 0.82rem;">S₃: Offset Release</div>
          <div style="font-size: 0.7rem; color: #64748B; margin-top: 0.2rem;">Self-loop: a₃₃ = 0.6<br>Exit Phone: 0.4</div>
        </div>
      </div>

      <div style="font-size: 0.76rem; color: #475569; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.4rem 0.6rem; border-radius: 4px;">
        Viterbi Backpointer: Frame ${frame} aligns best to <strong>State S${activeState}</strong> with Gaussian log-likelihood = ${(-12.4 + (frame * 1.8)).toFixed(1)}.
      </div>
    `;
  }

  // ========================================================================
  // SLIDE 7 INTERACTION: CTC ALIGNMENT & COLLAPSE
  // ========================================================================
  showCTCAlignment(id) {
    const b1 = document.getElementById('btn-ctc-1');
    const b2 = document.getElementById('btn-ctc-2');
    if (b1 && b2) {
      b1.className = id === 1 ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      b2.className = id === 2 ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const card = document.getElementById('ctc-alignment-display');
    if (!card) return;

    this.playSound('blip');

    const framesA = [
      { t: 't₁', sym: 'ε', isBlank: true },
      { t: 't₂', sym: 'c', isBlank: false },
      { t: 't₃', sym: 'c', isBlank: false },
      { t: 't₄', sym: 'ε', isBlank: true },
      { t: 't₅', sym: 'a', isBlank: false },
      { t: 't₆', sym: 'a', isBlank: false },
      { t: 't₇', sym: 't', isBlank: false },
      { t: 't₈', sym: 'ε', isBlank: true }
    ];

    const framesB = [
      { t: 't₁', sym: 'c', isBlank: false },
      { t: 't₂', sym: 'ε', isBlank: true },
      { t: 't₃', sym: 'ε', isBlank: true },
      { t: 't₄', sym: 'a', isBlank: false },
      { t: 't₅', sym: 'ε', isBlank: true },
      { t: 't₆', sym: 'ε', isBlank: true },
      { t: 't₇', sym: 't', isBlank: false },
      { t: 't₈', sym: 't', isBlank: false }
    ];

    const frames = id === 1 ? framesA : framesB;

    let cellsHtml = frames.map(f => `
      <div class="ctc-cell ${f.isBlank ? 'blank-token' : 'highlight'}">
        <div style="font-size: 0.65rem; color: #94A3B8;">${f.t}</div>
        <div style="font-size: 1rem; font-weight: 800; margin-top: 0.15rem;">${f.sym}</div>
      </div>
    `).join('');

    card.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
        <span style="font-size: 0.8rem; font-weight: 800; color: #0F172A;">Neural Softmax Output Alignment (&pi;)</span>
        <span class="asr-badge asr-badge-features">T = 8 Time Frames</span>
      </div>

      <div class="ctc-grid-container" style="margin-bottom: 0.5rem;">
        ${cellsHtml}
      </div>

      <div style="background: #FFFFFF; border: 1.5px solid #2563EB; border-radius: 6px; padding: 0.5rem 0.75rem; display: flex; align-items: center; justify-content: space-between;">
        <div>
          <span style="font-size: 0.75rem; color: #64748B;">Collapse Operator &Beta;(&pi;):</span>
          <div style="font-size: 0.95rem; font-weight: 800; color: #1E3A8A;">Target Word = "cat"</div>
        </div>
        <span class="asr-badge asr-badge-language" style="font-size: 0.74rem;">Valid Path ✓</span>
      </div>
    `;
  }

  // ========================================================================
  // SLIDE 8 INTERACTION: ARCHITECTURE EXPLORER
  // ========================================================================
  inspectArchitecture(type) {
    const bc = document.getElementById('btn-arch-conformer');
    const br = document.getElementById('btn-arch-rnnt');
    if (bc && br) {
      bc.className = type === 'conformer' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      br.className = type === 'rnnt' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const card = document.getElementById('arch-inspect-display');
    if (!card) return;

    this.playSound('blip');

    if (type === 'conformer') {
      card.innerHTML = `
        <div style="font-weight: 800; color: #0F172A; font-size: 0.88rem; margin-bottom: 0.4rem;">
          Conformer Block: Macaron-Style Interleaved Modules
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.76rem;">
          <div style="background: #EFF6FF; border-left: 3px solid #2563EB; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>1. Feed-Forward Module (0.5x Scale):</strong> Half-step Macaron residual connection.
          </div>
          <div style="background: #FAF5FF; border-left: 3px solid #7C3AED; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>2. Multi-Head Self-Attention:</strong> Learns global temporal context across the entire sentence.
          </div>
          <div style="background: #ECFDF5; border-left: 3px solid #059669; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>3. Depthwise Convolution Module:</strong> Gated linear units (GLU) capture fine-grained local formants.
          </div>
          <div style="background: #EFF6FF; border-left: 3px solid #2563EB; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>4. Feed-Forward Module (0.5x Scale) + LayerNorm:</strong> Final projection with residual sum.
          </div>
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="font-weight: 800; color: #0F172A; font-size: 0.88rem; margin-bottom: 0.4rem;">
          RNN-Transducer (RNN-T): Real-Time Streaming Architecture
        </div>
        <div style="display: flex; flex-direction: column; gap: 0.35rem; font-size: 0.76rem;">
          <div style="background: #EFF6FF; border-left: 3px solid #2563EB; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>Transcription Network (Audio Encoder):</strong> Processes acoustic frames into vectors <i>h</i><sub><i>t</i></sub><sup>enc</sup>.
          </div>
          <div style="background: #FAF5FF; border-left: 3px solid #7C3AED; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>Prediction Network (Language History):</strong> Processes prior emitted labels into vector <i>p</i><sub><i>u</i></sub><sup>pred</sup>.
          </div>
          <div style="background: #ECFDF5; border-left: 3px solid #059669; padding: 0.35rem 0.6rem; border-radius: 3px;">
            <strong>Joint Network:</strong> Combines <i>h</i><sub><i>t</i></sub><sup>enc</sup> and <i>p</i><sub><i>u</i></sub><sup>pred</sup> via dense layer + softmax over vocabulary + &epsilon;.
          </div>
        </div>
      `;
    }
  }

  // ========================================================================
  // SLIDE 9 INTERACTION: WHISPER TOKENS
  // ========================================================================
  showWhisperTokens(mode) {
    const bt = document.getElementById('btn-wh-transcribe');
    const btr = document.getElementById('btn-wh-translate');
    const bts = document.getElementById('btn-wh-timestamps');
    if (bt && btr && bts) {
      bt.className = mode === 'transcribe' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      btr.className = mode === 'translate' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      bts.className = mode === 'timestamps' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const card = document.getElementById('whisper-token-display');
    if (!card) return;

    this.playSound('blip');

    if (mode === 'transcribe') {
      card.innerHTML = `
        <div style="font-weight: 800; color: #1E3A8A; font-size: 0.85rem; margin-bottom: 0.3rem;">
          Standard English Transcription Tokens:
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.5rem;">
          <span class="asr-badge asr-badge-acoustic">&lt;|startoftranscript|&gt;</span>
          <span class="asr-badge asr-badge-language">&lt;|en|&gt;</span>
          <span class="asr-badge asr-badge-features">&lt;|transcribe|&gt;</span>
          <span class="asr-badge asr-badge-audio">&lt;|notimestamps|&gt;</span>
          <span style="padding: 0.25rem 0.6rem; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px; font-weight: 700; color: #0F172A;">Speech recognition in NLP</span>
        </div>
        <div style="font-size: 0.76rem; color: #475569;">
          Decoder prompt forces the model to treat audio as English speech, transcribe directly, and suppress timestamp markers.
        </div>
      `;
    } else if (mode === 'translate') {
      card.innerHTML = `
        <div style="font-weight: 800; color: #581C87; font-size: 0.85rem; margin-bottom: 0.3rem;">
          Direct Speech-to-Text Translation Tokens:
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.5rem;">
          <span class="asr-badge asr-badge-acoustic">&lt;|startoftranscript|&gt;</span>
          <span class="asr-badge asr-badge-language">&lt;|es|&gt;</span>
          <span class="asr-badge asr-badge-features" style="background: #FAF5FF; border-color: #7C3AED; color: #7C3AED;">&lt;|translate|&gt;</span>
          <span class="asr-badge asr-badge-audio">&lt;|notimestamps|&gt;</span>
          <span style="padding: 0.25rem 0.6rem; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px; font-weight: 700; color: #0F172A;">Recognizing speech in Spanish ➔ "Hello world"</span>
        </div>
        <div style="font-size: 0.76rem; color: #475569;">
          Whisper inherently translates non-English audio straight into English text in a single forward pass without a separate MT engine!
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="font-weight: 800; color: #064E3B; font-size: 0.85rem; margin-bottom: 0.3rem;">
          Word-Level Timestamp Tokens (Sub-Second Subtitles):
        </div>
        <div style="display: flex; flex-wrap: wrap; gap: 0.3rem; margin-bottom: 0.5rem;">
          <span class="asr-badge asr-badge-acoustic">&lt;|startoftranscript|&gt;</span>
          <span class="asr-badge asr-badge-language">&lt;|en|&gt;</span>
          <span class="asr-badge asr-badge-features">&lt;|transcribe|&gt;</span>
          <span class="asr-badge asr-badge-audio">&lt;|0.00|&gt;</span>
          <span style="padding: 0.2rem 0.4rem; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px;">Speech</span>
          <span class="asr-badge asr-badge-audio">&lt;|0.62|&gt;</span>
          <span style="padding: 0.2rem 0.4rem; background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: 4px;">recognition</span>
          <span class="asr-badge asr-badge-audio">&lt;|1.40|&gt;</span>
        </div>
        <div style="font-size: 0.76rem; color: #475569;">
          Timestamp tokens are quantized into 20ms steps, enabling automatic subtitle synchronization directly from attention weights.
        </div>
      `;
    }
  }

  // ========================================================================
  // SLIDE 10 INTERACTION: NLP & ITN LAB
  // ========================================================================
  showNLPLab(tab) {
    const bh = document.getElementById('btn-nlp-homo');
    const bi = document.getElementById('btn-nlp-itn');
    if (bh && bi) {
      bh.className = tab === 'homophone' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
      bi.className = tab === 'itn' ? 'btn-action btn-action-primary' : 'btn-action btn-action-secondary';
    }

    const card = document.getElementById('nlp-lab-display');
    if (!card) return;

    this.playSound('blip');

    if (tab === 'homophone') {
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: #0F172A; font-size: 0.88rem;">Acoustic Input: /rɛkənaɪz spiːtʃ/</strong>
          <span class="asr-badge asr-badge-acoustic">Identical Sound</span>
        </div>
        <div style="font-size: 0.76rem; color: #475569; display: flex; flex-direction: column; gap: 0.3rem; margin-bottom: 0.4rem;">
          <div>• Option A: <em>"wreck a nice beach"</em> ➔ P(Acoustic)=98.2%, <strong>P(LM) = 0.0004%</strong></div>
          <div style="color: #1E3A8A; font-weight: 700; background: #EFF6FF; padding: 0.3rem 0.5rem; border-radius: 4px;">
            • Option B: <em>"recognize speech"</em> ➔ P(Acoustic)=98.2%, <strong>P(LM) = 8.7420%</strong>
          </div>
        </div>
        <div style="font-size: 0.76rem; color: #059669; font-weight: 800;">
          Winner: "recognize speech" chosen via argmax [ P(Audio|W) &times; P(W) ].
        </div>
      `;
    } else {
      card.innerHTML = `
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
          <strong style="color: #0F172A; font-size: 0.88rem;">Inverse Text Normalization (ITN) Transformations:</strong>
          <span class="asr-badge asr-badge-language">Rule + WFST / Neural</span>
        </div>
        <div style="font-size: 0.76rem; color: #475569; display: flex; flex-direction: column; gap: 0.35rem;">
          <div style="background: #FFFFFF; padding: 0.35rem 0.55rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            Spoken: <em>"twenty five dollars and fifty cents"</em> ➔ <strong style="color: #2563EB;">$25.50</strong>
          </div>
          <div style="background: #FFFFFF; padding: 0.35rem 0.55rem; border: 1px solid #E2E8F0; border-radius: 4px;">
            Spoken: <em>"meeting at four thirty pm on october twenty seventh"</em> ➔ <strong style="color: #059669;">4:30 PM on 27/10</strong>
          </div>
        </div>
      `;
    }
  }

  // ========================================================================
  // SLIDE 11 INTERACTION: LIVE TRANSCRIPTION & WER SIMULATOR
  // ========================================================================
  simulateTranscription(sampleId) {
    const samples = {
      1: {
        domain: 'Medical Diagnosis',
        reference: 'The patient was prescribed amoxicillin 500 milligrams daily',
        substitutions: 0,
        deletions: 0,
        insertions: 0,
        tokens: ['The', 'patient', 'was', 'prescribed', 'amoxicillin', '500', 'milligrams', 'daily']
      },
      2: {
        domain: 'Financial Earnings Call',
        reference: 'Quarterly revenue surpassed consensus estimates by four percent',
        substitutions: 1,
        deletions: 0,
        insertions: 0,
        tokens: ['Quarterly', 'revenue', 'surpassed', '<span style="color: #EF4444; font-weight: 800; text-decoration: underline;" title="Substitution: consensus -> continuous">continuous</span>', 'estimates', 'by', '4', 'percent']
      },
      3: {
        domain: 'Artificial Intelligence Lecture',
        reference: 'Speech to text conversion uses deep neural networks for speech recognition',
        substitutions: 0,
        deletions: 0,
        insertions: 0,
        tokens: ['Speech', 'to', 'text', 'conversion', 'uses', 'deep', 'neural', 'networks', 'for', 'speech', 'recognition']
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
        <div style="font-size: 0.74rem; font-weight: 700; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem;">
          Input Audio Stream (${s.domain}):
        </div>
        <div id="token-stream-target" style="font-size: 0.95rem; font-weight: 700; color: #0F172A; min-height: 2rem; display: flex; flex-wrap: wrap; gap: 0.3rem; align-items: center;">
          <span style="color: #94A3B8; font-style: italic; font-size: 0.8rem;">Processing acoustic frames...</span>
        </div>
      `;
    }

    if (werOutput) {
      werOutput.innerHTML = `
        <div style="color: #64748B; font-style: italic; font-size: 0.76rem;">Computing Levenshtein dynamic programming alignment matrix...</div>
      `;
    }

    let curToken = 0;
    const emitNext = () => {
      const streamTarget = document.getElementById('token-stream-target');
      if (!streamTarget) return;

      if (curToken === 0) streamTarget.innerHTML = '';

      if (curToken < s.tokens.length) {
        const span = document.createElement('span');
        span.innerHTML = s.tokens[curToken];
        streamTarget.appendChild(span);
        this.playSound('blip');
        curToken++;
        this.transcriptionTimeout = setTimeout(emitNext, 160);
      } else {
        if (statusBadge) {
          statusBadge.className = 'asr-badge asr-badge-language';
          statusBadge.innerText = 'Completed ✓';
        }
        this.playSound('success');

        const N = s.tokens.length;
        const S = s.substitutions;
        const D = s.deletions;
        const I = s.insertions;
        const wer = (((S + D + I) / N) * 100).toFixed(1);
        const accuracy = (100 - parseFloat(wer)).toFixed(1);

        if (werOutput) {
          werOutput.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.3rem;">
              <span style="font-weight: 800; color: #0F172A; font-size: 0.8rem;">Reference: <i>“${s.reference}”</i></span>
              <span class="asr-badge ${wer === '0.0' ? 'asr-badge-language' : 'asr-badge-features'}">
                WER: ${wer}%
              </span>
            </div>
            <div style="display: flex; gap: 0.65rem; font-size: 0.74rem; color: #475569; background: #F8FAFC; padding: 0.35rem 0.55rem; border-radius: 4px;">
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

    this.transcriptionTimeout = setTimeout(emitNext, 250);
  }

  // ========================================================================
  // SLIDE 12 INTERACTION: CELEBRATION
  // ========================================================================
  celebratePresentation() {
    this.playSound('celebrate');
    const count = 45;
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
        opacity: 0.95;
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

      setTimeout(() => c.remove(), 2600);
    }
  }
}

// Instantiate and expose globally
window.sttApp = new STTApp();

// Lifecycle Initialization
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.sttApp.init();
  });
} else {
  window.sttApp.init();
}

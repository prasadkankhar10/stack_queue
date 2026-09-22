// Master Application Orchestrator for VR Architecture Presentation
class VRApp {
  constructor() {
    this.slides = window.vrSlidesData || [];
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
    this.isHeaderHidden = localStorage.getItem('vr_header_hidden') === 'true';
  }

  init() {
    // Check URL hash for direct slide link
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

    // Opening cinematic boot animation if on slide 1
    if (this.currentIndex === 0 && !sessionStorage.getItem('vr_boot_shown')) {
      this.playBootAnimation();
      sessionStorage.setItem('vr_boot_shown', 'true');
    }
  }

  playBootAnimation() {
    const overlay = document.createElement('div');
    overlay.id = 'vr-boot-overlay';
    overlay.style.cssText = 
      position: fixed;
      inset: 0;
      background: #000000;
      z-index: 10000;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      transition: opacity 0.6s ease;
    ;
    overlay.innerHTML = 
      <div id="boot-dot" style="width: 12px; height: 12px; border-radius: 50%; background: #00E5FF; box-shadow: 0 0 25px #00E5FF; transform: scale(1); transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1);"></div>
      <div id="boot-text" style="margin-top: 1.5rem; font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: #FFFFFF; letter-spacing: 0.2em; opacity: 0; transition: opacity 0.5s ease; text-transform: uppercase;">
        INITIALIZING VR PIPELINE...
      </div>
    ;
    document.body.appendChild(overlay);

    vrSound.playHum();

    setTimeout(() => {
      const dot = document.getElementById('boot-dot');
      const text = document.getElementById('boot-text');
      if (dot) dot.style.transform = 'scale(5)';
      if (text) {
        text.style.opacity = '1';
        text.innerHTML = 'VR WORLD INITIALIZED';
      }
      vrSound.playDataPacket();
    }, 600);

    setTimeout(() => {
      overlay.style.opacity = '0';
      vrSound.playSuccess();
      setTimeout(() => overlay.remove(), 600);
    }, 1800);
  }

  replayBootAnimation() {
    this.playBootAnimation();
  }

  renderSlide(index) {
    if (index < 0 || index >= this.slides.length) return;
    this.currentIndex = index;
    const slide = this.slides[index];

    // Update section pill
    if (this.sectionPillEl) {
      this.sectionPillEl.innerText = slide.part;
    }

    // Render slide container HTML
    const html = 
      <div class="slide active" id="slide-">
        <div class="slide-header">
          <div class="slide-tag">
            <span aria-hidden="true">●</span>
            <span>PART  — </span>
          </div>
          <h1 class="slide-title"></h1>
          <div class="slide-subtitle"></div>
        </div>
        <div class="slide-body">
          
        </div>
      </div>
    ;

    this.stageEl.innerHTML = html;

    // Execute slide init function if provided
    if (typeof slide.init === 'function') {
      try {
        slide.init();
      } catch (err) {
        console.error('Error initializing slide ' + slide.id + ':', err);
      }
    }

    // Update controls
    this.updateControls();

    // Update URL hash
    window.history.replaceState(null, null, '#slide-' + slide.id);

    // Update speaker notes
    if (this.notesBody) {
      this.notesBody.innerHTML = 
        <h3 style="color: var(--accent-cyan); margin-bottom: 0.5rem;">Slide : </h3>
        <p style="font-size: 1rem; color: var(--text-primary); line-height: 1.6;"></p>
      ;
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

    // Highlight active thumbnail in overview grid
    document.querySelectorAll('.overview-thumb').forEach((thumb, i) => {
      thumb.classList.toggle('active', i === this.currentIndex);
    });
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      vrSound.playClick();
      this.renderSlide(this.currentIndex + 1);
    }
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      vrSound.playClick();
      this.renderSlide(this.currentIndex - 1);
    }
  }

  goToSlide(slideNumber) {
    const targetIdx = slideNumber - 1;
    if (targetIdx >= 0 && targetIdx < this.slides.length) {
      vrSound.playClick();
      this.renderSlide(targetIdx);
      this.closeModals();
    }
  }

  toggleHeader() {
    this.isHeaderHidden = !this.isHeaderHidden;
    document.body.classList.toggle('header-hidden', this.isHeaderHidden);
    localStorage.setItem('vr_header_hidden', String(this.isHeaderHidden));
    vrSound.playTone(this.isHeaderHidden ? 440 : 660, 'sine', 0.1, 0.06);
    const fBtn = document.getElementById('footer-header-toggle-btn');
    if (fBtn) {
      fBtn.classList.toggle('active', this.isHeaderHidden);
      const label = fBtn.querySelector('.btn-label-text');
      if (label) label.innerText = this.isHeaderHidden ? 'Show Header (H)' : 'Header (H)';
    }
  }

  toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(() => {});
      }
    }
  }

  toggleAudio() {
    const isMuted = vrSound.toggleMute();
    const btn = document.getElementById('sound-toggle-btn');
    if (btn) {
      const label = btn.querySelector('.btn-label-text');
      if (label) label.innerText = isMuted ? 'Muted' : 'Sound';
      btn.classList.toggle('active', !isMuted);
    }
  }

  toggleLaserPointer() {
    this.isLaserPointerActive = !this.isLaserPointerActive;
    if (this.laserDot) {
      this.laserDot.style.display = this.isLaserPointerActive ? 'block' : 'none';
    }
    const btn = document.getElementById('laser-toggle-btn');
    if (btn) btn.classList.toggle('active', this.isLaserPointerActive);
    if (this.isLaserPointerActive) vrSound.playLaser();
  }

  initLaserPointer() {
    this.laserDot = document.createElement('div');
    this.laserDot.id = 'classroom-laser-dot';
    this.laserDot.style.cssText = 
      position: fixed;
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: #EF4444;
      box-shadow: 0 0 16px 4px #EF4444, 0 0 4px #FFFFFF;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      display: none;
      transition: transform 0.04s ease-out;
    ;
    document.body.appendChild(this.laserDot);

    window.addEventListener('mousemove', (e) => {
      if (this.isLaserPointerActive && this.laserDot) {
        this.laserDot.style.left = e.clientX + 'px';
        this.laserDot.style.top = e.clientY + 'px';
      }
    });
  }

  buildOverviewGrid() {
    const grid = document.getElementById('overview-grid');
    if (!grid) return;
    grid.innerHTML = this.slides.map((s, i) => 
      <div class="overview-thumb " onclick="app.goToSlide()">
        <div class="overview-thumb-num">SLIDE </div>
        <div class="overview-thumb-title"></div>
        <div style="font-size: 0.68rem; color: var(--text-muted); font-family: var(--font-mono);"></div>
      </div>
    ).join('');
  }

  toggleOverview() {
    if (this.overviewModal) {
      const isShow = this.overviewModal.classList.toggle('show');
      if (isShow) vrSound.playClick();
    }
  }

  toggleNotes() {
    if (this.notesModal) {
      const isShow = this.notesModal.classList.toggle('show');
      if (isShow) vrSound.playClick();
    }
  }

  closeModals() {
    if (this.overviewModal) this.overviewModal.classList.remove('show');
    if (this.notesModal) this.notesModal.classList.remove('show');
  }

  bindEvents() {
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement.tagName)) return;

      switch (e.key) {
        case 'ArrowRight':
        case ' ':
        case 'PageDown':
          e.preventDefault();
          this.nextSlide();
          break;
        case 'ArrowLeft':
        case 'Backspace':
        case 'PageUp':
          e.preventDefault();
          this.prevSlide();
          break;
        case 'Home':
          e.preventDefault();
          this.goToSlide(1);
          break;
        case 'End':
          e.preventDefault();
          this.goToSlide(this.slides.length);
          break;
        case 'f':
        case 'F':
          e.preventDefault();
          this.toggleFullscreen();
          break;
        case 'o':
        case 'O':
          e.preventDefault();
          this.toggleOverview();
          break;
        case 'Escape':
          e.preventDefault();
          this.closeModals();
          break;
        case 'p':
        case 'P':
          e.preventDefault();
          this.toggleNotes();
          break;
        case 'm':
        case 'M':
          e.preventDefault();
          this.toggleAudio();
          break;
        case 'l':
        case 'L':
          e.preventDefault();
          this.toggleLaserPointer();
          break;
        case 'h':
        case 'H':
          e.preventDefault();
          this.toggleHeader();
          break;
      }
    });

    let touchStartX = 0;
    window.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    window.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].screenX - touchStartX;
      if (Math.abs(diff) > 60) {
        if (diff < 0) this.nextSlide();
        else this.prevSlide();
      }
    }, { passive: true });
  }
}

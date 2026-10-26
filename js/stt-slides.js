// ==========================================================================
// SPEECH TO TEXT (STT / ASR) IN NLP - COMPLETE 12-SLIDE CURRICULUM
// Academic Light Theme | 16:9 Presentation Format | High-Contrast Classroom View
// Course: Natural Language Processing (CSE402) | B.Tech CSE | Prasad Anil Kankhar
// ==========================================================================

window.sttSlidesData = [
  // ========================================================================
  // SLIDE 1: Title Slide & Academic Credentials
  // ========================================================================
  {
    id: 'slide-1',
    part: 'Title & Credentials',
    partNumber: 'SLIDE 01',
    title: 'Speech to Text (STT) Conversion',
    subtitle: 'Foundations, Acoustic Signal Processing, Deep Neural Architectures & Decoding',
    duration: '25 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 25 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Respected Professor and dear friends, good morning. I am Prasad Anil Kankhar from the Department of Computer Science and Engineering at Maharashtra Institute of Technology. Today, I am going to explain Speech to Text Conversion in Natural Language Processing. We will explore the complete scientific journey: from acoustic air pressure waves and digital signal processing, through classical HMM-GMMs and modern Conformer-Whisper transformers, to temporal alignment and language model decoding.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1.15fr 0.85fr; height: 100%; align-items: stretch;">
          <!-- Left: Institutional Information & Credentials -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.82rem; font-weight: 800; color: #1E3A8A; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 0.35rem;">
                G.S. Mandal's Maharashtra Institute of Technology, Chhatrapati Sambhajinagar
              </div>
              <div style="font-size: 0.78rem; font-weight: 700; color: #2563EB; margin-bottom: 0.85rem;">
                Department of Computer Science and Engineering
              </div>

              <div style="border-left: 4px solid #2563EB; padding-left: 1rem; margin-bottom: 1rem;">
                <h2 style="font-size: 2.1rem; font-weight: 900; color: #0F172A; line-height: 1.15; letter-spacing: -0.02em;">
                  Speech to Text (STT)
                </h2>
                <div style="font-size: 1.05rem; font-weight: 700; color: #334155; margin-top: 0.35rem;">
                  Automatic Speech Recognition (ASR) & NLP
                </div>
              </div>

              <!-- Academic Details Card -->
              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 0.85rem 1.15rem; display: flex; flex-direction: column; gap: 0.4rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.86rem;">
                  <span style="color: #64748B; font-weight: 600;">Course:</span>
                  <strong style="color: #0F172A;">Natural Language Processing (NLP / CSE402)</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.86rem;">
                  <span style="color: #64748B; font-weight: 600;">Academic Year:</span>
                  <strong style="color: #0F172A;">2026–27</strong>
                </div>
                <div style="height: 1px; background: #E2E8F0; margin: 0.2rem 0;"></div>
                <div style="display: flex; justify-content: space-between; font-size: 0.88rem;">
                  <span style="color: #64748B; font-weight: 600;">Presented by:</span>
                  <strong style="color: #2563EB;">Prasad Anil Kankhar</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.86rem;">
                  <span style="color: #64748B; font-weight: 600;">Class:</span>
                  <strong style="color: #0F172A;">B.Tech Computer Science and Engineering</strong>
                </div>
              </div>
            </div>

            <!-- Start Actions -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; gap: 0.75rem;">
              <button type="button" class="btn-action btn-action-primary" onclick="sttApp.nextSlide()" title="Begin presentation">
                Start Presentation →
              </button>
              <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.playTitleAnimation()" title="Replay intro flow">
                ▶ Replay Flow
              </button>
            </div>
          </div>

          <!-- Right: Visual Acoustic to Text Flow Card -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, #FFFFFF, #F8FAFC);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Flow Animation</span>
                <span class="asr-badge asr-badge-audio" style="font-size: 0.72rem;">Audio ➔ Text</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">
                Bridging Human Voice & Machine Text
              </h3>
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 0.85rem;">
                How continuous acoustic air pressure fluctuations transform into discrete linguistic tokens:
              </p>
            </div>

            <!-- Sequential Stages -->
            <div style="display: flex; flex-direction: column; gap: 0.55rem;" id="stt-title-stages">
              <div id="stt-title-node-1" class="step-card-asr" style="border-left: 4px solid #D97706; transition: all 0.3s ease; padding: 0.55rem 0.85rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #D97706; text-transform: uppercase;">1. Audio Waveform</span>
                  <span class="asr-badge asr-badge-audio" style="font-size: 0.68rem;">16 kHz Analog ➔ Digital</span>
                </div>
                <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                  Acoustic pressure wave captured via microphone (16-bit PCM).
                </div>
              </div>

              <div id="stt-title-node-2" class="step-card-asr" style="border-left: 4px solid #0284C7; transition: all 0.3s ease; padding: 0.55rem 0.85rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #0284C7; text-transform: uppercase;">2. Feature Extraction</span>
                  <span class="asr-badge asr-badge-features" style="font-size: 0.68rem;">MFCC / Mel Filterbank</span>
                </div>
                <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                  25ms windows converted into 80-channel perceptual log-mel spectrograms.
                </div>
              </div>

              <div id="stt-title-node-3" class="step-card-asr" style="border-left: 4px solid #7C3AED; transition: all 0.3s ease; padding: 0.55rem 0.85rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #7C3AED; text-transform: uppercase;">3. Acoustic & Temporal Model</span>
                  <span class="asr-badge asr-badge-pronunciation" style="font-size: 0.68rem;">Conformer / Whisper</span>
                </div>
                <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                  Deep neural networks predict subword probability distributions over time.
                </div>
              </div>

              <div id="stt-title-node-4" class="step-card-asr" style="border-left: 4px solid #059669; transition: all 0.3s ease; padding: 0.55rem 0.85rem;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #059669; text-transform: uppercase;">4. Language Model & Decoding</span>
                  <span class="asr-badge asr-badge-language" style="font-size: 0.68rem;">Beam Search & NLP</span>
                </div>
                <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                  Disambiguates homophones, injects punctuation, and emits punctuated text.
                </div>
              </div>
            </div>

            <div style="background: #F1F5F9; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-size: 0.74rem; color: #475569; display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <span>System Status:</span>
              <span id="stt-title-status" style="color: #059669; font-weight: 700;">● ASR Engine Ready</span>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.playTitleAnimation();
    }
  },

  // ========================================================================
  // SLIDE 2: What is Speech to Text? Core Concept & The Fundamental Problem
  // ========================================================================
  {
    id: 'slide-2',
    part: 'Foundations & Core Problem',
    partNumber: 'SLIDE 02',
    title: 'What is Speech to Text (STT)?',
    subtitle: 'The Acoustic-Phonetic Inverse Problem & The Nature of Human Speech',
    duration: '35 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 35 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Speech to Text, or Automatic Speech Recognition, is the computational process of converting spoken audio waveforms into written text. While reading text is straightforward for computers, speech is fundamentally an analog, continuous physical wave with no clear spaces between words. Furthermore, every speaker has unique vocal tract anatomy, pitch, speaking speed, accent, and background noise. In this slide, we contrast the continuous nature of speech against the discrete nature of written text.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Definition & The Inverse Problem -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="card-badge">THE CORE CHALLENGE</span>
                <span class="asr-badge asr-badge-audio">Analog ➔ Discrete</span>
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                Why is Speech Recognition Difficult?
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                <div style="padding: 0.6rem 0.85rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #2563EB;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.9rem;">1. No Physical Word Boundaries</div>
                  <div style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem; line-height: 1.45;">
                    Unlike written text where spaces delimit words, speech is continuous. The silence between words is often shorter than the stop-closure inside a single word!
                  </div>
                </div>

                <div style="padding: 0.6rem 0.85rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #059669;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.9rem;">2. Enormous Inter- & Intra-Speaker Variability</div>
                  <div style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem; line-height: 1.45;">
                    Vocal tract length, gender, regional accents, speaking rates, emotional states, and health conditions dramatically alter the acoustic waveform.
                  </div>
                </div>

                <div style="padding: 0.6rem 0.85rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #D97706;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.9rem;">3. Environmental & Channel Noise</div>
                  <div style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem; line-height: 1.45;">
                    Microphone frequency response, reverberant room acoustics, background chatter, and the Lombard effect (people involuntarily raise their pitch in noise).
                  </div>
                </div>
              </div>
            </div>

            <!-- Mathematical Formulation Banner -->
            <div style="background: rgba(37,99,235,0.06); border: 1.5px solid rgba(37,99,235,0.2); border-radius: var(--radius-md); padding: 0.65rem 0.95rem; font-family: var(--font-mono); font-size: 0.82rem; color: #1E3A8A;">
              <strong>ASR Fundamental Goal:</strong> <i>Ŵ</i> = argmax<sub><i>W</i></sub> <i>P</i>(<i>W</i> | <i>X</i>)
            </div>
          </div>

          <!-- Right: Visual Comparison & Interactive Waveform vs Text -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Comparison</span>
                <span class="asr-badge asr-badge-features" style="font-size: 0.72rem;">Continuous vs Discrete</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                The Continuous-to-Discrete Gap
              </h3>
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 0.75rem;">
                Click below to compare how the acoustic wave looks versus the written words:
              </p>

              <!-- Interactive Buttons -->
              <div style="display: flex; gap: 0.5rem; margin-bottom: 0.75rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-gap-1" onclick="sttApp.showContinuousGap(1)" style="flex: 1; font-size: 0.76rem; padding: 0.4rem;">
                  "Speech recognition"
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-gap-2" onclick="sttApp.showContinuousGap(2)" style="flex: 1; font-size: 0.76rem; padding: 0.4rem;">
                  "How to recognize speech"
                </button>
              </div>

              <!-- Interactive Display Card -->
              <div id="gap-display-card" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 150px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Populated by JS -->
              </div>
            </div>

            <!-- Teaching takeaway -->
            <div style="background: #FFFBEB; border: 1px solid #FDE68A; border-radius: var(--radius-sm); padding: 0.55rem 0.75rem; font-size: 0.76rem; color: #92400E;">
              💡 <strong>Key Takeaway:</strong> ASR is not simple dictionary lookup—it is an <em>inverse problem</em> of inferring hidden linguistic intentions from noisy physical sound waves.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.showContinuousGap(1);
    }
  },

  // ========================================================================
  // SLIDE 3: Physics of Speech & Audio Signal Digitization
  // ========================================================================
  {
    id: 'slide-3',
    part: 'Physics & Signal Processing',
    partNumber: 'SLIDE 03',
    title: 'Physics of Speech & Signal Digitization',
    subtitle: 'From Vocal Tract Resonances to Sampling, Nyquist Theorem & 16-Bit Quantization',
    duration: '40 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 40 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Speech begins in the lungs and vocal folds, creating a fundamental frequency F0. As air passes through the pharynx, oral, and nasal cavities, the vocal tract acts as a series of acoustic acoustic resonators called formants. To process this on computers, we convert analog sound to digital data using an Analog-to-Digital Converter. By the Nyquist-Shannon sampling theorem, we sample at 16,000 Hertz to capture up to 8,000 Hertz of sound, quantized with 16 bits per sample to yield 96 decibels of dynamic range.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Speech Production Physics -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="card-badge">ACOUSTIC BIOLOGY</span>
                <span class="asr-badge asr-badge-audio">Source-Filter Model</span>
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.6rem;">
                The Source-Filter Theory of Speech
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.55rem;">
                <div style="padding: 0.55rem 0.75rem; background: #EFF6FF; border-radius: var(--radius-sm); border-left: 3.5px solid #2563EB;">
                  <strong style="font-size: 0.84rem; color: #1E3A8A;">The Source (Glottal Excitation):</strong>
                  <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                    Vocal folds vibrate at Fundamental Frequency <i>F</i>₀ (85–180 Hz in men, 165–255 Hz in women), producing harmonic buzz or turbulent noise.
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #FAF5FF; border-radius: var(--radius-sm); border-left: 3.5px solid #7C3AED;">
                  <strong style="font-size: 0.84rem; color: #581C87;">The Filter (Vocal Tract Resonances):</strong>
                  <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                    Pharynx, tongue, palate, and lips shape resonances called <strong>Formants</strong> (<i>F</i>₁, <i>F</i>₂, <i>F</i>₃), defining distinct vowel sounds.
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #ECFDF5; border-radius: var(--radius-sm); border-left: 3.5px solid #059669;">
                  <strong style="font-size: 0.84rem; color: #064E3B;">Radiation:</strong>
                  <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                    Lip opening acts as a high-pass acoustic filter (+6 dB/octave boost), dispersing sound into the atmosphere.
                  </div>
                </div>
              </div>
            </div>

            <!-- Mathematical Formula -->
            <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); padding: 0.55rem 0.85rem; font-family: var(--font-mono); font-size: 0.78rem; color: #1E3A8A;">
              <strong>Signal Representation:</strong> <i>S</i>(<i>f</i>) = <i>E</i>(<i>f</i>) &times; <i>H</i>(<i>f</i>) &times; <i>R</i>(<i>f</i>)
            </div>
          </div>

          <!-- Right: Sampling & Quantization Interactive Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span class="card-badge">DIGITIZATION (ADC)</span>
                <span class="asr-badge asr-badge-features">Nyquist-Shannon</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Analog to Digital Conversion (ADC)
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Observe how sampling rate & bit depth affect speech clarity:
              </p>

              <!-- Interactive Controls -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.6rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-rate-16k" onclick="sttApp.setDigitizerMode(16, 16)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  16 kHz / 16-bit (Studio Standard)
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-rate-8k" onclick="sttApp.setDigitizerMode(8, 8)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  8 kHz / 8-bit (Telephone Audio)
                </button>
              </div>

              <!-- Digitizer Telemetry Box -->
              <div id="digitizer-telemetry-box" style="background: #0F172A; color: #FFFFFF; border-radius: var(--radius-sm); padding: 0.75rem; font-family: var(--font-mono); font-size: 0.76rem; min-height: 140px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Injected via JS -->
              </div>
            </div>

            <!-- Nyquist Law Box -->
            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; font-size: 0.76rem; color: #1E40AF;">
              ⚡ <strong>Nyquist Rule:</strong> <i>f</i><sub>sample</sub> &ge; 2 &times; <i>f</i><sub>max</sub>. 16 kHz sampling prevents aliasing up to 8 kHz, covering all phonetic speech formants.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.setDigitizerMode(16, 16);
    }
  },

  // ========================================================================
  // SLIDE 4: Phonetics, Phonology & The Speech Sound Alphabet
  // ========================================================================
  {
    id: 'slide-4',
    part: 'Phonetics & Phonology',
    partNumber: 'SLIDE 04',
    title: 'Phonetics, Phonology & Sound Alphabets',
    subtitle: 'Phones, Phonemes, ARPAbet (39 Phonemes) & The Co-Articulation Phenomenon',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Before we can recognize words, we must understand the fundamental units of speech sounds. A phone is an actual acoustic sound, while a phoneme is the smallest contrastive unit that distinguishes word meaning in a language. For standard American English, the ARPAbet defines 39 phonemes: 15 vowels and 24 consonants. Furthermore, human speech exhibits co-articulation: the pronunciation of a sound changes depending on the sounds before and after it because our vocal articulators move smoothly between targets.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Phonetic Taxonomy -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">LINGUISTIC UNITS</span>
                <span class="asr-badge asr-badge-pronunciation">ARPAbet Standard</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Phones, Phonemes & Graphemes
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.5rem 0.75rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm);">
                  <strong style="color: #2563EB; font-size: 0.82rem;">Phone vs. Phoneme vs. Grapheme:</strong>
                  <div style="font-size: 0.76rem; color: #475569; margin-top: 0.2rem;">
                    • <strong>Grapheme:</strong> Written letter (e.g., 'f', 'ph', 'gh').<br>
                    • <strong>Phoneme:</strong> Abstract sound unit (e.g., /f/ in "fish" vs /v/ in "vish").<br>
                    • <strong>Phone:</strong> The physical acoustic sound actually recorded.
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm);">
                  <strong style="color: #7C3AED; font-size: 0.82rem;">English ARPAbet (39 Phonemes):</strong>
                  <div style="font-size: 0.76rem; color: #475569; margin-top: 0.2rem;">
                    • <strong>Vowels (15):</strong> <code>AA, AE, AH, AO, AW, AY, EH, ER, EY, IH, IY, OW, OY, UH, UW</code><br>
                    • <strong>Consonants (24):</strong> Stops (<code>P, B, T, D, K, G</code>), Fricatives (<code>S, Z, SH, ZH, F, V, TH, DH</code>), Nasals (<code>M, N, NG</code>), Liquids (<code>L, R, W, Y, HH</code>).
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #FEF2F2; border: 1px solid #FECACA; border-radius: var(--radius-sm);">
                  <strong style="color: #B91C1C; font-size: 0.82rem;">The Co-Articulation Challenge:</strong>
                  <div style="font-size: 0.76rem; color: #7F1D1D; margin-top: 0.15rem;">
                    Articulators anticipate the next sound. For example, the /k/ sound in "key" (front tongue) is acoustically completely different from /k/ in "cool" (back tongue)!
                  </div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Solution: Classical systems model <strong>triphones</strong> (e.g., <code>k-iy+p</code>) instead of isolated phones.
            </div>
          </div>

          <!-- Right: Interactive Phoneme Audio & Formant Explorer -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">ACOUSTIC SIGNATURES</span>
                <span class="asr-badge asr-badge-features">Formant Analysis</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Interactive Phoneme Explorer
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Click any phoneme category to inspect its acoustic properties:
              </p>

              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-phone-vowel" onclick="sttApp.inspectPhoneme('vowel')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Vowel /i:/ ("see")
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-phone-stop" onclick="sttApp.inspectPhoneme('stop')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Stop /t/ ("tea")
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-phone-fric" onclick="sttApp.inspectPhoneme('fricative')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Fricative /s/ ("sea")
                </button>
              </div>

              <!-- Phoneme Details Card -->
              <div id="phoneme-display-card" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 160px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Populated by JS -->
              </div>
            </div>

            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-sm); padding: 0.45rem 0.7rem; font-size: 0.75rem; color: #166534;">
              💡 <strong>Observation:</strong> Vowels show clear harmonic formant tracks; fricatives show high-frequency noise bursts; stops feature silent closure followed by an explosive transient.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.inspectPhoneme('vowel');
    }
  },

  // ========================================================================
  // SLIDE 5: Audio Feature Extraction — STFT, Spectrograms & The MFCC Pipeline
  // ========================================================================
  {
    id: 'slide-5',
    part: 'Signal Processing & Features',
    partNumber: 'SLIDE 05',
    title: 'Audio Feature Extraction: STFT to MFCCs',
    subtitle: 'From Raw Waveforms to 80-Channel Filterbanks and 39-Dimensional Cepstral Vectors',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Raw 16,000 Hertz waveforms have too much temporal variance to feed directly into classifiers. Instead, we extract spectral features. We chop the signal into 25 millisecond frames with 10 millisecond shifts and apply a Hamming window. We compute the Short-Time Fourier Transform to get the power spectrum. Because human ears hear pitch logarithmically, we pass the spectrum through triangular Mel filterbanks. Finally, a Discrete Cosine Transform outputs 39 Mel-Frequency Cepstral Coefficients, or MFCCs, representing vocal tract configuration, velocity, and acceleration.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: 5-Stage MFCC Extraction Pipeline -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">FEATURE EXTRACTION</span>
                <span class="asr-badge asr-badge-features">MFCC & FBANK</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.45rem;">
                The 5-Step Signal Processing Pipeline
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <div class="step-card-asr" id="mfcc-step-1" style="padding: 0.45rem 0.65rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; color: #0F172A;">
                    <span>1. Pre-Emphasis Filter</span>
                    <span style="font-size: 0.7rem; color: #2563EB; font-family: var(--font-mono);">y[n] = x[n] - 0.97 x[n-1]</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #475569;">Boosts high frequencies to compensate for natural -6dB/octave glottal drop.</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-2" style="padding: 0.45rem 0.65rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; color: #0F172A;">
                    <span>2. Framing & Windowing</span>
                    <span style="font-size: 0.7rem; color: #7C3AED; font-family: var(--font-mono);">25ms Frame / 10ms Step</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #475569;">Multiplies by Hamming window <i>w</i>[<i>n</i>] to eliminate spectral leakage at edges.</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-3" style="padding: 0.45rem 0.65rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; color: #0F172A;">
                    <span>3. Fast Fourier Transform (FFT)</span>
                    <span style="font-size: 0.7rem; color: #D97706; font-family: var(--font-mono);">Time ➔ Frequency</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #475569;">Converts each 25ms time window into its frequency power magnitude spectrum.</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-4" style="padding: 0.45rem 0.65rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; color: #0F172A;">
                    <span>4. Mel-Scale Filter Bank</span>
                    <span style="font-size: 0.7rem; color: #2563EB; font-family: var(--font-mono);">80 Mel Filters</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #475569;">Warps frequencies to match cochlear pitch: <i>m</i> = 2595 &middot; log<sub>10</sub>(1 + <i>f</i>/700).</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-5" style="padding: 0.45rem 0.65rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.8rem; font-weight: 800; color: #0F172A;">
                    <span>5. Discrete Cosine Transform (DCT)</span>
                    <span style="font-size: 0.7rem; color: #059669; font-family: var(--font-mono);">39D Coefficients</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #475569;">Decorrelates filterbanks into 13 Cepstral + &Delta; (velocity) + &Delta;&Delta; (acceleration).</div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Note: Modern Deep Learning uses raw <strong>80-channel Log-Mel Filterbanks</strong> directly, bypassing DCT.
            </div>
          </div>

          <!-- Right: Interactive Waveform & Spectrogram Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #059669; text-transform: uppercase;">Real-Time Audio Canvas</span>
                <span class="asr-badge asr-badge-audio" id="wave-state-badge">Synthesizer Active</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Acoustic Wave & Mel Spectrogram
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Select sound source to inspect waveform harmonics and spectral energy bands:
              </p>

              <!-- Audio Trigger Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.setAudioSample('vowel')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Vowel /a/
                </button>
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.setAudioSample('fricative')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Fricative /sh/
                </button>
                <button type="button" class="btn-action btn-action-primary" onclick="sttApp.setAudioSample('word')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Continuous Word
                </button>
              </div>

              <!-- Real-time Canvas Display -->
              <div class="audio-wave-container">
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: #94A3B8; font-family: var(--font-mono);">
                  <span>Acoustic Pressure Amplitude</span>
                  <span id="wave-freq-label">Fundamental + Formants</span>
                </div>
                <canvas id="stt-wave-canvas" width="460" height="65" style="width: 100%; height: 65px; display: block; border-radius: 4px;"></canvas>

                <div style="font-size: 0.7rem; color: #94A3B8; font-family: var(--font-mono); margin-top: 0.2rem;">
                  80-Channel Mel Filterbank Energy Distribution:
                </div>
                <div class="spectrogram-box" id="spectrogram-visualizer" style="height: 60px; display: flex; align-items: flex-end; gap: 3px; padding: 0 4px;">
                  <!-- Injected via JS -->
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B; margin-top: 0.35rem;">
              Outputs a continuous stream of spectral feature vectors at 100 frames per second.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) {
        window.sttApp.initWaveformCanvas();
        window.sttApp.setAudioSample('word');
      }
    }
  },

  // ========================================================================
  // SLIDE 6: Classical ASR Architecture — The Statistical Triad (HMM-GMM)
  // ========================================================================
  {
    id: 'slide-6',
    part: 'Classical Architecture',
    partNumber: 'SLIDE 06',
    title: 'The Classical Triad: HMM-GMM / DNN',
    subtitle: 'Acoustic Model, Pronunciation Lexicon, Language Model & Viterbi WFST Search',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “For nearly three decades, ASR relied on Bayes’ Decision Rule implemented as three separate components: the Acoustic Model, the Pronunciation Lexicon, and the Language Model. Hidden Markov Models with Gaussian Mixture Models represented each phoneme with a 3-state left-to-right topology. The lexicon mapped phonemes to words, and N-gram models computed language priors. To find the best word sequence, the Viterbi algorithm decoded the path through a gigantic Weighted Finite-State Transducer.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: The Three Classical Pillars -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">THE MODULAR PARADIGM</span>
                <span class="asr-badge asr-badge-acoustic">HMM-GMM / DNN</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                The Three Pillars of Classical ASR
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.55rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #2563EB;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #2563EB; font-size: 0.85rem;">1. Acoustic Model (AM)</strong>
                    <span class="asr-badge asr-badge-acoustic" style="font-size: 0.65rem;">HMM + GMM/DNN</span>
                  </div>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    Computes <i>P</i>(Acoustic Frames | Phone States). Each triphone is modeled as a 3-state HMM (Initial, Mid, Final).
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #7C3AED;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #7C3AED; font-size: 0.85rem;">2. Pronunciation Lexicon (L)</strong>
                    <span class="asr-badge asr-badge-pronunciation" style="font-size: 0.65rem;">CMUdict</span>
                  </div>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    Hand-crafted dictionary mapping phonemes to words: <code>/k/ /æ/ /t/ ➔ "cat"</code>. Cannot handle out-of-vocabulary words!
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #059669;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #059669; font-size: 0.85rem;">3. Language Model (LM)</strong>
                    <span class="asr-badge asr-badge-language" style="font-size: 0.65rem;">N-Gram (KenLM)</span>
                  </div>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    Computes <i>P</i>(<i>W</i>) probability of word sequence: <i>P</i>(<i>w</i><sub><i>i</i></sub> | <i>w</i><sub><i>i</i>-1</sub>, <i>w</i><sub><i>i</i>-2</sub>).
                  </div>
                </div>
              </div>
            </div>

            <!-- WFST Box -->
            <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-size: 0.74rem; color: #334155;">
              ⚡ <strong>WFST Composition:</strong> The search graph is built by composing <i>H</i> &comp; <i>C</i> &comp; <i>L</i> &comp; <i>G</i> (HMM &comp; Context &comp; Lexicon &comp; Grammar).
            </div>
          </div>

          <!-- Right: Interactive HMM 3-State Trellis Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">PROBABILISTIC GRAPH</span>
                <span class="asr-badge asr-badge-acoustic">Viterbi Trellis</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                3-State Left-to-Right HMM Trellis
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Step through frames to see how state transitions model time variation:
              </p>

              <!-- Step Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-hmm-step" onclick="sttApp.stepHMMTrellis()" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Step Frame (<i>t</i> ➔ <i>t</i>+1)
                </button>
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.resetHMMTrellis()" style="font-size: 0.74rem; padding: 0.35rem 0.75rem;">
                  Reset
                </button>
              </div>

              <!-- Trellis Visualizer Box -->
              <div id="hmm-trellis-display" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 160px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Injected via JS -->
              </div>
            </div>

            <div style="background: #FEF2F2; border-left: 3px solid #EF4444; border-radius: 4px; padding: 0.45rem 0.7rem; font-size: 0.74rem; color: #991B1B;">
              ⚠️ <strong>The Cascading Error Flaw:</strong> If the Acoustic Model misidentifies a phone, the Lexicon cannot map it, causing irreversible search failure.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.resetHMMTrellis();
    }
  },

  // ========================================================================
  // SLIDE 7: Temporal Alignment & Connectionist Temporal Classification (CTC)
  // ========================================================================
  {
    id: 'slide-7',
    part: 'Temporal Alignment & Loss',
    partNumber: 'SLIDE 07',
    title: 'Temporal Alignment & CTC Loss',
    subtitle: 'The Alignment Problem: 100 Frames per Second vs. 3 Words per Second',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “In speech recognition, there is a fundamental timing mismatch: a 1-second audio clip produces 100 feature frames, but may only contain 3 words or 15 letters. How can a neural network be trained without manual frame-level phonetic alignments? In 2006, Alex Graves introduced Connectionist Temporal Classification, or CTC. CTC introduces a special blank symbol and a collapse function that removes consecutive duplicate characters and blanks, allowing networks to learn alignment automatically.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: The Alignment Dilemma & CTC Solution -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">THE TIMING PARADOX</span>
                <span class="asr-badge asr-badge-features">Graves et al. (2006)</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                The Alignment Problem in ASR
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.55rem;">
                <div style="padding: 0.55rem 0.75rem; background: #FEF3C7; border-radius: var(--radius-sm); border-left: 3.5px solid #D97706;">
                  <strong style="color: #92400E; font-size: 0.84rem;">The Sequence Length Mismatch:</strong>
                  <div style="font-size: 0.78rem; color: #78350F; margin-top: 0.15rem;">
                    Input audio feature sequence: <i>T</i> = 100 to 500 frames.<br>
                    Target text character sequence: <i>U</i> = 10 to 30 characters.<br>
                    <i>T</i> &gg; <i>U</i> (Input is vastly longer than target!).
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #EFF6FF; border-radius: var(--radius-sm); border-left: 3.5px solid #2563EB;">
                  <strong style="color: #1E3A8A; font-size: 0.84rem;">The Special Blank Symbol (&epsilon;):</strong>
                  <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                    CTC expands the vocabulary with a &lt;blank&gt; token, emitted whenever the speaker is between phonetic transitions or silent.
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #ECFDF5; border-radius: var(--radius-sm); border-left: 3.5px solid #059669;">
                  <strong style="color: #064E3B; font-size: 0.84rem;">The Collapse Operator (&Beta;):</strong>
                  <div style="font-size: 0.78rem; color: #334155; margin-top: 0.15rem;">
                    1. Collapses contiguous identical tokens: <code>c c c ➔ c</code>.<br>
                    2. Deletes all blank symbols: <code>_ c _ a a _ t _ ➔ "cat"</code>.
                  </div>
                </div>
              </div>
            </div>

            <!-- Mathematical Loss Formula -->
            <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-family: var(--font-mono); font-size: 0.76rem; color: #1E3A8A;">
              <strong>CTC Loss:</strong> <i>L</i><sub>CTC</sub> = -ln &sum;<sub>&pi; &in; &Beta;⁻¹(<i>Y</i>)</sub> <i>P</i>(&pi; | <i>X</i>)
            </div>
          </div>

          <!-- Right: Interactive CTC Alignment & Collapse Visualizer -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">LIVE SIMULATOR</span>
                <span class="asr-badge asr-badge-language">Collapse Function</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Interactive CTC Alignment Matrix
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Select different frame emission alignments to see how &Beta; collapses them:
              </p>

              <!-- Sample Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-ctc-1" onclick="sttApp.showCTCAlignment(1)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Path A: "_ c c _ a a t _"
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-ctc-2" onclick="sttApp.showCTCAlignment(2)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Path B: "c _ _ a _ _ t t"
                </button>
              </div>

              <!-- Visual Alignment Table -->
              <div id="ctc-alignment-display" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 160px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Populated by JS -->
              </div>
            </div>

            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: var(--radius-sm); padding: 0.45rem 0.7rem; font-size: 0.75rem; color: #1E40AF;">
              ✨ <strong>Why CTC Revolutionized STT:</strong> Entire neural networks can now be trained end-to-end directly on audio pairs without requiring phoneme timestamp annotations!
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.showCTCAlignment(1);
    }
  },

  // ========================================================================
  // SLIDE 8: Modern End-to-End Deep Learning Architectures
  // ========================================================================
  {
    id: 'slide-8',
    part: 'Deep Neural Architectures',
    partNumber: 'SLIDE 08',
    title: 'Modern End-to-End Architectures',
    subtitle: 'From LAS and RNN-Transducer to the Conformer (CNN + Self-Attention)',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “In recent years, the entire classical multi-stage pipeline has been replaced by unified End-to-End deep neural networks. In Listen, Attend and Spell, sequence-to-sequence attention directly transcribed speech. For streaming on mobile devices, RNN-Transducers combine acoustic features with language predictions in real-time. Today, the state-of-the-art architecture is the Conformer, created by Google. The Conformer combines convolutions to capture local speech formants with multi-head self-attention to capture long-range linguistic context.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Architectural Evolution -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">E2E EVOLUTION</span>
                <span class="asr-badge asr-badge-features">Deep Learning</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                The 4 Generations of Neural STT
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.5rem 0.75rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 3.5px solid #64748B;">
                  <strong style="color: #334155; font-size: 0.82rem;">1. Hybrid DNN-HMM (2012):</strong>
                  <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.15rem;">Deep neural nets replaced GMMs for posterior probability estimation. Kept HMM Viterbi search.</div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 3.5px solid #2563EB;">
                  <strong style="color: #2563EB; font-size: 0.82rem;">2. Listen, Attend and Spell (LAS, 2016):</strong>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">First Seq2Seq model. Pyramidal BiLSTM encoder with content-based attention decoder. Offline only.</div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 3.5px solid #7C3AED;">
                  <strong style="color: #7C3AED; font-size: 0.82rem;">3. RNN-Transducer (RNN-T, 2018):</strong>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">Enables real-time streaming speech on smartphones. Transcription net + Prediction net + Joint net.</div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #ECFDF5; border: 1px solid #A7F3D0; border-radius: var(--radius-sm); border-left: 3.5px solid #059669;">
                  <strong style="color: #059669; font-size: 0.82rem;">4. Conformer Architecture (Google, 2020):</strong>
                  <div style="font-size: 0.75rem; color: #064E3B; margin-top: 0.15rem;">Interleaves Depthwise Separable Convolutions with Multi-Head Self-Attention in Macaron FFN blocks.</div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Key Innovation: CNNs model local co-articulation; Transformers model global semantic context.
            </div>
          </div>

          <!-- Right: Interactive Architecture Comparison -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">ARCHITECTURE EXPLORER</span>
                <span class="asr-badge asr-badge-pronunciation">Interactive</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Architecture Block Breakdown
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Click to inspect how data flows through different neural designs:
              </p>

              <!-- Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-arch-conformer" onclick="sttApp.inspectArchitecture('conformer')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Conformer Block
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-arch-rnnt" onclick="sttApp.inspectArchitecture('rnnt')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  RNN-Transducer
                </button>
              </div>

              <!-- Display Box -->
              <div id="arch-inspect-display" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 160px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Populated by JS -->
              </div>
            </div>

            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: var(--radius-sm); padding: 0.45rem 0.7rem; font-size: 0.75rem; color: #1E40AF;">
              ⚡ <strong>Benchmark Result:</strong> Conformer achieved state-of-the-art 1.9% WER on LibriSpeech clean test set.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.inspectArchitecture('conformer');
    }
  },

  // ========================================================================
  // SLIDE 9: Modern Foundation Models: OpenAI Whisper & Self-Supervised Speech
  // ========================================================================
  {
    id: 'slide-9',
    part: 'Speech Foundation Models',
    partNumber: 'SLIDE 09',
    title: 'Foundation Models: OpenAI Whisper',
    subtitle: 'Weak Supervision on 680,000 Hours, Multilingual Tokens & Self-Supervised Audio',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “In 2022, OpenAI released Whisper, transforming speech recognition from specialized narrow models into generalized foundation models. Trained on 680,000 hours of weakly supervised multilingual web audio, Whisper uses an Encoder-Decoder Transformer with 80-channel log-mel spectrogram input. Crucially, it controls tasks via special prompt tokens: specifying the target language, choosing between transcription and translation, and controlling timestamps. Together with self-supervised models like Meta’s Wav2Vec 2.0, Whisper achieves near-human robustness across background noise and diverse accents.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Whisper Architecture & Principles -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">THE WHISPER PARADIGM</span>
                <span class="asr-badge asr-badge-language">OpenAI (2022)</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                How Whisper Changed Speech Recognition
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.5rem 0.75rem; background: #EFF6FF; border-radius: var(--radius-sm); border-left: 3.5px solid #2563EB;">
                  <strong style="color: #1E3A8A; font-size: 0.82rem;">1. Massive Weak Supervision:</strong>
                  <div style="font-size: 0.75rem; color: #334155; margin-top: 0.15rem;">
                    Trained on 680,000 hours of diverse audio collected from the internet—over 100x larger than standard academic datasets.
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #FAF5FF; border-radius: var(--radius-sm); border-left: 3.5px solid #7C3AED;">
                  <strong style="color: #581C87; font-size: 0.82rem;">2. Encoder-Decoder Transformer:</strong>
                  <div style="font-size: 0.75rem; color: #334155; margin-top: 0.15rem;">
                    Input: 30-second 80-channel log-mel audio chunks. Output: Byte-Pair Encoded (BPE) text tokens.
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #ECFDF5; border-radius: var(--radius-sm); border-left: 3.5px solid #059669;">
                  <strong style="color: #064E3B; font-size: 0.82rem;">3. Multi-Task Token Conditioning:</strong>
                  <div style="font-size: 0.75rem; color: #334155; margin-top: 0.15rem;">
                    Controls behavior using sequence tokens: <code>&lt;|startoftranscript|&gt;</code>, <code>&lt;|en|&gt;</code>, <code>&lt;|transcribe|&gt;</code>, <code>&lt;|notimestamps|&gt;</code>.
                  </div>
                </div>
              </div>
            </div>

            <!-- Self Supervised Reference -->
            <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-size: 0.74rem; color: #475569;">
              🔬 <strong>Self-Supervised Cousins (Wav2Vec 2.0 / HuBERT):</strong> Mask raw audio frames in latent space, learning rich acoustic representations with zero human text transcripts.
            </div>
          </div>

          <!-- Right: Interactive Whisper Special Token Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">TOKEN PIPELINE</span>
                <span class="asr-badge asr-badge-features">Decoder Prompting</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Whisper Decoder Token Simulator
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Click task mode to see how Whisper conditions its autoregressive decoder:
              </p>

              <!-- Task Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-wh-transcribe" onclick="sttApp.showWhisperTokens('transcribe')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  English Transcribe
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-wh-translate" onclick="sttApp.showWhisperTokens('translate')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Speech Translation
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-wh-timestamps" onclick="sttApp.showWhisperTokens('timestamps')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Timestamp Output
                </button>
              </div>

              <!-- Token Display Box -->
              <div id="whisper-token-display" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 160px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Populated by JS -->
              </div>
            </div>

            <div style="background: #EFF6FF; border: 1px solid #BFDBFE; border-radius: var(--radius-sm); padding: 0.45rem 0.7rem; font-size: 0.75rem; color: #1E40AF;">
              💡 <strong>Why Zero-Shot Robustness Works:</strong> Whisper generalizes across background noise, music, and accents because it was trained on real-world in-the-wild audio rather than clean studio recordings.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.showWhisperTokens('transcribe');
    }
  },

  // ========================================================================
  // SLIDE 10: Where NLP Meets STT — Language Modeling, Decoding & Text Normalization
  // ========================================================================
  {
    id: 'slide-10',
    part: 'NLP Integration & Decoding',
    partNumber: 'SLIDE 10',
    title: 'Where NLP Meets STT: Language Models & Post-Processing',
    subtitle: 'Beam Search Fusion, Homophone Disambiguation & Inverse Text Normalization (ITN)',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “This slide highlights where Natural Language Processing directly powers speech recognition. First, during decoding, Beam Search fuses acoustic probabilities with an external NLP Language Model to disambiguate homophones—such as ‘recognize speech’ versus ‘wreck a nice beach’. Second, Large Language Models perform two-pass rescoring on the top-50 transcription candidates. Finally, NLP performs Inverse Text Normalization, converting spoken numbers into currencies and dates, and restores proper capitalization and punctuation.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: 4 Crucial NLP Roles in STT -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">THE NLP CONNECTION</span>
                <span class="asr-badge asr-badge-language">Syntactic & Semantic Priors</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                How NLP Powers Speech Recognition
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.5rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #2563EB;">
                  <strong style="color: #2563EB; font-size: 0.82rem;">1. Shallow & Deep LM Fusion:</strong>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    Scores beam hypotheses: <code>Score = log P_ASR(W|X) + &alpha; log P_LM(W) + &beta; |W|</code>.
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #7C3AED;">
                  <strong style="color: #7C3AED; font-size: 0.82rem;">2. Two-Pass LLM Rescoring:</strong>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    ASR produces an N-best list (e.g. 50 candidate sentences); a large LLM rescores them based on full-document conversational context.
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #059669;">
                  <strong style="color: #059669; font-size: 0.82rem;">3. Inverse Text Normalization (ITN):</strong>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    Converts verbal forms to written conventions: <i>"twenty five dollars"</i> ➔ <code>$25</code>; <i>"four thirty pm"</i> ➔ <code>4:30 PM</code>.
                  </div>
                </div>

                <div style="padding: 0.5rem 0.75rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-sm); border-left: 4px solid #D97706;">
                  <strong style="color: #D97706; font-size: 0.82rem;">4. Truecasing & Punctuation:</strong>
                  <div style="font-size: 0.75rem; color: #475569; margin-top: 0.15rem;">
                    Speech has no capital letters or periods. Neural sequence taggers insert sentence punctuation and capitalize proper nouns.
                  </div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Without NLP, transcribed speech would be an unreadable stream of unpunctuated lowercase words.
            </div>
          </div>

          <!-- Right: Interactive Homophone & ITN Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">INTERACTIVE LAB</span>
                <span class="asr-badge asr-badge-language">Disambiguation</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Homophone & ITN Laboratory
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Click below to see how NLP resolves acoustic ambiguities and formats text:
              </p>

              <!-- Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-primary" id="btn-nlp-homo" onclick="sttApp.showNLPLab('homophone')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Homophone Disambiguation
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-nlp-itn" onclick="sttApp.showNLPLab('itn')" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Inverse Text Normalization
                </button>
              </div>

              <!-- Display Box -->
              <div id="nlp-lab-display" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 160px; display: flex; flex-direction: column; justify-content: space-around;">
                <!-- Populated by JS -->
              </div>
            </div>

            <div style="background: #F0FDF4; border: 1px solid #BBF7D0; border-radius: var(--radius-sm); padding: 0.45rem 0.7rem; font-size: 0.75rem; color: #166534;">
              🎯 <strong>Outcome:</strong> By multiplying the acoustic likelihood with the language prior, NLP selects the grammatically meaningful candidate every time.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.showNLPLab('homophone');
    }
  },

  // ========================================================================
  // SLIDE 11: Performance Evaluation, Benchmarking & Practical Challenges
  // ========================================================================
  {
    id: 'slide-11',
    part: 'Evaluation & Challenges',
    partNumber: 'SLIDE 11',
    title: 'Evaluation Metrics & Real-World Challenges',
    subtitle: 'Word Error Rate (WER), Real-Time Factor (RTF), Diarization & The Cocktail Party Problem',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “To measure the accuracy of an ASR system, we calculate the Word Error Rate, or WER, via Levenshtein edit distance. WER equals substitutions plus deletions plus insertions divided by the total number of reference words. For latency, we compute the Real-Time Factor: the processing time divided by the audio length, which must be less than 1.0 for live streaming. In production, systems must overcome practical hurdles such as the Cocktail Party Effect, reverberation, and speaker diarization—answering ‘who spoke when’.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Metrics & Practical Challenges -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">BENCHMARKS & METRICS</span>
                <span class="asr-badge asr-badge-features">Levenshtein Distance</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Standard ASR Evaluation Metrics
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.55rem 0.75rem; background: #EFF6FF; border: 1.5px solid #BFDBFE; border-radius: var(--radius-sm);">
                  <div style="display: flex; justify-content: space-between;">
                    <strong style="color: #1E40AF; font-size: 0.84rem;">Word Error Rate (WER):</strong>
                    <span style="font-family: var(--font-mono); font-weight: 800; color: #1E40AF; font-size: 0.8rem;">WER = (S + D + I) / N &times; 100%</span>
                  </div>
                  <div style="font-size: 0.74rem; color: #334155; margin-top: 0.2rem;">
                    • <strong>S (Substitutions):</strong> Wrong word transcribed.<br>
                    • <strong>D (Deletions):</strong> Word missed completely.<br>
                    • <strong>I (Insertions):</strong> Extra hallucinated word added.<br>
                    • <strong>N:</strong> Total words in human ground-truth.
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #FAF5FF; border: 1.5px solid #E9D5FF; border-radius: var(--radius-sm);">
                  <strong style="color: #6B21A8; font-size: 0.84rem;">Real-Time Factor (RTF):</strong>
                  <div style="font-size: 0.74rem; color: #334155; margin-top: 0.15rem;">
                    <code>RTF = Processing Time / Audio Duration</code>. If a 10s audio clip takes 2s to transcribe, RTF = 0.2 (Real-time requires RTF &le; 1.0).
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #FEF2F2; border: 1.5px solid #FECACA; border-radius: var(--radius-sm);">
                  <strong style="color: #991B1B; font-size: 0.84rem;">Real-World Engineering Challenges:</strong>
                  <div style="font-size: 0.74rem; color: #7F1D1D; margin-top: 0.15rem;">
                    • <strong>Cocktail Party Effect:</strong> Overlapping speakers talking simultaneously.<br>
                    • <strong>Speaker Diarization:</strong> Clustering "Who spoke when?" in meetings.<br>
                    • <strong>Code-Switching:</strong> Mixing multiple languages in one sentence (e.g. Hinglish).
                  </div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Clean speech benchmarks: Humans &approx; 4.0% WER | Whisper Large-v3 &approx; 2.5% WER.
            </div>
          </div>

          <!-- Right: Live Transcription & WER Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">LIVE EVALUATOR</span>
                <span class="asr-badge asr-badge-language" id="live-stt-status">Ready</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Live Audio Stream & WER Simulator
              </h3>
              <p style="font-size: 0.8rem; color: #64748B; margin-bottom: 0.65rem;">
                Select an audio domain to stream tokens and compute alignment error:
              </p>

              <!-- Sample Buttons -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.65rem;">
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.simulateTranscription(1)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Medical Speech
                </button>
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.simulateTranscription(2)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  Financial Call
                </button>
                <button type="button" class="btn-action btn-action-primary" onclick="sttApp.simulateTranscription(3)" style="flex: 1; font-size: 0.74rem; padding: 0.35rem;">
                  NLP & AI Lecture
                </button>
              </div>

              <!-- Live Transcription Box -->
              <div id="stt-transcription-box" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.85rem; min-height: 110px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Emitted tokens stream -->
              </div>

              <!-- WER Breakdown Output -->
              <div id="stt-wer-output" style="padding: 0.55rem 0.75rem; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); font-size: 0.78rem; color: #334155; margin-top: 0.5rem;">
                <!-- Populated by JS -->
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B; margin-top: 0.35rem;">
              WER is computed dynamically via dynamic programming matrix alignment.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      if (window.sttApp) window.sttApp.simulateTranscription(3);
    }
  },

  // ========================================================================
  // SLIDE 12: Summary, The Grand Mental Model & Future Horizons
  // ========================================================================
  {
    id: 'slide-12',
    part: 'Summary & Frontiers',
    partNumber: 'SLIDE 12',
    title: 'The Grand Mental Model & Future Horizons',
    subtitle: 'Synthesizing the Complete ASR Pipeline & Emerging Frontiers in Speech AI',
    duration: '35 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 35 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “To summarize our journey: Speech to Text conversion transforms continuous acoustic air vibrations into discrete words through acoustic digitization, Mel feature extraction, deep neural modeling via Conformer or Whisper transformers, temporal CTC alignment, and language model beam search. The future of speech AI is now expanding into zero-shot multilingual translation across 1,000 languages, sub-50 millisecond edge neural accelerators, and paralinguistic emotion detection. Thank you so much for your attention, and I am happy to open the floor to any questions.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: The Grand Mental Model (Complete Pipeline) -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">THE GRAND MENTAL MODEL</span>
                <span class="asr-badge asr-badge-acoustic">End-to-End Pipeline</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                The 6 Essential Stages of Modern STT
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.65rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #D97706;">
                  <span style="font-weight: 800; font-size: 0.78rem; color: #D97706; width: 65px;">1. Physics</span>
                  <span style="font-size: 0.76rem; color: #334155;">16 kHz ADC Sampling & 16-bit PCM Quantization</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.65rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #0284C7;">
                  <span style="font-weight: 800; font-size: 0.78rem; color: #0284C7; width: 65px;">2. Features</span>
                  <span style="font-size: 0.76rem; color: #334155;">25ms STFT & 80-Channel Log-Mel Filterbanks</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.65rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #2563EB;">
                  <span style="font-weight: 800; font-size: 0.78rem; color: #2563EB; width: 65px;">3. Encoder</span>
                  <span style="font-size: 0.76rem; color: #334155;">Conformer / Whisper Multi-Head Self-Attention</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.65rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #7C3AED;">
                  <span style="font-weight: 800; font-size: 0.78rem; color: #7C3AED; width: 65px;">4. Align</span>
                  <span style="font-size: 0.76rem; color: #334155;">CTC Loss & Autoregressive Cross-Attention</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.65rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #059669;">
                  <span style="font-weight: 800; font-size: 0.78rem; color: #059669; width: 65px;">5. NLP Prior</span>
                  <span style="font-size: 0.76rem; color: #334155;">Beam Search with LM Fusion & Homophone Resolution</span>
                </div>

                <div style="display: flex; align-items: center; gap: 0.6rem; padding: 0.45rem 0.65rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #10B981;">
                  <span style="font-weight: 800; font-size: 0.78rem; color: #10B981; width: 65px;">6. Output</span>
                  <span style="font-size: 0.76rem; color: #334155;">Inverse Text Normalization & Punctuation Restoration</span>
                </div>
              </div>
            </div>

            <!-- Review Button -->
            <button type="button" class="btn-action btn-action-primary" onclick="sttApp.goToSlide(0)" style="margin-top: 0.5rem;">
              ↺ Return to Slide 1 (Overview)
            </button>
          </div>

          <!-- Right: Emerging Frontiers & Presentation Celebration -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span class="card-badge">NEXT HORIZONS</span>
                <span class="asr-badge asr-badge-features">Speech AI 2026+</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Emerging Frontiers in Speech AI
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="padding: 0.55rem 0.75rem; background: #EFF6FF; border-radius: var(--radius-sm); border-left: 3.5px solid #2563EB;">
                  <strong style="color: #1E3A8A; font-size: 0.82rem;">1. Universal Zero-Shot Multilingualism:</strong>
                  <div style="font-size: 0.75rem; color: #334155; margin-top: 0.15rem;">
                    Single models transcribing and translating 1,000+ indigenous & low-resource languages (Meta MMS project).
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #FAF5FF; border-radius: var(--radius-sm); border-left: 3.5px solid #7C3AED;">
                  <strong style="color: #581C87; font-size: 0.82rem;">2. Ultra-Low Latency On-Device NPU Speech:</strong>
                  <div style="font-size: 0.75rem; color: #334155; margin-top: 0.15rem;">
                    Streaming ASR models operating entirely on mobile silicon with sub-50ms latency and zero server reliance.
                  </div>
                </div>

                <div style="padding: 0.55rem 0.75rem; background: #ECFDF5; border-radius: var(--radius-sm); border-left: 3.5px solid #059669;">
                  <strong style="color: #064E3B; font-size: 0.82rem;">3. Paralinguistics & Non-Verbal Acoustic AI:</strong>
                  <div style="font-size: 0.75rem; color: #334155; margin-top: 0.15rem;">
                    Detecting speaker emotion, sarcasm, hesitation pauses, and medical biomarkers (cough, breathiness, vocal fatigue).
                  </div>
                </div>
              </div>
            </div>

            <!-- Conclusion & Celebration Button -->
            <div style="border-top: 1.5px dashed #CBD5E1; padding-top: 0.65rem; display: flex; align-items: center; justify-content: space-between;">
              <div>
                <div style="font-weight: 800; color: #0F172A; font-size: 0.95rem;">Thank You! Questions & Discussion</div>
                <div style="font-size: 0.74rem; color: #64748B;">Department of Computer Science and Engineering</div>
              </div>
              <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.celebratePresentation()" title="Celebrate Lecture">
                🎉 Celebrate
              </button>
            </div>
          </div>
        </div>
      `;
    }
  }
];

// ==========================================================================
// SPEECH TO TEXT (STT) IN NLP - 6 SLIDES COMPLETE DATA SPECIFICATION
// Academic Light Theme | 16:9 Presentation Format | High-Contrast Classroom View
// ==========================================================================

window.sttSlidesData = [
  // ========================================================================
  // SLIDE 1: Title Slide
  // ========================================================================
  {
    id: 'slide-1',
    part: 'Title Slide',
    partNumber: 'SLIDE 01',
    title: 'Speech to Text Conversion',
    subtitle: 'Automatic Speech Recognition (ASR) & Natural Language Processing (NLP)',
    duration: '25 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 25 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Respected Professor and friends, I am Prasad Anil Kankhar from the Department of Computer Science and Engineering at Maharashtra Institute of Technology. Today, I am going to explain Speech to Text Conversion in Natural Language Processing. We will explore how continuous acoustic sound waves are digitized, extracted into acoustic features, decoded into phonemes, and finally transcribed into grammatically correct text.”
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
                  Speech to Text Conversion
                </h2>
                <div style="font-size: 1.05rem; font-weight: 700; color: #334155; margin-top: 0.35rem;">
                  Automatic Speech Recognition (ASR) in NLP
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
                  <strong style="color: #0F172A;">B.Tech CSE</strong>
                </div>
              </div>
            </div>

            <!-- Start Actions -->
            <div style="display: flex; align-items: center; justify-content: space-between; margin-top: 1rem; gap: 0.75rem;">
              <button type="button" class="btn-action btn-action-primary" onclick="sttApp.nextSlide()" title="Begin presentation">
                Start Presentation →
              </button>
              <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.playTitleAnimation()" title="Replay intro flow">
                ▶ Replay Intro Flow
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
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 1rem;">
                How continuous acoustic air pressure fluctuations transform into discrete linguistic tokens:
              </p>
            </div>

            <!-- Sequential Stages -->
            <div style="display: flex; flex-direction: column; gap: 0.65rem;" id="stt-title-stages">
              <div id="stt-title-node-1" class="step-card-asr" style="border-left: 4px solid #D97706; transition: all 0.3s ease;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #D97706; text-transform: uppercase;">1. Audio Signal</span>
                  <span class="asr-badge asr-badge-audio">Analog ➔ Digital</span>
                </div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #0F172A; margin-top: 0.15rem;">Voice Input: "Natural Language"</div>
                <div style="font-size: 0.78rem; color: #475569;">Captured via microphone at 16kHz sampling frequency.</div>
              </div>

              <div id="stt-title-node-2" class="step-card-asr" style="border-left: 4px solid #0284C7; transition: all 0.3s ease;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #0284C7; text-transform: uppercase;">2. Feature Extraction</span>
                  <span class="asr-badge asr-badge-acoustic">MFCC Vectors</span>
                </div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #0F172A; margin-top: 0.15rem;">Mel-Frequency Cepstral Coefficients</div>
                <div style="font-size: 0.78rem; color: #475569;">Converts raw time waveform into spectral frequency representations.</div>
              </div>

              <div id="stt-title-node-3" class="step-card-asr" style="border-left: 4px solid #7C3AED; transition: all 0.3s ease;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #7C3AED; text-transform: uppercase;">3. Acoustic & Language Modeling</span>
                  <span class="asr-badge asr-badge-pronunciation">AM + LM</span>
                </div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #0F172A; margin-top: 0.15rem;">Phoneme & Grammar Alignment</div>
                <div style="font-size: 0.78rem; color: #475569;">Maps spectral frames to phonemes and resolves language context.</div>
              </div>

              <div id="stt-title-node-4" class="step-card-asr" style="border-left: 4px solid #059669; transition: all 0.3s ease;">
                <div style="display: flex; justify-content: space-between;">
                  <span style="font-size: 0.72rem; font-weight: 800; color: #059669; text-transform: uppercase;">4. Final Output</span>
                  <span class="asr-badge asr-badge-language">String Text</span>
                </div>
                <div style="font-weight: 800; font-size: 0.92rem; color: #059669; margin-top: 0.15rem;">Text: "Natural Language"</div>
                <div style="font-size: 0.78rem; color: #475569;">Transcribed text ready for downstream NLP tasks.</div>
              </div>
            </div>

            <!-- Status banner -->
            <div style="margin-top: 0.75rem; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.45rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem;">
              <span id="stt-title-status" style="color: #059669; font-weight: 700;">● ASR Engine Ready</span>
              <span style="color: #64748B;">Duration: ~25s Narration</span>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      sttApp.playTitleAnimation();
    }
  },

  // ========================================================================
  // SLIDE 2: Introduction to STT
  // ========================================================================
  {
    id: 'slide-2',
    part: 'Foundations',
    partNumber: 'SLIDE 02',
    title: 'Introduction to Speech to Text',
    subtitle: 'Definition, Significance, and Fundamental Challenges in ASR',
    duration: '35 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 35 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Speech to Text, or Automatic Speech Recognition, is the technological discipline that enables computers to convert spoken language into written text. Speech is the most natural human communication medium, but it presents enormous challenges: variations in accents, ambient background noise, speech speed differences, and homophones like 'write' and 'right'. ASR acts as the sensory front-end gateway that feeds downstream NLP engines like transformers and chatbots.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Theoretical Principles -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Core Principles
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                What is Speech to Text (ASR)?
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                <div style="padding: 0.65rem 0.85rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #2563EB;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.92rem;">Primary Objective</div>
                  <div style="font-size: 0.82rem; color: #475569; margin-top: 0.2rem; line-height: 1.45;">
                    Given an acoustic speech signal <i>X</i>, determine the most probable word sequence <i>Ŵ</i> = argmax<sub><i>W</i></sub> <i>P</i>(<i>W</i> | <i>X</i>).
                  </div>
                </div>

                <div style="padding: 0.65rem 0.85rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #059669;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.92rem;">The Role of NLP</div>
                  <div style="font-size: 0.82rem; color: #475569; margin-top: 0.2rem; line-height: 1.45;">
                    Acoustics alone cannot disambiguate homophones (e.g., <em>"recognize speech"</em> vs <em>"wreck a nice beach"</em>). NLP language models provide grammar and semantic context!
                  </div>
                </div>

                <div style="padding: 0.65rem 0.85rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #D97706;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.92rem;">Real-World Variability</div>
                  <div style="font-size: 0.82rem; color: #475569; margin-top: 0.2rem; line-height: 1.45;">
                    Copes with accents, speaking rates, emotional pitch, co-articulation, and microphone noise.
                  </div>
                </div>
              </div>
            </div>

            <!-- Mathematical Formulation Banner -->
            <div style="background: rgba(37,99,235,0.06); border: 1.5px solid rgba(37,99,235,0.2); border-radius: var(--radius-md); padding: 0.65rem 0.95rem; font-family: var(--font-mono); font-size: 0.82rem; color: #1E3A8A;">
              <strong>Bayes' Decision Rule:</strong> <i>Ŵ</i> = argmax<sub><i>W</i></sub> [ <i>P</i>(<i>X</i> | <i>W</i>)<sub>(Acoustic&nbsp;Model)</sub> &middot; <i>P</i>(<i>W</i>)<sub>(Language&nbsp;Model)</sub> ]
            </div>
          </div>

          <!-- Right: Interactive Homophone & Ambiguity Resolver -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Lab</span>
                <span class="asr-badge asr-badge-language" style="font-size: 0.72rem;">Acoustic Ambiguity</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Why ASR Needs NLP: The Homophone Challenge
              </h3>
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 0.75rem;">
                Click below to see how identical acoustic sound streams are resolved by language context:
              </p>

              <!-- Ambiguity Selector Buttons -->
              <div style="display: flex; gap: 0.45rem; margin-bottom: 0.85rem;">
                <button type="button" class="btn-action btn-action-secondary" id="btn-homo-1" onclick="sttApp.resolveHomophone(1)" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                  1. "recognize speech"
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-homo-2" onclick="sttApp.resolveHomophone(2)" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                  2. "there / their / they're"
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="btn-homo-3" onclick="sttApp.resolveHomophone(3)" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                  3. "two / too / to"
                </button>
              </div>

              <!-- Interactive Display Box -->
              <div id="homophone-display-card" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 1rem; min-height: 140px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Populated dynamically -->
              </div>
            </div>

            <!-- Auto Test Button -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
              <span style="font-size: 0.78rem; color: #475569;">Try each case to observe probability scoring:</span>
              <button type="button" class="btn-action btn-action-primary" onclick="sttApp.autoPlayHomophones()" style="font-size: 0.78rem; padding: 0.4rem 0.85rem;">
                ▶ Auto Test All
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      sttApp.resolveHomophone(1);
    }
  },

  // ========================================================================
  // SLIDE 3: STT Pipeline & Audio Preprocessing
  // ========================================================================
  {
    id: 'slide-3',
    part: 'Architecture',
    partNumber: 'SLIDE 03',
    title: 'The STT Pipeline: Audio Preprocessing & MFCC',
    subtitle: 'From Continuous Waveform to 25ms Spectral Feature Frames',
    duration: '40 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 40 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Before any neural network can transcribe speech, the audio waveform must be preprocessed. We sample the analog wave at 16,000 Hertz, apply pre-emphasis to boost high frequencies, slice the signal into 25-millisecond overlapping frames, and apply a Hamming window. We then perform Fast Fourier Transform and pass the spectrum through Mel Filter Banks. Finally, Discrete Cosine Transform extracts 13 to 39 MFCC coefficients, capturing the timbre and phonetic fingerprint of human speech.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: 5-Stage Audio Preprocessing -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #0284C7; text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: 0.05em;">
                Signal Processing Stage
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Extracting MFCC Feature Vectors
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div class="step-card-asr" id="mfcc-step-1" style="padding: 0.5rem 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #0F172A;">
                    <span>1. Pre-Emphasis & Sampling</span>
                    <span style="font-size: 0.72rem; color: #2563EB; font-family: var(--font-mono);">16 kHz</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #475569;">Boosts higher frequencies using filter $y[n] = x[n] - 0.97x[n-1]$.</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-2" style="padding: 0.5rem 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #0F172A;">
                    <span>2. Framing & Windowing</span>
                    <span style="font-size: 0.72rem; color: #2563EB; font-family: var(--font-mono);">25ms / 10ms step</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #475569;">Applies Hamming Window to prevent edge spectral leakage.</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-3" style="padding: 0.5rem 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #0F172A;">
                    <span>3. Fast Fourier Transform (FFT)</span>
                    <span style="font-size: 0.72rem; color: #2563EB; font-family: var(--font-mono);">Time ➔ Freq</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #475569;">Converts each time window into its frequency power spectrum.</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-4" style="padding: 0.5rem 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #0F172A;">
                    <span>4. Mel-Scale Filter Bank</span>
                    <span style="font-size: 0.72rem; color: #2563EB; font-family: var(--font-mono);">Perceptual Pitch</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #475569;">Warps frequencies to match human ear: <i>m</i> = 2595 &middot; log<sub>10</sub>(1 + <i>f</i>/700).</div>
                </div>

                <div class="step-card-asr" id="mfcc-step-5" style="padding: 0.5rem 0.75rem;">
                  <div style="display: flex; justify-content: space-between; font-size: 0.82rem; font-weight: 800; color: #0F172A;">
                    <span>5. Discrete Cosine Transform (DCT)</span>
                    <span style="font-size: 0.72rem; color: #059669; font-family: var(--font-mono);">39 Features</span>
                  </div>
                  <div style="font-size: 0.76rem; color: #475569;">Extracts 13 Cepstral coefficients + &Delta; (velocity) + &Delta;&Delta; (acceleration).</div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.75rem; color: #64748B; margin-top: 0.25rem;">
              Outputs a sequence of 39-dimensional acoustic feature vectors every 10ms.
            </div>
          </div>

          <!-- Right: Interactive Waveform & Spectrogram Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #0284C7; text-transform: uppercase; letter-spacing: 0.05em;">Simulation / Animation</span>
                <span class="asr-badge asr-badge-audio" id="wave-state-badge">Synthesizer Active</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">
                Live Speech Signal & Spectrogram
              </h3>

              <!-- Waveform Canvas Display -->
              <div class="audio-wave-container" style="margin-bottom: 0.65rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #94A3B8; font-family: var(--font-mono);">
                  <span>INPUT WAVEFORM [Amplitude vs. Time]</span>
                  <span id="wave-freq-label">440 Hz Formant</span>
                </div>
                <canvas id="stt-wave-canvas" width="460" height="70" style="width: 100%; height: 70px; display: block; border-radius: 4px;"></canvas>
                
                <div style="display: flex; justify-content: space-between; font-size: 0.72rem; color: #94A3B8; font-family: var(--font-mono); margin-top: 0.25rem;">
                  <span>MEL-SPECTROGRAM [Frequency vs. Time]</span>
                  <span>40 Filter Channels</span>
                </div>
                <div class="spectrogram-box" id="spectrogram-visualizer">
                  <!-- Animated via JS -->
                </div>
              </div>
            </div>

            <!-- Sound Preset Controls -->
            <div style="display: flex; gap: 0.45rem; justify-content: space-between; align-items: center;">
              <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.setAudioSample('vowel')" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                Vowel /a:/ (Low)
              </button>
              <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.setAudioSample('fricative')" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                Fricative /s/ (High)
              </button>
              <button type="button" class="btn-action btn-action-primary" onclick="sttApp.setAudioSample('word')" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                Full Word ("NLP")
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      sttApp.initWaveformCanvas();
    }
  },

  // ========================================================================
  // SLIDE 4: Acoustic, Pronunciation & Language Models
  // ========================================================================
  {
    id: 'slide-4',
    part: 'Core Models',
    partNumber: 'SLIDE 04',
    title: 'The Triad: Acoustic, Lexicon & Language Models',
    subtitle: 'Classical HMM-GMM vs. Modern End-to-End Neural Decoders',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Historically, ASR relied on a triad of models: the Acoustic Model, which calculated the probability of an audio frame given a phoneme; the Pronunciation Lexicon, which mapped phonemes into words; and the Language Model, which predicted the probability of word sequences using n-grams. In modern ASR, this multi-stage pipeline is unified into End-to-End Neural Architectures like CTC, Conformer, and OpenAI's Whisper, which directly map acoustic frames into text tokens using attention mechanisms.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Classical Triad Architecture -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: 0.05em;">
                Classical ASR Architecture
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.65rem;">
                The 3 Traditional Components
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                <!-- Component 1 -->
                <div style="padding: 0.65rem 0.85rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #2563EB;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #2563EB; font-size: 0.9rem;">1. Acoustic Model (AM)</strong>
                    <span class="asr-badge asr-badge-acoustic">HMM / DNN</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #475569; margin-top: 0.2rem;">
                    Models <i>P</i>(Audio | Phoneme). Matches 25ms MFCC vectors to elementary speech sounds (e.g. /k/, /æ/, /t/).
                  </div>
                </div>

                <!-- Component 2 -->
                <div style="padding: 0.65rem 0.85rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #7C3AED;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #7C3AED; font-size: 0.9rem;">2. Pronunciation Lexicon (L)</strong>
                    <span class="asr-badge asr-badge-pronunciation">Dictionary</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #475569; margin-top: 0.2rem;">
                    Maps phoneme sequences to dictionary vocabulary words (e.g., <code>/k/ /æ/ /t/ ➔ "cat"</code>).
                  </div>
                </div>

                <!-- Component 3 -->
                <div style="padding: 0.65rem 0.85rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #059669;">
                  <div style="display: flex; justify-content: space-between; align-items: center;">
                    <strong style="color: #059669; font-size: 0.9rem;">3. Language Model (LM)</strong>
                    <span class="asr-badge asr-badge-language">N-gram / RNN / Transformer</span>
                  </div>
                  <div style="font-size: 0.78rem; color: #475569; margin-top: 0.2rem;">
                    Models <i>P</i>(<i>W</i>). Assigns probabilities to word sequences to ensure grammatically coherent transcriptions.
                  </div>
                </div>
              </div>
            </div>

            <!-- Viterbi Decoding Note -->
            <div style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-size: 0.75rem; color: #475569;">
              ⚡ <strong>Viterbi Search Decoder:</strong> Finds the optimal path through the combined search graph <i>AM</i> &times; <i>L</i> &times; <i>LM</i>.
            </div>
          </div>

          <!-- Right: Interactive Paradigm Shift (Classical vs. Modern E2E) -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.05em;">Paradigm Shift</span>
                <span class="asr-badge asr-badge-pronunciation">Architecture Comparison</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Classical Pipeline vs. Modern End-to-End
              </h3>

              <!-- Toggle Buttons -->
              <div style="display: flex; gap: 0.45rem; margin-bottom: 0.85rem;">
                <button type="button" class="btn-action btn-action-secondary" id="btn-arch-classical" onclick="sttApp.showArchMode('classical')" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                  Classical (HMM-GMM)
                </button>
                <button type="button" class="btn-action btn-action-primary" id="btn-arch-e2e" onclick="sttApp.showArchMode('e2e')" style="flex: 1; font-size: 0.78rem; padding: 0.4rem;">
                  Modern E2E (Conformer / Whisper)
                </button>
              </div>

              <!-- Interactive Diagram Container -->
              <div id="arch-diagram-display" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 1rem; min-height: 180px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Rendered dynamically -->
              </div>
            </div>

            <div id="arch-summary-text" style="font-size: 0.76rem; color: #334155; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); margin-top: 0.5rem;">
              <strong>End-to-End Advantage:</strong> Replaces isolated error-accumulating modules with a single unified neural network trained directly from audio to text!
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      sttApp.showArchMode('e2e');
    }
  },

  // ========================================================================
  // SLIDE 5: Real-World Demonstration & Metrics
  // ========================================================================
  {
    id: 'slide-5',
    part: 'Evaluation & Demo',
    partNumber: 'SLIDE 05',
    title: 'Real-World Demonstration & Evaluation Metrics',
    subtitle: 'Word Error Rate (WER), Subtitle Generation & Voice Assistant Deployment',
    duration: '40 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 40 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “In industry, ASR performance is benchmarked using Word Error Rate (WER), which calculates the sum of substitutions, deletions, and insertions divided by total reference words. SOTA transformer models achieve human-level accuracy below 5% WER on clean speech. STT powers mission-critical applications: Siri and Alexa voice assistants, live YouTube closed captions, automated medical clinical dictation, and real-time meeting transcription.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Evaluation Metric (WER) -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: 0.05em;">
                Industry Standard Metric
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.65rem;">
                Word Error Rate (WER)
              </h3>

              <div style="background: #ECFDF5; border: 1.5px solid #A7F3D0; border-radius: var(--radius-md); padding: 0.85rem; margin-bottom: 0.85rem;">
                <div style="font-family: var(--font-mono); font-size: 1rem; font-weight: 800; color: #065F46; margin-bottom: 0.35rem;">
                  WER = (S + D + I) / N
                </div>
                <div style="font-size: 0.78rem; color: #047857; display: flex; flex-direction: column; gap: 0.2rem;">
                  <div>• <strong>S (Substitutions):</strong> Incorrectly transcribed words</div>
                  <div>• <strong>D (Deletions):</strong> Spoken words omitted by ASR</div>
                  <div>• <strong>I (Insertions):</strong> Hallucinated words not in audio</div>
                  <div>• <strong>N:</strong> Total word count in ground truth reference</div>
                </div>
              </div>

              <!-- Real-World Domains List -->
              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                Primary NLP Production Applications
              </div>
              <ul style="padding-left: 1.2rem; font-size: 0.82rem; color: #334155; display: flex; flex-direction: column; gap: 0.3rem;">
                <li><strong>Voice Assistants:</strong> Apple Siri, Google Assistant, Amazon Alexa</li>
                <li><strong>Automated Subtitling:</strong> Live captioning for YouTube, Zoom, Teams</li>
                <li><strong>Healthcare:</strong> Clinical physician dictation & EHR documentation</li>
                <li><strong>Call Center Analytics:</strong> Sentiment analysis & customer triage</li>
              </ul>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Target benchmark: Clean speech &lt; 5% WER | Noisy / Multi-speaker ~10-15% WER.
            </div>
          </div>

          <!-- Right: Interactive Live STT Transcriber Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.05em;">Live Simulator</span>
                <span class="asr-badge asr-badge-language" id="live-stt-status">Ready</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Interactive Speech Transcription Demo
              </h3>
              <p style="font-size: 0.82rem; color: #475569; margin-bottom: 0.75rem;">
                Select a real-world audio sentence to simulate ASR transcription:
              </p>

              <!-- Sample Presets -->
              <div style="display: flex; gap: 0.35rem; margin-bottom: 0.75rem;">
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.simulateTranscription(1)" style="font-size: 0.74rem; padding: 0.3rem 0.55rem;">Sample 1 (Medical)</button>
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.simulateTranscription(2)" style="font-size: 0.74rem; padding: 0.3rem 0.55rem;">Sample 2 (Finance)</button>
                <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.simulateTranscription(3)" style="font-size: 0.74rem; padding: 0.3rem 0.55rem;">Sample 3 (AI / NLP)</button>
              </div>

              <!-- Output Box -->
              <div id="stt-transcription-box" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 1rem; min-height: 140px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Populated dynamically -->
              </div>
            </div>

            <!-- WER Calculation Output -->
            <div id="stt-wer-output" style="padding: 0.55rem 0.75rem; background: #FFFFFF; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); font-size: 0.78rem; color: #334155; margin-top: 0.5rem;">
              Click a sample above to observe token alignment, acoustic decoding, and WER evaluation.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      sttApp.simulateTranscription(3);
    }
  },

  // ========================================================================
  // SLIDE 6: Conclusion
  // ========================================================================
  {
    id: 'slide-6',
    part: 'Conclusion',
    partNumber: 'SLIDE 06',
    title: 'Conclusion & Future Frontiers',
    subtitle: 'From Handcrafted Pipelines to Foundation Audio-Language Models',
    duration: '25 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 25 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “In conclusion, Speech to Text conversion is the bridge connecting analog human acoustics to computational natural language processing. The field has evolved from statistical HMM-GMM triads to unified transformer foundation models like Whisper and Gemini Audio. Future frontiers lie in multilingual zero-shot translation, ultra-low latency on-device inference, and robust noise cancellation. Thank you very much!”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1.1fr 0.9fr; height: 100%; align-items: stretch;">
          <!-- Left: Summary of Core Takeaways -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Executive Summary
              </div>
              <h3 style="font-size: 1.3rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                Key Takeaways
              </h3>

              <!-- Summary Table -->
              <table class="academic-table" style="font-size: 0.8rem; margin-bottom: 0.85rem;">
                <thead>
                  <tr>
                    <th>Dimension</th>
                    <th>Classical ASR</th>
                    <th style="color: #2563EB;">Modern Neural ASR</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Features</strong></td>
                    <td>Handcrafted MFCC (39-dim)</td>
                    <td>Raw Waveform / Log-Mel Filterbanks</td>
                  </tr>
                  <tr>
                    <td><strong>Architecture</strong></td>
                    <td>HMM-GMM + N-gram LM</td>
                    <td>Conformer / Transformer / Whisper</td>
                  </tr>
                  <tr>
                    <td><strong>Training</strong></td>
                    <td>Multi-stage isolated training</td>
                    <td>Unified End-to-End optimization</td>
                  </tr>
                  <tr>
                    <td><strong>Error Rate</strong></td>
                    <td>15% – 25% WER</td>
                    <td>&lt; 5% WER (Human parity)</td>
                  </tr>
                </tbody>
              </table>

              <!-- 3 Bullet Takeaways -->
              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.84rem; color: #0F172A;">
                  <span style="color: #059669; font-weight: 800;">✓</span>
                  <span><strong>Acoustics + NLP:</strong> Sound feature extraction coupled with language models resolves ambiguities.</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.84rem; color: #0F172A;">
                  <span style="color: #059669; font-weight: 800;">✓</span>
                  <span><strong>End-to-End Dominance:</strong> Attention mechanisms decode full sentences seamlessly.</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.84rem; color: #0F172A;">
                  <span style="color: #059669; font-weight: 800;">✓</span>
                  <span><strong>Ubiquitous Deployment:</strong> Powers accessibility, assistants, transcription, and multimodal AI.</span>
                </div>
              </div>
            </div>

            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.45rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.76rem; color: #475569; display: flex; justify-content: space-between;">
              <span>Analog Speech ➔ MFCC / Mel-Spectrogram ➔ Attention Decoder ➔ Token String</span>
              <span style="color: #059669; font-weight: 800;">Complete Pipeline</span>
            </div>
          </div>

          <!-- Right: Thank You Card & Q&A Interactive Banner -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; text-align: center; background: linear-gradient(135deg, #FFFFFF, #EFF6FF); border: 2px solid rgba(37, 99, 235, 0.25);">
            <div>
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(37, 99, 235, 0.1); color: var(--accent-blue); font-size: 1.8rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 0.75rem auto; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.15);">
                🎙️
              </div>

              <h2 style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 0.25rem; letter-spacing: -0.02em;">
                Thank You!
              </h2>

              <p style="font-size: 1.05rem; font-weight: 800; color: #2563EB; margin-bottom: 0.65rem;">
                Any Questions or Discussion on Speech to Text & NLP?
              </p>

              <!-- Presenter Card -->
              <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 0.85rem; max-width: 320px; margin: 0 auto 1rem auto; box-shadow: 0 4px 12px rgba(15,23,42,0.04);">
                <div style="font-size: 0.95rem; font-weight: 800; color: #0F172A;">
                  Prasad Anil Kankhar
                </div>
                <div style="font-size: 0.82rem; font-weight: 600; color: #2563EB;">
                  B.Tech CSE — CSE402 (NLP)
                </div>
                <div style="font-size: 0.75rem; color: #64748B;">
                  Maharashtra Institute of Technology
                </div>
              </div>
            </div>

            <!-- Controls -->
            <div style="display: flex; justify-content: center; gap: 0.65rem;">
              <button type="button" class="btn-action btn-action-primary" onclick="sttApp.goToSlide(0)">
                ⏮ Replay from Slide 1
              </button>
              <button type="button" class="btn-action btn-action-secondary" onclick="sttApp.celebratePresentation()">
                🎉 Complete
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      // Conclusion slide init
    }
  }
];

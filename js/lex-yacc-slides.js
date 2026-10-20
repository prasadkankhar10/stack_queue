// ==========================================================================
// LEX & YACC COMPILER DESIGN - 6 SLIDES COMPLETE SPECIFICATION
// Theme: Academic Light (Lecture Hall High-Contrast) | 16:9 Presentation Format
// Precise Academic Content & Interactive Step-by-Step Simulations
// ==========================================================================

window.lexYaccSlidesData = [
  // ========================================================================
  // SLIDE 1: Title Slide
  // ========================================================================
  {
    id: 'slide-1',
    part: 'Title Slide',
    partNumber: 'SLIDE 01',
    title: 'LEX and YACC',
    subtitle: 'Tools for Lexical Analysis and Syntax Analysis',
    duration: '20 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 20 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “Hello everyone. I am Prasad Anil Kankhar from the Department of Computer Science and Engineering. Today, I am going to explain two important compiler design tools, LEX and YACC. I will discuss their purpose, how they work, and how they can be used in a real-world calculator application.”
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
              <div style="font-size: 0.78rem; font-weight: 700; color: #2563EB; margin-bottom: 1rem;">
                Department of Computer Science and Engineering
              </div>

              <div style="border-left: 4px solid #2563EB; padding-left: 1rem; margin-bottom: 1.25rem;">
                <h2 style="font-size: 2.1rem; font-weight: 900; color: #0F172A; line-height: 1.15; letter-spacing: -0.02em;">
                  LEX and YACC
                </h2>
                <div style="font-size: 1.05rem; font-weight: 700; color: #334155; margin-top: 0.35rem;">
                  Tools for Lexical Analysis and Syntax Analysis
                </div>
              </div>

              <!-- Academic Details Card -->
              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 1rem 1.25rem; display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="display: flex; justify-content: space-between; font-size: 0.86rem;">
                  <span style="color: #64748B; font-weight: 600;">Course:</span>
                  <strong style="color: #0F172A;">Compiler Design (CSE401)</strong>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.86rem;">
                  <span style="color: #64748B; font-weight: 600;">Academic Year:</span>
                  <strong style="color: #0F172A;">2026–27</strong>
                </div>
                <div style="height: 1px; background: #E2E8F0; margin: 0.25rem 0;"></div>
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
              <button type="button" class="btn-action btn-action-primary" onclick="lexYaccApp.nextSlide()" title="Begin presentation">
                Start Presentation →
              </button>
              <button type="button" class="btn-action btn-action-secondary" onclick="lexYaccApp.playTitleAnimation()" title="Replay intro flow">
                ▶ Replay Title Animation
              </button>
            </div>
          </div>

          <!-- Right: Title Simulation / Animation Card -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, #FFFFFF, #F8FAFC);">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Flow Animation</span>
                <span class="token-badge token-kw" style="font-size: 0.72rem;">Sequence Demo</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                The Two Pillars of Compiler Front-End
              </h3>
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 1.25rem;">
                LEX and YACC operate hand-in-hand to transform raw characters into structured grammatical trees:
              </p>
            </div>

            <!-- Animated Stages 1 -> 2 -> 3 -> 4 -->
            <div style="display: flex; flex-direction: column; gap: 0.75rem; align-items: stretch;" id="title-anim-container">
              <!-- Stage 1: Main Title Banner -->
              <div id="anim-stage-1" class="flow-step-node" style="border-left: 4px solid #2563EB; transition: all 0.4s ease;">
                <div class="flow-step-num">Step 1 — Title</div>
                <div class="flow-step-title" style="font-size: 1.05rem;">LEX and YACC</div>
                <div class="flow-step-desc">Automated tools for Compiler Design & Language Processing.</div>
              </div>

              <!-- Connecting Arrow Down 1 -->
              <div style="text-align: center; color: #2563EB; font-weight: 800; font-size: 1.2rem; line-height: 0.5;" id="anim-arrow-1">↓</div>

              <!-- Stage 2: LEX -->
              <div id="anim-stage-2" class="flow-step-node" style="border-left: 4px solid #0284C7; transition: all 0.4s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="flow-step-num">Step 2 — Scanner Generator</span>
                  <span class="token-badge token-id">Token Recognizer</span>
                </div>
                <div class="flow-step-title" style="color: #0284C7;">LEX — Lexical Analysis</div>
                <div class="flow-step-desc">Reads characters, uses regular expressions, and emits tokens.</div>
              </div>

              <!-- Connecting Arrow Down 2 (Connecting LEX to YACC) -->
              <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem;" id="anim-arrow-connect">
                <span style="font-size: 0.74rem; font-weight: 700; color: #64748B; font-family: var(--font-mono); background: #FFFFFF; border: 1px solid #CBD5E1; padding: 0.15rem 0.5rem; border-radius: 999px;">
                  passes tokens via yylex() ➔
                </span>
                <span style="color: #7C3AED; font-weight: 900; font-size: 1.2rem;">↓</span>
              </div>

              <!-- Stage 3: YACC -->
              <div id="anim-stage-3" class="flow-step-node" style="border-left: 4px solid #7C3AED; transition: all 0.4s ease;">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="flow-step-num">Step 3 — Parser Generator</span>
                  <span class="token-badge token-kw">Grammar Verifier</span>
                </div>
                <div class="flow-step-title" style="color: #7C3AED;">YACC — Syntax Analysis</div>
                <div class="flow-step-desc">Receives tokens, enforces grammar rules, and constructs the parse tree.</div>
              </div>
            </div>

            <!-- Animation Controls Bar -->
            <div style="margin-top: 1rem; display: flex; align-items: center; justify-content: space-between; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.78rem;">
              <span id="title-anim-status" style="color: #059669; font-weight: 700;">● Simulation Loaded</span>
              <span style="color: #64748B;">Duration: ~20s Narration</span>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.playTitleAnimation();
    }
  },

  // ========================================================================
  // SLIDE 2: Introduction to LEX and YACC
  // ========================================================================
  {
    id: 'slide-2',
    part: 'Foundations',
    partNumber: 'SLIDE 02',
    title: 'Introduction to LEX and YACC',
    subtitle: 'From Source Code to Lexical Tokens and Grammatical Syntax Structure',
    duration: '30 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 30 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “A compiler processes a program through different phases. Lexical analysis identifies meaningful units called tokens. Syntax analysis checks whether those tokens follow the grammar of the language. LEX is used to generate a lexical analyzer, while YACC is used to generate a parser. In a typical workflow, LEX passes tokens to YACC, and YACC checks their structure.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: On-Slide Text -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Theoretical Foundation
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.65rem;">
                Introduction to LEX and YACC
              </h3>
              
              <p style="font-size: 0.88rem; color: #334155; line-height: 1.5; margin-bottom: 1rem; padding: 0.5rem 0.75rem; background: #F8FAFC; border-radius: var(--radius-sm); border-left: 3px solid #2563EB;">
                A compiler translates source code into another form, commonly machine code.
              </p>

              <!-- Two Phase Cards -->
              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
                <!-- Lexical Analysis -->
                <div style="padding: 0.75rem 1rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #0284C7;">
                  <div style="font-weight: 800; color: #0284C7; font-size: 0.95rem; margin-bottom: 0.35rem;">
                    Lexical Analysis
                  </div>
                  <ul style="padding-left: 1.2rem; font-size: 0.82rem; color: #334155; display: flex; flex-direction: column; gap: 0.25rem;">
                    <li>Reads source code as characters.</li>
                    <li>Groups characters into meaningful tokens.</li>
                    <li>Commonly generated using <strong>LEX</strong>.</li>
                  </ul>
                </div>

                <!-- Syntax Analysis -->
                <div style="padding: 0.75rem 1rem; background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #7C3AED;">
                  <div style="font-weight: 800; color: #7C3AED; font-size: 0.95rem; margin-bottom: 0.35rem;">
                    Syntax Analysis
                  </div>
                  <ul style="padding-left: 1.2rem; font-size: 0.82rem; color: #334155; display: flex; flex-direction: column; gap: 0.25rem;">
                    <li>Processes tokens.</li>
                    <li>Checks grammar rules.</li>
                    <li>Commonly generated using <strong>YACC</strong>.</li>
                  </ul>
                </div>
              </div>
            </div>

            <!-- Compiler Flow Banner -->
            <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 0.75rem 1rem;">
              <div style="font-size: 0.74rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                Compiler Flow:
              </div>
              <div style="display: flex; align-items: center; justify-content: space-between; font-family: var(--font-mono); font-size: 0.78rem; font-weight: 700;">
                <span style="color: #0F172A;">Source Code</span>
                <span style="color: #2563EB;">→</span>
                <span class="token-badge token-id" style="font-size: 0.74rem;">LEX</span>
                <span style="color: #2563EB;">→</span>
                <span class="token-badge token-num" style="font-size: 0.74rem;">Tokens</span>
                <span style="color: #2563EB;">→</span>
                <span class="token-badge token-kw" style="font-size: 0.74rem;">YACC</span>
                <span style="color: #2563EB;">→</span>
                <span style="color: #059669;">Syntax Structure</span>
              </div>
            </div>
          </div>

          <!-- Right: Simulation / Animation (One-by-One Stages) -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Simulation / Animation</span>
                <span class="token-badge token-num" style="font-size: 0.72rem;">Live Pipeline</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">
                Sequential Stage Demonstration
              </h3>
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 0.85rem;">
                Click below to reveal each stage one by one:
              </p>

              <!-- Stage Cards Container -->
              <div style="display: flex; flex-direction: column; gap: 0.65rem;" id="intro-step-nodes">
                <!-- Step 1: Source code -->
                <div class="flow-step-node" id="intro-stage-1" style="transition: all 0.3s ease;">
                  <div style="display: flex; justify-content: space-between;">
                    <span class="flow-step-num">Stage 1</span>
                    <span class="token-badge token-delim" style="font-size: 0.7rem;">Input Text</span>
                  </div>
                  <div class="flow-step-title">Source code: <code style="color: #2563EB; font-size: 1rem;">10 + 20</code></div>
                  <div class="flow-step-desc">Stream of raw characters: '1', '0', ' ', '+', ' ', '2', '0'.</div>
                </div>

                <!-- Step 2: LEX Recognizes tokens -->
                <div class="flow-step-node" id="intro-stage-2" style="transition: all 0.3s ease; opacity: 0.4;">
                  <div style="display: flex; justify-content: space-between;">
                    <span class="flow-step-num">Stage 2</span>
                    <span class="token-badge token-id" style="font-size: 0.7rem;">LEX Scanner</span>
                  </div>
                  <div class="flow-step-title">LEX: Recognizes tokens</div>
                  <div style="margin-top: 0.25rem; display: flex; gap: 0.4rem; align-items: center;">
                    <span style="font-size: 0.8rem; font-weight: 700; color: #475569;">Tokens:</span>
                    <span class="token-badge token-num">NUMBER (10)</span>
                    <span class="token-badge token-op">+</span>
                    <span class="token-badge token-num">NUMBER (20)</span>
                  </div>
                </div>

                <!-- Step 3: YACC Checks grammar -->
                <div class="flow-step-node" id="intro-stage-3" style="transition: all 0.3s ease; opacity: 0.4;">
                  <div style="display: flex; justify-content: space-between;">
                    <span class="flow-step-num">Stage 3</span>
                    <span class="token-badge token-kw" style="font-size: 0.7rem;">YACC Parser</span>
                  </div>
                  <div class="flow-step-title">YACC: Checks grammar</div>
                  <div style="margin-top: 0.25rem;">
                    <span class="token-badge token-num" style="background: #ECFDF5; color: #047857; border-color: #A7F3D0; font-size: 0.84rem;">
                      ✅ Valid expression (Matches rule: expr → expr + term)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Step Control Buttons -->
            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button type="button" class="btn-action btn-action-secondary" id="btn-intro-1" onclick="lexYaccApp.revealIntroStage(1)" style="flex: 1; font-size: 0.78rem; padding: 0.45rem;">
                1. Source Code
              </button>
              <button type="button" class="btn-action btn-action-secondary" id="btn-intro-2" onclick="lexYaccApp.revealIntroStage(2)" style="flex: 1; font-size: 0.78rem; padding: 0.45rem;">
                2. LEX Tokens
              </button>
              <button type="button" class="btn-action btn-action-secondary" id="btn-intro-3" onclick="lexYaccApp.revealIntroStage(3)" style="flex: 1; font-size: 0.78rem; padding: 0.45rem;">
                3. YACC Grammar
              </button>
              <button type="button" class="btn-action btn-action-primary" onclick="lexYaccApp.autoPlayIntroStages()" title="Auto Play All Stages" style="padding: 0.45rem 0.75rem; font-size: 0.8rem;">
                ▶ Auto
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.revealIntroStage(1);
    }
  },

  // ========================================================================
  // SLIDE 3: LEX: Tool for Lexical Analysis
  // ========================================================================
  {
    id: 'slide-3',
    part: 'Lexical Analysis',
    partNumber: 'SLIDE 03',
    title: 'LEX: Tool for Lexical Analysis',
    subtitle: 'LEX — Lexical Analyzer Generator',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “LEX stands for a lexical analyzer generator. It generates a scanner that identifies tokens using patterns, commonly expressed as regular expressions. Consider the statement total equals ten plus twenty. LEX recognizes total as an identifier, the equals sign as an assignment operator, ten and twenty as numbers, and the plus sign as an arithmetic operator. It also recognizes the semicolon. These tokens are then passed to the syntax analyzer. This automated process reduces the effort of writing a scanner manually.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: On-Slide Text & Lexeme Table -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #0284C7; text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: 0.05em;">
                Lexical Analyzer Generator
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                LEX — Lexical Analyzer Generator
              </h3>
              
              <p style="font-size: 0.84rem; color: #334155; margin-bottom: 0.65rem; background: #F0F9FF; border-left: 3px solid #0284C7; padding: 0.4rem 0.65rem; border-radius: 4px;">
                <strong>Definition:</strong> LEX is a tool that generates a lexical analyzer or scanner.
              </p>

              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.25rem;">
                Main functions
              </div>
              <ul style="padding-left: 1.15rem; font-size: 0.8rem; color: #334155; display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.65rem;">
                <li>Reads source code character by character.</li>
                <li>Identifies tokens using patterns and regular expressions.</li>
                <li>Classifies identifiers, numbers, operators, and symbols.</li>
                <li>Passes tokens to the parser.</li>
              </ul>

              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.25rem;">
                Example input: <code style="color: #2563EB;">total = 10 + 20;</code>
              </div>

              <!-- Lexeme Table -->
              <table class="academic-table" style="font-size: 0.78rem;">
                <thead>
                  <tr>
                    <th>Lexeme</th>
                    <th>Token type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr id="tbl-row-0"><td><code>total</code></td><td><span class="token-badge token-id" style="font-size: 0.72rem;">IDENTIFIER</span></td></tr>
                  <tr id="tbl-row-1"><td><code>=</code></td><td><span class="token-badge token-op" style="font-size: 0.72rem;">ASSIGN</span></td></tr>
                  <tr id="tbl-row-2"><td><code>10</code></td><td><span class="token-badge token-num" style="font-size: 0.72rem;">NUMBER</span></td></tr>
                  <tr id="tbl-row-3"><td><code>+</code></td><td><span class="token-badge token-op" style="font-size: 0.72rem;">PLUS</span></td></tr>
                  <tr id="tbl-row-4"><td><code>20</code></td><td><span class="token-badge token-num" style="font-size: 0.72rem;">NUMBER</span></td></tr>
                  <tr id="tbl-row-5"><td><code>;</code></td><td><span class="token-badge token-delim" style="font-size: 0.72rem;">SEMICOLON</span></td></tr>
                </tbody>
              </table>
            </div>

            <div style="font-size: 0.74rem; color: #64748B; margin-top: 0.4rem;">
              Generated function: <code>int yylex(void)</code> • Scanner file: <code>lex.yy.c</code>
            </div>
          </div>

          <!-- Right: Interactive One-by-One Token Scanner -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #0284C7; text-transform: uppercase; letter-spacing: 0.05em;">Simulation / Animation</span>
                <span class="token-badge token-id" style="font-size: 0.72rem;" id="scanner-step-badge">Token 1 of 6</span>
              </div>
              
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Scanner Moving Through Input
              </h3>
              
              <!-- Input Code Tape Visualizer -->
              <div style="margin-bottom: 0.85rem;">
                <div style="font-size: 0.74rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 0.25rem;">
                  Input code
                </div>
                <div id="lex-code-tape" style="display: flex; gap: 0.35rem; padding: 0.65rem 0.85rem; background: #0F172A; border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 1.1rem; font-weight: 700; overflow-x: auto;">
                  <!-- Filled dynamically with highlighted lexemes -->
                </div>
              </div>

              <!-- Current Token Reveal Box -->
              <div style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 1rem; text-align: center; margin-bottom: 0.85rem;">
                <div style="font-size: 0.76rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 0.3rem;">
                  Show one token at a time
                </div>
                <div id="scanner-current-lexeme" style="font-size: 1.7rem; font-family: var(--font-mono); font-weight: 900; color: #0F172A; margin-bottom: 0.4rem;">
                  total
                </div>
                <div style="font-size: 0.76rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 0.3rem;">
                  Recognized token
                </div>
                <div id="scanner-current-token">
                  <span class="token-badge token-id" style="font-size: 1.1rem; padding: 0.35rem 0.95rem;">IDENTIFIER</span>
                </div>
              </div>

              <!-- Interactive Controls (Previous / Next / Auto) -->
              <div style="display: flex; gap: 0.5rem; justify-content: center; margin-bottom: 0.75rem;">
                <button type="button" class="btn-action btn-action-secondary" id="scanner-prev-btn" onclick="lexYaccApp.prevLexToken()">
                  ← Previous token
                </button>
                <button type="button" class="btn-action btn-action-primary" id="scanner-next-btn" onclick="lexYaccApp.nextLexToken()">
                  Next token →
                </button>
                <button type="button" class="btn-action btn-action-secondary" id="scanner-auto-btn" onclick="lexYaccApp.toggleAutoLexScan()">
                  ▶ Auto Scan
                </button>
              </div>
            </div>

            <!-- Helpful Pedagogical Note from Prompt -->
            <div style="font-size: 0.76rem; color: #475569; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.55rem 0.8rem; border-radius: var(--radius-sm); line-height: 1.4;">
              💡 <em>Use this interactive example to understand the sequence. In your actual presentation, animate the tokens automatically or reveal them one by one.</em>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.currentLexIndex = 0;
      lexYaccApp.updateLexScannerView();
    }
  },

  // ========================================================================
  // SLIDE 4: YACC: Tool for Syntax Analysis
  // ========================================================================
  {
    id: 'slide-4',
    part: 'Syntax Parsing',
    partNumber: 'SLIDE 04',
    title: 'YACC: Tool for Syntax Analysis',
    subtitle: 'YACC — Parser Generator',
    duration: '45 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 45 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “YACC stands for Yet Another Compiler-Compiler. It generates a parser from grammar rules. The parser receives tokens from LEX and checks whether they form a valid expression or statement. For example, ten plus twenty is a valid arithmetic expression. However, ten plus multiplication twenty violates the usual expression grammar because two operators appear consecutively without an operand between them. YACC can report this as a syntax error. Therefore, YACC focuses on grammatical structure rather than identifying individual characters.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: On-Slide Text -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: 0.05em;">
                Parser Generator
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                YACC — Parser Generator
              </h3>
              
              <div style="font-size: 0.82rem; color: #334155; margin-bottom: 0.55rem; background: #FAF5FF; border-left: 3px solid #7C3AED; padding: 0.35rem 0.65rem; border-radius: 4px;">
                <strong>Full form:</strong> Yet Another Compiler-Compiler
              </div>

              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.25rem;">
                Main functions
              </div>
              <ul style="padding-left: 1.15rem; font-size: 0.8rem; color: #334155; display: flex; flex-direction: column; gap: 0.2rem; margin-bottom: 0.65rem;">
                <li>Generates a parser from grammar rules.</li>
                <li>Receives tokens from the lexical analyzer.</li>
                <li>Checks the grammatical structure of expressions and statements.</li>
                <li>Reports syntax errors when the input violates the grammar.</li>
              </ul>

              <!-- Example Grammar Box -->
              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.25rem;">
                Example grammar:
              </div>
              <div class="code-box" style="padding: 0.65rem 0.85rem; font-size: 0.8rem; margin-bottom: 0.65rem;">
<span class="func">expr</span> → <span class="func">expr</span> + <span class="func">term</span>
<span class="func">expr</span> → <span class="func">term</span>
<span class="func">term</span> → <span class="num">NUMBER</span>
              </div>

              <!-- Valid vs Invalid Comparison Labels -->
              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <div style="background: #ECFDF5; border: 1px solid #10B981; border-radius: var(--radius-sm); padding: 0.45rem 0.65rem;">
                  <div style="font-size: 0.72rem; font-weight: 800; color: #047857; text-transform: uppercase;">Valid Input</div>
                  <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: #065F46;">10 + 20</div>
                </div>
                <div style="background: #FEF2F2; border: 1px solid #EF4444; border-radius: var(--radius-sm); padding: 0.45rem 0.65rem;">
                  <div style="font-size: 0.72rem; font-weight: 800; color: #B91C1C; text-transform: uppercase;">Invalid Input</div>
                  <div style="font-family: var(--font-mono); font-size: 0.85rem; font-weight: 800; color: #991B1B;">10 + * 20</div>
                </div>
              </div>
            </div>

            <div style="font-size: 0.74rem; color: #64748B; margin-top: 0.4rem;">
              Generated function: <code>int yyparse(void)</code> • Error routine: <code>void yyerror(char *s)</code>
            </div>
          </div>

          <!-- Right: Simulation / Animation (Token Seq -> Rule -> Valid vs Invalid) -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.4rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.05em;">Simulation / Animation</span>
                <span class="token-badge token-kw" style="font-size: 0.72rem;">Grammar Check</span>
              </div>
              
              <h3 style="font-size: 1.1rem; font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">
                Token Sequence & Rule Verification
              </h3>

              <!-- Phase 1: Display token sequence -->
              <div id="yacc-step-1" style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; margin-bottom: 0.6rem; transition: all 0.3s ease;">
                <div style="font-size: 0.72rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 0.25rem;">
                  1. Token Sequence from LEX
                </div>
                <div style="display: flex; gap: 0.4rem; align-items: center; font-family: var(--font-mono); font-weight: 700;">
                  <span class="token-badge token-num">NUMBER</span>
                  <span class="token-badge token-op">+</span>
                  <span class="token-badge token-num">NUMBER</span>
                </div>
              </div>

              <!-- Phase 2: Reveal grammar rule -->
              <div id="yacc-step-2" style="background: #F8FAFC; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; margin-bottom: 0.6rem; transition: all 0.3s ease;">
                <div style="font-size: 0.72rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 0.25rem;">
                  2. Applicable Grammar Rule
                </div>
                <div style="font-family: var(--font-mono); font-size: 0.95rem; font-weight: 800; color: #7C3AED;">
                  expr → expr + term
                </div>
              </div>

              <!-- Phase 3: Compare Valid vs Invalid Expressions -->
              <div style="font-size: 0.74rem; font-weight: 700; color: #64748B; text-transform: uppercase; margin-bottom: 0.35rem;">
                3. Compare Two Expressions:
              </div>

              <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; margin-bottom: 0.5rem;">
                <!-- Valid Expression Box -->
                <div id="yacc-box-valid" class="content-card" style="padding: 0.75rem; border: 1.5px solid #10B981; background: #F0FDF4; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s ease;">
                  <div>
                    <div style="font-size: 0.72rem; font-weight: 800; color: #047857; text-transform: uppercase;">
                      Valid expression
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #065F46; margin: 0.2rem 0;">
                      10 + 20
                    </div>
                  </div>
                  <div style="margin-top: 0.35rem;">
                    <span class="token-badge" style="background: #10B981; color: #FFFFFF; font-size: 0.72rem;">
                      ✓ Grammar accepted
                    </span>
                  </div>
                </div>

                <!-- Invalid Expression Box -->
                <div id="yacc-box-invalid" class="content-card" style="padding: 0.75rem; border: 1.5px solid #EF4444; background: #FEF2F2; display: flex; flex-direction: column; justify-content: space-between; transition: all 0.3s ease;">
                  <div>
                    <div style="font-size: 0.72rem; font-weight: 800; color: #B91C1C; text-transform: uppercase;">
                      Invalid expression
                    </div>
                    <div style="font-family: var(--font-mono); font-size: 1.15rem; font-weight: 800; color: #991B1B; margin: 0.2rem 0;">
                      10 + * 20
                    </div>
                  </div>
                  <div style="margin-top: 0.35rem;">
                    <span class="token-badge" style="background: #EF4444; color: #FFFFFF; font-size: 0.72rem;">
                      ✕ Syntax error
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Interactive Buttons for Slide 4 Comparison -->
            <div style="display: flex; gap: 0.45rem; margin-top: 0.5rem; flex-wrap: wrap;">
              <button type="button" class="btn-action btn-action-secondary" style="flex: 1; border-color: #10B981 !important; color: #047857 !important;" onclick="lexYaccApp.testYaccExpr(true)">
                ✓ Test 10 + 20
              </button>
              <button type="button" class="btn-action btn-action-secondary" style="flex: 1; border-color: #EF4444 !important; color: #B91C1C !important;" onclick="lexYaccApp.testYaccExpr(false)">
                ✕ Test 10 + * 20
              </button>
              <button type="button" class="btn-action btn-action-primary" onclick="lexYaccApp.autoPlayYaccDemo()">
                ▶ Auto Demo
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      // YACC slide init
    }
  },

  // ========================================================================
  // SLIDE 5: Real-World Application
  // ========================================================================
  {
    id: 'slide-5',
    part: 'Applications',
    partNumber: 'SLIDE 05',
    title: 'Real-World Application: Calculator',
    subtitle: 'From User Expression to Evaluation with LEX and YACC',
    duration: '40 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 40 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “A simple real-world application is a calculator that accepts arithmetic expressions. When the user enters ten plus twenty, LEX identifies the numbers and the plus operator as tokens. YACC checks whether those tokens form a valid expression. After successful parsing, the calculator's evaluation logic calculates the result, which is thirty. Similar techniques are used in programming language compilers, interpreters, command-processing tools, and domain-specific languages.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: On-Slide Text & Other Applications -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 0.25rem; letter-spacing: 0.05em;">
                Production Implementation
              </div>
              <h3 style="font-size: 1.2rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Real-World Application: Calculator
              </h3>

              <div style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 0.75rem 1rem; margin-bottom: 0.75rem;">
                <div style="font-size: 0.82rem; font-weight: 800; color: #2563EB; margin-bottom: 0.25rem;">
                  Input: <code>10 + 20</code>
                </div>

                <div style="font-size: 0.82rem; color: #334155; margin-bottom: 0.4rem;">
                  <strong>Step 1 — LEX</strong><br>
                  Identifies the tokens: <code style="color: #0284C7; font-weight: 700;">NUMBER(10), PLUS, NUMBER(20)</code>
                </div>

                <div style="font-size: 0.82rem; color: #334155; margin-bottom: 0.4rem;">
                  <strong>Step 2 — YACC</strong><br>
                  Checks whether the tokens form a valid arithmetic expression.
                </div>

                <div style="font-size: 0.82rem; color: #334155;">
                  <strong>Step 3 — Evaluation</strong><br>
                  The calculator evaluates the accepted expression.<br>
                  <strong style="color: #059669; font-size: 0.95rem;">Output: 30</strong>
                </div>
              </div>

              <!-- Other applications -->
              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                Other applications
              </div>
              <ul style="padding-left: 1.2rem; font-size: 0.82rem; color: #334155; display: flex; flex-direction: column; gap: 0.25rem;">
                <li>Programming language compilers</li>
                <li>Interpreters</li>
                <li>Command interpreters</li>
                <li>Domain-specific languages</li>
              </ul>
            </div>

            <div style="font-size: 0.74rem; color: #64748B;">
              Real-world examples: Unix <code>bc</code>, <code>awk</code>, SQL query parsers, and configuration checkers.
            </div>
          </div>

          <!-- Right: Calculator Demonstration (1 of 4, Step 1..4) -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.05em;">Simulation / animation</span>
                <span class="token-badge token-num" id="calc-step-counter" style="font-size: 0.76rem; font-weight: 800;">1 of 4</span>
              </div>
              
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.65rem;">
                Calculator demonstration
              </h3>

              <!-- Interactive Step Display Card -->
              <div id="calc-step-card" style="background: #F8FAFC; border: 1.5px solid #CBD5E1; border-radius: var(--radius-md); padding: 1.25rem; min-height: 180px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Filled dynamically by updateCalcStepView -->
              </div>
            </div>

            <!-- Previous / Next step buttons -->
            <div style="display: flex; gap: 0.5rem; justify-content: space-between; align-items: center; margin-top: 1rem;">
              <button type="button" class="btn-action btn-action-secondary" id="calc-prev-btn" onclick="lexYaccApp.prevCalcStep()">
                ← Previous step
              </button>
              
              <button type="button" class="btn-action btn-action-secondary" onclick="lexYaccApp.autoPlayCalcDemo()">
                ▶ Auto Play (1 to 4)
              </button>

              <button type="button" class="btn-action btn-action-primary" id="calc-next-btn" onclick="lexYaccApp.nextCalcStep()">
                Next step →
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.currentCalcStep = 1;
      lexYaccApp.updateCalcStepView();
    }
  },

  // ========================================================================
  // SLIDE 6: Conclusion
  // ========================================================================
  {
    id: 'slide-6',
    part: 'Conclusion',
    partNumber: 'SLIDE 06',
    title: 'Conclusion',
    subtitle: 'LEX and YACC: Symbiotic Tools for Language-Processing Engineering',
    duration: '20 seconds',
    notes: `
      <div style="background: rgba(37,99,235,0.06); padding: 0.6rem 0.85rem; border-radius: 6px; margin-bottom: 0.75rem; border-left: 3px solid #2563EB;">
        <strong>⏱️ Narration — Approximately 20 seconds:</strong>
      </div>
      <p style="font-style: italic; font-size: 0.95rem; line-height: 1.6; color: #1E293B;">
        “To conclude, LEX identifies tokens during lexical analysis, while YACC checks grammatical structure during syntax analysis. Both tools work together to simplify compiler construction and language processing. Thank you for watching my presentation.”
      </p>
    `,
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1.1fr 0.9fr; height: 100%; align-items: stretch;">
          <!-- Left: On-Slide Text & Summary Points -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Executive Summary
              </div>
              <h3 style="font-size: 1.3rem; font-weight: 800; color: #0F172A; margin-bottom: 0.85rem;">
                Conclusion
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-bottom: 1rem;">
                <!-- LEX Box -->
                <div style="padding: 0.75rem 1rem; background: #F0F9FF; border: 1.5px solid #BAE6FD; border-radius: var(--radius-md); border-left: 4px solid #0284C7;">
                  <div style="font-weight: 800; color: #0284C7; font-size: 0.95rem; margin-bottom: 0.25rem;">
                    LEX
                  </div>
                  <ul style="padding-left: 1.2rem; font-size: 0.82rem; color: #334155; display: flex; flex-direction: column; gap: 0.2rem;">
                    <li>Performs lexical analysis.</li>
                    <li>Identifies tokens using patterns.</li>
                  </ul>
                </div>

                <!-- YACC Box -->
                <div style="padding: 0.75rem 1rem; background: #FAF5FF; border: 1.5px solid #E9D5FF; border-radius: var(--radius-md); border-left: 4px solid #7C3AED;">
                  <div style="font-weight: 800; color: #7C3AED; font-size: 0.95rem; margin-bottom: 0.25rem;">
                    YACC
                  </div>
                  <ul style="padding-left: 1.2rem; font-size: 0.82rem; color: #334155; display: flex; flex-direction: column; gap: 0.2rem;">
                    <li>Performs syntax analysis.</li>
                    <li>Checks tokens against grammar rules.</li>
                  </ul>
                </div>

                <!-- Together -->
                <div style="padding: 0.65rem 0.85rem; background: #ECFDF5; border: 1.5px solid #A7F3D0; border-radius: var(--radius-md); border-left: 4px solid #059669; font-size: 0.84rem; color: #065F46; font-weight: 700;">
                  Together: LEX and YACC simplify the construction of language-processing tools.
                </div>
              </div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.76rem; color: #475569;">
              <span>Automated Compilers • Robust Scanners & Parsers</span>
              <span style="color: #059669; font-weight: 800;">✓ Ready to Deploy</span>
            </div>
          </div>

          <!-- Right: Simulation / Animation (1 -> 2 -> 3 -> 4) & Thank You Card -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; text-align: center;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span style="font-size: 0.76rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Simulation / animation</span>
                <button type="button" class="btn-action btn-action-secondary" onclick="lexYaccApp.playConclusionAnimation()" style="padding: 0.25rem 0.65rem !important; font-size: 0.75rem !important;">
                  ▶ Replay Sequence
                </button>
              </div>

              <!-- Animated Sequence Container -->
              <div id="conclusion-anim-box" style="display: flex; flex-direction: column; gap: 0.6rem; text-align: left; margin-bottom: 1rem;">
                <!-- 1. Reveal LEX Summary -->
                <div id="concl-step-1" class="flow-step-node" style="border-left: 3px solid #0284C7; transition: all 0.3s ease;">
                  <div class="flow-step-num">1. LEX Summary</div>
                  <div class="flow-step-title" style="font-size: 0.88rem;">Lexical Analysis via Regular Expressions</div>
                </div>

                <!-- 2. Reveal YACC Summary -->
                <div id="concl-step-2" class="flow-step-node" style="border-left: 3px solid #7C3AED; transition: all 0.3s ease;">
                  <div class="flow-step-num">2. YACC Summary</div>
                  <div class="flow-step-title" style="font-size: 0.88rem;">Syntax Analysis via Context-Free Grammars</div>
                </div>

                <!-- 3. Display Pipeline -->
                <div id="concl-step-3" class="flow-step-node" style="border-left: 3px solid #059669; transition: all 0.3s ease;">
                  <div class="flow-step-num">3. The Complete Pipeline</div>
                  <div style="font-family: var(--font-mono); font-size: 0.74rem; font-weight: 700; color: #0F172A; margin-top: 0.2rem;">
                    Source Code → LEX → Tokens → YACC → Parser Output
                  </div>
                </div>
              </div>

              <!-- 4. Finish with "Thank You!" and "Questions?" -->
              <div id="concl-step-4" style="background: linear-gradient(135deg, #FFFFFF, #EFF6FF); border: 2px solid rgba(37, 99, 235, 0.25); border-radius: var(--radius-md); padding: 1.25rem 1rem; box-shadow: 0 4px 14px rgba(37,99,235,0.08);">
                <div style="font-size: 2.2rem; font-weight: 900; color: #0F172A; margin-bottom: 0.25rem; letter-spacing: -0.02em;">
                  Thank You!
                </div>
                <div style="font-size: 1.15rem; font-weight: 800; color: #2563EB; margin-bottom: 0.75rem;">
                  Questions?
                </div>
                <div style="font-size: 0.8rem; color: #475569;">
                  Prasad Anil Kankhar • Department of CSE • MIT
                </div>
              </div>
            </div>

            <!-- Replay or Finish -->
            <div style="display: flex; justify-content: center; gap: 0.65rem; margin-top: 1rem;">
              <button type="button" class="btn-action btn-action-primary" onclick="lexYaccApp.goToSlide(0)">
                ⏮ Replay from Slide 1
              </button>
              <button type="button" class="btn-action btn-action-secondary" onclick="lexYaccApp.celebratePresentation()">
                🎉 Complete
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.playConclusionAnimation();
    }
  }
];

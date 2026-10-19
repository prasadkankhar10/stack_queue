// ==========================================================================
// LEX & YACC COMPILER DESIGN - 6 SLIDES DATA SPECIFICATION
// Academic Light Theme | 16:9 Presentation Format | High Interaction
// ==========================================================================

window.lexYaccSlidesData = [
  // ========================================================================
  // SLIDE 1: Title
  // ========================================================================
  {
    id: 'slide-1',
    part: 'Title',
    partNumber: 'SLIDE 01',
    title: 'LEX and YACC: Tools for Compiler Design',
    subtitle: 'Automating Lexical Analysis & Syntax Parsing in Modern Compiler Construction',
    notes: 'Welcome everyone. Today we will explore LEX and YACC, two foundational Unix tools that revolutionized compiler construction by replacing thousands of lines of handwritten, bug-prone scanning and parsing logic with clean, declarative grammar and regular expression specifications.',
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1.15fr 0.85fr; height: 100%; align-items: stretch;">
          <!-- Left: Overview & Credentials -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: inline-flex; align-items: center; gap: 0.5rem; background: rgba(37, 99, 235, 0.08); color: var(--accent-blue); padding: 0.35rem 0.75rem; border-radius: 999px; font-weight: 700; font-size: 0.82rem; margin-bottom: 1rem; border: 1px solid rgba(37, 99, 235, 0.2);">
                <span>⚙️</span> COMPILER DESIGN AUTOMATION
              </div>
              
              <h2 style="font-size: 1.6rem; font-weight: 800; color: #0F172A; line-height: 1.25; margin-bottom: 0.75rem;">
                LEX and YACC: Tools for Compiler Design
              </h2>
              
              <p style="font-size: 0.92rem; color: #475569; line-height: 1.5; margin-bottom: 1.25rem;">
                From high-level human syntax to verified Abstract Syntax Trees (AST). Learn how declarative regular expressions and LALR(1) grammars power modern language engineering.
              </p>

              <!-- Student Credentials Box (Editable) -->
              <div class="student-credential-card" style="margin-bottom: 1rem;">
                <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
                  <span style="font-size: 0.75rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Presenter Information</span>
                  <span style="font-size: 0.72rem; color: #64748B;">✏️ Click text to edit</span>
                </div>
                
                <div style="font-size: 1.05rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                  👤 <span class="student-editable-field" id="student-name-field" contenteditable="true" title="Click to edit name">Prasad Kankhar</span>
                  <span style="color: #94A3B8; margin: 0 0.3rem;">|</span>
                  <span style="font-size: 0.88rem; font-weight: 600; color: #475569;">Roll: </span>
                  <span class="student-editable-field" id="student-roll-field" contenteditable="true" title="Click to edit roll number">CSE-401</span>
                </div>
                
                <div style="font-size: 0.88rem; font-weight: 600; color: #334155; margin-bottom: 0.2rem;">
                  🎓 <strong>B.Tech CSE — CSE401</strong> (Compiler Design)
                </div>
                
                <div style="font-size: 0.82rem; color: #64748B;">
                  🏛️ <strong>Maharashtra Institute of Technology</strong>
                </div>
              </div>
            </div>

            <!-- Quick Start Action -->
            <div style="display: flex; gap: 0.75rem; align-items: center;">
              <button class="nav-btn" onclick="lexYaccApp.nextSlide()" style="background: var(--accent-blue); color: #FFF; padding: 0.6rem 1.25rem; font-size: 0.88rem; font-weight: 700; border-radius: var(--radius-md); box-shadow: 0 4px 12px rgba(37,99,235,0.25);">
                Begin Presentation →
              </button>
              <button class="icon-btn" onclick="lexYaccApp.testHeroPipeline()" style="border: 1px solid #CBD5E1; padding: 0.6rem 1rem; font-size: 0.84rem; font-weight: 600;">
                ⚡ Test Pipeline Simulation
              </button>
            </div>
          </div>

          <!-- Right: Hero Visual Pipeline -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; background: #F8FAFC;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.5rem; letter-spacing: 0.05em;">
                Front-End Compilation Architecture
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                From Characters to Parse Tree
              </h3>
            </div>

            <!-- Pipeline Stack Visual -->
            <div style="display: flex; flex-direction: column; gap: 0.65rem;" id="hero-pipeline-nodes">
              <!-- Node 1: Source -->
              <div class="flow-step-node" id="hero-node-1">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="flow-step-num">Input Stream</span>
                  <span class="token-badge token-delim" style="font-size: 0.72rem;">Source Characters</span>
                </div>
                <div class="flow-step-title">Source Code: <code style="color: #2563EB;">total = 10 + 20;</code></div>
                <div class="flow-step-desc">Stream of raw characters, newlines, and whitespace from file.</div>
              </div>

              <!-- Node 2: LEX -->
              <div class="flow-step-node" id="hero-node-2">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="flow-step-num">Step 1 — Scanning</span>
                  <span class="token-badge token-id" style="font-size: 0.72rem;">LEX (yylex)</span>
                </div>
                <div class="flow-step-title">Lexical Analysis (Regular Expressions)</div>
                <div class="flow-step-desc">Groups characters into tokens: <code>&lt;ID&gt;</code>, <code>&lt;ASSIGN&gt;</code>, <code>&lt;NUM&gt;</code>, <code>&lt;PLUS&gt;</code>.</div>
              </div>

              <!-- Node 3: YACC -->
              <div class="flow-step-node" id="hero-node-3">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="flow-step-num">Step 2 — Parsing</span>
                  <span class="token-badge token-kw" style="font-size: 0.72rem;">YACC (yyparse)</span>
                </div>
                <div class="flow-step-title">Syntax Analysis (Context-Free Grammar)</div>
                <div class="flow-step-desc">Verifies grammar rules and creates the Parse Tree / AST structure.</div>
              </div>

              <!-- Node 4: Output -->
              <div class="flow-step-node" id="hero-node-4">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                  <span class="flow-step-num">Output</span>
                  <span class="token-badge token-num" style="font-size: 0.72rem;">Target Code / AST</span>
                </div>
                <div class="flow-step-title">Intermediate Code & Evaluation</div>
                <div class="flow-step-desc">Ready for semantic analysis, optimization, and code generation.</div>
              </div>
            </div>

            <!-- Status Banner -->
            <div id="hero-status-pill" style="margin-top: 0.5rem; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.5rem 0.75rem; border-radius: var(--radius-sm); font-size: 0.8rem; color: #475569; display: flex; align-items: center; justify-content: space-between;">
              <span>Status: <strong>Ready to Teach</strong></span>
              <span style="color: #059669; font-weight: 700;">● Engine Online</span>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      // Restore cached student info if any
      const savedName = localStorage.getItem('lex_student_name');
      const savedRoll = localStorage.getItem('lex_student_roll');
      const nameEl = document.getElementById('student-name-field');
      const rollEl = document.getElementById('student-roll-field');
      if (savedName && nameEl) nameEl.innerText = savedName;
      if (savedRoll && rollEl) rollEl.innerText = savedRoll;

      if (nameEl) {
        nameEl.addEventListener('blur', () => {
          localStorage.setItem('lex_student_name', nameEl.innerText.trim());
        });
      }
      if (rollEl) {
        rollEl.addEventListener('blur', () => {
          localStorage.setItem('lex_student_roll', rollEl.innerText.trim());
        });
      }
    }
  },

  // ========================================================================
  // SLIDE 2: Introduction
  // ========================================================================
  {
    id: 'slide-2',
    part: 'Foundations',
    partNumber: 'SLIDE 02',
    title: 'Introduction: The Compiler Pipeline',
    subtitle: 'From High-Level Source Characters to Grammatically Verified Machine Representations',
    notes: 'Before LEX and YACC, developers had to manually write huge switch-case state machines in C. Lexical analysis strips whitespace and packages raw characters into meaningful atomic tokens. Syntax analysis then enforces grammar rules, rejecting malformed statements before any code generation occurs.',
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Theoretical Principles -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Core Principles
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 1rem;">
                What Does a Compiler Do?
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.85rem;">
                <!-- Bullet 1 -->
                <div style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.75rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #2563EB;">
                  <span style="font-size: 1.25rem;">🔄</span>
                  <div>
                    <div style="font-weight: 800; color: #0F172A; font-size: 0.95rem;">Translation Function</div>
                    <div style="font-size: 0.85rem; color: #475569; line-height: 1.45; margin-top: 0.2rem;">
                      A compiler translates source code into another form, commonly machine code or bytecode for execution.
                    </div>
                  </div>
                </div>

                <!-- Bullet 2 -->
                <div style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.75rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #059669;">
                  <span style="font-size: 1.25rem;">🔍</span>
                  <div>
                    <div style="font-weight: 800; color: #0F172A; font-size: 0.95rem;">Lexical Analysis (Scanning)</div>
                    <div style="font-size: 0.85rem; color: #475569; line-height: 1.45; margin-top: 0.2rem;">
                      Lexical analysis converts raw characters into categorized, meaningful <strong>tokens</strong> (keywords, identifiers, numbers, operators) while discarding whitespace and comments.
                    </div>
                  </div>
                </div>

                <!-- Bullet 3 -->
                <div style="display: flex; gap: 0.75rem; align-items: flex-start; padding: 0.75rem; background: #F8FAFC; border-radius: var(--radius-md); border-left: 4px solid #7C3AED;">
                  <span style="font-size: 1.25rem;">🌲</span>
                  <div>
                    <div style="font-weight: 800; color: #0F172A; font-size: 0.95rem;">Syntax Analysis (Parsing)</div>
                    <div style="font-size: 0.85rem; color: #475569; line-height: 1.45; margin-top: 0.2rem;">
                      Syntax analysis checks grammatical structure according to formal grammar rules, constructing a hierarchical <strong>Parse Tree</strong>.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- Manual vs Automated Comparison Callout -->
            <div style="background: rgba(37, 99, 235, 0.05); border: 1px solid rgba(37, 99, 235, 0.2); border-radius: var(--radius-md); padding: 0.75rem 1rem;">
              <div style="font-weight: 700; font-size: 0.82rem; color: #2563EB; margin-bottom: 0.2rem;">💡 Why Automate with LEX & YACC?</div>
              <div style="font-size: 0.78rem; color: #475569; line-height: 1.4;">
                Handwriting state-machines requires thousands of C lines prone to edge-case bugs. LEX & YACC generate mathematically proven, optimal C scanners and parsers from simple rule files!
              </div>
            </div>
          </div>

          <!-- Right: Interactive Pipeline Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Demonstration</div>
                <span class="token-badge token-kw" style="font-size: 0.75rem;">Step-by-Step Flow</span>
              </div>
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.5rem;">
                Watch Characters Become a Parse Tree
              </h3>
              <p style="font-size: 0.82rem; color: #64748B; margin-bottom: 0.75rem;">
                Select a transformation phase below to observe how the statement is processed:
              </p>

              <!-- Phase Step Buttons -->
              <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem; margin-bottom: 1rem;">
                <button class="nav-btn active" id="btn-phase-raw" onclick="lexYaccApp.showIntroPhase('raw')" style="font-size: 0.78rem; padding: 0.45rem;">
                  1. Raw Stream
                </button>
                <button class="nav-btn" id="btn-phase-lex" onclick="lexYaccApp.showIntroPhase('lex')" style="font-size: 0.78rem; padding: 0.45rem;">
                  2. LEX Tokens
                </button>
                <button class="nav-btn" id="btn-phase-yacc" onclick="lexYaccApp.showIntroPhase('yacc')" style="font-size: 0.78rem; padding: 0.45rem;">
                  3. YACC Tree
                </button>
              </div>

              <!-- Interactive Display Box -->
              <div id="intro-phase-display" style="background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 1rem; min-height: 180px; display: flex; flex-direction: column; justify-content: center;">
                <!-- Populated dynamically -->
              </div>
            </div>

            <!-- Dynamic Phase Explanation -->
            <div id="intro-phase-desc" style="font-size: 0.82rem; color: #334155; background: #FFFFFF; border: 1px solid #E2E8F0; padding: 0.65rem 0.85rem; border-radius: var(--radius-sm); margin-top: 0.5rem;">
              <strong>Step 1: Raw Characters</strong> — Source file is read as an array of ASCII chars: <code>p, o, s, i, t, i, o, n, =, 1, 0, +, 2, 0, ;</code>.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.showIntroPhase('raw');
    }
  },

  // ========================================================================
  // SLIDE 3: LEX
  // ========================================================================
  {
    id: 'slide-3',
    part: 'Lexical Analysis',
    partNumber: 'SLIDE 03',
    title: 'LEX: Lexical Analyzer Generator',
    subtitle: 'Pattern Recognition & Token Generation Using Deterministic Finite Automata (DFA)',
    notes: 'LEX takes a .l specification file containing regex rules. It compiles those patterns into a Deterministic Finite Automata (DFA) state machine inside lex.yy.c. Every time yylex() is invoked, it scans the longest matching lexeme and returns an integer token code.',
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Theory & Specification Architecture -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Tool Overview
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                What is LEX?
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem;">
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                  <span style="color: #2563EB; font-weight: 800;">●</span>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.45;">
                    <strong>A tool for generating lexical analyzers</strong> (scanners) automatically in C.
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                  <span style="color: #2563EB; font-weight: 800;">●</span>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.45;">
                    <strong>Recognizes tokens</strong> using patterns defined by <strong>regular expressions</strong>.
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                  <span style="color: #2563EB; font-weight: 800;">●</span>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.45;">
                    Matches characters via a generated <strong>DFA</strong>, returning token codes and lexeme values (<code>yylval</code>).
                  </div>
                </div>
              </div>

              <!-- LEX Specification File Structure -->
              <div style="margin-top: 0.5rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                  LEX Specification File Structure (<code>scanner.l</code>)
                </div>
                <div class="code-box" style="padding: 0.65rem 0.85rem; font-size: 0.78rem;">
<span class="comment">/* 1. Definitions & Headers */</span>
%{
  #include "y.tab.h"
%}
<span class="kw">%%</span>
<span class="comment">/* 2. Rules: Regex Pattern -> Action */</span>
[0-9]+             { yylval = atoi(yytext); return NUMBER; }
[a-zA-Z_][a-zA-Z0-9_]* { return IDENTIFIER; }
"+"                { return PLUS; }
"="                { return ASSIGN; }
";"                { return SEMICOLON; }
[ \\t\\n]           { <span class="comment">/* skip whitespace */</span> }
<span class="kw">%%</span>
<span class="comment">/* 3. User Auxiliary C Code */</span>
int yywrap() { return 1; }
                </div>
              </div>
            </div>

            <!-- LEX Toolchain Flow -->
            <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-size: 0.75rem; font-family: var(--font-mono);">
              <span style="color: #2563EB; font-weight: 700;">scanner.l</span>
              <span>→ lex →</span>
              <span style="color: #059669; font-weight: 700;">lex.yy.c</span>
              <span>→ gcc →</span>
              <span style="color: #7C3AED; font-weight: 700;">yylex()</span>
            </div>
          </div>

          <!-- Right: Interactive LEX Tokenizer Demo -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Scanner</div>
                <span class="token-badge token-num" style="font-size: 0.72rem;">Live Regex Matcher</span>
              </div>
              
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.4rem;">
                Example: <code>total = 10 + 20;</code>
              </h3>
              
              <p style="font-size: 0.82rem; color: #475569; margin-bottom: 0.75rem;">
                Type or select an expression to see LEX identify and classify tokens:
              </p>

              <!-- Expression Input & Preset Buttons -->
              <div class="interactive-input-group" style="margin-bottom: 0.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #64748B;">code:</span>
                <input type="text" id="lex-input-code" class="interactive-input" value="total = 10 + 20;" placeholder="Enter statement..." />
                <button class="nav-btn" onclick="lexYaccApp.runLexTokenizer()" style="font-size: 0.78rem; padding: 0.35rem 0.75rem; background: var(--accent-blue); color: #FFF; border-radius: 4px;">
                  Scan Tokens
                </button>
              </div>

              <!-- Presets -->
              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.85rem;">
                <button class="icon-btn" onclick="lexYaccApp.setLexPreset('total = 10 + 20;')" style="font-size: 0.72rem; padding: 0.2rem 0.5rem;">Preset 1: total = 10 + 20;</button>
                <button class="icon-btn" onclick="lexYaccApp.setLexPreset('count = count + 1;')" style="font-size: 0.72rem; padding: 0.2rem 0.5rem;">Preset 2: count = count + 1;</button>
                <button class="icon-btn" onclick="lexYaccApp.setLexPreset('val = 42 * 7;')" style="font-size: 0.72rem; padding: 0.2rem 0.5rem;">Preset 3: val = 42 * 7;</button>
              </div>

              <!-- Token Output Grid -->
              <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                Tokens Recognized by LEX:
              </div>
              <div id="lex-token-stream" style="display: flex; flex-wrap: wrap; gap: 0.5rem; min-height: 60px; padding: 0.65rem; background: #F8FAFC; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); align-items: center;">
                <!-- Filled dynamically -->
              </div>
            </div>

            <!-- Token Details Inspector -->
            <div id="lex-token-inspector" style="background: #FFFFFF; border: 1px solid #CBD5E1; border-radius: var(--radius-sm); padding: 0.65rem 0.85rem; font-size: 0.8rem; margin-top: 0.5rem;">
              <span style="color: #64748B;">ℹ️ Click any token badge above to inspect its Regular Expression and DFA rule.</span>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.runLexTokenizer();
    }
  },

  // ========================================================================
  // SLIDE 4: YACC
  // ========================================================================
  {
    id: 'slide-4',
    part: 'Syntax Parsing',
    partNumber: 'SLIDE 04',
    title: 'YACC: Yet Another Compiler-Compiler',
    subtitle: 'Context-Free Grammar Parsing and Syntax Error Detection with LALR(1) Automata',
    notes: 'YACC builds an LALR(1) pushdown automaton parser. It repeatedly calls yylex() to fetch the next token and performs shift or reduce operations. If an unexpected token arrives, such as end-of-file right after a plus operator, it immediately halts and triggers yyerror().',
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: Principles & Grammar Rules -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Parser Generator
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                What is YACC?
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.65rem; margin-bottom: 1rem;">
                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                  <span style="color: #7C3AED; font-weight: 800;">●</span>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.45;">
                    <strong>A tool for generating syntax parsers</strong> using LALR(1) parsing algorithms.
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                  <span style="color: #7C3AED; font-weight: 800;">●</span>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.45;">
                    <strong>Uses grammar rules</strong> written in BNF (Backus-Naur Form) to recognize valid syntactic structures.
                  </div>
                </div>

                <div style="display: flex; gap: 0.5rem; align-items: flex-start;">
                  <span style="color: #7C3AED; font-weight: 800;">●</span>
                  <div style="font-size: 0.88rem; color: #334155; line-height: 1.45;">
                    <strong>Detects syntax errors</strong> such as missing operands, unexpected tokens, or mismatched parentheses.
                  </div>
                </div>
              </div>

              <!-- Grammar Specification Box -->
              <div style="margin-top: 0.25rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #475569; text-transform: uppercase; margin-bottom: 0.35rem;">
                  Example Grammar Rules (<code>parser.y</code>)
                </div>
                <div class="code-box" style="padding: 0.65rem 0.85rem; font-size: 0.78rem;">
<span class="kw">%token</span> NUMBER IDENTIFIER PLUS ASSIGN
<span class="kw">%%</span>
<span class="func">statement</span>   : IDENTIFIER ASSIGN expression ;
<span class="func">expression</span>  : expression PLUS term  <span class="comment">/* e.g., expression + term */</span>
            | term
            ;
<span class="func">term</span>        : NUMBER | IDENTIFIER ;
<span class="kw">%%</span>
<span class="kw">void</span> <span class="func">yyerror</span>(<span class="kw">char</span> *s) { printf(<span class="str">"Syntax Error: %s\\n"</span>, s); }
                </div>
              </div>
            </div>

            <!-- YACC Toolchain Flow -->
            <div style="display: flex; align-items: center; justify-content: space-between; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); padding: 0.45rem 0.75rem; font-size: 0.75rem; font-family: var(--font-mono);">
              <span style="color: #7C3AED; font-weight: 700;">parser.y</span>
              <span>→ yacc -d →</span>
              <span style="color: #059669; font-weight: 700;">y.tab.c + y.tab.h</span>
              <span>→ gcc →</span>
              <span style="color: #2563EB; font-weight: 700;">yyparse()</span>
            </div>
          </div>

          <!-- Right: Interactive YACC Parser & Tree Generator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #7C3AED; text-transform: uppercase; letter-spacing: 0.05em;">Interactive Grammar Validator</div>
                <span class="token-badge token-kw" style="font-size: 0.72rem;">LALR(1) Parsing</span>
              </div>
              
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Rule: <code>expression → expression + term</code>
              </h3>
              
              <p style="font-size: 0.82rem; color: #475569; margin-bottom: 0.65rem;">
                Test valid structures and observe how YACC detects syntax errors:
              </p>

              <!-- Expression Input & Parse Button -->
              <div class="interactive-input-group" style="margin-bottom: 0.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #64748B;">expr:</span>
                <input type="text" id="yacc-input-expr" class="interactive-input" value="10 + 20" placeholder="e.g. 10 + 20 or 10 +" />
                <button class="nav-btn" onclick="lexYaccApp.runYaccParser()" style="font-size: 0.78rem; padding: 0.35rem 0.75rem; background: var(--accent-purple); color: #FFF; border-radius: 4px;">
                  Parse with YACC
                </button>
              </div>

              <!-- Test Preset Buttons -->
              <div style="display: flex; flex-wrap: wrap; gap: 0.35rem; margin-bottom: 0.75rem;">
                <button class="icon-btn" onclick="lexYaccApp.setYaccPreset('10 + 20')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem;">✅ Valid: 10 + 20</button>
                <button class="icon-btn" onclick="lexYaccApp.setYaccPreset('total + term')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem;">✅ Valid: total + term</button>
                <button class="icon-btn" onclick="lexYaccApp.setYaccPreset('10 + ')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem; color: #DC2626; border-color: #FCA5A5;">❌ Error: 10 + (Missing Operand)</button>
                <button class="icon-btn" onclick="lexYaccApp.setYaccPreset('+ 20')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem; color: #DC2626; border-color: #FCA5A5;">❌ Error: + 20</button>
              </div>

              <!-- Parse Output Display / Visual Parse Tree -->
              <div id="yacc-result-container" class="parse-tree-container">
                <!-- SVG Parse Tree rendered here -->
              </div>
            </div>

            <!-- Dynamic Error / Success Status Bar -->
            <div id="yacc-status-bar" style="margin-top: 0.5rem;">
              <!-- Populated dynamically -->
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.runYaccParser();
    }
  },

  // ========================================================================
  // SLIDE 5: Real-World Applications
  // ========================================================================
  {
    id: 'slide-5',
    part: 'Applications',
    partNumber: 'SLIDE 05',
    title: 'Real-World Applications & Collaboration',
    subtitle: 'LEX Recognizes the Tokens; YACC Checks How They Fit Together',
    notes: 'The synergy between LEX and YACC is standard practice. LEX handles the low-level micro-syntax (stripping whitespace, recognizing numbers and strings), while YACC handles high-level macro-syntax (ensuring parentheses balance and operator precedence is respected).',
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1fr 1fr; height: 100%; align-items: stretch;">
          <!-- Left: 3 Core Domains & Collaboration Model -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Industry Use-Cases
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                Where are LEX & YACC Used?
              </h3>

              <div style="display: flex; flex-direction: column; gap: 0.65rem;">
                <!-- App 1: Calculators -->
                <div style="padding: 0.65rem 0.85rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #2563EB;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.92rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🧮</span> Calculator & Expression Evaluators
                  </div>
                  <div style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem; line-height: 1.4;">
                    Unix <code>bc</code>, <code>dc</code>, spreadsheet formula evaluators (Excel/Sheets), financial math parsers.
                  </div>
                </div>

                <!-- App 2: Compilers -->
                <div style="padding: 0.65rem 0.85rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #059669;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.92rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>💻</span> Programming Language Compilers
                  </div>
                  <div style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem; line-height: 1.4;">
                    Early C, Pascal, SQL query parsers (PostgreSQL), and grammar parsers for transpilers.
                  </div>
                </div>

                <!-- App 3: DSLs & Command Interpreters -->
                <div style="padding: 0.65rem 0.85rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-md); border-left: 4px solid #7C3AED;">
                  <div style="font-weight: 800; color: #0F172A; font-size: 0.92rem; display: flex; align-items: center; gap: 0.4rem;">
                    <span>🛠️</span> Command Interpreters & DSLs
                  </div>
                  <div style="font-size: 0.8rem; color: #475569; margin-top: 0.2rem; line-height: 1.4;">
                    Network configuration languages, Unix shell interpreters (Bash/Zsh), JSON/XML validators.
                  </div>
                </div>
              </div>
            </div>

            <!-- Collaboration Formula Banner -->
            <div style="background: linear-gradient(135deg, rgba(37,99,235,0.08), rgba(124,58,237,0.08)); border: 1.5px solid rgba(37,99,235,0.2); border-radius: var(--radius-md); padding: 0.75rem 1rem;">
              <div style="font-size: 0.85rem; font-weight: 800; color: #1E3A8A; margin-bottom: 0.25rem;">
                🤝 The Golden Collaboration Rule:
              </div>
              <div style="font-size: 0.82rem; color: #334155; line-height: 1.45;">
                <strong>LEX</strong> recognizes the individual tokens;<br>
                <strong>YACC</strong> checks how they fit together to form meaningful structures!
              </div>
            </div>
          </div>

          <!-- Right: Live Working Mini-Calculator Simulator -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <div style="font-size: 0.78rem; font-weight: 800; color: #059669; text-transform: uppercase; letter-spacing: 0.05em;">Live Working Demo</div>
                <span class="token-badge token-num" style="font-size: 0.72rem;">LEX + YACC Calculator</span>
              </div>
              
              <h3 style="font-size: 1.15rem; font-weight: 800; color: #0F172A; margin-bottom: 0.35rem;">
                Interactive Expression Evaluator
              </h3>
              
              <p style="font-size: 0.82rem; color: #475569; margin-bottom: 0.65rem;">
                See LEX tokenize and YACC calculate with operator precedence:
              </p>

              <!-- Calculator Input -->
              <div class="interactive-input-group" style="margin-bottom: 0.5rem;">
                <span style="font-family: var(--font-mono); font-size: 0.85rem; color: #64748B;">calc:</span>
                <input type="text" id="calc-input-expr" class="interactive-input" value="(10 + 20) * 3" placeholder="Enter math formula..." />
                <button class="nav-btn" onclick="lexYaccApp.runCalculatorDemo()" style="font-size: 0.78rem; padding: 0.35rem 0.75rem; background: var(--accent-green); color: #FFF; border-radius: 4px;">
                  Evaluate
                </button>
              </div>

              <!-- Quick Math Presets -->
              <div style="display: flex; gap: 0.35rem; margin-bottom: 0.75rem;">
                <button class="icon-btn" onclick="lexYaccApp.setCalcPreset('(10 + 20) * 3')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem;">(10 + 20) * 3</button>
                <button class="icon-btn" onclick="lexYaccApp.setCalcPreset('15 + 25 / 5')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem;">15 + 25 / 5</button>
                <button class="icon-btn" onclick="lexYaccApp.setCalcPreset('100 - 40 * 2')" style="font-size: 0.72rem; padding: 0.2rem 0.45rem;">100 - 40 * 2</button>
              </div>

              <!-- Stage 1: LEX Tokens -->
              <div style="font-size: 0.75rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.25rem;">
                1. LEX Token Stream:
              </div>
              <div id="calc-lex-tokens" style="display: flex; flex-wrap: wrap; gap: 0.35rem; padding: 0.5rem; background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); margin-bottom: 0.6rem; min-height: 40px; align-items: center;">
                <!-- Tokens rendered here -->
              </div>

              <!-- Stage 2: YACC Evaluation & Result -->
              <div style="font-size: 0.75rem; font-weight: 800; color: #059669; text-transform: uppercase; margin-bottom: 0.25rem;">
                2. YACC Evaluation & Semantic Action:
              </div>
              <div id="calc-eval-output" style="padding: 0.65rem 0.85rem; background: #FFFFFF; border: 1.5px solid #059669; border-radius: var(--radius-sm); font-family: var(--font-mono); font-size: 0.88rem;">
                <!-- Result rendered here -->
              </div>
            </div>

            <div style="font-size: 0.75rem; color: #64748B; background: #F8FAFC; padding: 0.45rem 0.75rem; border-radius: var(--radius-sm); border: 1px solid #E2E8F0; margin-top: 0.5rem;">
              ⚡ <strong>Precedence Rule in YACC:</strong> <code>*</code> and <code>/</code> have higher precedence than <code>+</code> and <code>-</code>. Parentheses override precedence.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      lexYaccApp.runCalculatorDemo();
    }
  },

  // ========================================================================
  // SLIDE 6: Conclusion
  // ========================================================================
  {
    id: 'slide-6',
    part: 'Summary',
    partNumber: 'SLIDE 06',
    title: 'Conclusion: The Power of LEX & YACC',
    subtitle: 'LEX = Lexical Analysis | YACC = Syntax Analysis | Simplifying Modern Compiler Construction',
    notes: 'In conclusion, LEX and YACC allow developers to construct robust, enterprise-grade language front-ends in hours rather than months. By separating lexical concerns from grammar rules, compilers become modular, maintainable, and mathematically verified. Thank you, and I look forward to your questions!',
    render: function() {
      return `
        <div class="split-layout" style="grid-template-columns: 1.1fr 0.9fr; height: 100%; align-items: stretch;">
          <!-- Left: Key Takeaways & Comparison Matrix -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between;">
            <div>
              <div style="font-size: 0.78rem; font-weight: 800; color: #2563EB; text-transform: uppercase; margin-bottom: 0.35rem; letter-spacing: 0.05em;">
                Summary of Roles
              </div>
              <h3 style="font-size: 1.25rem; font-weight: 800; color: #0F172A; margin-bottom: 0.75rem;">
                LEX vs. YACC at a Glance
              </h3>

              <!-- Academic Comparison Table -->
              <table class="academic-table" style="font-size: 0.82rem; margin-bottom: 0.85rem;">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th style="color: #2563EB;">LEX (Flex)</th>
                    <th style="color: #7C3AED;">YACC (Bison)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Core Purpose</strong></td>
                    <td><strong>Lexical Analysis</strong> (Tokenization)</td>
                    <td><strong>Syntax Analysis</strong> (Parsing)</td>
                  </tr>
                  <tr>
                    <td><strong>Specification</strong></td>
                    <td>Regular Expressions (<code>.l</code> file)</td>
                    <td>Context-Free Grammar (<code>.y</code> file)</td>
                  </tr>
                  <tr>
                    <td><strong>Internal Model</strong></td>
                    <td>DFA (Finite State Automata)</td>
                    <td>LALR(1) Pushdown Automata</td>
                  </tr>
                  <tr>
                    <td><strong>Primary Function</strong></td>
                    <td><code>yylex()</code> → returns token int</td>
                    <td><code>yyparse()</code> → validates & builds AST</td>
                  </tr>
                  <tr>
                    <td><strong>Error Handled</strong></td>
                    <td>Unrecognized characters/lexemes</td>
                    <td>Malformed syntax / unexpected tokens</td>
                  </tr>
                </tbody>
              </table>

              <!-- 3 Bullet Takeaways -->
              <div style="display: flex; flex-direction: column; gap: 0.45rem;">
                <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.85rem; color: #0F172A;">
                  <span style="color: #059669; font-weight: 800;">✓</span>
                  <span><strong>LEX = lexical analysis</strong>: chops raw code into classified tokens.</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.85rem; color: #0F172A;">
                  <span style="color: #059669; font-weight: 800;">✓</span>
                  <span><strong>YACC = syntax analysis</strong>: validates token arrangements into a parse tree.</span>
                </div>
                <div style="display: flex; gap: 0.5rem; align-items: center; font-size: 0.85rem; color: #0F172A;">
                  <span style="color: #059669; font-weight: 800;">✓</span>
                  <span><strong>Both help simplify compiler construction</strong>, saving thousands of lines of manual code.</span>
                </div>
              </div>
            </div>

            <!-- Workflow Summary Footer -->
            <div style="background: #F8FAFC; border: 1px solid #E2E8F0; border-radius: var(--radius-sm); padding: 0.5rem 0.75rem; font-size: 0.76rem; color: #475569; display: flex; align-items: center; justify-content: space-between;">
              <span>Source Chars → <strong>LEX (yylex)</strong> → Tokens → <strong>YACC (yyparse)</strong> → Target AST</span>
              <span style="color: #059669; font-weight: 700;">Complete Pipeline</span>
            </div>
          </div>

          <!-- Right: Thank You & Q&A Interactive Card -->
          <div class="content-card" style="display: flex; flex-direction: column; justify-content: space-between; background: linear-gradient(135deg, #FFFFFF, #F8FAFC); border: 2px solid rgba(37, 99, 235, 0.2); text-align: center; padding: 2rem 1.5rem;">
            <div>
              <div style="width: 56px; height: 56px; border-radius: 50%; background: rgba(37, 99, 235, 0.1); color: var(--accent-blue); font-size: 1.8rem; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem auto; box-shadow: 0 4px 14px rgba(37, 99, 235, 0.15);">
                🎓
              </div>

              <h2 style="font-size: 2rem; font-weight: 900; color: #0F172A; margin-bottom: 0.5rem; letter-spacing: -0.02em;">
                Thank You!
              </h2>

              <p style="font-size: 0.95rem; color: #475569; line-height: 1.5; margin-bottom: 1.5rem;">
                Any Questions or Discussion on LEX, YACC, & Compiler Design?
              </p>

              <!-- Presenter Reminder Badge -->
              <div style="background: #FFFFFF; border: 1.5px solid #E2E8F0; border-radius: var(--radius-md); padding: 0.85rem; max-width: 340px; margin: 0 auto 1rem auto; box-shadow: 0 4px 12px rgba(15,23,42,0.04);">
                <div style="font-size: 0.92rem; font-weight: 800; color: #0F172A;" id="thankyou-name-display">
                  Prasad Kankhar
                </div>
                <div style="font-size: 0.8rem; font-weight: 600; color: #2563EB;">
                  B.Tech CSE — CSE401
                </div>
                <div style="font-size: 0.75rem; color: #64748B;">
                  Maharashtra Institute of Technology
                </div>
              </div>
            </div>

            <!-- Interactive Presentation Controls -->
            <div style="display: flex; justify-content: center; gap: 0.75rem;">
              <button class="nav-btn" onclick="lexYaccApp.goToSlide(0)" style="font-size: 0.82rem; padding: 0.5rem 1rem; background: var(--accent-blue); color: #FFF;">
                ⏮ Replay from Slide 1
              </button>
              <button class="icon-btn" onclick="lexYaccApp.celebratePresentation()" style="font-size: 0.82rem; padding: 0.5rem 1rem; border: 1px solid #CBD5E1;">
                🎉 Lecture Complete
              </button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      // Sync student name onto thank-you badge
      const savedName = localStorage.getItem('lex_student_name');
      const target = document.getElementById('thankyou-name-display');
      if (savedName && target) {
        target.innerText = savedName;
      }
    }
  }
];

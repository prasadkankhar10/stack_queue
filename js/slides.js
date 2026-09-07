// Comprehensive Slide Data and Rigorously Reviewed Interactive Simulators for Classroom Teaching
window.slidesData = [
  // ==========================================================================
  // TOPIC 1 — INTRODUCTION
  // ==========================================================================
  {
    id: 1,
    part: "Introduction",
    title: "STACK & QUEUE",
    subtitle: "The Logic Behind Order of Processing",
    render: () => `
      <div class="grid-2">
        <div style="padding-right: 1.5rem;">
          <div style="font-size: 0.95rem; color: var(--stack-color); font-weight: 700; margin-bottom: 0.75rem; letter-spacing: 0.06em;">
            DATA STRUCTURES IN REAL-WORLD COMPUTING
          </div>
          <h1 style="font-size: 3.2rem; font-weight: 900; line-height: 1.1; margin-bottom: 1.25rem;">
            Order of <span style="background: linear-gradient(135deg, var(--stack-color), var(--queue-color)); -webkit-background-clip: text; -webkit-text-fill-color: transparent;">Service</span>
          </h1>
          <p style="font-size: 1.15rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.75rem;">
            Every algorithm and operating system must resolve one foundational question:
            <br><strong style="color: var(--text-primary);">In what sequence should pending tasks or data elements be processed?</strong>
          </p>
          <div style="display: flex; gap: 0.85rem; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="app.nextSlide()" aria-label="Start presentation">
              <span>Begin Lecture</span>
              <span aria-hidden="true">→</span>
            </button>
            <button class="btn btn-outline" onclick="app.openOverview()" aria-label="Open slide overview">
              <span>📑 Browse All Slides</span>
            </button>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 1.5rem; justify-content: center; align-items: center;">
          <div style="display: flex; gap: 1.75rem; width: 100%; justify-content: center;">
            <!-- Stack Visual -->
            <div class="card highlight-stack" style="width: 210px; text-align: center;">
              <div style="font-size: 2.3rem; margin-bottom: 0.35rem;" aria-hidden="true">🍽️</div>
              <h3 style="color: var(--stack-color); font-weight: 800; font-size: 1.25rem;">STACK</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">Vertical Pile</p>
              <div style="display: flex; flex-direction: column-reverse; gap: 6px; padding: 10px; background: rgba(125, 125, 125, 0.08); border-radius: 8px;">
                <div style="background: var(--stack-gradient); color: #fff; padding: 6px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">Plate 3 (Top)</div>
                <div style="background: var(--stack-gradient); color: #fff; opacity: 0.85; padding: 6px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">Plate 2</div>
                <div style="background: var(--stack-gradient); color: #fff; opacity: 0.7; padding: 6px; border-radius: 4px; font-weight: 700; font-size: 0.85rem;">Plate 1 (Bottom)</div>
              </div>
              <div style="margin-top: 0.75rem; font-size: 0.78rem; color: var(--stack-color); font-weight: 700;">LAST IN → FIRST OUT</div>
            </div>

            <!-- Queue Visual -->
            <div class="card highlight-queue" style="width: 210px; text-align: center;">
              <div style="font-size: 2.3rem; margin-bottom: 0.35rem;" aria-hidden="true">🚶</div>
              <h3 style="color: var(--queue-color); font-weight: 800; font-size: 1.25rem;">QUEUE</h3>
              <p style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 0.75rem;">Horizontal Line</p>
              <div style="display: flex; gap: 6px; padding: 10px; background: rgba(125, 125, 125, 0.08); border-radius: 8px; justify-content: center;">
                <div style="background: var(--queue-gradient); color: #fff; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 0.85rem;">👤 A</div>
                <div style="background: var(--queue-gradient); color: #fff; opacity: 0.85; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 0.85rem;">👤 B</div>
                <div style="background: var(--queue-gradient); color: #fff; opacity: 0.7; padding: 8px; border-radius: 6px; font-weight: 700; font-size: 0.85rem;">👤 C</div>
              </div>
              <div style="margin-top: 0.75rem; font-size: 0.78rem; color: var(--queue-color); font-weight: 700;">FIRST IN → FIRST OUT</div>
            </div>
          </div>
        </div>
      </div>
    `,
    notes: "Set the stage by framing Stack and Queue as two complementary mathematical models for ordering data."
  },

  {
    id: 2,
    part: "Introduction",
    title: "Order of Arrival",
    subtitle: "Analyzing Arrival Constraints and Priority",
    render: () => `
      <div style="max-width: 900px; margin: 0 auto; text-align: center;">
        <div class="card" style="padding: 1.25rem 2rem; margin-bottom: 1.75rem; border-color: var(--border-active);">
          <h2 style="font-size: 1.65rem; font-weight: 700; color: var(--text-primary);">
            “You have 100 people and only one door. Who should enter first?”
          </h2>
        </div>

        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.25rem; margin-bottom: 1.75rem;">
          <button class="choice-card" id="choice-a" onclick="handleDoorChoice('A')" aria-label="Option A: First person enters first">
            <span class="choice-badge" style="color: var(--queue-color);">A</span>
            <span style="text-align: left;">
              <strong style="font-size: 1.05rem; color: var(--text-primary); display: block;">First to arrive</strong>
              <small style="font-size: 0.82rem; color: var(--text-muted);">Chronological order / Fairness</small>
            </span>
          </button>

          <button class="choice-card" id="choice-b" onclick="handleDoorChoice('B')" aria-label="Option B: Last person enters first">
            <span class="choice-badge" style="color: var(--stack-color);">B</span>
            <span style="text-align: left;">
              <strong style="font-size: 1.05rem; color: var(--text-primary); display: block;">Last to arrive</strong>
              <small style="font-size: 0.82rem; color: var(--text-muted);">Reversal / Top of pile</small>
            </span>
          </button>

          <button class="choice-card" id="choice-c" onclick="handleDoorChoice('C')" aria-label="Option C: Highest priority enters first">
            <span class="choice-badge" style="color: var(--priority-color);">C</span>
            <span style="text-align: left;">
              <strong style="font-size: 1.05rem; color: var(--text-primary); display: block;">Highest priority</strong>
              <small style="font-size: 0.82rem; color: var(--text-muted);">Emergency / Urgency triage</small>
            </span>
          </button>
        </div>

        <div id="door-reveal-box" style="display: none; animation: dropIn 0.3s ease; border-radius: 14px; padding: 1.35rem;" class="card highlight-stack" aria-live="polite">
          <h3 style="color: var(--stack-color); font-size: 1.3rem; font-weight: 800; margin-bottom: 0.4rem;">
            Three Core Ordering Models
          </h3>
          <p style="font-size: 1.05rem; color: var(--text-primary); line-height: 1.6;">
            <strong>A</strong> represents a <span style="color: var(--queue-color); font-weight: 700;">QUEUE</span> (FIFO: First In, First Out).<br>
            <strong>B</strong> represents a <span style="color: var(--stack-color); font-weight: 700;">STACK</span> (LIFO: Last In, First Out).<br>
            <strong>C</strong> represents a <span style="color: var(--priority-color); font-weight: 700;">PRIORITY QUEUE</span> (Heap-ordered by key).<br>
            Each structure provides optimal performance for its specific operational requirement.
          </p>
        </div>
      </div>
    `,
    init: () => {
      window.handleDoorChoice = (choice) => {
        soundEngine.playSuccess();
        document.querySelectorAll('.choice-card').forEach(c => c.classList.remove('selected-correct'));
        const el = document.getElementById(`choice-${choice.toLowerCase()}`);
        if (el) el.classList.add('selected-correct');
        const reveal = document.getElementById('door-reveal-box');
        if (reveal) reveal.style.display = 'block';
      };
    },
    notes: "Discuss how neither model is universally 'correct'; each models a distinct physical and computational reality."
  },

  // ==========================================================================
  // TOPIC 2 — THE STACK
  // ==========================================================================
  {
    id: 3,
    part: "Stack Structure",
    title: "The Plate Problem",
    subtitle: "Last In → First Out (LIFO)",
    render: () => `
      <div class="grid-2">
        <div>
          <div style="font-size: 1.15rem; line-height: 1.6; color: var(--text-primary); margin-bottom: 1.25rem;">
            Consider a vertical pile of cafeteria plates:
          </div>

          <div class="card" style="margin-bottom: 1.25rem;">
            <div style="font-family: var(--font-mono); font-size: 1.05rem; line-height: 1.8; color: var(--stack-color);">
              ┌───────────────┐<br>
              │  Plate #4     │ ← <strong style="color: var(--text-primary);">Last placed (TOP)</strong><br>
              ├───────────────┤<br>
              │  Plate #3     │<br>
              ├───────────────┤<br>
              │  Plate #2     │<br>
              ├───────────────┤<br>
              │  Plate #1     │ ← <strong style="color: var(--queue-color);">First placed (BOTTOM)</strong><br>
              └───────────────┘
            </div>
          </div>

          <div class="card" style="border-left: 4px solid var(--queue-color); margin-bottom: 1.25rem; padding: 1rem;">
            <p style="font-size: 1rem; color: var(--text-primary);">
              <strong>Constraint:</strong> Bottom elements cannot be removed without first clearing every element above them.
            </p>
          </div>

          <div class="card highlight-stack" style="padding: 0.9rem; text-align: center;">
            <div style="font-size: 1.8rem; font-weight: 900; color: var(--stack-color); letter-spacing: 0.05em;">LIFO</div>
            <div style="font-size: 1.05rem; color: var(--text-primary); font-weight: 600;">Last In → First Out</div>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <h4 style="color: var(--text-secondary); margin-bottom: 0.75rem; font-size: 0.9rem; text-transform: uppercase;">
            Interactive Plate Canister
          </h4>
          
          <div id="interactive-plate-stack" class="stack-canister" style="height: 270px; width: 200px;">
            <!-- Injected via JS -->
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
            <button class="btn btn-danger" onclick="tryRemoveBottomPlate()" aria-label="Try removing bottom plate">
              <span>⚠️ Remove Bottom Plate</span>
            </button>
            <button class="btn btn-stack" onclick="removeTopPlate()" aria-label="Remove top plate safely">
              <span>✨ Remove Top Plate</span>
            </button>
          </div>
          <div id="plate-feedback" style="margin-top: 0.75rem; font-size: 0.95rem; min-height: 24px; color: var(--text-secondary); font-weight: 600;" aria-live="polite">
            Select an action to observe behavior.
          </div>
        </div>
      </div>
    `,
    init: () => {
      let plates = [1, 2, 3, 4];
      window.tryRemoveBottomPlate = () => {
        soundEngine.playBuzz();
        const stackEl = document.getElementById('interactive-plate-stack');
        if (stackEl) {
          stackEl.classList.add('shake');
          setTimeout(() => stackEl.classList.remove('shake'), 400);
        }
        document.getElementById('plate-feedback').innerHTML = 
          '<span style="color: #ef4444;">Collision! Accessing the bottom directly violates the structure.</span>';
      };

      window.removeTopPlate = () => {
        if (plates.length === 0) {
          document.getElementById('plate-feedback').innerHTML = 'All plates removed. Resetting stack…';
          plates = [1, 2, 3, 4];
          renderPlates();
          return;
        }
        soundEngine.playPop();
        plates.pop();
        renderPlates();
        document.getElementById('plate-feedback').innerHTML = 
          `<span style="color: var(--stack-color);">Removed cleanly from TOP. This demonstrates LIFO.</span>`;
      };

      function renderPlates() {
        const stackEl = document.getElementById('interactive-plate-stack');
        if (!stackEl) return;
        stackEl.innerHTML = plates.map((p, idx) => `
          <div class="stack-element ${idx === plates.length - 1 ? 'top-elem' : ''}">
            Plate #${p} ${idx === plates.length - 1 ? '← TOP' : ''}
          </div>
        `).join('');
      }
      renderPlates();
    },
    notes: "Demonstrates physical and logical immutability of interior stack elements."
  },

  {
    id: 4,
    part: "Stack Structure",
    title: "Stack Definition",
    subtitle: "Single-End Linear Data Structure",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto; display: flex; flex-direction: column; gap: 1.75rem;">
        <div class="card highlight-stack" style="padding: 1.4rem 2rem; text-align: center;">
          <h2 style="font-size: 1.6rem; font-weight: 700; color: var(--text-primary); line-height: 1.5;">
            “A Stack is a <span style="color: var(--stack-color);">linear data structure</span> where insertion and deletion happen from the <span style="text-decoration: underline;">same end</span>.”
          </h2>
        </div>

        <div class="grid-2">
          <div class="card" style="padding: 1.75rem;">
            <h3 style="color: var(--stack-color); font-size: 1.2rem; font-weight: 700; margin-bottom: 1rem;">Key Properties:</h3>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 1rem;">
              <li style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <span style="color: var(--stack-color); font-size: 1.2rem;" aria-hidden="true">✔</span>
                <div>
                  <strong style="color: var(--text-primary);">Single Access Point:</strong>
                  <p style="color: var(--text-secondary); font-size: 0.95rem;">Only the <code>TOP</code> element can be inspected, inserted, or removed.</p>
                </div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <span style="color: var(--stack-color); font-size: 1.2rem;" aria-hidden="true">✔</span>
                <div>
                  <strong style="color: var(--text-primary);">Order Inversion:</strong>
                  <p style="color: var(--text-secondary); font-size: 0.95rem;">Elements exit in reverse chronological order of their insertion.</p>
                </div>
              </li>
              <li style="display: flex; align-items: flex-start; gap: 0.75rem;">
                <span style="color: var(--stack-color); font-size: 1.2rem;" aria-hidden="true">✔</span>
                <div>
                  <strong style="color: var(--text-primary);">O(1) Time Complexity:</strong>
                  <p style="color: var(--text-secondary); font-size: 0.95rem;">All operations occur in constant time with zero element shifting.</p>
                </div>
              </li>
            </ul>
          </div>

          <div style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <div style="font-family: var(--font-mono); font-size: 0.9rem; color: var(--text-muted); margin-bottom: 0.75rem;">
              STACK REPRESENTATION
            </div>
            
            <div class="stack-canister" style="height: 230px; width: 180px;">
              <div class="stack-element">10</div>
              <div class="stack-element">20</div>
              <div class="stack-element top-elem">30</div>
            </div>

            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem; color: var(--stack-color); font-weight: 700; font-size: 1.05rem;">
              <span>↑ TOP Pointer (Index 2, Value: 30)</span>
            </div>
          </div>
        </div>
      </div>
    `,
    notes: "Emphasize that the TOP pointer is the single point of contact for the entire data structure."
  },

  {
    id: 5,
    part: "Stack Operations",
    title: "Core Operations",
    subtitle: "Push, Pop, and Peek",
    render: () => `
      <div class="grid-2">
        <div style="display: flex; flex-direction: column; gap: 1rem;">
          <div class="card" style="border-left: 4px solid var(--stack-color); padding: 1rem 1.25rem;">
            <h4 style="color: var(--stack-color); font-size: 1.1rem; font-weight: 700;">1. PUSH(x)</h4>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Inserts element <code>x</code> onto the top. Increments the <code>top</code> index.</p>
          </div>

          <div class="card" style="border-left: 4px solid #ef4444; padding: 1rem 1.25rem;">
            <h4 style="color: #ef4444; font-size: 1.1rem; font-weight: 700;">2. POP()</h4>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Removes and returns top element. Decrements the <code>top</code> index.</p>
          </div>

          <div class="card" style="border-left: 4px solid var(--accent-primary); padding: 1rem 1.25rem;">
            <h4 style="color: var(--accent-primary); font-size: 1.1rem; font-weight: 700;">3. PEEK() / TOP</h4>
            <p style="color: var(--text-secondary); font-size: 0.92rem;">Inspects top value without removing it from memory.</p>
          </div>

          <!-- Custom Input -->
          <div style="display: flex; gap: 0.5rem; align-items: center;">
            <label for="custom-stack-input" style="font-size: 0.85rem; color: var(--text-muted);">Value:</label>
            <div class="custom-input-group">
              <input type="text" id="custom-stack-input" placeholder="e.g. 50" value="40" aria-label="Custom stack value">
            </div>
            <button class="btn btn-stack" style="padding: 0.45rem 0.9rem; font-size: 0.85rem;" onclick="stackSim.pushCustom()" aria-label="Push custom value">
              Push Value
            </button>
          </div>

          <div class="status-log" id="stack-op-log" aria-live="polite">
            Stack ready. Execute PUSH, POP, or PEEK.
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <div class="stack-canister" id="live-stack-canister" style="height: 280px; width: 210px;">
            <!-- Populated via JS -->
          </div>

          <div style="display: flex; gap: 0.6rem; margin-top: 1.25rem; flex-wrap: wrap; justify-content: center;">
            <button class="btn btn-stack" onclick="stackSim.push()" aria-label="Push default value">
              <span>📥 PUSH</span>
            </button>
            <button class="btn btn-danger" onclick="stackSim.pop()" aria-label="Pop top value">
              <span>📤 POP</span>
            </button>
            <button class="btn btn-outline" onclick="stackSim.peek()" aria-label="Peek top value">
              <span>👀 PEEK</span>
            </button>
            <button class="btn btn-outline" onclick="stackSim.reset()" aria-label="Reset stack">
              <span>🔄 Reset</span>
            </button>
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.stackSim = {
        items: [10, 20, 30],
        nextVal: 40,
        render() {
          const container = document.getElementById('live-stack-canister');
          if (!container) return;
          container.innerHTML = this.items.map((val, idx) => `
            <div class="stack-element ${idx === this.items.length - 1 ? 'top-elem' : ''}">
              <span>${val}</span>
              ${idx === this.items.length - 1 ? '<span style="font-size: 0.7rem; background: rgba(0,0,0,0.3); padding: 2px 6px; border-radius: 4px; margin-left: 6px;">TOP</span>' : ''}
            </div>
          `).join('') || '<div style="color: var(--text-muted); margin: auto; font-size: 0.85rem;">(Stack is Empty)</div>';
        },
        push(customVal = null) {
          if (this.items.length >= 5) {
            soundEngine.playBuzz();
            document.getElementById('stack-op-log').innerHTML = 
              '<span style="color: #ef4444;">⚠️ Stack Overflow: Capacity reached (5 elements max).</span>';
            return;
          }
          soundEngine.playPush();
          const val = customVal !== null ? customVal : this.nextVal;
          this.items.push(val);
          if (customVal === null) this.nextVal += 10;
          this.render();
          document.getElementById('stack-op-log').innerHTML = 
            `<span style="color: var(--stack-color);">PUSH(${val}) executed. New TOP: "${val}". Size: ${this.items.length}/5.</span>`;
        },
        pushCustom() {
          const input = document.getElementById('custom-stack-input');
          const val = input.value.trim() || String(this.nextVal);
          this.push(val);
          input.value = '';
        },
        pop() {
          if (this.items.length === 0) {
            soundEngine.playBuzz();
            document.getElementById('stack-op-log').innerHTML = 
              '<span style="color: #ef4444;">⚠️ Stack Underflow: Cannot POP from empty stack (top = -1).</span>';
            return;
          }
          soundEngine.playPop();
          const removed = this.items.pop();
          this.render();
          const newTop = this.items.length > 0 ? this.items[this.items.length - 1] : 'None (Empty)';
          document.getElementById('stack-op-log').innerHTML = 
            `<span style="color: #ef4444;">POP() removed "${removed}". New TOP: "${newTop}". Size: ${this.items.length}.</span>`;
        },
        peek() {
          if (this.items.length === 0) {
            soundEngine.playBuzz();
            document.getElementById('stack-op-log').innerHTML = 'Stack is empty. Nothing to peek.';
            return;
          }
          soundEngine.playTone(600);
          const topVal = this.items[this.items.length - 1];
          document.getElementById('stack-op-log').innerHTML = 
            `<span style="color: var(--accent-primary);">PEEK(): Top element is "${topVal}" (Remains in stack).</span>`;
        },
        reset() {
          soundEngine.playSlide();
          this.items = [10, 20, 30];
          this.nextVal = 40;
          this.render();
          document.getElementById('stack-op-log').innerHTML = 'Stack reset to initial state [10, 20, 30].';
        }
      };
      stackSim.render();
    },
    notes: "Demonstrate PUSH and POP interactions with both preset numbers and custom values."
  },

  {
    id: 6,
    part: "Mental Model",
    title: "The Single Portal Rule",
    subtitle: "Same Door In, Same Door Out",
    render: () => `
      <div style="max-width: 860px; margin: 0 auto; text-align: center;">
        <div style="font-size: 1rem; color: var(--queue-color); font-weight: 700; margin-bottom: 0.5rem; text-transform: uppercase; letter-spacing: 0.1em;">
          Memory Anchor
        </div>
        <h2 style="font-size: 2.8rem; font-weight: 900; color: var(--text-primary); margin-bottom: 1.5rem; line-height: 1.2;">
          “Stack = <span style="color: var(--stack-color);">Same Door In</span>, <span style="color: var(--accent-primary);">Same Door Out</span>.”
        </h2>

        <div class="card" style="max-width: 480px; margin: 0 auto 2rem; border: 2px dashed var(--border-active); padding: 2rem;">
          <div style="font-family: var(--font-mono); font-size: 1.25rem; line-height: 2; color: var(--text-primary);">
            <div style="color: var(--stack-color); font-weight: 800;">PUSH  ↓  (Enter Portal)</div>
            <div style="border: 2px solid var(--accent-primary); border-top: none; border-radius: 0 0 12px 12px; margin: 10px auto; width: 180px; padding: 20px 0; background: rgba(125, 125, 125, 0.05);">
              <span style="font-weight: 800; letter-spacing: 0.1em;">S T A C K</span>
            </div>
            <div style="color: #ef4444; font-weight: 800;">POP   ↑  (Exit Portal)</div>
          </div>
        </div>

        <p style="font-size: 1.15rem; color: var(--text-secondary); max-width: 650px; margin: 0 auto; line-height: 1.6;">
          In physical architecture, think of a dead-end parking bay: The last vehicle to enter must be the first to reverse out before any interior vehicle can leave.
        </p>
      </div>
    `,
    notes: "Reinforces the conceptual simplicity of single-ended structures."
  },

  // ==========================================================================
  // TOPIC 3 — STACK APPLICATIONS
  // ==========================================================================
  {
    id: 7,
    part: "Applications",
    title: "Browser Navigation",
    subtitle: "History Stack Behavior",
    render: () => `
      <div class="grid-2">
        <div>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
            A user navigates sequential web pages:
          </p>
          <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-bottom: 1.25rem; font-family: var(--font-mono);">
            <div class="card" style="padding: 0.5rem 1rem;">1. Visit <b>Google</b></div>
            <div class="card" style="padding: 0.5rem 1rem;">2. Visit <b>YouTube</b></div>
            <div class="card" style="padding: 0.5rem 1rem;">3. Visit <b>GitHub</b></div>
            <div class="card highlight-stack" style="padding: 0.5rem 1rem; color: var(--stack-color);">4. Visit <b>LeetCode</b> (Active Page)</div>
          </div>

          <div class="card" style="border-left: 4px solid var(--accent-primary); padding: 1.1rem;">
            <div style="font-weight: 700; color: var(--accent-primary); margin-bottom: 0.4rem;">Architectural Choice:</div>
            <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.5;">
              Clicking "Back" must return to the <i>most recently visited page</i> (GitHub), not the origin page (Google).
              This strict LIFO reversal requires a Stack.
            </p>
          </div>
        </div>

        <!-- Interactive Browser Simulator -->
        <div class="card">
          <!-- Browser chrome -->
          <div style="display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem; border-bottom: 1px solid var(--border-subtle); background: rgba(125,125,125,0.06); border-radius: 8px 8px 0 0;">
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #ef4444;" aria-hidden="true"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #f59e0b;" aria-hidden="true"></div>
            <div style="width: 10px; height: 10px; border-radius: 50%; background: #10b981;" aria-hidden="true"></div>
            <button class="btn btn-outline" style="padding: 0.25rem 0.65rem; font-size: 0.8rem; margin-left: 0.5rem;" onclick="browserSim.back()" aria-label="Browser back">
              ← Back
            </button>
            <div id="browser-url-bar" style="flex: 1; background: rgba(125,125,125,0.08); padding: 0.3rem 0.75rem; border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem; color: var(--stack-color); overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">
              https://leetcode.com
            </div>
          </div>

          <div style="padding: 1.25rem; display: flex; flex-direction: column; align-items: center;">
            <div style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 0.75rem; text-transform: uppercase;">
              History Back Stack
            </div>
            
            <div id="browser-stack-visual" class="stack-canister" style="height: 190px; width: 180px;">
              <!-- Injected via JS -->
            </div>

            <div style="display: flex; gap: 0.5rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
              <button class="btn btn-stack" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="browserSim.visit('StackOverflow')" aria-label="Visit StackOverflow">
                + Visit StackOverflow
              </button>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.4rem 0.8rem;" onclick="browserSim.reset()" aria-label="Reset browser history">
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.browserSim = {
        stack: ['Google', 'YouTube', 'GitHub', 'LeetCode'],
        render() {
          const container = document.getElementById('browser-stack-visual');
          const urlBar = document.getElementById('browser-url-bar');
          if (!container) return;
          const current = this.stack.length > 0 ? this.stack[this.stack.length - 1] : 'Blank Tab';
          if (urlBar) urlBar.innerText = `https://${current.toLowerCase()}.com`;

          container.innerHTML = this.stack.map((site, idx) => `
            <div class="stack-element ${idx === this.stack.length - 1 ? 'top-elem' : ''}" style="font-size: 0.85rem; height: 36px;">
              ${site} ${idx === this.stack.length - 1 ? '← Active' : ''}
            </div>
          `).join('');
        },
        back() {
          if (this.stack.length <= 1) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playPop();
          this.stack.pop();
          this.render();
        },
        visit(site) {
          soundEngine.playPush();
          this.stack.push(site);
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.stack = ['Google', 'YouTube', 'GitHub', 'LeetCode'];
          this.render();
        }
      };
      browserSim.render();
    },
    notes: "Demonstrates how consumer software uses LIFO stacks for reverse traversal."
  },

  {
    id: 8,
    part: "Applications",
    title: "Undo & Redo System",
    subtitle: "Dual-Stack State Synchronization",
    render: () => `
      <div class="grid-2">
        <div>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem;">
            Text editors maintain state history using paired stacks:
          </p>
          <div class="card" style="font-family: var(--font-mono); font-size: 0.95rem; margin-bottom: 1rem;">
            Type 'A' → Type 'B' → Type 'C' → Type 'D'<br>
            Undo: <span style="color: #ef4444;">'D' removed</span> (LIFO).<br>
            Undo: <span style="color: #ef4444;">'C' removed</span> (LIFO).
          </div>
          <div class="card" style="border-left: 4px solid var(--stack-color); padding: 0.9rem;">
            <strong style="color: var(--stack-color);">Redo Synchronization:</strong>
            <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 4px;">
              Undone states are pushed onto the <b>REDO STACK</b>.
              <br><strong style="color: var(--queue-color);">Key Rule:</strong> Any new typing action immediately invalidates and clears the Redo stack.
            </p>
          </div>
        </div>

        <!-- Live Undo / Redo Simulator -->
        <div class="card" style="padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
            <span style="font-weight: 700; color: var(--text-primary);">Buffer Editor</span>
            <div style="display: flex; gap: 0.5rem;">
              <button class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;" onclick="undoRedoSim.undo()" aria-label="Undo action">
                ↩️ Undo
              </button>
              <button class="btn btn-outline" style="padding: 0.35rem 0.75rem; font-size: 0.85rem;" onclick="undoRedoSim.redo()" aria-label="Redo action">
                ↪️ Redo
              </button>
            </div>
          </div>

          <!-- Virtual text document -->
          <div id="virtual-doc" class="status-log" style="font-size: 1.2rem; min-height: 44px; letter-spacing: 3px; justify-content: flex-start;">
            A B C D
          </div>

          <!-- Two Stacks Visualizer -->
          <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: 1rem;">
            <div style="text-align: center;">
              <div style="font-size: 0.75rem; color: var(--stack-color); font-weight: 700; margin-bottom: 4px;">UNDO STACK</div>
              <div id="undo-stack-box" class="stack-canister" style="height: 135px; width: 110px;"></div>
            </div>
            <div style="text-align: center;">
              <div style="font-size: 0.75rem; color: var(--queue-color); font-weight: 700; margin-bottom: 4px;">REDO STACK</div>
              <div id="redo-stack-box" class="stack-canister" style="height: 135px; width: 110px;"></div>
            </div>
          </div>

          <div style="display: flex; gap: 0.5rem; margin-top: 1rem; justify-content: center;">
            <button class="btn btn-stack" style="font-size: 0.8rem; padding: 0.35rem 0.7rem;" onclick="undoRedoSim.typeNext()" aria-label="Type next letter">
              + Type Next Character
            </button>
            <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.35rem 0.7rem;" onclick="undoRedoSim.reset()" aria-label="Reset undo redo simulator">
              Reset
            </button>
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.undoRedoSim = {
        undoStack: ['A', 'B', 'C', 'D'],
        redoStack: [],
        nextLetterCode: 69,
        render() {
          const doc = document.getElementById('virtual-doc');
          const uBox = document.getElementById('undo-stack-box');
          const rBox = document.getElementById('redo-stack-box');
          if (!doc) return;

          doc.innerText = this.undoStack.join(' ') || '(Empty Document)';
          uBox.innerHTML = this.undoStack.map((c, i) => `
            <div class="stack-element ${i === this.undoStack.length - 1 ? 'top-elem' : ''}" style="height: 28px; font-size: 0.82rem;">
              ${c}
            </div>
          `).join('');

          rBox.innerHTML = this.redoStack.map((c, i) => `
            <div class="stack-element ${i === this.redoStack.length - 1 ? 'top-elem' : ''}" style="height: 28px; font-size: 0.82rem; background: var(--queue-gradient);">
              ${c}
            </div>
          `).join('');
        },
        undo() {
          if (this.undoStack.length === 0) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playPop();
          const item = this.undoStack.pop();
          this.redoStack.push(item);
          this.render();
        },
        redo() {
          if (this.redoStack.length === 0) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playPush();
          const item = this.redoStack.pop();
          this.undoStack.push(item);
          this.render();
        },
        typeNext() {
          soundEngine.playPush();
          const char = String.fromCharCode(this.nextLetterCode);
          this.nextLetterCode++;
          this.undoStack.push(char);
          this.redoStack = [];
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.undoStack = ['A', 'B', 'C', 'D'];
          this.redoStack = [];
          this.nextLetterCode = 69;
          this.render();
        }
      };
      undoRedoSim.render();
    },
    notes: "Shows how paired stacks cooperate to achieve bidirectional historical traversal."
  },

  {
    id: 9,
    part: "Applications",
    title: "Function Call Execution",
    subtitle: "CPU Call Stack & Frame Lifecycles",
    render: () => `
      <div class="grid-2">
        <div>
          <div class="code-box" style="margin-bottom: 1.25rem;">
            <span class="code-comment">// Call Sequence</span><br>
            <span class="code-keyword">void</span> <span class="code-func">main</span>() { <span class="code-func">foo</span>(); }<br>
            <span class="code-keyword">void</span> <span class="code-func">foo</span>() { <span class="code-func">bar</span>(); }<br>
            <span class="code-keyword">void</span> <span class="code-func">bar</span>() { <span class="code-func">calculate</span>(); }<br>
            <span class="code-keyword">void</span> <span class="code-func">calculate</span>() { <span class="code-comment">/* returns */</span> }
          </div>

          <div class="card highlight-stack">
            <h4 style="color: var(--stack-color); font-size: 1.05rem; margin-bottom: 0.4rem;">Call Frame Mechanics:</h4>
            <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.5;">
              When a function completes, the CPU pops its activation record and resumes execution at the instruction pointer of the caller below it.
            </p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--stack-color); margin-bottom: 0.5rem; font-weight: 700;">
            CPU CALL STACK
          </div>
          
          <div id="call-stack-box" class="stack-canister" style="height: 250px; width: 210px;">
            <!-- Rendered by JS -->
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
            <button class="btn btn-stack" onclick="callStackSim.stepForward()" aria-label="Step to next call frame">
              <span>Step Next Call ⏩</span>
            </button>
            <button class="btn btn-outline" onclick="callStackSim.reset()" aria-label="Reset call stack">
              <span>Reset</span>
            </button>
          </div>
          <div id="call-stack-status" style="margin-top: 0.75rem; font-size: 0.85rem; color: var(--text-secondary); font-family: var(--font-mono);" aria-live="polite">
            Call stack initialized.
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.callStackSim = {
        frames: ['main()'],
        step: 0,
        render() {
          const box = document.getElementById('call-stack-box');
          if (!box) return;
          box.innerHTML = this.frames.map((f, i) => `
            <div class="stack-element ${i === this.frames.length - 1 ? 'top-elem' : ''}" style="height: 42px; font-size: 0.9rem;">
              <span>${f}</span>
            </div>
          `).join('');
        },
        stepForward() {
          const status = document.getElementById('call-stack-status');
          this.step++;
          if (this.step === 1) {
            soundEngine.playPush();
            this.frames.push('foo()');
            status.innerText = "main() invokes foo(). foo frame pushed to Top.";
          } else if (this.step === 2) {
            soundEngine.playPush();
            this.frames.push('bar()');
            status.innerText = "foo() invokes bar(). bar frame pushed to Top.";
          } else if (this.step === 3) {
            soundEngine.playPush();
            this.frames.push('calculate()');
            status.innerText = "bar() invokes calculate(). calculate pushed to Top.";
          } else if (this.step === 4) {
            soundEngine.playPop();
            this.frames.pop();
            status.innerText = "calculate() returns. POP calculate(). Control resumes in bar().";
          } else if (this.step === 5) {
            soundEngine.playPop();
            this.frames.pop();
            status.innerText = "bar() returns. POP bar(). Control resumes in foo().";
          } else if (this.step === 6) {
            soundEngine.playPop();
            this.frames.pop();
            status.innerText = "foo() returns. POP foo(). Control resumes in main().";
          } else {
            soundEngine.playTone(523.25);
            status.innerText = "Program execution complete.";
            this.step = 6;
          }
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.frames = ['main()'];
          this.step = 0;
          document.getElementById('call-stack-status').innerText = 'Reset to main().';
          this.render();
        }
      };
      callStackSim.render();
    },
    notes: "Demonstrates memory allocation and deallocation during nested function calls."
  },

  {
    id: 10,
    part: "Applications",
    title: "Stack Overflow",
    subtitle: "Memory Limits & Unbounded Recursion",
    render: () => `
      <div class="grid-2">
        <div>
          <div class="code-box" style="margin-bottom: 1.25rem;">
            <span class="code-keyword">void</span> <span class="code-func">recursiveFunction</span>() {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;<span class="code-func">recursiveFunction</span>(); <span class="code-comment">// Missing base case</span><br>
            }
          </div>

          <div class="card" style="border-left: 4px solid #ef4444; margin-bottom: 1.25rem;">
            <h4 style="color: #ef4444; font-size: 1.15rem; font-weight: 700; margin-bottom: 0.4rem;">Unbounded Allocation:</h4>
            <p style="color: var(--text-secondary); font-size: 0.95rem; line-height: 1.6;">
              Every recursion call allocates memory on the stack segment.
              Without a termination condition (base case), allocated frames exhaust reserved thread memory.
            </p>
          </div>

          <div class="card" style="padding: 1rem;">
            <p style="font-size: 0.95rem; color: var(--text-primary);">
              This operating system protection fault is what gives <strong>Stack Overflow</strong> its name.
            </p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <div id="overflow-canister" class="stack-canister" style="height: 280px; width: 210px; overflow: hidden;">
            <!-- Rendered by JS -->
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1.25rem;">
            <button class="btn btn-danger" onclick="overflowSim.runDoom()" aria-label="Trigger stack overflow">
              <span>💥 Trigger Infinite Recursion</span>
            </button>
            <button class="btn btn-outline" onclick="overflowSim.reset()" aria-label="Reset stack overflow">
              <span>Reset</span>
            </button>
          </div>
          <div id="overflow-status" style="margin-top: 0.75rem; font-size: 0.9rem; font-weight: 700; color: #ef4444;" aria-live="polite">
            Normal state. Click to simulate.
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.overflowSim = {
        frames: ['main()'],
        interval: null,
        runDoom() {
          const canister = document.getElementById('overflow-canister');
          const status = document.getElementById('overflow-status');
          if (this.interval) clearInterval(this.interval);

          let count = 0;
          this.interval = setInterval(() => {
            count++;
            soundEngine.playPush();
            this.frames.push(`fn() #${count}`);
            this.render();

            if (this.frames.length >= 7) {
              clearInterval(this.interval);
              soundEngine.playExplosion();
              canister.classList.add('overflow-flash', 'shake');
              status.innerHTML = '💥 EXCEPTION: StackOverflowError (Memory Limit Exceeded)';
            }
          }, 180);
        },
        render() {
          const box = document.getElementById('overflow-canister');
          if (!box) return;
          box.innerHTML = this.frames.map(f => `
            <div class="stack-element top-elem" style="height: 34px; font-size: 0.8rem; background: linear-gradient(135deg, #991b1b, #ef4444);">
              ${f}
            </div>
          `).join('');
        },
        reset() {
          if (this.interval) clearInterval(this.interval);
          const canister = document.getElementById('overflow-canister');
          if (canister) canister.classList.remove('overflow-flash', 'shake');
          this.frames = ['main()'];
          this.render();
          document.getElementById('overflow-status').innerHTML = 'Normal state. Click to simulate.';
        }
      };
      overflowSim.render();
    },
    notes: "Visually correlates base case omission with process segmentation faults."
  },

  // ==========================================================================
  // TOPIC 4 — THE QUEUE
  // ==========================================================================
  {
    id: 11,
    part: "Queue Structure",
    title: "The Ticket Counter",
    subtitle: "First In → First Out (FIFO)",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="card highlight-queue" style="padding: 1.25rem 2rem; text-align: center; margin-bottom: 1.75rem;">
          <h2 style="font-size: 1.45rem; font-weight: 700; color: var(--text-primary);">
            “A Queue serves participants in the precise chronological order of arrival.”
          </h2>
        </div>

        <!-- Ticket Line Visual -->
        <div class="card" style="padding: 1.75rem 1.5rem; margin-bottom: 1.75rem;">
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.75rem; font-family: var(--font-mono); font-size: 0.85rem;">
            <span style="color: var(--stack-color); font-weight: 700;">FRONT (Departure) ↓</span>
            <span style="color: var(--queue-color); font-weight: 700;">REAR (Arrival) ↓</span>
          </div>

          <div id="ticket-line-container" style="display: flex; gap: 0.75rem; align-items: center; justify-content: space-between; padding: 1rem; background: rgba(125,125,125,0.06); border-radius: 10px; border: 2px dashed var(--border-subtle);">
            <!-- Populated via JS -->
          </div>

          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1.5rem; flex-wrap: wrap; gap: 0.75rem;">
            <div style="display: flex; gap: 0.75rem;">
              <button class="btn btn-queue" onclick="ticketSim.serveFirst()" aria-label="Serve front person">
                <span>🎟️ Serve Front Person (A leaves)</span>
              </button>
              <button class="btn btn-outline" onclick="ticketSim.addPerson()" aria-label="Add new person at rear">
                <span>🚶 Add Person at Rear</span>
              </button>
            </div>
            <button class="btn btn-outline" onclick="ticketSim.reset()" aria-label="Reset ticket counter">Reset</button>
          </div>
        </div>

        <div class="card" style="text-align: center; padding: 1.15rem;">
          <div style="font-size: 1.8rem; font-weight: 900; color: var(--queue-color); letter-spacing: 0.05em;">FIFO</div>
          <div style="font-size: 1.1rem; color: var(--text-primary); font-weight: 700;">First In → First Out</div>
          <p style="font-size: 0.95rem; color: var(--text-secondary); margin-top: 0.25rem;">
            Fairness and sequential integrity: Earliest arrival is guaranteed earliest service.
          </p>
        </div>
      </div>
    `,
    init: () => {
      window.ticketSim = {
        people: ['A (1st)', 'B (2nd)', 'C (3rd)', 'D (4th)', 'E (5th)'],
        letterCode: 70,
        render() {
          const container = document.getElementById('ticket-line-container');
          if (!container) return;
          container.innerHTML = this.people.map((p, idx) => `
            <div class="queue-element" style="flex: 1; height: 58px; font-size: 0.9rem; ${idx === 0 ? 'outline: 2px solid var(--stack-color);' : ''}">
              ${p}
            </div>
          `).join('') || '<div style="color: var(--text-muted); text-align: center; width: 100%;">Queue is empty.</div>';
        },
        serveFirst() {
          if (this.people.length === 0) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playDequeue();
          this.people.shift();
          this.render();
        },
        addPerson() {
          soundEngine.playEnqueue();
          const p = `${String.fromCharCode(this.letterCode)} (${this.people.length + 1}th)`;
          this.letterCode++;
          this.people.push(p);
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.people = ['A (1st)', 'B (2nd)', 'C (3rd)', 'D (4th)', 'E (5th)'];
          this.letterCode = 70;
          this.render();
        }
      };
      ticketSim.render();
    },
    notes: "Distinguishes the two active ends of a Queue from the single active end of a Stack."
  },

  {
    id: 12,
    part: "Comparison",
    title: "Stack vs Queue",
    subtitle: "Architectural & Behavioral Comparison",
    render: () => `
      <div style="max-width: 1060px; margin: 0 auto;">
        <table class="compare-table">
          <thead>
            <tr>
              <th style="width: 26%;">Dimension</th>
              <th style="width: 37%; color: var(--stack-color); font-size: 1.1rem;">🥞 STACK</th>
              <th style="width: 37%; color: var(--queue-color); font-size: 1.1rem;">🚶 QUEUE</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="font-weight: 700;">Order Principle</td>
              <td style="color: var(--stack-color); font-weight: 700;">LIFO (Last In, First Out)</td>
              <td style="color: var(--queue-color); font-weight: 700;">FIFO (First In, First Out)</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Active Ends</td>
              <td><b>1 Active End</b> (<code>TOP</code>)</td>
              <td><b>2 Active Ends</b> (<code>FRONT</code> & <code>REAR</code>)</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Operations</td>
              <td><code>Push()</code> / <code>Pop()</code> / <code>Peek()</code></td>
              <td><code>Enqueue()</code> / <code>Dequeue()</code> / <code>Front()</code></td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Physical Model</td>
              <td>Vertical plate canister</td>
              <td>Horizontal checkout line</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Software Example 1</td>
              <td>Undo / Redo state buffers</td>
              <td>Print spooling & background jobs</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Software Example 2</td>
              <td>Browser Back navigation</td>
              <td>Message queues (Kafka, RabbitMQ)</td>
            </tr>
            <tr>
              <td style="font-weight: 700;">Graph Traversal</td>
              <td>DFS (Depth-First Search)</td>
              <td>BFS (Breadth-First Search)</td>
            </tr>
          </tbody>
        </table>

        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-top: clamp(0.5rem, 1vh, 0.85rem);">
          <div class="card highlight-stack" style="padding: 0.55rem 0.9rem; text-align: center;">
            <div style="font-weight: 700; color: var(--stack-color); font-size: 0.88rem; margin-bottom: 0.2rem;">VERTICAL PILE</div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">
              Push & Pop occur at the same TOP end
            </div>
          </div>
          <div class="card highlight-queue" style="padding: 0.55rem 0.9rem; text-align: center;">
            <div style="font-weight: 700; color: var(--queue-color); font-size: 0.88rem; margin-bottom: 0.2rem;">HORIZONTAL CONDUIT</div>
            <div style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--text-secondary);">
              Insert at REAR → Advance → Emerge from FRONT
            </div>
          </div>
        </div>
      </div>
    `,
    notes: "Review every row to establish strict conceptual symmetry between the two structures."
  },

  {
    id: 13,
    part: "Queue Operations",
    title: "Core Operations",
    subtitle: "Enqueue, Dequeue, Front, and Rear",
    render: () => `
      <div class="queue-simulator-container">
        <!-- Direction Flow Banner -->
        <div class="queue-direction-banner">
          <div style="display: flex; align-items: center; gap: 0.4rem; color: var(--stack-color);">
            <span style="font-size: 1.1rem;" aria-hidden="true">⬅️</span>
            <span>DEQUEUE (Exit from FRONT)</span>
          </div>
          <div style="color: var(--text-muted); font-size: 0.72rem; letter-spacing: 0.08em; text-transform: uppercase;">
            FIFO Processing Lane ⇦ ⇦ ⇦
          </div>
          <div style="display: flex; align-items: center; gap: 0.4rem; color: var(--queue-color);">
            <span>ENQUEUE (Enter at REAR)</span>
            <span style="font-size: 1.1rem;" aria-hidden="true">⬅️</span>
          </div>
        </div>

        <!-- Interactive Queue Conduit Visual -->
        <div class="card" style="padding: 0.9rem 1.15rem;">
          <!-- Pointers & Conduit Track -->
          <div id="live-queue-track" class="queue-track-wrapper">
            <!-- Populated via JS -->
          </div>

          <!-- Live State Dashboard -->
          <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.65rem; padding: 0.35rem 0.8rem; background: rgba(125,125,125,0.06); border-radius: 6px; font-family: var(--font-mono); font-size: 0.8rem;">
            <span id="queue-size-indicator" style="font-weight: 700; color: var(--text-primary);">Size: 3 / 6</span>
            <span id="queue-pointers-indicator" style="color: var(--text-secondary);">front = 0 | rear = 2</span>
            <span id="queue-health-indicator" style="color: #10b981; font-weight: 700;">STATUS: HEALTHY</span>
          </div>

          <!-- Interactive Operations Buttons -->
          <div style="display: flex; gap: 0.5rem; justify-content: center; align-items: center; margin-top: 0.65rem; flex-wrap: wrap;">
            <div class="custom-input-group">
              <label for="custom-queue-input" style="font-size: 0.8rem; color: var(--text-muted);">Value:</label>
              <input type="text" id="custom-queue-input" placeholder="e.g. 40" value="40" style="width: 58px;" aria-label="Custom queue value">
            </div>
            <button class="btn btn-queue" onclick="queueSim.enqueueCustom()" aria-label="Enqueue value at rear">
              <span>📥 ENQUEUE</span>
            </button>
            <button class="btn btn-danger" onclick="queueSim.dequeue()" aria-label="Dequeue item from front">
              <span>📤 DEQUEUE</span>
            </button>
            <button class="btn btn-outline" onclick="queueSim.inspectFront()" aria-label="Peek front item">
              <span>👀 Peek FRONT</span>
            </button>
            <button class="btn btn-outline" onclick="queueSim.inspectRear()" aria-label="Peek rear item">
              <span>👀 Peek REAR</span>
            </button>
            <button class="btn btn-outline" onclick="queueSim.reset()" aria-label="Reset queue">
              <span>🔄 Reset</span>
            </button>
          </div>

          <!-- Status Log -->
          <div class="status-log" id="queue-op-log" style="margin-top: 0.65rem; padding: 0.5rem 0.85rem; font-size: 0.84rem;" aria-live="polite">
            Queue initialized with [10, 20, 30]. Execute ENQUEUE or DEQUEUE to watch elements travel.
          </div>
        </div>

        <!-- Operational Rules Legend -->
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.75rem;">
          <div class="card" style="padding: 0.5rem 0.8rem; border-left: 3px solid var(--queue-color);">
            <div style="font-size: 0.82rem; font-weight: 700; color: var(--queue-color);">ENQUEUE(x) Rule</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">
              Appends to <code>REAR</code> (index moves right). Never jumps in the middle or front.
            </div>
          </div>
          <div class="card" style="padding: 0.5rem 0.8rem; border-left: 3px solid #ef4444;">
            <div style="font-size: 0.82rem; font-weight: 700; color: #ef4444;">DEQUEUE() Rule</div>
            <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">
              Removes from <code>FRONT</code> (index 0). Remaining elements advance forward to fill the gap.
            </div>
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.queueSim = {
        items: [10, 20, 30],
        nextVal: 40,
        maxCapacity: 6,
        isAnimating: false,

        render(highlightIndex = null) {
          const track = document.getElementById('live-queue-track');
          if (!track) return;

          const size = this.items.length;
          const rearIdx = size > 0 ? size - 1 : -1;

          let cellsHtml = '';
          for (let i = 0; i < this.maxCapacity; i++) {
            const isOccupied = i < size;
            const val = isOccupied ? this.items[i] : '';
            const isFront = isOccupied && i === 0;
            const isRear = isOccupied && i === rearIdx;
            const isHighlighted = highlightIndex === i;

            cellsHtml += `
              <div class="queue-cell ${isOccupied ? 'occupied-cell' : 'empty-cell'} ${isHighlighted ? 'pulse-highlight' : ''}" id="queue-slot-${i}">
                <div class="queue-cell-index">Index ${i}</div>
                ${isOccupied ? `<span>${val}</span>` : `<span style="font-size: 0.72rem; opacity: 0.4;">[Empty]</span>`}
                ${isFront ? `<div class="queue-pointer-badge front-badge">⬇ FRONT</div>` : ''}
                ${isRear ? `<div class="queue-pointer-badge rear-badge">⬆ REAR</div>` : ''}
              </div>
            `;
          }

          track.innerHTML = `
            <div class="queue-gate exit-gate">
              <span style="font-size: 1.15rem;" aria-hidden="true">🚪</span>
              <span>EXIT</span>
              <span style="font-size: 0.65rem;">(FRONT)</span>
            </div>
            <div class="queue-cells-row">
              ${cellsHtml}
            </div>
            <div class="queue-gate entry-gate">
              <span style="font-size: 1.15rem;" aria-hidden="true">🚪</span>
              <span>ENTRY</span>
              <span style="font-size: 0.65rem;">(REAR)</span>
            </div>
          `;

          const sizeEl = document.getElementById('queue-size-indicator');
          const pointersEl = document.getElementById('queue-pointers-indicator');
          const healthEl = document.getElementById('queue-health-indicator');

          if (sizeEl) sizeEl.innerText = `Size: ${size} / ${this.maxCapacity}`;
          if (pointersEl) {
            pointersEl.innerText = size > 0 
              ? `front = 0 ("${this.items[0]}") | rear = ${rearIdx} ("${this.items[rearIdx]}")` 
              : 'front = -1 | rear = -1 (Empty)';
          }
          if (healthEl) {
            if (size >= this.maxCapacity) {
              healthEl.innerText = 'STATUS: FULL (Queue Overflow Warning)';
              healthEl.style.color = '#ef4444';
            } else if (size === 0) {
              healthEl.innerText = 'STATUS: EMPTY (Underflow Warning)';
              healthEl.style.color = '#eab308';
            } else {
              healthEl.innerText = 'STATUS: HEALTHY';
              healthEl.style.color = '#10b981';
            }
          }
        },

        enqueue(customVal = null) {
          if (this.isAnimating) return;
          if (this.items.length >= this.maxCapacity) {
            soundEngine.playBuzz();
            const log = document.getElementById('queue-op-log');
            if (log) log.innerHTML = '<span style="color: #ef4444; font-weight: 700;">⚠️ Queue Overflow: Capacity reached (6 slots max). Cannot enqueue.</span>';
            return;
          }

          soundEngine.playEnqueue();
          const val = customVal !== null ? customVal : this.nextVal;
          this.items.push(val);
          if (customVal === null) this.nextVal += 10;

          const newRearIdx = this.items.length - 1;
          this.render(newRearIdx);

          const log = document.getElementById('queue-op-log');
          if (log) {
            log.innerHTML = `<span style="color: var(--queue-color); font-weight: 700;">📥 ENQUEUE("${val}") executed! Placed at REAR (Index ${newRearIdx}). New size: ${this.items.length}/${this.maxCapacity}.</span>`;
          }
        },

        enqueueCustom() {
          const input = document.getElementById('custom-queue-input');
          const val = (input && input.value.trim()) || String(this.nextVal);
          this.enqueue(val);
          if (input) {
            const nextNum = parseInt(val, 10);
            input.value = !isNaN(nextNum) ? nextNum + 10 : 'Item';
          }
        },

        dequeue() {
          if (this.isAnimating) return;
          if (this.items.length === 0) {
            soundEngine.playBuzz();
            const log = document.getElementById('queue-op-log');
            if (log) log.innerHTML = '<span style="color: #ef4444; font-weight: 700;">⚠️ Queue Underflow: Cannot DEQUEUE from an empty queue (front = -1).</span>';
            return;
          }

          this.isAnimating = true;
          soundEngine.playDequeue();

          const frontCell = document.getElementById('queue-slot-0');
          if (frontCell) {
            frontCell.classList.add('dequeuing-exit');
          }

          const removed = this.items[0];

          setTimeout(() => {
            this.items.shift();
            this.isAnimating = false;
            this.render();
            const log = document.getElementById('queue-op-log');
            if (log) {
              const newFront = this.items.length > 0 ? `Next FRONT is "${this.items[0]}" (Index 0).` : 'Queue is now empty.';
              log.innerHTML = `<span style="color: #ef4444; font-weight: 700;">📤 DEQUEUE() executed! Removed "${removed}" from FRONT (Index 0). ${newFront}</span>`;
            }
          }, 280);
        },

        inspectFront() {
          if (this.items.length === 0) {
            soundEngine.playBuzz();
            const log = document.getElementById('queue-op-log');
            if (log) log.innerHTML = '<span style="color: #ef4444;">Queue is empty. FRONT = -1.</span>';
            return;
          }
          soundEngine.playTone(600);
          this.render(0);
          const log = document.getElementById('queue-op-log');
          if (log) {
            log.innerHTML = `<span style="color: var(--stack-color); font-weight: 700;">👀 PEEK FRONT: Element "${this.items[0]}" is at Index 0. This element departs first on DEQUEUE().</span>`;
          }
        },

        inspectRear() {
          if (this.items.length === 0) {
            soundEngine.playBuzz();
            const log = document.getElementById('queue-op-log');
            if (log) log.innerHTML = '<span style="color: #ef4444;">Queue is empty. REAR = -1.</span>';
            return;
          }
          soundEngine.playTone(480);
          const rearIdx = this.items.length - 1;
          this.render(rearIdx);
          const log = document.getElementById('queue-op-log');
          if (log) {
            log.innerHTML = `<span style="color: var(--queue-color); font-weight: 700;">👀 PEEK REAR: Element "${this.items[rearIdx]}" is at Index ${rearIdx}. This was the most recently added element.</span>`;
          }
        },

        reset() {
          soundEngine.playSlide();
          this.items = [10, 20, 30];
          this.nextVal = 40;
          this.isAnimating = false;
          this.render();
          const log = document.getElementById('queue-op-log');
          if (log) log.innerHTML = '🔄 Queue reset to default [10, 20, 30]. Capacity: 6 slots.';
          const input = document.getElementById('custom-queue-input');
          if (input) input.value = '40';
        }
      };
      queueSim.render();
    },
    notes: "Shows the continuous horizontal progression from REAR ingestion to FRONT dispatch."
  },

  // ==========================================================================
  // TOPIC 5 — ADVANCED QUEUES & PRIORITY
  // ==========================================================================
  {
    id: 14,
    part: "Applications",
    title: "Print Spooling",
    subtitle: "Sequential Job Scheduling",
    render: () => `
      <div class="grid-2">
        <div>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 1.25rem;">
            A network printer spooler receives print jobs:
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.5rem; font-family: var(--font-mono); font-size: 0.92rem; margin-bottom: 1.25rem;">
            <div class="card" style="padding: 0.55rem 0.9rem;">
              Job A → <b>20 pages</b> (Prints 1st)
            </div>
            <div class="card" style="padding: 0.55rem 0.9rem;">
              Job B → <b>5 pages</b> (Prints 2nd)
            </div>
            <div class="card" style="padding: 0.55rem 0.9rem;">
              Job C → <b>10 pages</b> (Prints 3rd)
            </div>
            <div class="card" style="padding: 0.55rem 0.9rem;">
              Job D → <b>50 pages</b> (Prints 4th)
            </div>
          </div>

          <div class="card" style="border-left: 4px solid var(--queue-color); padding: 1rem;">
            <h4 style="color: var(--queue-color); margin-bottom: 0.35rem; font-size: 1.05rem;">The Priority Dilemma:</h4>
            <p style="font-size: 0.95rem; color: var(--text-primary); line-height: 1.5;">
              What if an urgent single-page executive or instructor document arrives that cannot wait behind a 50-page print job?
            </p>
          </div>
        </div>

        <div class="card" style="padding: 1.4rem; text-align: center;">
          <div style="font-size: 2.6rem; margin-bottom: 0.5rem;" aria-hidden="true">🖨️</div>
          <h3 style="font-size: 1.25rem; color: var(--text-primary); margin-bottom: 0.4rem;">Spooler Buffer</h3>
          
          <div id="printer-queue-display" style="display: flex; flex-direction: column; gap: 0.5rem; margin: 1.25rem 0;">
            <!-- Populated via JS -->
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-queue" onclick="printerSim.printNext()" aria-label="Print next document">
              <span>🖨️ Print Next</span>
            </button>
            <button class="btn btn-danger" onclick="printerSim.insertTeacherDoc()" aria-label="Insert urgent document">
              <span>🚨 Urgent Doc Arrives</span>
            </button>
            <button class="btn btn-outline" onclick="printerSim.reset()" aria-label="Reset printer spooler queue">
              <span>🔄 Reset Spooler</span>
            </button>
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.printerSim = {
        jobs: [
          { name: 'Job A', pages: 20, vip: false },
          { name: 'Job B', pages: 5, vip: false },
          { name: 'Job C', pages: 10, vip: false },
          { name: 'Job D', pages: 50, vip: false }
        ],
        render() {
          const container = document.getElementById('printer-queue-display');
          if (!container) return;
          container.innerHTML = this.jobs.map((j, i) => `
            <div style="display: flex; justify-content: space-between; padding: 0.55rem 0.9rem; border-radius: 8px; font-weight: 600; font-size: 0.85rem; ${j.vip ? 'background: rgba(239, 68, 68, 0.2); border: 2px solid #ef4444;' : 'background: rgba(125,125,125,0.06);'}">
              <span>${i === 0 ? '▶ ' : ''}${j.name} (${j.pages} pages)</span>
              <span>${j.vip ? 'PRIORITY 1' : `Position #${i + 1}`}</span>
            </div>
          `).join('') || '<div style="color: var(--text-muted);">No pending print jobs.</div>';
        },
        printNext() {
          if (this.jobs.length === 0) return;
          soundEngine.playDequeue();
          this.jobs.shift();
          this.render();
        },
        insertTeacherDoc() {
          soundEngine.playSuccess();
          this.jobs.unshift({ name: 'Urgent Exam Doc', pages: 1, vip: true });
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.jobs = [
            { name: 'Job A', pages: 20, vip: false },
            { name: 'Job B', pages: 5, vip: false },
            { name: 'Job C', pages: 10, vip: false },
            { name: 'Job D', pages: 50, vip: false }
          ];
          this.render();
        }
      };
      printerSim.render();
    },
    notes: "Bridges simple FIFO queues to Priority Queues."
  },

  {
    id: 15,
    part: "Priority Queue",
    title: "Beyond Simple FIFO",
    subtitle: "Urgency-Based Processing",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="grid-2">
          <div class="card" style="border-top: 4px solid var(--queue-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 style="color: var(--queue-color); font-size: 1.2rem;">Standard Queue (FIFO)</h3>
              <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-subtle);">Strict Arrival</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.25rem;">
              Arrival timestamp strictly governs departure order.
            </p>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--text-primary); line-height: 2;">
              [A] → [B] → [C] → [D]<br>
              Order: <b>A, then B, then C, then D</b>
            </div>
          </div>

          <div class="card" style="border-top: 4px solid var(--priority-color);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.75rem;">
              <h3 style="color: var(--priority-color); font-size: 1.2rem;">Priority Queue (PQ)</h3>
              <span style="font-size: 0.75rem; padding: 2px 8px; border-radius: 4px; border: 1px solid var(--border-subtle);">Binary Heap</span>
            </div>
            <p style="color: var(--text-secondary); font-size: 0.92rem; margin-bottom: 1.25rem;">
              Assigned priority keys supersede chronological arrival.
            </p>
            <div style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--text-primary); line-height: 2;">
              Priority 10 → [A]<br>
              Priority 5  → [C]<br>
              Priority 2  → [B]<br>
              Order: <b>A, then C, then B</b>
            </div>
          </div>
        </div>

        <div class="card" style="margin-top: 1.75rem; border-color: var(--border-active); text-align: center;">
          <h4 style="font-size: 1.15rem; color: var(--accent-primary); font-weight: 700; margin-bottom: 0.35rem;">
            Real-World Scheduling
          </h4>
          <p style="color: var(--text-secondary); font-size: 0.95rem; max-width: 750px; margin: 0 auto; line-height: 1.6;">
            Operating system kernel interrupts, network packet QoS, and rendering engines consistently require priority overrides over pure FIFO.
          </p>
        </div>
      </div>
    `,
    notes: "Explains how Priority Queues combine queue semantics with heap ordering."
  },

  {
    id: 16,
    part: "Priority Queue",
    title: "Emergency Triage",
    subtitle: "Priority-Based Request Handling",
    render: () => `
      <div class="grid-2">
        <div>
          <p style="font-size: 1.05rem; color: var(--text-secondary); line-height: 1.6; margin-bottom: 0.85rem;">
            Four patients arrive in an emergency triage unit:
          </p>

          <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-bottom: 1.25rem;">
            <div class="card" style="padding: 0.65rem 0.9rem; flex-direction: row; justify-content: space-between; align-items: center;">
              <span>Patient A — Mild Headache</span>
              <span style="color: var(--stack-color); font-weight: 700;">Priority 1</span>
            </div>
            <div class="card" style="padding: 0.65rem 0.9rem; flex-direction: row; justify-content: space-between; align-items: center;">
              <span>Patient B — Broken Arm</span>
              <span style="color: var(--queue-color); font-weight: 700;">Priority 2</span>
            </div>
            <div class="card" style="padding: 0.65rem 0.9rem; flex-direction: row; justify-content: space-between; align-items: center; border-color: #ef4444; background: rgba(239, 68, 68, 0.15);">
              <span style="font-weight: 800;">Patient C — Heart Attack</span>
              <span style="color: #ef4444; font-weight: 900;">Priority 10 (CRITICAL)</span>
            </div>
            <div class="card" style="padding: 0.65rem 0.9rem; flex-direction: row; justify-content: space-between; align-items: center;">
              <span>Patient D — Fever</span>
              <span style="color: var(--stack-color); font-weight: 700;">Priority 1</span>
            </div>
          </div>

          <div class="card highlight-stack" style="padding: 0.85rem;">
            <p style="font-size: 0.95rem; color: var(--text-primary);">
              <strong>Observation:</strong> Critical conditions mandate priority preemption. Pure FIFO in this context would yield unacceptable outcomes.
            </p>
          </div>
        </div>

        <div class="card" style="padding: 1.4rem; text-align: center;">
          <h3 style="color: var(--stack-color); font-size: 1.2rem; margin-bottom: 0.85rem;">Triage Scheduling Order</h3>
          
          <div id="triage-order-display" style="display: flex; flex-direction: column; gap: 0.55rem; margin-bottom: 1.25rem;">
            <!-- Populated via JS -->
          </div>

          <div style="display: flex; gap: 0.75rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn-primary" onclick="triageSim.triageSort()" aria-label="Apply priority triage">
              <span>⚡ Apply Priority Triage</span>
            </button>
            <button class="btn btn-outline" onclick="triageSim.reset()" aria-label="Reset triage order">
              <span>🔄 Reset Order</span>
            </button>
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.triageSim = {
        patients: [
          { name: 'Patient A (Headache)', p: 1 },
          { name: 'Patient B (Broken Arm)', p: 2 },
          { name: 'Patient C (Heart Attack)', p: 10 },
          { name: 'Patient D (Fever)', p: 1 }
        ],
        render() {
          const container = document.getElementById('triage-order-display');
          if (!container) return;
          container.innerHTML = this.patients.map((p, i) => `
            <div style="display: flex; justify-content: space-between; padding: 0.55rem 0.85rem; border-radius: 8px; font-weight: 600; font-size: 0.82rem; ${p.p === 10 ? 'background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444;' : 'background: rgba(125,125,125,0.06);'}">
              <span>${i + 1}. ${p.name}</span>
              <span>Urgency: ${p.p}</span>
            </div>
          `).join('');
        },
        triageSort() {
          soundEngine.playSuccess();
          this.patients.sort((a, b) => b.p - a.p);
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.patients = [
            { name: 'Patient A (Headache)', p: 1 },
            { name: 'Patient B (Broken Arm)', p: 2 },
            { name: 'Patient C (Heart Attack)', p: 10 },
            { name: 'Patient D (Fever)', p: 1 }
          ];
          this.render();
        }
      };
      triageSim.render();
    },
    notes: "Demonstrates how real-time urgency metrics override sequential queues."
  },

  // ==========================================================================
  // TOPIC 6 — SYSTEM DESIGN & ARCHITECTURE
  // ==========================================================================
  {
    id: 17,
    part: "System Design",
    title: "Selecting Data Structures",
    subtitle: "Behavior Determines the Structure",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="card" style="padding: 1rem; margin-bottom: 1.25rem; text-align: center;">
          <div style="font-size: 1.1rem; color: var(--text-primary);">
            System Context: <b>Food Delivery Processing Engine</b>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; gap: 0.85rem;">
          <!-- Scenario 1 -->
          <div class="card" style="padding: 1.1rem 1.35rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: 1.05rem; color: var(--text-primary);">Standard kitchen prep queue?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">Chronological fairness to awaiting customers.</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.85rem;" onclick="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'; soundEngine.playTone(520);" aria-label="Reveal answer 1">
                Show Structure
              </button>
              <div style="display: none; font-weight: 800; color: var(--queue-color); font-size: 1.1rem;" aria-live="polite">
                → QUEUE (FIFO)
              </div>
            </div>
          </div>

          <!-- Scenario 2 -->
          <div class="card" style="padding: 1.1rem 1.35rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: 1.05rem; color: var(--text-primary);">Emergency rush or high-tier VIP orders?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">Guaranteed strict delivery deadline preemption.</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.85rem;" onclick="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'; soundEngine.playTone(620);" aria-label="Reveal answer 2">
                Show Structure
              </button>
              <div style="display: none; font-weight: 800; color: var(--priority-color); font-size: 1.1rem;" aria-live="polite">
                → PRIORITY QUEUE
              </div>
            </div>
          </div>

          <!-- Scenario 3 -->
          <div class="card" style="padding: 1.1rem 1.35rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: 1.05rem; color: var(--text-primary);">Cart item undo / modification history?</h4>
                <p style="color: var(--text-muted); font-size: 0.85rem; margin-top: 2px;">Revert the most recent user action.</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.85rem;" onclick="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'; soundEngine.playTone(720);" aria-label="Reveal answer 3">
                Show Structure
              </button>
              <div style="display: none; font-weight: 800; color: var(--stack-color); font-size: 1.1rem;" aria-live="polite">
                → STACK (LIFO)
              </div>
            </div>
          </div>
        </div>

        <div class="card highlight-stack" style="margin-top: 1.4rem; text-align: center;">
          <p style="color: var(--stack-color); font-weight: 700; font-size: 1.05rem;">
            Architectural Principle: Data structures are selected based on operational requirements.
          </p>
        </div>
      </div>
    `,
    notes: "Emphasizes that a single system incorporates multiple data structures depending on feature requirements."
  },

  {
    id: 18,
    part: "System Design",
    title: "Music Player Architecture",
    subtitle: "Mapping Requirements to Data Structures",
    render: () => `
      <div style="max-width: 920px; margin: 0 auto;">
        <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.5rem;">
          <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.9rem 1.4rem;">
            <div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">1. Play requested tracks sequentially</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Sequential playback order</div>
            </div>
            <button class="btn btn-outline" onclick="revealMusicAnswer(this, 'QUEUE (FIFO)', 'var(--queue-color)')" aria-label="Reveal music answer 1">Show</button>
          </div>

          <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.9rem 1.4rem;">
            <div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">2. Navigate to previously played track</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Reverse historical playback track</div>
            </div>
            <button class="btn btn-outline" onclick="revealMusicAnswer(this, 'STACK (LIFO)', 'var(--stack-color)')" aria-label="Reveal music answer 2">Show</button>
          </div>

          <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.9rem 1.4rem;">
            <div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">3. Undo playlist reordering</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Revert modifications</div>
            </div>
            <button class="btn btn-outline" onclick="revealMusicAnswer(this, 'STACK (LIFO)', 'var(--stack-color)')" aria-label="Reveal music answer 3">Show</button>
          </div>

          <div class="card" style="display: flex; flex-direction: row; justify-content: space-between; align-items: center; padding: 0.9rem 1.4rem;">
            <div>
              <div style="font-weight: 700; font-size: 1.05rem; color: var(--text-primary);">4. Emergency broadcast interrupt</div>
              <div style="font-size: 0.82rem; color: var(--text-muted);">Immediate stream preemption</div>
            </div>
            <button class="btn btn-outline" onclick="revealMusicAnswer(this, 'PRIORITY QUEUE', 'var(--priority-color)')" aria-label="Reveal music answer 4">Show</button>
          </div>
        </div>

        <div id="music-complete-badge" class="card highlight-stack" style="display: none; text-align: center; font-size: 1.15rem; font-weight: 800; color: var(--stack-color);" aria-live="polite">
          System mapping validated.
        </div>
      </div>
    `,
    init: () => {
      let count = 0;
      window.revealMusicAnswer = (btn, text, color) => {
        soundEngine.playSuccess();
        const span = document.createElement('span');
        span.style.fontWeight = '800';
        span.style.color = color;
        span.style.fontSize = '1.05rem';
        span.innerText = text;
        btn.parentNode.replaceChild(span, btn);
        count++;
        if (count >= 4) {
          const b = document.getElementById('music-complete-badge');
          if (b) b.style.display = 'block';
        }
      };
    },
    notes: "Practical exercise testing mental model translation to software components."
  },

  // ==========================================================================
  // TOPIC 7 — ARRAY IMPLEMENTATION
  // ==========================================================================
  {
    id: 19,
    part: "Implementation",
    title: "Stack Implementation",
    subtitle: "Array-Based Memory Model",
    render: () => `
      <div class="grid-2">
        <div>
          <div class="code-box">
            <span class="code-line" id="stack-c1"><span class="code-keyword">class</span> <span class="code-type">Stack</span> {</span>
            <span class="code-line" id="stack-c2">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">int</span> arr[<span class="code-num">5</span>];</span>
            <span class="code-line" id="stack-c3">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">int</span> top = -<span class="code-num">1</span>;</span>
            <span class="code-line" id="stack-c4"><span class="code-keyword">public</span>:</span>
            <span class="code-line" id="stack-c5">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">void</span> <span class="code-func">push</span>(<span class="code-type">int</span> x) {</span>
            <span class="code-line" id="stack-c6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[++top] = x;</span>
            <span class="code-line" id="stack-c7">&nbsp;&nbsp;&nbsp;&nbsp;}</span>
            <span class="code-line" id="stack-c8">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">void</span> <span class="code-func">pop</span>() {</span>
            <span class="code-line" id="stack-c9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">if</span> (top != -<span class="code-num">1</span>) top--;</span>
            <span class="code-line" id="stack-c10">&nbsp;&nbsp;&nbsp;&nbsp;}</span>
            <span class="code-line" id="stack-c11">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">int</span> <span class="code-func">peek</span>() { <span class="code-keyword">return</span> arr[top]; }</span>
            <span class="code-line" id="stack-c12">};</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <h4 style="color: var(--text-secondary); margin-bottom: 0.85rem; font-size: 0.9rem; text-transform: uppercase;">
            Array Memory Indices (0 to 4)
          </h4>

          <div id="stack-array-visual" style="display: flex; gap: 6px; margin-bottom: 2rem;">
            <!-- Rendered by JS -->
          </div>

          <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center;">
            <button class="btn btn-stack" onclick="stackCodeSim.pushCode()" aria-label="Simulate push">
              <span>push(x) → ++top</span>
            </button>
            <button class="btn btn-danger" onclick="stackCodeSim.popCode()" aria-label="Simulate pop">
              <span>pop() → top--</span>
            </button>
            <button class="btn btn-outline" onclick="stackCodeSim.reset()" aria-label="Reset stack implementation simulator">Reset</button>
          </div>

          <div id="stack-code-pointer-label" style="margin-top: 1.25rem; font-family: var(--font-mono); font-size: 1.05rem; color: var(--stack-color);" aria-live="polite">
            top = -1 (Empty)
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.stackCodeSim = {
        size: 5,
        top: -1,
        arr: [null, null, null, null, null],
        valCounter: 10,
        render() {
          const container = document.getElementById('stack-array-visual');
          const lbl = document.getElementById('stack-code-pointer-label');
          if (!container) return;

          container.innerHTML = this.arr.map((val, idx) => `
            <div style="width: 56px; height: 56px; border: 2px solid ${idx <= this.top ? 'var(--stack-color)' : 'var(--border-subtle)'}; background: ${idx <= this.top ? 'var(--stack-gradient)' : 'rgba(125,125,125,0.06)'}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 700; color: #fff; position: relative;">
              <span style="font-size: 1.05rem;">${val !== null && idx <= this.top ? val : ''}</span>
              <span style="position: absolute; bottom: -20px; font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">[${idx}]</span>
              ${idx === this.top ? '<div style="position: absolute; top: -28px; color: var(--stack-color); font-size: 0.75rem; font-weight: 800;">TOP ↓</div>' : ''}
            </div>
          `).join('');

          lbl.innerText = this.top === -1 ? 'top = -1 (Empty Stack)' : `top = ${this.top} (arr[${this.top}] = ${this.arr[this.top]})`;
        },
        pushCode() {
          if (this.top >= this.size - 1) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playPush();
          this.highlightLine('stack-c6');
          this.top++;
          this.arr[this.top] = this.valCounter;
          this.valCounter += 10;
          this.render();
        },
        popCode() {
          if (this.top === -1) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playPop();
          this.highlightLine('stack-c9');
          this.top--;
          this.render();
        },
        highlightLine(id) {
          document.querySelectorAll('.code-line').forEach(l => l.classList.remove('active-line'));
          const el = document.getElementById(id);
          if (el) el.classList.add('active-line');
        },
        reset() {
          soundEngine.playSlide();
          this.top = -1;
          this.arr = [null, null, null, null, null];
          this.valCounter = 10;
          document.querySelectorAll('.code-line').forEach(l => l.classList.remove('active-line'));
          this.render();
        }
      };
      stackCodeSim.render();
    },
    notes: "Explains array bounds and the pre-increment operator ++top."
  },

  {
    id: 20,
    part: "Implementation",
    title: "Queue Implementation",
    subtitle: "Linear Array Pointer Mechanics",
    render: () => `
      <div class="grid-2">
        <div>
          <div class="code-box">
            <span class="code-line" id="q-c1"><span class="code-keyword">class</span> <span class="code-type">Queue</span> {</span>
            <span class="code-line" id="q-c2">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">int</span> arr[<span class="code-num">5</span>];</span>
            <span class="code-line" id="q-c3">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">int</span> front = <span class="code-num">0</span>, rear = -<span class="code-num">1</span>;</span>
            <span class="code-line" id="q-c4"><span class="code-keyword">public</span>:</span>
            <span class="code-line" id="q-c5">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">void</span> <span class="code-func">enqueue</span>(<span class="code-type">int</span> x) {</span>
            <span class="code-line" id="q-c6">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;arr[++rear] = x;</span>
            <span class="code-line" id="q-c7">&nbsp;&nbsp;&nbsp;&nbsp;}</span>
            <span class="code-line" id="q-c8">&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-type">void</span> <span class="code-func">dequeue</span>() {</span>
            <span class="code-line" id="q-c9">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class="code-keyword">if</span> (front &lt;= rear) front++;</span>
            <span class="code-line" id="q-c10">&nbsp;&nbsp;&nbsp;&nbsp;}</span>
            <span class="code-line" id="q-c11">};</span>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <h4 style="color: var(--text-secondary); margin-bottom: 0.85rem; font-size: 0.9rem; text-transform: uppercase;">
            Array Memory Visualization
          </h4>

          <div id="queue-array-visual" style="display: flex; gap: 6px; margin-bottom: 2rem;">
            <!-- Rendered by JS -->
          </div>

          <div style="display: flex; gap: 0.6rem; flex-wrap: wrap; justify-content: center;">
            <button class="btn btn-queue" onclick="queueCodeSim.enqueueCode()" aria-label="Enqueue advance rear">
              <span>enqueue(x) → ++rear</span>
            </button>
            <button class="btn btn-danger" onclick="queueCodeSim.dequeueCode()" aria-label="Dequeue advance front">
              <span>dequeue() → front++</span>
            </button>
            <button class="btn btn-outline" onclick="queueCodeSim.reset()" aria-label="Reset queue code simulator">Reset</button>
          </div>

          <div id="queue-code-pointer-label" style="margin-top: 1.25rem; font-family: var(--font-mono); font-size: 1rem; color: var(--queue-color);" aria-live="polite">
            front = 0, rear = -1
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.queueCodeSim = {
        size: 5,
        front: 0,
        rear: -1,
        arr: [null, null, null, null, null],
        valCounter: 10,
        render() {
          const container = document.getElementById('queue-array-visual');
          const lbl = document.getElementById('queue-code-pointer-label');
          if (!container) return;

          container.innerHTML = this.arr.map((val, idx) => `
            <div style="width: 56px; height: 56px; border: 2px solid ${idx >= this.front && idx <= this.rear ? 'var(--queue-color)' : 'var(--border-subtle)'}; background: ${idx >= this.front && idx <= this.rear ? 'var(--queue-gradient)' : 'rgba(125,125,125,0.06)'}; border-radius: 8px; display: flex; flex-direction: column; align-items: center; justify-content: center; font-weight: 700; color: #fff; position: relative;">
              <span style="font-size: 1.05rem;">${val !== null && idx >= this.front && idx <= this.rear ? val : ''}</span>
              <span style="position: absolute; bottom: -20px; font-size: 0.72rem; color: var(--text-muted); font-family: var(--font-mono);">[${idx}]</span>
              ${idx === this.front && this.front <= this.rear ? '<div style="position: absolute; top: -28px; color: var(--stack-color); font-size: 0.75rem; font-weight: 800;">FRONT</div>' : ''}
              ${idx === this.rear && this.rear >= 0 ? '<div style="position: absolute; bottom: -44px; color: var(--queue-color); font-size: 0.75rem; font-weight: 800;">REAR</div>' : ''}
            </div>
          `).join('');

          lbl.innerText = `front = ${this.front}, rear = ${this.rear}`;
        },
        enqueueCode() {
          if (this.rear >= this.size - 1) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playEnqueue();
          this.highlightLine('q-c6');
          this.rear++;
          this.arr[this.rear] = this.valCounter;
          this.valCounter += 10;
          this.render();
        },
        dequeueCode() {
          if (this.front > this.rear) {
            soundEngine.playBuzz();
            return;
          }
          soundEngine.playDequeue();
          this.highlightLine('q-c9');
          this.front++;
          this.render();
        },
        highlightLine(id) {
          document.querySelectorAll('.code-line').forEach(l => l.classList.remove('active-line'));
          const el = document.getElementById(id);
          if (el) el.classList.add('active-line');
        },
        reset() {
          soundEngine.playSlide();
          this.front = 0;
          this.rear = -1;
          this.arr = [null, null, null, null, null];
          this.valCounter = 10;
          document.querySelectorAll('.code-line').forEach(l => l.classList.remove('active-line'));
          this.render();
        }
      };
      queueCodeSim.render();
    },
    notes: "Illustrates the rightward drift of front and rear pointers in linear arrays."
  },

  {
    id: 21,
    part: "Implementation",
    title: "Queue Drift",
    subtitle: "Memory Inefficiency & The False Overflow Problem",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <div class="card" style="padding: 1.2rem 2rem; text-align: center; margin-bottom: 1.75rem; border-color: var(--border-active);">
          <h3 style="font-size: 1.35rem; font-weight: 800; margin-bottom: 0.35rem; color: var(--text-primary);">
            Queue Drift in Static Arrays
          </h3>
          <p style="color: var(--text-secondary); font-size: 1.05rem;">
            After enqueuing 5 elements (<code>rear = 4</code>) and dequeuing 3 elements (<code>front = 3</code>):
          </p>
        </div>

        <div class="card" style="padding: 1.75rem; margin-bottom: 1.75rem;">
          <div style="text-align: center; margin-bottom: 1.25rem; font-size: 1rem; color: var(--text-muted);">
            Array Memory State:
          </div>

          <div style="display: flex; gap: 8px; justify-content: center; margin-bottom: 1.25rem;">
            <div style="width: 70px; height: 70px; border: 2px dashed var(--border-subtle); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-weight: 700;">VACANT</div>
            <div style="width: 70px; height: 70px; border: 2px dashed var(--border-subtle); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-weight: 700;">VACANT</div>
            <div style="width: 70px; height: 70px; border: 2px dashed var(--border-subtle); border-radius: 10px; display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-weight: 700;">VACANT</div>
            <div class="queue-element" style="width: 70px; height: 70px; border-radius: 10px; font-size: 1.2rem;">40</div>
            <div class="queue-element" style="width: 70px; height: 70px; border-radius: 10px; font-size: 1.2rem;">50</div>
          </div>

          <div style="display: flex; justify-content: space-between; max-width: 440px; margin: 0 auto; font-family: var(--font-mono); font-size: 0.9rem;">
            <span style="color: var(--text-muted);">Slots 0, 1, 2 are unutilized</span>
            <span style="color: #ef4444; font-weight: 700;">rear == 4 (False Overflow)</span>
          </div>
        </div>

        <div class="card highlight-stack" style="padding: 1.4rem; text-align: center;">
          <h2 style="color: var(--stack-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 0.35rem;">
            Circular Queue Solution 🔄
          </h2>
          <p style="font-size: 1.05rem; color: var(--text-primary);">
            Reuse vacant lower indices by wrapping pointers using modulo arithmetic: <code>(rear + 1) % SIZE</code>.
          </p>
        </div>
      </div>
    `,
    notes: "Explains why linear array queues waste memory unless wrapped into a circular buffer."
  },

  {
    id: 22,
    part: "Implementation",
    title: "Circular Queue",
    subtitle: "Modulo Ring Buffer Implementation",
    render: () => `
      <div class="grid-2">
        <div>
          <div class="code-box" style="margin-bottom: 1.25rem;">
            <span class="code-comment">// Circular Pointer Wrap</span><br>
            rear = (rear + <span class="code-num">1</span>) % SIZE;<br>
            front = (front + <span class="code-num">1</span>) % SIZE;<br><br>
            <span class="code-comment">// Queue Full Condition</span><br>
            (rear + <span class="code-num">1</span>) % SIZE == front;
          </div>

          <div class="card">
            <h4 style="color: var(--stack-color); font-size: 1.1rem; margin-bottom: 0.4rem;">Circular Buffer Advantages:</h4>
            <ul style="list-style: none; display: flex; flex-direction: column; gap: 0.65rem; font-size: 0.95rem; color: var(--text-secondary);">
              <li>✔ Recycles vacated front array indices.</li>
              <li>✔ Eliminates expensive O(N) array element shifting.</li>
              <li>✔ Constant O(1) performance for Enqueue and Dequeue.</li>
            </ul>
          </div>
        </div>

        <!-- Interactive Circular Ring -->
        <div style="display: flex; flex-direction: column; align-items: center;">
          <div class="circular-queue-wrapper" id="circ-queue-ring">
            <!-- Rendered by JS -->
          </div>

          <div style="display: flex; gap: 0.6rem; margin-top: 1rem; flex-wrap: wrap; justify-content: center;">
            <button class="btn btn-queue" onclick="circularSim.enqueue()" aria-label="Enqueue item onto circular buffer">
              <span>📥 Enqueue</span>
            </button>
            <button class="btn btn-danger" onclick="circularSim.dequeue()" aria-label="Dequeue item from circular buffer">
              <span>📤 Dequeue</span>
            </button>
            <button class="btn btn-outline" onclick="circularSim.reset()" aria-label="Reset circular queue">Reset</button>
          </div>

          <div id="circ-status-lbl" style="margin-top: 0.75rem; font-family: var(--font-mono); font-size: 0.85rem; color: var(--queue-color);" aria-live="polite">
            Circular buffer initialized (SIZE = 6).
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.circularSim = {
        size: 6,
        slots: [null, null, null, null, null, null],
        front: -1,
        rear: -1,
        valCounter: 10,
        render() {
          const ring = document.getElementById('circ-queue-ring');
          const lbl = document.getElementById('circ-status-lbl');
          if (!ring) return;

          const radius = 95;
          const centerX = 140 - 28;
          const centerY = 140 - 28;

          ring.innerHTML = this.slots.map((val, i) => {
            const angle = (i / this.size) * (2 * Math.PI) - Math.PI / 2;
            const x = centerX + radius * Math.cos(angle);
            const y = centerY + radius * Math.sin(angle);
            const isFront = i === this.front;
            const isRear = i === this.rear;
            const isOccupied = val !== null;

            return `
              <div class="circular-slot ${isOccupied ? 'occupied' : ''} ${isFront ? 'is-front' : ''} ${isRear ? 'is-rear' : ''}" style="left: ${x}px; top: ${y}px;">
                <span>${val !== null ? val : `[${i}]`}</span>
              </div>
            `;
          }).join('') + `
            <div style="position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-family: var(--font-mono); color: var(--text-muted); pointer-events: none;">
              SIZE = 6
            </div>
          `;

          lbl.innerText = `front: ${this.front}, rear: ${this.rear}`;
        },
        enqueue() {
          if ((this.rear + 1) % this.size === this.front) {
            soundEngine.playBuzz();
            document.getElementById('circ-status-lbl').innerHTML = 
              '<span style="color: #ef4444;">Queue Full: (rear + 1) % SIZE == front.</span>';
            return;
          }
          soundEngine.playEnqueue();
          if (this.front === -1) this.front = 0;
          this.rear = (this.rear + 1) % this.size;
          this.slots[this.rear] = this.valCounter;
          this.valCounter += 10;
          this.render();
        },
        dequeue() {
          if (this.front === -1) {
            soundEngine.playBuzz();
            document.getElementById('circ-status-lbl').innerHTML = '<span style="color: #ef4444;">Queue Empty: front == -1.</span>';
            return;
          }
          soundEngine.playDequeue();
          this.slots[this.front] = null;
          if (this.front === this.rear) {
            this.front = -1;
            this.rear = -1;
          } else {
            this.front = (this.front + 1) % this.size;
          }
          this.render();
        },
        reset() {
          soundEngine.playSlide();
          this.slots = [null, null, null, null, null, null];
          this.front = -1;
          this.rear = -1;
          this.valCounter = 10;
          this.render();
        }
      };
      circularSim.render();
    },
    notes: "Demonstrate modulo wrap-around when indices exceed array bounds."
  },

  // ==========================================================================
  // TOPIC 8 — PRACTICE & VERIFICATION
  // ==========================================================================
  {
    id: 23,
    part: "Practice",
    title: "Scenario Analysis",
    subtitle: "Stack vs Queue Decision Matrix",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.85rem;">
          <div class="card" style="padding: 0.9rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 1rem;">Scenario A:</strong>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">Undo last user action</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="this.outerHTML = '<span style=\\'color:var(--stack-color);font-weight:800;\\'>STACK</span>'; soundEngine.playSuccess();" aria-label="Reveal scenario A answer">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 1rem;">Scenario B:</strong>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">Printer document spooler</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="this.outerHTML = '<span style=\\'color:var(--queue-color);font-weight:800;\\'>QUEUE</span>'; soundEngine.playSuccess();" aria-label="Reveal scenario B answer">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 1rem;">Scenario C:</strong>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">Function Call execution</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="this.outerHTML = '<span style=\\'color:var(--stack-color);font-weight:800;\\'>STACK</span>'; soundEngine.playSuccess();" aria-label="Reveal scenario C answer">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 1rem;">Scenario D:</strong>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">Breadth-First Search (BFS)</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="this.outerHTML = '<span style=\\'color:var(--queue-color);font-weight:800;\\'>QUEUE</span>'; soundEngine.playSuccess();" aria-label="Reveal scenario D answer">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 1rem;">Scenario E:</strong>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">Browser Back navigation</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="this.outerHTML = '<span style=\\'color:var(--stack-color);font-weight:800;\\'>STACK</span>'; soundEngine.playSuccess();" aria-label="Reveal scenario E answer">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <strong style="font-size: 1rem;">Scenario F:</strong>
                <p style="color: var(--text-secondary); font-size: 0.88rem;">CPU Process Scheduling</p>
              </div>
              <button class="btn btn-outline" style="font-size: 0.8rem; padding: 0.3rem 0.6rem;" onclick="this.outerHTML = '<span style=\\'color:var(--priority-color);font-weight:800;\\'>QUEUE / PRIORITY QUEUE</span>'; soundEngine.playSuccess();" aria-label="Reveal scenario F answer">Check</button>
            </div>
          </div>
        </div>

        <div style="margin-top: 1.4rem; text-align: center;">
          <button class="btn btn-primary" onclick="document.querySelectorAll('.card button').forEach(b => b.click())" aria-label="Reveal all battle answers">
            Reveal All Solutions
          </button>
        </div>
      </div>
    `,
    notes: "Active recall checkpoint."
  },

  {
    id: 24,
    part: "Mental Model",
    title: "Core Memory Anchor",
    subtitle: "Pile (LIFO) vs Line (FIFO)",
    render: () => `
      <div style="max-width: 900px; margin: 0 auto; text-align: center; width: 100%;">
        <div class="grid-2" style="gap: 1.25rem; margin-bottom: 0.85rem;">
          <div class="card highlight-stack" style="padding: 1.1rem 1.25rem; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 0.35rem;" aria-hidden="true">🥞</div>
            <h2 style="color: var(--stack-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 0.2rem;">STACK</h2>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">
              Pile Model
            </div>
            <p style="color: var(--stack-color); font-size: 0.9rem; font-weight: 600;">
              Last In → First Out (LIFO)
            </p>
            <div class="card" style="margin-top: 0.6rem; padding: 0.35rem; font-weight: 800; font-size: 1rem; color: var(--stack-color);">
              STACK = PILE
            </div>
          </div>

          <div class="card highlight-queue" style="padding: 1.1rem 1.25rem; text-align: center;">
            <div style="font-size: 2.2rem; margin-bottom: 0.35rem;" aria-hidden="true">🚶‍♂️🚶‍♀️</div>
            <h2 style="color: var(--queue-color); font-size: 1.6rem; font-weight: 900; margin-bottom: 0.2rem;">QUEUE</h2>
            <div style="font-size: 1.05rem; font-weight: 700; color: var(--text-primary); margin-bottom: 0.2rem;">
              Line Model
            </div>
            <p style="color: var(--queue-color); font-size: 0.9rem; font-weight: 600;">
              First In → First Out (FIFO)
            </p>
            <div class="card" style="margin-top: 0.6rem; padding: 0.35rem; font-weight: 800; font-size: 1rem; color: var(--queue-color);">
              QUEUE = LINE
            </div>
          </div>
        </div>

        <!-- Interactive Word Reversal -->
        <div class="card" style="padding: 0.85rem 1.2rem; max-width: 580px; margin: 0 auto;">
          <div style="font-size: 0.88rem; font-weight: 700; color: var(--stack-color); margin-bottom: 0.35rem;">
            String Inversion Using Stack (LIFO in Action)
          </div>
          <div style="display: flex; gap: 0.5rem; justify-content: center; align-items: center;">
            <input type="text" id="reverse-word-input" value="ALGORITHM" style="background: rgba(125,125,125,0.1); border: 1px solid var(--border-subtle); border-radius: 6px; color: var(--text-primary); padding: 0.35rem 0.75rem; font-family: var(--font-mono); font-size: 0.9rem;" aria-label="Word to reverse">
            <button class="btn btn-stack" style="padding: 0.35rem 0.85rem; font-size: 0.85rem;" onclick="reverseWordWithStack()" aria-label="Reverse word">
              Invert String
            </button>
          </div>
          <div id="reverse-word-result" style="margin-top: 0.5rem; font-family: var(--font-mono); font-size: 1rem; color: var(--stack-color); font-weight: 700;" aria-live="polite">
            ALGORITHM inverted is MHTIROGLA
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.reverseWordWithStack = () => {
        soundEngine.playPop();
        const input = document.getElementById('reverse-word-input');
        const word = input.value.trim() || 'ALGORITHM';
        const stack = word.split('');
        let reversed = '';
        while (stack.length > 0) {
          reversed += stack.pop();
        }
        document.getElementById('reverse-word-result').innerText = `"${word}" inverted is "${reversed}"`;
      };
    },
    notes: "Direct conceptual distillation: Pile = LIFO, Line = FIFO."
  },

  {
    id: 25,
    part: "System Design",
    title: "Operating System Architecture",
    subtitle: "Unified Subsystem Coordination",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <p style="font-size: 1.1rem; color: var(--text-secondary); text-align: center; margin-bottom: 1.25rem;">
          Operating system kernel mapping across foundational data structures:
        </p>

        <div class="card" style="padding: 1.4rem; margin-bottom: 1.4rem;">
          <div style="display: flex; flex-direction: column; gap: 0.75rem; font-size: 1rem;">
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
              <span>Function Calls & Activation Records:</span>
              <strong style="color: var(--stack-color);">STACK</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
              <span>Print Spooling & Batch Jobs:</span>
              <strong style="color: var(--queue-color);">QUEUE</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
              <span>Real-Time Kernel Interrupts:</span>
              <strong style="color: var(--priority-color);">PRIORITY QUEUE</strong>
            </div>
            <div style="display: flex; justify-content: space-between; border-bottom: 1px solid var(--border-subtle); padding-bottom: 0.4rem;">
              <span>Undo Operations in Buffers:</span>
              <strong style="color: var(--stack-color);">STACK</strong>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span>Breadth-First Search (BFS) Indexing:</span>
              <strong style="color: var(--queue-color);">QUEUE</strong>
            </div>
          </div>
        </div>

        <div class="card highlight-stack" style="padding: 1.75rem; text-align: center;">
          <h2 style="font-size: 1.8rem; font-weight: 900; line-height: 1.4; color: var(--text-primary); letter-spacing: -0.01em;">
            “Data Structures aren't about storing data.<br>
            <span style="color: var(--stack-color);">They're about deciding how data should behave.</span>”
          </h2>
        </div>
      </div>
    `,
    notes: "Synthesizes the entire lecture into a coherent system-level perspective."
  },

  // ==========================================================================
  // TOPIC 9 — ADVANCED WORKSHOPS & CHALLENGES
  // ==========================================================================
  {
    id: 26,
    part: "Trace Analysis",
    title: "Operation Sequence Trace",
    subtitle: "Step-by-Step State Evolution",
    render: () => `
      <div class="grid-2">
        <div>
          <h3 style="color: var(--stack-color); margin-bottom: 0.85rem; font-size: 1.15rem;">Operation Sequence:</h3>
          <div class="code-box" style="font-size: 1rem; line-height: 1.8; margin-bottom: 1.25rem;">
            1. PUSH(10)<br>
            2. PUSH(20)<br>
            3. PUSH(30)<br>
            4. POP()<br>
            5. PUSH(40)<br>
            6. POP()
          </div>

          <div class="card" style="border-left: 4px solid var(--queue-color); padding: 0.9rem;">
            <div style="font-weight: 700; color: var(--queue-color); margin-bottom: 0.25rem;">Evaluation Question:</div>
            <p style="font-size: 0.95rem;">
              What items remain in the stack from Bottom to Top?
            </p>
          </div>
        </div>

        <div style="display: flex; flex-direction: column; align-items: center;">
          <div class="stack-canister" id="predict-stack-canister" style="height: 230px; width: 180px;">
            <!-- Rendered by JS -->
          </div>

          <div style="display: flex; gap: 0.75rem; margin-top: 1rem;">
            <button class="btn btn-primary" onclick="predictSim.step()" aria-label="Step to next operation">
              <span>Step Execution ⏩</span>
            </button>
            <button class="btn btn-outline" onclick="predictSim.reset()" aria-label="Reset prediction trace">Reset</button>
          </div>

          <div id="predict-step-log" class="status-log" style="margin-top: 0.85rem; width: 100%; justify-content: center;" aria-live="polite">
            Ready. Step 0/6.
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.predictSim = {
        stepIdx: 0,
        stack: [],
        ops: [
          { type: 'push', val: 10, text: '1. PUSH(10) → Stack: [10]' },
          { type: 'push', val: 20, text: '2. PUSH(20) → Stack: [10, 20]' },
          { type: 'push', val: 30, text: '3. PUSH(30) → Stack: [10, 20, 30]' },
          { type: 'pop', text: '4. POP() removes 30 → Stack: [10, 20]' },
          { type: 'push', val: 40, text: '5. PUSH(40) → Stack: [10, 20, 40]' },
          { type: 'pop', text: '6. POP() removes 40 → FINAL STACK: [10, 20]' }
        ],
        render() {
          const canister = document.getElementById('predict-stack-canister');
          if (!canister) return;
          canister.innerHTML = this.stack.map((v, i) => `
            <div class="stack-element ${i === this.stack.length - 1 ? 'top-elem' : ''}" style="height: 38px;">
              ${v} ${i === this.stack.length - 1 ? '← TOP' : ''}
            </div>
          `).join('');
        },
        step() {
          if (this.stepIdx >= this.ops.length) return;
          const op = this.ops[this.stepIdx];
          if (op.type === 'push') {
            soundEngine.playPush();
            this.stack.push(op.val);
          } else {
            soundEngine.playPop();
            this.stack.pop();
          }
          this.stepIdx++;
          this.render();
          document.getElementById('predict-step-log').innerHTML = op.text;
          if (this.stepIdx === this.ops.length) {
            soundEngine.playSuccess();
          }
        },
        reset() {
          soundEngine.playSlide();
          this.stepIdx = 0;
          this.stack = [];
          this.render();
          document.getElementById('predict-step-log').innerHTML = 'Ready. Step 0/6.';
        }
      };
      predictSim.render();
    },
    notes: "Sequential state tracking exercise."
  },

  {
    id: 27,
    part: "Debugging",
    title: "Code Review",
    subtitle: "Boundary Condition in Reverse Traversal",
    render: () => `
      <div class="grid-2">
        <div>
          <div class="code-box" style="margin-bottom: 1.25rem;">
            <span class="code-comment">// Reverse Traversal Bug Analysis</span><br>
            <span class="code-keyword">int</span> n = stack.size(); <span class="code-comment">// n = 5</span><br>
            <span class="code-keyword">for</span> (<span class="code-type">int</span> i = n - <span class="code-num">1</span>; <span style="background: rgba(239, 68, 68, 0.3); padding: 2px 4px; border-radius: 4px; border: 1px solid #ef4444;">i &lt;= 0</span>; i--) {<br>
            &nbsp;&nbsp;&nbsp;&nbsp;cout &lt;&lt; arr[i] &lt;&lt; endl;<br>
            }
          </div>

          <button class="btn btn-primary" onclick="this.nextElementSibling.style.display = 'block'; this.style.display = 'none'; soundEngine.playSuccess();" aria-label="Explain the bug">
            <span>🔍 Analyze Loop Boundary</span>
          </button>

          <div class="card highlight-queue" style="display: none; border-color: #ef4444; padding: 1.25rem; margin-top: 1rem;" aria-live="polite">
            <h4 style="color: #ef4444; font-weight: 800; margin-bottom: 0.4rem;">Bug: Operator is <code style="color: var(--text-primary);">i &lt;= 0</code> instead of <code style="color: var(--text-primary);">i &gt;= 0</code></h4>
            <p style="font-size: 0.95rem; line-height: 1.5; color: var(--text-primary);">
              When initialized at <code>i = n - 1</code> (4), the condition <code>4 &lt;= 0</code> immediately evaluates to <b>FALSE</b>.
              The loop body terminates prior to the first iteration.
            </p>
          </div>
        </div>

        <div class="card" style="padding: 1.5rem;">
          <h3 style="color: var(--queue-color); font-size: 1.15rem; margin-bottom: 0.85rem;">Correct Formulation:</h3>
          <p style="color: var(--text-secondary); font-size: 0.92rem; line-height: 1.6; margin-bottom: 1rem;">
            When traversing stacks backwards from TOP to index 0:
          </p>
          <div class="code-box">
            for (int i = n - 1; <b style="color: var(--stack-color);">i &gt;= 0</b>; i--)
          </div>
        </div>
      </div>
    `,
    notes: "Highlights common array indexing boundary errors in reverse stack traversal."
  },

  {
    id: 28,
    part: "Applications",
    title: "Game Engine Architecture",
    subtitle: "Menu State Stacks & Matchmaking Queues",
    render: () => `
      <div class="grid-2">
        <!-- Stack in Games -->
        <div class="card highlight-stack" style="padding: 1.6rem;">
          <div style="font-size: 2.2rem; margin-bottom: 0.4rem;" aria-hidden="true">🕹️</div>
          <h3 style="color: var(--stack-color); font-size: 1.25rem; margin-bottom: 0.4rem;">Game State Manager (Stack)</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.85rem;">
            Hierarchical menu state transitions:
          </p>
          <div class="code-box" style="margin-bottom: 0.85rem;">
            [TOP] Audio Settings Menu<br>
            &nbsp;&nbsp;↓&nbsp;&nbsp; Pause Menu<br>
            &nbsp;&nbsp;↓&nbsp;&nbsp; Active Gameplay Level<br>
            [BOT] Title Screen
          </div>
          <p style="color: var(--text-primary); font-size: 0.9rem;">
            Pressing <b>ESC / Back</b> pops the top state, restoring the exact prior execution context.
          </p>
        </div>

        <!-- Queue in Games -->
        <div class="card highlight-queue" style="padding: 1.6rem;">
          <div style="font-size: 2.2rem; margin-bottom: 0.4rem;" aria-hidden="true">⚔️</div>
          <h3 style="color: var(--queue-color); font-size: 1.25rem; margin-bottom: 0.4rem;">Matchmaking Pool (Queue)</h3>
          <p style="color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 0.85rem;">
            Multiplayer server matchmaking lobbies:
          </p>
          <div class="code-box" style="margin-bottom: 0.85rem;">
            Player 1 joins queue (T + 0.0s)<br>
            Player 2 joins queue (T + 1.2s)<br>
            Player 3 joins queue (T + 2.5s)<br>
            Player 4 joins queue (T + 3.1s)
          </div>
          <p style="color: var(--text-primary); font-size: 0.9rem;">
            Players are dequeued into matches in arrival order (FIFO) to preserve fair wait times.
          </p>
        </div>
      </div>
    `,
    notes: "Demonstrates practical usage in interactive graphics and networked games."
  },

  {
    id: 29,
    part: "Problem Recognition",
    title: "Pattern Recognition",
    subtitle: "Balanced Parentheses & BFS",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto;">
        <div style="display: flex; flex-direction: column; gap: 0.85rem; margin-bottom: 1.25rem;">
          <div class="card" style="padding: 0.9rem 1.4rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: 1.05rem;">“Process items in chronological order of arrival.”</h4>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Fairness, chronological ordering.</span>
              </div>
              <button class="btn btn-outline" onclick="this.outerHTML = '<span style=\\'color:var(--queue-color);font-weight:900;font-size:1.15rem;\\'>👉 QUEUE</span>'; soundEngine.playSuccess();" aria-label="Reveal choice 1">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.4rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: 1.05rem;">“Invert sequence or backtrack search paths.”</h4>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Reverse order, DFS traversal, undo.</span>
              </div>
              <button class="btn btn-outline" onclick="this.outerHTML = '<span style=\\'color:var(--stack-color);font-weight:900;font-size:1.15rem;\\'>👉 STACK</span>'; soundEngine.playSuccess();" aria-label="Reveal choice 2">Check</button>
            </div>
          </div>

          <div class="card" style="padding: 0.9rem 1.4rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <h4 style="font-size: 1.05rem;">“Find shortest unweighted path level by level.”</h4>
                <span style="font-size: 0.82rem; color: var(--text-muted);">Breadth-First Search (BFS).</span>
              </div>
              <button class="btn btn-outline" onclick="this.outerHTML = '<span style=\\'color:var(--queue-color);font-weight:900;font-size:1.15rem;\\'>👉 QUEUE</span>'; soundEngine.playSuccess();" aria-label="Reveal choice 3">Check</button>
            </div>
          </div>
        </div>

        <!-- Interactive Parentheses Checker -->
        <div class="card highlight-stack" style="padding: 1.25rem;">
          <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <strong style="color: var(--stack-color); font-size: 1rem;">Parentheses Balance Validator (Stack-Based):</strong>
            <div style="display: flex; gap: 0.5rem;">
              <input type="text" id="paren-input" value="{[()()]}" style="background: rgba(125,125,125,0.1); border: 1px solid var(--border-subtle); border-radius: 6px; color: var(--text-primary); padding: 0.35rem 0.75rem; font-family: var(--font-mono); font-size: 0.95rem; width: 140px;" aria-label="Parentheses string">
              <button class="btn btn-primary" style="padding: 0.35rem 0.85rem; font-size: 0.85rem;" onclick="validateParenthesesLive()" aria-label="Validate parentheses">
                Validate
              </button>
            </div>
          </div>
          <div id="paren-result" style="font-family: var(--font-mono); font-size: 0.95rem; color: var(--stack-color);" aria-live="polite">
            "{[()()]}" is BALANCED (Every opening symbol matched by corresponding closing symbol).
          </div>
        </div>
      </div>
    `,
    init: () => {
      window.validateParenthesesLive = () => {
        const input = document.getElementById('paren-input');
        const str = input.value.trim();
        const stack = [];
        const map = { ')': '(', '}': '{', ']': '[' };
        let balanced = true;

        for (const char of str) {
          if (['(', '{', '['].includes(char)) {
            stack.push(char);
          } else if ([')', '}', ']'].includes(char)) {
            if (stack.length === 0 || stack.pop() !== map[char]) {
              balanced = false;
              break;
            }
          }
        }
        if (stack.length !== 0) balanced = false;

        const resEl = document.getElementById('paren-result');
        if (balanced) {
          soundEngine.playSuccess();
          resEl.innerHTML = `<span style="color: var(--stack-color);">✅ "${str}" is BALANCED.</span>`;
        } else {
          soundEngine.playBuzz();
          resEl.innerHTML = `<span style="color: #ef4444;">❌ "${str}" is UNBALANCED (Mismatched or unclosed bracket).</span>`;
        }
      };
    },
    notes: "Demonstrates the canonical stack algorithm for compiler syntax validation."
  },

  {
    id: 30,
    part: "Summary",
    title: "Master Reference Chart",
    subtitle: "Complete Decision Tree & Revision Guide",
    render: () => `
      <div style="max-width: 960px; margin: 0 auto; text-align: center; width: 100%;">
        <div class="card" style="padding: clamp(0.75rem, 1.8vh, 1.25rem); border: 2px solid var(--border-active); margin-bottom: 1rem;">
          <div style="font-family: var(--font-mono); font-size: clamp(0.82rem, 1.1vw, 1.05rem); line-height: 1.7; color: var(--text-primary); display: inline-block; text-align: left;">
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: var(--text-primary); font-size: 1.2rem;">D A T A</strong><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌────────────┴────────────┐<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--stack-color); font-weight: 700;">LAST OUT?</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span style="color: var(--queue-color); font-weight: 700;">FIRST OUT?</span><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: var(--stack-color); font-size: 1.15rem;">S T A C K</strong>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong style="color: var(--queue-color); font-size: 1.15rem;">Q U E U E</strong><br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (LIFO)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│ (FIFO)<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───┼───┐&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;┌───┼───┐<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│&nbsp;&nbsp;&nbsp;│<br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Undo&nbsp;Back&nbsp;CallStack&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Printer&nbsp;BFS&nbsp;Scheduling
          </div>
        </div>

        <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
          <button class="btn btn-primary" onclick="window.print()" aria-label="Print or save revision sheet">
            <span>🖨️ Print / Save Reference Sheet</span>
          </button>
          <button class="btn btn-outline" onclick="app.goToSlide(1)" aria-label="Restart presentation from slide 1">
            <span>⏮️ Return to Beginning</span>
          </button>
        </div>
      </div>
    `,
    notes: "Final summary reference map for exams and interview revision."
  }
];

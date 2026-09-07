# ?? Stack & Queue: The Logic Behind ""Who Comes First?""
### An Interactive, Classroom-First Data Structures Presentation & Visual Lab

> **A labor of love and deep pedagogical dedication:**  
> This interactive presentation was crafted with immense effort to turn abstract computer science concepts into vivid, intuitive, and tactile mental models for students in lectures, classrooms, and online learning environments. Instead of dry code-heavy slides, every concept is paired with real-world scenarios, interactive simulators, live memory conduits, and synthesized classroom audio effects.

---

## ?? Key Highlights & Innovations

- **30 Classroom-Ready Interactive Slides**: Full curriculum covering introductory intuition, LIFO vs. FIFO mental anchors, stack implementations, linear and circular queue models, operating system schedulers, game state stacks, compiler parenthesis parsers, and trace debugging.
- **Strict 16:9 Aspect Ratio**: Engineered to lock cleanly into standard 16:9 presentation dimensions on projectors, smartboards, and laptop displays without vertical scrollbars or awkward letterboxing.
- **Pure Zero-Dependency Architecture**: Built entirely with modern vanilla HTML5, CSS3, and ES6 JavaScript. No build tools, 
pm, Node.js, or complex bundlers required—simply open index.html in any web browser!

---

## ?? Interactive Simulators & Labs

1. **Stack Canister Visualizer (Slide 5)**:
   - Dynamic vertical canister with live `PUSH`, `POP`, and `PEEK` operations.
   - Real-time `TOP` pointer tracking and custom element insertion.
   - Built-in `Stack Overflow` and `Stack Underflow` boundary protection with audio buzzers.
2. **Animated Queue Conduit (Slide 13)**:
   - Horizontal pipeline with visible **`[?? EXIT (FRONT)]`** and **`[?? ENTRY (REAR)]`** portals.
   - Visible element index markers (`Index 0` to `Index 5`) and dynamic pointer tags (`? FRONT`, `? REAR`).
   - Smooth element shifting animations: elements slide out to the left on `DEQUEUE`, and new elements slide in from the right on `ENQUEUE`.
   - Real-time diagnostic dashboard displaying element size, pointer indices, and health status.
3. **Network Print Spooler Simulator (Slide 14)**:
   - Simulates OS background job queues.
   - Demonstrates chronological FIFO processing vs. urgent document preemption with a dedicated reset button.
4. **Emergency Room Priority Triage (Slide 16)**:
   - Demonstrates the necessity of Priority Queues over basic FIFO when urgency keys supersede arrival timestamps.
   - Includes priority sorting and reset controls.
5. **Circular Queue Modulo Ring Buffer (Slide 22)**:
   - Interactive 6-slot circular ring visualizer demonstrating `(rear + 1) % SIZE` and `(front + 1) % SIZE`.
   - Visually proves memory recycling without costly O(N) element shifts.
6. **Live Trace Debugger (Slide 26)**:
   - Step-by-step execution tracer allowing students to predict and verify stack state transitions.
7. **Parentheses Balance Validator (Slide 29)**:
   - Live compiler syntax verification algorithm testing arbitrary bracket expressions with immediate feedback.

---

## ?? Classroom Presentation Features

- **4 High-Contrast Presentation Themes**:
  - **Cyber Indigo (Dark)**: Modern, sleek dark mode with vibrant neon cyan and amber accents.
  - **Academic Light (Lecture)**: Specially harmonized for daytime classrooms and bright lecture hall projectors.
  - **Sunset Glow (Warm)**: High-contrast warm aesthetic.
  - **Matrix Neon (Laser)**: High-tech terminal aesthetic.
- **Classroom Laser Pointer (Press `L`)**:
  - Turns the cursor into a bright glowing red laser dot for pointing out items on projection screens.
- **Web Audio API Sound Engine (Press `M` to mute/unmute)**:
  - Procedurally synthesized audio tones (chimes for enqueue, pops for dequeue, sliding whooshes, error buzzers, and celebratory chimes)—no external audio files needed!
- **Clean / Zen View (Press `H`)**:
  - One-touch toggle to hide all header controls, instantly expanding the 16:9 stage to maximize projector screen real estate.
- **Presenter & Speaker Notes (Press `P`)**:
  - Built-in presenter script and pedagogical talking points for educators.
- **Slide Grid Overview (Press `O` or `Esc`)**:
  - Fast visual thumbnail navigation modal to jump directly to any slide.

---

## ?? Keyboard Shortcuts Reference

| Key | Action |
| :--- | :--- |
| `?` / `Space` / `PageDown` | Advance to next slide |
| `?` / `Backspace` / `PageUp` | Return to previous slide |
| `Home` / `End` | Jump to Slide 1 / Slide 30 |
| `H` | **Toggle Header Visibility (Zen Mode)** |
| `L` | **Toggle Classroom Laser Pointer** |
| `M` | **Toggle Audio Sound Effects** |
| `P` | **Open Presenter Notes** |
| `O` / `Esc` | **Open / Close Slide Overview Grid** |
| `F` | **Toggle Fullscreen Presentation** |

---

## ?? Repository Structure

`
+-- index.html          # Main HTML presentation shell & interactive controls
+-- css/
¦   +-- styles.css      # CSS design system (4 themes, 16:9 ratio, responsive layouts)
+-- js/
¦   +-- app.js          # Master presentation controller & keyboard/touch orchestrator
¦   +-- audio.js        # Web Audio API sound synthesis engine
¦   +-- slides.js       # Complete 30-slide curriculum & interactive simulators
+-- stack-queue.pptx    # PowerPoint companion deck
+-- README.md           # Documentation & teaching guide
`

---

## ?? Getting Started

1. Clone or download the repository:
   `ash
   git clone https://github.com/prasadkankhar10/stack_queue.git
   `
2. Simply double-click `index.html` to open it in any web browser (Chrome, Edge, Firefox, Safari).
3. Connect your laptop to your projector or smartboard, press **`F`** for fullscreen, **`H`** to hide the header, and begin teaching!

---

*Designed and crafted with passion to empower computer science educators and inspire students.*

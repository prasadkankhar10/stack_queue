# 🎓 Interactive Computer Science & Systems Presentations
### Classroom-First Visual Laboratories & Lecture Presentation Suites

> **A labor of love and deep pedagogical dedication:**  
> These interactive web presentations were crafted with immense effort to turn abstract computer science and engineering concepts into vivid, intuitive, and tactile mental models for students in lectures, classrooms, and online learning environments. Instead of dry code-heavy slides, every concept is paired with real-world scenarios, interactive simulators, live conduits, and synthesized classroom audio effects.

---

## 🚀 Available Presentation Suites

### 1. 🥽 VR Architecture: From Head Movement to Photons (`vr.html`)
An end-to-end interactive visual laboratory exploring how modern Virtual Reality systems transform physical human movement into photons in under 20 milliseconds.

- **18 Interactive Slides**:
  1. **VR Architecture**: The Immersive Illusion (Interactive 3D Room & Headset)
  2. **The Motion Pipeline**: 6-Step live data flow from mechanical movement to pixel light
  3. **VR System Architecture**: 5-layer system inspection (Human, Sensors, Engine, GPU, Optics)
  4. **Hardware Layer**: Interactive exploded component explorer (IMU, SLAM cameras, SoC, Panels, Pancake Optics, Spatial DSP)
  5. **Head-Coupled Display (HCD)**: 3-DOF vs. 6-DOF simulation with 3D perspective cube and motion parallax
  6. **Tracking Systems**: Inside-Out SLAM vs. Outside-In Lighthouse laser sweeping with occlusion simulation
  7. **VR Rendering Pipeline**: Step-by-step 9-stage pipeline with frustum culling and Asynchronous TimeWarp (ATW)
  8. **Stereo Rendering & IPD**: Left/Right binocular parallax and live IPD dial (55mm to 72mm)
  9. **Game Engine & Hardware**: Live CPU/GPU frame-time budget simulator (11.1ms @ 90Hz deadline)
  10. **Client-Server Architecture**: Distributed VR topology and latency paradox
  11. **Multiplayer VR Relay**: Live 3-player packet drop, ping, and dead reckoning emulator
  12. **Cluster Rendering**: Multi-GPU Master-Worker architecture, hardware FrameLock (Genlock), and DataLock
  13. **Cluster Rendering in Action**: 3-Screen panoramic CAVE simulator with asymmetric off-axis projection
  14. **Latency & Motion-to-Photon**: <20ms budget stack and live interactive 15ms vs. 75ms lag nausea simulator
  15. **The Complete VR Pipeline**: Grand synthesis map with animated real-time packet trace
  16. **Case Studies & Tradeoffs**: Mobile Standalone (Quest 3) vs. Tethered PC VR (Valve Index) vs. CAVE
  17. **Classroom Challenge**: 3-question interactive student quiz with instant feedback and audio
  18. **The Grand VR Mental Model**: Summary, 3 cardinal rules of VR, and presenter conclusion

---

### 2. 🥞 Stack & Queue: The Logic Behind "Who Comes First?" (`index.html`)
A visual, intuition-first data structures presentation exploring LIFO and FIFO pipelines.

- **30 Interactive Slides**:
  - Interactive Stack Canister (`PUSH`, `POP`, `PEEK`, Overflow/Underflow protection)
  - Animated Queue Conduit with visible `EXIT` and `ENTRY` portals
  - Network Print Spooler Simulator with FIFO priority
  - Emergency Room Priority Triage simulator
  - Circular Queue Modulo Ring Buffer visualizer (`(rear + 1) % SIZE`)
  - Live Trace Debugger for stack states
  - Compiler Parentheses Balance Validator algorithm

---

## 🎨 Classroom Presentation Features

- **Strict 16:9 Aspect Ratio**: Engineered to lock cleanly into standard 16:9 presentation dimensions on projectors, smartboards, and laptop displays without vertical scrollbars.
- **Pure Zero-Dependency Architecture**: Built entirely with modern vanilla HTML5, CSS3, and ES6 JavaScript. No build tools, npm, Node.js, or complex bundlers required—simply open `vr.html` or `index.html` in any web browser!
- **Classroom Laser Pointer (Press `L`)**: Turns the cursor into a bright glowing red laser dot for pointing out items on projection screens.
- **Web Audio API Sound Engine (Press `M` to mute/unmute)**: Procedurally synthesized audio tones (chimes, data packets, error buzzers, and clicks)—no external audio files needed!
- **Clean / Zen View (Press `H`)**: One-touch toggle to hide all header controls, instantly expanding the 16:9 stage to maximize projector screen real estate.
- **Presenter & Speaker Notes (Press `P`)**: Built-in presenter script and pedagogical talking points for educators.
- **Slide Grid Overview (Press `O` or `Esc`)**: Fast visual thumbnail navigation modal to jump directly to any slide.
- **Fullscreen Mode (Press `F`)**: Seamless distraction-free lecture presentation.

---

## ⌨️ Keyboard Shortcuts Reference

| Key | Action |
| :--- | :--- |
| `→` / `Space` / `PageDown` | Advance to next slide |
| `←` / `Backspace` / `PageUp` | Return to previous slide |
| `Home` / `End` | Jump to Slide 1 / Final Slide |
| `H` | **Toggle Header Visibility (Zen Mode)** |
| `L` | **Toggle Classroom Laser Pointer** |
| `M` | **Toggle Audio Sound Effects** |
| `P` | **Open Presenter Notes** |
| `O` / `Esc` | **Open / Close Slide Overview Grid** |
| `F` | **Toggle Fullscreen Presentation** |

---

## 📁 Repository Structure

```text
├── vr.html             # VR Architecture Presentation (18 slides)
├── index.html          # Stack & Queue Data Structures Presentation (30 slides)
├── css/
│   ├── vr.css          # Futuristic dark theme & 3D CSS perspective rooms
│   └── styles.css      # Data structures CSS design system (4 lecture themes)
├── js/
│   ├── vr-app.js       # VR presentation controller & shortcut manager
│   ├── vr-audio.js     # Synthesized audio effects engine
│   ├── vr-slides.js    # All 18 interactive VR slides and simulators
│   ├── app.js          # Stack/Queue presentation controller
│   ├── audio.js        # Stack/Queue audio synthesizer
│   └── slides.js       # Stack/Queue 30-slide curriculum
├── stack-queue.pptx    # PowerPoint companion deck
└── README.md           # Documentation & teaching guide
```

---

## 🏁 Getting Started

1. Clone or download the repository:
   ```bash
   git clone https://github.com/prasadkankhar10/stack_queue.git
   ```
2. Double-click **`vr.html`** or **`index.html`** to open in any web browser.
3. Connect your laptop to your classroom projector or smartboard, press **`F`** for fullscreen, **`H`** to hide the header, and begin teaching!

---

*Designed and crafted with passion to empower computer science educators and inspire students.*

/**
 * VR Architecture: From Head Movement to Photons
 * Comprehensive 18-Slide Interactive Curriculum
 */

window.vrSlidesData = [
  // ==========================================
  // SLIDE 1: HOOK / INTRODUCTION
  // ==========================================
  {
    id: 'slide-1',
    part: 'Introduction',
    partNumber: 'PART 1',
    title: 'VR Architecture: The Immersive Illusion',
    subtitle: 'Transforming Physical Human Movement into Photons Under 20 Milliseconds',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">THE CORE CHALLENGE</span>
            <h3 style="color: var(--neon-cyan); margin-bottom: 0.75rem; font-size: 1.25rem;">
              How Do We Fool the Human Brain?
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.6; margin-bottom: 1rem; font-size: 0.95rem;">
              When you turn your head in the real world, your eyes and vestibular (inner-ear) system detect motion instantly.
              In Virtual Reality, a computational pipeline must detect that motion, update a 3D simulation, render two distinct perspectives, and beam photons onto your retinas—all in <b>less than 20 milliseconds</b>.
            </p>
            <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: var(--radius-sm); padding: 0.85rem; margin-bottom: 1rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <span style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">MOTION-TO-PHOTON BUDGET</span>
                <span style="font-family: var(--font-mono); color: var(--neon-green); font-weight: 700; font-size: 0.85rem;">&lt; 20ms THRESHOLD</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div style="width: 75%; height: 100%; background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan));"></div>
              </div>
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-top: 0.4rem;">
                Exceeding 20ms breaks immersion and induces severe simulator sickness.
              </div>
            </div>

            <div class="control-panel" style="margin-top: 0.5rem;">
              <div class="control-row">
                <span class="control-label">Head Yaw Angle:</span>
                <input type="range" class="cyber-slider" id="s1-yaw-slider" min="-90" max="90" value="0">
                <span class="telemetry-value" id="s1-yaw-val">0°</span>
              </div>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                <button class="cyber-btn" id="s1-packet-btn" style="flex: 1;">
                  <span>⚡ Fire Motion Packet</span>
                </button>
                <button class="cyber-btn secondary" id="s1-reset-btn">
                  <span>Reset</span>
                </button>
              </div>
            </div>
          </div>

          <div class="content-card" style="display: flex; flex-direction: column; align-items: center; justify-content: center;">
            <span class="card-badge">VIRTUAL HEADSET SIMULATOR</span>
            <div class="room-3d" id="s1-room" style="width: 100%; height: 260px; margin: 1rem 0;">
              <div class="grid-floor"></div>
              <!-- Virtual Avatar Headset Box -->
              <div class="vr-headset-box" id="s1-headset" style="transform: translate(-50%, -50%) rotateY(0deg);">
                <div class="face front">🥽 DISPLAY PANEL</div>
                <div class="face back">HEAD STRAP</div>
                <div class="face right">AUDIO R</div>
                <div class="face left">AUDIO L</div>
                <div class="face top">IMU SENSORS</div>
                <div class="face bottom">IPD DIAL</div>
              </div>
            </div>
            <div id="s1-status" style="font-size: 0.82rem; font-family: var(--font-mono); color: var(--neon-cyan); text-align: center;">
              Virtual Eye Pose: Yaw 0.0° | Latency: 11.2ms (Nominal)
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const slider = document.getElementById('s1-yaw-slider');
      const valText = document.getElementById('s1-yaw-val');
      const headset = document.getElementById('s1-headset');
      const status = document.getElementById('s1-status');
      const packetBtn = document.getElementById('s1-packet-btn');
      const resetBtn = document.getElementById('s1-reset-btn');

      if (!slider) return;

      slider.addEventListener('input', (e) => {
        const val = e.target.value;
        valText.textContent = `${val > 0 ? '+' : ''}${val}°`;
        headset.style.transform = `translate(-50%, -50%) rotateY(${val}deg)`;
        status.innerHTML = `Virtual Eye Pose: Yaw ${val}° | IMU Rate: 1000Hz | Latency: 11.2ms`;
        if (window.vrAudio) window.vrAudio.playClick(300 + Math.abs(val) * 5);
      });

      packetBtn.addEventListener('click', () => {
        if (window.vrAudio) window.vrAudio.playDataPacket();
        status.innerHTML = `<span style="color: var(--neon-green)">⚡ Tracking Packet Routed → Engine Tick → Dual Draw Call → Display! (12.4ms)</span>`;
        headset.style.boxShadow = '0 0 35px var(--neon-cyan)';
        setTimeout(() => {
          headset.style.boxShadow = 'none';
        }, 600);
      });

      resetBtn.addEventListener('click', () => {
        slider.value = 0;
        valText.textContent = '0°';
        headset.style.transform = 'translate(-50%, -50%) rotateY(0deg)';
        status.innerHTML = 'Virtual Eye Pose: Yaw 0.0° | Latency: 11.2ms (Nominal)';
        if (window.vrAudio) window.vrAudio.playClick(220);
      });
    },
    notes: `
      <b>Slide 1 Talking Points:</b>
      <ul>
        <li><b>Hook the class:</b> Ask: "When you turn your head in reality, why doesn't reality lag?" Explain that human vision combined with the inner-ear vestibular system operates with sub-microsecond latency.</li>
        <li><b>The 20ms Rule:</b> Introduce the golden metric of VR engineering: <i>Motion-to-Photon latency must stay strictly below 20 milliseconds</i>. Anything longer triggers simulator sickness.</li>
        <li><b>Interactive Element:</b> Drag the Yaw slider to rotate the 3D headset. Click "Fire Motion Packet" to demonstrate the sequential loop from motion detection to light hitting the eye.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 2: WHAT HAPPENS WHEN YOU MOVE YOUR HEAD?
  // ==========================================
  {
    id: 'slide-2',
    part: 'The Motion Pipeline',
    partNumber: 'PART 2',
    title: 'What Happens When You Move Your Head?',
    subtitle: 'The 6-Step Pipeline from Mechanical Movement to Light Emitted by Pixels',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
          <div class="content-card" style="padding: 0.75rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span class="card-badge">LIVE DATA-FLOW TRACER</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;">
                  Manipulate orientation to trace the live data-flow through all 6 architecture stages.
                </span>
              </div>
              <div style="display: flex; gap: 0.5rem;">
                <button class="cyber-btn small" id="s2-pulse-btn">⚡ Run Motion Cycle</button>
                <button class="cyber-btn secondary small" id="s2-reset-btn">Reset</button>
              </div>
            </div>
          </div>

          <!-- Pipeline Stages Grid -->
          <div class="pipeline-track" id="s2-pipeline">
            <div class="pipeline-step" data-step="1">
              <div class="step-num">01</div>
              <div class="step-title">IMU Sampling</div>
              <div class="step-desc">Gyroscope & Accelerometer sample angular velocity at 1000Hz.</div>
            </div>
            <div class="pipeline-step" data-step="2">
              <div class="step-num">02</div>
              <div class="step-title">Sensor Fusion</div>
              <div class="step-desc">Kalman filtering merges optical SLAM cameras with IMU data.</div>
            </div>
            <div class="pipeline-step" data-step="3">
              <div class="step-num">03</div>
              <div class="step-title">Engine Update</div>
              <div class="step-desc">Game engine updates player camera matrix & physics scene graph.</div>
            </div>
            <div class="pipeline-step" data-step="4">
              <div class="step-num">04</div>
              <div class="step-title">Stereo Render</div>
              <div class="step-desc">GPU draws dual viewports (Left & Right eyes) with parallax.</div>
            </div>
            <div class="pipeline-step" data-step="5">
              <div class="step-num">05</div>
              <div class="step-title">Warp & Scanout</div>
              <div class="step-desc">Asynchronous TimeWarp applies lens distortion & scans out OLED.</div>
            </div>
            <div class="pipeline-step" data-step="6">
              <div class="step-num">06</div>
              <div class="step-title">Retina Photons</div>
              <div class="step-desc">Light passes through Fresnel/Pancake lenses onto human retina.</div>
            </div>
          </div>

          <!-- Interactive Controls & Live Telemetry -->
          <div class="split-layout" style="flex: 1; min-height: 180px;">
            <div class="content-card" style="justify-content: center;">
              <span class="card-badge">ORIENTATION INPUTS</span>
              <div class="control-panel" style="margin-top: 0.5rem;">
                <div class="control-row">
                  <span class="control-label">Yaw (Pan):</span>
                  <input type="range" class="cyber-slider" id="s2-yaw" min="-60" max="60" value="0">
                  <span class="telemetry-value" id="s2-yaw-val">0°</span>
                </div>
                <div class="control-row">
                  <span class="control-label">Pitch (Tilt):</span>
                  <input type="range" class="cyber-slider" id="s2-pitch" min="-45" max="45" value="0">
                  <span class="telemetry-value" id="s2-pitch-val">0°</span>
                </div>
                <div class="control-row">
                  <span class="control-label">Roll (Cant):</span>
                  <input type="range" class="cyber-slider" id="s2-roll" min="-30" max="30" value="0">
                  <span class="telemetry-value" id="s2-roll-val">0°</span>
                </div>
              </div>
            </div>

            <div class="content-card" style="justify-content: center;">
              <span class="card-badge">POSE TELEMETRY MATRIX</span>
              <div class="telemetry-box" id="s2-telemetry" style="height: 110px; font-size: 0.78rem;">
                [IMU STREAM] Status: Active (1000 Hz)
Orientation Quat: Q(0.000, 0.000, 0.000, 1.000)
Camera View Matrix: Mat4x4 Identity
Target Frame Time: 11.11 ms @ 90Hz Refresh
Pipeline Latency: 13.8 ms (NOMINAL)
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const yaw = document.getElementById('s2-yaw');
      const pitch = document.getElementById('s2-pitch');
      const roll = document.getElementById('s2-roll');
      const yawVal = document.getElementById('s2-yaw-val');
      const pitchVal = document.getElementById('s2-pitch-val');
      const rollVal = document.getElementById('s2-roll-val');
      const telemetry = document.getElementById('s2-telemetry');
      const steps = document.querySelectorAll('#s2-pipeline .pipeline-step');
      const pulseBtn = document.getElementById('s2-pulse-btn');
      const resetBtn = document.getElementById('s2-reset-btn');

      function updatePose() {
        const y = parseFloat(yaw.value);
        const p = parseFloat(pitch.value);
        const r = parseFloat(roll.value);

        yawVal.textContent = `${y}°`;
        pitchVal.textContent = `${p}°`;
        rollVal.textContent = `${r}°`;

        // Calculate approximate quaternion representation
        const cy = Math.cos(y * Math.PI / 360);
        const sy = Math.sin(y * Math.PI / 360);
        const cp = Math.cos(p * Math.PI / 360);
        const sp = Math.sin(p * Math.PI / 360);
        const cr = Math.cos(r * Math.PI / 360);
        const sr = Math.sin(r * Math.PI / 360);

        const qw = (cr * cp * cy + sr * sp * sy).toFixed(3);
        const qx = (sr * cp * cy - cr * sp * sy).toFixed(3);
        const qy = (cr * sp * cy + sr * cp * sy).toFixed(3);
        const qz = (cr * cp * sy - sr * sp * cy).toFixed(3);

        telemetry.innerHTML = `[IMU STREAM] Status: Active (1000 Hz)
Orientation Quat: Q(${qx}, ${qy}, ${qz}, ${qw})
Euler Angles: Yaw=${y}°, Pitch=${p}°, Roll=${r}°
Calculated View Matrix: Mat4x4 Rotated
Current Motion Delta: ${Math.hypot(y, p, r).toFixed(1)}°
Pipeline Latency: ${(12.5 + Math.hypot(y, p, r) * 0.05).toFixed(1)} ms (NOMINAL)`;

        // Highlight step 1 & 2
        steps.forEach(s => s.classList.remove('active'));
        if (steps[0]) steps[0].classList.add('active');
        if (steps[1]) steps[1].classList.add('active');
        if (window.vrAudio) window.vrAudio.playClick(400);
      }

      [yaw, pitch, roll].forEach(input => {
        if (input) input.addEventListener('input', updatePose);
      });

      if (pulseBtn) {
        pulseBtn.addEventListener('click', () => {
          let stepIdx = 0;
          steps.forEach(s => s.classList.remove('active'));
          const interval = setInterval(() => {
            if (stepIdx < steps.length) {
              steps.forEach(s => s.classList.remove('active'));
              steps[stepIdx].classList.add('active');
              if (window.vrAudio) window.vrAudio.playTone(300 + stepIdx * 100, 0.12);
              stepIdx++;
            } else {
              clearInterval(interval);
              steps.forEach(s => s.classList.add('active'));
              if (window.vrAudio) window.vrAudio.playSuccess();
            }
          }, 200);
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          yaw.value = 0;
          pitch.value = 0;
          roll.value = 0;
          updatePose();
          steps.forEach(s => s.classList.remove('active'));
        });
      }
    },
    notes: `
      <b>Slide 2 Talking Points:</b>
      <ul>
        <li><b>Walk through the 6 stages:</b>
          1. <i>IMU Sampling</i> (fast, 1000Hz, prone to drift)
          2. <i>Sensor Fusion</i> (Kalman filter combines optical cameras with IMU)
          3. <i>Engine Update</i> (Unreal/Unity camera transform)
          4. <i>Stereo Render</i> (Dual cameras for left and right eyes)
          5. <i>Warp & Scanout</i> (Barrel/pincushion optical distortion correction + ATW)
          6. <i>Retina Photons</i> (Light focused by lenses).
        </li>
        <li><b>Key concept:</b> Note that the IMU operates at 1000Hz (every 1ms), while rendering runs at 90Hz (every 11.1ms). Show how fusion bridges this timing mismatch.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 3: VR SYSTEM ARCHITECTURE
  // ==========================================
  {
    id: 'slide-3',
    part: 'System Architecture',
    partNumber: 'PART 3',
    title: 'VR System Architecture: 5 Core Layers',
    subtitle: 'Click Each Layer to Inspect Its Architectural Responsibility & Latency Impact',
    render: function() {
      return `
        <div class="split-layout">
          <div style="display: flex; flex-direction: column; gap: 0.6rem;">
            <div class="content-card clickable-layer active" data-layer="1" style="cursor: pointer;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">1. Physical & Human Layer</div>
                <span class="card-badge">INPUT</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                Head kinematics, interpupillary distance (IPD), vestibular organs, hand controllers.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="2" style="cursor: pointer;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">2. Sensor & Tracking Layer</div>
                <span class="card-badge">FUSION</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                6-DOF IMU, SLAM infrared cameras, Kalman pose estimation algorithms.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="3" style="cursor: pointer;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">3. Runtime & Engine Layer</div>
                <span class="card-badge">COMPUTE</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                OpenXR / OVR runtime, scene graph, physics simulation, spatial audio engine.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="4" style="cursor: pointer;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">4. Graphics & Rendering Layer</div>
                <span class="card-badge">GPU</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                Stereo frustum rasterization, shader passes, Asynchronous TimeWarp (ATW).
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="5" style="cursor: pointer;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">5. Optical & Display Layer</div>
                <span class="card-badge">OUTPUT</span>
              </div>
              <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.25rem;">
                Fast-switch LCD/OLED panels, Fresnel or Pancake lenses, ocular eyebox.
              </div>
            </div>
          </div>

          <!-- Deep Inspector Panel -->
          <div class="content-card" id="s3-detail-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge" id="s3-detail-badge">LAYER 1 INSPECTOR</span>
              <h3 id="s3-detail-title" style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.25rem;">
                Physical & Human Layer
              </h3>
              <div id="s3-detail-body" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
                The human user is both the primary input and ultimate output of the VR system.
                The vestibular system inside the inner ear senses linear and angular acceleration. If visual motion lags physical head motion by >20ms, the brain perceives a biological poison hallucination and induces nausea (simulator sickness).
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-color); margin-top: 1rem;">
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem;">LAYER TELEMETRY & SPECIFICATIONS:</div>
              <div id="s3-detail-specs" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-green);">
                • Human IPD Range: 55mm - 72mm<br>
                • Vestibular Latency: &lt; 5ms direct biological response<br>
                • Field of View (FOV): ~200° horizontal (human), ~110° (modern HMD)
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const layers = document.querySelectorAll('.clickable-layer');
      const title = document.getElementById('s3-detail-title');
      const badge = document.getElementById('s3-detail-badge');
      const body = document.getElementById('s3-detail-body');
      const specs = document.getElementById('s3-detail-specs');

      const data = {
        '1': {
          title: 'Physical & Human Layer',
          badge: 'LAYER 1 INSPECTOR',
          body: 'The human user is both the primary input and ultimate output of the VR system. The vestibular system inside the inner ear senses linear and angular acceleration. If visual motion lags physical head motion by >20ms, the brain perceives a biological poison hallucination and induces nausea (simulator sickness).',
          specs: '• Human IPD Range: 55mm - 72mm\n• Vestibular Latency: < 5ms direct biological response\n• Field of View (FOV): ~200° horizontal (human), ~110° (modern HMD)'
        },
        '2': {
          title: 'Sensor & Tracking Layer',
          badge: 'LAYER 2 INSPECTOR',
          body: 'Consists of MEMS gyroscopes and accelerometers operating at 1000Hz, coupled with 4+ ultra-wide angle tracking cameras running at 60-120Hz. Sensor fusion (Extended Kalman Filtering) computes pose with sub-millimeter precision and low jitter.',
          specs: '• Sampling Frequency: 1000 Hz (IMU) / 60-120 Hz (Cameras)\n• Degrees of Freedom: 6-DOF (X, Y, Z + Yaw, Pitch, Roll)\n• Tracking Latency: ~1.5 - 2.5 ms'
        },
        '3': {
          title: 'Runtime & Engine Layer',
          badge: 'LAYER 3 INSPECTOR',
          body: 'Industry standards like OpenXR decouple application code (Unreal, Unity, Godot) from hardware drivers. The engine evaluates collision physics, animates avatars, manages spatial 3D audio HRTFs, and issues draw calls to graphics APIs (Vulkan, DirectX 12).',
          specs: '• Runtime API: OpenXR / WebXR / OVRPlugin\n• Frame Budget: 11.11ms (at 90Hz) or 8.33ms (at 120Hz)\n• Engine CPU Work: 3 - 4 ms per frame'
        },
        '4': {
          title: 'Graphics & Rendering Layer',
          badge: 'LAYER 4 INSPECTOR',
          body: 'The GPU renders two separate camera frustums (Left Eye & Right Eye). Prior to scanout, Asynchronous TimeWarp (ATW) re-projects the image using the very latest IMU pose, guaranteeing a smooth horizon even if the main frame drops.',
          specs: '• Resolution: 2064 x 2208 per eye (e.g. Meta Quest 3)\n• GPU Workload: ~6 - 8 ms render pass\n• Post-Process: Barrel Distortion + Chromatic Aberration Correction'
        },
        '5': {
          title: 'Optical & Display Layer',
          badge: 'LAYER 5 INSPECTOR',
          body: 'Dual high-pixel-density fast-switch LCD or Micro-OLED displays emit light. Pancake lenses fold light multiple times through polarization, reducing headset bulk while maintaining edge-to-edge optical clarity across the eyebox.',
          specs: '• Display Refresh: 90Hz / 120Hz Fast-Switch LCD / Micro-OLED\n• Pixel Density: > 1200 PPI (Pixels Per Inch)\n• Optics: Folded Pancake Lens / Multi-element Fresnel'
        }
      };

      layers.forEach(layer => {
        layer.addEventListener('click', () => {
          layers.forEach(l => l.classList.remove('active'));
          layer.classList.add('active');
          const id = layer.getAttribute('data-layer');
          if (data[id]) {
            title.textContent = data[id].title;
            badge.textContent = data[id].badge;
            body.textContent = data[id].body;
            specs.innerHTML = data[id].specs.replace(/\n/g, '<br>');
            if (window.vrAudio) window.vrAudio.playClick(450);
          }
        });
      });
    },
    notes: `
      <b>Slide 3 Talking Points:</b>
      <ul>
        <li><b>Architectural Overview:</b> Point out that VR is a closed feedback loop across 5 distinct engineering layers: Human Anatomy &rarr; Physics/Sensors &rarr; OS/Runtime &rarr; GPU Silicon &rarr; Optical Physics.</li>
        <li><b>Interactivity:</b> Click through each layer to inspect its individual budget. Emphasize that a bottleneck in <i>any single layer</i> causes the entire system to stutter.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 4: HARDWARE LAYER EXPLORER
  // ==========================================
  {
    id: 'slide-4',
    part: 'Hardware Systems',
    partNumber: 'PART 4',
    title: 'The VR Hardware Layer: Inside the Headset',
    subtitle: 'Explore the Critical Silicon, Sensors, Optics, and Silicon Packaging in Modern HMDs',
    render: function() {
      return `
        <div class="split-layout">
          <!-- Clickable Hardware Component Cards -->
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem;">
            <div class="content-card hw-card active" data-hw="imu" style="cursor: pointer; padding: 0.75rem;">
              <div style="font-size: 1.25rem;">🧭</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">MEMS IMU</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">1000Hz Gyro & Accelerometer</div>
            </div>

            <div class="content-card hw-card" data-hw="cameras" style="cursor: pointer; padding: 0.75rem;">
              <div style="font-size: 1.25rem;">📷</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">Optical Cameras</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">4x Global Shutter Infrared</div>
            </div>

            <div class="content-card hw-card" data-hw="soc" style="cursor: pointer; padding: 0.75rem;">
              <div style="font-size: 1.25rem;">⚡</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">Compute SoC / GPU</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Snapdragon XR2 / Desktop GPU</div>
            </div>

            <div class="content-card hw-card" data-hw="display" style="cursor: pointer; padding: 0.75rem;">
              <div style="font-size: 1.25rem;">🖥️</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">Display Panels</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Fast-Switch LCD / OLED @ 120Hz</div>
            </div>

            <div class="content-card hw-card" data-hw="optics" style="cursor: pointer; padding: 0.75rem;">
              <div style="font-size: 1.25rem;">🔍</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">Pancake Optics</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">Polarized Folded Light Path</div>
            </div>

            <div class="content-card hw-card" data-hw="audio" style="cursor: pointer; padding: 0.75rem;">
              <div style="font-size: 1.25rem;">🎧</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">Spatial Audio DSP</div>
              <div style="font-size: 0.75rem; color: var(--text-secondary);">HRTF 3D Binaural Sound Engine</div>
            </div>
          </div>

          <!-- Component Details Display -->
          <div class="content-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge" id="s4-badge">HARDWARE SPECIFICATION</span>
              <h3 id="s4-title" style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.25rem;">
                MEMS Inertial Measurement Unit (IMU)
              </h3>
              <div id="s4-desc" style="color: var(--text-secondary); font-size: 0.9rem; line-height: 1.6;">
                The IMU integrates a 3-axis angular rate sensor (gyroscope) and a 3-axis linear acceleration sensor.
                Operating at ultra-high frequency (1000Hz, 1 millisecond intervals), it delivers instantaneous orientation updates before camera-based computer vision can even complete a single image frame.
              </div>
            </div>

            <div style="background: rgba(0, 0, 0, 0.4); border-radius: var(--radius-sm); padding: 0.85rem; border: 1px solid var(--border-color);">
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem;">ENGINEERING CHARACTERISTICS:</div>
              <div id="s4-telemetry" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); line-height: 1.5;">
                • Latency: &lt; 1 ms per sample<br>
                • Drift Rate: ~1° to 3° per minute without optical correction<br>
                • Protocol: High-speed SPI / I2C bus directly into real-time DSP
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const cards = document.querySelectorAll('.hw-card');
      const title = document.getElementById('s4-title');
      const badge = document.getElementById('s4-badge');
      const desc = document.getElementById('s4-desc');
      const telemetry = document.getElementById('s4-telemetry');

      const data = {
        'imu': {
          title: 'MEMS Inertial Measurement Unit (IMU)',
          badge: 'SENSORS // 1000HZ',
          desc: 'The IMU integrates a 3-axis angular rate sensor (gyroscope) and a 3-axis linear acceleration sensor. Operating at 1000Hz (1 millisecond intervals), it delivers instantaneous orientation updates before camera-based computer vision can even complete a single image frame.',
          telemetry: '• Latency: < 1 ms per sample\n• Drift Rate: ~1° to 3° per minute without optical correction\n• Protocol: High-speed SPI / I2C bus directly into real-time DSP'
        },
        'cameras': {
          title: 'Optical Tracking & Pass-Through Cameras',
          badge: 'VISION // 4X INFRARED',
          desc: 'Four or more global-shutter monochrome cameras placed around the chassis. They detect environmental high-contrast feature points (corners, edges) to calculate position (SLAM) and track hand controllers with embedded IR LEDs.',
          telemetry: '• Shutter: Global Shutter (Zero rolling distortion)\n• Frame Rate: 60 - 120 FPS\n• Processing: Computer Vision Co-Processor / NPU'
        },
        'soc': {
          title: 'Compute SoC & Thermal Architecture',
          badge: 'PROCESSING // SILICON',
          desc: 'Modern standalone VR headsets use dedicated spatial computing chips (e.g., Snapdragon XR2 Gen 2). Dedicated hardware blocks handle optical reprojection, video decompression, and AI sensor fusion, strictly constrained within a 5-8 Watt thermal envelope.',
          telemetry: '• Architecture: Heterogeneous CPU + Adreno GPU + NPU\n• Thermal Limit: 5W - 8W (fan-cooled chassis)\n• Memory Bus: 128-bit LPDDR5 (>64 GB/s bandwidth)'
        },
        'display': {
          title: 'Fast-Switch LCD & Micro-OLED Displays',
          badge: 'PHOTONICS // 120HZ',
          desc: 'Traditional phone screens exhibit pixel response times of 10-15ms, causing unbearable motion blur. VR uses customized fast-switch liquid crystal panels (sub-millisecond gray-to-gray) with low-persistence strobed backlights, illuminating only 10% of each frame cycle.',
          telemetry: '• Pixel Persistence: < 1.0 ms strobed illumination\n• Refresh Rates: 72Hz, 90Hz, 120Hz\n• Resolution: Up to 4K x 4K per eye in high-end headsets'
        },
        'optics': {
          title: 'Pancake Optical Lenses (Folded Optics)',
          badge: 'OPTICS // POLARIZED',
          desc: 'Replaces bulky Fresnel lenses. Uses polarizing beam splitters and quarter-wave plates to bounce light back and forth between optical surfaces. This cuts the optical path length in half, drastically reducing headset depth and front-heavy weight.',
          telemetry: '• Weight Reduction: ~40% thinner optical stack\n• Optical Efficiency: ~15-25% (requires high-luminance displays)\n• Glare & God-Rays: Drastically reduced compared to Fresnel'
        },
        'audio': {
          title: 'Spatial Audio DSP & Microphone Array',
          badge: 'ACOUSTICS // 3D HRTF',
          desc: 'Calculates Head-Related Transfer Functions (HRTF) in real time. Simulates ear-pinna acoustic delays, interaural time differences (ITD), and interaural level differences (ILD) so sounds are perceived naturally at precise 3D points in space.',
          telemetry: '• Latency: < 10 ms audio pipeline\n• Filters: Real-time Convolutions & Room Reverberation\n• Speaker Type: Near-ear off-ear acoustic transducers'
        }
      };

      cards.forEach(card => {
        card.addEventListener('click', () => {
          cards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const hw = card.getAttribute('data-hw');
          if (data[hw]) {
            title.textContent = data[hw].title;
            badge.textContent = data[hw].badge;
            desc.textContent = data[hw].desc;
            telemetry.innerHTML = data[hw].telemetry.replace(/\n/g, '<br>');
            if (window.vrAudio) window.vrAudio.playClick(500);
          }
        });
      });
    },
    notes: `
      <b>Slide 4 Talking Points:</b>
      <ul>
        <li><b>Hardware Constraints:</b> Contrast standalone headsets (constrained to 5-8 Watts on your face) with tethered PC headsets (unlimited power, 400W RTX GPU).</li>
        <li><b>The Low Persistence Trick:</b> Explain why your phone screen cannot be used in VR: standard displays stay illuminated continuously, smearing the image as your eyes rotate. VR displays use <i>strobing</i> (&lt;1ms pulse) to freeze the image on the retina.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 5: HEAD-COUPLED DISPLAY (HCD) & 6-DOF
  // ==========================================
  {
    id: 'slide-5',
    part: 'Tracking & Kinematics',
    partNumber: 'PART 5',
    title: 'Head-Coupled Display: 3-DOF vs 6-DOF',
    subtitle: 'Why Rotational Tracking Alone Causes Nausea, and How Translational Parallax Solves It',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">DEGREES OF FREEDOM</span>
            <div style="display: flex; gap: 0.5rem; margin: 0.5rem 0 1rem 0;">
              <button class="cyber-btn" id="s5-mode-6dof" style="flex: 1;">
                <span>6-DOF Mode (Full VR)</span>
              </button>
              <button class="cyber-btn secondary" id="s5-mode-3dof" style="flex: 1;">
                <span>3-DOF Mode (Mobile Cardboard)</span>
              </button>
            </div>

            <div class="control-panel">
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.8rem; margin-bottom: 0.35rem;">
                ROTATIONAL CHANNELS (3-DOF):
              </div>
              <div class="control-row">
                <span class="control-label">Yaw (Y-Rot):</span>
                <input type="range" class="cyber-slider" id="s5-yaw" min="-45" max="45" value="0">
                <span class="telemetry-value" id="s5-yaw-val">0°</span>
              </div>
              <div class="control-row">
                <span class="control-label">Pitch (X-Rot):</span>
                <input type="range" class="cyber-slider" id="s5-pitch" min="-30" max="30" value="0">
                <span class="telemetry-value" id="s5-pitch-val">0°</span>
              </div>

              <div style="font-weight: 700; color: var(--neon-purple); font-size: 0.8rem; margin: 0.75rem 0 0.35rem 0;">
                TRANSLATIONAL CHANNELS (6-DOF ONLY):
              </div>
              <div class="control-row">
                <span class="control-label">Position X (Lateral):</span>
                <input type="range" class="cyber-slider" id="s5-posx" min="-50" max="50" value="0">
                <span class="telemetry-value" id="s5-posx-val">0mm</span>
              </div>
              <div class="control-row">
                <span class="control-label">Position Z (Surge):</span>
                <input type="range" class="cyber-slider" id="s5-posz" min="-50" max="50" value="0">
                <span class="telemetry-value" id="s5-posz-val">0mm</span>
              </div>
            </div>

            <div id="s5-warning" style="margin-top: 0.75rem; font-size: 0.8rem; color: var(--neon-green); font-family: var(--font-mono);">
              ✓ 6-DOF Active: Head translation creates natural motion parallax.
            </div>
          </div>

          <!-- 3D Perspective Viewport -->
          <div class="content-card" style="align-items: center; justify-content: center;">
            <span class="card-badge">HEAD-COUPLED 3D PERSPECTIVE CUBE</span>
            <div class="room-3d" style="width: 100%; height: 260px; margin: 0.75rem 0;">
              <div class="grid-floor"></div>
              <div class="target-cube" id="s5-cube" style="transform: translate(-50%, -50%) translate3d(0px, 0px, -60px) rotateX(0deg) rotateY(0deg);">
                <div class="cube-face front">VIRTUAL OBJECT</div>
                <div class="cube-face back">BACK</div>
                <div class="cube-face right">RIGHT</div>
                <div class="cube-face left">LEFT</div>
                <div class="cube-face top">TOP</div>
                <div class="cube-face bottom">FLOOR</div>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
              Notice how moving translationally reveals occluded sides of the 3D cube.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      let is6DOF = true;
      const btn6 = document.getElementById('s5-mode-6dof');
      const btn3 = document.getElementById('s5-mode-3dof');
      const yaw = document.getElementById('s5-yaw');
      const pitch = document.getElementById('s5-pitch');
      const posX = document.getElementById('s5-posx');
      const posZ = document.getElementById('s5-posz');
      const yawVal = document.getElementById('s5-yaw-val');
      const pitchVal = document.getElementById('s5-pitch-val');
      const posXVal = document.getElementById('s5-posx-val');
      const posZVal = document.getElementById('s5-posz-val');
      const warning = document.getElementById('s5-warning');
      const cube = document.getElementById('s5-cube');

      function updateCube() {
        const y = parseFloat(yaw.value);
        const p = parseFloat(pitch.value);
        let x = parseFloat(posX.value);
        let z = parseFloat(posZ.value);

        yawVal.textContent = `${y}°`;
        pitchVal.textContent = `${p}°`;

        if (!is6DOF) {
          x = 0;
          z = 0;
          posXVal.textContent = 'LOCKED (0mm)';
          posZVal.textContent = 'LOCKED (0mm)';
          warning.innerHTML = `<span style="color: var(--neon-red);">⚠️ 3-DOF LIMITATION: Neck translation ignored! Inner ear signals motion but image does not translate &rarr; Severe Nausea!</span>`;
        } else {
          posXVal.textContent = `${x}mm`;
          posZVal.textContent = `${z}mm`;
          warning.innerHTML = `<span style="color: var(--neon-green);">✓ 6-DOF Active: Full motion parallax matches inner-ear vestibular acceleration.</span>`;
        }

        cube.style.transform = `translate(-50%, -50%) translate3d(${x * 1.5}px, 0px, ${-60 + z * 1.5}px) rotateX(${-p}deg) rotateY(${-y}deg)`;
        if (window.vrAudio) window.vrAudio.playClick(320);
      }

      [yaw, pitch, posX, posZ].forEach(el => {
        if (el) el.addEventListener('input', updateCube);
      });

      btn6.addEventListener('click', () => {
        is6DOF = true;
        btn6.className = 'cyber-btn';
        btn3.className = 'cyber-btn secondary';
        posX.disabled = false;
        posZ.disabled = false;
        updateCube();
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btn3.addEventListener('click', () => {
        is6DOF = false;
        btn3.className = 'cyber-btn';
        btn6.className = 'cyber-btn secondary';
        posX.disabled = true;
        posZ.disabled = true;
        updateCube();
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 5 Talking Points:</b>
      <ul>
        <li><b>3-DOF vs 6-DOF:</b> Explain the 3 degrees of rotation (Pitch, Yaw, Roll) vs the 3 degrees of translation (X=Surge, Y=Heave, Z=Sway).</li>
        <li><b>The Failure of Google Cardboard:</b> Why did early phone VR fail? Because when a user leans forward, their neck naturally translates. If the software only detects rotation, the virtual world moves <i>with</i> the user rather than staying fixed, triggering vestibular mismatch.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 6: TRACKING SYSTEMS (INSIDE-OUT VS OUTSIDE-IN)
  // ==========================================
  {
    id: 'slide-6',
    part: 'Tracking & Kinematics',
    partNumber: 'PART 6',
    title: 'Tracking Systems: Inside-Out vs Outside-In',
    subtitle: 'SLAM Computer Vision versus Infrared Lighthouse Laser Sweeping',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 1rem; height: 100%;">
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="cyber-btn" id="s6-mode-inside" style="width: 240px;">
              <span>Inside-Out (SLAM)</span>
            </button>
            <button class="cyber-btn secondary" id="s6-mode-outside" style="width: 240px;">
              <span>Outside-In (Lighthouse)</span>
            </button>
            <button class="cyber-btn secondary" id="s6-occlude-btn" style="width: 200px;">
              <span>Simulate Occlusion</span>
            </button>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- Visual Tracking Canvas -->
            <div class="content-card" style="position: relative; overflow: hidden; justify-content: center; align-items: center;">
              <span class="card-badge" id="s6-canvas-badge">INSIDE-OUT (COMPUTER VISION SLAM)</span>

              <div id="s6-stage-inside" style="width: 100%; height: 240px; position: relative; border: 1px dashed rgba(0, 229, 255, 0.2); border-radius: var(--radius-sm); background: radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 70%);">
                <!-- Headset with emitted rays -->
                <div id="s6-hmd-node" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70px; height: 35px; background: var(--bg-card-hover); border: 2px solid var(--neon-cyan); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: var(--neon-cyan); box-shadow: 0 0 15px rgba(0,229,255,0.3); z-index: 5;">
                  HMD SLAM
                </div>
                <!-- Feature Points in room -->
                <div class="s6-dot" style="position: absolute; top: 25px; left: 40px;">◆ Corner A</div>
                <div class="s6-dot" style="position: absolute; top: 30px; right: 50px;">◆ Lamp B</div>
                <div class="s6-dot" style="position: absolute; bottom: 35px; left: 80px;">◆ Table Edge</div>
                <div class="s6-dot" style="position: absolute; bottom: 40px; right: 90px;">◆ Door Frame</div>
              </div>

              <div id="s6-stage-outside" style="display: none; width: 100%; height: 240px; position: relative; border: 1px dashed rgba(139, 92, 246, 0.3); border-radius: var(--radius-sm); background: radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%);">
                <!-- Base stations in corners -->
                <div style="position: absolute; top: 15px; left: 15px; background: rgba(139, 92, 246, 0.2); border: 1px solid var(--neon-purple); padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.7rem; color: var(--neon-purple); font-weight: 700;">
                  📡 Base Station 1
                </div>
                <div style="position: absolute; bottom: 15px; right: 15px; background: rgba(139, 92, 246, 0.2); border: 1px solid var(--neon-purple); padding: 0.3rem 0.5rem; border-radius: 4px; font-size: 0.7rem; color: var(--neon-purple); font-weight: 700;">
                  📡 Base Station 2
                </div>
                <div id="s6-hmd-outside" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); width: 70px; height: 35px; background: var(--bg-card-hover); border: 2px solid var(--neon-purple); border-radius: 6px; display: flex; align-items: center; justify-content: center; font-size: 0.75rem; font-weight: 700; color: var(--neon-purple); box-shadow: 0 0 15px rgba(139,92,246,0.3);">
                  PHOTODIODE
                </div>
              </div>
            </div>

            <!-- Tradeoff Comparison Matrix -->
            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge">ENGINEERING COMPARISON</span>
                <h3 id="s6-tech-title" style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
                  Inside-Out SLAM Tracking
                </h3>
                <div id="s6-tech-desc" style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6;">
                  Used in Meta Quest 3, Apple Vision Pro, Valve Index (cameras). Cameras mounted on the headset continuously extract 2D feature points from the environment, matching them across frames to compute the camera pose matrix in real-time.
                </div>
              </div>

              <div class="telemetry-box" id="s6-telemetry" style="height: 120px; font-size: 0.8rem;">
[TRACKING TELEMETRY]
• Architecture: Inside-Out Monocular/Stereo SLAM
• External Sensors Required: ZERO (Standalone mobility)
• Controller Occlusion: Possible behind the back
• Accuracy: ~1.0mm positional jitter
• Latency: ~2.5ms processing overhead
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const btnIn = document.getElementById('s6-mode-inside');
      const btnOut = document.getElementById('s6-mode-outside');
      const btnOcc = document.getElementById('s6-occlude-btn');
      const stageIn = document.getElementById('s6-stage-inside');
      const stageOut = document.getElementById('s6-stage-outside');
      const badge = document.getElementById('s6-canvas-badge');
      const title = document.getElementById('s6-tech-title');
      const desc = document.getElementById('s6-tech-desc');
      const telem = document.getElementById('s6-telemetry');
      let currentMode = 'inside';

      btnIn.addEventListener('click', () => {
        currentMode = 'inside';
        btnIn.className = 'cyber-btn';
        btnOut.className = 'cyber-btn secondary';
        stageIn.style.display = 'block';
        stageOut.style.display = 'none';
        badge.textContent = 'INSIDE-OUT (COMPUTER VISION SLAM)';
        title.textContent = 'Inside-Out SLAM Tracking';
        desc.textContent = 'Cameras mounted on the headset continuously extract 2D feature points from the room, matching them across frames to triangulate 3D position. No external sensors required.';
        telem.innerHTML = `[TRACKING TELEMETRY]
• Architecture: Inside-Out Monocular/Stereo SLAM
• External Sensors Required: ZERO (Standalone mobility)
• Controller Occlusion: Possible behind the back
• Accuracy: ~1.0mm positional jitter
• Latency: ~2.5ms processing overhead`;
        if (window.vrAudio) window.vrAudio.playClick(400);
      });

      btnOut.addEventListener('click', () => {
        currentMode = 'outside';
        btnOut.className = 'cyber-btn';
        btnIn.className = 'cyber-btn secondary';
        stageIn.style.display = 'none';
        stageOut.style.display = 'block';
        badge.textContent = 'OUTSIDE-IN (STEAMVR LIGHTHOUSE)';
        title.textContent = 'Outside-In Lighthouse Laser Sweeping';
        desc.textContent = 'Used in Valve Index and HTC Vive. Fixed base stations emit horizontal and vertical infrared laser sweeps across the room. Photodiodes on the headset measure the precise time of impact to calculate sub-millimeter angles.';
        telem.innerHTML = `[TRACKING TELEMETRY]
• Architecture: Outside-In Laser Time-of-Flight
• External Sensors Required: 2 to 4 Base Stations
• Controller Occlusion: Almost None (Line-of-sight from corners)
• Accuracy: Sub-millimeter (< 0.1mm jitter)
• Latency: < 1.0ms hardware photodiode timing`;
        if (window.vrAudio) window.vrAudio.playClick(520);
      });

      btnOcc.addEventListener('click', () => {
        if (currentMode === 'inside') {
          telem.innerHTML = `<span style="color: var(--neon-red);">[OCCLUSION ALERT] Hands placed behind back!\n• Optical cameras lost sight of controller!\n• Falling back to IMU dead reckoning (drift will occur in 500ms)...</span>`;
          if (window.vrAudio) window.vrAudio.playBuzz();
        } else {
          telem.innerHTML = `<span style="color: var(--neon-green);">[OCCLUSION RESISTANT] Dual base stations maintain line-of-sight!\n• Optical beams received by rear sensor photodiodes.\n• Zero tracking loss.</span>`;
          if (window.vrAudio) window.vrAudio.playSuccess();
        }
      });
    },
    notes: `
      <b>Slide 6 Talking Points:</b>
      <ul>
        <li><b>The Fundamental Tradeoff:</b>
          <i>Inside-out:</i> Cheap, portable, runs anywhere, but suffers from controller occlusion when hands go behind your head.
          <i>Outside-in:</i> Gold-standard sub-millimeter tracking accuracy for eSports and research, but requires setting up base stations on room walls.
        </li>
        <li><b>Sensor Fusion Role:</b> Point out that when optical tracking is occluded, the IMU dead-reckons for ~500ms before drift becomes noticeable.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 7: VR RENDERING PIPELINE (9 STAGES)
  // ==========================================
  {
    id: 'slide-7',
    part: 'Rendering Pipeline',
    partNumber: 'PART 7',
    title: 'The VR Rendering Pipeline: 9 Stages',
    subtitle: 'From CPU Draw Calls to Asynchronous TimeWarp Reprojection',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%;">
          <!-- Controls Bar -->
          <div class="content-card" style="padding: 0.6rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; gap: 0.5rem; align-items: center;">
                <button class="cyber-btn small" id="s7-step-btn">▶ Step Next Stage</button>
                <button class="cyber-btn secondary small" id="s7-auto-btn">⚡ Auto Run</button>
                <button class="cyber-btn secondary small" id="s7-reset-btn">Reset</button>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Frustum Culling:</span>
                <button class="cyber-btn small" id="s7-cull-toggle" style="background: rgba(0, 229, 255, 0.2);">ON (-45% Draw Calls)</button>
              </div>
            </div>
          </div>

          <!-- 9 Stages Interactive Grid -->
          <div class="pipeline-track" id="s7-track" style="grid-template-columns: repeat(3, 1fr);">
            <div class="pipeline-step active" data-s7="1">
              <div class="step-num">01</div>
              <div class="step-title">App / Logic Tick</div>
              <div class="step-desc">Game rules, physics, and latest IMU pose are sampled.</div>
            </div>
            <div class="pipeline-step" data-s7="2">
              <div class="step-num">02</div>
              <div class="step-title">Dual Frustum Cull</div>
              <div class="step-desc">Discards geometry outside left and right eye FOVs.</div>
            </div>
            <div class="pipeline-step" data-s7="3">
              <div class="step-num">03</div>
              <div class="step-title">Draw Submission</div>
              <div class="step-desc">Driver dispatches stereo commands (Vulkan / DX12).</div>
            </div>
            <div class="pipeline-step" data-s7="4">
              <div class="step-num">04</div>
              <div class="step-title">Vertex Shading</div>
              <div class="step-desc">Transforms 3D vertices into clip-space coordinates.</div>
            </div>
            <div class="pipeline-step" data-s7="5">
              <div class="step-num">05</div>
              <div class="step-title">Rasterization</div>
              <div class="step-desc">Converts triangles into fragments for both eye targets.</div>
            </div>
            <div class="pipeline-step" data-s7="6">
              <div class="step-num">06</div>
              <div class="step-title">Fragment Shading</div>
              <div class="step-desc">Computes lighting, textures, reflections, and shadows.</div>
            </div>
            <div class="pipeline-step" data-s7="7">
              <div class="step-num">07</div>
              <div class="step-title">Lens Warp Correction</div>
              <div class="step-desc">Applies pre-distortion mesh to counteract lens distortion.</div>
            </div>
            <div class="pipeline-step" data-s7="8">
              <div class="step-num">08</div>
              <div class="step-title">Async TimeWarp (ATW)</div>
              <div class="step-desc">Reprojects image to latest head orientation before v-sync.</div>
            </div>
            <div class="pipeline-step" data-s7="9">
              <div class="step-num">09</div>
              <div class="step-title">Display Scanout</div>
              <div class="step-desc">Low-persistence strobed illumination onto physical pixels.</div>
            </div>
          </div>

          <!-- Stage Telemetry Detail -->
          <div class="content-card" style="padding: 0.8rem 1.2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="card-badge" id="s7-detail-badge">ACTIVE STAGE: 01 / 09</span>
                <span style="font-weight: 700; color: var(--neon-cyan); margin-left: 0.5rem;" id="s7-stage-title">App / Logic Tick</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-green);" id="s7-stage-time">
                Time Budget: 2.5 ms
              </div>
            </div>
            <div style="font-size: 0.85rem; color: var(--text-secondary); margin-top: 0.35rem;" id="s7-stage-expl">
              The CPU evaluates game scripts, physics collisions, and user inputs. It queries the VR runtime for the most recent predicted head pose for the upcoming target display time.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      let currentStage = 1;
      let timer = null;
      let cullingOn = true;
      const steps = document.querySelectorAll('#s7-track .pipeline-step');
      const stepBtn = document.getElementById('s7-step-btn');
      const autoBtn = document.getElementById('s7-auto-btn');
      const resetBtn = document.getElementById('s7-reset-btn');
      const cullToggle = document.getElementById('s7-cull-toggle');
      const title = document.getElementById('s7-stage-title');
      const badge = document.getElementById('s7-detail-badge');
      const time = document.getElementById('s7-stage-time');
      const expl = document.getElementById('s7-stage-expl');

      const stageInfo = [
        { title: 'App / Logic Tick', time: '2.5 ms (CPU)', desc: 'The CPU evaluates game scripts, physics collisions, and user inputs. It queries the VR runtime for the most recent predicted head pose for the upcoming target display time.' },
        { title: 'Dual Frustum Cull', time: '0.8 ms (CPU)', desc: 'Frustum culling checks the bounding boxes of objects against both Left and Right eye camera frustums. Only objects visible in at least one eye proceed down the pipeline.' },
        { title: 'Draw Submission', time: '1.2 ms (Driver)', desc: 'Graphics commands are recorded. Modern engines use Single Pass Stereo (Multiview) to submit geometry once and duplicate it across viewports via hardware instance IDs.' },
        { title: 'Vertex Shading', time: '1.5 ms (GPU)', desc: 'Vertex shaders transform 3D model vertices by Left and Right eye projection matrices, placing geometry into clip-space.' },
        { title: 'Rasterization', time: '1.0 ms (GPU Fixed Function)', desc: 'Fixed-function hardware determines which pixel fragments are covered by each triangle and sets up barycentric coordinates.' },
        { title: 'Fragment Shading', time: '4.2 ms (GPU Heavy)', desc: 'Calculates PBR lighting, albedo, normal maps, and specular highlights for every pixel in both eye framebuffers (over 9 million pixels total!).' },
        { title: 'Lens Warp Correction', time: '0.6 ms (GPU Warp)', desc: 'Optical lenses cause pincushion distortion and chromatic dispersion. A barrel-distortion shader pre-warps the image in reverse so it appears perfectly straight through glass.' },
        { title: 'Async TimeWarp (ATW)', time: '0.5 ms (GPU High-Priority Compute)', desc: 'Right before vertical scanout, a dedicated compute queue re-samples the rendered frame and rotates it based on the newest IMU orientation, preventing frame drops from causing nausea.' },
        { title: 'Display Scanout', time: '1.0 ms (Hardware Strobe)', desc: 'Fast-switch OLED/LCD pixels are driven line-by-line or globally strobed with a 1ms pulse of light to prevent retina motion blur.' }
      ];

      function updateActiveStage(n) {
        currentStage = n;
        steps.forEach((s, idx) => {
          if (idx + 1 === n) {
            s.classList.add('active');
          } else {
            s.classList.remove('active');
          }
        });

        const info = stageInfo[n - 1];
        badge.textContent = `ACTIVE STAGE: 0${n} / 09`;
        title.textContent = info.title;
        time.textContent = `Time Budget: ${info.time}`;
        expl.textContent = info.desc;
        if (window.vrAudio) window.vrAudio.playTone(280 + n * 45, 0.1);
      }

      stepBtn.addEventListener('click', () => {
        let next = currentStage + 1;
        if (next > 9) next = 1;
        updateActiveStage(next);
      });

      autoBtn.addEventListener('click', () => {
        if (timer) {
          clearInterval(timer);
          timer = null;
          autoBtn.textContent = '⚡ Auto Run';
          return;
        }
        autoBtn.textContent = '⏸ Pause';
        timer = setInterval(() => {
          let next = currentStage + 1;
          if (next > 9) {
            next = 1;
            clearInterval(timer);
            timer = null;
            autoBtn.textContent = '⚡ Auto Run';
            if (window.vrAudio) window.vrAudio.playSuccess();
          }
          updateActiveStage(next);
        }, 600);
      });

      resetBtn.addEventListener('click', () => {
        if (timer) clearInterval(timer);
        timer = null;
        autoBtn.textContent = '⚡ Auto Run';
        updateActiveStage(1);
      });

      cullToggle.addEventListener('click', () => {
        cullingOn = !cullingOn;
        if (cullingOn) {
          cullToggle.style.background = 'rgba(0, 229, 255, 0.2)';
          cullToggle.textContent = 'ON (-45% Draw Calls)';
          stageInfo[1].desc = 'Frustum culling ACTIVE: Discards 45% of scene geometry outside eye cones, saving valuable GPU rasterization time.';
        } else {
          cullToggle.style.background = 'rgba(255, 75, 75, 0.2)';
          cullToggle.textContent = 'OFF (100% Geometry Rendered)';
          stageInfo[1].desc = 'Frustum culling DISABLED: Entire 360-degree scene submitted to GPU, doubling vertex load and causing frame drops!';
        }
        if (currentStage === 2) updateActiveStage(2);
        if (window.vrAudio) window.vrAudio.playClick(350);
      });

      steps.forEach((s, idx) => {
        s.addEventListener('click', () => updateActiveStage(idx + 1));
      });
    },
    notes: `
      <b>Slide 7 Talking Points:</b>
      <ul>
        <li><b>Single-Pass Stereo vs Multi-Pass:</b> In early VR, the GPU rendered the entire scene twice from scratch. Modern APIs use <i>Single Pass Stereo / Multiview</i>, where the GPU invokes vertex shaders once and duplicates geometry to left and right viewports automatically.</li>
        <li><b>The Savior - ATW (Asynchronous TimeWarp):</b> Highlight stage 8. Even if the game engine drops a frame and takes 20ms, the ATW compute shader steps in at 11ms, reads the newest head angle, shifts the old frame, and scans out without a hitch.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 8: STEREO RENDERING & IPD
  // ==========================================
  {
    id: 'slide-8',
    part: 'Rendering Pipeline',
    partNumber: 'PART 8',
    title: 'Stereo Rendering & Interpupillary Distance (IPD)',
    subtitle: 'Simulating Binocular Disparity and Correcting Geometric Convergence for the Human Eyes',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">STEREOSCOPIC VISION</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
              Why Can't We Just Duplicate One Camera?
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 0.75rem;">
              Human depth perception relies on <b>stereopsis</b>: because your eyes are spaced roughly 64mm apart, each eye receives a slightly different angle of the world. The brain merges these into a single 3D perception.
            </p>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Interpupillary Distance (IPD):</span>
                <input type="range" class="cyber-slider" id="s8-ipd-slider" min="55" max="72" value="64">
                <span class="telemetry-value" id="s8-ipd-val">64 mm</span>
              </div>

              <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                <button class="cyber-btn" id="s8-btn-both" style="flex: 1;">Binocular (Both)</button>
                <button class="cyber-btn secondary" id="s8-btn-left" style="flex: 1;">Left Only</button>
                <button class="cyber-btn secondary" id="s8-btn-right" style="flex: 1;">Right Only</button>
              </div>
            </div>

            <div style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-color); margin-top: 0.75rem;">
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">STEREO TELEMETRY:</div>
              <div id="s8-status" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-green);">
                Camera Baseline: 64.0 mm (Human Average)<br>
                Disparity Shift: ±1.8° at 1.5m focal distance<br>
                Convergence Status: Optimal Binocular Fusion
              </div>
            </div>
          </div>

          <!-- Dual Eye Frustum Simulation -->
          <div class="content-card" style="align-items: center; justify-content: center;">
            <span class="card-badge">DUAL EYE VIEWPORTS</span>
            <div style="display: flex; gap: 1rem; width: 100%; margin: 0.75rem 0;" id="s8-viewports">
              <!-- Left Eye View -->
              <div id="s8-left-box" style="flex: 1; height: 190px; background: rgba(0, 229, 255, 0.05); border: 2px solid var(--neon-cyan); border-radius: 50%; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="position: absolute; top: 10px; font-size: 0.7rem; font-weight: 700; color: var(--neon-cyan);">LEFT EYE</div>
                <!-- Target Cylinder with Parallax offset -->
                <div id="s8-left-target" style="width: 38px; height: 75px; background: linear-gradient(135deg, var(--neon-cyan), #0077ff); border-radius: 8px; transform: translateX(8px); box-shadow: 0 0 15px rgba(0,229,255,0.4);"></div>
                <div style="position: absolute; bottom: 12px; font-size: 0.68rem; font-family: var(--font-mono); color: var(--text-muted);">Cam Offset: -32mm</div>
              </div>

              <!-- Right Eye View -->
              <div id="s8-right-box" style="flex: 1; height: 190px; background: rgba(139, 92, 246, 0.05); border: 2px solid var(--neon-purple); border-radius: 50%; position: relative; overflow: hidden; display: flex; flex-direction: column; align-items: center; justify-content: center;">
                <div style="position: absolute; top: 10px; font-size: 0.7rem; font-weight: 700; color: var(--neon-purple);">RIGHT EYE</div>
                <!-- Target Cylinder with Parallax offset -->
                <div id="s8-right-target" style="width: 38px; height: 75px; background: linear-gradient(135deg, var(--neon-purple), #ff0077); border-radius: 8px; transform: translateX(-8px); box-shadow: 0 0 15px rgba(139,92,246,0.4);"></div>
                <div style="position: absolute; bottom: 12px; font-size: 0.68rem; font-family: var(--font-mono); color: var(--text-muted);">Cam Offset: +32mm</div>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
              Move the IPD slider to see horizontal parallax shift between the eyes.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const slider = document.getElementById('s8-ipd-slider');
      const val = document.getElementById('s8-ipd-val');
      const leftTarget = document.getElementById('s8-left-target');
      const rightTarget = document.getElementById('s8-right-target');
      const leftBox = document.getElementById('s8-left-box');
      const rightBox = document.getElementById('s8-right-box');
      const status = document.getElementById('s8-status');
      const btnBoth = document.getElementById('s8-btn-both');
      const btnL = document.getElementById('s8-btn-left');
      const btnR = document.getElementById('s8-btn-right');

      function updateIPD() {
        const ipd = parseFloat(slider.value);
        val.textContent = `${ipd} mm`;
        const offset = (ipd - 64) * 0.8;
        leftTarget.style.transform = `translateX(${8 + offset}px)`;
        rightTarget.style.transform = `translateX(${-8 - offset}px)`;

        status.innerHTML = `Camera Baseline: ${ipd.toFixed(1)} mm<br>
Stereo Disparity Shift: ±${(ipd * 0.028).toFixed(2)}° at 1.5m<br>
${ipd < 58 ? '<span style="color: var(--neon-red);">Warning: Narrow IPD! Strain for average adult.</span>' : ipd > 68 ? '<span style="color: var(--neon-red);">Warning: Wide IPD! Binocular alignment stretched.</span>' : '<span style="color: var(--neon-green);">Optimal Binocular Fusion (Nominal Comfort)</span>'}`;

        if (window.vrAudio) window.vrAudio.playClick(380);
      }

      slider.addEventListener('input', updateIPD);

      btnBoth.addEventListener('click', () => {
        leftBox.style.opacity = '1';
        rightBox.style.opacity = '1';
        btnBoth.className = 'cyber-btn';
        btnL.className = 'cyber-btn secondary';
        btnR.className = 'cyber-btn secondary';
        if (window.vrAudio) window.vrAudio.playClick(400);
      });

      btnL.addEventListener('click', () => {
        leftBox.style.opacity = '1';
        rightBox.style.opacity = '0.2';
        btnL.className = 'cyber-btn';
        btnBoth.className = 'cyber-btn secondary';
        btnR.className = 'cyber-btn secondary';
        if (window.vrAudio) window.vrAudio.playClick(320);
      });

      btnR.addEventListener('click', () => {
        leftBox.style.opacity = '0.2';
        rightBox.style.opacity = '1';
        btnR.className = 'cyber-btn';
        btnBoth.className = 'cyber-btn secondary';
        btnL.className = 'cyber-btn secondary';
        if (window.vrAudio) window.vrAudio.playClick(320);
      });
    },
    notes: `
      <b>Slide 8 Talking Points:</b>
      <ul>
        <li><b>Interpupillary Distance (IPD):</b> The distance between the centers of human pupils ranges from 55mm to 72mm. If a headset does not adjust IPD mechanically or in software, the user's optical center misses the lens sweet spot, producing blur, double-vision (diplopia), and eye strain.</li>
        <li><b>Binocular Parallax:</b> Show students how the object is shifted left in the right eye, and shifted right in the left eye. The brain computes depth directly from this disparity.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 9: GAME ENGINE + HARDWARE PERFORMANCE
  // ==========================================
  {
    id: 'slide-9',
    part: 'Rendering Pipeline',
    partNumber: 'PART 9',
    title: 'Game Engine & Hardware Performance Simulator',
    subtitle: 'Balancing the 11.1ms (90Hz) Budget Between CPU Scene Graph and GPU Rasterization',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">PERFORMANCE BUDGET CONTROLS</span>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Draw Calls (CPU):</span>
                <input type="range" class="cyber-slider" id="s9-drawcalls" min="200" max="3500" value="800" step="100">
                <span class="telemetry-value" id="s9-dc-val">800</span>
              </div>

              <div class="control-row">
                <span class="control-label">Triangle Count (GPU):</span>
                <input type="range" class="cyber-slider" id="s9-triangles" min="100" max="4000" value="800" step="100">
                <span class="telemetry-value" id="s9-tri-val">800k</span>
              </div>

              <div class="control-row">
                <span class="control-label">Dynamic Shadow Lights:</span>
                <input type="range" class="cyber-slider" id="s9-lights" min="1" max="10" value="2">
                <span class="telemetry-value" id="s9-lights-val">2</span>
              </div>

              <div class="control-row">
                <span class="control-label">MSAA Anti-Aliasing:</span>
                <select class="cyber-slider" id="s9-msaa" style="width: 140px; padding: 0.2rem; background: var(--bg-card); color: var(--neon-cyan); border: 1px solid var(--border-color); border-radius: 4px;">
                  <option value="1">2x MSAA (Optimal)</option>
                  <option value="2">4x MSAA (Standard)</option>
                  <option value="3">8x MSAA (Heavy)</option>
                </select>
              </div>
            </div>

            <button class="cyber-btn" id="s9-optimize-btn" style="margin-top: 0.75rem;">
              <span>⚡ Auto-Optimize Engine Profile</span>
            </button>
          </div>

          <!-- Live Frame Time Telemetry Meter -->
          <div class="content-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge">FRAME-TIME BUDGET (TARGET: 11.1ms / 90 FPS)</span>

              <div style="margin: 1rem 0;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; margin-bottom: 0.25rem;">
                  <span>CPU Time: <b id="s9-cpu-ms" style="color: var(--neon-cyan);">3.2 ms</b></span>
                  <span>GPU Time: <b id="s9-gpu-ms" style="color: var(--neon-purple);">5.8 ms</b></span>
                  <span>Total: <b id="s9-total-ms" style="color: var(--neon-green);">9.0 ms</b></span>
                </div>

                <!-- Dual Segment Bar -->
                <div style="height: 18px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; display: flex; position: relative;">
                  <div id="s9-bar-cpu" style="width: 28%; height: 100%; background: var(--neon-cyan); transition: width 0.3s;"></div>
                  <div id="s9-bar-gpu" style="width: 52%; height: 100%; background: var(--neon-purple); transition: width 0.3s;"></div>
                  <!-- 11.1ms Target Marker -->
                  <div style="position: absolute; left: 75%; top: 0; bottom: 0; width: 2px; background: var(--neon-red); z-index: 10;" title="11.1ms Deadline"></div>
                </div>
                <div style="display: flex; justify-content: space-between; font-size: 0.7rem; color: var(--text-muted); margin-top: 0.2rem;">
                  <span>0 ms</span>
                  <span style="color: var(--neon-red); font-weight: 700;">11.1ms DEADLINE</span>
                  <span>15 ms</span>
                </div>
              </div>
            </div>

            <!-- Frame status badge -->
            <div style="background: rgba(0,0,0,0.5); border-radius: var(--radius-sm); padding: 0.85rem; border: 1px solid var(--border-color);">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-size: 0.8rem; color: var(--text-muted);">RENDERED FPS:</div>
                <div id="s9-fps" style="font-family: var(--font-mono); font-size: 1.25rem; font-weight: 800; color: var(--neon-green);">
                  90 FPS LOCKED
                </div>
              </div>
              <div id="s9-verdict" style="font-size: 0.8rem; margin-top: 0.35rem; color: var(--text-secondary);">
                ✓ Smooth nominal execution. Both CPU and GPU complete before V-Sync boundary.
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const dc = document.getElementById('s9-drawcalls');
      const tri = document.getElementById('s9-triangles');
      const lgt = document.getElementById('s9-lights');
      const msaa = document.getElementById('s9-msaa');
      const dcVal = document.getElementById('s9-dc-val');
      const triVal = document.getElementById('s9-tri-val');
      const lgtVal = document.getElementById('s9-lights-val');
      const cpuMs = document.getElementById('s9-cpu-ms');
      const gpuMs = document.getElementById('s9-gpu-ms');
      const totalMs = document.getElementById('s9-total-ms');
      const barCpu = document.getElementById('s9-bar-cpu');
      const barGpu = document.getElementById('s9-bar-gpu');
      const fps = document.getElementById('s9-fps');
      const verdict = document.getElementById('s9-verdict');
      const optBtn = document.getElementById('s9-optimize-btn');

      function calculateBudget() {
        const calls = parseInt(dc.value);
        const tris = parseInt(tri.value);
        const lights = parseInt(lgt.value);
        const aa = parseInt(msaa.value);

        dcVal.textContent = calls;
        triVal.textContent = `${tris}k`;
        lgtVal.textContent = lights;

        // Realistic frame-time simulation formula
        const cpu = (1.5 + (calls / 3500) * 6.5).toFixed(1);
        const gpu = (2.0 + (tris / 4000) * 4.0 + lights * 0.8 + aa * 1.2).toFixed(1);
        const total = (parseFloat(cpu) + parseFloat(gpu)).toFixed(1);

        cpuMs.textContent = `${cpu} ms`;
        gpuMs.textContent = `${gpu} ms`;
        totalMs.textContent = `${total} ms`;

        // Bar scaling against 15ms full width
        const cpuPct = Math.min(100, (parseFloat(cpu) / 15) * 100);
        const gpuPct = Math.min(100 - cpuPct, (parseFloat(gpu) / 15) * 100);

        barCpu.style.width = `${cpuPct}%`;
        barGpu.style.width = `${gpuPct}%`;

        if (parseFloat(total) <= 11.1) {
          totalMs.style.color = 'var(--neon-green)';
          fps.textContent = '90 FPS LOCKED';
          fps.style.color = 'var(--neon-green)';
          verdict.innerHTML = `<span style="color: var(--neon-green);">✓ Nominal Execution. Target 90 FPS met without frame drops.</span>`;
        } else {
          totalMs.style.color = 'var(--neon-red)';
          fps.textContent = '45 FPS (REPROJECTED)';
          fps.style.color = 'var(--neon-red)';
          verdict.innerHTML = `<span style="color: var(--neon-red);">⚠️ FRAME DROP DETECTED! Frame-time (${total}ms) missed 11.1ms deadline. ATW synthetically doubled frames; slight positional stutter!</span>`;
          if (window.vrAudio) window.vrAudio.playBuzz();
        }
      }

      [dc, tri, lgt, msaa].forEach(el => {
        el.addEventListener('input', () => {
          calculateBudget();
          if (window.vrAudio) window.vrAudio.playClick(320);
        });
      });

      optBtn.addEventListener('click', () => {
        dc.value = 600;
        tri.value = 500;
        lgt.value = 2;
        msaa.value = "1";
        calculateBudget();
        if (window.vrAudio) window.vrAudio.playSuccess();
      });
    },
    notes: `
      <b>Slide 9 Talking Points:</b>
      <ul>
        <li><b>The Strict 11.1ms Budget:</b> At 90Hz, 1 second / 90 = 11.11 milliseconds. In flat PC gaming, if a frame takes 18ms, the game drops to 55 FPS with minor visual stutter. In VR, dropping below the refresh rate triggers immediate motion sickness.</li>
        <li><b>CPU vs GPU Bottlenecks:</b>
          <i>CPU-bound:</i> Too many draw calls, physics evaluations, or AI scripts.
          <i>GPU-bound:</i> Too many polygons, dynamic shadow-casting lights, or heavy pixel shaders.
        </li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 10: CLIENT-SERVER ARCHITECTURE
  // ==========================================
  {
    id: 'slide-10',
    part: 'Distributed & Networked VR',
    partNumber: 'PART 10',
    title: 'Client-Server Architecture in Distributed VR',
    subtitle: 'Decoupling Heavy World Simulation from Real-Time 1000Hz Head Tracking',
    render: function() {
      return `
        <div class="split-layout">
          <!-- Architecture Diagram -->
          <div class="content-card" style="justify-content: space-around;">
            <span class="card-badge">DISTRIBUTED TOPOLOGY</span>

            <!-- Server Node -->
            <div class="content-card" style="border-color: var(--neon-purple); background: rgba(139, 92, 246, 0.08); padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; color: var(--neon-purple);">CENTRAL AUTHORITATIVE SERVER</span>
                <span class="card-badge" style="background: rgba(139, 92, 246, 0.2); color: var(--neon-purple);">30-60 Hz TICK</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">
                Runs physics engine, validates collisions, resolves multiplayer interactions, manages persistent world state.
              </div>
            </div>

            <!-- Network Bus -->
            <div style="display: flex; align-items: center; justify-content: center; gap: 0.5rem; color: var(--neon-cyan); font-family: var(--font-mono); font-size: 0.78rem;">
              <span>▲ State Delta Compression (UDP/WebRTC)</span>
              <span>▼ Compressed Pose Packets (~20-50ms Ping)</span>
            </div>

            <!-- Client Node -->
            <div class="content-card" style="border-color: var(--neon-cyan); background: rgba(0, 229, 255, 0.08); padding: 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <span style="font-weight: 700; color: var(--neon-cyan);">LOCAL VR CLIENT (HMD)</span>
                <span class="card-badge" style="background: rgba(0, 229, 255, 0.2); color: var(--neon-cyan);">90-120 Hz RENDER</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.3rem;">
                Samples IMU at 1000Hz, performs client-side prediction & dead reckoning, renders local view without waiting for server response.
              </div>
            </div>
          </div>

          <!-- Deep Strategy Explanations -->
          <div class="content-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge">THE DISTRIBUTED VR PARADOX</span>
              <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
                Why Cloud Rendering Alone Can Cause Sickness
              </h3>
              <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">
                Internet latency across broadband is typically <b>30ms to 70ms</b>. Since VR motion-to-photon must stay strictly below <b>20ms</b>, a VR headset can <i>never</i> wait for a remote server to tell it where the user is looking.
              </p>
              <div style="display: flex; flex-direction: column; gap: 0.5rem; margin-top: 0.75rem;">
                <div style="background: rgba(0,0,0,0.4); padding: 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-cyan); font-size: 0.8rem;">
                  <b style="color: var(--neon-cyan);">Client-Side Prediction:</b> Client renders immediate head movement locally at 90 FPS while predicting future avatar positions.
                </div>
                <div style="background: rgba(0,0,0,0.4); padding: 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-purple); font-size: 0.8rem;">
                  <b style="color: var(--neon-purple);">Snapshot Interpolation:</b> Smoothly blends remote players between server network packets to eliminate avatar rubber-banding.
                </div>
              </div>
            </div>

            <div class="telemetry-box" style="height: 70px; font-size: 0.75rem;">
• Local Render Loop: 11.1ms (Autonomous)
• Network Transit Time: ~35ms RTT (Asynchronous)
• Protocol: Unreliable sequenced UDP / Custom WebRTC DataChannels
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      // Passive architecture slide with sound preview
      if (window.vrAudio) window.vrAudio.playHum();
    },
    notes: `
      <b>Slide 10 Talking Points:</b>
      <ul>
        <li><b>The Network Latency Paradox:</b> Ask students: "If cloud gaming like GeForce Now works at 50ms ping, why can't we just stream VR completely from the cloud?"</li>
        <li><b>The Answer:</b> The vestibular system tolerates 0 network lag for head orientation. Cloud VR (like Meta Quest AirLink) streams video, but the local headset still applies Asynchronous TimeWarp on the final decoded frame to re-align with real-time head angle.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 11: MULTIPLAYER VR PRACTICAL EXAMPLE
  // ==========================================
  {
    id: 'slide-11',
    part: 'Distributed & Networked VR',
    partNumber: 'PART 11',
    title: 'Multiplayer VR: Live Network Relay Simulation',
    subtitle: 'Simulating Packet Loss, Spatial Audio Sync, and Dead Reckoning Across Remote Avatars',
    render: function() {
      return `
        <div class="split-layout">
          <!-- Simulation Controls -->
          <div class="content-card">
            <span class="card-badge">NETWORK EMULATOR</span>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Simulated Ping (RTT):</span>
                <input type="range" class="cyber-slider" id="s11-ping" min="15" max="300" value="45" step="5">
                <span class="telemetry-value" id="s11-ping-val">45 ms</span>
              </div>

              <div class="control-row">
                <span class="control-label">Packet Loss Rate:</span>
                <input type="range" class="cyber-slider" id="s11-loss" min="0" max="25" value="2" step="1">
                <span class="telemetry-value" id="s11-loss-val">2%</span>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; margin-top: 0.8rem;">
              <button class="cyber-btn" id="s11-send-btn" style="flex: 1;">
                <span>📡 Broadcast Avatar Pose</span>
              </button>
              <button class="cyber-btn secondary" id="s11-glitch-btn" style="flex: 1;">
                <span>Simulate Jitter Spike</span>
              </button>
            </div>

            <div id="s11-network-log" class="telemetry-box" style="height: 110px; margin-top: 0.8rem; font-size: 0.75rem;">
[NETWORK RELAY READY]
Local User: Node-A (Host / Origin)
Peers Connected: Node-B (Frankfurt), Node-C (Tokyo)
Spatial Audio Sync: Active via 3D HRTF
Dead Reckoning: Hermite Spline Interpolation Active
            </div>
          </div>

          <!-- Multiplayer Stage Visualizer -->
          <div class="content-card" style="align-items: center; justify-content: center; position: relative;">
            <span class="card-badge">VIRTUAL SOCIAL ROOM</span>
            <div style="width: 100%; height: 230px; position: relative; border: 1px dashed var(--border-color); border-radius: var(--radius-sm); background: radial-gradient(circle, rgba(0,229,255,0.03) 0%, transparent 80%); display: flex; align-items: center; justify-content: center;">

              <!-- Center Server Relay -->
              <div id="s11-server-hub" style="width: 50px; height: 50px; border-radius: 50%; background: rgba(139, 92, 246, 0.2); border: 2px solid var(--neon-purple); display: flex; align-items: center; justify-content: center; font-size: 1.25rem; box-shadow: 0 0 20px rgba(139,92,246,0.3); z-index: 5;">
                🌐
              </div>

              <!-- Player 1 (Local) -->
              <div id="s11-p1" style="position: absolute; bottom: 25px; left: 35px; text-align: center;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: rgba(0, 229, 255, 0.2); border: 2px solid var(--neon-cyan); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin: 0 auto; box-shadow: 0 0 15px rgba(0,229,255,0.4);">
                  🥽
                </div>
                <div style="font-size: 0.72rem; color: var(--neon-cyan); font-weight: 700; margin-top: 0.25rem;">YOU (Local)</div>
              </div>

              <!-- Player 2 (Remote) -->
              <div id="s11-p2" style="position: absolute; top: 30px; left: 60px; text-align: center;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: rgba(0, 255, 157, 0.2); border: 2px solid var(--neon-green); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin: 0 auto;">
                  👤
                </div>
                <div style="font-size: 0.72rem; color: var(--neon-green); font-weight: 700; margin-top: 0.25rem;">Peer-B</div>
              </div>

              <!-- Player 3 (Remote) -->
              <div id="s11-p3" style="position: absolute; top: 30px; right: 60px; text-align: center;">
                <div style="width: 45px; height: 45px; border-radius: 50%; background: rgba(255, 184, 0, 0.2); border: 2px solid var(--neon-yellow); display: flex; align-items: center; justify-content: center; font-size: 1.2rem; margin: 0 auto;">
                  👤
                </div>
                <div style="font-size: 0.72rem; color: var(--neon-yellow); font-weight: 700; margin-top: 0.25rem;">Peer-C</div>
              </div>
            </div>
            <div style="font-size: 0.75rem; color: var(--text-muted); text-align: center; margin-top: 0.35rem;">
              Packets relay through authoritative server hub and broadcast to peers.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const ping = document.getElementById('s11-ping');
      const loss = document.getElementById('s11-loss');
      const pingVal = document.getElementById('s11-ping-val');
      const lossVal = document.getElementById('s11-loss-val');
      const sendBtn = document.getElementById('s11-send-btn');
      const glitchBtn = document.getElementById('s11-glitch-btn');
      const log = document.getElementById('s11-network-log');
      const hub = document.getElementById('s11-server-hub');

      ping.addEventListener('input', () => {
        pingVal.textContent = `${ping.value} ms`;
        if (window.vrAudio) window.vrAudio.playClick(340);
      });

      loss.addEventListener('input', () => {
        lossVal.textContent = `${loss.value}%`;
        if (window.vrAudio) window.vrAudio.playClick(340);
      });

      sendBtn.addEventListener('click', () => {
        const p = parseInt(ping.value);
        const l = parseInt(loss.value);
        hub.style.transform = 'scale(1.25)';
        setTimeout(() => hub.style.transform = 'scale(1)', 300);

        if (Math.random() * 100 < l) {
          log.innerHTML = `<span style="color: var(--neon-red);">[PACKET LOSS] UDP sequence #4821 dropped!\nDead reckoning interpolating avatar trajectory...</span>\n` + log.innerHTML;
          if (window.vrAudio) window.vrAudio.playBuzz();
        } else {
          log.innerHTML = `<span style="color: var(--neon-green);">[POSE RELAY] Packet delivered in ${(p / 2).toFixed(1)}ms. Spatial audio position updated.</span>\n` + log.innerHTML;
          if (window.vrAudio) window.vrAudio.playDataPacket();
        }
      });

      glitchBtn.addEventListener('click', () => {
        log.innerHTML = `<span style="color: var(--neon-yellow);">[JITTER SPIKE] Network buffer exceeded 220ms!\nAvatars temporarily snap to reconciliated server state.</span>\n` + log.innerHTML;
        if (window.vrAudio) window.vrAudio.playTone(200, 0.25);
      });
    },
    notes: `
      <b>Slide 11 Talking Points:</b>
      <ul>
        <li><b>Spatial Synchronization:</b> In multiplayer VR, you must synchronize not just 3D position, but also hand gestures, finger tracking, eye gaze, and head rotation.</li>
        <li><b>Dead Reckoning:</b> If a packet is lost, the client predicts where the remote player was heading using velocity vectors. When the next real packet arrives, it smoothly blends the avatar over 50-100ms so they don't teleport.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 12: CLUSTER RENDERING ARCHITECTURE
  // ==========================================
  {
    id: 'slide-12',
    part: 'High-End & Cluster VR',
    partNumber: 'PART 12',
    title: 'Cluster Rendering: Multi-GPU / Multi-Node VR',
    subtitle: 'Overcoming the Single-GPU Limit for Multi-Screen CAVE Systems and Ultra-High-Fidelity Simulators',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">THE MULTI-GPU CHALLENGE</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
              Why Can't One GPU Drive Everything?
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">
              In industrial flight simulators, automotive design CAVE rooms, and massive projection domes, rendering 4 to 12 simultaneous 4K displays requires rendering power far beyond any single graphics card.
            </p>

            <div style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-color); margin: 0.75rem 0;">
              <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.25rem;">TWO CRITICAL SYNCHRONIZATION HARDWARE PREREQUISITES:</div>
              <div style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                <b style="color: var(--neon-cyan);">1. FrameLock (Genlock):</b> Physical BNC cables synchronizing display refresh timing across all GPUs to within microsecond precision.<br>
                <b style="color: var(--neon-purple);">2. DataLock (Software Barrier):</b> Master node broadcasts camera transforms and physics ticks; all worker nodes stall at a barrier until everyone has rendered.
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="cyber-btn" id="s12-genlock-on" style="flex: 1;">Genlock ON (Sync)</button>
              <button class="cyber-btn secondary" id="s12-genlock-off" style="flex: 1;">Genlock OFF (Tear)</button>
            </div>
          </div>

          <!-- Multi-Node Topology Visualizer -->
          <div class="content-card" style="justify-content: space-around;">
            <span class="card-badge">CLUSTER TOPOLOGY (MASTER-WORKER)</span>

            <!-- Master Node -->
            <div style="background: rgba(0, 229, 255, 0.1); border: 1px solid var(--neon-cyan); border-radius: 6px; padding: 0.6rem; text-align: center;">
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">MASTER NODE (Director / Tracker)</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">Reads Head Tracking Sensors • Runs Physics • Broadcasts Camera Matrices</div>
            </div>

            <div style="text-align: center; color: var(--neon-cyan); font-size: 0.8rem; font-family: var(--font-mono);">
              ↓↓ 10GbE Network / InfiniBand Broadcast ↓↓
            </div>

            <!-- 3 Worker Nodes -->
            <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.5rem;" id="s12-workers">
              <div class="content-card s12-worker" style="padding: 0.5rem; text-align: center; border-color: var(--neon-purple);">
                <div style="font-weight: 700; font-size: 0.75rem; color: var(--neon-purple);">NODE 1 (GPU)</div>
                <div style="font-size: 0.68rem; color: var(--text-muted);">Left Wall</div>
              </div>
              <div class="content-card s12-worker" style="padding: 0.5rem; text-align: center; border-color: var(--neon-purple);">
                <div style="font-weight: 700; font-size: 0.75rem; color: var(--neon-purple);">NODE 2 (GPU)</div>
                <div style="font-size: 0.68rem; color: var(--text-muted);">Front Wall</div>
              </div>
              <div class="content-card s12-worker" style="padding: 0.5rem; text-align: center; border-color: var(--neon-purple);">
                <div style="font-weight: 700; font-size: 0.75rem; color: var(--neon-purple);">NODE 3 (GPU)</div>
                <div style="font-size: 0.68rem; color: var(--text-muted);">Right Wall</div>
              </div>
            </div>

            <div id="s12-sync-status" style="font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-green); text-align: center;">
              ✓ Hardware Genlock Active: All displays scanning out scanline 0 simultaneously.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const btnOn = document.getElementById('s12-genlock-on');
      const btnOff = document.getElementById('s12-genlock-off');
      const status = document.getElementById('s12-sync-status');
      const workers = document.querySelectorAll('.s12-worker');

      btnOn.addEventListener('click', () => {
        btnOn.className = 'cyber-btn';
        btnOff.className = 'cyber-btn secondary';
        workers.forEach(w => {
          w.style.borderColor = 'var(--neon-purple)';
          w.style.transform = 'none';
        });
        status.innerHTML = `<span style="color: var(--neon-green);">✓ Hardware Genlock Active: Microsecond display scanout synchronization. Zero image tearing across wall seams.</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btnOff.addEventListener('click', () => {
        btnOff.className = 'cyber-btn';
        btnOn.className = 'cyber-btn secondary';
        workers.forEach((w, idx) => {
          w.style.borderColor = 'var(--neon-red)';
          w.style.transform = `translateY(${idx % 2 === 0 ? '-4px' : '4px'})`;
        });
        status.innerHTML = `<span style="color: var(--neon-red);">⚠️ GENLOCK DISABLED: Clock drift! Left and right wall displays scan out out-of-phase &rarr; Catastrophic spatial shearing!</span>`;
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 12 Talking Points:</b>
      <ul>
        <li><b>CAVE Automatic Virtual Environment:</b> Explain what a CAVE is: a physical cube room made of projection screens where users wear tracking glasses.</li>
        <li><b>The Tearing Disaster:</b> If three separate computers render three adjacent walls without hardware genlock, one screen might show a moving car 16ms ahead of the next screen. The car will be sliced in half across the corner wall!</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 13: CLUSTER RENDERING EXAMPLE (CAVE)
  // ==========================================
  {
    id: 'slide-13',
    part: 'High-End & Cluster VR',
    partNumber: 'PART 13',
    title: 'Cluster Rendering in Action: 3-Screen CAVE',
    subtitle: 'Simulating Multi-Projector Perspective Tracking and Off-Axis Projections',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">CAVE ENVIRONMENT CONTROLS</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
              Off-Axis Perspective Projection
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 0.75rem;">
              Unlike an HMD where screens move with your eyes, CAVE screens are fixed to the room walls.
              Each GPU node must render an <b>asymmetric off-axis frustum</b> calculated dynamically based on where the user is standing inside the room.
            </p>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">User Room Position X:</span>
                <input type="range" class="cyber-slider" id="s13-user-x" min="-40" max="40" value="0">
                <span class="telemetry-value" id="s13-user-x-val">0 cm</span>
              </div>
              <div class="control-row">
                <span class="control-label">User Room Distance Z:</span>
                <input type="range" class="cyber-slider" id="s13-user-z" min="-30" max="30" value="0">
                <span class="telemetry-value" id="s13-user-z-val">0 cm</span>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button class="cyber-btn" id="s13-sync-test" style="flex: 1;">⚡ Test Cluster Sync</button>
              <button class="cyber-btn secondary" id="s13-reset-btn" style="flex: 1;">Reset Center</button>
            </div>
          </div>

          <!-- 3-Wall CAVE Room Visualizer -->
          <div class="content-card" style="align-items: center; justify-content: center;">
            <span class="card-badge">PANORAMIC CAVE WALLS SIMULATOR</span>

            <div style="display: flex; gap: 4px; width: 100%; height: 210px; margin: 0.75rem 0; perspective: 600px;">
              <!-- Left Wall Screen -->
              <div id="s13-wall-left" style="flex: 1; height: 100%; background: rgba(0, 229, 255, 0.08); border: 2px solid var(--neon-cyan); border-radius: 4px; transform: rotateY(25deg); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                <div style="position: absolute; top: 8px; font-size: 0.65rem; color: var(--neon-cyan); font-weight: 700;">LEFT SCREEN (GPU 1)</div>
                <div id="s13-target-l" style="width: 25px; height: 60px; background: var(--neon-cyan); border-radius: 4px; transform: skewY(-10deg);"></div>
              </div>

              <!-- Center Wall Screen -->
              <div id="s13-wall-front" style="flex: 1.4; height: 100%; background: rgba(139, 92, 246, 0.08); border: 2px solid var(--neon-purple); border-radius: 4px; display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                <div style="position: absolute; top: 8px; font-size: 0.65rem; color: var(--neon-purple); font-weight: 700;">FRONT SCREEN (GPU 2)</div>
                <div id="s13-target-f" style="width: 35px; height: 60px; background: var(--neon-purple); border-radius: 4px;"></div>
              </div>

              <!-- Right Wall Screen -->
              <div id="s13-wall-right" style="flex: 1; height: 100%; background: rgba(0, 255, 157, 0.08); border: 2px solid var(--neon-green); border-radius: 4px; transform: rotateY(-25deg); display: flex; flex-direction: column; align-items: center; justify-content: center; position: relative;">
                <div style="position: absolute; top: 8px; font-size: 0.65rem; color: var(--neon-green); font-weight: 700;">RIGHT SCREEN (GPU 3)</div>
                <div id="s13-target-r" style="width: 25px; height: 60px; background: var(--neon-green); border-radius: 4px; transform: skewY(10deg);"></div>
              </div>
            </div>

            <div id="s13-telemetry" style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--neon-cyan); text-align: center;">
              Off-Axis Asymmetry: ΔX=0.0cm | Barrier Latency: 0.4ms (Over InfiniBand)
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const userX = document.getElementById('s13-user-x');
      const userZ = document.getElementById('s13-user-z');
      const xVal = document.getElementById('s13-user-x-val');
      const zVal = document.getElementById('s13-user-z-val');
      const targetL = document.getElementById('s13-target-l');
      const targetF = document.getElementById('s13-target-f');
      const targetR = document.getElementById('s13-target-r');
      const telem = document.getElementById('s13-telemetry');
      const syncBtn = document.getElementById('s13-sync-test');
      const resetBtn = document.getElementById('s13-reset-btn');

      function updateCAVE() {
        const x = parseFloat(userX.value);
        const z = parseFloat(userZ.value);
        xVal.textContent = `${x} cm`;
        zVal.textContent = `${z} cm`;

        targetL.style.transform = `translateX(${x * 0.8}px) skewY(${-10 + z * 0.2}deg)`;
        targetF.style.transform = `translateX(${x * 0.8}px) scale(${1 + z * 0.01})`;
        targetR.style.transform = `translateX(${x * 0.8}px) skewY(${10 - z * 0.2}deg)`;

        telem.innerHTML = `Off-Axis Matrix: LeftFrustum(${(-x).toFixed(1)}cm), RightFrustum(${(x).toFixed(1)}cm) | Sync: 0.4ms`;
        if (window.vrAudio) window.vrAudio.playClick(360);
      }

      userX.addEventListener('input', updateCAVE);
      userZ.addEventListener('input', updateCAVE);

      syncBtn.addEventListener('click', () => {
        telem.innerHTML = `<span style="color: var(--neon-green);">⚡ InfiniBand Barrier Confirmed: All 3 GPU nodes completed frame in 7.8ms. Genlock swap buffer triggered simultaneously!</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      resetBtn.addEventListener('click', () => {
        userX.value = 0;
        userZ.value = 0;
        updateCAVE();
        if (window.vrAudio) window.vrAudio.playClick(300);
      });
    },
    notes: `
      <b>Slide 13 Talking Points:</b>
      <ul>
        <li><b>Asymmetric Projection Matrices:</b> Explain why standard OpenGL / DirectX projection matrices assume the eye is looking directly at the center of the screen. In a CAVE, as the person steps to the left, the left screen is viewed at an oblique angle, requiring an <i>asymmetric off-axis frustum</i>.</li>
        <li><b>Physical Presence:</b> Point out that CAVE systems allow multiple engineers (e.g., car designers) to walk around a full-scale virtual prototype together.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 14: LATENCY & MOTION-TO-PHOTON
  // ==========================================
  {
    id: 'slide-14',
    part: 'Optimization & Latency',
    partNumber: 'PART 14',
    title: 'Latency Breakdown: Motion-to-Photon',
    subtitle: 'Accounting for Every Millisecond from Head Motion to Display Scanout',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">THE 20 MILLISECOND DEADLINE</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
              The Anatomic Latency Budget
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5; margin-bottom: 0.75rem;">
              Why exactly 20ms? Evolution fine-tuned human vision and vestibular balancing for physical locomotion. If sensory data disagrees by >20ms, the brain triggers protective emetic nausea reflexes.
            </p>

            <!-- Latency Stack Breakdown Bars -->
            <div style="display: flex; flex-direction: column; gap: 0.4rem; margin: 0.5rem 0;">
              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
                  <span>1. IMU Sampling + OS Driver</span>
                  <span style="font-family: var(--font-mono); color: var(--neon-cyan);">2.0 ms</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                  <div style="width: 10%; height: 100%; background: var(--neon-cyan);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
                  <span>2. Engine Scene Graph & Physics</span>
                  <span style="font-family: var(--font-mono); color: var(--neon-cyan);">3.5 ms</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                  <div style="width: 17%; height: 100%; background: var(--neon-cyan);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
                  <span>3. GPU Stereo Rendering</span>
                  <span style="font-family: var(--font-mono); color: var(--neon-cyan);">6.5 ms</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                  <div style="width: 32%; height: 100%; background: var(--neon-cyan);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
                  <span>4. Display Pixel Scanout</span>
                  <span style="font-family: var(--font-mono); color: var(--neon-cyan);">4.0 ms</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                  <div style="width: 20%; height: 100%; background: var(--neon-cyan);"></div>
                </div>
              </div>

              <div>
                <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
                  <span>5. Photon Emission to Retina</span>
                  <span style="font-family: var(--font-mono); color: var(--neon-green);">1.0 ms</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.08); border-radius: 3px; overflow: hidden;">
                  <div style="width: 5%; height: 100%; background: var(--neon-green);"></div>
                </div>
              </div>
            </div>

            <div style="display: flex; justify-content: space-between; align-items: center; border-top: 1px solid var(--border-color); padding-top: 0.5rem; margin-top: 0.5rem;">
              <span style="font-weight: 700; font-size: 0.85rem;">TOTAL NOMINAL LATENCY:</span>
              <span style="font-family: var(--font-mono); font-size: 1.1rem; font-weight: 800; color: var(--neon-green);">17.0 ms (&lt; 20ms ✓)</span>
            </div>
          </div>

          <!-- Lag Simulator Comparison -->
          <div class="content-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge">INTERACTIVE LAG SIMULATOR</span>
              <div style="display: flex; gap: 0.5rem; margin: 0.5rem 0;">
                <button class="cyber-btn" id="s14-low-lag" style="flex: 1;">15ms Latency (True VR)</button>
                <button class="cyber-btn secondary" id="s14-high-lag" style="flex: 1;">75ms Latency (Nausea Sim)</button>
              </div>
            </div>

            <!-- Virtual Horizon Lag Box -->
            <div style="height: 140px; background: var(--bg-card); border: 1px solid var(--border-color); border-radius: var(--radius-sm); position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center;" id="s14-box">
              <!-- Physical crosshair -->
              <div style="position: absolute; width: 12px; height: 12px; border: 2px solid white; border-radius: 50%; z-index: 10;" title="User Head Direction"></div>
              <!-- Virtual Horizon Line -->
              <div id="s14-horizon" style="width: 140%; height: 2px; background: var(--neon-cyan); box-shadow: 0 0 10px var(--neon-cyan); position: absolute; transform: rotate(0deg);"></div>
            </div>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Move Head Angle:</span>
                <input type="range" class="cyber-slider" id="s14-angle-slider" min="-30" max="30" value="0">
                <span class="telemetry-value" id="s14-angle-val">0°</span>
              </div>
            </div>

            <div id="s14-lag-expl" style="font-size: 0.75rem; color: var(--text-muted); text-align: center;">
              In 15ms mode, the horizon tracks smoothly with zero perceptible lag.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      let lagMode = 15;
      const btnLow = document.getElementById('s14-low-lag');
      const btnHigh = document.getElementById('s14-high-lag');
      const slider = document.getElementById('s14-angle-slider');
      const angleVal = document.getElementById('s14-angle-val');
      const horizon = document.getElementById('s14-horizon');
      const expl = document.getElementById('s14-lag-expl');

      btnLow.addEventListener('click', () => {
        lagMode = 15;
        btnLow.className = 'cyber-btn';
        btnHigh.className = 'cyber-btn secondary';
        horizon.style.transition = 'transform 0.05s linear';
        expl.innerHTML = `<span style="color: var(--neon-green);">✓ 15ms Mode: Horizon responds instantly. Vestibular-ocular reflex satisfied.</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btnHigh.addEventListener('click', () => {
        lagMode = 75;
        btnHigh.className = 'cyber-btn';
        btnLow.className = 'cyber-btn secondary';
        horizon.style.transition = 'transform 0.45s ease-out';
        expl.innerHTML = `<span style="color: var(--neon-red);">⚠️ 75ms High Lag Mode: Notice how the virtual horizon drags behind your head rotation! This triggers rapid nausea.</span>`;
        if (window.vrAudio) window.vrAudio.playBuzz();
      });

      slider.addEventListener('input', (e) => {
        const val = e.target.value;
        angleVal.textContent = `${val}°`;
        horizon.style.transform = `rotate(${-val}deg)`;
        if (window.vrAudio) window.vrAudio.playClick(350);
      });
    },
    notes: `
      <b>Slide 14 Talking Points:</b>
      <ul>
        <li><b>The Anatomic Roots of Simulator Sickness:</b> Explain why humans get sick. If you eat neurotoxic berries in nature, toxins impair your nervous system, causing visual-vestibular mismatches. The brain thinks: <i>"I am hallucinating; I must have ingested poison; purge the stomach!"</i> That is why lag causes nausea.</li>
        <li><b>Demonstration:</b> Switch to 75ms lag mode and slide the angle back and forth to show how sickening the dragging horizon looks.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 15: COMPLETE VR PIPELINE (HERO MAP)
  // ==========================================
  {
    id: 'slide-15',
    part: 'Synthesis & Integration',
    partNumber: 'PART 15',
    title: 'The Complete VR Architecture: End-to-End',
    subtitle: 'From Mechanical Head Motion to Ocular Photons: The Unified Engineering Map',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%;">
          <div class="content-card" style="padding: 0.6rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div>
                <span class="card-badge">THE MASTER PIPELINE</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;">
                  Full synthesis of physical sensing, runtime, GPU rasterization, and optical projection.
                </span>
              </div>
              <button class="cyber-btn" id="s15-trace-btn">
                <span>⚡ Trace Live Motion Packet</span>
              </button>
            </div>
          </div>

          <!-- Hero Architecture Map Grid -->
          <div style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.6rem; flex: 1;">
            <div class="content-card s15-card" data-hero="1" style="justify-content: space-between;">
              <span class="card-badge">1. SENSING</span>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.95rem;">IMU & SLAM Cameras</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">
                1000Hz Gyroscope + Accelerometer coupled with optical infrared camera pose tracking.
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon-green);">Time: 0.0 - 2.0 ms</div>
            </div>

            <div class="content-card s15-card" data-hero="2" style="justify-content: space-between;">
              <span class="card-badge">2. RUNTIME</span>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.95rem;">OpenXR & Game Engine</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">
                Scene graph transformation, physics tick, frustum culling, and stereo draw call dispatch.
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon-green);">Time: 2.0 - 5.5 ms</div>
            </div>

            <div class="content-card s15-card" data-hero="3" style="justify-content: space-between;">
              <span class="card-badge">3. RENDER</span>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.95rem;">Stereo GPU Shaders</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">
                Vertex/Fragment shading for Left & Right eyes, barrel distortion correction mesh, and ATW.
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon-green);">Time: 5.5 - 12.0 ms</div>
            </div>

            <div class="content-card s15-card" data-hero="4" style="justify-content: space-between;">
              <span class="card-badge">4. OPTICS</span>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.95rem;">Fast-Switch & Lenses</div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); line-height: 1.4;">
                Low-persistence strobe (&lt;1ms pulse) through Pancake lenses onto human retina.
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.7rem; color: var(--neon-green);">Time: 12.0 - 17.0 ms</div>
            </div>
          </div>

          <!-- Hero Telemetry Log -->
          <div class="telemetry-box" id="s15-log" style="height: 75px; font-size: 0.78rem;">
[SYSTEM READY] Click "Trace Live Motion Packet" to watch a real-time nanosecond packet traverse the entire VR stack!
          </div>
        </div>
      `;
    },
    init: function() {
      const traceBtn = document.getElementById('s15-trace-btn');
      const cards = document.querySelectorAll('.s15-card');
      const log = document.getElementById('s15-log');

      traceBtn.addEventListener('click', () => {
        let step = 0;
        cards.forEach(c => c.style.borderColor = 'var(--border-color)');

        const interval = setInterval(() => {
          if (step < cards.length) {
            cards.forEach(c => c.style.borderColor = 'var(--border-color)');
            cards[step].style.borderColor = 'var(--neon-cyan)';
            cards[step].style.boxShadow = '0 0 20px rgba(0,229,255,0.4)';
            if (window.vrAudio) window.vrAudio.playTone(320 + step * 120, 0.12);

            if (step === 0) log.innerHTML = `[T+0.0ms] Head rotated +12.4° &rarr; IMU detected angular velocity &rarr; Kalman filter predicts pose.`;
            if (step === 1) log.innerHTML = `[T+2.8ms] OpenXR passes PoseMat4 to Unreal/Unity &rarr; Camera matrices updated &rarr; 640 draw calls submitted.`;
            if (step === 2) log.innerHTML = `[T+7.2ms] GPU renders stereo buffers &rarr; Asynchronous TimeWarp applies lens distortion mesh.`;
            if (step === 3) log.innerHTML = `[T+14.1ms] OLED panel strobed with 0.8ms light pulse &rarr; Photons pass through Pancake lenses &rarr; Retina hits!`;

            step++;
          } else {
            clearInterval(interval);
            cards.forEach(c => c.style.boxShadow = 'none');
            log.innerHTML = `<span style="color: var(--neon-green); font-weight: 700;">✓ PACKET COMPLETED IN 14.1 MILLISECONDS! Zero simulator sickness, perfect presence achieved.</span>`;
            if (window.vrAudio) window.vrAudio.playSuccess();
          }
        }, 400);
      });
    },
    notes: `
      <b>Slide 15 Talking Points:</b>
      <ul>
        <li><b>The Grand Synthesis:</b> This slide brings together everything learned in parts 1 through 14. Show students how all four major subsystems (Sensing, Runtime, GPU Silicon, Photonics) cooperate in strict sequence.</li>
        <li><b>Click the Trace Button:</b> Demonstrate the nanosecond progression of a real packet and show how it stays comfortably inside the 20ms ceiling.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 16: CASE STUDIES & ARCHITECTURAL TRADEOFFS
  // ==========================================
  {
    id: 'slide-16',
    part: 'Industry Case Studies',
    partNumber: 'PART 16',
    title: 'Case Studies: Modern VR Architecture Tradeoffs',
    subtitle: 'Comparing Mobile Standalone (Quest 3), Tethered PC VR (Valve Index), and Multi-Projector CAVE',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%;">
          <!-- Tab Selector -->
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="cyber-btn" id="s16-tab-quest" style="width: 200px;">Mobile Standalone</button>
            <button class="cyber-btn secondary" id="s16-tab-pc" style="width: 200px;">Tethered PC VR</button>
            <button class="cyber-btn secondary" id="s16-tab-cave" style="width: 200px;">Industrial CAVE</button>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- Specs Table Card -->
            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge" id="s16-badge">ARCHITECTURE PROFILE</span>
                <h3 id="s16-name" style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.25rem;">
                  Meta Quest 3 / Apple Vision Pro
                </h3>
                <div id="s16-summary" style="color: var(--text-secondary); font-size: 0.88rem; line-height: 1.5;">
                  All compute, sensors, batteries, and displays are self-contained in a 500g headset. Constrained to 5-8 Watts of thermal dissipation.
                </div>
              </div>

              <div style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-color);">
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem;">HARDWARE METRICS:</div>
                <div id="s16-specs" style="font-family: var(--font-mono); font-size: 0.82rem; color: var(--neon-cyan); line-height: 1.6;">
                  • Compute: Snapdragon XR2 Gen 2 (5-8W SoC)<br>
                  • Tracking: 4x Inside-Out SLAM Cameras<br>
                  • Optics: Pancake Lenses (Folded)<br>
                  • Mobility: 100% Wireless Free-Roaming<br>
                  • Graphic Limit: Mobile shaders, optimized draw calls
                </div>
              </div>
            </div>

            <!-- Pros / Cons Engineering Analysis -->
            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge">ENGINEERING TRADEOFF MATRIX</span>
                <div style="margin: 0.75rem 0;">
                  <div style="font-weight: 700; color: var(--neon-green); font-size: 0.85rem; margin-bottom: 0.25rem;">✓ KEY ADVANTAGES:</div>
                  <div id="s16-pros" style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                    Zero cables, consumer accessibility, instant setup in any room, integrated spatial audio.
                  </div>
                </div>

                <div style="margin: 0.75rem 0;">
                  <div style="font-weight: 700; color: var(--neon-red); font-size: 0.85rem; margin-bottom: 0.25rem;">✕ TECHNICAL LIMITATIONS:</div>
                  <div id="s16-cons" style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.5;">
                    Strict battery life (~2 hours), thermal throttling limits visual fidelity, controller occlusion.
                  </div>
                </div>
              </div>

              <div class="telemetry-box" id="s16-verdict" style="height: 60px; font-size: 0.78rem;">
Primary Use-Case: Consumer gaming, spatial entertainment, portable enterprise training.
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const tabQ = document.getElementById('s16-tab-quest');
      const tabP = document.getElementById('s16-tab-pc');
      const tabC = document.getElementById('s16-tab-cave');
      const badge = document.getElementById('s16-badge');
      const name = document.getElementById('s16-name');
      const summary = document.getElementById('s16-summary');
      const specs = document.getElementById('s16-specs');
      const pros = document.getElementById('s16-pros');
      const cons = document.getElementById('s16-cons');
      const verdict = document.getElementById('s16-verdict');

      const data = {
        quest: {
          badge: 'MOBILE STANDALONE ARCHITECTURE',
          name: 'Meta Quest 3 / Apple Vision Pro',
          summary: 'All compute, tracking, batteries, and displays are integrated inside a 500g chassis. Constrained to 5-8 Watts of thermal dissipation on the user’s face.',
          specs: '• Compute: Snapdragon XR2 Gen 2 / Apple M2+R1\n• Tracking: 4+ Inside-Out SLAM Cameras\n• Optics: Folded Pancake Lenses\n• Mobility: 100% Wireless Free-Roaming\n• Graphic Limit: Mobile tile-based deferred shaders',
          pros: 'Zero cables, massive consumer adoption, instant room setup, integrated spatial audio and hand tracking.',
          cons: 'Strict battery life (~2 hours), thermal limits prevent photorealistic graphics, controller occlusion behind body.',
          verdict: 'Primary Use-Case: Consumer gaming, spatial computing, portable enterprise training.'
        },
        pc: {
          badge: 'TETHERED PC VR ARCHITECTURE',
          name: 'Valve Index / Bigscreen Beyond',
          summary: 'Connects via DisplayPort and USB to a high-end desktop workstation with an NVIDIA RTX GPU (400W+ compute power). Zero battery or thermal limits on the head.',
          specs: '• Compute: Desktop Workstation (RTX 4090 / 64GB RAM)\n• Tracking: SteamVR Lighthouse (Outside-In Lasers)\n• Optics: Dual Micro-OLED or Fresnel @ 144Hz\n• Mobility: Tethered by 5-meter fiber-optic cable\n• Graphic Limit: Real-time photorealistic ray tracing',
          pros: 'Sub-millimeter tracking accuracy, unlimited graphical compute, ultra-low display latency (DisplayPort direct drive).',
          cons: 'Heavy tether cable hampers movement, expensive setup requirement, requires dedicated room with base stations.',
          verdict: 'Primary Use-Case: High-fidelity flight simulators, VR eSports, medical surgical planning.'
        },
        cave: {
          badge: 'CLUSTER CAVE ARCHITECTURE',
          name: 'Industrial Multi-Screen CAVE Facility',
          summary: 'A dedicated room with 3 to 6 projection walls driven by a cluster of multi-GPU server nodes synchronized via InfiniBand and hardware Genlock cables.',
          specs: '• Compute: 4-8 Node Server Cluster (Multi-Quadro GPUs)\n• Tracking: Optical Vicon / OptiTrack Camera Rigs\n• Optics: Active Shutter 3D Glasses (120Hz per eye)\n• Mobility: Natural walking inside projection volume\n• Graphic Limit: Distributed cluster rendering across 4K projectors',
          pros: 'Natural collaborative review without wearing heavy headsets, engineers can see their own hands and colleagues simultaneously.',
          cons: 'Extremely high cost ($250k - $2M+), requires large dedicated facility, complex hardware calibration and maintenance.',
          verdict: 'Primary Use-Case: Automotive design review, aerospace engineering, architectural walkthroughs.'
        }
      };

      function setTab(k) {
        tabQ.className = k === 'quest' ? 'cyber-btn' : 'cyber-btn secondary';
        tabP.className = k === 'pc' ? 'cyber-btn' : 'cyber-btn secondary';
        tabC.className = k === 'cave' ? 'cyber-btn' : 'cyber-btn secondary';

        const d = data[k];
        badge.textContent = d.badge;
        name.textContent = d.name;
        summary.textContent = d.summary;
        specs.innerHTML = d.specs.replace(/\n/g, '<br>');
        pros.textContent = d.pros;
        cons.textContent = d.cons;
        verdict.textContent = d.verdict;
        if (window.vrAudio) window.vrAudio.playClick(420);
      }

      tabQ.addEventListener('click', () => setTab('quest'));
      tabP.addEventListener('click', () => setTab('pc'));
      tabC.addEventListener('click', () => setTab('cave'));
    },
    notes: `
      <b>Slide 16 Talking Points:</b>
      <ul>
        <li><b>There is no "Best" VR System:</b> Emphasize that engineering is always a study of tradeoffs:
          - <i>Standalone:</i> Maximum comfort and freedom, minimum compute.
          - <i>PC VR:</i> Maximum graphical power and tracking precision, restricted by a physical tether cable.
          - <i>CAVE:</i> Maximum collaborative presence, millions of dollars in infrastructure.
        </li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 17: INTERACTIVE CLASSROOM CHALLENGE
  // ==========================================
  {
    id: 'slide-17',
    part: 'Classroom Challenge',
    partNumber: 'PART 17',
    title: 'Classroom Challenge: Test Your VR Architecture IQ',
    subtitle: 'Solve 3 Core Architecture Questions to Verify Mastery of the Real-Time Pipeline',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%;">
          <!-- Quiz Navigation Bar -->
          <div class="content-card" style="padding: 0.6rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="card-badge" id="s17-q-num">QUESTION 1 OF 3</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;" id="s17-q-category">
                  Pipeline Latency
                </span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-cyan);">
                Score: <span id="s17-score" style="color: var(--neon-green); font-weight: 800;">0</span> / 3
              </div>
            </div>
          </div>

          <!-- Question & Options Card -->
          <div class="content-card" style="flex: 1; justify-content: space-around;">
            <div>
              <h3 id="s17-question" style="color: var(--neon-cyan); margin-bottom: 1rem; font-size: 1.15rem;">
                1. What is the maximum acceptable Motion-to-Photon latency before the vestibular mismatch induces simulator sickness?
              </h3>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.6rem;" id="s17-options">
                <button class="cyber-btn secondary s17-opt" data-opt="0" style="text-align: left; padding: 0.8rem; font-size: 0.85rem;">
                  A) 100 milliseconds
                </button>
                <button class="cyber-btn secondary s17-opt" data-opt="1" style="text-align: left; padding: 0.8rem; font-size: 0.85rem;">
                  B) 50 milliseconds
                </button>
                <button class="cyber-btn secondary s17-opt" data-opt="2" style="text-align: left; padding: 0.8rem; font-size: 0.85rem;">
                  C) 20 milliseconds
                </button>
                <button class="cyber-btn secondary s17-opt" data-opt="3" style="text-align: left; padding: 0.8rem; font-size: 0.85rem;">
                  D) 5 milliseconds
                </button>
              </div>
            </div>

            <!-- Feedback Box -->
            <div id="s17-feedback" style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-secondary); display: none;">
            </div>

            <div style="display: flex; justify-content: flex-end; gap: 0.5rem;">
              <button class="cyber-btn" id="s17-next-btn" style="display: none;">Next Question →</button>
              <button class="cyber-btn secondary" id="s17-restart-btn">Restart Quiz</button>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      let currentQ = 0;
      let score = 0;
      let answered = false;

      const questions = [
        {
          num: 'QUESTION 1 OF 3',
          cat: 'Pipeline Latency',
          q: '1. What is the maximum acceptable Motion-to-Photon latency before vestibular mismatch induces simulator sickness?',
          options: ['A) 100 milliseconds', 'B) 50 milliseconds', 'C) 20 milliseconds', 'D) 5 milliseconds'],
          correct: 2,
          expl: 'Correct! 20 milliseconds is the universal threshold. Above 20ms, the lag between inner-ear acceleration and retina photons violates human biological tolerance, inducing nausea.'
        },
        {
          num: 'QUESTION 2 OF 3',
          cat: 'Rendering Shaders',
          q: '2. Which critical graphics technique re-projects an already-rendered frame right before scanout if the game engine drops a frame?',
          options: ['A) Screen-Space Ambient Occlusion (SSAO)', 'B) Asynchronous TimeWarp (ATW)', 'C) Mipmap Filtering', 'D) Ray-Traced Global Illumination'],
          correct: 1,
          expl: 'Correct! Asynchronous TimeWarp (ATW) is a high-priority compute pass that re-samples and rotates the prior rendered frame to match the latest IMU orientation, preventing horizon stutter.'
        },
        {
          num: 'QUESTION 3 OF 3',
          cat: 'Tracking & Kinematics',
          q: '3. Why is 6-DOF tracking mandatory instead of 3-DOF for true room-scale immersion without nausea?',
          options: ['A) It doubles the screen resolution', 'B) It provides translational motion parallax matching natural neck/body movement', 'C) It lowers headset battery consumption', 'D) It allows the GPU to skip vertex shading'],
          correct: 1,
          expl: 'Correct! When humans lean or step, the neck translates (X, Y, Z). 3-DOF only detects rotation; without translational parallax, the virtual world appears glued to your skull, triggering severe disorientation.'
        }
      ];

      const qNum = document.getElementById('s17-q-num');
      const qCat = document.getElementById('s17-q-category');
      const qText = document.getElementById('s17-question');
      const optBtns = document.querySelectorAll('.s17-opt');
      const feedback = document.getElementById('s17-feedback');
      const nextBtn = document.getElementById('s17-next-btn');
      const restartBtn = document.getElementById('s17-restart-btn');
      const scoreText = document.getElementById('s17-score');

      function loadQuestion(idx) {
        answered = false;
        const item = questions[idx];
        qNum.textContent = item.num;
        qCat.textContent = item.cat;
        qText.textContent = item.q;
        feedback.style.display = 'none';
        nextBtn.style.display = 'none';

        optBtns.forEach((btn, i) => {
          btn.textContent = item.options[i];
          btn.className = 'cyber-btn secondary s17-opt';
          btn.disabled = false;
        });
      }

      optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          if (answered) return;
          answered = true;
          const choice = parseInt(btn.getAttribute('data-opt'));
          const item = questions[currentQ];

          optBtns.forEach(b => b.disabled = true);

          if (choice === item.correct) {
            btn.className = 'cyber-btn s17-opt';
            btn.style.background = 'rgba(0, 255, 157, 0.2)';
            btn.style.borderColor = 'var(--neon-green)';
            feedback.style.display = 'block';
            feedback.innerHTML = `<span style="color: var(--neon-green); font-weight: 700;">✓ Correct!</span> ${item.expl}`;
            score++;
            scoreText.textContent = score;
            if (window.vrAudio) window.vrAudio.playSuccess();
          } else {
            btn.style.background = 'rgba(255, 75, 75, 0.2)';
            btn.style.borderColor = 'var(--neon-red)';
            optBtns[item.correct].className = 'cyber-btn s17-opt';
            optBtns[item.correct].style.borderColor = 'var(--neon-green)';
            feedback.style.display = 'block';
            feedback.innerHTML = `<span style="color: var(--neon-red); font-weight: 700;">✕ Incorrect.</span> ${item.expl}`;
            if (window.vrAudio) window.vrAudio.playBuzz();
          }

          if (currentQ < questions.length - 1) {
            nextBtn.style.display = 'inline-flex';
          } else {
            feedback.innerHTML += `<div style="margin-top: 0.5rem; font-weight: 700; color: var(--neon-cyan);">Challenge Complete! Final Score: ${score} / 3.</div>`;
          }
        });
      });

      nextBtn.addEventListener('click', () => {
        currentQ++;
        loadQuestion(currentQ);
        if (window.vrAudio) window.vrAudio.playClick(400);
      });

      restartBtn.addEventListener('click', () => {
        currentQ = 0;
        score = 0;
        scoreText.textContent = '0';
        loadQuestion(0);
        if (window.vrAudio) window.vrAudio.playClick(300);
      });

      loadQuestion(0);
    },
    notes: `
      <b>Slide 17 Talking Points:</b>
      <ul>
        <li><b>Active Classroom Engagement:</b> Call on students to answer each question before clicking.</li>
        <li><b>Review Core Principles:</b> Reinforce the 20ms motion-to-photon rule, Asynchronous TimeWarp (ATW), and 6-DOF parallax mechanics.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 18: SUMMARY & GRAND VR MENTAL MODEL
  // ==========================================
  {
    id: 'slide-18',
    part: 'Conclusion',
    partNumber: 'PART 18',
    title: 'The Grand VR Mental Model & Summary',
    subtitle: 'Key Engineering Takeaways for Architects, Systems Designers, and Software Engineers',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge">THE THREE CARDINAL RULES OF VR</span>
              <div style="display: flex; flex-direction: column; gap: 0.75rem; margin-top: 0.75rem;">
                <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: var(--radius-sm); padding: 0.75rem;">
                  <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.9rem;">1. Respect the Biological Clock</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    Motion-to-Photon must stay under <b>20 milliseconds</b>. Dropping frames is not just a visual defect—it causes physical illness.
                  </div>
                </div>

                <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: var(--radius-sm); padding: 0.75rem;">
                  <div style="font-weight: 700; color: var(--neon-purple); font-size: 0.9rem;">2. Decouple Tracking from Network</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    Local head orientation must never wait on remote servers. Use client prediction, dead reckoning, and ATW to maintain 90+ FPS locally.
                  </div>
                </div>

                <div style="background: rgba(0, 255, 157, 0.05); border: 1px solid rgba(0, 255, 157, 0.2); border-radius: var(--radius-sm); padding: 0.75rem;">
                  <div style="font-weight: 700; color: var(--neon-green); font-size: 0.9rem;">3. Optics and Silicon Must Cooperate</div>
                  <div style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    Barrel distortion shaders pre-warp images for Pancake lenses; low-persistence strobed displays freeze motion on the human retina.
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="cyber-btn" id="s18-replay-btn" style="flex: 1;">
                <span>🎬 Replay Master Boot Sequence</span>
              </button>
              <button class="cyber-btn secondary" id="s18-overview-btn" style="flex: 1;">
                <span>📑 Open All 18 Slides</span>
              </button>
            </div>
          </div>

          <!-- Final Architectural Diagram Card -->
          <div class="content-card" style="align-items: center; justify-content: center; text-align: center;">
            <span class="card-badge">THE IMMERSIVE COMPUTING HORIZON</span>
            <div style="font-size: 3rem; margin: 0.5rem 0;" aria-hidden="true">🌐 🥽 ⚡</div>
            <h3 style="color: var(--neon-cyan); margin-bottom: 0.5rem;">
              Virtual Reality Architecture
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.6; max-width: 420px;">
              You have traced the journey of physical head motion across IMU sensors, Kalman fusion, stereo GPU rasterization, Asynchronous TimeWarp, and folded pancake optics.
            </p>
            <div style="margin-top: 1rem; padding: 0.6rem 1rem; border-radius: var(--radius-sm); background: rgba(0, 229, 255, 0.1); border: 1px solid var(--neon-cyan); font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan);">
              Press [Esc] or [O] anytime to view the Full Curriculum Matrix
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const replayBtn = document.getElementById('s18-replay-btn');
      const overviewBtn = document.getElementById('s18-overview-btn');

      replayBtn.addEventListener('click', () => {
        if (window.app) window.app.replayBootAnimation();
      });

      overviewBtn.addEventListener('click', () => {
        if (window.app) window.app.toggleOverview();
      });
    },
    notes: `
      <b>Slide 18 Talking Points:</b>
      <ul>
        <li><b>Closing Summary:</b> Congratulate students on understanding the full end-to-end architecture of virtual reality.</li>
        <li><b>Open Floor for Q&A:</b> Ask if anyone has questions regarding how future headsets (e.g. varifocal lenses, foveated rendering with eye tracking, neural reprojection) build upon this 18-step foundation.</li>
      </ul>
    `
  }
];

/**
 * VR Architecture: From Head Movement to Photons
 * 18-Slide High-Fidelity 3D WebGL Interactive Presentation
 */

window.vrSlidesData = [
  // ==========================================
  // SLIDE 1: HOOK / INTRODUCTION (3D HEADSET)
  // ==========================================
  {
    id: 'slide-1',
    part: 'Introduction',
    partNumber: 'PART 1',
    title: 'VR Architecture: The Immersive Illusion',
    subtitle: 'Transforming Physical Head Movement into Photons Under 20 Milliseconds',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">THE CORE CHALLENGE</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.25rem;">
              How Do We Fool the Human Brain?
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.5; font-size: 0.9rem; margin-bottom: 0.75rem;">
              When you turn your head, your vestibular inner ear detects motion instantly.
              In VR, sensors must detect that motion, update the 3D world, render two distinct eye perspectives, and emit light onto your retinas—all in <b>less than 20 milliseconds</b>.
            </p>

            <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: var(--radius-sm); padding: 0.75rem; margin-bottom: 0.75rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.35rem;">
                <span style="font-weight: 700; color: var(--neon-cyan); font-size: 0.8rem;">MOTION-TO-PHOTON BUDGET</span>
                <span style="font-family: var(--font-mono); color: var(--neon-green); font-weight: 700; font-size: 0.8rem;">&lt; 20ms STRICT THRESHOLD</span>
              </div>
              <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: 3px; overflow: hidden;">
                <div style="width: 75%; height: 100%; background: linear-gradient(90deg, var(--neon-green), var(--neon-cyan));"></div>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-muted); margin-top: 0.35rem;">
                Exceeding 20ms breaks presence and induces severe simulator sickness.
              </div>
            </div>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Head Yaw Angle:</span>
                <input type="range" class="cyber-slider" id="s1-yaw-slider" min="-90" max="90" value="0">
                <span class="telemetry-value" id="s1-yaw-val">0°</span>
              </div>
              <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
                <button class="cyber-btn" id="s1-packet-btn" style="flex: 1;">
                  <span>⚡ Fire Motion Packet</span>
                </button>
                <button class="cyber-btn secondary" id="s1-reset-btn">Reset</button>
              </div>
            </div>
          </div>

          <!-- 3D Three.js WebGL Headset Canvas -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s1-3d-container">
              <div class="three-overlay-badge">🥽 3D REAL-TIME HMD MODEL</div>
              <div class="three-drag-hint">🖱️ Drag to Orbit 360°</div>
            </div>
            <div id="s1-status" style="font-size: 0.78rem; font-family: var(--font-mono); color: var(--neon-cyan); text-align: center; margin-top: 0.4rem;">
              Virtual Eye Pose: Yaw 0.0° | Latency: 11.2ms (Nominal)
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const slider = document.getElementById('s1-yaw-slider');
      const valText = document.getElementById('s1-yaw-val');
      const status = document.getElementById('s1-status');
      const packetBtn = document.getElementById('s1-packet-btn');
      const resetBtn = document.getElementById('s1-reset-btn');
      const container = document.getElementById('s1-3d-container');

      if (!container || !window.VR3D) return;

      const { group: headset, plate, leftLens, rightLens } = window.VR3D.createHeadset();
      const sceneData = window.VR3D.initScene(container, {
        targetGroup: headset,
        camZ: 3.2,
        camY: 0.8,
        onRotate: (y) => {
          const deg = Math.round(THREE.MathUtils.radToDeg(y));
          if (slider) slider.value = Math.max(-90, Math.min(90, deg));
          if (valText) valText.textContent = `${deg > 0 ? '+' : ''}${deg}°`;
        }
      });

      if (!sceneData) return;
      sceneData.scene.add(headset);

      // Packet burst particle
      const packetGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x00FF9D });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      packet.visible = false;
      sceneData.scene.add(packet);

      let isPulsing = false;
      let packetT = 0;

      sceneData.animate((time) => {
        headset.position.y = Math.sin(time * 0.002) * 0.06;
        if (isPulsing) {
          packetT += 0.05;
          packet.position.set(0, 0, 1.8 - packetT * 2.2);
          if (packetT >= 1) {
            isPulsing = false;
            packet.visible = false;
            plate.material.emissiveIntensity = 0.2;
            leftLens.material.emissiveIntensity = 0.6;
            rightLens.material.emissiveIntensity = 0.6;
          }
        }
      });

      if (slider) {
        slider.addEventListener('input', (e) => {
          const val = parseFloat(e.target.value);
          valText.textContent = `${val > 0 ? '+' : ''}${val}°`;
          headset.rotation.y = THREE.MathUtils.degToRad(val);
          status.innerHTML = `Virtual Eye Pose: Yaw ${val}° | IMU Rate: 1000Hz | Latency: 11.2ms`;
          if (window.vrAudio) window.vrAudio.playClick(300 + Math.abs(val) * 4);
        });
      }

      if (packetBtn) {
        packetBtn.addEventListener('click', () => {
          isPulsing = true;
          packetT = 0;
          packet.visible = true;
          plate.material.emissiveIntensity = 0.9;
          leftLens.material.emissiveIntensity = 1.2;
          rightLens.material.emissiveIntensity = 1.2;
          status.innerHTML = `<span style="color: var(--neon-green)">⚡ Motion Packet Routed → Engine Tick → Dual Draw Call → Photons! (12.4ms)</span>`;
          if (window.vrAudio) window.vrAudio.playDataPacket();
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener('click', () => {
          if (slider) slider.value = 0;
          if (valText) valText.textContent = '0°';
          headset.rotation.set(0, 0, 0);
          status.innerHTML = 'Virtual Eye Pose: Yaw 0.0° | Latency: 11.2ms (Nominal)';
          if (window.vrAudio) window.vrAudio.playClick(240);
        });
      }
    },
    notes: `
      <b>Slide 1 Talking Points:</b>
      <ul>
        <li><b>Hook the class:</b> Ask: "When you turn your head in the real world, why doesn't reality lag?" Explain that human vision combined with the inner-ear vestibular system operates with sub-microsecond latency.</li>
        <li><b>The 20ms Rule:</b> Introduce the golden metric of VR engineering: <i>Motion-to-Photon latency must stay strictly below 20 milliseconds</i>. Anything longer triggers simulator sickness.</li>
        <li><b>Interactive 3D Model:</b> Drag directly with your mouse to orbit the 3D VR Headset in full 360°, and click "Fire Motion Packet" to watch the photon loop.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 2: WHAT HAPPENS WHEN YOU MOVE YOUR HEAD? (3D AVATAR HEAD)
  // ==========================================
  {
    id: 'slide-2',
    part: 'The Motion Pipeline',
    partNumber: 'PART 2',
    title: 'What Happens When You Move Your Head?',
    subtitle: 'The 6-Step Pipeline from Mechanical Movement to Light Emitted by Pixels',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%;">
          <!-- Pipeline Stages Grid -->
          <div class="pipeline-track" id="s2-pipeline">
            <div class="pipeline-step active" data-step="1">
              <div class="step-num">01</div>
              <div class="step-title">IMU Sampling</div>
              <div class="step-desc">1000Hz Gyro & Accelerometer</div>
            </div>
            <div class="pipeline-step" data-step="2">
              <div class="step-num">02</div>
              <div class="step-title">Sensor Fusion</div>
              <div class="step-desc">Kalman filter merges optical SLAM</div>
            </div>
            <div class="pipeline-step" data-step="3">
              <div class="step-num">03</div>
              <div class="step-title">Engine Update</div>
              <div class="step-desc">Updates camera matrix & scene</div>
            </div>
            <div class="pipeline-step" data-step="4">
              <div class="step-num">04</div>
              <div class="step-title">Stereo Render</div>
              <div class="step-desc">Draws Left & Right viewports</div>
            </div>
            <div class="pipeline-step" data-step="5">
              <div class="step-num">05</div>
              <div class="step-title">Warp & Scanout</div>
              <div class="step-desc">Asynchronous TimeWarp (ATW)</div>
            </div>
            <div class="pipeline-step" data-step="6">
              <div class="step-num">06</div>
              <div class="step-title">Retina Photons</div>
              <div class="step-desc">Lenses focus light on retina</div>
            </div>
          </div>

          <!-- 3D Head Simulator & Controls -->
          <div class="split-layout" style="flex: 1;">
            <div class="content-card" style="padding: 0.5rem;">
              <div class="three-canvas-container" id="s2-3d-container">
                <div class="three-overlay-badge">👤 3D HEAD KINEMATICS</div>
                <div class="three-drag-hint">🖱️ Move Sliders or Drag</div>
              </div>
            </div>

            <div class="content-card" style="justify-content: space-between;">
              <div>
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

              <div class="telemetry-box" id="s2-telemetry" style="height: 90px; font-size: 0.78rem;">
[IMU STREAM] Status: Active (1000 Hz)
Orientation Quat: Q(0.000, 0.000, 0.000, 1.000)
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
      const container = document.getElementById('s2-3d-container');

      if (!container || !window.VR3D) return;

      const { root: headRoot } = window.VR3D.createHeadWithHMD();
      const sceneData = window.VR3D.initScene(container, {
        targetGroup: headRoot,
        camZ: 2.8,
        camY: 0.3
      });

      if (!sceneData) return;
      sceneData.scene.add(headRoot);
      sceneData.animate();

      function updatePose() {
        const y = parseFloat(yaw.value);
        const p = parseFloat(pitch.value);
        const r = parseFloat(roll.value);

        yawVal.textContent = `${y}°`;
        pitchVal.textContent = `${p}°`;
        rollVal.textContent = `${r}°`;

        headRoot.rotation.y = THREE.MathUtils.degToRad(y);
        headRoot.rotation.x = THREE.MathUtils.degToRad(p);
        headRoot.rotation.z = THREE.MathUtils.degToRad(r);

        telemetry.innerHTML = `[IMU STREAM] Status: Active (1000 Hz)
Euler Angles: Yaw=${y}°, Pitch=${p}°, Roll=${r}°
Calculated View Matrix: Mat4x4 Rotated
Current Motion Delta: ${Math.hypot(y, p, r).toFixed(1)}°
Pipeline Latency: ${(12.5 + Math.hypot(y, p, r) * 0.05).toFixed(1)} ms (NOMINAL)`;

        steps.forEach(s => s.classList.remove('active'));
        if (steps[0]) steps[0].classList.add('active');
        if (steps[1]) steps[1].classList.add('active');
        if (window.vrAudio) window.vrAudio.playClick(380);
      }

      [yaw, pitch, roll].forEach(input => {
        if (input) input.addEventListener('input', updatePose);
      });
    },
    notes: `
      <b>Slide 2 Talking Points:</b>
      <ul>
        <li><b>Walk through the 6 stages:</b>
          1. <i>IMU Sampling</i> (fast, 1000Hz, prone to drift)
          2. <i>Sensor Fusion</i> (Kalman filter combines optical cameras with IMU)
          3. <i>Engine Update</i> (Unreal/Unity camera transform)
          4. <i>Stereo Render</i> (Dual cameras for left and right eyes)
          5. <i>Warp & Scanout</i> (Barrel distortion correction + ATW)
          6. <i>Retina Photons</i> (Light focused by lenses).
        </li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 3: VR SYSTEM ARCHITECTURE (3D LAYER STACK)
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
          <div style="display: flex; flex-direction: column; gap: 0.5rem;">
            <div class="content-card clickable-layer active" data-layer="1" style="cursor: pointer; padding: 0.6rem 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">1. Physical & Human Layer</div>
                <span class="card-badge">INPUT</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Head kinematics, IPD, vestibular organs, hand controllers.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="2" style="cursor: pointer; padding: 0.6rem 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">2. Sensor & Tracking Layer</div>
                <span class="card-badge">FUSION</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                6-DOF IMU, SLAM infrared cameras, Kalman pose estimation.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="3" style="cursor: pointer; padding: 0.6rem 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">3. Runtime & Engine Layer</div>
                <span class="card-badge">COMPUTE</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                OpenXR runtime, scene graph, physics simulation, spatial audio.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="4" style="cursor: pointer; padding: 0.6rem 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">4. Graphics & Rendering Layer</div>
                <span class="card-badge">GPU</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Stereo frustum rasterization, shader passes, Asynchronous TimeWarp.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="5" style="cursor: pointer; padding: 0.6rem 0.8rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 700; color: var(--neon-cyan);">5. Optical & Display Layer</div>
                <span class="card-badge">OUTPUT</span>
              </div>
              <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                Fast-switch LCD/OLED panels, Pancake lenses, ocular eyebox.
              </div>
            </div>
          </div>

          <!-- 3D Holographic Layer Canvas -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s3-3d-container">
              <div class="three-overlay-badge" id="s3-layer-badge">LAYERS: 1 TO 5 STACK</div>
              <div class="three-drag-hint">🖱️ Drag to Tilt Stack</div>
            </div>
            <div id="s3-detail-specs" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--neon-green); text-align: center; margin-top: 0.4rem;">
              • Human IPD: 55mm-72mm • Biological Latency: &lt;5ms
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const layers = document.querySelectorAll('.clickable-layer');
      const badge = document.getElementById('s3-layer-badge');
      const specs = document.getElementById('s3-detail-specs');
      const container = document.getElementById('s3-3d-container');

      if (!container || !window.VR3D) return;

      const group = new THREE.Group();
      const plates = [];
      const colors = [0x00E5FF, 0x8B5CF6, 0x00FF9D, 0xFFB800, 0xFF0077];

      for (let i = 0; i < 5; i++) {
        const geo = new THREE.BoxGeometry(2.4, 0.08, 1.4);
        const mat = new THREE.MeshStandardMaterial({
          color: colors[i],
          metalness: 0.8,
          roughness: 0.2,
          transparent: true,
          opacity: 0.85
        });
        const p = new THREE.Mesh(geo, mat);
        p.position.y = (i - 2) * 0.45;
        group.add(p);
        plates.push(p);
      }

      const sceneData = window.VR3D.initScene(container, {
        targetGroup: group,
        camZ: 3.2,
        camY: 0.5,
        initRotX: 0.2,
        initRotY: -0.4
      });

      if (!sceneData) return;
      sceneData.scene.add(group);

      sceneData.animate((time) => {
        group.rotation.y += 0.003;
      });

      const data = {
        '1': '• Human IPD: 55mm-72mm • Biological Latency: <5ms direct response',
        '2': '• IMU Sampling: 1000Hz • Optical Cameras: 60-120FPS • Sub-mm Precision',
        '3': '• Runtime API: OpenXR • CPU Budget: ~3.5ms • Collision & Spatial Audio',
        '4': '• Resolution: 2064x2208 per eye • GPU Render: ~6.5ms • ATW Reprojection',
        '5': '• Panels: 120Hz Fast-Switch LCD • Optics: Folded Pancake • Low Persistence'
      };

      layers.forEach(layer => {
        layer.addEventListener('click', () => {
          layers.forEach(l => l.classList.remove('active'));
          layer.classList.add('active');
          const id = layer.getAttribute('data-layer');
          const idx = parseInt(id) - 1;

          plates.forEach((p, i) => {
            p.scale.set(i === idx ? 1.15 : 1, i === idx ? 1.5 : 1, i === idx ? 1.15 : 1);
            p.material.opacity = i === idx ? 1.0 : 0.4;
          });

          badge.textContent = `LAYER ${id}: ${layer.querySelector('.card-badge').textContent}`;
          specs.textContent = data[id];
          if (window.vrAudio) window.vrAudio.playClick(450);
        });
      });
    },
    notes: `
      <b>Slide 3 Talking Points:</b>
      <ul>
        <li><b>The 5 Architecture Layers:</b> VR is a closed feedback loop across 5 distinct engineering layers: Human Anatomy &rarr; Physics/Sensors &rarr; OS/Runtime &rarr; GPU Silicon &rarr; Optical Physics.</li>
        <li><b>Interactivity:</b> Click each layer to isolate its position in the 3D stack.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 4: HARDWARE LAYER EXPLORER (3D EXPLODED VIEW)
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
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;">
            <div class="content-card hw-card active" data-hw="imu" style="cursor: pointer; padding: 0.6rem;">
              <div style="font-size: 1.1rem;">🧭</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">MEMS IMU</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">1000Hz Gyro & Accelerometer</div>
            </div>

            <div class="content-card hw-card" data-hw="cameras" style="cursor: pointer; padding: 0.6rem;">
              <div style="font-size: 1.1rem;">📷</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">Tracking Cameras</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">4x Global Shutter IR</div>
            </div>

            <div class="content-card hw-card" data-hw="soc" style="cursor: pointer; padding: 0.6rem;">
              <div style="font-size: 1.1rem;">⚡</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">Compute SoC / GPU</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">Snapdragon XR2 / Desktop GPU</div>
            </div>

            <div class="content-card hw-card" data-hw="display" style="cursor: pointer; padding: 0.6rem;">
              <div style="font-size: 1.1rem;">🖥️</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">Display Panels</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">Fast-Switch LCD @ 120Hz</div>
            </div>

            <div class="content-card hw-card" data-hw="optics" style="cursor: pointer; padding: 0.6rem;">
              <div style="font-size: 1.1rem;">🔍</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">Pancake Optics</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">Polarized Folded Light Path</div>
            </div>

            <div class="content-card hw-card" data-hw="audio" style="cursor: pointer; padding: 0.6rem;">
              <div style="font-size: 1.1rem;">🎧</div>
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">Spatial Audio DSP</div>
              <div style="font-size: 0.72rem; color: var(--text-secondary);">HRTF 3D Binaural Sound</div>
            </div>
          </div>

          <!-- 3D Exploded Headset View -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s4-3d-container">
              <div class="three-overlay-badge" id="s4-badge">EXPLODED HARDWARE VIEW</div>
              <div class="three-drag-hint">🖱️ Drag to Inspect Internals</div>
            </div>
            <div id="s4-desc" style="font-size: 0.78rem; color: var(--text-secondary); text-align: center; margin-top: 0.4rem;">
              Click any component to highlight its location in the exploded 3D assembly.
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const cards = document.querySelectorAll('.hw-card');
      const badge = document.getElementById('s4-badge');
      const desc = document.getElementById('s4-desc');
      const container = document.getElementById('s4-3d-container');

      if (!container || !window.VR3D) return;

      const group = new THREE.Group();

      // Front plate
      const plateGeo = new THREE.BoxGeometry(1.6, 0.9, 0.08);
      const plateMat = new THREE.MeshStandardMaterial({ color: 0x05070A, metalness: 0.9, roughness: 0.1 });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      plate.position.z = 0.8;
      group.add(plate);

      // Display panel
      const dispGeo = new THREE.BoxGeometry(1.4, 0.7, 0.05);
      const dispMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF });
      const disp = new THREE.Mesh(dispGeo, dispMat);
      disp.position.z = 0.3;
      group.add(disp);

      // Dual Pancake Lenses
      const lensGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 24);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.8 });
      const lensL = new THREE.Mesh(lensGeo, lensMat);
      lensL.rotation.x = Math.PI / 2;
      lensL.position.set(-0.35, 0, -0.3);
      const lensR = lensL.clone();
      lensR.position.x = 0.35;
      group.add(lensL);
      group.add(lensR);

      // IMU Chip (Glowing gold cube in center)
      const imuGeo = new THREE.BoxGeometry(0.18, 0.18, 0.18);
      const imuMat = new THREE.MeshStandardMaterial({ color: 0xFFB800, emissive: 0xFFB800, emissiveIntensity: 0.8 });
      const imu = new THREE.Mesh(imuGeo, imuMat);
      imu.position.set(0, 0, 0);
      group.add(imu);

      const sceneData = window.VR3D.initScene(container, {
        targetGroup: group,
        camZ: 3.0,
        camY: 0.6,
        initRotX: 0.2,
        initRotY: -0.5
      });

      if (!sceneData) return;
      sceneData.scene.add(group);

      sceneData.animate((time) => {
        imu.rotation.y += 0.02;
        group.rotation.y += 0.002;
      });

      const data = {
        'imu': { badge: 'MEMS IMU (1000HZ)', desc: 'Measures angular velocity & acceleration at 1ms intervals before cameras complete a frame.' },
        'cameras': { badge: '4X IR CAMERAS', desc: 'Global shutter cameras track environmental feature points to triangulate 6-DOF position.' },
        'soc': { badge: 'COMPUTE SOC & GPU', desc: 'Snapdragon XR2 / Desktop GPU constrained within a strict thermal and power budget.' },
        'display': { badge: 'FAST-SWITCH LCD / OLED', desc: 'Sub-millisecond pixel response time with strobed backlight eliminates motion blur.' },
        'optics': { badge: 'FOLDED PANCAKE LENSES', desc: 'Polarized light bouncing cuts optical depth in half, reducing front-heavy torque on the neck.' },
        'audio': { badge: 'SPATIAL AUDIO DSP', desc: 'Calculates Head-Related Transfer Functions (HRTF) for 3D binaural sound pinpointing.' }
      };

      cards.forEach(card => {
        card.addEventListener('click', () => {
          cards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const hw = card.getAttribute('data-hw');
          if (data[hw]) {
            badge.textContent = data[hw].badge;
            desc.textContent = data[hw].desc;
            if (window.vrAudio) window.vrAudio.playClick(500);
          }
        });
      });
    },
    notes: `
      <b>Slide 4 Talking Points:</b>
      <ul>
        <li><b>Hardware Constraints:</b> Contrast standalone headsets (constrained to 5-8 Watts on your face) with tethered PC headsets (unlimited power, 400W RTX GPU).</li>
        <li><b>The Low Persistence Trick:</b> Explain why standard phone displays smear horribly in VR: they illuminate continuously. VR displays strobe for &lt;1ms to freeze photons on the retina.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 5: HEAD-COUPLED DISPLAY (3-DOF VS 6-DOF)
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
            <div style="display: flex; gap: 0.5rem; margin: 0.5rem 0;">
              <button class="cyber-btn" id="s5-mode-6dof" style="flex: 1;">6-DOF Mode (Full VR)</button>
              <button class="cyber-btn secondary" id="s5-mode-3dof" style="flex: 1;">3-DOF Mode (Cardboard)</button>
            </div>

            <div class="control-panel">
              <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.78rem; margin-bottom: 0.2rem;">ROTATION (3-DOF):</div>
              <div class="control-row">
                <span class="control-label">Yaw (Y-Rot):</span>
                <input type="range" class="cyber-slider" id="s5-yaw" min="-45" max="45" value="0">
                <span class="telemetry-value" id="s5-yaw-val">0°</span>
              </div>

              <div style="font-weight: 700; color: var(--neon-purple); font-size: 0.78rem; margin: 0.5rem 0 0.2rem 0;">TRANSLATION (6-DOF ONLY):</div>
              <div class="control-row">
                <span class="control-label">Position X:</span>
                <input type="range" class="cyber-slider" id="s5-posx" min="-40" max="40" value="0">
                <span class="telemetry-value" id="s5-posx-val">0cm</span>
              </div>
              <div class="control-row">
                <span class="control-label">Position Z:</span>
                <input type="range" class="cyber-slider" id="s5-posz" min="-40" max="40" value="0">
                <span class="telemetry-value" id="s5-posz-val">0cm</span>
              </div>
            </div>

            <div id="s5-warning" style="margin-top: 0.5rem; font-size: 0.78rem; color: var(--neon-green); font-family: var(--font-mono);">
              ✓ 6-DOF Active: Full motion parallax matches inner-ear vestibular acceleration.
            </div>
          </div>

          <!-- 3D Room with Foreground Pillars & Parallax Objects -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s5-3d-container">
              <div class="three-overlay-badge">🏛️ 3D MOTION PARALLAX ROOM</div>
              <div class="three-drag-hint">Leaning reveals hidden objects!</div>
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
      const posX = document.getElementById('s5-posx');
      const posZ = document.getElementById('s5-posz');
      const yawVal = document.getElementById('s5-yaw-val');
      const posXVal = document.getElementById('s5-posx-val');
      const posZVal = document.getElementById('s5-posz-val');
      const warning = document.getElementById('s5-warning');
      const container = document.getElementById('s5-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.5, camY: 0.5 });
      if (!sceneData) return;

      // Foreground pillar that occludes background
      const pillarGeo = new THREE.CylinderGeometry(0.2, 0.2, 2.2, 16);
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8 });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(0, 0, 0.8);
      sceneData.scene.add(pillar);

      // Hidden glowing object behind pillar
      const orbGeo = new THREE.SphereGeometry(0.28, 24, 24);
      const orbMat = new THREE.MeshStandardMaterial({ color: 0x00FF9D, emissive: 0x00FF9D, emissiveIntensity: 0.6 });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(0, 0, -1.0);
      sceneData.scene.add(orb);

      sceneData.animate((time) => {
        orb.rotation.y = time * 0.002;
      });

      function updateCamera() {
        const y = parseFloat(yaw.value);
        let x = parseFloat(posX.value);
        let z = parseFloat(posZ.value);

        yawVal.textContent = `${y}°`;

        if (!is6DOF) {
          x = 0;
          z = 0;
          posXVal.textContent = 'LOCKED (0cm)';
          posZVal.textContent = 'LOCKED (0cm)';
          warning.innerHTML = `<span style="color: var(--neon-red);">⚠️ 3-DOF LIMITATION: Neck translation ignored! Background stays occluded &rarr; Vestibular mismatch induces nausea!</span>`;
        } else {
          posXVal.textContent = `${x}cm`;
          posZVal.textContent = `${z}cm`;
          warning.innerHTML = `<span style="color: var(--neon-green);">✓ 6-DOF Active: Moving sideways reveals the green orb hidden behind the pillar!</span>`;
        }

        sceneData.camera.position.x = (x / 40) * 1.5;
        sceneData.camera.position.z = 3.5 - (z / 40) * 1.2;
        sceneData.camera.rotation.y = -THREE.MathUtils.degToRad(y);
        if (window.vrAudio) window.vrAudio.playClick(320);
      }

      [yaw, posX, posZ].forEach(el => {
        if (el) el.addEventListener('input', updateCamera);
      });

      btn6.addEventListener('click', () => {
        is6DOF = true;
        btn6.className = 'cyber-btn';
        btn3.className = 'cyber-btn secondary';
        posX.disabled = false;
        posZ.disabled = false;
        updateCamera();
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btn3.addEventListener('click', () => {
        is6DOF = false;
        btn3.className = 'cyber-btn';
        btn6.className = 'cyber-btn secondary';
        posX.disabled = true;
        posZ.disabled = true;
        updateCamera();
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 5 Talking Points:</b>
      <ul>
        <li><b>The Failure of Google Cardboard:</b> Why did early phone VR fail? Because when a user leans forward, their neck naturally translates. If the software only detects rotation, the virtual world moves <i>with</i> the user rather than staying fixed, triggering vestibular mismatch.</li>
        <li><b>Demonstrate Parallax:</b> Show how leaning sideways in 6-DOF mode reveals the hidden green orb behind the pillar!</li>
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
        <div style="display: flex; flex-direction: column; gap: 0.8rem; height: 100%;">
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="cyber-btn" id="s6-mode-inside" style="width: 220px;">Inside-Out (SLAM)</button>
            <button class="cyber-btn secondary" id="s6-mode-outside" style="width: 220px;">Outside-In (Lighthouse)</button>
            <button class="cyber-btn secondary" id="s6-occlude-btn" style="width: 200px;">Simulate Occlusion</button>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- 3D Tracking Rays Visualizer -->
            <div class="content-card" style="padding: 0.5rem; position: relative;">
              <div class="three-canvas-container" id="s6-3d-container">
                <div class="three-overlay-badge" id="s6-canvas-badge">INSIDE-OUT: 4X SLAM TRACKING RAYS</div>
                <div class="three-drag-hint">🖱️ Drag to View Room Tracking</div>
              </div>
            </div>

            <!-- Tradeoff Telemetry -->
            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge">ENGINEERING COMPARISON</span>
                <h3 id="s6-tech-title" style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
                  Inside-Out SLAM Tracking
                </h3>
                <div id="s6-tech-desc" style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">
                  Cameras mounted on the headset continuously extract 2D feature points from the room, matching them across frames to triangulate 3D position in real time.
                </div>
              </div>

              <div class="telemetry-box" id="s6-telemetry" style="height: 100px; font-size: 0.78rem;">
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
      const badge = document.getElementById('s6-canvas-badge');
      const title = document.getElementById('s6-tech-title');
      const desc = document.getElementById('s6-tech-desc');
      const telem = document.getElementById('s6-telemetry');
      const container = document.getElementById('s6-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.2, camY: 0.8 });
      if (!sceneData) return;

      // Headset in center
      const { group: hmd } = window.VR3D.createHeadset();
      hmd.scale.set(0.7, 0.7, 0.7);
      sceneData.scene.add(hmd);

      // Inside-Out Tracking Frustum Cones
      const cones = [];
      const coneAngles = [
        { rotY: 0.4, rotX: 0.3 }, { rotY: -0.4, rotX: 0.3 },
        { rotY: 0.4, rotX: -0.3 }, { rotY: -0.4, rotX: -0.3 }
      ];
      coneAngles.forEach(a => {
        const frustum = window.VR3D.createFrustum(0x00E5FF, 50, 1.2, 0.2, 1.8);
        frustum.group.rotation.y = a.rotY;
        frustum.group.rotation.x = a.rotX;
        hmd.add(frustum.group);
        cones.push(frustum);
      });

      // Outside-In Lighthouse Base Stations in corners
      const lighthouseGroup = new THREE.Group();
      lighthouseGroup.visible = false;
      const lh1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshStandardMaterial({ color: 0x8B5CF6 }));
      lh1.position.set(-2, 1.5, -1.5);
      const lh2 = lh1.clone();
      lh2.position.set(2, 1.5, 1.5);
      lighthouseGroup.add(lh1);
      lighthouseGroup.add(lh2);

      // Sweeping Laser Lines from Lighthouses
      const laserMat = new THREE.LineBasicMaterial({ color: 0x8B5CF6, transparent: true, opacity: 0.8 });
      const laserGeo = new THREE.BufferGeometry().setFromPoints([lh1.position, hmd.position, lh2.position, hmd.position]);
      const laserLines = new THREE.LineSegments(laserGeo, laserMat);
      lighthouseGroup.add(laserLines);
      sceneData.scene.add(lighthouseGroup);

      sceneData.animate((time) => {
        hmd.rotation.y = Math.sin(time * 0.001) * 0.3;
      });

      let currentMode = 'inside';

      btnIn.addEventListener('click', () => {
        currentMode = 'inside';
        btnIn.className = 'cyber-btn';
        btnOut.className = 'cyber-btn secondary';
        cones.forEach(c => c.group.visible = true);
        lighthouseGroup.visible = false;
        badge.textContent = 'INSIDE-OUT: 4X SLAM TRACKING RAYS';
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
        cones.forEach(c => c.group.visible = false);
        lighthouseGroup.visible = true;
        badge.textContent = 'OUTSIDE-IN: DUAL LIGHTHOUSE LASER SWEEPS';
        title.textContent = 'Outside-In Lighthouse Laser Sweeping';
        desc.textContent = 'Fixed base stations emit horizontal and vertical infrared laser sweeps across the room. Photodiodes on the headset measure the precise time of impact to calculate angles.';
        telem.innerHTML = `[TRACKING TELEMETRY]
• Architecture: Outside-In Laser Time-of-Flight
• External Sensors Required: 2 to 4 Base Stations
• Controller Occlusion: Almost None
• Accuracy: Sub-millimeter (< 0.1mm jitter)
• Latency: < 1.0ms hardware photodiode timing`;
        if (window.vrAudio) window.vrAudio.playClick(520);
      });

      btnOcc.addEventListener('click', () => {
        if (currentMode === 'inside') {
          telem.innerHTML = `<span style="color: var(--neon-red);">[OCCLUSION ALERT] Hands placed behind back!\n• Cameras lost sight of controller!\n• Falling back to IMU dead reckoning (drift will occur in 500ms)...</span>`;
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
          <div class="content-card" style="padding: 0.5rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 0.5rem;">
              <div style="display: flex; gap: 0.5rem;">
                <button class="cyber-btn small" id="s7-step-btn">▶ Step Next</button>
                <button class="cyber-btn secondary small" id="s7-auto-btn">⚡ Auto Run</button>
                <button class="cyber-btn secondary small" id="s7-reset-btn">Reset</button>
              </div>
              <div style="display: flex; align-items: center; gap: 0.5rem;">
                <span style="font-size: 0.8rem; color: var(--text-secondary);">Frustum Culling:</span>
                <button class="cyber-btn small" id="s7-cull-toggle" style="background: rgba(0, 229, 255, 0.2);">ON (-45% Draw Calls)</button>
              </div>
            </div>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- 3D Pipeline Transformation View -->
            <div class="content-card" style="padding: 0.5rem; position: relative;">
              <div class="three-canvas-container" id="s7-3d-container">
                <div class="three-overlay-badge" id="s7-3d-badge">STAGE 01: 3D SCENE GRAPH</div>
                <div class="three-drag-hint">Watch Mesh Transform</div>
              </div>
            </div>

            <!-- Pipeline Steps List -->
            <div class="content-card" style="justify-content: space-between;">
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <div class="pipeline-step active" data-s7="1" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-cyan);">01. App Logic</span>: Updates physics & camera pose.
                </div>
                <div class="pipeline-step" data-s7="2" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-cyan);">02. Frustum Cull</span>: Discards triangles outside eyes.
                </div>
                <div class="pipeline-step" data-s7="3" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-cyan);">03. Vertex Shading</span>: Projects 3D into clip-space.
                </div>
                <div class="pipeline-step" data-s7="4" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-cyan);">04. Rasterization</span>: Converts triangles into fragments.
                </div>
                <div class="pipeline-step" data-s7="5" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-cyan);">05. Fragment Shading</span>: Calculates lighting & textures.
                </div>
                <div class="pipeline-step" data-s7="6" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-cyan);">06. Barrel Warp</span>: Pre-distorts image for lenses.
                </div>
                <div class="pipeline-step" data-s7="7" style="padding: 0.4rem 0.6rem; cursor: pointer;">
                  <span style="font-weight: 700; color: var(--neon-green);">07. Async TimeWarp</span>: Re-orients frame right before v-sync!
                </div>
              </div>

              <div class="telemetry-box" id="s7-telemetry" style="height: 55px; font-size: 0.78rem;">
Active Stage: App Logic (Time Budget: 2.5ms CPU)
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      let stage = 1;
      let timer = null;
      const stepBtn = document.getElementById('s7-step-btn');
      const autoBtn = document.getElementById('s7-auto-btn');
      const resetBtn = document.getElementById('s7-reset-btn');
      const badge = document.getElementById('s7-3d-badge');
      const telem = document.getElementById('s7-telemetry');
      const steps = document.querySelectorAll('.pipeline-step');
      const container = document.getElementById('s7-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 2.8, camY: 0.3 });
      if (!sceneData) return;

      // Dynamic 3D model that morphs representation
      const geo = new THREE.IcosahedronGeometry(0.9, 1);
      const mat = new THREE.MeshStandardMaterial({
        color: 0x00E5FF,
        wireframe: false,
        metalness: 0.7,
        roughness: 0.2
      });
      const mesh = new THREE.Mesh(geo, mat);
      sceneData.scene.add(mesh);

      sceneData.animate((time) => {
        mesh.rotation.y = time * 0.001;
        mesh.rotation.x = time * 0.0005;
      });

      function updateStage(n) {
        stage = n;
        steps.forEach((s, idx) => s.classList.toggle('active', idx + 1 === n));

        if (n === 1) {
          mat.wireframe = false;
          mat.color.setHex(0x00E5FF);
          badge.textContent = 'STAGE 01: 3D SCENE GRAPH';
          telem.textContent = 'App Logic: Evaluating physics collisions and camera matrix.';
        } else if (n === 2) {
          mat.wireframe = true;
          mat.color.setHex(0x8B5CF6);
          badge.textContent = 'STAGE 02: FRUSTUM CULLING';
          telem.textContent = 'Frustum Cull: Discarded 45% of triangles outside viewing cone.';
        } else if (n === 3) {
          mat.wireframe = true;
          mat.color.setHex(0xFFB800);
          badge.textContent = 'STAGE 03: VERTEX TRANSFORM';
          telem.textContent = 'Vertex Shaders: Transforming coordinates into stereo clip-space.';
        } else if (n === 4) {
          mat.wireframe = true;
          mat.color.setHex(0x00FF9D);
          badge.textContent = 'STAGE 04: RASTERIZATION';
          telem.textContent = 'Rasterizer: Setting up pixel fragment coverage.';
        } else if (n === 5) {
          mat.wireframe = false;
          mat.color.setHex(0x00E5FF);
          badge.textContent = 'STAGE 05: FRAGMENT SHADING';
          telem.textContent = 'Fragment Shading: Computing PBR lighting and textures.';
        } else if (n === 6) {
          mat.wireframe = false;
          mat.color.setHex(0xFF0077);
          badge.textContent = 'STAGE 06: BARREL DISTORTION';
          telem.textContent = 'Lens Warp: Pre-distorting image to cancel pincushion lens distortion.';
        } else if (n === 7) {
          mat.wireframe = false;
          mat.color.setHex(0x00FF9D);
          badge.textContent = 'STAGE 07: ASYNC TIMEWARP (ATW)';
          telem.textContent = 'ATW Compute Pass: Re-projected frame with latest IMU angle right before V-Sync!';
        }
        if (window.vrAudio) window.vrAudio.playTone(300 + n * 50, 0.1);
      }

      stepBtn.addEventListener('click', () => {
        let next = stage + 1;
        if (next > 7) next = 1;
        updateStage(next);
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
          let next = stage + 1;
          if (next > 7) {
            next = 1;
            clearInterval(timer);
            timer = null;
            autoBtn.textContent = '⚡ Auto Run';
            if (window.vrAudio) window.vrAudio.playSuccess();
          }
          updateStage(next);
        }, 650);
      });

      resetBtn.addEventListener('click', () => {
        if (timer) clearInterval(timer);
        timer = null;
        autoBtn.textContent = '⚡ Auto Run';
        updateStage(1);
      });
    },
    notes: `
      <b>Slide 7 Talking Points:</b>
      <ul>
        <li><b>Single-Pass Stereo:</b> In modern VR, the GPU doesn't render twice. Single Pass Stereo (Multiview) duplicates geometry in hardware.</li>
        <li><b>The Savior - ATW:</b> Point out Stage 7: even if the game drops a frame, ATW shifts the old frame to match the latest head angle before scanout.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 8: STEREO RENDERING & IPD (DUAL 3D CAMERAS)
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
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 0.5rem;">
              Human depth perception relies on <b>stereopsis</b>: because your eyes are spaced ~64mm apart, each eye receives a slightly different angle of the world.
            </p>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Interpupillary Distance (IPD):</span>
                <input type="range" class="cyber-slider" id="s8-ipd-slider" min="55" max="72" value="64">
                <span class="telemetry-value" id="s8-ipd-val">64 mm</span>
              </div>
            </div>

            <div class="telemetry-box" id="s8-status" style="height: 80px; font-size: 0.78rem; margin-top: 0.5rem;">
Camera Baseline: 64.0 mm (Human Average)
Stereo Disparity Shift: ±1.8° at 1.5m focal distance
Convergence Status: Optimal Binocular Fusion
            </div>
          </div>

          <!-- Dual 3D Camera Frustums Visualizer -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s8-3d-container">
              <div class="three-overlay-badge">👀 DUAL STEREO FRUSTUMS</div>
              <div class="three-drag-hint">Adjust IPD to see baseline shift</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const slider = document.getElementById('s8-ipd-slider');
      const valText = document.getElementById('s8-ipd-val');
      const status = document.getElementById('s8-status');
      const container = document.getElementById('s8-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.4, camY: 0.8 });
      if (!sceneData) return;

      // Target 3D object to focus on
      const targetGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
      const targetMat = new THREE.MeshStandardMaterial({ color: 0xFFB800, metalness: 0.6 });
      const target = new THREE.Mesh(targetGeo, targetMat);
      target.position.set(0, 0, -1.2);
      sceneData.scene.add(target);

      // Left and Right Camera Frustums
      const leftFrustum = window.VR3D.createFrustum(0x00E5FF, 40, 1.0, 0.3, 2.2);
      const rightFrustum = window.VR3D.createFrustum(0x8B5CF6, 40, 1.0, 0.3, 2.2);

      sceneData.scene.add(leftFrustum.group);
      sceneData.scene.add(rightFrustum.group);

      sceneData.animate((time) => {
        target.rotation.y = time * 0.001;
      });

      function updateIPD() {
        const ipd = parseFloat(slider.value);
        valText.textContent = `${ipd} mm`;
        const offset = ((ipd - 64) / 64) * 0.4;

        leftFrustum.group.position.x = -0.4 - offset;
        rightFrustum.group.position.x = 0.4 + offset;

        leftFrustum.group.lookAt(target.position);
        rightFrustum.group.lookAt(target.position);

        status.innerHTML = `Camera Baseline: ${ipd.toFixed(1)} mm<br>
Stereo Disparity Shift: ±${(ipd * 0.028).toFixed(2)}° at 1.5m<br>
${ipd < 58 ? '<span style="color: var(--neon-red);">Warning: Narrow IPD! Strain for average adult.</span>' : ipd > 68 ? '<span style="color: var(--neon-red);">Warning: Wide IPD! Binocular alignment stretched.</span>' : '<span style="color: var(--neon-green);">Optimal Binocular Fusion (Nominal Comfort)</span>'}`;

        if (window.vrAudio) window.vrAudio.playClick(380);
      }

      slider.addEventListener('input', updateIPD);
      updateIPD();
    },
    notes: `
      <b>Slide 8 Talking Points:</b>
      <ul>
        <li><b>Interpupillary Distance (IPD):</b> Distance between pupils ranges from 55mm to 72mm. If the physical lenses and cameras do not match the user's IPD, they experience severe eye strain and double vision.</li>
        <li><b>3D Frustum Convergence:</b> Watch how both camera cones converge directly on the 3D target!</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 9: GAME ENGINE + HARDWARE PERFORMANCE (3D COMPLEX MESH)
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
                <span class="control-label">Polygons (GPU):</span>
                <input type="range" class="cyber-slider" id="s9-triangles" min="100" max="4000" value="800" step="100">
                <span class="telemetry-value" id="s9-tri-val">800k</span>
              </div>
              <div class="control-row">
                <span class="control-label">Dynamic Lights:</span>
                <input type="range" class="cyber-slider" id="s9-lights" min="1" max="10" value="2">
                <span class="telemetry-value" id="s9-lights-val">2</span>
              </div>
            </div>

            <!-- Frame Time Meter -->
            <div style="margin: 0.75rem 0;">
              <div style="display: flex; justify-content: space-between; font-size: 0.78rem; margin-bottom: 0.2rem;">
                <span>Frame-Time: <b id="s9-total-ms" style="color: var(--neon-green);">9.0 ms</b></span>
                <span style="color: var(--neon-red); font-weight: 700;">11.1ms DEADLINE</span>
              </div>
              <div style="height: 12px; background: rgba(255,255,255,0.08); border-radius: 4px; overflow: hidden; display: flex;">
                <div id="s9-bar-cpu" style="width: 28%; height: 100%; background: var(--neon-cyan);"></div>
                <div id="s9-bar-gpu" style="width: 52%; height: 100%; background: var(--neon-purple);"></div>
              </div>
            </div>

            <button class="cyber-btn" id="s9-optimize-btn">⚡ Auto-Optimize Engine Profile</button>
          </div>

          <!-- 3D Live Stuttering / Smooth Mesh -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s9-3d-container">
              <div class="three-overlay-badge" id="s9-fps-badge">90 FPS LOCKED (NOMINAL)</div>
              <div class="three-drag-hint">Watch Mesh Stutter on Overload</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const dc = document.getElementById('s9-drawcalls');
      const tri = document.getElementById('s9-triangles');
      const lgt = document.getElementById('s9-lights');
      const dcVal = document.getElementById('s9-dc-val');
      const triVal = document.getElementById('s9-tri-val');
      const lgtVal = document.getElementById('s9-lights-val');
      const totalMs = document.getElementById('s9-total-ms');
      const barCpu = document.getElementById('s9-bar-cpu');
      const barGpu = document.getElementById('s9-bar-gpu');
      const badge = document.getElementById('s9-fps-badge');
      const optBtn = document.getElementById('s9-optimize-btn');
      const container = document.getElementById('s9-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 2.8, camY: 0.3 });
      if (!sceneData) return;

      const geo = new THREE.TorusKnotGeometry(0.7, 0.22, 64, 16);
      const mat = new THREE.MeshStandardMaterial({ color: 0x00E5FF, metalness: 0.8, roughness: 0.2 });
      const knot = new THREE.Mesh(geo, mat);
      sceneData.scene.add(knot);

      let isDropping = false;
      let frameCounter = 0;

      sceneData.animate((time) => {
        frameCounter++;
        // If dropping frames, skip updates to simulate 45 FPS stutter
        if (isDropping && frameCounter % 2 === 0) return;
        knot.rotation.y += 0.02;
        knot.rotation.x += 0.01;
      });

      function calculateBudget() {
        const calls = parseInt(dc.value);
        const tris = parseInt(tri.value);
        const lights = parseInt(lgt.value);

        dcVal.textContent = calls;
        triVal.textContent = `${tris}k`;
        lgtVal.textContent = lights;

        const cpu = (1.5 + (calls / 3500) * 6.5).toFixed(1);
        const gpu = (2.0 + (tris / 4000) * 4.0 + lights * 0.8).toFixed(1);
        const total = (parseFloat(cpu) + parseFloat(gpu)).toFixed(1);

        totalMs.textContent = `${total} ms`;
        const cpuPct = Math.min(100, (parseFloat(cpu) / 15) * 100);
        const gpuPct = Math.min(100 - cpuPct, (parseFloat(gpu) / 15) * 100);

        barCpu.style.width = `${cpuPct}%`;
        barGpu.style.width = `${gpuPct}%`;

        if (parseFloat(total) <= 11.1) {
          isDropping = false;
          mat.color.setHex(0x00E5FF);
          badge.textContent = '90 FPS LOCKED (NOMINAL)';
          badge.style.color = 'var(--neon-green)';
          totalMs.style.color = 'var(--neon-green)';
        } else {
          isDropping = true;
          mat.color.setHex(0xFF0077);
          badge.textContent = '⚠️ 45 FPS (FRAME DROP / STUTTER)';
          badge.style.color = 'var(--neon-red)';
          totalMs.style.color = 'var(--neon-red)';
          if (window.vrAudio) window.vrAudio.playBuzz();
        }
      }

      [dc, tri, lgt].forEach(el => {
        el.addEventListener('input', () => {
          calculateBudget();
          if (window.vrAudio) window.vrAudio.playClick(320);
        });
      });

      optBtn.addEventListener('click', () => {
        dc.value = 600;
        tri.value = 600;
        lgt.value = 2;
        calculateBudget();
        if (window.vrAudio) window.vrAudio.playSuccess();
      });
    },
    notes: `
      <b>Slide 9 Talking Points:</b>
      <ul>
        <li><b>11.1ms Strict Deadline:</b> In VR, if the frame takes 12ms instead of 11.1ms, you drop to 45 FPS instantly. Watch the 3D model stutter visibly when the budget is exceeded!</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 10: CLIENT-SERVER ARCHITECTURE (3D DISTRIBUTED ORB)
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
          <div class="content-card" style="justify-content: space-around;">
            <span class="card-badge">THE DISTRIBUTED VR PARADOX</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
              Why Cloud Rendering Alone Can Cause Sickness
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">
              Internet round-trip latency across broadband is typically <b>30ms to 70ms</b>.
              Because VR motion-to-photon must stay strictly below <b>20ms</b>, a VR headset can <i>never</i> wait for a remote server before rendering head orientation.
            </p>

            <div style="background: rgba(0,0,0,0.4); padding: 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-cyan); font-size: 0.8rem;">
              <b style="color: var(--neon-cyan);">Client-Side Prediction:</b> Head orientation renders locally at 90+ FPS while predicting avatar positions.
            </div>
            <div style="background: rgba(0,0,0,0.4); padding: 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-purple); font-size: 0.8rem;">
              <b style="color: var(--neon-purple);">Snapshot Interpolation:</b> Smoothly blends remote players between server packets.
            </div>
          </div>

          <!-- 3D Distributed Node Architecture -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s10-3d-container">
              <div class="three-overlay-badge">🌐 SERVER HUB & CLIENT SATELLITES</div>
              <div class="three-drag-hint">Pulsing Packets (30Hz vs 90Hz)</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const container = document.getElementById('s10-3d-container');
      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.2, camY: 0.5 });
      if (!sceneData) return;

      // Central Authoritative Server Orb
      const srvGeo = new THREE.SphereGeometry(0.5, 24, 24);
      const srvMat = new THREE.MeshStandardMaterial({ color: 0x8B5CF6, emissive: 0x8B5CF6, emissiveIntensity: 0.6 });
      const server = new THREE.Mesh(srvGeo, srvMat);
      sceneData.scene.add(server);

      // 3 Client Headsets Orbiting Server
      const clients = [];
      for (let i = 0; i < 3; i++) {
        const { group: c } = window.VR3D.createHeadset();
        c.scale.set(0.45, 0.45, 0.45);
        sceneData.scene.add(c);
        clients.push(c);
      }

      sceneData.animate((time) => {
        server.rotation.y = time * 0.001;
        clients.forEach((c, idx) => {
          const angle = time * 0.0008 + (idx * Math.PI * 2) / 3;
          c.position.set(Math.cos(angle) * 1.8, Math.sin(angle * 2) * 0.2, Math.sin(angle) * 1.8);
          c.lookAt(server.position);
        });
      });
    },
    notes: `
      <b>Slide 10 Talking Points:</b>
      <ul>
        <li><b>The Network Paradox:</b> Cloud gaming (GeForce Now) works at 50ms ping, but VR headset orientation can NEVER wait on the cloud. The local headset must run its own render loop at 90 FPS.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 11: MULTIPLAYER VR RELAY (3D AVATARS & PACKETS)
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
          <div class="content-card">
            <span class="card-badge">NETWORK EMULATOR</span>
            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Ping (RTT):</span>
                <input type="range" class="cyber-slider" id="s11-ping" min="15" max="300" value="45" step="5">
                <span class="telemetry-value" id="s11-ping-val">45 ms</span>
              </div>
              <div class="control-row">
                <span class="control-label">Packet Loss:</span>
                <input type="range" class="cyber-slider" id="s11-loss" min="0" max="25" value="2" step="1">
                <span class="telemetry-value" id="s11-loss-val">2%</span>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem; margin-top: 0.5rem;">
              <button class="cyber-btn" id="s11-send-btn" style="flex: 1;">📡 Broadcast Pose</button>
              <button class="cyber-btn secondary" id="s11-glitch-btn" style="flex: 1;">Simulate Spike</button>
            </div>

            <div class="telemetry-box" id="s11-log" style="height: 90px; font-size: 0.75rem; margin-top: 0.5rem;">
[NETWORK RELAY READY]
Local User: Node-A (Host / Origin)
Peers: Peer-B (Europe), Peer-C (Asia)
Dead Reckoning: Spline Interpolation Active
            </div>
          </div>

          <!-- 3D Multiplayer Social Room -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s11-3d-container">
              <div class="three-overlay-badge">👥 3D MULTIPLAYER AVATARS</div>
              <div class="three-drag-hint">Watch Dead Reckoning Sync</div>
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
      const log = document.getElementById('s11-log');
      const container = document.getElementById('s11-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.5, camY: 0.8 });
      if (!sceneData) return;

      // 3 Avatars in space
      const av1 = window.VR3D.createHeadWithHMD().root;
      av1.position.set(-1.2, 0, 0);
      sceneData.scene.add(av1);

      const av2 = window.VR3D.createHeadWithHMD().root;
      av2.position.set(1.2, 0, 0);
      sceneData.scene.add(av2);

      sceneData.animate((time) => {
        av1.rotation.y = Math.sin(time * 0.002) * 0.4;
        av2.rotation.y = -Math.sin(time * 0.002) * 0.4;
      });

      sendBtn.addEventListener('click', () => {
        const p = parseInt(ping.value);
        const l = parseInt(loss.value);
        if (Math.random() * 100 < l) {
          log.innerHTML = `<span style="color: var(--neon-red);">[PACKET LOSS] Pose packet dropped!\nDead reckoning predicts avatar trajectory.</span>\n` + log.innerHTML;
          if (window.vrAudio) window.vrAudio.playBuzz();
        } else {
          log.innerHTML = `<span style="color: var(--neon-green);">[PACKET DELIVERED] Ping ${(p/2).toFixed(1)}ms. Spatial audio synced.</span>\n` + log.innerHTML;
          if (window.vrAudio) window.vrAudio.playDataPacket();
        }
      });

      glitchBtn.addEventListener('click', () => {
        log.innerHTML = `<span style="color: var(--neon-yellow);">[JITTER SPIKE] High ping 240ms. Interpolating avatars...</span>\n` + log.innerHTML;
        if (window.vrAudio) window.vrAudio.playTone(200, 0.2);
      });

      ping.addEventListener('input', () => pingVal.textContent = `${ping.value} ms`);
      loss.addEventListener('input', () => lossVal.textContent = `${loss.value}%`);
    },
    notes: `
      <b>Slide 11 Talking Points:</b>
      <ul>
        <li><b>Dead Reckoning:</b> If a packet is lost, the client predicts where the remote player was heading using velocity vectors.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 12: CLUSTER RENDERING (MULTI-GPU MASTER-WORKER)
  // ==========================================
  {
    id: 'slide-12',
    part: 'High-End & Cluster VR',
    partNumber: 'PART 12',
    title: 'Cluster Rendering: Multi-GPU / Multi-Node VR',
    subtitle: 'Overcoming the Single-GPU Limit for Multi-Screen CAVE Systems and Simulators',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card">
            <span class="card-badge">THE MULTI-GPU CHALLENGE</span>
            <h3 style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.15rem;">
              Hardware FrameLock vs Tearing
            </h3>
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">
              In industrial simulators driving multiple 4K displays, no single GPU suffices.
              Hardware <b>Genlock (FrameLock)</b> synchronizes display scanouts across GPUs with microsecond precision.
            </p>

            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button class="cyber-btn" id="s12-genlock-on" style="flex: 1;">Genlock ON (Sync)</button>
              <button class="cyber-btn secondary" id="s12-genlock-off" style="flex: 1;">Genlock OFF (Tear)</button>
            </div>

            <div class="telemetry-box" id="s12-status" style="height: 75px; font-size: 0.78rem; margin-top: 0.75rem;">
✓ Hardware Genlock Active: All displays scanning out line 0 in microsecond phase.
            </div>
          </div>

          <!-- 3D Master Node & Cluster Workers -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s12-3d-container">
              <div class="three-overlay-badge" id="s12-badge">SYNCHRONIZED CLUSTER NODES</div>
              <div class="three-drag-hint">Toggle Genlock to see wall tear</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const btnOn = document.getElementById('s12-genlock-on');
      const btnOff = document.getElementById('s12-genlock-off');
      const status = document.getElementById('s12-status');
      const badge = document.getElementById('s12-badge');
      const container = document.getElementById('s12-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.2, camY: 0.5 });
      if (!sceneData) return;

      // 3 Display screens side-by-side
      const screens = [];
      for (let i = 0; i < 3; i++) {
        const sGeo = new THREE.BoxGeometry(0.85, 1.2, 0.05);
        const sMat = new THREE.MeshStandardMaterial({ color: 0x00E5FF, metalness: 0.8 });
        const s = new THREE.Mesh(sGeo, sMat);
        s.position.x = (i - 1) * 0.95;
        sceneData.scene.add(s);
        screens.push(s);
      }

      let isTorn = false;

      sceneData.animate((time) => {
        screens.forEach((s, idx) => {
          if (isTorn) {
            s.position.y = Math.sin(time * 0.01 + idx * 2) * 0.15;
          } else {
            s.position.y = 0;
          }
        });
      });

      btnOn.addEventListener('click', () => {
        isTorn = false;
        btnOn.className = 'cyber-btn';
        btnOff.className = 'cyber-btn secondary';
        screens.forEach(s => s.material.color.setHex(0x00E5FF));
        badge.textContent = 'SYNCHRONIZED CLUSTER NODES';
        status.innerHTML = `<span style="color: var(--neon-green);">✓ Hardware Genlock Active: Microsecond scanout sync. Zero image tearing across wall seams.</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btnOff.addEventListener('click', () => {
        isTorn = true;
        btnOff.className = 'cyber-btn';
        btnOn.className = 'cyber-btn secondary';
        screens.forEach(s => s.material.color.setHex(0xFF0077));
        badge.textContent = '⚠️ GENLOCK DRIFT: WALL TEARING!';
        status.innerHTML = `<span style="color: var(--neon-red);">⚠️ GENLOCK DISABLED: Screens scan out out-of-phase &rarr; Shearing across seams!</span>`;
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 12 Talking Points:</b>
      <ul>
        <li><b>CAVE Automatic Virtual Environment:</b> Explain why multiple GPUs driving adjacent screens must be synchronized by hardware cables.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 13: CLUSTER RENDERING IN ACTION (3D CAVE ROOM)
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
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 0.5rem;">
              Unlike an HMD where screens move with your eyes, CAVE screens are fixed walls.
              Each GPU node renders an <b>asymmetric off-axis frustum</b> calculated dynamically based on where the user stands.
            </p>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">User Room X:</span>
                <input type="range" class="cyber-slider" id="s13-user-x" min="-40" max="40" value="0">
                <span class="telemetry-value" id="s13-user-x-val">0 cm</span>
              </div>
            </div>

            <div class="telemetry-box" id="s13-telemetry" style="height: 75px; font-size: 0.78rem; margin-top: 0.5rem;">
Off-Axis Asymmetry: ΔX=0.0cm | Barrier Latency: 0.4ms
            </div>
          </div>

          <!-- 3D CAVE Room Visualizer -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s13-3d-container">
              <div class="three-overlay-badge">🏛️ 3-WALL CAVE ROOM</div>
              <div class="three-drag-hint">User position shifts frustums</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const userX = document.getElementById('s13-user-x');
      const xVal = document.getElementById('s13-user-x-val');
      const telem = document.getElementById('s13-telemetry');
      const container = document.getElementById('s13-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.5, camY: 0.8 });
      if (!sceneData) return;

      // 3 Wall Screens in U-shape
      const wallMat = new THREE.MeshStandardMaterial({ color: 0x00E5FF, transparent: true, opacity: 0.4 });
      const frontWall = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 0.05), wallMat);
      frontWall.position.set(0, 0, -1.0);
      sceneData.scene.add(frontWall);

      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 2.0), wallMat);
      leftWall.position.set(-1.0, 0, 0);
      sceneData.scene.add(leftWall);

      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 2.0), wallMat);
      rightWall.position.set(1.0, 0, 0);
      sceneData.scene.add(rightWall);

      // User sphere in center
      const userSphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0x00FF9D }));
      userSphere.position.set(0, 0, 0);
      sceneData.scene.add(userSphere);

      sceneData.animate();

      userX.addEventListener('input', (e) => {
        const val = parseFloat(e.target.value);
        xVal.textContent = `${val} cm`;
        userSphere.position.x = (val / 40) * 0.7;
        telem.innerHTML = `Off-Axis Matrix: LeftFrustum(${(-val).toFixed(1)}cm), RightFrustum(${(val).toFixed(1)}cm) | Barrier: 0.4ms`;
        if (window.vrAudio) window.vrAudio.playClick(360);
      });
    },
    notes: `
      <b>Slide 13 Talking Points:</b>
      <ul>
        <li><b>Asymmetric Frustums:</b> Explain how moving inside a CAVE recalculates the viewing angles for each physical wall.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 14: LATENCY BREAKDOWN (MOTION-TO-PHOTON)
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
            <p style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5; margin-bottom: 0.5rem;">
              Evolution fine-tuned human vision and vestibular balancing for physical locomotion. If sensory data disagrees by >20ms, the brain assumes poison ingestion and triggers nausea.
            </p>

            <div style="display: flex; gap: 0.5rem; margin-top: 0.75rem;">
              <button class="cyber-btn" id="s14-low-lag" style="flex: 1;">15ms Mode (True VR)</button>
              <button class="cyber-btn secondary" id="s14-high-lag" style="flex: 1;">75ms Mode (Nausea Sim)</button>
            </div>

            <div class="telemetry-box" id="s14-lag-expl" style="height: 75px; font-size: 0.78rem; margin-top: 0.75rem;">
✓ 15ms Mode: Horizon responds instantly. Vestibular-ocular reflex satisfied.
            </div>
          </div>

          <!-- 3D Interactive Horizon Lag Box -->
          <div class="content-card" style="padding: 0.5rem; position: relative;">
            <div class="three-canvas-container" id="s14-3d-container">
              <div class="three-overlay-badge" id="s14-badge">15MS LATENCY (LOCKED)</div>
              <div class="three-drag-hint">🖱️ Drag to test horizon response</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const btnLow = document.getElementById('s14-low-lag');
      const btnHigh = document.getElementById('s14-high-lag');
      const expl = document.getElementById('s14-lag-expl');
      const badge = document.getElementById('s14-badge');
      const container = document.getElementById('s14-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.0, camY: 0.5 });
      if (!sceneData) return;

      // Horizon grid & mountains
      const terrainGeo = new THREE.PlaneGeometry(10, 10, 16, 16);
      const terrainMat = new THREE.MeshBasicMaterial({ color: 0x00E5FF, wireframe: true });
      const terrain = new THREE.Mesh(terrainGeo, terrainMat);
      terrain.rotation.x = -Math.PI / 2;
      sceneData.scene.add(terrain);

      let lagFactor = 0.25; // Instantaneous

      sceneData.animate((time) => {
        // Smooth rotation towards camera rotation
      });

      btnLow.addEventListener('click', () => {
        lagFactor = 0.25;
        btnLow.className = 'cyber-btn';
        btnHigh.className = 'cyber-btn secondary';
        terrainMat.color.setHex(0x00E5FF);
        badge.textContent = '15MS LATENCY (LOCKED)';
        expl.innerHTML = `<span style="color: var(--neon-green);">✓ 15ms Mode: World responds instantly. Zero vestibular mismatch.</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btnHigh.addEventListener('click', () => {
        lagFactor = 0.02;
        btnHigh.className = 'cyber-btn';
        btnLow.className = 'cyber-btn secondary';
        terrainMat.color.setHex(0xFF0077);
        badge.textContent = '⚠️ 75MS HIGH LATENCY (NAUSEA)';
        expl.innerHTML = `<span style="color: var(--neon-red);">⚠️ 75ms High Lag Mode: Notice how the world drags behind your mouse! This causes acute nausea.</span>`;
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 14 Talking Points:</b>
      <ul>
        <li><b>The Anatomic Poison Reflex:</b> Explain why humans get sick. If sensory data disagrees by >20ms, the brain assumes neurotoxins were ingested and purges the stomach.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 15: COMPLETE VR PIPELINE (HERO 3D TRACER)
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
          <div class="content-card" style="padding: 0.5rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="card-badge">THE MASTER PIPELINE</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;">
                  Full synthesis of sensing, engine, GPU rasterization, and optical projection.
                </span>
              </div>
              <button class="cyber-btn" id="s15-trace-btn">⚡ Trace Live Motion Packet</button>
            </div>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- 3D Pipeline Tube Canvas -->
            <div class="content-card" style="padding: 0.5rem; position: relative;">
              <div class="three-canvas-container" id="s15-3d-container">
                <div class="three-overlay-badge" id="s15-badge">HERO ARCHITECTURE TRACER</div>
                <div class="three-drag-hint">Click Trace to shoot packet</div>
              </div>
            </div>

            <!-- Stage Cards -->
            <div class="content-card" style="justify-content: space-between;">
              <div style="display: flex; flex-direction: column; gap: 0.4rem;">
                <div style="background: rgba(0,229,255,0.06); padding: 0.5rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-cyan);">
                  <b style="color: var(--neon-cyan);">1. Sensing (0-2ms):</b> 1000Hz IMU + SLAM Cameras.
                </div>
                <div style="background: rgba(139,92,246,0.06); padding: 0.5rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-purple);">
                  <b style="color: var(--neon-purple);">2. Runtime (2-5ms):</b> OpenXR & Game Engine Tick.
                </div>
                <div style="background: rgba(0,255,157,0.06); padding: 0.5rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-green);">
                  <b style="color: var(--neon-green);">3. GPU Shaders (5-12ms):</b> Stereo Frustums & ATW.
                </div>
                <div style="background: rgba(255,184,0,0.06); padding: 0.5rem; border-radius: var(--radius-sm); border-left: 3px solid var(--neon-yellow);">
                  <b style="color: var(--neon-yellow);">4. Optics (12-17ms):</b> Strobe through Pancake lenses.
                </div>
              </div>

              <div class="telemetry-box" id="s15-log" style="height: 55px; font-size: 0.78rem;">
[SYSTEM READY] Click "Trace Live Motion Packet" to watch a real-time nanosecond packet traverse all 4 layers!
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const traceBtn = document.getElementById('s15-trace-btn');
      const badge = document.getElementById('s15-badge');
      const log = document.getElementById('s15-log');
      const container = document.getElementById('s15-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.5, camY: 0.6 });
      if (!sceneData) return;

      // 4 Nodes along a spline path
      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.8, -0.4, 0),
        new THREE.Vector3(-0.6, 0.5, 0),
        new THREE.Vector3(0.6, -0.5, 0),
        new THREE.Vector3(1.8, 0.4, 0)
      ]);

      const tubeGeo = new THREE.TubeGeometry(path, 64, 0.08, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x1E293B, wireframe: true });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      sceneData.scene.add(tube);

      const packetGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x00FF9D });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      sceneData.scene.add(packet);

      let t = 0;
      let isTracing = false;

      sceneData.animate(() => {
        if (isTracing) {
          t += 0.015;
          if (t > 1) {
            t = 1;
            isTracing = false;
            log.innerHTML = `<span style="color: var(--neon-green); font-weight: 700;">✓ PACKET COMPLETED IN 14.1 MILLISECONDS! Zero simulator sickness.</span>`;
            if (window.vrAudio) window.vrAudio.playSuccess();
          }
          const pt = path.getPoint(t);
          packet.position.copy(pt);
        }
      });

      traceBtn.addEventListener('click', () => {
        t = 0;
        isTracing = true;
        log.textContent = `[T+0.0ms] Head rotated &rarr; IMU sampled &rarr; GPU rendered &rarr; Lenses strobed!`;
        if (window.vrAudio) window.vrAudio.playDataPacket();
      });
    },
    notes: `
      <b>Slide 15 Talking Points:</b>
      <ul>
        <li><b>Grand Synthesis:</b> Bring together everything learned in parts 1 through 14. Show how all subsystems cooperate within 14ms.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 16: CASE STUDIES & TRADEOFFS
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
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="cyber-btn" id="s16-tab-quest" style="width: 180px;">Mobile Standalone</button>
            <button class="cyber-btn secondary" id="s16-tab-pc" style="width: 180px;">Tethered PC VR</button>
            <button class="cyber-btn secondary" id="s16-tab-cave" style="width: 180px;">Industrial CAVE</button>
          </div>

          <div class="split-layout" style="flex: 1;">
            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge" id="s16-badge">ARCHITECTURE PROFILE</span>
                <h3 id="s16-name" style="color: var(--neon-cyan); margin: 0.5rem 0; font-size: 1.25rem;">
                  Meta Quest 3 / Apple Vision Pro
                </h3>
                <div id="s16-summary" style="color: var(--text-secondary); font-size: 0.85rem; line-height: 1.5;">
                  All compute, sensors, batteries, and displays are integrated inside a 500g chassis. Constrained to 5-8 Watts of thermal dissipation.
                </div>
              </div>

              <div style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.75rem; border: 1px solid var(--border-color);">
                <div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.35rem;">HARDWARE METRICS:</div>
                <div id="s16-specs" style="font-family: var(--font-mono); font-size: 0.8rem; color: var(--neon-cyan); line-height: 1.5;">
                  • Compute: Snapdragon XR2 Gen 2 (5-8W SoC)<br>
                  • Tracking: 4x Inside-Out SLAM Cameras<br>
                  • Optics: Pancake Lenses (Folded)<br>
                  • Mobility: 100% Wireless Free-Roaming
                </div>
              </div>
            </div>

            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge">ENGINEERING TRADEOFF MATRIX</span>
                <div style="margin: 0.5rem 0;">
                  <div style="font-weight: 700; color: var(--neon-green); font-size: 0.85rem;">✓ KEY ADVANTAGES:</div>
                  <div id="s16-pros" style="font-size: 0.82rem; color: var(--text-secondary);">
                    Zero cables, consumer accessibility, instant setup in any room.
                  </div>
                </div>

                <div style="margin: 0.5rem 0;">
                  <div style="font-weight: 700; color: var(--neon-red); font-size: 0.85rem;">✕ TECHNICAL LIMITATIONS:</div>
                  <div id="s16-cons" style="font-size: 0.82rem; color: var(--text-secondary);">
                    Strict battery life (~2 hours), thermal throttling limits visual fidelity.
                  </div>
                </div>
              </div>

              <div class="telemetry-box" id="s16-verdict" style="height: 55px; font-size: 0.78rem;">
Primary Use-Case: Consumer gaming, spatial entertainment, enterprise training.
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
          summary: 'All compute, tracking, batteries, and displays are integrated inside a 500g chassis. Constrained to 5-8 Watts of thermal dissipation.',
          specs: '• Compute: Snapdragon XR2 Gen 2 / Apple M2+R1\n• Tracking: 4+ Inside-Out SLAM Cameras\n• Optics: Folded Pancake Lenses\n• Mobility: 100% Wireless Free-Roaming',
          pros: 'Zero cables, massive consumer adoption, instant room setup, integrated spatial audio.',
          cons: 'Strict battery life (~2 hours), thermal limits prevent photorealistic graphics.',
          verdict: 'Primary Use-Case: Consumer gaming, spatial computing, enterprise training.'
        },
        pc: {
          badge: 'TETHERED PC VR ARCHITECTURE',
          name: 'Valve Index / Bigscreen Beyond',
          summary: 'Connects via DisplayPort and USB to a high-end desktop workstation with an NVIDIA RTX GPU (400W+ compute power). Zero battery or thermal limits on the head.',
          specs: '• Compute: Desktop Workstation (RTX 4090 / 64GB RAM)\n• Tracking: SteamVR Lighthouse (Outside-In Lasers)\n• Optics: Dual Micro-OLED or Fresnel @ 144Hz\n• Mobility: Tethered by 5-meter fiber-optic cable',
          pros: 'Sub-millimeter tracking accuracy, unlimited graphical compute, ultra-low display latency.',
          cons: 'Heavy tether cable hampers movement, expensive setup requirement.',
          verdict: 'Primary Use-Case: High-fidelity flight simulators, VR eSports, medical planning.'
        },
        cave: {
          badge: 'CLUSTER CAVE ARCHITECTURE',
          name: 'Industrial Multi-Screen CAVE Facility',
          summary: 'A dedicated room with 3 to 6 projection walls driven by a cluster of multi-GPU server nodes synchronized via InfiniBand and hardware Genlock cables.',
          specs: '• Compute: 4-8 Node Server Cluster (Multi-Quadro GPUs)\n• Tracking: Optical Vicon / OptiTrack Camera Rigs\n• Optics: Active Shutter 3D Glasses (120Hz per eye)\n• Mobility: Natural walking inside projection volume',
          pros: 'Natural collaborative review without wearing heavy headsets, see colleagues simultaneously.',
          cons: 'Extremely high cost ($250k - $2M+), requires large dedicated facility.',
          verdict: 'Primary Use-Case: Automotive design review, aerospace engineering walkthroughs.'
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
        <li><b>Engineering Tradeoffs:</b> There is no single "best" system: Standalone offers maximum mobility; PC VR offers maximum power; CAVE offers shared collaborative presence.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 17: CLASSROOM CHALLENGE
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
          <div class="content-card" style="padding: 0.5rem 1rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="card-badge" id="s17-q-num">QUESTION 1 OF 3</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;" id="s17-q-category">Pipeline Latency</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--neon-cyan);">
                Score: <span id="s17-score" style="color: var(--neon-green); font-weight: 800;">0</span> / 3
              </div>
            </div>
          </div>

          <div class="content-card" style="flex: 1; justify-content: space-around;">
            <div>
              <h3 id="s17-question" style="color: var(--neon-cyan); margin-bottom: 0.75rem; font-size: 1.15rem;">
                1. What is the maximum acceptable Motion-to-Photon latency before vestibular mismatch induces simulator sickness?
              </h3>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.5rem;" id="s17-options">
                <button class="cyber-btn secondary s17-opt" data-opt="0">A) 100 milliseconds</button>
                <button class="cyber-btn secondary s17-opt" data-opt="1">B) 50 milliseconds</button>
                <button class="cyber-btn secondary s17-opt" data-opt="2">C) 20 milliseconds</button>
                <button class="cyber-btn secondary s17-opt" data-opt="3">D) 5 milliseconds</button>
              </div>
            </div>

            <div id="s17-feedback" style="background: rgba(0,0,0,0.4); border-radius: var(--radius-sm); padding: 0.6rem; border: 1px solid var(--border-color); font-size: 0.82rem; display: none;"></div>

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
          expl: 'Correct! 20 milliseconds is the universal threshold. Above 20ms, the lag between inner-ear acceleration and retina photons violates human biological tolerance.'
        },
        {
          num: 'QUESTION 2 OF 3',
          cat: 'Rendering Shaders',
          q: '2. Which critical graphics technique re-projects an already-rendered frame right before scanout if the game engine drops a frame?',
          options: ['A) SSAO', 'B) Asynchronous TimeWarp (ATW)', 'C) Mipmapping', 'D) Ray Tracing'],
          correct: 1,
          expl: 'Correct! Asynchronous TimeWarp (ATW) re-samples and rotates the prior rendered frame to match the latest IMU orientation.'
        },
        {
          num: 'QUESTION 3 OF 3',
          cat: 'Tracking & Kinematics',
          q: '3. Why is 6-DOF tracking mandatory instead of 3-DOF for true room-scale immersion without nausea?',
          options: ['A) Doubles resolution', 'B) Provides translational motion parallax matching neck/body movement', 'C) Lowers battery use', 'D) Skips vertex shading'],
          correct: 1,
          expl: 'Correct! Humans translate (X, Y, Z) when leaning. 3-DOF only detects rotation; without parallax, the world appears glued to your skull.'
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
            feedback.style.display = 'block';
            feedback.innerHTML = `<span style="color: var(--neon-green); font-weight: 700;">✓ Correct!</span> ${item.expl}`;
            score++;
            scoreText.textContent = score;
            if (window.vrAudio) window.vrAudio.playSuccess();
          } else {
            btn.style.borderColor = 'var(--neon-red)';
            optBtns[item.correct].className = 'cyber-btn s17-opt';
            feedback.style.display = 'block';
            feedback.innerHTML = `<span style="color: var(--neon-red); font-weight: 700;">✕ Incorrect.</span> ${item.expl}`;
            if (window.vrAudio) window.vrAudio.playBuzz();
          }

          if (currentQ < questions.length - 1) {
            nextBtn.style.display = 'inline-flex';
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
        <li><b>Active Student Engagement:</b> Call on students to answer each question before clicking.</li>
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
              <div style="display: flex; flex-direction: column; gap: 0.6rem; margin-top: 0.5rem;">
                <div style="background: rgba(0, 229, 255, 0.05); border: 1px solid rgba(0, 229, 255, 0.2); border-radius: var(--radius-sm); padding: 0.6rem;">
                  <div style="font-weight: 700; color: var(--neon-cyan); font-size: 0.85rem;">1. Respect the Biological Clock</div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    Motion-to-Photon must stay under <b>20 milliseconds</b>. Dropping frames induces nausea.
                  </div>
                </div>

                <div style="background: rgba(139, 92, 246, 0.05); border: 1px solid rgba(139, 92, 246, 0.2); border-radius: var(--radius-sm); padding: 0.6rem;">
                  <div style="font-weight: 700; color: var(--neon-purple); font-size: 0.85rem;">2. Decouple Tracking from Network</div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    Local head orientation must never wait on remote servers. Use client prediction and ATW.
                  </div>
                </div>

                <div style="background: rgba(0, 255, 157, 0.05); border: 1px solid rgba(0, 255, 157, 0.2); border-radius: var(--radius-sm); padding: 0.6rem;">
                  <div style="font-weight: 700; color: var(--neon-green); font-size: 0.85rem;">3. Optics and Silicon Must Cooperate</div>
                  <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 0.2rem;">
                    Barrel distortion shaders pre-warp images for Pancake lenses; strobed displays freeze motion on the retina.
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.5rem;">
              <button class="cyber-btn" id="s18-replay-btn" style="flex: 1;">🎬 Replay Boot Sequence</button>
              <button class="cyber-btn secondary" id="s18-overview-btn" style="flex: 1;">📑 All 18 Slides</button>
            </div>
          </div>

          <!-- Final Architectural Diagram Card -->
          <div class="content-card" style="align-items: center; justify-content: center; text-align: center;">
            <span class="card-badge">THE IMMERSIVE COMPUTING HORIZON</span>
            <div style="font-size: 2.8rem; margin: 0.4rem 0;" aria-hidden="true">🌐 🥽 ⚡</div>
            <h3 style="color: var(--neon-cyan); margin-bottom: 0.4rem;">Virtual Reality Architecture</h3>
            <p style="color: var(--text-secondary); font-size: 0.82rem; line-height: 1.5; max-width: 380px;">
              You have traced the journey of physical head motion across IMU sensors, Kalman fusion, stereo GPU rasterization, Asynchronous TimeWarp, and folded pancake optics.
            </p>
            <div style="margin-top: 0.75rem; padding: 0.5rem 1rem; border-radius: var(--radius-sm); background: rgba(0, 229, 255, 0.1); border: 1px solid var(--neon-cyan); font-family: var(--font-mono); font-size: 0.78rem; color: var(--neon-cyan);">
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
      </ul>
    `
  }
];

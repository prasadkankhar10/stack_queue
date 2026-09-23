/**
 * VR Architecture: From Head Movement to Photons
 * Academic Light Lecture Edition — 18 High-Fidelity 3D Slides
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
            <h3 style="color: var(--text-primary); margin: 0.35rem 0 0.5rem 0; font-size: 1.15rem; font-weight: 800;">
              How Do We Fool the Human Brain?
            </h3>
            <p style="color: var(--text-secondary); line-height: 1.5; font-size: 0.85rem; margin-bottom: 0.6rem;">
              When you turn your head, your vestibular inner-ear organs detect motion instantly.
              In Virtual Reality, sensors must detect that motion, update a 3D scene, render two distinct eye perspectives, and emit light onto your retinas—all in <b>less than 20 milliseconds</b>.
            </p>

            <div style="background: #EFF6FF; border: 1px solid rgba(37, 99, 235, 0.2); border-radius: var(--radius-sm); padding: 0.6rem 0.75rem; margin-bottom: 0.6rem;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 0.25rem;">
                <span style="font-weight: 700; color: var(--accent-blue); font-size: 0.75rem;">MOTION-TO-PHOTON BUDGET</span>
                <span style="font-family: var(--font-mono); color: var(--accent-green); font-weight: 800; font-size: 0.75rem;">&lt; 20ms THRESHOLD</span>
              </div>
              <div style="height: 6px; background: rgba(15, 23, 42, 0.08); border-radius: 3px; overflow: hidden;">
                <div style="width: 75%; height: 100%; background: linear-gradient(90deg, var(--accent-green), var(--accent-blue));"></div>
              </div>
              <div style="font-size: 0.68rem; color: var(--text-muted); margin-top: 0.25rem;">
                Exceeding 20ms breaks presence and induces severe simulator sickness.
              </div>
            </div>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">Head Yaw Angle:</span>
                <input type="range" class="cyber-slider" id="s1-yaw-slider" min="-90" max="90" value="0">
                <span class="telemetry-value" id="s1-yaw-val">0°</span>
              </div>
              <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem;">
                <button class="cyber-btn" id="s1-packet-btn" style="flex: 1;">⚡ Fire Motion Packet</button>
                <button class="cyber-btn secondary" id="s1-reset-btn">Reset</button>
              </div>
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
            <div class="three-canvas-container" id="s1-3d-container">
              <div class="three-overlay-badge">🥽 3D REAL-TIME HMD MODEL</div>
              <div class="three-drag-hint">🖱️ Drag to Orbit 360°</div>
            </div>
            <div id="s1-status" style="font-size: 0.75rem; font-family: var(--font-mono); color: var(--accent-blue); text-align: center; margin-top: 0.35rem; font-weight: 700;">
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

      const packetGeo = new THREE.SphereGeometry(0.12, 16, 16);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x059669 });
      const packet = new THREE.Mesh(packetGeo, packetMat);
      packet.visible = false;
      sceneData.scene.add(packet);

      let isPulsing = false;
      let packetT = 0;

      sceneData.animate((time) => {
        headset.position.y = Math.sin(time * 0.002) * 0.05;
        if (isPulsing) {
          packetT += 0.05;
          packet.position.set(0, 0, 1.8 - packetT * 2.2);
          if (packetT >= 1) {
            isPulsing = false;
            packet.visible = false;
            plate.material.emissiveIntensity = 0.25;
            leftLens.material.emissiveIntensity = 0.5;
            rightLens.material.emissiveIntensity = 0.5;
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
          status.innerHTML = `<span style="color: var(--accent-green)">⚡ Motion Packet Routed → Engine Tick → Dual Draw Call → Photons! (12.4ms)</span>`;
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
  // SLIDE 2: WHAT HAPPENS WHEN YOU MOVE YOUR HEAD? (6 FULLY VISIBLE STAGES)
  // ==========================================
  {
    id: 'slide-2',
    part: 'The Motion Pipeline',
    partNumber: 'PART 2',
    title: 'What Happens When You Move Your Head?',
    subtitle: 'The 6-Step Pipeline from Mechanical Movement to Light Emitted by Pixels',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%; min-height: 0;">
          <!-- Fully Visible 6-Step Pipeline Grid -->
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
          <div class="split-layout" style="flex: 1; min-height: 0;">
            <div class="content-card" style="padding: 0.4rem;">
              <div class="three-canvas-container" id="s2-3d-container">
                <div class="three-overlay-badge">👤 3D HEAD KINEMATICS</div>
                <div class="three-drag-hint">Rotate sliders to trace data</div>
              </div>
            </div>

            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge">ORIENTATION INPUTS</span>
                <div class="control-panel">
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

              <div class="telemetry-box" id="s2-telemetry" style="height: 80px; font-size: 0.72rem; margin-top: 0.4rem;">
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
Motion Delta: ${Math.hypot(y, p, r).toFixed(1)}°
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
        <li><b>6-Step Motion Flow:</b> IMU Sampling &rarr; Kalman Fusion &rarr; Engine Camera Matrix &rarr; Stereo Render &rarr; ATW Reprojection &rarr; Retina Photons.</li>
        <li><b>Frequency Mismatch:</b> Highlight that IMUs poll at 1000Hz (1ms intervals) while rendering runs at 90Hz (11.1ms intervals).</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 3: VR SYSTEM ARCHITECTURE (3D LAYER TOWER)
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
          <div style="display: flex; flex-direction: column; gap: 0.35rem; justify-content: space-between;">
            <div class="content-card clickable-layer active" data-layer="1" style="cursor: pointer; padding: 0.45rem 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">1. Physical & Human Layer</div>
                <span class="card-badge">INPUT</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                Head kinematics, IPD (55-72mm), vestibular organs, hand controllers.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="2" style="cursor: pointer; padding: 0.45rem 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">2. Sensor & Tracking Layer</div>
                <span class="card-badge">FUSION</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                1000Hz 6-DOF IMU, SLAM infrared cameras, Kalman pose estimation.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="3" style="cursor: pointer; padding: 0.45rem 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">3. Runtime & Engine Layer</div>
                <span class="card-badge">COMPUTE</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                OpenXR runtime, scene graph, physics simulation, spatial audio.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="4" style="cursor: pointer; padding: 0.45rem 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">4. Graphics & Rendering Layer</div>
                <span class="card-badge">GPU</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                Stereo frustum rasterization, shader passes, Asynchronous TimeWarp.
              </div>
            </div>

            <div class="content-card clickable-layer" data-layer="5" style="cursor: pointer; padding: 0.45rem 0.75rem;">
              <div style="display: flex; justify-content: space-between; align-items: center;">
                <div style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">5. Optical & Display Layer</div>
                <span class="card-badge">OUTPUT</span>
              </div>
              <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                Fast-switch LCD/OLED panels, Pancake lenses, ocular eyebox.
              </div>
            </div>
          </div>

          <!-- 3D Layer Stack Viewport -->
          <div class="content-card" style="padding: 0.4rem; position: relative;">
            <div class="three-canvas-container" id="s3-3d-container">
              <div class="three-overlay-badge" id="s3-layer-badge">LAYER 1: PHYSICAL & HUMAN</div>
              <div class="three-drag-hint">🖱️ Click layer to isolate tier</div>
            </div>
            <div id="s3-detail-specs" style="font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-blue); text-align: center; margin-top: 0.35rem; font-weight: 700;">
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
      const colors = [0x2563EB, 0x7C3AED, 0x059669, 0xD97706, 0xDC2626];

      for (let i = 0; i < 5; i++) {
        const geo = new THREE.BoxGeometry(2.4, 0.1, 1.4);
        const mat = new THREE.MeshStandardMaterial({
          color: colors[i],
          metalness: 0.5,
          roughness: 0.3,
          transparent: true,
          opacity: 0.85
        });
        const p = new THREE.Mesh(geo, mat);
        p.position.y = (2 - i) * 0.42;
        group.add(p);
        plates.push(p);
      }

      const sceneData = window.VR3D.initScene(container, {
        targetGroup: group,
        camZ: 3.2,
        camY: 0.4,
        initRotX: 0.25,
        initRotY: -0.45
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
            p.scale.set(i === idx ? 1.15 : 1, i === idx ? 1.6 : 1, i === idx ? 1.15 : 1);
            p.material.opacity = i === idx ? 1.0 : 0.35;
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
        <li><b>5 Architecture Layers:</b> Point out that VR is a closed feedback loop across 5 distinct engineering layers: Human Anatomy &rarr; Physics/Sensors &rarr; OS/Runtime &rarr; GPU Silicon &rarr; Optical Physics.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 4: HARDWARE EXPLODED ASSEMBLY (WITH EXPLODE SLIDER)
  // ==========================================
  {
    id: 'slide-4',
    part: 'Hardware Systems',
    partNumber: 'PART 4',
    title: 'The VR Hardware Layer: Inside the Headset',
    subtitle: 'Interactive Exploded Teardown of Sensors, Silicon, Displays, and Pancake Optics',
    render: function() {
      return `
        <div class="split-layout">
          <div style="display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem;">
              <div class="content-card hw-card active" data-hw="imu" style="cursor: pointer; padding: 0.5rem;">
                <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.8rem;">🧭 MEMS IMU</div>
                <div style="font-size: 0.68rem; color: var(--text-secondary);">1000Hz Gyro & Accelerometer</div>
              </div>

              <div class="content-card hw-card" data-hw="cameras" style="cursor: pointer; padding: 0.5rem;">
                <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.8rem;">📷 IR Cameras</div>
                <div style="font-size: 0.68rem; color: var(--text-secondary);">4x Global Shutter Computer Vision</div>
              </div>

              <div class="content-card hw-card" data-hw="soc" style="cursor: pointer; padding: 0.5rem;">
                <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.8rem;">⚡ Compute SoC</div>
                <div style="font-size: 0.68rem; color: var(--text-secondary);">Snapdragon XR2 / Desktop GPU</div>
              </div>

              <div class="content-card hw-card" data-hw="display" style="cursor: pointer; padding: 0.5rem;">
                <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.8rem;">🖥️ Fast-Switch LCD</div>
                <div style="font-size: 0.68rem; color: var(--text-secondary);">Dual 2.5K Panels @ 120Hz</div>
              </div>

              <div class="content-card hw-card" data-hw="optics" style="cursor: pointer; padding: 0.5rem;">
                <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.8rem;">🔍 Pancake Optics</div>
                <div style="font-size: 0.68rem; color: var(--text-secondary);">Folded Polarized Light Path</div>
              </div>

              <div class="content-card hw-card" data-hw="audio" style="cursor: pointer; padding: 0.5rem;">
                <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.8rem;">🎧 Spatial Audio</div>
                <div style="font-size: 0.68rem; color: var(--text-secondary);">HRTF 3D Binaural Sound DSP</div>
              </div>
            </div>

            <!-- Explode Assembly Slider -->
            <div class="control-panel" style="margin-top: 0.4rem;">
              <div class="control-row">
                <span class="control-label" style="font-size: 0.72rem;">Explode Assembly:</span>
                <input type="range" class="cyber-slider" id="s4-explode-slider" min="0" max="100" value="60">
                <span class="telemetry-value" id="s4-explode-val">60%</span>
              </div>
            </div>

            <div class="telemetry-box" id="s4-desc" style="height: 65px; font-size: 0.72rem; margin-top: 0.4rem;">
[MEMS IMU SELECTED] Samples angular velocity at 1000Hz (1ms) to predict pose before cameras finish a frame.
            </div>
          </div>

          <!-- 3D Exploded Headset View -->
          <div class="content-card" style="padding: 0.4rem; position: relative;">
            <div class="three-canvas-container" id="s4-3d-container">
              <div class="three-overlay-badge" id="s4-badge">HARDWARE EXPLODED ASSEMBLY</div>
              <div class="three-drag-hint">🖱️ Drag to rotate / Slide to explode</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const cards = document.querySelectorAll('.hw-card');
      const badge = document.getElementById('s4-badge');
      const desc = document.getElementById('s4-desc');
      const slider = document.getElementById('s4-explode-slider');
      const valText = document.getElementById('s4-explode-val');
      const container = document.getElementById('s4-3d-container');

      if (!container || !window.VR3D) return;

      const group = new THREE.Group();

      // Front plate
      const plateGeo = new THREE.BoxGeometry(1.6, 0.9, 0.06);
      const plateMat = new THREE.MeshStandardMaterial({ color: 0x0F172A, metalness: 0.9, roughness: 0.2 });
      const plate = new THREE.Mesh(plateGeo, plateMat);
      group.add(plate);

      // Display panel
      const dispGeo = new THREE.BoxGeometry(1.4, 0.75, 0.04);
      const dispMat = new THREE.MeshStandardMaterial({ color: 0x0284C7, emissive: 0x0284C7, emissiveIntensity: 0.4 });
      const disp = new THREE.Mesh(dispGeo, dispMat);
      group.add(disp);

      // Pancake Lenses
      const lensGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.08, 24);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.85 });
      const lensL = new THREE.Mesh(lensGeo, lensMat);
      lensL.rotation.x = Math.PI / 2;
      lensL.position.x = -0.35;
      const lensR = lensL.clone();
      lensR.position.x = 0.35;
      group.add(lensL);
      group.add(lensR);

      // IMU & SoC Motherboard
      const imuGeo = new THREE.BoxGeometry(0.2, 0.2, 0.08);
      const imuMat = new THREE.MeshStandardMaterial({ color: 0xD97706, emissive: 0xD97706, emissiveIntensity: 0.6 });
      const imu = new THREE.Mesh(imuGeo, imuMat);
      group.add(imu);

      // Visor Casing
      const visorGeo = new THREE.BoxGeometry(1.62, 0.92, 0.2);
      const visorMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.6 });
      const visor = new THREE.Mesh(visorGeo, visorMat);
      group.add(visor);

      function updateExplosion(pct) {
        const factor = pct / 100;
        plate.position.z = 0.2 + factor * 1.2;
        disp.position.z = 0.0 + factor * 0.5;
        imu.position.z = -0.2 - factor * 0.1;
        lensL.position.z = -0.4 - factor * 0.7;
        lensR.position.z = -0.4 - factor * 0.7;
        visor.position.z = -0.6 - factor * 1.2;
      }

      updateExplosion(60);

      const sceneData = window.VR3D.initScene(container, {
        targetGroup: group,
        camZ: 3.2,
        camY: 0.5,
        initRotX: 0.2,
        initRotY: -0.5
      });

      if (!sceneData) return;
      sceneData.scene.add(group);

      sceneData.animate((time) => {
        group.rotation.y += 0.002;
      });

      if (slider) {
        slider.addEventListener('input', (e) => {
          const val = parseInt(e.target.value);
          valText.textContent = `${val}%`;
          updateExplosion(val);
          if (window.vrAudio) window.vrAudio.playClick(320);
        });
      }

      const data = {
        'imu': '[MEMS IMU SELECTED] Samples angular rate at 1000Hz (1ms). Direct SPI bus to real-time DSP.',
        'cameras': '[TRACKING CAMERAS] 4x Monochrome infrared global shutter cameras. Triangulates position in space.',
        'soc': '[COMPUTE SOC] Snapdragon XR2 Gen 2 / Apple M2. Dedicated video decompression & reprojection.',
        'display': '[FAST-SWITCH LCD] Sub-millisecond response time with <1ms strobed illumination prevents motion blur.',
        'optics': '[FOLDED PANCAKE LENSES] Polarized light bouncing cuts optical depth in half, reducing front-heavy weight.',
        'audio': '[SPATIAL AUDIO DSP] HRTF filter engine calculates pinna time and level delay to place sounds in 3D.'
      };

      cards.forEach(card => {
        card.addEventListener('click', () => {
          cards.forEach(c => c.classList.remove('active'));
          card.classList.add('active');
          const hw = card.getAttribute('data-hw');
          badge.textContent = `SELECTED: ${card.querySelector('div').textContent}`;
          desc.textContent = data[hw];
          if (window.vrAudio) window.vrAudio.playClick(450);
        });
      });
    },
    notes: `
      <b>Slide 4 Talking Points:</b>
      <ul>
        <li><b>Exploded View:</b> Drag the Explode Assembly slider to physically separate the optical elements and show students how light travels from display to lenses to the eye.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 5: 3-DOF VS 6-DOF (CLEAR INTUITIVE PARALLAX TEST)
  // ==========================================
  {
    id: 'slide-5',
    part: 'Tracking & Kinematics',
    partNumber: 'PART 5',
    title: 'Head-Coupled Display: 3-DOF vs 6-DOF',
    subtitle: 'The Motion Parallax Test: Why Rotating Alone Causes Sickness, and How Translation Fixes It',
    render: function() {
      return `
        <div class="split-layout">
          <div class="content-card" style="justify-content: space-between;">
            <div>
              <span class="card-badge">THE MOTION PARALLAX TEST</span>
              <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem;">
                In the physical world, when you lean sideways, objects close to you shift across your vision faster than far away objects. This is <b>Motion Parallax</b>.
              </p>

              <div style="display: flex; gap: 0.4rem; margin-bottom: 0.5rem;">
                <button class="cyber-btn" id="s5-mode-6dof" style="flex: 1;">✓ 6-DOF (Modern VR)</button>
                <button class="cyber-btn secondary" id="s5-mode-3dof" style="flex: 1;">✕ 3-DOF (Cardboard)</button>
              </div>

              <div class="control-panel">
                <div class="control-row">
                  <span class="control-label" style="font-size: 0.72rem;">Lean Body (Sway):</span>
                  <input type="range" class="cyber-slider" id="s5-lean-slider" min="-50" max="50" value="0">
                  <span class="telemetry-value" id="s5-lean-val">0 cm</span>
                </div>
              </div>
            </div>

            <div id="s5-alert-box" style="background: #ECFDF5; border: 1px solid rgba(5, 150, 105, 0.3); border-radius: var(--radius-sm); padding: 0.6rem; font-size: 0.75rem; color: var(--accent-green);">
              <b>✓ 6-DOF PARALLAX ACTIVE:</b> As you lean, the camera shifts sideways. The foreground pillar moves faster than the background sphere, matching inner-ear balance!
            </div>
          </div>

          <!-- 3D Parallax Viewport -->
          <div class="content-card" style="padding: 0.4rem; position: relative;">
            <div class="three-canvas-container" id="s5-3d-container">
              <div class="three-overlay-badge" id="s5-badge">6-DOF: LEAN TO PEEK BEHIND PILLAR</div>
              <div class="three-drag-hint">Move Lean Slider</div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      let is6DOF = true;
      const btn6 = document.getElementById('s5-mode-6dof');
      const btn3 = document.getElementById('s5-mode-3dof');
      const slider = document.getElementById('s5-lean-slider');
      const valText = document.getElementById('s5-lean-val');
      const alertBox = document.getElementById('s5-alert-box');
      const badge = document.getElementById('s5-badge');
      const container = document.getElementById('s5-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.5, camY: 0.6 });
      if (!sceneData) return;

      // Close foreground pillar
      const pillarGeo = new THREE.CylinderGeometry(0.22, 0.22, 2.2, 16);
      const pillarMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.6 });
      const pillar = new THREE.Mesh(pillarGeo, pillarMat);
      pillar.position.set(0, 0, 1.0);
      sceneData.scene.add(pillar);

      // Target hidden directly behind pillar
      const orbGeo = new THREE.SphereGeometry(0.3, 24, 24);
      const orbMat = new THREE.MeshStandardMaterial({ color: 0x059669, emissive: 0x059669, emissiveIntensity: 0.6 });
      const orb = new THREE.Mesh(orbGeo, orbMat);
      orb.position.set(0, 0, -1.0);
      sceneData.scene.add(orb);

      sceneData.animate((time) => {
        orb.rotation.y = time * 0.002;
      });

      function updateLean() {
        let lean = parseFloat(slider.value);
        valText.textContent = `${lean} cm`;

        if (!is6DOF) {
          sceneData.camera.position.x = 0;
          alertBox.style.background = '#FEF2F2';
          alertBox.style.borderColor = 'rgba(220, 38, 38, 0.3)';
          alertBox.style.color = '#DC2626';
          alertBox.innerHTML = `<b>⚠️ 3-DOF LIMITATION (NO PARALLAX):</b> Neck translation ignored! The green target stays completely occluded behind the pillar. Inner ear signals motion, but eyes see static world &rarr; Brain triggers nausea!`;
          badge.textContent = '3-DOF: CAMERA LOCKED (NO PARALLAX)';
        } else {
          sceneData.camera.position.x = (lean / 50) * 1.6;
          alertBox.style.background = '#ECFDF5';
          alertBox.style.borderColor = 'rgba(5, 150, 105, 0.3)';
          alertBox.style.color = '#059669';
          alertBox.innerHTML = `<b>✓ 6-DOF PARALLAX ACTIVE:</b> Camera translates sideways! Leaning reveals the green sphere hidden behind the pillar, perfectly matching vestibular balance!`;
          badge.textContent = '6-DOF: LEAN TO PEEK BEHIND PILLAR';
        }
        if (window.vrAudio) window.vrAudio.playClick(320);
      }

      slider.addEventListener('input', updateLean);

      btn6.addEventListener('click', () => {
        is6DOF = true;
        btn6.className = 'cyber-btn';
        btn3.className = 'cyber-btn secondary';
        updateLean();
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btn3.addEventListener('click', () => {
        is6DOF = false;
        btn3.className = 'cyber-btn';
        btn6.className = 'cyber-btn secondary';
        updateLean();
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 5 Talking Points:</b>
      <ul>
        <li><b>The Parallax Test:</b> Demonstrate how 3-DOF cannot see around the pillar, whereas 6-DOF translation reveals the hidden object, eliminating simulator sickness.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 6: TRACKING SYSTEMS & ACADEMIC MATRIX
  // ==========================================
  {
    id: 'slide-6',
    part: 'Tracking & Kinematics',
    partNumber: 'PART 6',
    title: 'Tracking Systems: Inside-Out vs Outside-In',
    subtitle: 'SLAM Computer Vision versus Infrared Lighthouse Laser Sweeping',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%;">
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="cyber-btn" id="s6-mode-inside" style="width: 200px;">Inside-Out (SLAM)</button>
            <button class="cyber-btn secondary" id="s6-mode-outside" style="width: 200px;">Outside-In (Lighthouse)</button>
            <button class="cyber-btn secondary" id="s6-occlude-btn" style="width: 200px;">Simulate Occlusion</button>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- 3D Tracking Rays Visualizer -->
            <div class="content-card" style="padding: 0.4rem; position: relative;">
              <div class="three-canvas-container" id="s6-3d-container">
                <div class="three-overlay-badge" id="s6-canvas-badge">INSIDE-OUT: 4X SLAM TRACKING RAYS</div>
                <div class="three-drag-hint">Orbit to view camera rays</div>
              </div>
            </div>

            <!-- Formatted Academic Comparison Table -->
            <div class="content-card" style="justify-content: space-between;">
              <table class="academic-table">
                <thead>
                  <tr>
                    <th>Feature</th>
                    <th>Inside-Out (SLAM)</th>
                    <th>Outside-In (Lighthouse)</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td><b>Hardware</b></td>
                    <td>4x Onboard IR Cameras</td>
                    <td>2-4 Fixed Base Stations</td>
                  </tr>
                  <tr>
                    <td><b>Mobility</b></td>
                    <td>100% Free-Roaming</td>
                    <td>Tethered / Dedicated Room</td>
                  </tr>
                  <tr>
                    <td><b>Occlusion</b></td>
                    <td>Blind spots behind body</td>
                    <td>Zero occlusion in volume</td>
                  </tr>
                  <tr>
                    <td><b>Precision</b></td>
                    <td>~1.0mm positional jitter</td>
                    <td>Sub-millimeter (&lt;0.1mm)</td>
                  </tr>
                  <tr>
                    <td><b>Latency</b></td>
                    <td>~2.5ms CV processing</td>
                    <td>&lt;1.0ms photodiode timing</td>
                  </tr>
                </tbody>
              </table>

              <div id="s6-warning-box" style="margin-top: 0.4rem; padding: 0.5rem; border-radius: var(--radius-sm); background: #EFF6FF; border: 1px solid rgba(37, 99, 235, 0.25); font-size: 0.72rem; color: var(--accent-blue);">
                <b>ACTIVE TRACKING STATUS:</b> Nominal execution. 4 tracking cameras detecting room feature points.
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
      const warnBox = document.getElementById('s6-warning-box');
      const container = document.getElementById('s6-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.2, camY: 0.8 });
      if (!sceneData) return;

      const { group: hmd } = window.VR3D.createHeadset();
      hmd.scale.set(0.7, 0.7, 0.7);
      sceneData.scene.add(hmd);

      const cones = [];
      const coneAngles = [
        { rotY: 0.4, rotX: 0.3 }, { rotY: -0.4, rotX: 0.3 },
        { rotY: 0.4, rotX: -0.3 }, { rotY: -0.4, rotX: -0.3 }
      ];
      coneAngles.forEach(a => {
        const frustum = window.VR3D.createFrustum(0x0284C7, 50, 1.2, 0.2, 1.8);
        frustum.group.rotation.y = a.rotY;
        frustum.group.rotation.x = a.rotX;
        hmd.add(frustum.group);
        cones.push(frustum);
      });

      const lighthouseGroup = new THREE.Group();
      lighthouseGroup.visible = false;
      const lh1 = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.3, 0.3), new THREE.MeshStandardMaterial({ color: 0x7C3AED }));
      lh1.position.set(-2, 1.5, -1.5);
      const lh2 = lh1.clone();
      lh2.position.set(2, 1.5, 1.5);
      lighthouseGroup.add(lh1);
      lighthouseGroup.add(lh2);

      const laserMat = new THREE.LineBasicMaterial({ color: 0x7C3AED, transparent: true, opacity: 0.85 });
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
        warnBox.style.background = '#EFF6FF';
        warnBox.style.borderColor = 'rgba(37, 99, 235, 0.25)';
        warnBox.style.color = 'var(--accent-blue)';
        warnBox.innerHTML = '<b>ACTIVE TRACKING STATUS:</b> Nominal execution. 4 tracking cameras detecting room feature points.';
        if (window.vrAudio) window.vrAudio.playClick(400);
      });

      btnOut.addEventListener('click', () => {
        currentMode = 'outside';
        btnOut.className = 'cyber-btn';
        btnIn.className = 'cyber-btn secondary';
        cones.forEach(c => c.group.visible = false);
        lighthouseGroup.visible = true;
        badge.textContent = 'OUTSIDE-IN: DUAL LIGHTHOUSE LASERS';
        warnBox.style.background = '#F3E8FF';
        warnBox.style.borderColor = 'rgba(124, 58, 237, 0.25)';
        warnBox.style.color = '#7C3AED';
        warnBox.innerHTML = '<b>ACTIVE TRACKING STATUS:</b> Sub-millimeter Lighthouse laser sweeping active. Zero blind spots.';
        if (window.vrAudio) window.vrAudio.playClick(520);
      });

      btnOcc.addEventListener('click', () => {
        if (currentMode === 'inside') {
          warnBox.style.background = '#FEF2F2';
          warnBox.style.borderColor = 'rgba(220, 38, 38, 0.3)';
          warnBox.style.color = '#DC2626';
          warnBox.innerHTML = '<b>⚠️ OCCLUSION DETECTED!</b> Hands placed behind back! Cameras lost controller visibility &rarr; Falling back to IMU dead reckoning (drift will occur in 500ms).';
          if (window.vrAudio) window.vrAudio.playBuzz();
        } else {
          warnBox.style.background = '#ECFDF5';
          warnBox.style.borderColor = 'rgba(5, 150, 105, 0.3)';
          warnBox.style.color = '#059669';
          warnBox.innerHTML = '<b>✓ LINE-OF-SIGHT MAINTAINED:</b> Dual base stations sweep across user from front and back. Zero tracking loss!';
          if (window.vrAudio) window.vrAudio.playSuccess();
        }
      });
    },
    notes: `
      <b>Slide 6 Talking Points:</b>
      <ul>
        <li><b>Comparison Matrix:</b> Walk students through the table comparing mobility vs accuracy.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 7: 3D-TO-2D PROJECTION & PIXEL RASTERIZATION
  // ==========================================
  {
    id: 'slide-7',
    part: 'Rendering Pipeline',
    partNumber: 'PART 7',
    title: 'The VR Rendering Pipeline: 3D to 2D Rasterization',
    subtitle: 'Interactive Demonstration of How 3D World Geometry is Projected and Rasterized Pixel-by-Pixel',
    render: function() {
      return `
        <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%;">
          <div class="content-card" style="padding: 0.4rem 0.8rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">
                3D World Coordinates &rarr; Perspective Projection &rarr; Pixel Rasterization
              </span>
              <button class="cyber-btn small" id="s7-scan-btn">▶ Run Scanline Rasterizer</button>
            </div>
          </div>

          <div class="split-layout" style="flex: 1;">
            <!-- 3D-to-2D Viewport Simulator -->
            <div class="content-card" style="padding: 0.4rem; position: relative;">
              <div class="three-canvas-container" id="s7-3d-container">
                <div class="three-overlay-badge" id="s7-badge">3D SCENE &rarr; 2D SCREEN GRID</div>
                <div class="three-drag-hint">Watch rays project onto pixels</div>
              </div>
            </div>

            <!-- Rasterization Steps Breakdown -->
            <div class="content-card" style="justify-content: space-between;">
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <div style="background: #EFF6FF; padding: 0.45rem 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-blue); font-size: 0.75rem;">
                  <b style="color: var(--accent-blue);">1. 3D Model Vertices (X, Y, Z):</b> Objects defined in 3D world space.
                </div>
                <div style="background: #F3E8FF; padding: 0.45rem 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-purple); font-size: 0.75rem;">
                  <b style="color: var(--accent-purple);">2. Perspective Projection Matrix:</b> Maps 3D coordinates onto a 2D viewport plane.
                </div>
                <div style="background: #ECFDF5; padding: 0.45rem 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-green); font-size: 0.75rem;">
                  <b style="color: var(--accent-green);">3. Pixel Rasterization:</b> Determines which screen pixels are covered by triangles.
                </div>
                <div style="background: #FEF3C7; padding: 0.45rem 0.6rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-amber); font-size: 0.75rem;">
                  <b style="color: var(--accent-amber);">4. Fragment Shading & Barrel Warp:</b> Pre-distorts image to cancel optical lens curvature.
                </div>
              </div>

              <div class="telemetry-box" id="s7-telem" style="height: 60px; font-size: 0.72rem;">
[PIXEL RASTERIZER] Click "Run Scanline Rasterizer" to watch 3D triangles convert into 2D display pixels!
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const scanBtn = document.getElementById('s7-scan-btn');
      const badge = document.getElementById('s7-badge');
      const telem = document.getElementById('s7-telem');
      const container = document.getElementById('s7-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.4, camY: 0.6 });
      if (!sceneData) return;

      // 3D Triangle in background
      const triGeo = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        0.0, 0.8, -1.0,
        -0.8, -0.6, -1.0,
        0.8, -0.6, -1.0
      ]);
      triGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      const triMat = new THREE.MeshBasicMaterial({ color: 0x2563EB, side: THREE.DoubleSide });
      const triangle = new THREE.Mesh(triGeo, triMat);
      sceneData.scene.add(triangle);

      // 2D Transparent Pixel Grid in foreground
      const gridHelper = new THREE.GridHelper(1.8, 12, 0x0284C7, 0x94A3B8);
      gridHelper.rotation.x = Math.PI / 2;
      gridHelper.position.set(0, 0, 0.5);
      sceneData.scene.add(gridHelper);

      // Scanning bar
      const barGeo = new THREE.BoxGeometry(1.8, 0.04, 0.02);
      const barMat = new THREE.MeshBasicMaterial({ color: 0x059669 });
      const scanBar = new THREE.Mesh(barGeo, barMat);
      scanBar.position.set(0, 0.9, 0.52);
      sceneData.scene.add(scanBar);

      let isScanning = false;
      let scanY = 0.9;

      sceneData.animate(() => {
        if (isScanning) {
          scanY -= 0.02;
          scanBar.position.y = scanY;
          if (scanY < -0.9) {
            scanY = 0.9;
            isScanning = false;
            telem.innerHTML = `<span style="color: #34D399; font-weight: 700;">✓ RASTERIZATION COMPLETE: 144 fragments shaded. Frame dispatched to Asynchronous TimeWarp!</span>`;
            if (window.vrAudio) window.vrAudio.playSuccess();
          }
        }
      });

      scanBtn.addEventListener('click', () => {
        isScanning = true;
        scanY = 0.9;
        telem.textContent = `[SCANLINE RASTERIZING] Row Y=${scanY.toFixed(2)}: Evaluating barycentric coordinates & shading pixels...`;
        if (window.vrAudio) window.vrAudio.playDataPacket();
      });
    },
    notes: `
      <b>Slide 7 Talking Points:</b>
      <ul>
        <li><b>3D to 2D Conversion:</b> Explain how the GPU transforms 3D triangles into screen pixels through perspective projection and rasterization.</li>
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
            <p style="font-size: 0.82rem; color: var(--text-secondary); line-height: 1.4; margin-bottom: 0.5rem;">
              Human depth perception relies on <b>stereopsis</b>: because your eyes are spaced ~64mm apart, each eye receives a slightly different angle of the world.
            </p>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">IPD Setting:</span>
                <input type="range" class="cyber-slider" id="s8-ipd-slider" min="55" max="72" value="64">
                <span class="telemetry-value" id="s8-ipd-val">64 mm</span>
              </div>
            </div>

            <div class="telemetry-box" id="s8-status" style="height: 75px; font-size: 0.72rem; margin-top: 0.5rem;">
Camera Baseline: 64.0 mm (Human Average)
Stereo Disparity Shift: ±1.8° at 1.5m focal distance
Convergence Status: Optimal Binocular Fusion
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
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

      const targetGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.8, 16);
      const targetMat = new THREE.MeshStandardMaterial({ color: 0xD97706, metalness: 0.6 });
      const target = new THREE.Mesh(targetGeo, targetMat);
      target.position.set(0, 0, -1.2);
      sceneData.scene.add(target);

      const leftFrustum = window.VR3D.createFrustum(0x2563EB, 40, 1.0, 0.3, 2.2);
      const rightFrustum = window.VR3D.createFrustum(0x7C3AED, 40, 1.0, 0.3, 2.2);

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
${ipd < 58 ? '<span style="color: #DC2626;">Warning: Narrow IPD! Strain for average adult.</span>' : ipd > 68 ? '<span style="color: #DC2626;">Warning: Wide IPD! Binocular alignment stretched.</span>' : '<span style="color: #059669;">Optimal Binocular Fusion (Nominal Comfort)</span>'}`;

        if (window.vrAudio) window.vrAudio.playClick(380);
      }

      slider.addEventListener('input', updateIPD);
      updateIPD();
    },
    notes: `
      <b>Slide 8 Talking Points:</b>
      <ul>
        <li><b>Interpupillary Distance:</b> Explain why the hardware lens spacing and software camera matrices must match human eye width (55mm–72mm).</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 9: GAME ENGINE & HARDWARE PERFORMANCE
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
            <div style="margin: 0.6rem 0;">
              <div style="display: flex; justify-content: space-between; font-size: 0.75rem; margin-bottom: 0.2rem;">
                <span>Frame-Time: <b id="s9-total-ms" style="color: var(--accent-green);">9.0 ms</b></span>
                <span style="color: var(--accent-red); font-weight: 800;">11.1ms DEADLINE</span>
              </div>
              <div style="height: 10px; background: rgba(15, 23, 42, 0.08); border-radius: 4px; overflow: hidden; display: flex;">
                <div id="s9-bar-cpu" style="width: 28%; height: 100%; background: var(--accent-blue);"></div>
                <div id="s9-bar-gpu" style="width: 52%; height: 100%; background: var(--accent-purple);"></div>
              </div>
            </div>

            <button class="cyber-btn" id="s9-optimize-btn">⚡ Auto-Optimize Profile</button>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
            <div class="three-canvas-container" id="s9-3d-container">
              <div class="three-overlay-badge" id="s9-fps-badge">90 FPS LOCKED (NOMINAL)</div>
              <div class="three-drag-hint">Watch mesh stutter on overload</div>
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
      const mat = new THREE.MeshStandardMaterial({ color: 0x2563EB, metalness: 0.7, roughness: 0.3 });
      const knot = new THREE.Mesh(geo, mat);
      sceneData.scene.add(knot);

      let isDropping = false;
      let frameCounter = 0;

      sceneData.animate(() => {
        frameCounter++;
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
          mat.color.setHex(0x2563EB);
          badge.textContent = '90 FPS LOCKED (NOMINAL)';
          badge.style.color = '#059669';
          totalMs.style.color = 'var(--accent-green)';
        } else {
          isDropping = true;
          mat.color.setHex(0xDC2626);
          badge.textContent = '⚠️ 45 FPS (FRAME DROP / STUTTER)';
          badge.style.color = '#DC2626';
          totalMs.style.color = 'var(--accent-red)';
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
        <li><b>The 11.1ms Math:</b> 1000ms / 90Hz = 11.11ms. In flat games, lag is just visual annoyance. In VR, dropping below 90 FPS triggers immediate nausea.</li>
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
          <div class="content-card" style="justify-content: space-around;">
            <span class="card-badge">THE DISTRIBUTED VR PARADOX</span>
            <p style="color: var(--text-secondary); font-size: 0.82rem; line-height: 1.4;">
              Internet round-trip latency across broadband is typically <b>30ms to 70ms</b>.
              Because VR motion-to-photon must stay strictly below <b>20ms</b>, a VR headset can <i>never</i> wait for a remote server before rendering head orientation.
            </p>

            <div style="background: #EFF6FF; padding: 0.5rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-blue); font-size: 0.75rem;">
              <b style="color: var(--accent-blue);">Client-Side Prediction:</b> Head orientation renders locally at 90+ FPS while predicting avatar positions.
            </div>
            <div style="background: #F3E8FF; padding: 0.5rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-purple); font-size: 0.75rem;">
              <b style="color: var(--accent-purple);">Snapshot Interpolation:</b> Smoothly blends remote players between server packets.
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
            <div class="three-canvas-container" id="s10-3d-container">
              <div class="three-overlay-badge">🌐 SERVER HUB & CLIENT SATELLITES</div>
              <div class="three-drag-hint">Orbit to view network topology</div>
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

      const srvGeo = new THREE.SphereGeometry(0.5, 24, 24);
      const srvMat = new THREE.MeshStandardMaterial({ color: 0x7C3AED, emissive: 0x7C3AED, emissiveIntensity: 0.5 });
      const server = new THREE.Mesh(srvGeo, srvMat);
      sceneData.scene.add(server);

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
        <li><b>The Network Paradox:</b> Cloud gaming works at 50ms ping, but VR head tracking can NEVER wait on the cloud. The local headset must render head orientation locally at 90 FPS.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 11: MULTIPLAYER VR RELAY
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

            <div style="display: flex; gap: 0.4rem; margin-top: 0.4rem;">
              <button class="cyber-btn" id="s11-send-btn" style="flex: 1;">📡 Broadcast Pose</button>
              <button class="cyber-btn secondary" id="s11-glitch-btn" style="flex: 1;">Simulate Spike</button>
            </div>

            <div class="telemetry-box" id="s11-log" style="height: 80px; font-size: 0.72rem; margin-top: 0.4rem;">
[NETWORK RELAY READY]
Local User: Node-A (Host / Origin)
Peers: Peer-B (Europe), Peer-C (Asia)
Dead Reckoning: Spline Interpolation Active
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
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
          log.innerHTML = `<span style="color: #F87171;">[PACKET LOSS] Pose packet dropped!\nDead reckoning predicts avatar trajectory.</span>\n` + log.innerHTML;
          if (window.vrAudio) window.vrAudio.playBuzz();
        } else {
          log.innerHTML = `<span style="color: #34D399;">[PACKET DELIVERED] Ping ${(p/2).toFixed(1)}ms. Spatial audio synced.</span>\n` + log.innerHTML;
          if (window.vrAudio) window.vrAudio.playDataPacket();
        }
      });

      glitchBtn.addEventListener('click', () => {
        log.innerHTML = `<span style="color: #FBBF24;">[JITTER SPIKE] High ping 240ms. Interpolating avatars...</span>\n` + log.innerHTML;
        if (window.vrAudio) window.vrAudio.playTone(200, 0.2);
      });

      ping.addEventListener('input', () => pingVal.textContent = `${ping.value} ms`);
      loss.addEventListener('input', () => lossVal.textContent = `${loss.value}%`);
    },
    notes: `
      <b>Slide 11 Talking Points:</b>
      <ul>
        <li><b>Dead Reckoning:</b> If a UDP packet drops over Wi-Fi, the client uses velocity vectors to predict position, preventing avatar teleportation.</li>
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
            <p style="color: var(--text-secondary); font-size: 0.82rem; line-height: 1.4;">
              In industrial simulators driving multiple 4K displays, no single GPU suffices.
              Hardware <b>Genlock (FrameLock)</b> synchronizes display scanouts across GPUs with microsecond precision.
            </p>

            <div style="display: flex; gap: 0.4rem; margin-top: 0.5rem;">
              <button class="cyber-btn" id="s12-genlock-on" style="flex: 1;">Genlock ON (Sync)</button>
              <button class="cyber-btn secondary" id="s12-genlock-off" style="flex: 1;">Genlock OFF (Tear)</button>
            </div>

            <div class="telemetry-box" id="s12-status" style="height: 70px; font-size: 0.72rem; margin-top: 0.5rem;">
✓ Hardware Genlock Active: All displays scanning out line 0 in microsecond phase.
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
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

      const screens = [];
      for (let i = 0; i < 3; i++) {
        const sGeo = new THREE.BoxGeometry(0.85, 1.2, 0.05);
        const sMat = new THREE.MeshStandardMaterial({ color: 0x2563EB, metalness: 0.7 });
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
        screens.forEach(s => s.material.color.setHex(0x2563EB));
        badge.textContent = 'SYNCHRONIZED CLUSTER NODES';
        status.innerHTML = `<span style="color: #34D399;">✓ Hardware Genlock Active: Microsecond scanout sync. Zero image tearing across wall seams.</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btnOff.addEventListener('click', () => {
        isTorn = true;
        btnOff.className = 'cyber-btn';
        btnOn.className = 'cyber-btn secondary';
        screens.forEach(s => s.material.color.setHex(0xDC2626));
        badge.textContent = '⚠️ GENLOCK DRIFT: WALL TEARING!';
        status.innerHTML = `<span style="color: #F87171;">⚠️ GENLOCK DISABLED: Screens scan out out-of-phase &rarr; Shearing across seams!</span>`;
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 12 Talking Points:</b>
      <ul>
        <li><b>Genlock (FrameLock):</b> Explain why multiple GPUs driving adjacent screens must be synchronized by hardware cables.</li>
      </ul>
    `
  },

  // ==========================================
  // SLIDE 13: CLUSTER RENDERING IN ACTION (CAVE)
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
            <p style="color: var(--text-secondary); font-size: 0.82rem; line-height: 1.4;">
              Unlike an HMD where screens move with your eyes, CAVE screens are fixed walls.
              Each GPU node renders an <b>asymmetric off-axis frustum</b> calculated dynamically based on user position.
            </p>

            <div class="control-panel">
              <div class="control-row">
                <span class="control-label">User Room X:</span>
                <input type="range" class="cyber-slider" id="s13-user-x" min="-40" max="40" value="0">
                <span class="telemetry-value" id="s13-user-x-val">0 cm</span>
              </div>
            </div>

            <div class="telemetry-box" id="s13-telemetry" style="height: 70px; font-size: 0.72rem; margin-top: 0.5rem;">
Off-Axis Asymmetry: ΔX=0.0cm | Barrier Latency: 0.4ms
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
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

      const wallMat = new THREE.MeshStandardMaterial({ color: 0x2563EB, transparent: true, opacity: 0.4 });
      const frontWall = new THREE.Mesh(new THREE.BoxGeometry(2.0, 1.4, 0.05), wallMat);
      frontWall.position.set(0, 0, -1.0);
      sceneData.scene.add(frontWall);

      const leftWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 2.0), wallMat);
      leftWall.position.set(-1.0, 0, 0);
      sceneData.scene.add(leftWall);

      const rightWall = new THREE.Mesh(new THREE.BoxGeometry(0.05, 1.4, 2.0), wallMat);
      rightWall.position.set(1.0, 0, 0);
      sceneData.scene.add(rightWall);

      const userSphere = new THREE.Mesh(new THREE.SphereGeometry(0.18, 16, 16), new THREE.MeshBasicMaterial({ color: 0x059669 }));
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
        <li><b>Asymmetric Frustums:</b> Explain how walking inside a CAVE shifts the viewpoint obliquely against fixed projection screens.</li>
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
            <p style="color: var(--text-secondary); font-size: 0.82rem; line-height: 1.4;">
              Evolution fine-tuned human vision and vestibular balancing for physical locomotion. If sensory data disagrees by >20ms, the brain assumes poison ingestion and triggers nausea.
            </p>

            <div style="display: flex; gap: 0.4rem; margin-top: 0.5rem;">
              <button class="cyber-btn" id="s14-low-lag" style="flex: 1;">15ms Mode (True VR)</button>
              <button class="cyber-btn secondary" id="s14-high-lag" style="flex: 1;">75ms Mode (Nausea Sim)</button>
            </div>

            <div class="telemetry-box" id="s14-lag-expl" style="height: 70px; font-size: 0.72rem; margin-top: 0.5rem;">
✓ 15ms Mode: Horizon responds instantly. Vestibular-ocular reflex satisfied.
            </div>
          </div>

          <div class="content-card" style="padding: 0.4rem; position: relative;">
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

      const terrainGeo = new THREE.PlaneGeometry(10, 10, 16, 16);
      const terrainMat = new THREE.MeshBasicMaterial({ color: 0x2563EB, wireframe: true });
      const terrain = new THREE.Mesh(terrainGeo, terrainMat);
      terrain.rotation.x = -Math.PI / 2;
      sceneData.scene.add(terrain);

      sceneData.animate();

      btnLow.addEventListener('click', () => {
        btnLow.className = 'cyber-btn';
        btnHigh.className = 'cyber-btn secondary';
        terrainMat.color.setHex(0x2563EB);
        badge.textContent = '15MS LATENCY (LOCKED)';
        expl.innerHTML = `<span style="color: #34D399;">✓ 15ms Mode: World responds instantly. Zero vestibular mismatch.</span>`;
        if (window.vrAudio) window.vrAudio.playSuccess();
      });

      btnHigh.addEventListener('click', () => {
        btnHigh.className = 'cyber-btn';
        btnLow.className = 'cyber-btn secondary';
        terrainMat.color.setHex(0xDC2626);
        badge.textContent = '⚠️ 75MS HIGH LATENCY (NAUSEA)';
        expl.innerHTML = `<span style="color: #F87171;">⚠️ 75ms High Lag Mode: The world drags behind your mouse! This causes acute nausea.</span>`;
        if (window.vrAudio) window.vrAudio.playBuzz();
      });
    },
    notes: `
      <b>Slide 14 Talking Points:</b>
      <ul>
        <li><b>Vestibular Mismatch:</b> Explain the biological defense mechanism that treats motion-photon mismatch as poisoning.</li>
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
        <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%;">
          <div class="content-card" style="padding: 0.4rem 0.8rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <span style="font-weight: 800; font-size: 0.85rem; color: var(--text-primary);">
                Unified System Map: Sensing &rarr; Runtime &rarr; Shaders &rarr; Optics
              </span>
              <button class="cyber-btn small" id="s15-trace-btn">⚡ Trace Live Motion Packet</button>
            </div>
          </div>

          <div class="split-layout" style="flex: 1;">
            <div class="content-card" style="padding: 0.4rem; position: relative;">
              <div class="three-canvas-container" id="s15-3d-container">
                <div class="three-overlay-badge" id="s15-badge">HERO ARCHITECTURE TRACER</div>
                <div class="three-drag-hint">Click Trace to shoot packet</div>
              </div>
            </div>

            <div class="content-card" style="justify-content: space-between;">
              <div style="display: flex; flex-direction: column; gap: 0.35rem;">
                <div style="background: #EFF6FF; padding: 0.45rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-blue); font-size: 0.72rem;">
                  <b style="color: var(--accent-blue);">1. Sensing (0-2ms):</b> 1000Hz IMU + SLAM Cameras.
                </div>
                <div style="background: #F3E8FF; padding: 0.45rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-purple); font-size: 0.72rem;">
                  <b style="color: var(--accent-purple);">2. Runtime (2-5ms):</b> OpenXR & Game Engine Tick.
                </div>
                <div style="background: #ECFDF5; padding: 0.45rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-green); font-size: 0.72rem;">
                  <b style="color: var(--accent-green);">3. GPU Shaders (5-12ms):</b> Stereo Frustums & ATW.
                </div>
                <div style="background: #FEF3C7; padding: 0.45rem; border-radius: var(--radius-sm); border-left: 3px solid var(--accent-amber); font-size: 0.72rem;">
                  <b style="color: var(--accent-amber);">4. Optics (12-17ms):</b> Strobe through Pancake lenses.
                </div>
              </div>

              <div class="telemetry-box" id="s15-log" style="height: 55px; font-size: 0.72rem;">
[SYSTEM READY] Click "Trace Live Motion Packet" to watch a real-time nanosecond packet traverse all 4 layers!
              </div>
            </div>
          </div>
        </div>
      `;
    },
    init: function() {
      const traceBtn = document.getElementById('s15-trace-btn');
      const log = document.getElementById('s15-log');
      const container = document.getElementById('s15-3d-container');

      if (!container || !window.VR3D) return;

      const sceneData = window.VR3D.initScene(container, { camZ: 3.5, camY: 0.6 });
      if (!sceneData) return;

      const path = new THREE.CatmullRomCurve3([
        new THREE.Vector3(-1.8, -0.4, 0),
        new THREE.Vector3(-0.6, 0.5, 0),
        new THREE.Vector3(0.6, -0.5, 0),
        new THREE.Vector3(1.8, 0.4, 0)
      ]);

      const tubeGeo = new THREE.TubeGeometry(path, 64, 0.08, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x94A3B8, wireframe: true });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      sceneData.scene.add(tube);

      const packetGeo = new THREE.SphereGeometry(0.16, 16, 16);
      const packetMat = new THREE.MeshBasicMaterial({ color: 0x059669 });
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
            log.innerHTML = `<span style="color: #34D399; font-weight: 700;">✓ PACKET COMPLETED IN 14.1 MILLISECONDS! Zero simulator sickness.</span>`;
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
        <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%;">
          <div style="display: flex; gap: 0.5rem; justify-content: center;">
            <button class="cyber-btn" id="s16-tab-quest" style="width: 170px;">Mobile Standalone</button>
            <button class="cyber-btn secondary" id="s16-tab-pc" style="width: 170px;">Tethered PC VR</button>
            <button class="cyber-btn secondary" id="s16-tab-cave" style="width: 170px;">Industrial CAVE</button>
          </div>

          <div class="split-layout" style="flex: 1;">
            <div class="content-card" style="justify-content: space-between;">
              <div>
                <span class="card-badge" id="s16-badge">ARCHITECTURE PROFILE</span>
                <h3 id="s16-name" style="color: var(--text-primary); margin: 0.35rem 0; font-size: 1.15rem; font-weight: 800;">
                  Meta Quest 3 / Apple Vision Pro
                </h3>
                <div id="s16-summary" style="color: var(--text-secondary); font-size: 0.8rem; line-height: 1.4;">
                  All compute, sensors, batteries, and displays are integrated inside a 500g chassis. Constrained to 5-8 Watts of thermal dissipation.
                </div>
              </div>

              <div style="background: #F8FAFC; border-radius: var(--radius-sm); padding: 0.6rem; border: 1px solid var(--border-subtle);">
                <div style="font-size: 0.72rem; color: var(--text-muted); margin-bottom: 0.25rem;">HARDWARE METRICS:</div>
                <div id="s16-specs" style="font-family: var(--font-mono); font-size: 0.75rem; color: var(--accent-blue); line-height: 1.5;">
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
                <div style="margin: 0.35rem 0;">
                  <div style="font-weight: 800; color: var(--accent-green); font-size: 0.78rem;">✓ KEY ADVANTAGES:</div>
                  <div id="s16-pros" style="font-size: 0.75rem; color: var(--text-secondary);">
                    Zero cables, consumer accessibility, instant setup in any room.
                  </div>
                </div>

                <div style="margin: 0.35rem 0;">
                  <div style="font-weight: 800; color: var(--accent-red); font-size: 0.78rem;">✕ TECHNICAL LIMITATIONS:</div>
                  <div id="s16-cons" style="font-size: 0.75rem; color: var(--text-secondary);">
                    Strict battery life (~2 hours), thermal throttling limits visual fidelity.
                  </div>
                </div>
              </div>

              <div class="telemetry-box" id="s16-verdict" style="height: 50px; font-size: 0.72rem;">
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
        <div style="display: flex; flex-direction: column; gap: 0.5rem; height: 100%;">
          <div class="content-card" style="padding: 0.4rem 0.8rem;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
              <div>
                <span class="card-badge" id="s17-q-num">QUESTION 1 OF 3</span>
                <span style="font-size: 0.85rem; color: var(--text-secondary); margin-left: 0.5rem;" id="s17-q-category">Pipeline Latency</span>
              </div>
              <div style="font-family: var(--font-mono); font-size: 0.85rem; color: var(--accent-blue);">
                Score: <span id="s17-score" style="color: var(--accent-green); font-weight: 800;">0</span> / 3
              </div>
            </div>
          </div>

          <div class="content-card" style="flex: 1; justify-content: space-around;">
            <div>
              <h3 id="s17-question" style="color: var(--text-primary); margin-bottom: 0.6rem; font-size: 1.05rem; font-weight: 800;">
                1. What is the maximum acceptable Motion-to-Photon latency before vestibular mismatch induces simulator sickness?
              </h3>

              <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.4rem;" id="s17-options">
                <button class="cyber-btn secondary s17-opt" data-opt="0">A) 100 milliseconds</button>
                <button class="cyber-btn secondary s17-opt" data-opt="1">B) 50 milliseconds</button>
                <button class="cyber-btn secondary s17-opt" data-opt="2">C) 20 milliseconds</button>
                <button class="cyber-btn secondary s17-opt" data-opt="3">D) 5 milliseconds</button>
              </div>
            </div>

            <div id="s17-feedback" style="background: #EFF6FF; border-radius: var(--radius-sm); padding: 0.5rem; border: 1px solid rgba(37, 99, 235, 0.25); font-size: 0.75rem; display: none;"></div>

            <div style="display: flex; justify-content: flex-end; gap: 0.4rem;">
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
            feedback.innerHTML = `<span style="color: var(--accent-green); font-weight: 800;">✓ Correct!</span> ${item.expl}`;
            score++;
            scoreText.textContent = score;
            if (window.vrAudio) window.vrAudio.playSuccess();
          } else {
            btn.style.borderColor = 'var(--accent-red)';
            btn.style.color = '#DC2626';
            optBtns[item.correct].className = 'cyber-btn s17-opt';
            feedback.style.display = 'block';
            feedback.innerHTML = `<span style="color: var(--accent-red); font-weight: 800;">✕ Incorrect.</span> ${item.expl}`;
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
              <div style="display: flex; flex-direction: column; gap: 0.4rem; margin-top: 0.35rem;">
                <div style="background: #EFF6FF; border: 1px solid rgba(37, 99, 235, 0.2); border-radius: var(--radius-sm); padding: 0.5rem;">
                  <div style="font-weight: 800; color: var(--accent-blue); font-size: 0.82rem;">1. Respect the Biological Clock</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                    Motion-to-Photon must stay under <b>20 milliseconds</b>. Dropping frames induces nausea.
                  </div>
                </div>

                <div style="background: #F3E8FF; border: 1px solid rgba(124, 58, 237, 0.2); border-radius: var(--radius-sm); padding: 0.5rem;">
                  <div style="font-weight: 800; color: var(--accent-purple); font-size: 0.82rem;">2. Decouple Tracking from Network</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                    Local head orientation must never wait on remote servers. Use client prediction and ATW.
                  </div>
                </div>

                <div style="background: #ECFDF5; border: 1px solid rgba(5, 150, 105, 0.2); border-radius: var(--radius-sm); padding: 0.5rem;">
                  <div style="font-weight: 800; color: var(--accent-green); font-size: 0.82rem;">3. Optics and Silicon Must Cooperate</div>
                  <div style="font-size: 0.72rem; color: var(--text-secondary); margin-top: 0.1rem;">
                    Barrel distortion shaders pre-warp images for Pancake lenses; strobed displays freeze motion on the retina.
                  </div>
                </div>
              </div>
            </div>

            <div style="display: flex; gap: 0.4rem;">
              <button class="cyber-btn" id="s18-replay-btn" style="flex: 1;">🎬 Replay Boot Sequence</button>
              <button class="cyber-btn secondary" id="s18-overview-btn" style="flex: 1;">📑 All 18 Slides</button>
            </div>
          </div>

          <div class="content-card" style="align-items: center; justify-content: center; text-align: center;">
            <span class="card-badge">THE IMMERSIVE COMPUTING HORIZON</span>
            <div style="font-size: 2.5rem; margin: 0.35rem 0;" aria-hidden="true">🌐 🥽 ⚡</div>
            <h3 style="color: var(--text-primary); margin-bottom: 0.3rem; font-weight: 800;">Virtual Reality Architecture</h3>
            <p style="color: var(--text-secondary); font-size: 0.78rem; line-height: 1.4; max-width: 380px;">
              You have traced the journey of physical head motion across IMU sensors, Kalman fusion, stereo GPU rasterization, Asynchronous TimeWarp, and folded pancake optics.
            </p>
            <div style="margin-top: 0.6rem; padding: 0.4rem 0.8rem; border-radius: var(--radius-sm); background: #EFF6FF; border: 1px solid var(--accent-blue); font-family: var(--font-mono); font-size: 0.72rem; color: var(--accent-blue); font-weight: 700;">
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

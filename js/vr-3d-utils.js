/**
 * VR Architecture 3D Interactive Utilities using Three.js
 * Academic Theme: High-luminance daylight lighting, crisp contrast, 3D-to-2D rasterizer, and exploded assembly.
 */

window.VR3D = {
  // Initialize standard Three.js canvas in any container (Academic Light Theme)
  initScene: function(containerId, opts = {}) {
    const container = typeof containerId === 'string' ? document.getElementById(containerId) : containerId;
    if (!container || !window.THREE) return null;

    container.innerHTML = '';
    const width = container.clientWidth || 400;
    const height = container.clientHeight || 260;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(opts.bgColor || 0xF8FAFC);
    scene.fog = new THREE.FogExp2(opts.bgColor || 0xF8FAFC, opts.fogDensity || 0.025);

    const camera = new THREE.PerspectiveCamera(opts.fov || 46, width / height, 0.1, 100);
    camera.position.set(opts.camX || 0, opts.camY || 1.1, opts.camZ || 3.4);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    container.appendChild(renderer.domElement);

    // Daylight Academic Lighting
    const amb = new THREE.AmbientLight(0xFFFFFF, 1.4);
    scene.add(amb);

    const sun = new THREE.DirectionalLight(0xFFFFFF, 1.2);
    sun.position.set(4, 6, 5);
    scene.add(sun);

    const blueFill = new THREE.DirectionalLight(0x2563EB, 0.6);
    blueFill.position.set(-4, -2, -3);
    scene.add(blueFill);

    // Subtle Classroom Grid Floor
    if (!opts.noGrid) {
      const grid = new THREE.GridHelper(12, 24, 0x2563EB, 0xCBD5E1);
      grid.position.y = opts.gridY || -1;
      grid.material.opacity = 0.55;
      grid.material.transparent = true;
      scene.add(grid);
    }

    // Touch & Mouse Orbit Handler
    let isDragging = false;
    let prevMousePos = { x: 0, y: 0 };
    let rotX = opts.initRotX || 0;
    let rotY = opts.initRotY || 0;
    const targetGroup = opts.targetGroup || null;

    const onDown = (e) => {
      isDragging = true;
      prevMousePos = {
        x: e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX),
        y: e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY)
      };
    };

    const onMove = (e) => {
      if (!isDragging) return;
      const clientX = e.clientX !== undefined ? e.clientX : (e.touches && e.touches[0].clientX);
      const clientY = e.clientY !== undefined ? e.clientY : (e.touches && e.touches[0].clientY);
      const deltaX = clientX - prevMousePos.x;
      const deltaY = clientY - prevMousePos.y;
      prevMousePos = { x: clientX, y: clientY };

      rotY += deltaX * 0.012;
      rotX += deltaY * 0.012;
      rotX = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX));

      if (targetGroup) {
        targetGroup.rotation.y = rotY;
        targetGroup.rotation.x = rotX;
      }
      if (opts.onRotate) opts.onRotate(rotY, rotX);
    };

    const onUp = () => { isDragging = false; };

    container.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    container.addEventListener('touchstart', onDown, { passive: true });
    window.addEventListener('touchmove', onMove, { passive: true });
    window.addEventListener('touchend', onUp);

    // Responsive Resize Observer
    const ro = new ResizeObserver(() => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    });
    ro.observe(container);

    let animId = null;
    const animate = (renderCallback) => {
      const loop = (time) => {
        animId = requestAnimationFrame(loop);
        if (renderCallback) renderCallback(time);
        renderer.render(scene, camera);
      };
      animId = requestAnimationFrame(loop);
    };

    const cleanup = () => {
      if (animId) cancelAnimationFrame(animId);
      ro.disconnect();
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onUp);
      renderer.dispose();
    };

    if (window.app) {
      window.app.currentSceneCleanup = cleanup;
    }

    return {
      scene,
      camera,
      renderer,
      container,
      animate,
      cleanup,
      setRotation: (y, x = 0) => {
        rotY = y;
        rotX = x;
        if (targetGroup) {
          targetGroup.rotation.y = y;
          targetGroup.rotation.x = x;
        }
      }
    };
  },

  // Create high-detail stylized VR Headset Model
  createHeadset: function() {
    const group = new THREE.Group();

    // Main Visor Box (Curved chassis)
    const visorGeo = new THREE.BoxGeometry(1.6, 0.9, 0.9);
    const visorMat = new THREE.MeshStandardMaterial({
      color: 0x1E293B,
      metalness: 0.6,
      roughness: 0.3
    });
    const visor = new THREE.Mesh(visorGeo, visorMat);
    group.add(visor);

    // Front Glass Plate (Glossy dark panel with royal blue reflection)
    const plateGeo = new THREE.BoxGeometry(1.56, 0.86, 0.05);
    const plateMat = new THREE.MeshStandardMaterial({
      color: 0x0F172A,
      metalness: 0.9,
      roughness: 0.1,
      emissive: 0x2563EB,
      emissiveIntensity: 0.25
    });
    const plate = new THREE.Mesh(plateGeo, plateMat);
    plate.position.z = 0.46;
    group.add(plate);

    // 4 Corner Tracking Cameras
    const camGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.04, 16);
    const camMat = new THREE.MeshBasicMaterial({ color: 0x0284C7 });
    const camCoords = [
      [-0.7, 0.35, 0.47], [0.7, 0.35, 0.47],
      [-0.7, -0.35, 0.47], [0.7, -0.35, 0.47]
    ];
    camCoords.forEach(pos => {
      const c = new THREE.Mesh(camGeo, camMat);
      c.rotation.x = Math.PI / 2;
      c.position.set(...pos);
      group.add(c);
    });

    // Face Cushion Foam
    const foamGeo = new THREE.BoxGeometry(1.5, 0.8, 0.2);
    const foamMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.9 });
    const foam = new THREE.Mesh(foamGeo, foamMat);
    foam.position.z = -0.48;
    group.add(foam);

    // Dual Inner Lenses (Crystal blue glass rings)
    const lensGeo = new THREE.CylinderGeometry(0.24, 0.24, 0.06, 24);
    const lensMat = new THREE.MeshStandardMaterial({
      color: 0x0284C7,
      emissive: 0x0284C7,
      emissiveIntensity: 0.5,
      transparent: true,
      opacity: 0.85
    });
    const leftLens = new THREE.Mesh(lensGeo, lensMat);
    leftLens.rotation.x = Math.PI / 2;
    leftLens.position.set(-0.32, 0, -0.44);
    const rightLens = leftLens.clone();
    rightLens.position.x = 0.32;
    group.add(leftLens);
    group.add(rightLens);

    // Head Strap Ring
    const strapGeo = new THREE.TorusGeometry(0.85, 0.07, 12, 32, Math.PI);
    const strapMat = new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.7 });
    const strap = new THREE.Mesh(strapGeo, strapMat);
    strap.rotation.x = Math.PI / 2;
    strap.position.set(0, 0, -0.4);
    group.add(strap);

    return { group, plate, leftLens, rightLens, visor, foam };
  },

  // Create Headset worn on Stylized Human Head
  createHeadWithHMD: function() {
    const root = new THREE.Group();

    // Stylized Head
    const headGeo = new THREE.SphereGeometry(0.75, 32, 24);
    const headMat = new THREE.MeshStandardMaterial({
      color: 0xCBD5E1,
      roughness: 0.5,
      metalness: 0.2
    });
    const head = new THREE.Mesh(headGeo, headMat);
    head.scale.set(0.9, 1.15, 1.0);
    root.add(head);

    // Headset attached to front of face
    const { group: hmd } = this.createHeadset();
    hmd.position.set(0, 0.1, 0.65);
    hmd.scale.set(0.85, 0.85, 0.85);
    root.add(hmd);

    return { root, head, hmd };
  },

  // Create Wireframe Viewing Frustum Pyramid
  createFrustum: function(color = 0x2563EB, fov = 45, aspect = 1.0, near = 0.2, far = 2.5) {
    const group = new THREE.Group();
    const hNear = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * near;
    const wNear = hNear * aspect;
    const hFar = 2 * Math.tan(THREE.MathUtils.degToRad(fov / 2)) * far;
    const wFar = hFar * aspect;

    const pts = [
      // Apex to near
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(-wNear/2, hNear/2, -near),
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(wNear/2, hNear/2, -near),
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(wNear/2, -hNear/2, -near),
      new THREE.Vector3(0, 0, 0), new THREE.Vector3(-wNear/2, -hNear/2, -near),
      // Near to far
      new THREE.Vector3(-wNear/2, hNear/2, -near), new THREE.Vector3(-wFar/2, hFar/2, -far),
      new THREE.Vector3(wNear/2, hNear/2, -near), new THREE.Vector3(wFar/2, hFar/2, -far),
      new THREE.Vector3(wNear/2, -hNear/2, -near), new THREE.Vector3(wFar/2, -hFar/2, -far),
      new THREE.Vector3(-wNear/2, -hNear/2, -near), new THREE.Vector3(-wFar/2, -hFar/2, -far),
      // Far rect
      new THREE.Vector3(-wFar/2, hFar/2, -far), new THREE.Vector3(wFar/2, hFar/2, -far),
      new THREE.Vector3(wFar/2, hFar/2, -far), new THREE.Vector3(wFar/2, -hFar/2, -far),
      new THREE.Vector3(wFar/2, -hFar/2, -far), new THREE.Vector3(-wFar/2, -hFar/2, -far),
      new THREE.Vector3(-wFar/2, -hFar/2, -far), new THREE.Vector3(-wFar/2, hFar/2, -far),
    ];

    const geo = new THREE.BufferGeometry().setFromPoints(pts);
    const mat = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.85, linewidth: 2 });
    const lines = new THREE.LineSegments(geo, mat);
    group.add(lines);

    return { group, lines, mat };
  }
};

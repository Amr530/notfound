
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import GlobeControls from "./GlobeControls";
import "../../fire-map/styles/globe.css";

const INITIAL_CAMERA_POSITION = [0, 0, 3.5];

export default function EarthGlobe({ onLocationSelect }) {
  const containerRef = useRef(null);
  const controlsRef = useRef(null);
  const cameraRef = useRef(null);
  const onLocationSelectRef = useRef(onLocationSelect);
  const selectedMarkerRef = useRef(null);

  const [isAutoRotating, setIsAutoRotating] = useState(true);

  // Keep the latest callback without recreating the Three.js scene.
  useEffect(() => {
    onLocationSelectRef.current = onLocationSelect;
  }, [onLocationSelect]);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    // Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#050b16");

    // Camera
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );

    camera.position.set(...INITIAL_CAMERA_POSITION);
    cameraRef.current = camera;

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: false,
    });

    renderer.setPixelRatio(
      Math.min(window.devicePixelRatio, 2)
    );

    renderer.setSize(
      container.clientWidth,
      container.clientHeight
    );

    renderer.outputColorSpace = THREE.SRGBColorSpace;

    container.appendChild(renderer.domElement);

    // Lighting
    const ambientLight = new THREE.AmbientLight(
      0xffffff,
      1.5
    );

    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(
      0xffffff,
      2
    );

    directionalLight.position.set(5, 3, 5);
    scene.add(directionalLight);

    // Earth Texture
    const textureLoader = new THREE.TextureLoader();

    const earthTexture = textureLoader.load(
      "https://threejs.org/examples/textures/planets/earth_atmos_2048.jpg"
    );

    // Earth Mesh
    const earthGeometry = new THREE.SphereGeometry(
      1,
      64,
      64
    );

    const earthMaterial = new THREE.MeshPhongMaterial({
      map: earthTexture,
      shininess: 10,
    });

    const earth = new THREE.Mesh(
      earthGeometry,
      earthMaterial
    );

    scene.add(earth);

    // Selected Location Marker
    const clearSelectedMarker = () => {
      const marker = selectedMarkerRef.current;

      if (!marker) return;

      earth.remove(marker);

      marker.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) =>
              material.dispose()
            );
          } else {
            child.material.dispose();
          }
        }
      });

      selectedMarkerRef.current = null;
    };

    // Atmosphere
    const atmosphereGeometry = new THREE.SphereGeometry(
      1.035,
      64,
      64
    );

    const atmosphereMaterial = new THREE.MeshBasicMaterial({
      color: 0x3b82f6,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });

    const atmosphere = new THREE.Mesh(
      atmosphereGeometry,
      atmosphereMaterial
    );

    scene.add(atmosphere);

    // Starfield
    const starGeometry = new THREE.BufferGeometry();
    const starPositions = [];

    for (let i = 0; i < 1500; i++) {
      const radius = 35 + Math.random() * 30;

      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(
        2 * Math.random() - 1
      );

      const x =
        radius * Math.sin(phi) * Math.cos(theta);

      const y =
        radius * Math.sin(phi) * Math.sin(theta);

      const z = radius * Math.cos(phi);

      starPositions.push(x, y, z);
    }

    starGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(starPositions, 3)
    );

    const starMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 0.09,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const stars = new THREE.Points(
      starGeometry,
      starMaterial
    );

    scene.add(stars);

    // Orbit Controls
    const controls = new OrbitControls(
      camera,
      renderer.domElement
    );

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.enablePan = false;

    controls.minDistance = 1.6;
    controls.maxDistance = 6;

    controls.autoRotate = true;
    controls.autoRotateSpeed = 0.5;

    controlsRef.current = controls;

    // Geographic Point Selection
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();

    let pointerDownPosition = null;

    const handlePointerDown = (event) => {
      pointerDownPosition = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handleClick = (event) => {
      if (!pointerDownPosition) return;

      const distance = Math.hypot(
        event.clientX - pointerDownPosition.x,
        event.clientY - pointerDownPosition.y
      );

      pointerDownPosition = null;

      // Ignore globe dragging
      if (distance > 5) return;

      const rect = renderer.domElement.getBoundingClientRect();

      pointer.x =
        ((event.clientX - rect.left) / rect.width) * 2 - 1;

      pointer.y =
        -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(pointer, camera);

      const intersections = raycaster.intersectObject(earth);

      if (intersections.length === 0) return;

      const localPoint = earth.worldToLocal(
        intersections[0].point.clone()
      );

      // Remove previous marker
      clearSelectedMarker();

      // Create marker group
      const markerGroup = new THREE.Group();

      // Get normalized position on Earth
      const markerPosition = localPoint.clone().normalize();

      // Position marker slightly above Earth's surface
      markerGroup.position
        .copy(markerPosition)
        .multiplyScalar(1.012);

      // Marker sphere
      const markerGeometry = new THREE.SphereGeometry(
        0.018,
        16,
        16
      );

      const markerMaterial = new THREE.MeshBasicMaterial({
        color: 0xff6b00,
      });

      const markerSphere = new THREE.Mesh(
        markerGeometry,
        markerMaterial
      );

      markerGroup.add(markerSphere);

      // Outer ring
      const ringGeometry = new THREE.TorusGeometry(
        0.035,
        0.003,
        8,
        48
      );

      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0xffa500,
      });

      const ring = new THREE.Mesh(
        ringGeometry,
        ringMaterial
      );

      // Align ring with Earth's surface
      ring.quaternion.setFromUnitVectors(
        new THREE.Vector3(0, 0, 1),
        markerPosition
      );

      markerGroup.add(ring);

      // Add marker to Earth
      earth.add(markerGroup);

      selectedMarkerRef.current = markerGroup;

      const latitude =
        Math.asin(
          localPoint.y / localPoint.length()
        ) *
        (180 / Math.PI);

      let longitude =
        Math.atan2(
          localPoint.z,
          -localPoint.x
        ) *
          (180 / Math.PI) -
        180;

      // Normalize longitude to -180 ... 180
      longitude =
        ((longitude + 180) % 360 + 360) % 360 - 180;

      onLocationSelectRef.current?.({
        latitude: Number(latitude.toFixed(4)),
        longitude: Number(longitude.toFixed(4)),
      });
    };

    renderer.domElement.addEventListener(
      "pointerdown",
      handlePointerDown
    );

    renderer.domElement.addEventListener(
      "click",
      handleClick
    );

    // Animation Loop
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Handle Resize
    const resizeObserver = new ResizeObserver(() => {
      const width = container.clientWidth;
      const height = container.clientHeight;

      if (!width || !height) return;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    });

    resizeObserver.observe(container);

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);

      resizeObserver.disconnect();

      renderer.domElement.removeEventListener(
        "pointerdown",
        handlePointerDown
      );

      renderer.domElement.removeEventListener(
        "click",
        handleClick
      );

      controls.dispose();
      clearSelectedMarker();

      earthGeometry.dispose();
      earthMaterial.dispose();
      earthTexture.dispose();

      atmosphereGeometry.dispose();
      atmosphereMaterial.dispose();

      starGeometry.dispose();
      starMaterial.dispose();

      renderer.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      controlsRef.current = null;
      cameraRef.current = null;
    };
  }, []);

  // Zoom In
  const handleZoomIn = () => {
    const camera = cameraRef.current;

    if (!camera) return;

    camera.position.multiplyScalar(0.85);
    controlsRef.current?.update();
  };

  // Zoom Out
  const handleZoomOut = () => {
    const camera = cameraRef.current;

    if (!camera) return;

    camera.position.multiplyScalar(1.15);
    controlsRef.current?.update();
  };

  // Reset Camera and Clear Selection
  const handleReset = () => {
    const camera = cameraRef.current;
    const controls = controlsRef.current;

    if (!camera || !controls) return;

    // Remove selected point
    const marker = selectedMarkerRef.current;

    if (marker) {
      marker.parent?.remove(marker);

      marker.traverse((child) => {
        if (child.geometry) {
          child.geometry.dispose();
        }

        if (child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((material) =>
              material.dispose()
            );
          } else {
            child.material.dispose();
          }
        }
      });

      selectedMarkerRef.current = null;
    }

    // Clear selected location in parent component
    onLocationSelectRef.current?.(null);

    // Reset camera
    camera.position.set(...INITIAL_CAMERA_POSITION);

    controls.target.set(0, 0, 0);
    controls.autoRotate = true;
    controls.update();

    setIsAutoRotating(true);
  };

  // Toggle Auto Rotation
  const handleToggleRotation = () => {
    const controls = controlsRef.current;

    if (!controls) return;

    const nextState = !isAutoRotating;

    controls.autoRotate = nextState;
    setIsAutoRotating(nextState);
  };

  return (
    <div
      ref={containerRef}
      className="earth-globe-container"
    >
      <GlobeControls
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onReset={handleReset}
        onToggleRotation={handleToggleRotation}
        isAutoRotating={isAutoRotating}
      />
    </div>
  );
}

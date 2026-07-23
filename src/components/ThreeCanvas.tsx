import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export const ThreeCanvas: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      1,
      1000
    );
    camera.position.z = 400;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    containerRef.current.appendChild(renderer.domElement);

    // Particle Configuration
    const count = 120;
    const particlesData: Array<{
      mesh: THREE.Mesh;
      velocity: THREE.Vector3;
      rotSpeed: THREE.Vector3;
      baseX: number;
      baseY: number;
    }> = [];

    // Create a beautiful leaf/petal geometry
    const shape = new THREE.Shape();
    shape.moveTo(0, 0);
    shape.quadraticCurveTo(5, 10, 0, 15);
    shape.quadraticCurveTo(-5, 10, 0, 0);

    const geometry = new THREE.ShapeGeometry(shape);
    geometry.center();

    // Material with double side and soft autumn/spring colors (Green, Red, Pink leaves)
    const colors = [
      0x3C6E47, // Forest Green
      0x5C8E58, // Sage Green
      0x7EAD70, // Light Spring Green
      0x9E3D3D, // Crimson Red
      0xBD5757, // Terracotta Red
      0xF472B6, // Vibrant Pink
      0xFBCFE8, // Pale Cherry Pink
      0xFDA4AF, // Soft Rose Pink
    ];

    const width = window.innerWidth;
    const height = window.innerHeight;

    for (let i = 0; i < count; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const material = new THREE.MeshBasicMaterial({
        color: color,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.4 + Math.random() * 0.4,
      });

      const mesh = new THREE.Mesh(geometry, material);
      
      // Random scale & initial position
      const scale = 0.5 + Math.random() * 1.5;
      mesh.scale.set(scale, scale, scale);

      const x = (Math.random() - 0.5) * width * 1.5;
      const y = (Math.random() - 0.5) * height * 1.5;
      const z = (Math.random() - 0.5) * 300;
      mesh.position.set(x, y, z);

      // Random rotation
      mesh.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI
      );

      scene.add(mesh);

      particlesData.push({
        mesh,
        velocity: new THREE.Vector3(
          -1.5 - Math.random() * 2, // Drift left-wards
          -0.8 - Math.random() * 1.5, // Drift downwards
          (Math.random() - 0.5) * 0.5
        ),
        rotSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05,
          (Math.random() - 0.5) * 0.05
        ),
        baseX: x,
        baseY: y
      });
    }

    // Handle mouse move
    const handleMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates from -1 to 1
      mouseRef.current.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouseRef.current.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Interpolate mouse coordinates for smooth lag-following effect
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // Mouse influence wind
      const windX = mouseRef.current.x * 2;
      const windY = mouseRef.current.y * 1;

      particlesData.forEach((p) => {
        // Move particle
        p.mesh.position.x += p.velocity.x + windX;
        p.mesh.position.y += p.velocity.y + windY;
        p.mesh.position.z += p.velocity.z;

        // Apply rotation
        p.mesh.rotation.x += p.rotSpeed.x;
        p.mesh.rotation.y += p.rotSpeed.y;
        p.mesh.rotation.z += p.rotSpeed.z;

        // Reset if goes off screen
        const boundaryX = screenWidth * 0.8;
        const boundaryY = screenHeight * 0.8;

        if (p.mesh.position.x < -boundaryX) {
          p.mesh.position.x = boundaryX;
        }
        if (p.mesh.position.y < -boundaryY) {
          p.mesh.position.y = boundaryY;
        }
        if (p.mesh.position.z < -200 || p.mesh.position.z > 200) {
          p.velocity.z = -p.velocity.z;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
      }

      // Dispose resources
      geometry.dispose();
      particlesData.forEach((p) => {
        if (Array.isArray(p.mesh.material)) {
          p.mesh.material.forEach((mat) => mat.dispose());
        } else {
          p.mesh.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 w-full h-full pointer-events-none z-[100] overflow-hidden" 
    />
  );
};

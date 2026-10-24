import React, { useState, useCallback, Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree, type ThreeEvent } from '@react-three/fiber';
import { OrbitControls, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { DoctorLayout } from '../../layouts/DoctorLayout';
import { useLanguage } from '../../i18n/useLanguage';
import { doctorStore } from '../../services/doctorStore';
import { authService } from '../../services/auth';
import type { OrganType, DoctorExtendedPatient } from '../../types/doctor';
import {
  Search,
  ChevronRight,
  X,
  Heart,
  HeartPulse,
  Brain,
  Wind,
  Droplets,
  Activity as ActivityIcon,
  Bean,
  Shield,
  FlaskConical,
  Maximize2,
  RotateCcw,
  Crosshair,
  Info,
  Clock,
  FileText,
  Activity,
  Plus,
  Minus,
  Eye,
} from 'lucide-react';

type ViewAngle = '3d' | 'front' | 'back' | 'left' | 'right';

// ─── Organ Metadata ─────────────────────────────────────────────────
interface OrganMeta {
  id: OrganType;
  name: string;
  nameHi: string;
  system: string;
  systemHi: string;
  color: string;
  emissive: string;
  description: string;
  descriptionHi: string;
  position: [number, number, number];
  scale: [number, number, number];
  shape: 'sphere' | 'ellipsoid' | 'bean' | 'torus' | 'capsule';
}

const ORGAN_DATA: OrganMeta[] = [
  {
    id: 'brain',
    name: 'Brain',
    nameHi: 'मस्तिष्क',
    system: 'Nervous System',
    systemHi: 'तंत्रिका तंत्र',
    color: '#f0a0b0',
    emissive: '#ff6090',
    description: 'The brain is the command center of the nervous system, responsible for thought, memory, emotion, touch, motor skills, breathing, and every process that regulates the body.',
    descriptionHi: 'मस्तिष्क तंत्रिका तंत्र का नियंत्रण केंद्र है, जो विचार, स्मृति, भावना, स्पर्श, मोटर कौशल, श्वास और शरीर को नियंत्रित करने वाली हर प्रक्रिया के लिए जिम्मेदार है।',
    position: [0, 2.7, 0],
    scale: [0.35, 0.3, 0.35],
    shape: 'sphere',
  },
  {
    id: 'heart',
    name: 'Heart',
    nameHi: 'हृदय',
    system: 'Cardiovascular System',
    systemHi: 'हृदय प्रणाली',
    color: '#e53e3e',
    emissive: '#ff4060',
    description: 'The heart is a muscular organ that pumps blood throughout the body, supplying oxygen and nutrients to tissues and organs.',
    descriptionHi: 'हृदय एक पेशीय अंग है जो पूरे शरीर में रक्त पंप करता है, ऊतकों और अंगों को ऑक्सीजन और पोषक तत्व प्रदान करता है।',
    position: [0.12, 1.45, 0.2],
    scale: [0.18, 0.2, 0.16],
    shape: 'sphere',
  },
  {
    id: 'lungs',
    name: 'Lungs',
    nameHi: 'फेफड़े',
    system: 'Respiratory System',
    systemHi: 'श्वसन तंत्र',
    color: '#ed8936',
    emissive: '#ff8040',
    description: 'The lungs are a pair of spongy organs that facilitate the exchange of oxygen and carbon dioxide between the body and the atmosphere.',
    descriptionHi: 'फेफड़े स्पंजी अंगों की एक जोड़ी हैं जो शरीर और वातावरण के बीच ऑक्सीजन और कार्बन डाइऑक्साइड के आदान-प्रदान को सुगम बनाते हैं।',
    position: [0, 1.5, 0.1],
    scale: [0.55, 0.35, 0.28],
    shape: 'ellipsoid',
  },
  {
    id: 'liver',
    name: 'Liver',
    nameHi: 'यकृत',
    system: 'Digestive System',
    systemHi: 'पाचन तंत्र',
    color: '#c05621',
    emissive: '#e06030',
    description: 'The liver is the largest internal organ, responsible for detoxification, protein synthesis, bile production, and nutrient metabolism.',
    descriptionHi: 'यकृत सबसे बड़ा आंतरिक अंग है, जो विषहरण, प्रोटीन संश्लेषण, पित्त उत्पादन और पोषक तत्वों के चयापचय के लिए जिम्मेदार है।',
    position: [-0.2, 1.05, 0.15],
    scale: [0.35, 0.18, 0.2],
    shape: 'ellipsoid',
  },
  {
    id: 'stomach',
    name: 'Stomach',
    nameHi: 'पेट',
    system: 'Digestive System',
    systemHi: 'पाचन तंत्र',
    color: '#e8a87c',
    emissive: '#ffb080',
    description: 'The stomach is a muscular sac that breaks down food using acid and enzymes, preparing nutrients for absorption in the intestines.',
    descriptionHi: 'पेट एक पेशीय थैली है जो एसिड और एंजाइम का उपयोग करके भोजन को तोड़ती है, आंतों में अवशोषण के लिए पोषक तत्व तैयार करती है।',
    position: [0.15, 1.0, 0.18],
    scale: [0.22, 0.2, 0.18],
    shape: 'bean',
  },
  {
    id: 'intestines',
    name: 'Intestines',
    nameHi: 'आंतें',
    system: 'Digestive System',
    systemHi: 'पाचन तंत्र',
    color: '#e89090',
    emissive: '#ff9090',
    description: 'The intestines form the lower part of the digestive tract, responsible for nutrient absorption and waste processing.',
    descriptionHi: 'आंतें पाचन तंत्र का निचला हिस्सा बनाती हैं, जो पोषक तत्व अवशोषण और अपशिष्ट प्रसंस्करण के लिए जिम्मेदार हैं।',
    position: [0, 0.7, 0.15],
    scale: [0.4, 0.25, 0.2],
    shape: 'torus',
  },
  {
    id: 'kidneys',
    name: 'Kidneys',
    nameHi: 'गुर्दे',
    system: 'Urinary System',
    systemHi: 'मूत्र प्रणाली',
    color: '#9b2c2c',
    emissive: '#cc4040',
    description: 'The kidneys filter blood to produce urine, removing waste products while regulating fluid balance, electrolytes and blood pressure.',
    descriptionHi: 'गुर्दे मूत्र बनाने के लिए रक्त को फ़िल्टर करते हैं, तरल संतुलन, इलेक्ट्रोलाइट्स और रक्तचाप को नियंत्रित करते हुए अपशिष्ट उत्पादों को हटाते हैं।',
    position: [0, 0.9, -0.1],
    scale: [0.45, 0.14, 0.14],
    shape: 'bean',
  },
  {
    id: 'pancreas',
    name: 'Pancreas',
    nameHi: 'अग्न्याशय',
    system: 'Digestive / Endocrine System',
    systemHi: 'पाचन / अंतःस्रावी तंत्र',
    color: '#e0c080',
    emissive: '#f0d080',
    description: 'The pancreas produces enzymes for digestion and hormones like insulin that regulate blood sugar levels.',
    descriptionHi: 'अग्न्याशय पाचन के लिए एंजाइम और रक्त शर्करा के स्तर को नियंत्रित करने वाले इंसुलिन जैसे हार्मोन का उत्पादन करता है।',
    position: [0, 0.95, 0.05],
    scale: [0.28, 0.08, 0.1],
    shape: 'capsule',
  },
  {
    id: 'spleen',
    name: 'Spleen',
    nameHi: 'प्लीहा',
    system: 'Lymphatic System',
    systemHi: 'लसीका तंत्र',
    color: '#744210',
    emissive: '#a06020',
    description: 'The spleen filters blood, removes old red blood cells, and plays a vital role in immune defence.',
    descriptionHi: 'प्लीहा रक्त को फ़िल्टर करती है, पुरानी लाल रक्त कोशिकाओं को हटाती है और प्रतिरक्षा रक्षा में महत्वपूर्ण भूमिका निभाती है।',
    position: [0.3, 1.05, -0.05],
    scale: [0.12, 0.1, 0.08],
    shape: 'ellipsoid',
  },
  {
    id: 'bladder',
    name: 'Bladder',
    nameHi: 'मूत्राशय',
    system: 'Urinary System',
    systemHi: 'मूत्र प्रणाली',
    color: '#d69e2e',
    emissive: '#f0c040',
    description: 'The urinary bladder stores urine produced by the kidneys before it is excreted from the body.',
    descriptionHi: 'मूत्राशय शरीर से उत्सर्जित होने से पहले गुर्दे द्वारा उत्पादित मूत्र को संग्रहीत करता है।',
    position: [0, 0.45, 0.2],
    scale: [0.14, 0.12, 0.12],
    shape: 'sphere',
  },
];

function getOrganMeta(id: OrganType): OrganMeta {
  return ORGAN_DATA.find((o) => o.id === id) || ORGAN_DATA[0];
}

// ─── Procedural 3D Organ Mesh (Enhanced Anatomical Accuracy) ───────
function OrganMesh({
  organ,
  isSelected,
  isHovered,
  onSelect,
  onHover,
  onUnhover,
}: {
  organ: OrganMeta;
  isSelected: boolean;
  isHovered: boolean;
  onSelect: () => void;
  onHover: () => void;
  onUnhover: () => void;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    switch (organ.shape) {
      case 'sphere': {
        // Enhanced sphere with subtle surface variation
        const g = new THREE.SphereGeometry(1, 48, 48);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const noise = Math.sin(x * 5) * Math.cos(y * 5) * Math.sin(z * 5) * 0.02;
          const len = Math.sqrt(x * x + y * y + z * z);
          pos.setX(i, x + (x / len) * noise);
          pos.setY(i, y + (y / len) * noise);
          pos.setZ(i, z + (z / len) * noise);
        }
        pos.needsUpdate = true;
        g.computeVertexNormals();
        return g;
      }
      case 'ellipsoid': {
        // Anatomically accurate ellipsoid with surface texture
        const g = new THREE.SphereGeometry(1, 48, 48);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          // Add organic surface variation
          const noise = (Math.sin(x * 8 + y * 3) * Math.cos(z * 6 + y * 2)) * 0.03;
          const len = Math.sqrt(x * x + y * y + z * z);
          pos.setX(i, x + (x / len) * noise);
          pos.setY(i, y + (y / len) * noise);
          pos.setZ(i, z + (z / len) * noise);
        }
        pos.needsUpdate = true;
        g.computeVertexNormals();
        return g;
      }
      case 'bean': {
        // Enhanced kidney/bean shape with proper curvature
        const g = new THREE.SphereGeometry(1, 40, 40);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          // Create kidney-like indentation
          const indent = x > 0 ? Math.max(0, 1 - Math.abs(y) * 1.2) * 0.25 : 0;
          pos.setX(i, x + Math.sin(y * Math.PI) * 0.18 - indent);
          pos.setZ(i, z + Math.cos(y * Math.PI * 0.7) * 0.12);
          // Add surface detail
          const detail = Math.sin(x * 10) * Math.cos(y * 8) * 0.015;
          const len = Math.sqrt(x * x + y * y + z * z);
          pos.setX(i, pos.getX(i) + (x / len) * detail);
          pos.setY(i, y + (y / len) * detail);
          pos.setZ(i, pos.getZ(i) + (z / len) * detail);
        }
        pos.needsUpdate = true;
        g.computeVertexNormals();
        return g;
      }
      case 'torus': {
        // Enhanced torus for intestines with organic variation
        const g = new THREE.TorusGeometry(1, 0.42, 24, 48);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          // Add intestinal folding texture
          const wave = Math.sin(i * 0.3) * 0.02;
          pos.setX(i, x + wave);
          pos.setY(i, y + wave * 0.5);
          pos.setZ(i, z + wave);
        }
        pos.needsUpdate = true;
        g.computeVertexNormals();
        return g;
      }
      case 'capsule': {
        // Enhanced capsule with organic surface
        const g = new THREE.CapsuleGeometry(0.5, 1, 20, 32);
        const pos = g.attributes.position;
        for (let i = 0; i < pos.count; i++) {
          const x = pos.getX(i);
          const y = pos.getY(i);
          const z = pos.getZ(i);
          const noise = Math.sin(x * 12 + y * 8) * Math.cos(z * 10) * 0.015;
          pos.setX(i, x + noise);
          pos.setZ(i, z + noise);
        }
        pos.needsUpdate = true;
        g.computeVertexNormals();
        return g;
      }
      default:
        return new THREE.SphereGeometry(1, 48, 48);
    }
  }, [organ.shape]);

  const material = useMemo(() => {
    return new THREE.MeshPhysicalMaterial({
      color: organ.color,
      roughness: 0.5,
      metalness: 0.05,
      clearcoat: 0.5,
      clearcoatRoughness: 0.3,
      transparent: true,
      opacity: isSelected ? 1.0 : isHovered ? 0.92 : 0.88,
      emissive: isSelected ? organ.emissive : isHovered ? organ.emissive : '#000000',
      emissiveIntensity: isSelected ? 0.7 : isHovered ? 0.35 : 0,
      transmission: 0.1, // Slight subsurface scattering effect
      thickness: 0.5,
      ior: 1.4, // Refractive index for organic tissue
      reflectivity: 0.2,
      side: THREE.FrontSide,
    });
  }, [organ.color, organ.emissive, isSelected, isHovered]);

  useFrame((state, delta) => {
    if (meshRef.current && isSelected) {
      // Smooth, continuous rotation for selected organ
      meshRef.current.rotation.y += delta * 0.2;
      // Subtle breathing effect using elapsed time
      const breathingScale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.02;
      meshRef.current.scale.setScalar(breathingScale);
    } else if (meshRef.current) {
      // Reset scale smoothly when not selected
      meshRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), delta * 5);
    }

    if (glowRef.current) {
      const targetScale = isSelected ? 1.28 : isHovered ? 1.15 : 1;
      glowRef.current.scale.lerp(
        new THREE.Vector3(targetScale, targetScale, targetScale),
        delta * 6,
      );
      const mat = glowRef.current.material as THREE.MeshBasicMaterial;
      mat.opacity = isSelected ? 0.18 : isHovered ? 0.1 : 0;
    }
  });

  return (
    <group position={organ.position}>
      <mesh
        ref={meshRef}
        geometry={geometry}
        material={material}
        scale={organ.scale}
        onClick={(e: ThreeEvent<MouseEvent>) => {
          e.stopPropagation();
          onSelect();
        }}
        onPointerOver={(e: ThreeEvent<PointerEvent>) => {
          e.stopPropagation();
          onHover();
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          onUnhover();
          document.body.style.cursor = 'default';
        }}
      />
      {/* Enhanced glow outline with bloom effect */}
      <mesh ref={glowRef} geometry={geometry} scale={organ.scale}>
        <meshBasicMaterial
          color={organ.emissive}
          transparent
          opacity={0}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

// ─── Enhanced Human Body Mesh with Anatomical Detail ───────────────
function HumanBodyMesh({ transparency }: { transparency: number }) {
  const bodyRef = useRef<THREE.Group>(null);

  const skinMaterial = useMemo(
    () =>
      new THREE.MeshPhysicalMaterial({
        color: '#d4b5a0',
        roughness: 0.7,
        metalness: 0,
        transparent: true,
        opacity: transparency,
        clearcoat: 0.3,
        clearcoatRoughness: 0.5,
        transmission: transparency < 0.5 ? 0.1 : 0, // Slight subsurface when visible
        side: THREE.DoubleSide,
      }),
    [transparency],
  );

  const boneMaterial = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: '#e8dac8',
        transparent: true,
        opacity: transparency * 0.6,
        roughness: 0.8,
      }),
    [transparency],
  );

  return (
    <group ref={bodyRef}>
      {/* Head - more anatomically accurate */}
      <mesh position={[0, 2.7, 0]} material={skinMaterial}>
        <sphereGeometry args={[0.3, 32, 32]} />
      </mesh>
      {/* Neck */}
      <mesh position={[0, 2.35, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.11, 0.13, 0.22, 20]} />
      </mesh>
      {/* Torso - anatomically shaped */}
      <mesh position={[0, 1.85, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.38, 0.32, 0.7, 24]} />
      </mesh>
      <mesh position={[0, 1.2, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.32, 0.3, 0.6, 24]} />
      </mesh>
      {/* Pelvis - wider and more anatomically accurate */}
      <mesh position={[0, 0.65, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.3, 0.35, 0.4, 24]} />
      </mesh>

      {/* Shoulders */}
      <mesh position={[-0.38, 2.1, 0]} material={skinMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>
      <mesh position={[0.38, 2.1, 0]} material={skinMaterial}>
        <sphereGeometry args={[0.12, 16, 16]} />
      </mesh>

      {/* Left arm - upper */}
      <mesh position={[-0.54, 1.75, 0]} rotation={[0, 0, 0.15]} material={skinMaterial}>
        <cylinderGeometry args={[0.075, 0.065, 0.75, 16]} />
      </mesh>
      {/* Left arm - lower */}
      <mesh position={[-0.63, 1.2, 0]} rotation={[0, 0, 0.08]} material={skinMaterial}>
        <cylinderGeometry args={[0.065, 0.055, 0.75, 16]} />
      </mesh>

      {/* Right arm - upper */}
      <mesh position={[0.54, 1.75, 0]} rotation={[0, 0, -0.15]} material={skinMaterial}>
        <cylinderGeometry args={[0.075, 0.065, 0.75, 16]} />
      </mesh>
      {/* Right arm - lower */}
      <mesh position={[0.63, 1.2, 0]} rotation={[0, 0, -0.08]} material={skinMaterial}>
        <cylinderGeometry args={[0.065, 0.055, 0.75, 16]} />
      </mesh>

      {/* Left leg - upper */}
      <mesh position={[-0.16, 0.1, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.13, 0.11, 0.85, 16]} />
      </mesh>
      {/* Left leg - lower */}
      <mesh position={[-0.16, -0.6, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.11, 0.09, 0.85, 16]} />
      </mesh>

      {/* Right leg - upper */}
      <mesh position={[0.16, 0.1, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.13, 0.11, 0.85, 16]} />
      </mesh>
      {/* Right leg - lower */}
      <mesh position={[0.16, -0.6, 0]} material={skinMaterial}>
        <cylinderGeometry args={[0.11, 0.09, 0.85, 16]} />
      </mesh>

      {/* Ribcage structure - enhanced visibility */}
      {[0.12, 0.22, 0.32, 0.42, 0.52].map((dy, i) => (
        <group key={i}>
          <mesh position={[0, 1.95 - dy, 0.28]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26 + i * 0.015, 0.01, 12, 32, Math.PI * 1.2]} />
            <meshStandardMaterial color="#d8c5af" transparent opacity={transparency * 0.7} />
          </mesh>
        </group>
      ))}

      {/* Spine indicators */}
      {Array.from({ length: 8 }).map((_, i) => (
        <mesh key={`spine-${i}`} position={[0, 2.0 - i * 0.15, -0.15]} material={boneMaterial}>
          <sphereGeometry args={[0.025, 8, 8]} />
        </mesh>
      ))}
    </group>
  );
}

// ─── Camera Controller ──────────────────────────────────────────────
function CameraController({
  targetPosition,
  viewAngle,
  cameraDistance,
}: {
  targetPosition: [number, number, number] | null;
  viewAngle: ViewAngle;
  cameraDistance: number;
}) {
  const { camera } = useThree();
  const controlsRef = useRef<any>(null);
  const desiredTarget = useRef(new THREE.Vector3(0, 1.2, 0));
  const desiredPosition = useRef(new THREE.Vector3(0, 1.5, 5));
  const isAnimating = useRef(false);

  useEffect(() => {
    const target = targetPosition
      ? new THREE.Vector3(...targetPosition)
      : new THREE.Vector3(0, 1.2, 0);
    const directions: Record<ViewAngle, THREE.Vector3> = {
      '3d': new THREE.Vector3(0.55, 0.12, 0.82).normalize(),
      front: new THREE.Vector3(0, 0.08, 1).normalize(),
      back: new THREE.Vector3(0, 0.08, -1).normalize(),
      left: new THREE.Vector3(-1, 0.08, 0).normalize(),
      right: new THREE.Vector3(1, 0.08, 0).normalize(),
    };
    desiredTarget.current.copy(target);
    desiredPosition.current.copy(target).addScaledVector(directions[viewAngle], cameraDistance);
    isAnimating.current = true;
  }, [targetPosition, viewAngle, cameraDistance]);

  useFrame((_, delta) => {
    if (!isAnimating.current) return;

    const controls = controlsRef.current;
    const easing = 1 - Math.exp(-6 * delta);
    camera.position.lerp(desiredPosition.current, easing);
    if (controls) {
      controls.target.lerp(desiredTarget.current, easing);
      controls.update();
      if (
        camera.position.distanceToSquared(desiredPosition.current) < 0.001 &&
        controls.target.distanceToSquared(desiredTarget.current) < 0.001
      ) {
        camera.position.copy(desiredPosition.current);
        controls.target.copy(desiredTarget.current);
        controls.update();
        isAnimating.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.08}
      minDistance={1.4}
      maxDistance={10}
      maxPolarAngle={Math.PI * 0.85}
      minPolarAngle={Math.PI * 0.15}
    />
  );
}

// ─── Orientation Compass ────────────────────────────────────────────
function OrientationCompass() {
  return (
    <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex items-center gap-4 text-white/60 text-[10px] font-bold">
      <span>S</span>
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border border-white/20" />
        <div className="absolute top-1/2 left-0 -translate-y-1/2 text-white/50">L</div>
        <div className="absolute top-1/2 right-0 -translate-y-1/2 text-white/50">R</div>
        <div className="absolute top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-white/40" />
      </div>
      <span>I</span>
    </div>
  );
}

// ─── Anatomy Scene ──────────────────────────────────────────────────
function AnatomyScene({
  selectedOrgan,
  hoveredOrgan,
  onSelectOrgan,
  onHoverOrgan,
  onUnhoverOrgan,
  onDeselectOrgan,
  viewAngle,
  cameraDistance,
  bodyTransparency,
}: {
  selectedOrgan: OrganType | null;
  hoveredOrgan: OrganType | null;
  onSelectOrgan: (organ: OrganType) => void;
  onHoverOrgan: (organ: OrganType) => void;
  onUnhoverOrgan: () => void;
  onDeselectOrgan: () => void;
  viewAngle: ViewAngle;
  cameraDistance: number;
  bodyTransparency: number;
}) {
  const targetPos = selectedOrgan
    ? getOrganMeta(selectedOrgan).position
    : null;

  return (
    <>
      <CameraController
        targetPosition={targetPos}
        viewAngle={viewAngle}
        cameraDistance={cameraDistance}
      />
      {/* Enhanced lighting setup for medical visualization */}
      <ambientLight intensity={0.35} color="#f0f4f8" />

      {/* Key light - main illumination */}
      <directionalLight
        position={[6, 10, 6]}
        intensity={1.8}
        castShadow
        color="#ffffff"
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />

      {/* Fill light - soften shadows */}
      <directionalLight position={[-4, 5, -4]} intensity={0.6} color="#b8d4f0" />

      {/* Rim light - edge definition */}
      <directionalLight position={[0, 3, -8]} intensity={0.8} color="#d0e8ff" />

      {/* Accent lights for organs */}
      <pointLight position={[0, 2.5, 2]} intensity={1.2} color="#e8f4ff" distance={4} decay={2} />
      <pointLight position={[-2, 1.5, 1]} intensity={0.7} color="#fff8f0" distance={3} decay={2} />
      <pointLight position={[2, 1.5, 1]} intensity={0.7} color="#f0f8ff" distance={3} decay={2} />

      {/* Subtle bottom fill */}
      <hemisphereLight args={['#e0f0ff', '#1a2a3a', 0.4]} />

      <Environment preset="studio" />

      {/* Click on background to deselect */}
      <mesh
        position={[0, 1.2, -3]}
        onClick={onDeselectOrgan}
        visible={false}
      >
        <planeGeometry args={[20, 20]} />
        <meshBasicMaterial />
      </mesh>

      <HumanBodyMesh transparency={bodyTransparency} />

      {ORGAN_DATA.map((organ) => (
        <OrganMesh
          key={organ.id}
          organ={organ}
          isSelected={selectedOrgan === organ.id}
          isHovered={hoveredOrgan === organ.id}
          onSelect={() => onSelectOrgan(organ.id)}
          onHover={() => onHoverOrgan(organ.id)}
          onUnhover={onUnhoverOrgan}
        />
      ))}

      {/* Enhanced ground grid with depth */}
      <gridHelper
        args={[12, 24, '#2a4a6f', '#0f2238']}
        position={[0, -1.15, 0]}
      />
      {/* Circular platform under the body */}
      <mesh position={[0, -1.14, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <circleGeometry args={[1.2, 64]} />
        <meshStandardMaterial
          color="#1a3552"
          transparent
          opacity={0.4}
          emissive="#2a4a6f"
          emissiveIntensity={0.2}
        />
      </mesh>
    </>
  );
}

// ─── Organ Icon Component ───────────────────────────────────────────
function OrganIcon({ organ, size = 32 }: { organ: OrganType; size?: number }) {
  const meta = getOrganMeta(organ);
  const icons: Record<OrganType, typeof Brain> = {
    brain: Brain,
    heart: HeartPulse,
    lungs: Wind,
    liver: Droplets,
    stomach: ActivityIcon,
    intestines: ActivityIcon,
    kidneys: Bean,
    pancreas: Bean,
    spleen: Shield,
    bladder: FlaskConical,
  };
  const Icon = icons[organ];

  return (
    <div
      className="rounded-lg flex items-center justify-center shrink-0 border"
      style={{
        width: size,
        height: size,
        backgroundColor: `${meta.color}18`,
        borderColor: `${meta.color}35`,
      }}
    >
      <Icon size={size * 0.52} strokeWidth={1.8} style={{ color: meta.color }} />
    </div>
  );
}

// ─── Organ Details Panel ────────────────────────────────────────────
function OrganDetailsPanel({
  organ,
  patient,
  language,
  onClose,
}: {
  organ: OrganType;
  patient: DoctorExtendedPatient;
  language: string;
  onClose: () => void;
}) {
  const meta = getOrganMeta(organ);
  const organFindings = (patient.organFindings || []).filter((f) => f.organ === organ);
  const [activeTab, setActiveTab] = useState<'overview' | 'vitals' | 'history' | 'notes'>('overview');
  const selectedFinding = organFindings[0];

  const organVitals = useMemo(() => {
    const v = patient.vitals;
    const vitals: Array<{ label: string; value: string; status: string }> = [];

    if (organ === 'heart') {
      vitals.push(
        { label: 'Heart Rate', value: `${v.heartRate.value} bpm`, status: v.heartRate.status },
        { label: 'Blood Pressure', value: `${v.bloodPressure.systolic}/${v.bloodPressure.diastolic} mmHg`, status: v.bloodPressure.status },
        { label: 'Oxygen Saturation', value: `${v.spo2.value}%`, status: v.spo2.status },
      );
    } else if (organ === 'lungs') {
      vitals.push(
        { label: 'Respiratory Rate', value: `${v.respiratoryRate.value} /min`, status: v.respiratoryRate.status },
        { label: 'SpO2', value: `${v.spo2.value}%`, status: v.spo2.status },
      );
    } else if (organ === 'brain') {
      vitals.push(
        { label: 'Temperature', value: `${v.temperature.value} °F`, status: v.temperature.status },
        { label: 'Heart Rate', value: `${v.heartRate.value} bpm`, status: v.heartRate.status },
      );
    }
    return vitals;
  }, [organ, patient.vitals]);

  const recentHistory = useMemo(() => {
    const labels: Record<string, string[]> = {
      heart: ['Cardiology', 'Cardiac'],
      lungs: ['Pulmonology', 'Respiratory'],
      liver: ['Hepatology', 'Gastroenterology'],
      kidneys: ['Nephrology', 'Renal', 'Urology'],
      brain: ['Neurology', 'Neurosurgery'],
      stomach: ['Gastroenterology'],
      intestines: ['Gastroenterology', 'GI'],
      pancreas: ['Endocrinology', 'Gastroenterology'],
      spleen: ['Hematology'],
      bladder: ['Urology'],
    };
    const keywords = labels[organ] || [];
    return patient.labReports
      .filter((r) => keywords.some((kw) => r.testName.toLowerCase().includes(kw.toLowerCase())))
      .slice(0, 3);
  }, [organ, patient.labReports]);

  const statusColor = (status: string) => {
    if (status === 'normal') return 'bg-emerald-100 text-emerald-800';
    if (status === 'elevated' || status === 'stage1' || status === 'low') return 'bg-amber-100 text-amber-800';
    return 'bg-rose-100 text-rose-800';
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden flex flex-col max-h-full">
      {/* Header */}
      <div className="p-5 border-b border-slate-100">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div
              className="w-16 h-16 rounded-xl flex items-center justify-center shrink-0"
              style={{ backgroundColor: `${meta.color}15` }}
            >
              <OrganIcon organ={organ} size={42} />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-extrabold text-slate-900">
                  {language === 'hi' ? meta.nameHi : meta.name}
                </h3>
                <span
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border"
                  style={{ borderColor: meta.color, color: meta.color, backgroundColor: `${meta.color}10` }}
                >
                  <Heart className="w-3 h-3" /> Selected
                </span>
              </div>
              <p className="text-xs text-slate-500 mt-0.5">
                {language === 'hi' ? meta.systemHi : meta.system}
              </p>
              <p className="text-xs text-slate-600 mt-2 leading-relaxed max-w-sm">
                {language === 'hi' ? meta.descriptionHi : meta.description}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Tab bar */}
      <div className="flex border-b border-slate-100 px-5">
        {[
          { id: 'overview', label: 'Overview', icon: Info },
          { id: 'vitals', label: 'Vitals', icon: Activity },
          { id: 'history', label: 'History', icon: Clock },
          { id: 'notes', label: 'Notes', icon: FileText },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`flex items-center gap-1.5 px-3 py-2.5 text-xs font-semibold border-b-2 transition-all ${
                isActive
                  ? 'border-blue-600 text-blue-700'
                  : 'border-transparent text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4">
        {activeTab === 'overview' && (
          <>
            {/* Patient Information */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-3">
                <Activity className="w-3.5 h-3.5 text-blue-600" />
                Patient Information
              </h4>
              {organVitals.length > 0 ? (
                <div className="space-y-2">
                  {organVitals.map((v, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-2.5 rounded-xl bg-slate-50 border border-slate-100"
                    >
                      <div className="flex items-center gap-2">
                        <Activity className="w-3.5 h-3.5 text-slate-400" />
                        <span className="text-xs text-slate-700">{v.label}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-slate-900">{v.value}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(v.status)}`}>
                          {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-slate-400 py-4 text-center">
                  No organ-specific vitals available for this organ.
                </p>
              )}
            </div>

            {/* Clinical Notes */}
            <div>
              <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5 mb-3">
                <FileText className="w-3.5 h-3.5 text-blue-600" />
                Clinical Notes
              </h4>
              <div className="p-3 rounded-xl bg-slate-50 border border-slate-100">
                {organFindings.length > 0 ? (
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {organFindings[0].clinicalNote}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    No organ-specific clinical notes have been recorded for this patient.
                  </p>
                )}
                {selectedFinding && (
                  <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" /> Last updated: {selectedFinding.timestamp}
                  </p>
                )}
              </div>
            </div>
          </>
        )}

        {activeTab === 'vitals' && (
          <div className="space-y-3">
            {organVitals.length > 0 ? (
              organVitals.map((v, i) => (
                <div key={i} className="p-3 rounded-xl border border-slate-200 bg-white">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-semibold text-slate-700">{v.label}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${statusColor(v.status)}`}>
                      {v.status.charAt(0).toUpperCase() + v.status.slice(1)}
                    </span>
                  </div>
                  <p className="text-xl font-extrabold text-slate-900 mt-1">{v.value}</p>
                  <p className="text-[10px] text-slate-400 mt-1">Source: Simulated bedside monitor</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-8 text-center">
                No vitals data mapped to this organ.
              </p>
            )}
            <p className="text-[10px] text-amber-700 bg-amber-50 p-2 rounded-lg border border-amber-200 text-center">
              These are simulated demo readings and do not represent actual patient data.
            </p>
          </div>
        )}

        {activeTab === 'history' && (
          <div>
            <h4 className="text-xs font-bold text-slate-800 mb-3 flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5 text-blue-600" />
              Related reports
            </h4>
            {recentHistory.length > 0 ? (
              <div className="space-y-2">
                {recentHistory.map((r, i) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-lg bg-slate-50 border border-slate-100">
                    <div className="w-1 h-8 rounded-full bg-blue-300" />
                    <div>
                      <p className="text-[11px] text-slate-500">{r.date}</p>
                      <p className="text-xs font-semibold text-slate-800">{r.testName} - {r.result}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="py-6 text-center text-xs text-slate-400">
                No related reports or historical measurements are available for this organ.
              </p>
            )}
          </div>
        )}

        {activeTab === 'notes' && (
          <div className="space-y-3">
            {organFindings.length > 0 ? (
              organFindings.map((f) => (
                <div key={f.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1.5">
                  <div className="flex items-start justify-between">
                    <h5 className="text-xs font-bold text-slate-900">{f.title}</h5>
                    <span className="text-[10px] text-slate-400">{f.observationDate}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">{f.clinicalNote}</p>
                  <p className="text-[10px] text-slate-400">By {f.doctorName}</p>
                </div>
              ))
            ) : (
              <p className="text-xs text-slate-400 py-8 text-center">
                No organ-specific clinical notes recorded.
              </p>
            )}
          </div>
        )}

        {/* Demo data disclaimer */}
        <div className="flex items-center gap-2 p-2 rounded-lg bg-blue-50/60 border border-blue-100">
          <Info className="w-3.5 h-3.5 text-blue-500 shrink-0" />
          <p className="text-[10px] text-blue-700">
            This is demo data and not real patient information.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Loading Fallback ───────────────────────────────────────────────
function LoadingFallback() {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-[#0a1628] to-[#0d2244]">
      <div className="w-12 h-12 rounded-xl bg-blue-600/30 flex items-center justify-center mb-3 animate-pulse">
        <Activity className="w-6 h-6 text-blue-400" />
      </div>
      <p className="text-sm font-bold text-white/80">Loading 3D Anatomy Model...</p>
      <p className="text-xs text-white/40 mt-1">Preparing interactive viewer</p>
    </div>
  );
}

class AnatomyCanvasErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { error: Error | null }
> {
  state: { error: Error | null } = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error) {
    console.error('The anatomy viewer could not be rendered.', error);
  }

  render() {
    if (this.state.error) {
      return (
        <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-white" role="alert">
          <Activity className="h-8 w-8 text-rose-300" />
          <p className="font-semibold">The 3D viewer could not be rendered.</p>
          <p className="text-sm text-white/65">You can continue using the patient and organ details. {this.state.error.message}</p>
        </div>
      );
    }

    return this.props.children;
  }
}

// ─── Main Page Component ────────────────────────────────────────────
export const DoctorAnatomyPage: React.FC = () => {
  const { language } = useLanguage();
  const patients = doctorStore.getAllDoctorPatients();
  const [selectedPatientId, setSelectedPatientId] = useState(patients[0]?.id ?? '');
  const patient = selectedPatientId ? doctorStore.getDoctorPatient(selectedPatientId) : null;
  const doctorName = authService.getSession()?.name || 'Dr. Aarav Sharma';

  const [selectedOrgan, setSelectedOrgan] = useState<OrganType | null>('heart');
  const [hoveredOrgan, setHoveredOrgan] = useState<OrganType | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [systemFilter, setSystemFilter] = useState('all');
  const [viewAngle, setViewAngle] = useState<ViewAngle>('3d');
  const [bodyTransparency, setBodyTransparency] = useState(0.3);
  const [cameraDistance, setCameraDistance] = useState(5);
  const [fullscreenError, setFullscreenError] = useState('');
  const viewportRef = useRef<HTMLDivElement>(null);

  const handleSelectOrgan = useCallback((organ: OrganType) => {
    setSelectedOrgan(organ);
    setCameraDistance((distance) => Math.min(distance, 4.2));
  }, [setCameraDistance]);

  const handleDeselectOrgan = useCallback(() => {
    setSelectedOrgan(null);
  }, [setSelectedOrgan]);

  const handleViewAngle = useCallback((angle: ViewAngle) => {
    setViewAngle(angle);
  }, [setViewAngle]);

  const handleResetView = useCallback(() => {
    setViewAngle('3d');
    setCameraDistance(5);
    setSelectedOrgan(null);
  }, [setSelectedOrgan, setViewAngle, setCameraDistance]);

  const handleCenterView = useCallback(() => {
    setCameraDistance(selectedOrgan ? 2.5 : 5);
    if (!selectedOrgan) setViewAngle('3d');
  }, [selectedOrgan, setCameraDistance, setViewAngle]);

  const handleFullscreen = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    setFullscreenError('');
    if (document.fullscreenElement === viewport) {
      void document.exitFullscreen().catch((error: unknown) => {
        console.error('Unable to exit anatomy fullscreen mode', error);
        setFullscreenError('Fullscreen could not be closed. Use your browser controls to exit.');
      });
      return;
    }

    void viewport.requestFullscreen().catch((error: unknown) => {
      console.error('Unable to open anatomy fullscreen mode', error);
      setFullscreenError('Fullscreen is unavailable in this browser or window.');
    });
  }, []);

  const systems = Array.from(new Set(ORGAN_DATA.map((organ) => organ.system)));
  const filteredOrgans = ORGAN_DATA.filter((organ) => {
    const term = searchTerm.trim().toLowerCase();
    const matchesSearch = !term || (
      organ.name.toLowerCase().includes(term) ||
      organ.nameHi.includes(term) ||
      organ.system.toLowerCase().includes(term) ||
      organ.systemHi.includes(term)
    );
    const matchesSystem = systemFilter === 'all' || organ.system === systemFilter;
    return matchesSearch && matchesSystem;
  });
  const highlightedOrgan = selectedOrgan || hoveredOrgan;

  if (!patient) {
    return (
      <DoctorLayout>
        <div className="flex items-center justify-center min-h-[60vh] text-slate-400">
          No patient data available.
        </div>
      </DoctorLayout>
    );
  }

  return (
    <DoctorLayout>
      <div className="space-y-4 -mt-2">
        {/* Patient Context Header */}
        <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs p-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white font-black flex items-center justify-center text-base shadow-sm ring-2 ring-blue-100">
                {patient.fullName.split(' ').map((n) => n[0]).join('').slice(0, 2)}
              </div>
              <div>
                <h2 className="text-lg font-extrabold text-slate-900">{patient.fullName}</h2>
                <div className="flex items-center gap-2 flex-wrap mt-0.5">
                  <span className="text-xs text-blue-700 font-mono font-bold">
                    Patient ID: {patient.id}
                  </span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-600">
                    Age: {patient.age}
                  </span>
                  <span className="text-xs text-slate-400">|</span>
                  <span className="text-xs text-slate-600">{patient.gender}</span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {patient.admissionStatus || 'Active'}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:items-end gap-1">
              <label htmlFor="anatomy-patient" className="text-[10px] font-bold uppercase tracking-wide text-slate-400">
                Patient record
              </label>
              <select
                id="anatomy-patient"
                value={selectedPatientId}
                onChange={(event) => setSelectedPatientId(event.target.value)}
                className="max-w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                {patients.map((record) => (
                  <option key={record.id} value={record.id}>
                    {record.fullName} · {record.id}
                  </option>
                ))}
              </select>
              <p className="text-[11px] text-slate-500">Attending clinician: <span className="font-semibold text-slate-700">{doctorName}</span></p>
            </div>
          </div>
        </div>

        {/* Main 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4" style={{ minHeight: '75vh' }}>
          {/* Left Panel: Organ Navigator */}
          <div className="lg:col-span-3 xl:col-span-2 space-y-3">
            <div className="bg-white rounded-2xl border border-slate-200/80 shadow-xs overflow-hidden flex flex-col max-h-[40vh] lg:max-h-[75vh]">
              <div className="p-3 border-b border-slate-100">
                <h3 className="text-sm font-extrabold text-slate-900 mb-2">Organs</h3>
                <div className="relative">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search organs..."
                    className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs bg-slate-50 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-300"
                  />
                </div>
                <label htmlFor="anatomy-system-filter" className="sr-only">Filter by organ system</label>
                <select
                  id="anatomy-system-filter"
                  value={systemFilter}
                  onChange={(event) => setSystemFilter(event.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-200 bg-white px-2.5 py-2 text-xs text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  <option value="all">All systems</option>
                  {systems.map((system) => (
                    <option key={system} value={system}>{system}</option>
                  ))}
                </select>
              </div>

              <div className="overflow-y-auto flex-1">
                {filteredOrgans.length ? filteredOrgans.map((organ) => {
                  const isSelected = selectedOrgan === organ.id;
                  const isHovered = hoveredOrgan === organ.id;
                  return (
                    <button
                      key={organ.id}
                      type="button"
                      onClick={() => handleSelectOrgan(organ.id)}
                      onMouseEnter={() => setHoveredOrgan(organ.id)}
                      onMouseLeave={() => setHoveredOrgan(null)}
                      className={`w-full flex items-center justify-between px-3 py-2.5 text-left transition-all border-l-3 ${
                        isSelected
                          ? 'bg-blue-50 border-l-blue-600 border-l-[3px]'
                          : isHovered
                          ? 'bg-slate-50 border-l-transparent border-l-[3px]'
                          : 'border-l-transparent border-l-[3px] hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <OrganIcon organ={organ.id} size={36} />
                        <span
                          className={`text-xs font-semibold ${
                            isSelected ? 'text-blue-700 font-bold' : 'text-slate-700'
                          }`}
                        >
                          {language === 'hi' ? organ.nameHi : organ.name}
                        </span>
                      </div>
                      <ChevronRight
                        className={`w-3.5 h-3.5 transition-colors ${
                          isSelected ? 'text-blue-500' : 'text-slate-300'
                        }`}
                      />
                    </button>
                  );
                }) : (
                  <p className="px-3 py-8 text-center text-xs text-slate-400">
                    No organs match these filters.
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Center: 3D Viewport */}
          <div className={`${selectedOrgan ? 'lg:col-span-5 xl:col-span-6' : 'lg:col-span-9 xl:col-span-10'} transition-all duration-300`}>
            <div ref={viewportRef} className="anatomy-viewport bg-gradient-to-b from-[#0b1a2e] via-[#0d1f38] to-[#0b1a2e] rounded-2xl border border-slate-700/40 shadow-2xl overflow-hidden relative" style={{ height: '75vh' }}>
              {/* View Controls Bar */}
              <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-3">
                <div className="flex items-center gap-1 bg-slate-800/80 backdrop-blur-sm rounded-xl p-1 border border-slate-600/30">
                  {(['3d', 'front', 'back', 'left', 'right'] as const).map((v) => (
                    <button
                      key={v}
                      type="button"
                      onClick={() => handleViewAngle(v)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        viewAngle === v
                          ? 'bg-white text-slate-900 shadow-sm'
                          : 'text-slate-300 hover:text-white hover:bg-slate-700/50'
                      }`}
                    >
                      {v === '3d' ? (
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> 3D View
                        </span>
                      ) : (
                        v.charAt(0).toUpperCase() + v.slice(1)
                      )}
                    </button>
                  ))}
                </div>

                {/* Zoom Controls */}
                <div className="flex flex-col gap-1">
                  <button
                    type="button"
                    onClick={() => setCameraDistance((distance) => Math.max(2, distance - 0.5))}
                    aria-label="Zoom in"
                    className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-700/80 border border-slate-600/30 transition-all"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setCameraDistance((distance) => Math.min(9, distance + 0.5))}
                    aria-label="Zoom out"
                    className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-700/80 border border-slate-600/30 transition-all"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Left side controls */}
              <div className="absolute left-3 top-1/2 -translate-y-1/2 z-10 flex flex-col gap-1.5">
                <button
                  type="button"
                  onClick={handleFullscreen}
                  className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-700/80 border border-slate-600/30 transition-all"
                  title="Toggle fullscreen"
                  aria-label="Toggle fullscreen"
                >
                  <Maximize2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleResetView}
                  className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-700/80 border border-slate-600/30 transition-all"
                  title="Reset rotation"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={handleCenterView}
                  className="p-2 rounded-lg bg-slate-800/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-700/80 border border-slate-600/30 transition-all"
                  title="Center view"
                  aria-label="Center view on selected organ"
                >
                  <Crosshair className="w-4 h-4" />
                </button>
              </div>

              {/* Transparency slider */}
              <div className="absolute right-3 top-1/2 -translate-y-1/2 z-10 flex flex-col items-center gap-2">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={bodyTransparency * 100}
                  onChange={(e) => setBodyTransparency(Number(e.target.value) / 100)}
                  className="w-1 h-32 appearance-none bg-slate-600/50 rounded-full [writing-mode:vertical-lr] [direction:rtl] accent-blue-500"
                  title="Body transparency"
                  aria-label="Body transparency"
                />
              </div>

              {/* R3F Canvas */}
              <Suspense fallback={<LoadingFallback />}>
                <AnatomyCanvasErrorBoundary>
                  <Canvas
                    camera={{ position: [0, 1.5, 5], fov: 50 }}
                    gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
                    style={{ background: 'transparent' }}
                    shadows={{ type: THREE.PCFShadowMap }}
                    fallback={
                      <div className="flex h-full flex-col items-center justify-center gap-2 px-6 text-center text-white" role="alert">
                        <Activity className="h-8 w-8 text-blue-300" />
                        <p className="font-semibold">3D viewing is unavailable in this browser.</p>
                        <p className="text-sm text-white/65">Enable WebGL or use a browser with WebGL support. Organ details remain available.</p>
                      </div>
                    }
                  >
                    <color attach="background" args={['#0b1a2e']} />
                    <fog attach="fog" args={['#0b1a2e', 6, 14]} />
                    <AnatomyScene
                      selectedOrgan={selectedOrgan}
                      hoveredOrgan={hoveredOrgan}
                      onSelectOrgan={handleSelectOrgan}
                      onHoverOrgan={setHoveredOrgan}
                      onUnhoverOrgan={() => setHoveredOrgan(null)}
                      onDeselectOrgan={handleDeselectOrgan}
                      viewAngle={viewAngle}
                      cameraDistance={cameraDistance}
                      bodyTransparency={bodyTransparency}
                    />
                  </Canvas>
                </AnatomyCanvasErrorBoundary>
              </Suspense>
              {fullscreenError && (
                <p className="absolute bottom-16 left-1/2 z-20 -translate-x-1/2 rounded-lg bg-rose-950/90 px-3 py-2 text-center text-xs text-white" role="alert">
                  {fullscreenError}
                </p>
              )}

              {/* Selected/hovered organ label */}
              {highlightedOrgan && (
                <div className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10">
                  <div className="px-4 py-2 rounded-xl bg-slate-800/90 backdrop-blur-sm border border-slate-600/30 text-white text-sm font-bold shadow-lg">
                    {getOrganMeta(highlightedOrgan).name}
                    {selectedOrgan && <span className="ml-2 text-[10px] text-blue-200">Selected</span>}
                  </div>
                </div>
              )}

              {/* Reset View button */}
              <div className="absolute bottom-4 right-4 z-10">
                <button
                  type="button"
                  onClick={handleResetView}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/80 backdrop-blur-sm text-white/80 hover:text-white hover:bg-slate-700/80 border border-slate-600/30 text-xs font-semibold transition-all"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reset View
                </button>
              </div>

              {/* Orientation compass */}
              <OrientationCompass />
            </div>
          </div>

          {/* Right Panel: Organ Details */}
          {selectedOrgan && (
            <div className="lg:col-span-4 xl:col-span-4" style={{ maxHeight: '75vh' }}>
              <OrganDetailsPanel
                organ={selectedOrgan}
                patient={patient}
                language={language}
                onClose={handleDeselectOrgan}
              />
            </div>
          )}
        </div>
      </div>
    </DoctorLayout>
  );
};

declare module 'aceternity' {
  import { ReactNode } from 'react';

  export interface BackgroundBeamsProps {
    children?: ReactNode;
    className?: string;
    color?: string;
    backgroundOpacity?: number;
    animationSpeed?: number;
    beams?: number;
    disableBeamRipples?: boolean;
  }

  export interface SparklesCoreProps {
    id: string;
    background?: string;
    minSize?: number;
    maxSize?: number;
    particleDensity?: number;
    className?: string;
    particleColor?: string;
    speed?: number;
    particleSize?: number;
  }

  export const BackgroundBeams: React.FC<BackgroundBeamsProps>;
  export const SparklesCore: React.FC<SparklesCoreProps>;
} 
/// <reference types="react" />

import "framer-motion";

declare module "framer-motion" {
  export interface HTMLMotionProps<T extends Element> {
    style?: React.CSSProperties & {
      rotateX?: string | number;
      rotateY?: string | number;
      rotateZ?: string | number;
      perspective?: string | number;
      transformOrigin?: string | number;
      transformStyle?: string;
      whileTap?: any;
      whileHover?: any;
      whileInView?: any;
      initial?: any;
      animate?: any;
      transition?: any;
      viewport?: any;
      exit?: any;
    };
  }
  
  export interface MotionValue<T = any> {
    get(): T;
    set(v: T): void;
    onChange(callback: (v: T) => void): () => void;
  }
  
  export function useMotionValue<T>(initial: T): MotionValue<T>;
  export function useTransform<T>(value: MotionValue<number>, inputRange: number[], outputRange: T[], options?: any): MotionValue<T>;
  export function useTransform<T>(value: MotionValue<number>, inputRange: number[], outputMap: Record<number, T>, options?: any): MotionValue<T>;
  export function useSpring<T>(value: MotionValue<T>, config: { stiffness: number; damping: number }): MotionValue<T>;
  export function animate<T>(value: MotionValue<T>, target: T, options?: any): Promise<void>;
}

declare module "react" {
  interface CSSProperties {
    rotateX?: string | number;
    rotateY?: string | number;
    rotateZ?: string | number;
    perspective?: string | number;
    transformOrigin?: string | number;
    transformStyle?: string;
  }
  
  interface RefObject<T> {
    readonly current: T | null;
  }
}
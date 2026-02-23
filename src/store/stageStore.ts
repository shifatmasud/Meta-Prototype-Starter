
import React from 'react';
import { create } from 'zustand';

export type ComponentType = 'Container' | 'Text' | 'Button' | 'Image' | 'Input' | 'Card' | 'Icon';

export interface ComponentSpec {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children?: ComponentSpec[];
  style?: React.CSSProperties;
}

interface StageState {
  components: ComponentSpec[];
  history: string[];
  addComponent: (component: ComponentSpec) => void;
  updateComponent: (id: string, updates: Partial<ComponentSpec>) => void;
  removeComponent: (id: string) => void;
  clearStage: () => void;
  addHistory: (message: string) => void;
}

export const useStageStore = create<StageState>((set) => ({
  components: [],
  history: [],
  addComponent: (component) => set((state) => ({ components: [...state.components, component] })),
  updateComponent: (id, updates) => set((state) => ({
    components: state.components.map((c) => (c.id === id ? { ...c, ...updates } : c))
  })),
  removeComponent: (id) => set((state) => ({
    components: state.components.filter((c) => c.id !== id)
  })),
  clearStage: () => set({ components: [] }),
  addHistory: (message) => set((state) => ({ history: [...state.history, message] })),
}));

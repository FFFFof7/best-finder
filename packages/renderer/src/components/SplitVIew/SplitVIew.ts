import type { InjectionKey } from 'vue'
export type SplitViewMode = 'horizontal' | 'vertical'
export interface View {
  id: string
  width?: number
  height?: number
}
export interface SplitViewContext {
  mode: SplitViewMode
  views: View[]
  addView: (view: View) => void
  onResize: (view: View, w: number, viewIndex: number) => void
}
export const SplitViewKey: InjectionKey<SplitViewContext> = Symbol('SplitView')

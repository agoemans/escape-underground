// src/shared/globals.ts

type scaleMode = 'FIT' | 'SMOOTH'
export const DEFAULT_WIDTH: number = 1280
export const DEFAULT_HEIGHT: number = 720
export const MAX_WIDTH: number = DEFAULT_WIDTH * 1.5
export const MAX_HEIGHT: number = DEFAULT_HEIGHT * 1.5
export let SCALE_MODE: scaleMode = 'FIT' // FIT OR SMOOTH
export const TILE_SIZE: number = 64;
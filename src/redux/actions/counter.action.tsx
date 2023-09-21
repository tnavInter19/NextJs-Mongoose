// src/redux/actions.ts
import { Action } from 'redux';

// Action types
export const INCREMENT = 'INCREMENT';
export const DECREMENT = 'DECREMENT';

// Action creators
export interface IncrementAction extends Action<typeof INCREMENT> {}
export interface DecrementAction extends Action<typeof DECREMENT> {}

export const increment = (): IncrementAction => ({ type: INCREMENT });
export const decrement = (): DecrementAction => ({ type: DECREMENT });
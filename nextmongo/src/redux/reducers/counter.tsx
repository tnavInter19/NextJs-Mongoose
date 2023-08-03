// src/redux/reducers.ts
import { Reducer } from 'redux';
import { DECREMENT, DecrementAction, INCREMENT, IncrementAction } from '../actions/counter.action';


export interface CounterState {
  count: number;
}

const initialState: CounterState = {
  count: 0,
};

type CounterActionTypes = IncrementAction | DecrementAction;

const counterReducer: Reducer<CounterState, CounterActionTypes> = (state = initialState, action) => {
  switch (action.type) {
    case INCREMENT:
      return { ...state, count: state.count + 1 };
    case DECREMENT:
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
};

export default counterReducer;

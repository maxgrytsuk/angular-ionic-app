import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import * as AppActions from './app.actions';

const TIME_FORMAT = 'HH-mm a';
const DATE_FORMAT = 'EEEE, dd LLLL';
const TIME_OFFSET_MIN = 60;

export type ProgressType = 'In progress' | 'Done' | 'Planned';

export type Items = Array<{ title: string;  description: string; isChecked: boolean; }>;

export const PROGRESS: Array<ProgressType> = ['In progress', 'Done', 'Planned'];

export interface State {
  progressIndex: number;
  currentDate: string;
  started: {
    time: string;
    isSelected: boolean;
  };
  finished: {
    time: string;
    isSelected: boolean;
  };
  items: Items;
}

const initialState: State = {
  progressIndex: 0,
  currentDate: format(new Date(), DATE_FORMAT),
  started: {
    time: format(new Date(), TIME_FORMAT),
    isSelected: false,
  },
  finished: {
    time: format(addMinutes(new Date(), TIME_OFFSET_MIN), TIME_FORMAT),
    isSelected: false,
  },
  items: [
    {
      title: 'Give water every two hours',
      description: 'Needs to drink a water every two hour',
      isChecked: false
    },
    {
      title: 'Shower',
      description: 'Shower evert two hours',
      isChecked: false
    }
  ]
};

const appReducer = createReducer(
  initialState,
  on(AppActions.setProgress,
    state => ({
      ...state,
      progressIndex: (state.progressIndex + 1) % PROGRESS.length
    })),
  on(AppActions.setStartedSelected,
    state => ({
      ...state,
      started: {
        ...state.started,
        isSelected: !state.started.isSelected
      }
    })),
  on(AppActions.setFinishedSelected,
    state => ({
      ...state,
      finished: {
        ...state.finished,
        isSelected: !state.finished.isSelected
      }
    })),
    on(AppActions.addItem,
      state => ({
        ...state,
        items: [
           ...state.items,
           {
             title: 'Some new item title',
             description: 'Some new item description',
             isChecked: false
            }
          ]
      })),
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}

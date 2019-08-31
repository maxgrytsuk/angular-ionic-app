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

export type Items = Array<{ type: ItemType, title: string; description: string; isChecked: boolean; }>;

export type ItemType = 'logbook' | 'carePlan';

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
  itemType: ItemType;
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
  itemType: 'logbook',
  items: [
    {
      type: 'logbook',
      title: 'Give water every two hours',
      description: 'Needs to drink a water every two hour',
      isChecked: false
    },
    {
      type: 'carePlan',
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
  on(AppActions.setItemType,
    (state, {itemType}) => ({
      ...state,
      itemType
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
          type: 'logbook',
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

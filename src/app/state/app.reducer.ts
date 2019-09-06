import {
  Action,
  createReducer,
  on,
} from '@ngrx/store';
import format from 'date-fns/format';
import addMinutes from 'date-fns/addMinutes';
import * as AppActions from './app.actions';
import { sortByIdDesc } from '../service/app.service';

const TIME_FORMAT = 'HH-mm a';
const DATE_FORMAT = 'EEEE, dd LLLL';
const TIME_OFFSET_MIN = 60;

export type ProgressType = 'In progress' | 'Done' | 'Planned';

export type ItemType = 'logbook' | 'carePlan';

export interface Item {
  id: number;
  type: ItemType;
  title: string;
  description: string;
  isChecked: boolean;
};

type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type NewItem = Omit<Item, 'id'>;

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
  items: Array<Item>;
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
  items: []
};

const appReducer = createReducer(
  initialState,
  on(AppActions.getItemsSuccess,
    (state, { items }) => ({
      ...state,
      items
    })),
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
    (state, { itemType }) => ({
      ...state,
      itemType
    })),
  on(AppActions.setItemChecked,
    (state, { checkedItem }) => {
      return {
        ...state,
        items: state.items.map(item => {
          if (item.id === checkedItem.id) {
            return {
              ...item,
              isChecked: !item.isChecked
            }
          }
          return item;
        })
      }
    }),
  on(AppActions.removeItemSuccess,
    (state, { itemToRemove }) => {
      return {
        ...state,
        items: state.items.filter(item => item.id !== itemToRemove.id)
      }
    }),
  on(AppActions.setFinishedSelected,
    state => ({
      ...state,
      finished: {
        ...state.finished,
        isSelected: !state.finished.isSelected
      }
    })),
  on(AppActions.addItemSuccess,
    (state, { item }) => {
      return {
        ...state,
        items: [...state.items, {...item, title: `${item.title} ${item.id}`}].sort(sortByIdDesc)
      }
    })
);

export function reducer(state: State | undefined, action: Action) {
  return appReducer(state, action);
}

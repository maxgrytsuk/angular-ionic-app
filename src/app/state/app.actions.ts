import {
  createAction,
  props
} from '@ngrx/store';
import { ItemType } from './app.reducer';

export const setProgress = createAction('[App Page] Set Progress');
export const setStartedSelected = createAction('[App Page] Set Started Selected/Unselected');
export const setFinishedSelected = createAction('[App Page] Set Finished Selected/Unselected');
export const addItem = createAction('[App Page] Add Item');
export const setItemType = createAction('[App Page] Set Item Type', props<{itemType: ItemType}>());



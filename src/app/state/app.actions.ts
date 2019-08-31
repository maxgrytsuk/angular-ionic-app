import {
  createAction,
  props
} from '@ngrx/store';
import { ItemType, Item } from './app.reducer';

export const setProgress = createAction('[App Page] Set Progress');
export const setStartedSelected = createAction('[App Page] Set Started Selected/Unselected');
export const setFinishedSelected = createAction('[App Page] Set Finished Selected/Unselected');
export const addItem = createAction('[App Page] Add Item');
export const setItemType = createAction('[App Page] Set Item Type', props<{itemType: ItemType}>());
export const setItemChecked = createAction('[App Page] Set Item Checked', props<{checkedItem: Item}>());
export const removeItem = createAction('[App Page] Remove Item', props<{itemToRemove: Item}>());



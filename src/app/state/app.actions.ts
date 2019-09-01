import {
  createAction,
  props
} from '@ngrx/store';
import { ItemType, Item, NewItem } from './app.reducer';

export const getItems = createAction('[App Page] Get Items');
export const getItemsSuccess = createAction('[App API] Items Loaded Success', props<{items: Array<Item>}>());
export const getItemsError = createAction('[App API] Items Loaded Error', props<{err: string}>());
export const setProgress = createAction('[App Page] Set Progress');
export const setStartedSelected = createAction('[App Page] Set Started Selected/Unselected');
export const setFinishedSelected = createAction('[App Page] Set Finished Selected/Unselected');
export const addItem = createAction('[App Page] Add Item', props<{item: NewItem}>());
export const addItemSuccess = createAction('[App Page] Add Item Success', props<{item: Item}>());
export const addItemError = createAction('[App Page] Add Item Error', props<{err: string}>());
export const setItemType = createAction('[App Page] Set Item Type', props<{itemType: ItemType}>());
export const setItemChecked = createAction('[App Page] Set Item Checked', props<{checkedItem: Item}>());
export const removeItem = createAction('[App Page] Remove Item', props<{itemToRemove: Item}>());
export const removeItemSuccess = createAction('[App Page] Remove Item Success');
export const removeItemError = createAction('[App Page] Remove Item Error', props<{err: string}>());



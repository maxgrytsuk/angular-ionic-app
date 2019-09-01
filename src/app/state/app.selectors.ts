import {
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromApp from './app.reducer';

export const getAppState = createFeatureSelector<fromApp.State>('app');

export const getProgressIndex = createSelector(
  getAppState,
  (state: fromApp.State) => state.progressIndex
);

export const getStartedTime = createSelector(
  getAppState,
  (state: fromApp.State) => state.started.time
);

export const getStartedSelected = createSelector(
  getAppState,
  (state: fromApp.State) => state.started.isSelected
);

export const getFinishedTime = createSelector(
  getAppState,
  (state: fromApp.State) => state.finished.time
);

export const getFinishedSelected = createSelector(
  getAppState,
  (state: fromApp.State) => state.finished.isSelected
);

export const getCurrentDate = createSelector(
  getAppState,
  (state: fromApp.State) => state.currentDate
);

export const getItemType = createSelector(
  getAppState,
  (state: fromApp.State) => state.itemType
);

export const getItems = createSelector(
  getAppState,
  getItemType,
  (state: fromApp.State, itemType) =>
    state.items.filter(item => item.type === itemType)
);
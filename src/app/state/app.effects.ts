import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from '../service/app.service';
import * as AppActions from './app.actions';

@Injectable()
export class AppEffects {

  getItems$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.getItems),
      mergeMap(() => this.appService.getItems()
        .pipe(
          map(items => AppActions.getItemsSuccess({ items })),
          catchError((err) => of(AppActions.getItemsError({ err })))
        )
      )
    )
  );

  addItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.addItem),
      mergeMap(action =>
        this.appService.addItem(action.item).pipe(
          map((item) => AppActions.addItemSuccess({ item })),
          catchError(err => of(AppActions.addItemError({ err })))
        )
      )
    )
  );

  removeItem$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AppActions.removeItem),
      mergeMap(action =>
        this.appService.removeItem( action.itemToRemove ).pipe(
          map((item) => AppActions.removeItemSuccess()),
          catchError(err => of(AppActions.removeItemError({ err })))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }
}
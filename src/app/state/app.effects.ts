import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { AppService } from '../service/app.service';

@Injectable()
export class AppEffects {

  loadMovies$ = createEffect(() =>
    this.actions$.pipe(
      ofType('[App Page] Get Items'),
      mergeMap(() => this.appService.getItems()
        .pipe(
          map(items => ({ type: '[App API] Items Loaded Success', items })),
          catchError((err) => of({ type: '[App API] Items Loaded Error', err }))
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private appService: AppService
  ) { }
}
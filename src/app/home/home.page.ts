import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';

import { ModalController } from '@ionic/angular';

import { State, ProgressType, PROGRESS, Item, NewItem } from '../state/app.reducer';
import * as AppActions from '../state/app.actions';
import * as fromApp from '../state/app.selectors';

import { ModalPage } from '../modal/modal.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  currentTime: string;
  currentTimeOffset: string;
  currentDate: string;
  startedClicked: boolean;
  finishedClicked: boolean;
  progress: Array<ProgressType>;
  progressIndex$: Observable<number>;
  startedTime$: Observable<string>;
  isStartedSelected$: Observable<boolean>;
  finishedTime$: Observable<string>;
  isFinishedSelected$: Observable<boolean>;
  currentDate$: Observable<string>;
  items$: Observable<Array<Item>>;
  dialogShown: boolean;


  constructor(
    private store: Store<State>,
    public modalController: ModalController
  ) { }

  ngOnInit() {
    this.store.dispatch(AppActions.getItems());
    this.progress = PROGRESS;
    this.progressIndex$ = this.store.pipe(select(fromApp.getProgressIndex));
    this.startedTime$ = this.store.pipe(select(fromApp.getStartedTime));
    this.isStartedSelected$ = this.store.pipe(select(fromApp.getStartedSelected));
    this.finishedTime$ = this.store.pipe(select(fromApp.getFinishedTime));
    this.isFinishedSelected$ = this.store.pipe(select(fromApp.getFinishedSelected));
    this.currentDate$ = this.store.pipe(select(fromApp.getCurrentDate));
    this.items$ = this.store.pipe(select(fromApp.getItems));
    this.dialogShown = false;
  }

  onSetProgress() {
    this.store.dispatch(AppActions.setProgress());
  }

  onStartedClick() {
    this.store.dispatch(AppActions.setStartedSelected());
  }

  onFinishedClick() {
    this.store.dispatch(AppActions.setFinishedSelected());
  }

  onSetChecked(checkedItem: Item) {
    this.store.dispatch(AppActions.setItemChecked({ checkedItem }));
  }

  onRemoveItem(itemToRemove: Item) {
    if (itemToRemove.isChecked) {
      this.store.dispatch(AppActions.removeItem({ itemToRemove }));
    }
  }

  async showModal() {
    this.dialogShown = true;
    const modal = await this.modalController.create({
      component: ModalPage
    });
    modal.onDidDismiss().then(data => {
      this.dialogShown = false;
      if (data.data) {
        this.store.dispatch(AppActions.addItem({item: dummyItem }));
      }
    });
    return await modal.present();
  }

  segmentChanged($event) {
    this.store.dispatch(AppActions.setItemType({ itemType: $event.detail.value }));
  }

}

const dummyItem: NewItem = {
  type: 'logbook',
  title: 'Some dummy item title',
  description: 'Some dummy item description',
  isChecked: false
}
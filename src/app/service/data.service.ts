import { InMemoryDbService } from 'angular-in-memory-web-api';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

const ID = () => '_' + Math.random().toString(36).substr(2, 9);

export class DataService implements InMemoryDbService {
  createDb() {
    const items = [
      {
        id: ID(),
        type: 'logbook',
        title: 'Give water every two hours',
        description: 'Needs to drink a water every two hour',
        isChecked: false
      },
      {
        id: ID(),
        type: 'carePlan',
        title: 'Shower',
        description: 'Shower every two hours',
        isChecked: false
      }
    ];
    return of({items}).pipe(delay(100));
  }
}
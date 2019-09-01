import { InMemoryDbService } from 'angular-in-memory-web-api';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

export class DataService implements InMemoryDbService {
  createDb() {

    const items = new Array(30).fill(0).map((e, i) => {
      const type = Math.random() > .5 ? 'logbook' : 'carePlan';
      return {
        id: i,
        type,
        title: `${type} item ${i}`,
        description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
        isChecked: false
      }
    });
    return of({ items }).pipe(delay(100));
  }
}
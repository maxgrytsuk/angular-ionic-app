import { InMemoryDbService } from 'angular-in-memory-web-api';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Item } from '../state/app.reducer';


export const generateItems = (count): Array<Item> => {
  return new Array(count).fill(0).map((e, i) => {
    const type = Math.random() > .5 ? 'logbook' : 'carePlan';
    return {
      id: i,
      type,
      title: `${type} item ${i}`,
      description: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor.',
      isChecked: false
    }
  });
}
export class DataService implements InMemoryDbService {
  createDb() {
    const items = generateItems(30);
    return of({ items }).pipe(delay(100));
  }
}

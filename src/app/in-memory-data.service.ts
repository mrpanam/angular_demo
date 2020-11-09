
import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Hero } from './hero';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const heroes = [
      { id: 1, name: 'Adam' },
      { id: 2, name: 'Elija' },
      { id: 3, name: 'Noah' },
      { id: 4, name: 'Angel' },
      { id: 5, name: 'Paul' },
      { id: 6, name: 'Julian' },
      { id: 7, name: 'Maloé' },
      { id: 8, name: 'Maël' },
      { id: 9, name: 'Liam' },
      { id: 10, name: 'Aaron' }
    ];
    return {heroes};
  }

  // Overrides the genId method to ensure that a hero always has an id.
  // If the heroes array is empty,
  // the method below returns the initial number (11).
  // if the heroes array is not empty, the method below returns the highest
  // hero id + 1.
  genId(heroes: Hero[]): number {
    return heroes.length > 0 ? Math.max(...heroes.map(hero => hero.id)) + 1 : 1;
  }
}

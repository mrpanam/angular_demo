import {Component, OnInit} from '@angular/core';
import {Hero} from '../hero';
import {HeroService} from '../hero.service';
import {MessageService} from '../message.service';
import {BehaviorSubject, Observable, Subject} from 'rxjs';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {
  heroes$: Observable<Hero[]>;
  heroes: Hero[];
  selectedHero: Hero;
  //private searchTerms = new Subject<string>();
  private searchTerms2 = new BehaviorSubject('')
  constructor(private heroService: HeroService) {
  }

  ngOnInit(): void {
      this.heroes$ = this.searchTerms2.pipe(
        // wait 300ms after each keystroke before considering the term
        debounceTime(300),
        //startWith(''), // <-- start your pipe with an empty string

        // ignore new term if same as previous term
        distinctUntilChanged(),

        // switch to new search observable each time the term changes
        switchMap((term: string) => this.heroService.searchHeroes(term)),
      );


    }

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms2.next(term);

  }

  getHeroes(): void {
    this.heroService.getHeroes()
      .subscribe(heroes => this.heroes = heroes);

  }

  add(name: string): void {
    name = name.trim();
    if (!name) {
      return;
    }
    this.heroService.addHero({name} as Hero)
      .subscribe(hero => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroes = this.heroes.filter(h => h !== hero);
    this.heroService.deleteHero(hero).subscribe();
  }




}

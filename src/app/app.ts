import { Component, signal } from '@angular/core';
import { Tables } from './tables/tables';
// import { Use } from './use/use'; Use
// import{ DataTypes} from './data-types/data-types';




@Component({
  selector: 'app-root',
  imports: [Tables],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('angular');
}

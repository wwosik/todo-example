import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myapp';

  todos = [{
    text: 'Activity 1',
  }, {
    text: 'Activity 2'
  }]
}

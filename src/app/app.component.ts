import { Component } from '@angular/core';
import { Router} from '@angular/router';
Router
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'adminLTE';
  constructor(private router: Router) {}
 
}

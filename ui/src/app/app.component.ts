import { Component } from '@angular/core';
import { UserService } from 'src/services/user-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'crowdfunding-app';

  constructor(public userService: UserService) { }
}

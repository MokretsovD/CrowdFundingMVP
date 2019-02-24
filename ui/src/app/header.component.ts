import { UserService } from '../services/user-service';
import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/generated/user';

@Component({
    // tslint:disable-next-line:component-selector
    selector: 'header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
    @Input() user: User;
    constructor(public userService: UserService) { }

    ngOnInit(): void {
    }

    logout() {
        this.userService.logout();
    }
}

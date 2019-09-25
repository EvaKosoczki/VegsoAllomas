import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-new',
  templateUrl: './users-new.component.html',
  styleUrls: ['./users-new.component.css']
})
export class UsersNewComponent implements OnInit {

  user: User = new User();
  originalName: string = '';
  replacedName: string = '';

  constructor(private userService: UserService,
    private router: Router) {

    }

  ngOnInit() {
  }
  onSubmit(ev: Event) {
    ev.preventDefault();
    this.userService.update(this.user)
      .subscribe(
        response => {
          this.router.navigateByUrl("/users");
        },
        err => {
          this.router.navigateByUrl("/users");
        })
  }
  onCancel() {
    this.router.navigateByUrl("/users");
  }

}

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-edit',
  templateUrl: './users-edit.component.html',
  styleUrls: ['./users-edit.component.css']
})
export class UsersEditComponent implements OnInit {

user: User;
userId: number = 0;

  constructor(
    private userService: UserService, private ar: ActivatedRoute, private router: Router
  ) {
    this.ar.params.forEach(
      params => {
        this.userId = params.id;
         this.userService.getOne(this.userId).subscribe(
          data => {
            this.user = data[0];
          }
          
        )
      }
    )
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

import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/model/user';
import { UserService } from 'src/app/service/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {


  allData: User[] = [];
  changeCounter: number = 0;

  constructor(
    private userService: UserService
  ) {
    this.userService.getAll().subscribe(users => this.allData = users);
  }

  ngOnInit() {
  }
  onDelete(user: User) {
    if (user.zip == null) {
      delete user.zip
    }
    user.firstName = 'deleted';
    user.lastName = 'user';
    user.email += ' deleted';
    
    this.userService.updateID(user.userId, user)
      .subscribe(
        response => {
          this.changeCounter++;
        },
        err => {
          console.error(err)
        })
  }

  toggleView(id){
    document.getElementsByClassName("passwordHidden")[id-1].classList.toggle("show");
    document.getElementsByClassName("passwordHidden")[id-1].classList.toggle("noShow");
    document.getElementsByClassName("stars")[id-1].classList.toggle("noShow");
  }

}

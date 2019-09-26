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
  onDelete(picked: User) {
    this.userService.delete(picked.userId).subscribe(
      response => {
        let index = this.allData.indexOf(picked);
        this.allData.splice(index, 1);
        this.changeCounter++;
      },
      err => console.error(err)
    )
  }

}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  dataFromServer;
  followers;
  followersArray = [];
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  search(userName) {
    this.http.get('https://api.github.com/users/' + userName.value)
      .subscribe((data) => {
        this.dataFromServer = data;
        console.log(this.dataFromServer)
      })
  }
  showAllFollowers(modalFollowers) {
    this.http.get(this.dataFromServer.followers_url)
      .subscribe((data) => {
        this.followers = data;
        for (let index = 0; index < this.followers.length; index++) {
          this.followersArray.push({ userName: this.followers[index].login, url: this.followers[index].html_url });
          modalFollowers.style.display = "block";

        }

      })
  }
  closeModal(element) {
    element.style.display = "none"
  }
}

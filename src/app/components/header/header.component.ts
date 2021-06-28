import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/guards/auth.service';
import { MENU } from 'src/app/shared/constants/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items;
  name = sessionStorage.getItem('qa_username');

  constructor(
    public auth: AuthService
  ) {
    if (JSON.parse(sessionStorage.getItem('qa_role')) == 3) {
      this.items = MENU.agent;
    } else {
      this.items = MENU.admin;
    }
  }
}

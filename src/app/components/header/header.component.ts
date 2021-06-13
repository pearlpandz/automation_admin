import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/shared/guards/auth.service';
import { MENU } from 'src/app/shared/constants/menu';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  items = MENU;
  name = sessionStorage.getItem('qa_username');

  constructor(
    public auth: AuthService
  ) { }
}

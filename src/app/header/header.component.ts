import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../service/theme.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  checked: boolean = false;

  constructor(private themeService: ThemeService) {}

  ngOnInit(): void {}

  handleChange(e: any) {
    let isChecked = e.checked;
    console.log(isChecked);
    if (isChecked) {
      this.themeService.switchTheme('lara-dark-blue');
    } else {
      this.themeService.switchTheme('lara-light-blue');
    }
  }
}

import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  search(event: Event): void {
    const target = event.target as HTMLInputElement;
    const value = target.value;

    this.search = this.search.bind(this);

  }
}

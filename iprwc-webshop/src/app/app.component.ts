import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'iprwc-webshop';

  loadedFeature = 'recipe';

  onNavigate(feature:string) {
    this.loadedFeature = feature;
  }
}

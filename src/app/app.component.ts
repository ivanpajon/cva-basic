import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  colorSelectorControl: FormControl;

  constructor() {
    this.colorSelectorControl = new FormControl();
  }

  /**
   * Habilita o deshabilita el control del ColorSelector
   */
  toggleDisableState(): void {
    // Si el control esta deshabilitado
    if (this.colorSelectorControl.disabled) {
      this.colorSelectorControl.enable();  // Se habilita
    }
    // Si está habilitado
    else {
      this.colorSelectorControl.disable();  // Se deshabilita
    }
  }
}

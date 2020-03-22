import { Component, OnInit, Optional, Self } from '@angular/core';
import { ControlValueAccessor, NgControl, FormControl } from '@angular/forms';

/** Función adaptadora para el array de colores */
const colorsType = <T extends string>(array: T[]) => array;

/** Colores admitidos por el componente */
const colors = colorsType(['red', 'green', 'blue']);

/** Modelo de colores del componente */
type ColorSelected = (typeof colors)[number];

/** Valida si un valor es de tipo ColorSelected */
const isColor = (x: any): x is ColorSelected => colors.includes(x);

@Component({
  selector: 'app-color-selector',
  templateUrl: './color-selector.component.html',
  styleUrls: ['./color-selector.component.scss']
})
export class ColorSelectorComponent implements OnInit, ControlValueAccessor {
  /** Color seleccionado */
  selection: ColorSelected;

  /** Función para actualizar el valor del CVA */
  onChanged: any;

  /** Funcion para marcar como 'touched' el CVA */
  onTouched: any;

  /** Controla si el componente está habilitado */
  disabled: boolean;

  constructor(
    @Self() @Optional() private ngControl: NgControl
  ) {
    // Si el componente se está usando como control de formulario
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    // En caso contrario se inicializan las funciones de CVA por defecto
    else {
      this.onChanged = () => null;
      this.onTouched = () => null;
    }

    // Se inicializa el color sin valor
    this.selection = null;

    // Se inicializa el control como habilitado
    this.disabled = false;
  }

  ngOnInit(): void { }

  /**
   * Limpia el valor de la selección del componente
   */
  clearSelection(): void {
    this.selection = null;
  }

  /**
   * Selecciona un color
   * @param color Color sobre el que se ha hecho click
   */
  colorSelected(color: ColorSelected): void {
    // Si se ha hecho click sobre el color que ya estaba seleccionado
    if (color === this.selection) {
      this.clearSelection();  // Deselección
    }
    // Si se ha hecho click en un color no seleccionado
    else {
      this.selection = color;  // Selección
    }

    // Se actualiza el valor del CVA si el componente está habilitado
    if (!this.disabled) {
      this.onChanged(this.selection);
      this.onTouched();
    }
  }

  /**
   * Recibe un valor desde fuera del componente (a través del CVA)
   * @param color Valor recibido desde fuera del componente
   */
  writeValue(color: any): void {
    // Si el valor recibido es un color admitido
    if (isColor(color)) {
      this.selection = color;
    }
    // En caso contrario se limpia la selección
    else if (!color) {
      this.clearSelection();
    }
  }

  /**
   * Recibe la función para emitir un cambio en el valor del CVA
   * @param fn Función a implementar
   */
  registerOnChange(fn: any): void {
    this.onChanged = fn;
  }

  /**
   * Recibe la función para emitir un cambio en el estado 'touched' del CVA
   * @param fn Función a implementar
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  /**
   * Recibe si el CVA está habilitado o no
   * @param isDisabled Estado del CVA
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

}

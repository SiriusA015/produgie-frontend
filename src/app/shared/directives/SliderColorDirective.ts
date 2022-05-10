import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[sliderColor]'
})
export class SliderColorDirective implements OnChanges {
  static sliderNumberCounter = 0;

  @Input() circleColor: number;
  @Input() sliderColor: number;
  styleElement: HTMLStyleElement = document.createElement('style');

  attributeName: string;

  constructor(private el: ElementRef) {
    this.attributeName = `slider-color-${SliderColorDirective.sliderNumberCounter}`;
    SliderColorDirective.sliderNumberCounter++;
    const nativeEl: HTMLElement = this.el.nativeElement;
    nativeEl.setAttribute(this.attributeName, '');
    nativeEl.appendChild(this.styleElement);
  }

  ngOnChanges(): void {
    this.setColors();
  }

  setColors(): void {
    this.styleElement.innerText = `
      [${this.attributeName}] .mat-slide-toggle-bar {
        background-color: ${this.sliderColor};
      }
      [${this.attributeName}] .mat-slide-toggle-thumb {
        background-color: ${this.circleColor};
      }
    `;
  }
}

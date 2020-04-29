import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-footer',
  template: `
    <footer>Copyright 2020</footer>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent {}

import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout',
  imports: [MatButtonModule, MatToolbarModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class Layout {}

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    AvatarModule, 
    ButtonModule
  ],
  templateUrl: './header.html',
})
export class HeaderComponent {
}
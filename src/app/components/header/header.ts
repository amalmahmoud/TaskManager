import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    InputTextModule, 
    IconFieldModule, 
    InputIconModule, 
    AvatarModule, 
    ButtonModule
  ],
  templateUrl: './header.html',
})
export class HeaderComponent {}
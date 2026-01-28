


import { Component } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { SideMenuComponent } from "../sidemenu/sidemenu";
import { HeaderComponent } from "../header/header";

@Component({

    selector: 'app-layout',
    templateUrl: './layout.html',
    standalone: true,
    imports: [HeaderComponent,SideMenuComponent,RouterOutlet]
})

export class LayoutComponent {
    
}
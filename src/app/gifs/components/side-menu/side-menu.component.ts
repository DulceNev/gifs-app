import {  Component } from '@angular/core';
import { GifsSideMenuHeaderComponent } from "./side-menu-header/side-menu-header.component";
import { SideMenuOptionsComponent } from "./side-menu-options/side-menu-options.component";

@Component({
  selector: 'gifs-side-menu',
  imports: [GifsSideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu.component.html',
})
export class SideMenuComponent { }

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Assets } from "../components/assets/assets";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,  Assets],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('InventoryManagementUI');
}

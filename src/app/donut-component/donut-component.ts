import { Component, OnInit, PLATFORM_ID, inject } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { ChartModule } from 'primeng/chart';



@Component({
  selector: 'app-donut-component',
 
    standalone: true,
    imports: [CommonModule,  ChartModule],
  templateUrl: './donut-component.html',
  styleUrl: './donut-component.scss',
})
export class DonutComponent {
data: any;
  options: any;

  ngOnInit() {
    this.data = {
      labels: ['In Use', 'In Repair', 'Storage'],
      datasets: [
        {
          data: [540, 325, 702],
          backgroundColor: ['#4ade80', '#fbbf24', '#60a5fa']
        }
      ]
    };

    this.options = {
      plugins: {
        legend: { labels: { color: '#495057' } }
      }
    };
  }
}
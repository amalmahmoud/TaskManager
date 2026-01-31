import { Component, input } from "@angular/core";
import { ChartOptions } from "chart.js";
import { ChartModule } from "primeng/chart";


@Component({

    selector: 'app-chart',
    templateUrl: './chart.html',
    imports: [ChartModule]
})

export class ChartComponent {
    data = input.required();
    type = input.required< "bar" | "line" | "scatter" | "bubble" | "pie" | "doughnut" | "polarArea" | "radar" | undefined>();
    options = input();
}
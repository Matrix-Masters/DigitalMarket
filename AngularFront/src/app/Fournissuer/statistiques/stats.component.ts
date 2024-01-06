import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from 'chart.js/auto';
import { ProductServiceService } from 'src/app/Service/product-service.service';
import { StatsService } from 'src/app/Service/stats-service.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private statsService: StatsService,
    private productService: ProductServiceService,
    private cdr: ChangeDetectorRef
  ) {}

  product_id: any=0;
  stats: any;
  productName:any="Product";
  chart:any =[];

  getStats() {
    this.statsService.getStats(this.product_id).subscribe(
      (res: any) => {
        this.stats = res;
        console.log(this.stats['nbCommandes'])
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  getProductById() {
    this.productService.getProductById(this.product_id).subscribe(
      (res: any) => {
        console.log(res);
        this.productName = res['name'];
        console.log(this.productName);
      },
      (error: any) => {
        console.log(error);
      }
    );
  }

  updateChart() {

   const canvas: any = document.getElementById('myChart');
   const labels :any= ['Sales','Orders']
   const data :any =[this.stats['Sales'],this.stats['Orders']]
   const  datasets = [
        {
          label: this.productName,
          data:data,
          backgroundColor: ['rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
          borderColor: ['rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
          borderWidth: 1,
        },
      ]

    // Example options
    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      barThickness: 50,
    };
    // Create a new chart
    this.chart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels:labels,
        datasets:datasets
      },
      options: options,
    });
  }

  incomeChart() {
    // Assuming you have a canvas element with id "income" in your HTML
    const canvas: any = document.getElementById('income');
    const ctx = canvas.getContext('2d');

    const income = this.stats['Income'];
    const datasets = [
      {
        label: "Total Income",
        data: [income],
        backgroundColor: ['rgba(255, 99, 132, 0.2)'],
        borderColor: ['rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ];

    const options = {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      barThickness: 50,
    };

    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['Income $'],
        datasets: datasets,
      },
      options: options,
    });
  }



  ngOnInit(): void {
    this.route.params.subscribe((params: any) => {
      this.product_id = params['id'];
    });
    this.getProductById();
    console.log(this.product_id);
    this.statsService.getStats(this.product_id).subscribe(
      (res: any) => {
        this.stats = res;
        console.log(this.stats['nbCommandes']);
        this.updateChart();
        this.incomeChart();
      },
      (error: any) => {
        console.log(error);
      }
    );

  }
}

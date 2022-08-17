
import { Component, OnInit } from '@angular/core';
import Chart from 'node_modules/chart.js';
import { AuthService } from '../auth/auth.services';
import { DataService } from '../shared/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private dataService: DataService
  ) { }
  count = [0, 0, 0, 0, 0, 0, 0];
  data: any;
  ngOnInit() {

    if (localStorage.getItem('user') === 'true') {
      this.authService.isAuth.next(true);
    }

    let start = new Date();
    start.setDate(start.getDate() - 6);

    let two = new Date();
    two.setDate(start.getDate() + 1);

    let three = new Date();
    three.setDate(start.getDate() + 2);

    let four = new Date();
    four.setDate(start.getDate() + 3);

    let five = new Date();
    five.setDate(start.getDate() + 4);

    let six = new Date();
    six.setDate(start.getDate() + 5);

    let end = new Date();

    this.getDetails(start, end,six,five,four,three,two)



  }

  renderChart() {
    let start = new Date();
    start.setDate(start.getDate() - 6);

    let two = new Date();
    two.setDate(start.getDate() + 1);

    let three = new Date();
    three.setDate(start.getDate() + 2);

    let four = new Date();
    four.setDate(start.getDate() + 3);

    let five = new Date();
    five.setDate(start.getDate() + 4);

    let six = new Date();
    six.setDate(start.getDate() + 5);

    let end = new Date();
    const data = [
      { x: start, y: this.count[0] },
      { x: two, y: this.count[1] },
      { x: three, y: this.count[2] },
      { x: four, y: this.count[3] },
      { x: five, y: this.count[4] },
      { x: six, y: this.count[5] },
      { x: end, y: this.count[6] },
    ];

    const myChart = new Chart('myChart', {
      type: 'bar',
      data: {
        labels: [
          start.toLocaleDateString(),
          two.toLocaleDateString(),
          three.toLocaleDateString(),
          four.toLocaleDateString(),
          five.toLocaleDateString(),
          six.toLocaleDateString(),
          end.toLocaleDateString(),
        ],
        datasets: [
          {
            label: 'No Of Bookings',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        scales: {
          x: {
            type: 'time',
            time: {
              unit: 'day',
            },
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  }


  getDetails(start: any, end: any,six:any,five:any,four:any,three:any,two:any) {
    this.data = this.dataService.getBookingDetails().subscribe(res => {
      res.forEach((item) => {
        const day = item.createdDate.getDate();
        if (day === end.getDate()) {
          this.count[6]++;
        }else if(day === six.getDate()){
          this.count[5]++;
        }else if(day ===  five.getDate()){
          this.count[4]++;
        }else if(day === four.getDate()){
          this.count[3]++;
        }else if(day === three.getDate()){
          this.count[2]++;
        }else if(day === two.getDate()){
          this.count[1]++;
        }else{
          this.count[0]++;
        }
      })
      this.renderChart();
    })

  }


}

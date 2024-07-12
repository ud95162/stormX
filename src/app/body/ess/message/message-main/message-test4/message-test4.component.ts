import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Event} from '../../../../../_global/event';

@Component({
  selector: 'app-message-test4',
  templateUrl: './message-test4.component.html',
  styleUrls: ['./message-test4.component.css']
})
export class MessageTest4Component implements OnInit {
  processedTodayCurrent = Event.setCurrentDateTime().processedTodayCurrent;
  processedTodayNext = Event.setCurrentDateTime().processedTodayNext;

  settings = {
    bigBanner: true,
    timePicker: true,
    format: 'dd-MM-yyyy hh:mm a',
    defaultOpen: false,
    closeOnSelect: false
  };


  @ViewChild('mycanvas', { static: false }) mycanvas!: ElementRef;
  canvas: ElementRef;
  options: any;
  doughnutChartData = [1, 2, 3, 49];
  doughnutChartLabels = ['Kavindu', 'Pruthuvi', 'WIjayanga', 'Pasindu'];
  public doughnutChartType: string = 'doughnut';


  constructor() {
  }

  ngOnInit() {
    var ctx = this.canvas.nativeElement.getContext('2d');

    let me = this;
    this.options = {
      circumference: Math.PI,
      rotation: Math.PI,
      animation: {
        onComplete: function () {
          me.doit(ctx);
        }
      }
    };
  }

  onChangeAction(e) {
    this.processedTodayNext = Event.changeNextDateTime(e);
  }

  doit(ctx) {
    //   Chart.types.Doughnut.prototype.draw.apply(this, arguments);

    var width = this.canvas.nativeElement.clientWidth,
      height = this.canvas.nativeElement.clientHeight;

    var fontSize = (height / 250).toFixed(2);
    ctx.font = fontSize + 'em Verdana';
    ctx.textBaseline = 'middle';
    ctx.fillStyle = 'blue';

    var text = 'Pass Rate 82%',
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = height - 10;

    ctx.fillText(text, textX, textY);
    ctx.restore();
  }

  chartHovered(e) {
  }

  chartClicked(e) {
  }

}

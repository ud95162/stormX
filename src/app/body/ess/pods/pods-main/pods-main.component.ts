import {Component, OnInit} from '@angular/core';
import {forkJoin, interval, Subscription} from "rxjs";
import {DatePipe} from "@angular/common";
import {EventServiceService} from "../../../../service/event-service.service";
import {Profile} from "../../../../_global/profile";
import {EventDetails, VenueDetails} from "./models/Events";
import {environment} from "../../../../../environments/environment";
import {LoginServiceService} from "../../../../service/login-service.service";
import {GeneralOps} from "../../../../utility/GeneralOps";

@Component({
  selector: 'app-pods-main',
  templateUrl: './pods-main.component.html',
  styleUrls: ['./pods-main.component.css']
})
export class PodsMainComponent implements OnInit {

  generalOps = new GeneralOps();
  currentTime: string;
  currentTimeHalf: string;
  currentDate: string;
  loggedVenueDetails: VenueDetails;
  venueDetailsLoaded: boolean = false;
  currentAndNextEventDetails: EventDetails[] = [];
  eventDetailsDataLoaded: boolean = false;
  nextAvailableSlot: EventDetails;
  nextAvailableSlotDataLoaded: boolean = false;
  allEventsForDay: EventDetails[] = [];
  allEventsForDayLoaded = true;
  allEventsDisplay = false;
  updateSubscription: Subscription;

  color: any = 'accent';
  mode: any = 'determinate';
  value = 60;

  amCore;
  amCharts;

  constructor(private datePipe: DatePipe,
              private eventService: EventServiceService,
              private loginService: LoginServiceService) {
    // @ts-ignore
    this.amCore = window.am4core;
    // @ts-ignore
    this.amCharts = window.am4charts;
    // @ts-ignore
    this.amCore.useTheme(window.am4themes_animated);
  }

  ngOnInit(): void {
    this.updateDateTime();
    // Periodically updates date and time while checking authentication status
    this.updateSubscription = interval(60000).subscribe(() => {
      this.updateDateTime();
      this.checkAuthenticated();
    });
    this.getDailyData();
    this.getLoggedPodDetails();
  }

  /**
   *  defines a function  getDailyData()  that fetches various event-related data for a selected venue
   *  and updates the component's properties accordingly.
   */
  getDailyData() {
    const currentAndNext = this.eventService.getSelectedVenueCurrentAndNextEvents(Profile.EMPLOYEE_FULL_NAME);
    const nextAvailable = this.eventService.getNextAvailableSlotInSelectedVenue(Profile.EMPLOYEE_FULL_NAME);
    const allEvents = this.eventService.getAllEventsForDayInSelectedVenue( Profile.EMPLOYEE_FULL_NAME );

    forkJoin([currentAndNext, nextAvailable, allEvents])
      .subscribe((result: any) => {
        this.nextAvailableSlot = result[1];
        this.currentAndNextEventDetails = result[0];
        this.allEventsForDay = result[2];
        this.setChartData();
        this.eventDetailsDataLoaded = true;
      })
  }

  /**
   * defines a method called  checkAuthenticated  which makes use of  loginService  to check the token status.
   * If the token status indicates that the user is not authenticated,
   * it redirects the user to the login page. Otherwise, it proceeds to call the  getDailyData  method
   */
  checkAuthenticated() {
    this.loginService.checkTokenStatus()
      .subscribe(
        (data: any) => {
          if (data[0].authenticated === false) {
            window.location.replace(environment.LOGIN_URL);
          } else {
            this.getDailyData();
          }
        }
      );
  }

  /**
   *  defines a function called setChartData, which checks if there is remaining time for a current event.
   *  Depending on the remaining time,
   *  it sets color codes and slice values for a chart and then calls another function
   *  to create the chart after a delay of 1 second
   */
  setChartData() {
    if (this.currentAndNextEventDetails[0].remainingTime !== null) {
      let graphId = 'currentMeetingRemainingTimeGraph';
      // this.currentAndNextEventDetails[0].startTime !== null ? graphId = 'currentMeetingRemainingTimeGraph' : graphId = 'availableRemainingTimeGraph';
      const remainingTime = this.currentAndNextEventDetails[0].remainingTime;

      let colorCodes: string[];
      let firstSliceValue: number;
      let secondSliceValue: number;
      if (remainingTime === '60+') {
        colorCodes = [  '#198746', '#ffffff'];
        firstSliceValue = 0;
        secondSliceValue = 100;
      } else if ( parseInt(remainingTime, 10) > 15 && parseInt(remainingTime, 10) <= 60) {
        colorCodes = [];
        colorCodes = [  '#ffffff', '#2BB968'];
        firstSliceValue = 60 - parseInt(remainingTime, 10);
        secondSliceValue = parseInt(remainingTime, 10);
      } else {
        colorCodes = [];
        colorCodes = ['#ffffff','#FF8585'];
        firstSliceValue = 60 - parseInt(remainingTime, 10);
        secondSliceValue = parseInt(remainingTime, 10);
      }

      setTimeout(() => {
        this.createChart(graphId, colorCodes, remainingTime, firstSliceValue, secondSliceValue);
      }, 1000);
    }
  }


  createChart(graphId: string, colorCodes: string[], remainingTime: any, firstSliceValue: number, secondSliceValue: number) {

    // initializes a pie chart using the AmCharts library and sets its inner radius to 50%.
    // Disables the tooltip for the chart.
    const chart = this.amCore.create(graphId, this.amCharts.PieChart);
    chart.innerRadius = this.amCore.percent(50);
    chart.tooltip.disabled = true;

    //Creates a label at the center of the chart with specified text properties and color based on the  remainingTime  value.
    // If  remainingTime  is 1, it displays "min" else "mins".
    const label = chart.seriesContainer.createChild(this.amCore.Label);
    label.horizontalCenter = "middle";
    label.verticalCenter = "middle";
    label.fill = this.amCore.color("#edffed");
    label.textAlign = "middle"; // Align text to the center horizontally
    if (remainingTime === 1) {
      label.adapter.add("text", (text, target) => {
        return `[bold font-size:28px]${remainingTime}[/]\n[font-size:18px] min [/]`;
      });
    } else {
      label.adapter.add("text", (text, target) => {
        return `[bold font-size:28px]${remainingTime}[/]\n[font-size:18px] mins [/]`;
      });
    }

    // Adds a PieSeries to the chart and configures its data fields for value and category.
    // Sets properties for the pie slices such as stroke width, inner radius, fill opacity, and disables tooltips for the slices.
    // Configures the pie series to use colors specified in the  colorCodes  array for each slice.
    // Defines the data for the pie chart with values for the first and second slices, along with additional properties like corner radius and fill opacity.
    // Adjusts the hover properties for the pie slices to prevent shifting and scaling on hover.
    const pieSeries = chart.series.push(new this.amCharts.PieSeries());
    pieSeries.dataFields.value = "value";
    pieSeries.dataFields.category = "category";
    pieSeries.slices.template.strokeWidth = 0;
    pieSeries.innerRadius = 10;
    pieSeries.slices.template.fillOpacity = 0.3;
    pieSeries.tooltip.disabled = true;
    pieSeries.slices.template.propertyFields.disabled = "labelDisabled";
    pieSeries.labels.template.propertyFields.disabled = "labelDisabled";
    pieSeries.ticks.template.propertyFields.disabled = "labelDisabled";

    colorCodes.forEach(color => {
      pieSeries.colors.list.push(this.amCore.color(color));
    });

    pieSeries.data = [
      { "category": "First", "value": firstSliceValue, "cornerRadius": 40, "fillOpacity": 0.5 },
      { "category": "Unused", "value": secondSliceValue }
    ];

    pieSeries.slices.template.states.getKey("hover").properties.shiftRadius = 0;
    pieSeries.slices.template.states.getKey("hover").properties.scale = 1;
  }

  getLoggedPodDetails() {
    this.eventService.getSelectedPodDetailsByName(Profile.EMPLOYEE_FULL_NAME)
      .subscribe((data: any) => {
        this.loggedVenueDetails = data;
        this.venueDetailsLoaded = true;
      })
  }

  // Unsubscribes from the update subscription on component destruction
  ngOnDestroy() {
    this.updateSubscription.unsubscribe();
  }

  // This function updates the current time and date values using Angular's DatePipe.
  updateDateTime() {
    const now = new Date();
    const currentTime = this.datePipe.transform(now, 'h:mm a');
    const timeArray = currentTime.split(' ');
    this.currentTime = timeArray[0];
    this.currentTimeHalf = timeArray[1].toUpperCase();
    this.currentDate = this.datePipe.transform(now, 'EEEE, MMM d, y');
  }


  checkVenueFacility(facility: string) {
    return this.loggedVenueDetails.facilities.find( a => a.type === facility);
  }

  /**
   * performs the following actions:
   * 1. Sets the value of  allEventsDisplay  to true.
   * 2. Adds the CSS class "open" to the element with the id "sidebar".
   * 3. Adds the CSS class "open" to the element with the id "backdrop".
   */
  openSidebar() {
    this.allEventsDisplay = true;
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("backdrop").classList.add("open");
  }

  /**
   * performs the following actions:
   * 1. Sets the value of  allEventsDisplay  to false.
   * 2. Remove the CSS class "open" to the element with the id "sidebar".
   * 3. Remove the CSS class "open" to the element with the id "backdrop".
   */
  closeSidebar() {
    this.allEventsDisplay = false;
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("backdrop").classList.remove("open");
  }
}

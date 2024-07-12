import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-message-test',
  templateUrl: './message-test.component.html',
  styleUrls: ['./message-test.component.css']
})
export class MessageTestComponent implements OnInit {

  notification;
  notificationbody;

  inputText = 'Initial value';
  htmlContent = 'Congratulations, We are happy to inform you that you have being selected for the next level of our interview process. We have scheduled you for a Technical Interview with Pasindu Senevirathne. Please find the details of the schedule as follows;\\r\\n<br><br>\\r\\nDate : 2018-12-04\\r\\n<br>\\r\\nTime : 12:00 - 13:00\\r\\n<br>\\r\\nLocation : Bay 1 - Hedges Meeting Pod\\r\\n<br><br>\\r\\nExam Coordinator : Shenika Herath \\r\\n<br><br>\\r\\nPlease contact Shenika Herath on 077777777 or email her at shenika@codegen.co.uk for any assistance.\\r\\n<br><br>\\r\\nWish you all the Best\\r\\n<br><br>\\r\\nHR Team';

  constructor() {
  }

  ngOnInit() {
  }

  showButtonValue() {
  }
}

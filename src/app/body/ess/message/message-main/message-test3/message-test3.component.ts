import {Component, OnInit} from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-message-test3',
  templateUrl: './message-test3.component.html',
  styleUrls: ['./message-test3.component.css']
})
export class MessageTest3Component implements OnInit {
  todo = [];

  done = [
    'Get up',
    'Brush teeth',
    'Take a shower',
    'Check e-mail',
    'Walk dog',
    'Get to work',
    'Pick up groceries',
    'Go home',
    'Fall asleep'
  ];

  constructor() {
  }

  ngOnInit() {
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
    // console.log(this.todo);
    // console.log(this.done);
  }

}

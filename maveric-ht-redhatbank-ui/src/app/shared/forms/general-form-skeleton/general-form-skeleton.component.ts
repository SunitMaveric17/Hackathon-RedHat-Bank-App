import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-general-form-skeleton',
  templateUrl: './general-form-skeleton.component.html',
  styleUrls: ['./general-form-skeleton.component.css'],
})
export class GeneralFormSkeletonComponent {
  constructor() {}
  @Input() heading!: string;
  @Output() cancelButtonClicked = new EventEmitter<Event>();

  onCancel() {
    console.log('send event for cancel button event');
    this.cancelButtonClicked.emit('something' as unknown as Event);
  }
}

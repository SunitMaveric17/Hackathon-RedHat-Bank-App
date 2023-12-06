import { Component, Input } from '@angular/core';
import { DialogData } from 'src/app/models/dialog-data.model';

@Component({
  selector: 'app-dialog-skeleton',
  templateUrl: './dialog-skeleton.component.html',
  styleUrls: ['./dialog-skeleton.component.css'],
})
export class DialogSkeletonComponent {
  @Input() dialogData!: DialogData;

  ngOnInit() {
    console.log(this.dialogData.message);
  }
}

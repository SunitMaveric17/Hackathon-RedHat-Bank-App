import { Component, Input } from '@angular/core';
import { DialogData } from 'src/app/models/dialog-data.model';

@Component({
  selector: 'app-dialog-error-skeleton',
  templateUrl: './dialog-error-skeleton.component.html',
  styleUrls: ['./dialog-error-skeleton.component.css']
})
export class DialogErrorSkeletonComponent {
  @Input() dialogData!: DialogData;

  ngOnInit() {
    console.log(this.dialogData.message);
  }
}

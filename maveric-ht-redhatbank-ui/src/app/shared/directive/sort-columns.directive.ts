import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';
import { Sort } from '../util/sort';

@Directive({
  selector: '[appSortColumns]',
})
export class SortColumnsDirective {
  @Input() appSort!: Array<any>;
  constructor(private renderer: Renderer2, private targetElem: ElementRef) {}
  @HostListener('click')
  sortData() {
    // Create object of Sort Class
    const sort = new Sort();
    // Get Reference of current clicked Element
    const elem = this.targetElem.nativeElement;
    // Get In Which Order List should be sorted by default it should be set to desc on element attribute
    const order = elem.getAttribute('data-order');
    // Get The Property Type specially set [data-type=date] if it is date field
    const type = elem.getAttribute('data-type');
    // Get The Property Name from Element Attribute
    const property = elem.getAttribute('data-name');
    if (order === 'desc') {
      console.log('sorting descending');
      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute('data-order', 'asc');
    } else {
      console.log('sorting ascending');

      this.appSort.sort(sort.startSort(property, order, type));
      elem.setAttribute('data-order', 'desc');
    }
  }
}

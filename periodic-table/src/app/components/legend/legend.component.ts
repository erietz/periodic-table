import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss']
})
export class LegendComponent implements OnInit {
  @Input() groups: string[] = [];
  @Input() palette: {[index: string]: string} = {};

  constructor() { }

  ngOnInit(): void {
  }

}

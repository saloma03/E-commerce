import { Component, OnInit } from '@angular/core';
import { FlowbiteService } from '../../core/services/flowbite.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit{
  constructor(private _FlowbiteService:FlowbiteService){

  }

  ngOnInit(): void {
    this._FlowbiteService.loadFlowbite((flow)=>{})

  }
}

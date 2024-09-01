import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CartService } from '../../core/services/cart.service';
import { OrderService } from '../../core/services/order.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.scss'
})
export class OrdersComponent implements OnInit{
  isLoading:boolean = false;
  cartId: string|null = "";

  private readonly _FormBuilder = inject(FormBuilder);
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrderService = inject(OrderService)

  ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe({
        next:(p)=>{
          this.cartId = p.get('id');
        }
      })
  }

  addressForm:FormGroup = this._FormBuilder.group({
    details : [null,Validators.required],
    phone:[null,Validators.pattern(/^01[0125][0-9]{8}$/)],
    city : [null,Validators.required],

  })

  checkOut():void{
    this.isLoading = true;
    this._OrderService.checkout( this.cartId , this.addressForm.value).pipe(
      finalize(() => {
        this.isLoading = false;
      })
    ).subscribe({
      next:(res)=>{
        this.isLoading = false;
        console.log(res);
        if(res.status == "success"){
          window.open(res.session.url , '_self');
        }
      }
    })
  }
}

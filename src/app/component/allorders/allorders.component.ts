import { Component, inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../core/services/authentication.service';
import { OrderService } from '../../core/services/order.service';
import { User } from '../../core/interfaces/user';
import { CurrencyPipe } from '@angular/common';
import {Iorder} from '../../core/interfaces/iorder';
@Component({
  selector: 'app-allorders',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './allorders.component.html',
  styleUrl: './allorders.component.scss'
})
export class AllordersComponent implements OnInit{
  private readonly _AuthenticationService= inject(AuthenticationService);
  private readonly _OrderService= inject(OrderService);
  orderedProducts: Iorder[] = [];
  userId!: User;

  ngOnInit(): void {
    const savedUserData = this._AuthenticationService.saveUserData();

    if (savedUserData && savedUserData.id) {
      this.userId = savedUserData;

      this._OrderService.getUserOrders(this.userId.id).subscribe({
        next: (res) => {
          console.log(res);
          this.orderedProducts = res;
          console.log(this.orderedProducts);
        },
        error: (err) => {
          console.error("Error fetching orders: ", err);
        }
      });
    } else {
      console.error("No user data found or user data is invalid");
    }
  }


}

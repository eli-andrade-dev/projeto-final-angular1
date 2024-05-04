import { Component, Input, Output, EventEmitter } from '@angular/core';


interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent {
  @Input() products: Product[] = []; 
  @Output() filteredProductsChange = new EventEmitter<Product[]>(); 
  searchText: string = '';

  constructor() { }

  searchProducts(): void {
    const filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    this.filteredProductsChange.emit(filteredProducts); 
  }

  clearSearch(): void {
    this.searchText = '';
    this.searchProducts(); 
  }

  
}

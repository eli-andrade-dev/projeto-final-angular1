import { Component, OnInit } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  products: Product[] = [];
  newProduct: Product = { id: 0, name: '', price: 0, quantity: 0 };
  editingProduct: Product | null = null;
  searchTerm: string = '';
  filteredProducts: Product[] = [];
  searchText: string = '';

  onFilteredProductsChange(filteredProducts: Product[]): void {
    this.filteredProducts = filteredProducts;
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter(product => product.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  clearSearch(): void {
    this.searchTerm = '';
    this.filteredProducts = this.products;
  }

  searchTextChanged(): void {
    this.searchProducts();
  }


  constructor() { }

ngOnInit(): void {
    
  this.products = [
    { id: 1, name: 'Caderno', price: 14.99, quantity: 15 },
    { id: 2, name: 'Caneta', price: 20.99, quantity: 10 },
    { id: 3, name: 'Mochila', price: 30.99, quantity: 15 },
  ];
  
  const storedProducts = localStorage.getItem('products');
  if (storedProducts) {
    this.products = JSON.parse(storedProducts);
    this.filteredProducts = this.products; 
  }

}

addProduct(): void {
  console.log("Adicionando produto:", this.newProduct);
  if (this.newProduct.name && this.newProduct.price && this.newProduct.quantity) {
    this.newProduct.id = this.products.length + 1;
    this.products.push({...this.newProduct});
    this.newProduct = { id: 0, name: '', price: 0, quantity: 0 };
    
  }

  localStorage.setItem('products', JSON.stringify(this.products));
}
  
editProduct(product: Product): void {
  this.editingProduct = {...product};
  
}

updateProduct(): void {
  const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
  if (index !== -1) {
    this.products[index] = {...this.editingProduct!};
    this.editingProduct = null;
    localStorage.setItem('products', JSON.stringify(this.products)); 
  }
}

deleteProduct(id: number): void {
   this.products = this.products.filter(p => p.id !== id);
   localStorage.setItem('products', JSON.stringify(this.products)); 
  }
}



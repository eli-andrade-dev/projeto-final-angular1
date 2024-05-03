import { Component, OnInit } from '@angular/core';

interface Product {
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
  searchText: string = '';

  constructor() { }

  ngOnInit(): void {
    
    this.products = [
      { id: 1, name: 'Caderno', price: 14.99, quantity: 15 },
      { id: 2, name: 'Caneta', price: 20.99, quantity: 10 },
      { id: 3, name: 'Mochila', price: 30.99, quantity: 15 },
    ];
  }
  getFilteredProducts(): Product[] {
    return this.products.filter(product =>
    product.name.toLowerCase().includes(this.searchText.toLowerCase())
  );
}

 addProduct(): void {
   console.log("Adicionando produto:", this.newProduct);
   if (this.newProduct.name && this.newProduct.price && this.newProduct.quantity) {
     this.newProduct.id = this.products.length + 1;
     this.products.push({...this.newProduct});
     this.newProduct = { id: 0, name: '', price: 0, quantity: 0 };
     console.log('Novo produto adicionado:', this.products); // Verificar no console se o produto está sendo adicionado corretamente
   }
 }
  


  editProduct(product: Product): void {
    this.editingProduct = product;
  }

// No método updateProduct(), você pode simplificar a lógica assim:
updateProduct(): void {
  const index = this.products.findIndex(p => p.id === this.editingProduct!.id);
  if (index !== -1) {
    this.products[index] = this.editingProduct!;
    this.editingProduct = null;
  }
}


  deleteProduct(id: number): void {
    this.products = this.products.filter(p => p.id !== id);
  }
}


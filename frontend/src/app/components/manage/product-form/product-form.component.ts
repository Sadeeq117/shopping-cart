import { ProductService } from './../../../services/product.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [FormsModule, MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss'
})
export class ProductFormComponent {

  isEdit : boolean = false;
  name !: string;
  id !: string;

  constructor(private productService : ProductService, private router : Router, private route : ActivatedRoute){}
  
  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit = true;
      this.productService.getProductById(this.id).subscribe( result => {
        if(result.data.length > 0){
          this.name = result.data[0].name;
        }else{
          console.log("Data not found with id")
        }
      }, err => {
        console.error(err);
      })
    }

  }
  addCategory(){
    console.log(this.name);
    if(this.isEdit){
      this.productService.updateProduct(this.name,this.id).subscribe( result => {
        alert("Category Updated successfully")
        this.router.navigateByUrl("admin/products")      
      })

    }else{
      this.productService.addProduct(this.name).subscribe( result => {
        alert("Category added successfully")
        this.router.navigateByUrl("admin/products")      
      })
    }
  }

}

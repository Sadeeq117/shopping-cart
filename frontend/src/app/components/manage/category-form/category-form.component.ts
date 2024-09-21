import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CategoryService } from '../../../services/category.service';
import { Router,ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-category-form',
  standalone: true,
  imports: [FormsModule, MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './category-form.component.html',
  styleUrl: './category-form.component.scss'
})
export class CategoryFormComponent {
  isEdit : boolean = false;
  name !: string;
  id !: string;

  constructor(private categoryService : CategoryService, private router : Router, private route : ActivatedRoute){}
  
  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit = true;
      this.categoryService.getCategoryById(this.id).subscribe( result => {
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
      this.categoryService.updateCategory(this.name,this.id).subscribe( result => {
        alert("Category Updated successfully")
        this.router.navigateByUrl("admin/categories")      
      })

    }else{
      this.categoryService.addCategory(this.name).subscribe( result => {
        alert("Category added successfully")
        this.router.navigateByUrl("admin/categories")      
      })
    }
  }

}


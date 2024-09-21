import { BrandService } from './../../../services/brand.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-brands-form',
  standalone: true,
  imports: [FormsModule, MatInputModule,MatButtonModule,CommonModule],
  templateUrl: './brands-form.component.html',
  styleUrl: './brands-form.component.scss'
})
export class BrandsFormComponent {

  isEdit : boolean = false;
  name !: string;
  id !: string;

  constructor(private brandService : BrandService, private router : Router, private route : ActivatedRoute){}
  
  ngOnInit(){
    this.id = this.route.snapshot.params["id"];
    if(this.id){
      this.isEdit = true;
      this.brandService.getBrandById(this.id).subscribe( result => {
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
  addBrand(){
    console.log(this.name);
    if(this.isEdit){
      this.brandService.updateBrand(this.name,this.id).subscribe( result => {
        alert("Brand Updated successfully")
        this.router.navigateByUrl("admin/brands")      
      })

    }else{
      this.brandService.addBrand(this.name).subscribe( result => {
        alert("Brand added successfully")
        this.router.navigateByUrl("admin/brands")      
      })
    }
  }


}

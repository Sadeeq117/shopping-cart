import { ProductService } from './../../../services/product.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  ReactiveFormsModule,
  Validators,
  FormArray,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { CategoryService } from '../../../services/category.service';
import { BrandService } from '../../../services/brand.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    CommonModule,
    MatSelectModule,
  ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.scss',
})
export class ProductFormComponent {
  productForm!: FormGroup;
  isEdit: boolean = false;
  name!: string;
  id!: string;
  brands: any[] = [];
  categories: any[] = [];

  constructor(
    private fromBuilder: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute,
    private brandService: BrandService,
    private categoryService: CategoryService
  ) {}

  ngOnInit() {
    this.productForm = this.fromBuilder.group({
      name: [null, [Validators.required, Validators.minLength(5)]],
      shortDescription: [null, [Validators.required, Validators.minLength(10)]],
      description: [null, [Validators.required, Validators.minLength(50)]],
      price: [null, [Validators.required]],
      discount: [null],
      images: this.fromBuilder.array([]),
      categoryId: [null, [Validators.required]],
      brandId: [null, [Validators.required]],
    });

    this.addImages();

    this.categoryService.getCategories().subscribe((result) => {
      if (result.data.length > 0) {
        this.categories = result.data;
      }
    });

    this.brandService.getBrands().subscribe((result) => {
      if (result.data.length > 0) {
        this.brands = result.data;
      }
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.isEdit = true;
      this.productService.getProductById(this.id).subscribe(
        (result) => {
          console.log(result)
          if (result.data.length > 0) {
            this.productForm.patchValue(result.data[0] as any)
          } else {
            console.log('Data not found with id');
          }
        },
        (err) => {
          console.error(err);
        }
      );
    }
  }
  addCategory() {
    let value = this.productForm.value;
    console.log(value);
    if (this.isEdit) {
      this.productService
        .updateProduct(value, this.id)
        .subscribe((result) => {
          alert('Product Updated successfully');
          this.router.navigateByUrl('admin/products');
        });
    } else {
      this.productService.addProduct(value).subscribe((result) => {
        alert('Product added successfully');
        this.router.navigateByUrl('admin/products');
      });
    }
  }
  addImages() {
    this.images.push(this.fromBuilder.control(null));
  }
  removeImage() {
    this.images.removeAt(this.images.controls.length - 1);
  }
  get images() {
    return this.productForm.get('images') as FormArray;
  }
}

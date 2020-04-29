import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ProductService } from 'src/app/product/product.service';
import gql from 'graphql-tag';

export type ProductInput = {
  user: string;
  name: string;
  description: string;
  price: number;
};

export const CREATE_PRODUCT = gql`
  mutation createProductMutation($data: ProductInput!) {
    createProduct(data: $data) {
      name
      description
    }
  }
`;

@Component({
  selector: 'app-add-product',
  template: `
    <h2>Add Product</h2>
    <form [formGroup]="form">
      <div class="form-group">
        <label for="name"></label>
        <input
          type="text"
          class="form-control"
          id="name"
          aria-describedby="name"
          placeholder="Product name"
          formControlName="name"
        />
      </div>
      <div class="form-group">
        <label for="description"></label>
        <textarea
          name="description"
          cols="30"
          rows="10"
          id="description"
          placeholder="Add product description"
          formControlName="description"
        ></textarea>
      </div>
      <div class="form-group">
        <label for="price"></label>
        <input
          type="text"
          id="price"
          class="form-control"
          aria-describedby="price"
          placeholder="Add product price"
          formControlName="price"
        />
      </div>
      <button type="button" class="btn btn-primary" (click)="addProduct()">
        Add Product
      </button>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent {
  form: FormGroup;
  @Output() productAdded = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.form = this.fb.group({
      name: [''],
      description: [''],
      price: [''],
      user: ['5ea34f71313f9b970b5f289c']
    });
  }

  addProduct() {
    const data: ProductInput = this.mapFormValue(this.form.value);
    this.productService.addProduct(CREATE_PRODUCT, data).subscribe(res => {
      this.productAdded.emit(true);
      this.form.patchValue({ name: '', description: '', price: '' });
    });
  }

  mapFormValue(formValue): ProductInput {
    return {
      name: formValue.name,
      description: formValue.description,
      user: formValue.user,
      price: parseInt(formValue.price, 10)
    };
  }
}

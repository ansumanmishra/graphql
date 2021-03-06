import {
  Component,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  ChangeDetectorRef,
  Input,
  SimpleChanges,
  OnInit,
  OnChanges
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from 'src/app/product/product.service';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export type ProductInput = {
  user: string;
  name: string;
  description: string;
  price: number;
  image: HTMLImageElement;
};

export const CREATE_PRODUCT = gql`
  mutation createProductMutation($data: ProductInput!) {
    createProduct(data: $data) {
      name
      description
    }
  }
`;

const EDIT_PRODUCT = gql`
  mutation editProductMutation($data: ProductInput!, $id: ID!) {
    editProduct(data: $data, id: $id) {
      name
      description
    }
  }
`;

@Component({
  selector: 'app-add-product',
  template: `
    <h2>Add Product</h2>
    <h6 *ngFor="let error of errors">{{ error }}</h6>
    <form [formGroup]="form" (ngSubmit)="addProduct()">
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
        <span
          class="text-danger"
          *ngIf="formNames.name.touched && formNames.name.errors?.required"
        >
          Name is required
        </span>
      </div>
      <div class="form-group">
        <label for="image"></label>
        <input
          type="file"
          name="image"
          id="image"
          (change)="imageUpload($event)"
        />
        <img
          src="http://localhost:3000/images/{{ form.get('image').value }}"
          alt=""
          width="50"
          height="50"
        />
      </div>
      <div class="form-group">
        <label for="description"></label>
        <textarea
          name="description"
          cols="60"
          rows="5"
          id="description"
          placeholder="Add product description"
          formControlName="description"
          minlength="5"
        ></textarea>
        <span
          class="text-danger"
          *ngIf="
            formNames.description.touched &&
            formNames.description.errors?.required
          "
        >
          Description is required
        </span>
        <span
          class="text-danger"
          *ngIf="
            formNames.description.touched &&
            formNames.description.errors?.minlength
          "
        >
          Description should be atleast 25 characters
        </span>
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
        <span
          class="text-danger"
          *ngIf="formNames.price.touched && formNames.price.errors?.required"
        >
          Price is required
        </span>
      </div>
      <button type="button" class="btn btn-primary" (click)="addProduct()">
        Add Product
      </button>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddProductComponent implements OnChanges {
  errors: string[];
  form: FormGroup;
  @Input() productData;
  @Output() productAdded = new EventEmitter<boolean>();

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private cd: ChangeDetectorRef
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(5)]],
      price: ['', [Validators.required]],
      user: ['5ea34f71313f9b970b5f289c', [Validators.required]],
      image: ['']
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    if (
      changes.productData.previousValue !== changes.productData.currentValue
    ) {
      this.form.setValue({
        name: this.productData.name,
        description: this.productData.description,
        price: this.productData.price,
        user: this.productData.user.id,
        image: this.productData.image
      });
    }
  }

  get formNames() {
    return {
      name: this.form.get('name'),
      description: this.form.get('description'),
      price: this.form.get('price')
    };
  }

  imageUpload(event) {
    const file = event.target.files[0];
    this.form.patchValue({
      image: file
    });
    console.log(this.form.value);
  }

  addProduct() {
    if (!this.form.valid) {
      return;
    }
    const query = this.productData.id ? EDIT_PRODUCT : CREATE_PRODUCT;
    const data: ProductInput = this.mapFormValue(this.form.value);
    this.productService.addProduct(query, data, this.productData.id).subscribe(
      res => {
        this.productAdded.emit(true);
        this.form.patchValue({
          name: '',
          description: '',
          price: '',
          image: ''
        });
        this.productData = [];
      },
      err => {
        this.errors = this.parseServrError(err.errors);
        this.cd.detectChanges();
      }
    );
  }

  parseServrError(errors: any) {
    if (!errors || errors.length < 1) {
      return;
    }
    return errors.map(err => err.message);
  }

  mapFormValue(formValue): ProductInput {
    return {
      name: formValue.name,
      description: formValue.description,
      user: formValue.user,
      price: parseInt(formValue.price, 10),
      image: formValue.image
    };
  }
}

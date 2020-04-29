import { Component, ChangeDetectionStrategy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  template: `
    <form>
      <div class="form-group">
        <label for="exampleInputEmail1">Username</label>
        <input
          type="text"
          class="form-control"
          aria-describedby="username"
          placeholder="Username email"
        />
      </div>
      <div class="form-group">
        <label for="exampleInputPassword1">Password</label>
        <input
          type="password"
          class="form-control"
          id="exampleInputPassword1"
          placeholder="Password"
        />
      </div>
      <button type="button" class="btn btn-primary" (click)="login()">
        Login
      </button>
    </form>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {
  constructor(private router: Router, private route: ActivatedRoute) {}

  login() {
    this.router.navigate(['manage-products'], { relativeTo: this.route });
  }
}

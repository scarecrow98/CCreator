import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public email: string = '';
  public password: string = '';

  constructor(private accountService: AccountService, private router: Router) { }

  ngOnInit() {
  }

  login(): void {
    if (this.email == '' || this.password == '') {
      return;
    }

    this.accountService.login(this.email, this.password).subscribe(resp => {
      if (resp.status == true) {
        const token = resp.data.token;
        localStorage.setItem('jwt-token', token);
        this.router.navigate(['/dashboard']);
      } else {
        alert('Sikertelen bejelentkezés');
      }
    });
  }

}

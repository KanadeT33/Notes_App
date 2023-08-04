import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';
import { GlobalService } from 'src/global.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
constructor(private noteService:NotesService, private authservice:AuthService, private globalService:GlobalService,private router: Router,){}


logUserForm= new FormGroup({
  name: new FormControl('', Validators.required),
  password: new FormControl('',Validators.required)
})

login(data: any) {
  this.authservice
    .login(data)
    .subscribe(async (result) => {
      console.log(result);
      const payload = await this.globalService.getTokenPayload();
      await this.router.navigate(['home'])
      location.reload()
    });
}

}

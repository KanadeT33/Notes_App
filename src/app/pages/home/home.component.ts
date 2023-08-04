import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { NotesService } from '../../services/notes.service';
import { NgbActiveModal, NgbModal, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateModalComponent } from '../../components/create-modal/create-modal.component';
import { AuthService } from 'src/app/services/auth.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  notes
  categories
  filteredNotes

  constructor(private noteService:NotesService, private Modal:NgbModal, private authService:AuthService, private router:Router){}
  ngOnInit(): void {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['login'])
    }
    this.getCategories()
   this.getNotes()
    
  }
  getNotes(){
     this.noteService.getUnarchivedNotes().subscribe(data=>{
      this.notes=data
      this.filteredNotes=data
    })
  }
  onCreate(){
   const reference= this.Modal.open(CreateModalComponent,)
   reference.componentInstance.isEdit=false
   reference.closed.subscribe((result)=>{
    this.getNotes()
    this.getCategories()
   })
  }
  filterEndpoint(id){
    this.noteService.filter(id).subscribe((data)=>{
      this.filteredNotes= this.notes
      const temp=data.map(x=>{return x.id})
      let array=this.notes.filter(x=>{
        return temp.includes(x.id)
          
        })
      this.filteredNotes= array
      
      
    })
  }
  getCategories(){
    this.noteService.categories().subscribe((data)=>{
      this.categories=data
      
    })
  }
  signOut(){
    this.authService.logOut() 
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/services/auth.service';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-archived',
  templateUrl: './archived.component.html',
  styleUrls: ['./archived.component.css']
})
export class ArchivedComponent implements OnInit {
  constructor(private noteService:NotesService, private Modal:NgbModal,private authService:AuthService, private router:Router){}
  notes=[]
  ngOnInit(): void {
    if (!this.authService.isSignedIn()) {
      this.router.navigate(['login'])
    }
   this.getArchivedNotes()
  }
  getArchivedNotes(){
    this.noteService.getArchivedNotes().subscribe(data=>{
      
     this.notes=data
   })
 }
}

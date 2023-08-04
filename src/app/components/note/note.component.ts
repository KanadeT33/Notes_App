import { Component, Input, OnInit } from '@angular/core';
import { NotesService } from 'src/app/services/notes.service';
import { Output, EventEmitter } from '@angular/core';
import { CreateModalComponent } from '../create-modal/create-modal.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteModalComponent } from '../delete-modal/delete-modal.component';



@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {
  @Output() statusDone = new EventEmitter<string>();
  constructor(private noteService:NotesService, private Modal:NgbModal){}
  @Input() notes:any
  ngOnInit(): void {
    
  }
  changeNoteStatus(id){
   return this.noteService.changeStatus(id).subscribe((data)=>{
     this.statusDone.emit();
   })
  }
  onEdit(){
    const reference= this.Modal.open(CreateModalComponent)
    reference.componentInstance.isEdit=true
    reference.componentInstance.note=this.notes
    reference.closed.subscribe((result)=>{
     this.statusDone.emit()
    })
  }
  openDeleteModal(){
    const reference=this.Modal.open(DeleteModalComponent)
    reference.componentInstance.note=this.notes
    reference.closed.subscribe((result)=>{
      this.statusDone.emit()
     })

  }
}

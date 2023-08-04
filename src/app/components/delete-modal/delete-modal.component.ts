import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/services/notes.service';

@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.css']
})
export class DeleteModalComponent implements OnInit {
  @Input() note
  @Output() statusDone = new EventEmitter<string>()
  constructor(private ngbModal:NgbModal, private noteService:NotesService, private activeModal: NgbActiveModal){}
  ngOnInit(): void {

  }
  deleteNotes(id){
    return this.noteService.delete(id).subscribe((data)=>{
      this.close()
    })
  }
  close(){
    this.activeModal.close('Cerrado')
  }
}

import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  NgbActiveModal,
  NgbModal,
  NgbAlertModule,
} from '@ng-bootstrap/ng-bootstrap';
import { NotesService } from 'src/app/services/notes.service';
import { GlobalService } from 'src/global.service';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css'],
})
export class CreateModalComponent implements OnInit {
  @Input() isEdit 
  @Input() note
  categories = [];
  createNoteForm = new FormGroup({
    title: new FormControl(''),
    content: new FormControl(''),
  });
  constructor(private activeModal: NgbActiveModal, private noteService:NotesService, private globalService: GlobalService) {}
  ngOnInit(): void {
    if (this.isEdit) {
      this.getCategories()
    }
  }
  getCategories(){
    this.noteService.categoriesByNoteId(this.note.id).subscribe((data)=>{
      this.categories= data.map(x=>{
        return x.name
      })
    })
  }
  addCategory(cat) {
    if (cat == '') {
      return;
    }
    this.categories.push(cat);
  }
  removeCategory(cat) {
    this.categories.forEach((item, index) => {
      if (item === cat) {
        this.categories.splice(index, 1);
      }
    });
  }
  createNote(note) {
    const { title, content } = note;
    const userId= this.globalService.getTokenPayload().id
    const finalNote = {
      noteData: { title, content, user: userId },
      categoryNames: this.categories,
    };
    this.noteService.createNote(finalNote).subscribe((data)=>{
      this.close()
    })
  }
  editNote(note){
    const {title, content}= note
    const{id}= this.note
    const editedNote={
      noteData:{
        id,
        title,
        content,
      },
      categoryNames:this.categories
    }
    this.noteService.editNote(editedNote).subscribe((data)=>{
      this.close()
    })
  }
  close(){
    this.activeModal.close('Cerrado')
  }
}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { GlobalService } from 'src/global.service';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor(
    private http:HttpClient, private global:GlobalService
  ) {}
  getUnarchivedNotes(): Observable<any>{
    return this.http.get(`${environment.API_URL}/notes/unarchived`, this.global.options);
  }
  getArchivedNotes(): Observable<any>{
    return this.http.get(`${environment.API_URL}/notes/archived`, this.global.options);
  }
  createNote(newNote):Observable <any>{
    return this.http.post(`${environment.API_URL}/notes`, newNote, this.global.options);
  }
  changeStatus(id): Observable <any>{
    return this.http.get(`${environment.API_URL}/notes/changestatus/${id}`, this.global.options)
  }
  delete(id): Observable <any>{
    return this.http.delete(`${environment.API_URL}/notes/${id}`,this.global.options)
  }
  categoriesByNoteId(id): Observable<any>{
    return this.http.get(`${environment.API_URL}/notes/categories/${id}`, this.global.options)
  }
  editNote(editedNote): Observable<any>{
    return this.http.patch(`${environment.API_URL}/notes`, editedNote, this.global.options)
  }
  filter(id):Observable<any>{
    return this.http.get(`${environment.API_URL}/notes/filter/${id}`, this.global.options)
  }
  categories(): Observable<any>{
    return this.http.get(`${environment.API_URL}/categories`, this.global.options)
  }
}

import { Injectable } from '@angular/core';
import { Collegue } from '../domain/collegue';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Input } from '@angular/core/src/metadata/directives';
import {environment} from '../../../environments/environment'
import { Subject, BehaviorSubject,Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};
//const url_server = "https://dry-crag-11536.herokuapp.com/"
//const url_server = "http://localhost:8080/"
const url_server = environment.apiUrl + "/collegues"
@Injectable()
export class CollegueService {

  subject:Subject<Collegue[]> = new BehaviorSubject([])
    
   collegues:Collegue[] = []
    constructor(private http: HttpClient) {
   }
    listerCollegues():Observable<Collegue[]> {
      this.http.get<any>(`${url_server}`).toPromise().then(cols => {
        this.collegues = []
        return cols.map(col => this.collegues.push(new Collegue(col.pseudo, col.url, col.score))
        )})
        this.subject.next(this.collegues)
      return this.subject;

    }
    sauvegarder(newCollegue:Collegue):Observable<Collegue[]> {
    // TODO sauvegarder le nouveau collègue
      let data = {"pseudo":newCollegue.nom,"url":newCollegue.url}
      this.http.post<Collegue>(`${url_server}/ajouter`,data,httpOptions).toPromise()
      this.subject.next(this.collegues)
      return this.subject.asObservable();
  }
    aimerUnCollegue(collegue:Collegue):Promise<Collegue> {

      return this.http.put<Collegue>(`${url_server}/${collegue.nom}/score`,"jaime",httpOptions)
           .toPromise()        
     }  
   
    detesterUnCollegue(collegue:Collegue):Promise<Collegue> {
      return this.http.put<Collegue>(`${url_server}/${collegue.nom}/score`,"jeDeteste",httpOptions)
      .toPromise()
   }
}


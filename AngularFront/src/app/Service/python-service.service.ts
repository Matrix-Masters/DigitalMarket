import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { port } from 'src/env';
@Injectable({
  providedIn: 'root'
})
export class PythonServiceService {
  
  constructor(private http:HttpClient){}
  
  AddPhoto(image:any){ 
      const formData = new FormData();
      formData.append('image', image);
      return this.http.post(`http://localhost:8888/PYTHON-SERVICE/api/upload`,formData);
  }

}

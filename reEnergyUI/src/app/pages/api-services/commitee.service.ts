import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { CommitteeDto } from '../model/committee.model';
import { EntityOperationResult } from '../model/Assessor.model';
@Injectable({
  providedIn: 'root'
})
export class CommiteeService {

  public apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  getCommiteeData(hospital_id: number) {
    return this.http.get<CommitteeDto>(this.apiUrl + "onsiteassessment/getCommettieDecison/" + hospital_id);
  }

  saveupdateCommetedecsion(data: CommitteeDto, hospital_id: number, savetype: number) {
    debugger
    return this.http.post<EntityOperationResult>(this.apiUrl + "onsiteassessment/saveCommetteeDescision?hospital_id=" + hospital_id + "&savetype=" + savetype, data)

  }
}

import { Injectable } from '@angular/core';
import { AssessorfeedbackDTO } from '../model/assessor_feedback.model';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class OaFeedbackService {
  public apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  saveFeedbackData(assessorfeedback: AssessorfeedbackDTO, savetype: number) {
    return this.http.post<any>(this.apiUrl + "hospitalSections/Assessorfeedback?savetype=" + savetype, assessorfeedback)
  }

  getFeedbackData(hospital_id: number) {
    return this.http.get<AssessorfeedbackDTO>(this.apiUrl + 'hospitalSections/GetAssessorfeedback/' + hospital_id)

  }
}

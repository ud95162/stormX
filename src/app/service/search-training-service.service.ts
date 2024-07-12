import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TrainingModel} from '../classes/traning-object';
import {EntitySynonym, LiaEntityValue} from '../classes/liaEntityValue';

const BASE_URL = environment.API_PATH;
const WAR = environment.API_WAR;
const SERVICE = 'lia';

@Injectable({
  providedIn: 'root'
})
export class SearchTrainingServiceService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token'
    })
  };

  constructor(private http: HttpClient) {
  }

  getIntents() {
    return this.http.get(`${BASE_URL}/${WAR}/lia/intents`);
  }

  getEntities() {
    return this.http.get(`${BASE_URL}/${WAR}/lia/entities`);
  }

  postIntent(intent: string) {
    return this.http.post(`${BASE_URL}/${WAR}/lia/intent?intentName=${intent}`, {});
  }

  postTrainingArray(tariningArray: TrainingModel[]) {
    return this.http.post(`${BASE_URL}/${WAR}/lia/training-query`, tariningArray);
  }

  getUntrainedQueries() {
    return this.http.get(`${BASE_URL}/${WAR}/lia/untrained-queries`);
  }

  deleteUntrainedQuery(id: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/lia/untrained-query?untrainedQueryId=${id}`);
  }

  // synonyms
  getSynonymModels() {
    return this.http.get(`${BASE_URL}/${WAR}/${SERVICE}/synonym-models`);
  }

  getSynonymModelsMaxOffset() {
    return this.http.get(`${BASE_URL}/${WAR}/${SERVICE}/synonym-models/maxOffset`);
  }

  getSynonymModelsByOffset(offset) {
    return this.http.get(`${BASE_URL}/${WAR}/${SERVICE}/synonym-models/offset?offset=${offset}`);
  }

  postSynonymModel(synonymsArray: EntitySynonym[]) {
    return this.http.post(`${BASE_URL}/${WAR}/${SERVICE}/synonym-model`, synonymsArray);
  }

  putSynonymModel(synonymsArray: LiaEntityValue[]) {
    return this.http.put(`${BASE_URL}/${WAR}/${SERVICE}/synonym-model`, synonymsArray);
  }

  deleteEntityValue(id: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/${SERVICE}/synonym-model?entityValueId=${id}`);
  }

  postSynonym(id: number, synonym: string) {
    return this.http.post(`${BASE_URL}/${WAR}/${SERVICE}/synonym?entityValueId=${id}`, synonym);
  }

  deleteSynonym(id: number) {
    return this.http.delete(`${BASE_URL}/${WAR}/${SERVICE}/synonym?synonymId=${id}`);
  }
}

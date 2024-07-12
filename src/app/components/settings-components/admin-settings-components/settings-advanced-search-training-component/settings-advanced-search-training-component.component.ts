// import {Component, OnInit} from '@angular/core';
// import {FormArray, FormBuilder, FormGroup, Validators} from '@angular/forms';
// import {Entity, Intent, LiaUntrainedQuery, SearchTrainingConstants as Constants, TrainingModel} from '../../../../classes/traning-object';
// import {HttpErrorResponse} from '@angular/common/http';
// import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
// import {SearchTrainingServiceService} from '../../../../service/search-training-service.service';
//
// @Component({
//   selector: 'app-settings-advanced-search-training-component',
//   templateUrl: './settings-advanced-search-training-component.component.html',
//   styleUrls: ['./settings-advanced-search-training-component.component.css']
// })
// export class SettingsAdvancedSearchTrainingComponentComponent implements OnInit {
//
//   newIntentForm: FormGroup;
//   trainingForm: FormGroup;
//   entitiesArray: FormArray;
//
//   intentList: Intent[] = [];
//   entityList: Entity[] = [];
//
//   showIntentSelect = false;
//   showEntitySelect = false;
//
//   errorCode;
//   errorType;
//   errorMessage;
//
//   trainingModel: TrainingModel;
//
//   untrainedQueriesLoaded = false;
//   untrainedQueriesList: LiaUntrainedQuery[] = [];
//   untrainedCount: number;
//   selectedUntrainedQuery: LiaUntrainedQuery;
//
//   loading = false;
//
//   snackbarMsg: string;
//   snackbarOpened = false;
//
//   constructor(
//     private formBuilder: FormBuilder,
//     private searchTrainingService: SearchTrainingServiceService,
//     private interCommunicationServiceService: InterCommunicationServiceService,
//   ) {
//   }
//
//   ngOnInit() {
//     this.loadIntentList();
//     this.loadEntitiesList();
//     this.createTrainingForm();
//     this.createIntentForm();
//     this.resetEntitySelectField();
//     this.loadUntrainedSearchQueries();
//   }
//
//   textAreaAdjust(o) {
//     (<HTMLElement>document.getElementById('trainingModelText')).style.height = (25 + o.scrollHeight) + 'px';
//   }
//
//   loadUntrainedSearchQueries() {
//     this.untrainedQueriesLoaded = false;
//     this.searchTrainingService.getUntrainedQueries().subscribe(
//       (response: LiaUntrainedQuery[]) => {
//         this.untrainedQueriesList = response;
//         this.untrainedCount = this.untrainedQueriesList.length;
//         this.untrainedQueriesLoaded = true;
//       }, (error: HttpErrorResponse) => {
//         console.log(error);
//         this.setErr(error.message);
//         this.untrainedQueriesLoaded = false;
//       }
//     );
//   }
//
//   createTrainingForm() {
//     this.trainingForm = this.formBuilder.group({
//       text: [''],
//       intent: [Constants.SELECT_OPTION_PLACEHOLDER_VALUE],
//       entities: this.formBuilder.array([this.addEntityForm()])
//     });
//
//     this.entitiesArray = this.trainingForm.get(Constants.FORM_ENTITIES_KEY) as FormArray;
//   }
//
//   addEntityForm(): FormGroup {
//     return this.formBuilder.group({
//       entity: [''],
//       value: [Constants.SELECT_OPTION_PLACEHOLDER_VALUE],
//       start: [''],
//       end: ['']
//     });
//   }
//
//   loadIntentList() {
//     this.searchTrainingService.getIntents().subscribe(
//       (res: Intent[]) => {
//         this.intentList = res;
//         if (res !== null && res.length > 0) {
//           this.showIntentSelect = true;
//         }
//       },
//       (err: HttpErrorResponse) => {
//         console.log(err);
//         this.showIntentSelect = false;
//       }
//     );
//   }
//
//   loadEntitiesList() {
//     this.searchTrainingService.getEntities().subscribe(
//       (res: Entity[]) => {
//         this.entityList = res;
//         if (res !== null && res.length > 0) {
//           this.showEntitySelect = true;
//         }
//       }, (err: HttpErrorResponse) => {
//         console.log(err);
//       }
//     );
//   }
//
//   onAddEntity() {
//     this.removeAllErrorClasses();
//     if (this.validateTextField() && this.validateIntentField() && this.validateEntitiesList()) {
//       // console.log('form valid');
//       this.entitiesArray.push(this.addEntityForm());
//       this.generateJson();
//       this.updateJson();
//     } else {
//       // console.log('form invalid');
//     }
//   }
//
//   onUpdateJson() {
//     this.removeAllErrorClasses();
//     if (this.trainingModel != null) {
//       if (this.validateLastEntityForm()) {
//         if (this.validateTextField() && this.validateIntentField() && this.validateEntitiesList()) {
//           this.generateJson();
//           this.trainingModel = this.trainingForm.value;
//           this.trimAllEntitiesFromJson();
//         }
//       } else {
//         const lenEntities = this.entitiesArray.value.length;
//         this.onRemoveEntity(lenEntities - 1);
//
//         if (this.validateTextField() && this.validateIntentField() && this.validateEntitiesList()) {
//           this.generateJson();
//           this.trainingModel = this.trainingForm.value;
//           this.trimAllEntitiesFromJson();
//         }
//       }
//     }
//   }
//
//   validateLastEntityForm(): boolean {
//     const lenEntities = this.entitiesArray.value.length;
//     return !this.isNone(this.entitiesArray.at(lenEntities - 1).value.entity);
//   }
//
//   onRemoveEntity(index: any) {
//     if (this.trainingModel != null) {
//       if (this.entitiesArray.value.length > 1) {
//         this.entitiesArray.removeAt(index);
//         this.generateJson();
//         this.trainingModel = this.trainingForm.value;
//         this.trimAllEntitiesFromJson();
//       } else {
//         this.entitiesArray.removeAt(index);
//         this.entitiesArray.push(this.addEntityForm());
//         this.trainingModel = null;
//       }
//     } else {
//       if (this.entitiesArray.length === 1) {
//         this.entitiesArray.removeAt(index);
//         this.entitiesArray.push(this.addEntityForm());
//       } else {
//       }
//     }
//   }
//
//   generateJson() {
//     const text = this.trainingForm.get('text').value;
//     this.entitiesArray.value.forEach(entity => {
//       entity.start = this.findStartIndex(text, entity.entity);
//       entity.end = this.findEndIndex(text, entity.entity);
//     });
//   }
//
//   updateJson() {
//     this.trainingModel = this.trainingForm.value;
//     this.trimAllEntitiesFromJson();
//     this.trainingModel.entities.pop();
//   }
//
//   getTrainingModel(): TrainingModel {
//     return this.trainingModel;
//   }
//
//   getTrainingModelArray() {
//     return [this.getTrainingModel()];
//   }
//
//   onIntentSelect(value) {
//     if (value === '-1') {
//       (<HTMLButtonElement>document.getElementById('openModal')).click();
//       this.resetEntitySelectField();
//     } else {
//       this.onUpdateJson();
//     }
//   }
//
//   saveTrainingDataset() {
//     this.removeAllErrorClasses();
//     if (this.trainingModel != null) {
//       if (this.submitValidation()) {
//         this.loading = true;
//         this.searchTrainingService.postTrainingArray(this.getTrainingModelArray()).subscribe(
//           (submitResponse: any) => {
//             this.loading = false;
//             console.log(submitResponse);
//             if (this.selectedUntrainedQuery !== undefined || this.selectedUntrainedQuery != null) {
//               this.updateUntrainedSearchQueries(this.trainingForm.get('text').value);
//             }
//             this.openErrorModal(21001, 'SUCCESS', 'Training Data successfully updated!');
//             this.clearAll();
//           },
//           (submitError: HttpErrorResponse) => {
//             this.loading = false;
//             this.openErrorModal(submitError.status, 'ERROR', submitError.message);
//           }
//         );
//       } else {
//         document.getElementById('trainingSubmitButton').classList.add('error');
//         this.setErr('Validation Failed');
//       }
//     } else {
//       document.getElementById('trainingModelJSON').classList.add('error');
//       setTimeout(() => document.getElementById('trainingModelJSON').classList.remove('error'), 1000);
//       this.setErr('JSON is not generated');
//     }
//   }
//
//   updateUntrainedSearchQueries(text) {
//     if (this.selectedUntrainedQuery.query === text) {
//       this.searchTrainingService.deleteUntrainedQuery(this.selectedUntrainedQuery.id).subscribe(
//         (deleteResponse: any) => {
//           console.log(deleteResponse);
//           this.selectedUntrainedQuery = null;
//           this.openSnackbar('Deleted Untrained Search Query');
//           this.loadUntrainedSearchQueries();
//         }, (deleteError: HttpErrorResponse) => {
//           console.log(deleteError);
//           this.setErr(deleteError.message);
//         }
//       );
//     }
//
//   }
//
//   onIntentSave() {
//     if (!this.newIntentForm.invalid) {
//       const newIntent: string = this.newIntentForm.get('intent').value;
//       if (!this.findMatchIntent(newIntent)) {
//         this.searchTrainingService.postIntent(newIntent).subscribe(
//           res => {
//             this.loadIntentList();
//             this.resetEntitySelectField();
//             this.newIntentForm.reset();
//             (<HTMLButtonElement>document.getElementById('dismiss')).click();
//           },
//           err => console.log(err)
//         );
//       }
//       if (this.findMatchIntent(newIntent)) {
//       }
//     } else {
//     }
//   }
//
//   findMatchIntent(_intent: string): boolean {
//     this.intentList.forEach(intent => {
//       if (intent.intent === _intent) {
//         return true;
//       }
//     });
//     return false;
//   }
//
//   createIntentForm() {
//     this.newIntentForm = this.formBuilder.group({
//       intent: ['', Validators.required]
//     });
//   }
//
//   // reset select option
//   resetEntitySelectField() {
//     this.trainingForm.get('intent').setValue('placeholder');
//   }
//
//   trimAllEntitiesFromJson() {
//     if (this.trainingModel != null) {
//       this.trainingModel.entities.forEach(value => {
//         value.entity = value.entity.trim();
//       });
//     }
//   }
//
//   onCopyToClipboard() {
//     (<HTMLTextAreaElement>document.getElementById('trainingModelJsonCopy')).style.display = 'block';
//     (<HTMLTextAreaElement>document.getElementById('trainingModelJsonCopy')).select();
//     document.execCommand('copy');
//     (<HTMLTextAreaElement>document.getElementById('trainingModelJsonCopy')).style.display = 'none';
//   }
//
//   addErrorClassToEntities() {
//     for (let i = 0; i < this.entitiesArray.length; i++) {
//       const id1 = 'modelEntityValue_' + i;
//       const id2 = 'modelEntityEntity_' + i;
//       document.getElementById(id1).classList.add('error');
//       document.getElementById(id2).classList.add('error');
//     }
//   }
//
//   // VALIDATIONS
//   submitValidation(): boolean {
//     return this.validateExceptJson() && this.validateJson();
//   }
//
//   validateExceptJson(): boolean {
//     return this.validateTextField() && this.validateIntentField() && this.validateEntityValues();
//   }
//
//   validateTextField(): boolean {
//     this.removeAllErrorClasses();
//     const text = (<HTMLTextAreaElement>document.getElementById('trainingModelText')).value;
//     console.log(this.trainingForm.get('text').value);
//     if (!this.isNone(text)) {
//       this.removeErrorClassFromText();
//       return true;
//     } else {
//       this.setErr('search text invalid');
//       document.getElementById('trainingModelText').classList.add('error');
//       return false;
//     }
//   }
//
//   validateIntentField(): boolean {
//     this.removeAllErrorClasses();
//     const _intent = this.trainingForm.get('intent').value;
//     if (this.validateSelectOption(_intent)) {
//       this.removeErrorClassFromIntent();
//       return true;
//     } else {
//       this.setErr('intent field invalid');
//       document.getElementById('trainingModelIntent').classList.add('error');
//       return false;
//     }
//   }
//
//   validateSelectOption(option: string): boolean {
//     this.removeAllErrorClasses();
//     this.test();
//     return !(option === '-1' || option === 'placeholder');
//   }
//
//   validateEntitiesList(): boolean {
//     this.removeAllErrorClasses();
//     let errCount = 0;
//
//     this.entitiesArray.value.forEach(_entity => {
//       if (!this.validateEntityEntity(_entity.entity) || !this.validateEntityValue(_entity.value)) {
//         errCount++;
//       }
//     });
//     if (errCount > 0) {
//       this.addErrorClassToEntities();
//       return false;
//     } else {
//       this.removeErrorClassFromEntities();
//       return true;
//     }
//   }
//
//   validateEntityEntity(entity: any): boolean {
//     const text: string = this.trainingForm.get('text').value.trim().toLowerCase();
//     if (!this.isNone(text)) {
//       const _entity = entity.trim().toLowerCase();
//       if (this.isNone(_entity)) {
//         return false;
//       } else {
//         if (text.includes(_entity)) {
//           if (!this.checkDuplicate(_entity)) {
//
//             return true;
//           } else {
//             this.setErr('entity is duplicated');
//             return false;
//           }
//         } else {
//           this.setErr('entity name not contain in text');
//           return false;
//         }
//       }
//     } else {
//       this.setErr('text field is empty');
//       return false;
//     }
//   }
//
//   checkDuplicate(_entity: string) {
//     let errCount = 0;
//     if (this.trainingModel) {
//       this.entitiesArray.value.forEach(entity => {
//         const existing_entity = entity.entity.toLowerCase();
//         if (existing_entity === _entity) {
//           errCount++;
//         }
//       });
//       return errCount > 1;
//     }
//   }
//
//   validateJson(): boolean {
//     return this.validateEntitiesJson() && this.validateTextJson() && this.validateIntentJson();
//   }
//
//   validateTextJson(): boolean {
//     if (this.isNone(this.trainingModel.text)) {
//       this.setErr('json text invalid');
//       return false;
//     } else {
//       return true;
//     }
//   }
//
//   validateIntentJson(): boolean {
//     if (this.validateSelectOption(this.trainingModel.intent)) {
//       return true;
//     } else {
//       this.setErr('json intent invalid');
//       return false;
//     }
//   }
//
//   validateEntitiesJson(): boolean {
//     if (this.trainingModel) {
//       let errCount = 0;
//       this.trainingModel.entities.forEach(value => {
//         if (this.isNone(value.entity) || this.isNone(value.value) || this.isNone(value.start) || this.isNone(value.end)) {
//           errCount++;
//         }
//       });
//       if (errCount > 0) {
//         this.setErr('json entities invalid');
//         return false;
//       } else {
//         return true;
//       }
//     } else {
//       this.setErr('entities are not added');
//     }
//   }
//
//   test() {
//   }
//
//   styleJson() {
//     if (this.trainingModel != null) {
//       let styledJSON = JSON.stringify(this.trainingModel);
//
//       styledJSON = styledJSON.replace(new RegExp('{', 'gi'), match => {
//         return '<div class="json-obj-block">' + match;
//       });
//
//       styledJSON = styledJSON.replace(new RegExp('\\[', 'gi'), match => {
//         return '<div class="json-arr-block">' + match;
//       });
//
//       styledJSON = styledJSON.replace(new RegExp('[}\\]]', 'gi'), match => {
//         return '<br>' + match + '</div>';
//       });
//
//       styledJSON = styledJSON.replace(new RegExp('"[a-zA-Z0-9]+":', 'gi'), match => {
//         return '<br><span class="json-key"> ' + match + '</span>';
//       });
//
//       styledJSON = styledJSON.replace(new RegExp('"[a-zA-Z0-9_ .,]+"', 'gi'), match => {
//         return '<span class="json-val-string"> ' + match + '</span>';
//       });
//
//       styledJSON = styledJSON.replace(new RegExp('\\b\\d+,?', 'gi'), match => {
//         return '<span class="json-val-number"> ' + match + '</span>';
//       });
//
//       return '<div class="no-json-padding">' + styledJSON.slice(0, -6) + '</div>';
//
//     } else {
//       return false;
//     }
//   }
//
//   getTxtBtnGreen(): string {
//     return this.trainingModel != null ? 'Add Entity' : 'Generate JSON';
//   }
//
//   openSnackbar(msg: string) {
//     this.snackbarOpened = true;
//     this.snackbarMsg = msg;
//     (<HTMLElement>document.getElementById('snackbar')).style.visibility = 'visible';
//     (<HTMLElement>document.getElementById('snackbar')).style.animation = 'fadein 0.2s, fadeout 0.5s 4.0s';
//     setTimeout(() => {
//       this.closeSnackbar();
//     }, 4500);
//   }
//
//   closeSnackbar() {
//     this.snackbarOpened = false;
//     (<HTMLElement>document.getElementById('snackbar')).style.visibility = 'hidden';
//     (<HTMLElement>document.getElementById('snackbar')).style.animation = '';
//     this.snackbarMsg = '';
//   }
//
//   openUntrainedModel() {
//     (<HTMLButtonElement>document.getElementById('openUntrainedModel')).click();
//   }
//
//   onSelectUntrainedQuery(i: number) {
//     this.selectedUntrainedQuery = this.untrainedQueriesList[i];
//     (<HTMLButtonElement>document.getElementById('dismissUntrainedModel')).click();
//     this.trainingForm.get('text').setValue(this.selectedUntrainedQuery.query);
//     this.openSnackbar('Untrained Search Query Selected');
//   }
//
//   setErr(msg: string) {
//     (<HTMLElement>document.getElementById('errMsg')).innerHTML = msg;
//     (<HTMLElement>document.getElementById('errMsg')).style.color = 'red';
//     setTimeout(() => {
//       (<HTMLElement>document.getElementById('errMsg')).innerHTML = '';
//     }, 2000);
//   }
//
//   clearAll() {
//     this.trainingForm.reset();
//     this.createTrainingForm();
//     this.resetEntitySelectField();
//     this.trainingModel = null;
//     this.loading = false;
//   }
//
//   openErrorModal(errorCode, errorType, errorMessage) {
//     this.errorCode = errorCode;
//     this.errorType = errorType;
//     this.errorMessage = errorMessage;
//     this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
//     (<HTMLInputElement>document.getElementById('modalTrigger')).click();
//   }
//
//   removeAllErrorClasses() {
//     this.removeErrorClassFromText();
//     this.removeErrorClassFromIntent();
//     this.removeErrorClassFromEntities();
//   }
//
//   removeErrorClassFromText() {
//     if (document.getElementById('trainingModelText').classList.contains('error')) {
//       document.getElementById('trainingModelText').classList.remove('error');
//     }
//   }
//
//   removeErrorClassFromIntent() {
//     if (document.getElementById('trainingModelIntent').classList.contains('error')) {
//       document.getElementById('trainingModelIntent').classList.remove('error');
//     }
//   }
//
//   removeErrorClassFromEntities() {
//     for (let i = 0; i < this.entitiesArray.length; i++) {
//       const id1 = 'modelEntityValue_' + i;
//       const id2 = 'modelEntityEntity_' + i;
//       if (document.getElementById(id1).classList.contains('error')) {
//         document.getElementById(id1).classList.remove('error');
//       }
//       if (document.getElementById(id2).classList.contains('error')) {
//         document.getElementById(id2).classList.remove('error');
//       }
//     }
//   }
//
//   // private functions
//   private findStartIndex(query: string, searchString: string): number {
//     searchString = searchString.trim();
//     query = query.toLowerCase();
//     searchString = searchString.toLowerCase();
//     this.test();
//     return query.indexOf(searchString);
//   }
//
//   private findEndIndex(query: string, searchString: string): number {
//     searchString = searchString.trim();
//     query = query.toLowerCase();
//     searchString = searchString.toLowerCase();
//     return this.findStartIndex(query, searchString) + searchString.length;
//   }
//
//   private validateEntityValue(value: any): boolean {
//     if (value === 'placeholder' || value === '-1') {
//       this.setErr('invalid select option');
//       return false;
//     }
//     this.test();
//     return true;
//   }
//
//   private validateEntityValues(): boolean {
//     if (this.trainingModel.entities.length > 0) {
//       let errCount = 0;
//       this.trainingModel.entities.forEach(value => {
//         if (!this.validateEntityValue(value.value)) {
//           errCount++;
//         }
//       });
//       if (errCount > 0) {
//         this.setErr('final object, entity list is invalid');
//         return false;
//       } else {
//         return true;
//       }
//     } else {
//       this.setErr('entity list is empty');
//       return false;
//     }
//   }
//
//   private isNone(data: any): boolean {
//     this.test();
//     return data === '' || data == null;
//   }
// }

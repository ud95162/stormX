// import {Component, OnInit} from '@angular/core';
// import {InterCommunicationServiceService} from '../../../../service/support-services/inter-communication-service.service';
// import {SearchTrainingServiceService} from '../../../../service/search-training-service.service';
// import {EntitySynonym, LiaEntityValue, LiaEntityValueSynonym} from '../../../../classes/liaEntityValue';
// import {HttpErrorResponse} from '@angular/common/http';
//
// const STRING_LENGTH_VALIDATION_LIMIT = 100;
//
// @Component({
//   selector: 'app-settings-advanced-search-synonyms-component',
//   templateUrl: './settings-advanced-search-synonyms-component.component.html',
//   styleUrls: ['./settings-advanced-search-synonyms-component.component.css']
// })
// export class SettingsAdvancedSearchSynonymsComponentComponent implements OnInit {
//
//   // synonymsModelList: EntitySynonym[];
//   synonymsModelList: LiaEntityValue[];
//   synonymsList: LiaEntityValueSynonym[] = [];
//
//   currentSynonymsModel: LiaEntityValue = {
//     value: '',
//     synonyms: this.synonymsList
//   };
//
//   value: string;
//
//   errorCode;
//   errorType;
//   errorMessage;
//
//   showScroll = false;
//   sendOffsetGET = false;
//   showFinish = false;
//
//   currentOffset = 0;
//   currentDeleteId: number;
//
//   snackbarMsg: string;
//   snackbarOpened = false;
//
//   constructor(
//     private interCommunicationServiceService: InterCommunicationServiceService,
//     private searchTrainingServiceService: SearchTrainingServiceService
//   ) {
//   }
//
//   ngOnInit() {
//     // this.loadSynonymsModelList();
//     this.loadInitialSynonymsModelList();
//   }
//
//   loadInitialSynonymsModelList() {
//     this.searchTrainingServiceService.getSynonymModelsByOffset(this.currentOffset).subscribe(
//       (response: LiaEntityValue[]) => {
//         this.synonymsModelList = response;
//         this.synonymsModelList.unshift(this.currentSynonymsModel);
//         this.showScroll = true;
//         setTimeout(() => {
//           (<HTMLElement>document.getElementById('scroll')).addEventListener('wheel', this.onScroll, true);
//         }, 10000);
//       }, (error: HttpErrorResponse) => {
//         console.log(error);
//         this.showScroll = false;
//       }
//     );
//   }
//
//   pushSynonymModelsByOffset() {
//     this.sendOffsetGET = true;
//     this.searchTrainingServiceService.getSynonymModelsMaxOffset().subscribe(
//       (maxOffsetResponse: number) => {
//         const maxOffset = maxOffsetResponse;
//         if (maxOffset > this.currentOffset) {
//           this.showFinish = false;
//           this.searchTrainingServiceService.getSynonymModelsByOffset(++this.currentOffset).subscribe(
//             (response: LiaEntityValue[]) => {
//               response.forEach(liaEntityValue => this.synonymsModelList.push(liaEntityValue));
//               if (this.currentOffset === (maxOffset - 1)) {
//                 this.showFinish = true;
//               }
//               this.sendOffsetGET = false;
//             }, (error: HttpErrorResponse) => {
//               console.log(error);
//             }
//           );
//         } else {
//           this.showFinish = true;
//         }
//       }, (maxOffsetError: HttpErrorResponse) => {
//         console.log(maxOffsetError);
//       }
//     );
//   }
//
//   onScroll(event?) {
//     const scrollDiv = $('#scroll');
//     const synonymPanel = $('#synonymPanel');
//
//     const diff = (scrollDiv.position().top + scrollDiv.outerHeight(true)) -
//       (synonymPanel.position().top + synonymPanel.outerHeight(true));
//     if (diff < -30) {
//       if (!this.sendOffsetGET) {
//         // this.pushSynonymModelsByOffset();
//         if (!this.showFinish) {
//           (<HTMLElement>document.getElementById('loadMore')).click();
//         }
//       }
//     }
//   }
//
//   onAddValue(j: number) {
//     this.setErr(j, '');
//     const id = 'valueInputField_' + j;
//     const newValue = (<HTMLInputElement>document.getElementById(id)).value;
//     if (document.getElementById(id).classList.contains('error')) {
//       document.getElementById(id).classList.remove('error');
//     }
//
//     if (!this.isNone(newValue)) {
//       if (newValue.length < STRING_LENGTH_VALIDATION_LIMIT) {
//
//         if (this.checkDuplicateValue(j, newValue)) {
//           (<HTMLInputElement>document.getElementById(id)).value = '';
//           this.setErr(j, 'value is duplicated');
//           document.getElementById(id).classList.remove('error');
//           setTimeout(() => {
//             if (document.getElementById(id).classList.contains('error')) {
//               document.getElementById(id).classList.remove('error');
//             }
//           }, 1000);
//         } else {
//           const id2 = 'synonymInputField_' + j;
//           (<HTMLInputElement>document.getElementById(id2)).focus();
//           if (this.checkDuplicateSynonym(j, newValue)) {
//           } else {
//             if (j === 0) {
//               this.synonymsModelList[j].synonyms.push(new LiaEntityValueSynonym(newValue));
//             } else if (j > 0) {
//               this.searchTrainingServiceService.postSynonym(this.synonymsModelList[j].id, newValue).subscribe(
//                 (response: any) => {
//                   this.synonymsModelList[j].synonyms.push(new LiaEntityValueSynonym(newValue));
//                 }, (error: HttpErrorResponse) => {
//                   console.log(error);
//                 }
//               );
//             }
//           }
//         }
//       } else {
//         this.setErr(j, 'value is too long');
//         // console.log('value is too long.');
//       }
//     } else {
//       this.setErr(j, 'value is empty');
//     }
//   }
//
//   onFocusSynonymsField(j: number) {
//     this.setErr(j, '');
//     const id = 'synonymInputField_' + j;
//     const id2 = 'valueInputField_' + j;
//     if (document.getElementById(id2).classList.contains('error')) {
//       document.getElementById(id2).classList.remove('error');
//     }
//     (<HTMLInputElement>document.getElementById(id)).value = '';
//     const _value: string = (<HTMLInputElement>document.getElementById(id2)).value;
//     if (this.isNone(_value)) {
//       this.setErr(j, 'value is not set');
//       document.getElementById(id2).classList.add('error');
//       (<HTMLInputElement>document.getElementById(id2)).focus();
//     } else if (_value.length < STRING_LENGTH_VALIDATION_LIMIT) {
//       if (this.checkDuplicateValue(j, _value)) {
//         this.setErr(j, 'value is duplicated');
//         document.getElementById(id2).classList.add('error');
//         (<HTMLInputElement>document.getElementById(id2)).focus();
//         return false;
//       } else {
//         // console.log('value validated');
//         // this.onAddValue(j);
//       }
//     } else {
//       this.setErr(j, 'value is too long');
//       // console.log('value is too long.');
//     }
//
//   }
//
//   checkDuplicateValue(j: number, newValue: string): boolean {
//     if (j === 0) {
//       let similarCount = 0;
//       this.synonymsModelList.forEach(value1 => {
//         if (value1.value === newValue) {
//           // if (value1.value.toLowerCase().trim() === newValue.toLowerCase().trim()) {
//           similarCount++;
//         }
//       });
//       return similarCount > 1;
//     } else if (j > 0) {
//       return false;
//     }
//   }
//
//   onAddSynonym(j: number) {
//     // console.log('on add synonym to ' + j);
//     this.setErr(j, '');
//     const id = 'synonymInputField_' + j;
//     const newSynonym = (<HTMLInputElement>document.getElementById(id)).value;
//     // console.log(newSynonym);
//     if (!this.isNone(newSynonym)) {
//       if (newSynonym.length < STRING_LENGTH_VALIDATION_LIMIT) {
//         if (!this.checkDuplicateSynonym(j, newSynonym)) {
//           if (j === 0) {
//             this.synonymsModelList[j].synonyms.push(new LiaEntityValueSynonym(newSynonym));
//           } else if (j > 0) {
//             this.synonymsModelList[j].synonyms.push(new LiaEntityValueSynonym(newSynonym));
//             this.searchTrainingServiceService.postSynonym(this.synonymsModelList[j].id, newSynonym).subscribe(
//               (res: any) => {
//                 console.log(res);
//                 console.log(this.synonymsModelList[j].synonyms);
//               }, (err: HttpErrorResponse) => {
//                 console.log(err);
//               }
//             );
//           }
//           // console.log(this.synonymsModelList[j]);
//           (<HTMLInputElement>document.getElementById(id)).value = '';
//         } else {
//           this.setErr(j, 'duplicate synonym');
//           // console.log('duplicate synonym');
//         }
//       } else {
//         this.setErr(j, 'synonym is too long');
//         // console.log('synonym is too long.');
//       }
//     }
//   }
//
//   checkDuplicateSynonym(j: number, newSynonym: string): boolean {
//     let errCount = 0;
//     let chipId = 0;
//     this.synonymsModelList[j].synonyms.forEach(_synonym => {
//       if (newSynonym === _synonym.synonym) {
//         const id = 'chip_' + j + '_' + chipId;
//         document.getElementById(id).classList.add('blink-1');
//         setTimeout(() => {
//           if (document.getElementById(id).classList.contains('blink-1')) {
//             document.getElementById(id).classList.remove('blink-1');
//           }
//         }, 1000);
//         errCount++;
//       }
//       chipId++;
//     });
//     // return false;
//     return errCount > 0;
//   }
//
//   onRemoveSynonym(j: number, i: number) {
//     if (this.checkFirstSynonym(j, i)) {
//       const id = `chip_${j}_${i}`;
//       document.getElementById(id).classList.add('error-zoom-in-out');
//       setTimeout(() => document.getElementById(id).classList.remove('error-zoom-in-out'), 3000);
//       this.setErr(j, 'cannot delete that synonym');
//     } else {
//       if (j > 0) {
//         this.searchTrainingServiceService.deleteSynonym(this.synonymsModelList[j].synonyms[i].id).subscribe(
//           (res: any) => {
//             console.log(res);
//             if (res) {
//               this.synonymsModelList[j].synonyms.splice(i, 1);
//             } else {
//               this.setErr(j, 'cannot find synonym to delete');
//             }
//           }, (err: HttpErrorResponse) => {
//             console.log(err);
//           }
//         );
//       } else {
//         this.synonymsModelList[0].synonyms.splice(i, 1);
//       }
//     }
//   }
//
//   checkFirstSynonym(modelId, synonymId): boolean {
//     return this.synonymsModelList[modelId].value === this.synonymsModelList[modelId].synonyms[synonymId].synonym;
//   }
//
//   onRemoveSynonymModel(j: number) {
//     this.currentDeleteId = j;
//     // this.confirmDelete();
//     (<HTMLButtonElement>document.getElementById('openDeleteDialog')).click();
//   }
//
//   confirmDelete() {
//     this.searchTrainingServiceService.deleteEntityValue(this.synonymsModelList[this.currentDeleteId].id).subscribe(
//       (res: boolean) => {
//         console.log(res);
//         if (res) {
//           this.synonymsModelList.splice(this.currentDeleteId, 1);
//           this.closeModel();
//           this.refresh();
//         }
//       }, (err: HttpErrorResponse) => {
//         console.log(err);
//       }
//     );
//   }
//
//   closeModel() {
//     (<HTMLButtonElement>document.getElementById('dismissDeleteDialog')).click();
//     this.currentDeleteId = undefined;
//   }
//
//   onSave(j: number) {
//     if (this.validation(j)) {
//       // console.log(this.synonymsModelList[j]);
//       if (j === 0) {
//         const postObject: EntitySynonym = this.liaEntityValueToEntitySynonym(this.synonymsModelList[j]);
//         this.showSaveLoading(j, true);
//         this.searchTrainingServiceService.postSynonymModel([postObject]).subscribe(
//           (res) => {
//             console.log(res);
//             this.showSaveLoading(j, false);
//             this.openErrorModal(21001, 'SUCCESS', '');
//             this.refresh();
//           }, (err: HttpErrorResponse) => {
//             console.log(err);
//             this.showSaveLoading(j, false);
//             this.openErrorModal(21001, 'ERROR', '');
//             this.refresh();
//           }
//         );
//
//       } else if (j > 0) {
//         const putObject: LiaEntityValue = this.synonymsModelList[j];
//         this.showSaveLoading(j, true);
//         this.searchTrainingServiceService.putSynonymModel([putObject]).subscribe(
//           (res) => {
//             console.log(res);
//             this.showSaveLoading(j, false);
//             this.openErrorModal(21001, 'SUCCESS', '');
//             this.refresh();
//           }, (err: HttpErrorResponse) => {
//             console.log(err);
//             this.showSaveLoading(j, false);
//             this.openErrorModal(21001, 'ERROR', '');
//             this.refresh();
//           }
//         );
//       }
//     }
//   }
//
//   showSaveLoading(j: number, state: boolean) {
//     if (state) {
//       (<HTMLButtonElement>document.getElementById('btn_' + j)).style.display = 'none';
//       (<HTMLImageElement>document.getElementById('loading_' + j)).style.display = 'block';
//     } else {
//       (<HTMLButtonElement>document.getElementById('btn_' + j)).style.display = 'block';
//       (<HTMLImageElement>document.getElementById('loading_' + j)).style.display = 'none';
//     }
//   }
//
//   refresh() {
//     this.currentOffset = 0;
//     this.loadInitialSynonymsModelList();
//     (<HTMLInputElement>document.getElementById('valueInputField_0')).value = '';
//     (<HTMLInputElement>document.getElementById('synonymInputField_0')).value = '';
//     this.synonymsModelList[0].synonyms = [];
//   }
//
//   liaEntityValueToEntitySynonym(liaEntityValue: LiaEntityValue): EntitySynonym {
//     const value: string = liaEntityValue.value;
//     const synonymsList: string[] = [];
//     liaEntityValue.synonyms.forEach(synonym => {
//       synonymsList.push(synonym.synonym);
//     });
//
//     return new EntitySynonym(value, synonymsList);
//   }
//
//   validation(j): boolean {
//     const id = 'valueInputField_' + j;
//     if (document.getElementById(id).classList.contains('error')) {
//       document.getElementById(id).classList.remove('error');
//     }
//     if (this.isNone((<HTMLInputElement>document.getElementById(id)).value)) {
//       document.getElementById(id).classList.add('error');
//
//       this.setErr(j, 'value field is empty');
//       return false;
//     } else if (this.synonymsModelList[j].synonyms.length === 0) {
//       this.setErr(j, 'synonyms list is empty');
//       return false;
//     }
//     // console.log('validated');
//     this.setErr(j, '');
//     return true;
//   }
//
//   isNone(data: string) {
//     return data === '' || data == null || data.trim() === '';
//   }
//
//   openSnackbra(msg: string) {
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
//   setErr(j: number, msg: string) {
//     const id = 'errMsg_' + j;
//     (<HTMLInputElement>document.getElementById(id)).innerHTML = msg;
//     setTimeout(() => {
//       (<HTMLInputElement>document.getElementById(id)).innerHTML = '';
//     }, 2000);
//   }
//
//   openErrorModal(errorCode, errorType, errorMessage) {
//     this.errorCode = errorCode;
//     this.errorType = errorType;
//     this.errorMessage = errorMessage;
//     this.interCommunicationServiceService.changeErrorCode(this.errorCode, this.errorType, this.errorMessage);
//     (<HTMLInputElement>document.getElementById('modalTrigger')).click();
//   }
// }

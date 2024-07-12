import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SearchRoutingModule} from './search-routing.module';
import {SearchComponent} from './search.component';
import {SearchMainComponent} from './search-main/search-main.component';
import {SearchHeaderSuggestionComponent} from './search-main/search-header-suggestion/search-header-suggestion.component';
import {SearchResultCardComponent} from './search-main/search-result-card/search-result-card.component';
import {SearchInterestedCardComponent} from './search-main/search-interested-card/search-interested-card.component';
import {SearchRelatedCardComponent} from './search-main/search-related-card/search-related-card.component';
import {SearchResultPeopleComponent} from './search-main/search-result-card/search-results/search-result-people/search-result-people.component';
import {SearchLandingComponent} from './search-main/search-landing/search-landing.component';

@NgModule({
  imports: [
    CommonModule,
    SearchRoutingModule
  ],
  exports: [
    SearchResultPeopleComponent
  ],
  declarations: [SearchComponent, SearchMainComponent, SearchHeaderSuggestionComponent, SearchResultCardComponent, SearchInterestedCardComponent, SearchRelatedCardComponent, SearchResultPeopleComponent, SearchLandingComponent]
})
export class SearchModule {
}

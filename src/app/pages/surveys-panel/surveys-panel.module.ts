import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SurveysPanelRoutingModule } from './surveys-panel-routing.module';
import { PanelComponent } from './panel/panel.component';
import { DetailsComponent } from './details/details.component';
import { SingleAnswerComponent } from './details/single-answer/single-answer.component';
import { MultipleAnswerComponent } from './details/multiple-answer/multiple-answer.component';
import { OpenAnswerComponent } from './details/open-answer/open-answer.component';
import { NumericalAnswerComponent } from './details/numerical-answer/numerical-answer.component';
import { DateAnswerComponent } from './details/date-answer/date-answer.component';

@NgModule({
  declarations: [
    PanelComponent,
    DetailsComponent,
    SingleAnswerComponent,
    MultipleAnswerComponent,
    OpenAnswerComponent,
    NumericalAnswerComponent,
    DateAnswerComponent,
  ],
  imports: [CommonModule, SurveysPanelRoutingModule, FormsModule],
})
export class SurveysPanelModule {}

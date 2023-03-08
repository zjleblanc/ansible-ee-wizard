import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HighlightModule, HIGHLIGHT_OPTIONS } from 'ngx-highlightjs';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatStepperModule } from '@angular/material/stepper';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner'
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { VersionFormGroupComponent } from './components/version-form-group/version-form-group.component';
import { EEConfigPreviewComponent } from './components/ee-config-preview/ee-config-preview.component';
import { EEPackagesPreviewComponent } from './components/ee-packages-preview/ee-packages-preview.component';
import { EECollectionsPreviewComponent } from './components/ee-collections-preview/ee-collections-preview.component';
import { EEBindepsPreviewComponent } from './components/ee-bindeps-preview/ee-bindeps-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    VersionFormGroupComponent,
    EEConfigPreviewComponent,
    EEPackagesPreviewComponent,
    EECollectionsPreviewComponent,
    EEBindepsPreviewComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
    MatButtonModule,
    MatStepperModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    HighlightModule
  ],
  providers: [
    {
      provide: HIGHLIGHT_OPTIONS,
      useValue: {
        coreLibraryLoader: () => import('highlight.js/lib/core'),
        languages: {
          yaml: () => import('highlight.js/lib/languages/yaml')
        },
        themePath: 'assets/styles/hljs-stack-overflow.css'
      }
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

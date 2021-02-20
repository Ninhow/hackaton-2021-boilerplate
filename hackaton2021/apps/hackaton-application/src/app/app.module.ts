import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { PostComponent } from './post/post.component';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { AnswerComponent } from './post/answer/answer.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule  } from '@angular/forms'
import { MatInputModule } from "@angular/material/input";
import { AngularEditorModule } from '@kolkov/angular-editor';
import { HttpClientModule } from '@angular/common/http';
import { CommentComponent } from './post/answer/comment/comment.component';
import { CommonModule } from '@angular/common';
import { NewPostComponent } from './post/new-post/new-post.component';
@NgModule({
  declarations: [AppComponent, PostComponent, AnswerComponent, CommentComponent, NewPostComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgbModule,
    FormsModule,
    MatSidenavModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    AngularEditorModule,
    HttpClientModule,
    CommonModule
    
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}

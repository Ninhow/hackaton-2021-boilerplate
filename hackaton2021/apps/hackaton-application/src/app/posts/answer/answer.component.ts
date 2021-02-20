import { Component, Input, OnInit } from '@angular/core';
import {
  AbstractControl,
  ControlContainer,
  FormBuilder,
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  commentForm: FormGroup;
  @Input() answer;
  public isCollapsed = true;
  comments = [];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null),
    })
  }

  onComment() {
    console.log(this.commentForm.value)
    this.comments.push(this.commentForm.value)
  }
}

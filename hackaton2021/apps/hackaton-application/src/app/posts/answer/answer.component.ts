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
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
@Component({
  selector: 'answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.scss']
})
export class AnswerComponent implements OnInit {
  reputationCount = 11;
  commentForm: FormGroup;
  @Input() answer;
  public isCollapsed = true;
  comments = [];

  constructor(private formBuilder: FormBuilder, private userService: UserService, private auth: AuthService) { }

  ngOnInit(): void {
    this.commentForm = new FormGroup({
      comment: new FormControl(null),
    })
  }

  onComment() {
    console.log(this.commentForm.value)
    this.comments.push({comment: this.commentForm.value, username: this.auth.GetUser().displayName })
  }

  addReputation(){
    this.reputationCount++;
  }

  removeReputation(){
    this.reputationCount--;
  }


}

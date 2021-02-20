import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  formdata;
  post = {
    "postTitle": "test",
    "postUser": "testUser",
    "postQuestion": "testQuestion",
    "answers": []
  }

  constructor(private formBuilder: FormBuilder) { }

  onClickSubmit() {
    if(this.formdata.invalid) {
    this.formdata.get('description').markAsTouched();
    } else {
      console.log(this.formdata.value)
      this.post.answers.push(this.formdata.value)
    }
  }

  ngOnInit(): void {
  this.formdata = this.formBuilder.group({
        description: ['', [Validators.required,
          Validators.maxLength(400), Validators.minLength(5)]]
    });
  }

}

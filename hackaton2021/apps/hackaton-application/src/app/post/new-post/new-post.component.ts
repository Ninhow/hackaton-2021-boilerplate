import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.scss']
})
export class NewPostComponent implements OnInit {
  formdata;

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.formdata = this.formBuilder.group({
      description: ['', [Validators.required,
        Validators.maxLength(400), Validators.minLength(5)]]
  });
  }

  onClickSubmit() {
    if(this.formdata.invalid) {
    this.formdata.get('description').markAsTouched();
    } else {
      console.log(this.formdata.value)
    }
  }
}

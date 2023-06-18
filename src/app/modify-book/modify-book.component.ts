import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent implements OnChanges {
  bookForm: FormGroup;
  @Input() updatedData: any;
  @Output() addedBookData = new EventEmitter();

  constructor(
  ) {
    this.initForm();
  }

  ngOnChanges(): void {
    if (this.updatedData?.modify) {
      this.bookForm.patchValue(this.updatedData?.updatedData)
    }
  }

  initForm() {
    this.bookForm = new FormGroup({
      imageUrl: new FormControl('', Validators.required),
      title: new FormControl('', Validators.required),
      purchaseLink: new FormControl('', Validators.required),
      PublishDate: new FormControl('', Validators.required),
    });
  }


  onSubmit(): void {
    if (!this.bookForm.valid) {
      alert('Please fill all the required fields');
    }
    if (this.updatedData?.modify) {
      this.addedBookData.emit(this.bookForm.value)
    } else {
      this.addedBookData.emit(this.bookForm.value)
    }
    this.reset();
  }

  reset(): void {
    this.bookForm.reset();
    this.updatedData = [];
  }
}

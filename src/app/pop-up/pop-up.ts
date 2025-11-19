import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface Person {
  name: string;
  age: number;
  dob: string;
  comments: string;
}

@Component({
  selector: 'app-pop-up',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './pop-up.html',
  styleUrls: ['./pop-up.css'],
})
export class PopUp implements OnChanges {
  @Input() personToEdit: Person | null = null;
  @Input() isEditMode: boolean = false;
  @Output() submitData = new EventEmitter<Person>();
  @Output() updateData = new EventEmitter<Person>();
  @Output() closePopup = new EventEmitter<void>();

  userForm!: FormGroup;
  maxDate: string = '';
  showErrorMessage = false;

  constructor(private fb: FormBuilder) {
    const today = new Date();
    this.maxDate = `${today.getFullYear()}-${(today.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;

    this.createForm();
  }

  createForm() {
    this.userForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      age: [''],
      dob: [''],
      comments: [''],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['personToEdit'] && this.personToEdit) {
      const [firstName, ...rest] = this.personToEdit.name.split(' ');
      const lastName = rest.join(' ');

      this.userForm.patchValue({
        firstName,
        lastName,
        age: this.personToEdit.age,
        dob: this.personToEdit.dob,
        comments: this.personToEdit.comments,
      });
    }
  }

  calculateDOBFromAge() {
    const age = this.userForm.get('age')?.value;

    if (age && age > 0) {
      const today = new Date();
      const birthYear = today.getFullYear() - age;

      const dobStr = `${birthYear}-${(today.getMonth() + 1).toString().padStart(2, '0')}-${today
        .getDate()
        .toString()
        .padStart(2, '0')}`;

      const dobDate = new Date(dobStr);

      if (dobDate > today) {
        this.userForm.patchValue({ dob: '', age: '' });
        return;
      }

      this.userForm.patchValue({ dob: dobStr });
    }
  }

  calculateAgeFromDOB() {
    const dob = this.userForm.get('dob')?.value;

    if (dob) {
      const dobDate = new Date(dob);
      const today = new Date();

      if (dobDate > today) {
        this.userForm.patchValue({ dob: '', age: '' });
        return;
      }

      let age = today.getFullYear() - dobDate.getFullYear();
      const monthDiff = today.getMonth() - dobDate.getMonth();

      if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dobDate.getDate())) {
        age--;
      }

      this.userForm.patchValue({ age });
    }
  }

  onSubmit() {
    //  VALIDATION: all fields required
    if (
      !this.userForm.value.firstName ||
      !this.userForm.value.lastName ||
      !this.userForm.value.age ||
      !this.userForm.value.dob ||
      this.userForm.value.comments
    ) {
      this.showErrorMessage = true;
      return;
    }

    this.showErrorMessage = false;

    const formValue = this.userForm.value;

    const newPerson: Person = {
      name: `${formValue.firstName} ${formValue.lastName}`,
      age: formValue.age,
      dob: formValue.dob,
      comments: formValue.comments,
    };

    const existing = localStorage.getItem('persons');
    const persons: Person[] = existing ? JSON.parse(existing) : [];

    if (this.isEditMode) {
      const index = persons.findIndex((p) => p.name === this.personToEdit?.name);

      if (index !== -1) {
        persons[index] = newPerson;
      } else {
        persons.push(newPerson);
      }

      this.updateData.emit(newPerson);
    } else {
      persons.push(newPerson);
      this.submitData.emit(newPerson);
    }

    localStorage.setItem('persons', JSON.stringify(persons));

    this.close();
  }

  close() {
    this.userForm.reset();
    this.showErrorMessage = false;
    this.closePopup.emit();
  }
}

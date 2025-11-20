
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PopUp } from '../pop-up/pop-up';

interface Person {
  name: string;
  age: number;
  dob: string;
  comments: string;
}

@Component({
  selector: 'app-tables',
  imports: [CommonModule, PopUp],
  templateUrl: './tables.html',
  styleUrl: './tables.css',
})
export class Tables implements OnInit {
  showPopup = false;
  people: Person[] = [];
  editingPerson: Person | null = null;
  editingIndex: number = -1;
  isEditMode: boolean = false;

  ngOnInit(): void {
    const stored = localStorage.getItem('persons');
    this.people = stored ? JSON.parse(stored) : [];
  }

  edit(person: Person) {
    this.editingPerson = person;
    this.editingIndex = this.people.indexOf(person);
    this.isEditMode = true;
    this.showPopup = true;
  }

  // DELETE PERSON FROM TABLE + LOCAL STORAGE
  delete(person: Person) {
    // REMOVE FROM TABLE
    this.people = this.people.filter((p) => p !== person);

    // UPDATE LOCAL STORAGE
    localStorage.setItem('persons', JSON.stringify(this.people));
  }

  openPopup() {
    this.editingPerson = null;
    this.editingIndex = -1;
    this.isEditMode = false;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
    this.editingPerson = null;
    this.editingIndex = -1;
    this.isEditMode = false;
  }

  addPerson(person: Person) {
    this.people.push(person);
    localStorage.setItem('persons', JSON.stringify(this.people));
    this.closePopup();
  }

  updatePerson(person: Person) {
    if (this.editingIndex !== -1) {
      this.people[this.editingIndex] = person;
    }
    localStorage.setItem('persons', JSON.stringify(this.people));
    this.closePopup();
  }
}

import { Component } from '@angular/core';
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
export class Tables {
  showPopup = false;
  people: Person[] = [];
  editingPerson: Person | null = null;
  editingIndex: number = -1;
  isEditMode: boolean = false;

  /**
   * @param person The person object to edit.
   */
  edit(person: Person) {
    this.editingPerson = person;
    this.editingIndex = this.people.indexOf(person);
    this.isEditMode = true;
    this.showPopup = true;
  }

  /**
   * @param person The person object to delete.
   */
  delete(person: Person) {
    // Placeholder for delete functionality
    this.people = this.people.filter((p) => p !== person);
  }

  // Opens the popup for adding a new person.

  openPopup() {
    this.editingPerson = null;
    this.editingIndex = -1;
    this.isEditMode = false;
    this.showPopup = true;
  }

  // Closes the popup and resets editing state.

  closePopup() {
    this.showPopup = false;
    this.editingPerson = null;
    this.editingIndex = -1;
    this.isEditMode = false;
  }

  /**
   * @param person The person object to add.
   */
  addPerson(person: Person) {
    this.people.push(person);
    this.closePopup();
  }

  /**
   * @param person The updated person object.
   */
  updatePerson(person: Person) {
    if (this.editingIndex !== -1) {
      this.people[this.editingIndex] = person;
    }
    this.closePopup();
  }
}

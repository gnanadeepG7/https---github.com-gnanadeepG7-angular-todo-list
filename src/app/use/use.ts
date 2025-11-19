import { Component } from '@angular/core';

@Component({
  selector: 'app-use',
  imports: [],
  templateUrl: './use.html',
  styleUrl: './use.css',
})
export class Use {

  button(){
    console.log('Button clicked');
    this.buttion1();
    
    
  }
  buttion1(){
    console.log("2nd button")
  }
 n: null = null;
 u: undefined = undefined;

  // Add your code here
  

}

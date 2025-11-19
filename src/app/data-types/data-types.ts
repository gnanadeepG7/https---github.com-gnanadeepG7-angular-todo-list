import { Component,effect,signal } from '@angular/core';

@Component({
  selector: 'app-data-types',
  imports: [],
  templateUrl: './data-types.html',
  styleUrl: './data-types.css',
})
export class DataTypes {
//  name:string |number = 10; //string
//  age:number = 25; //number
//  big:number=1111111111111111111111111111111111111111111111

 //}
 count=0
 handledIncrement(){
  this.count=this.count+1
 }
 handleddec(){
  this.count=this.count-1
 }
 reset(){
  this.count=0  
 }

 //if 
  display1=true;
  hide1()
 {
  this.display1=false;
 }
 show1(){
  this.display1=true;
 }
 //toggle
 display2=true
 toggle()
 {
 this.display2=!this.display2

 }
 //if else
  display=true
 toggleDiv()
 {
  this.display=!this.display
 }
 //for--------------
 user=['a','b','c','d','e'];

 users=[
  {name:"deepu",empid:101,email:'deepu@glail.com'},
  {name:"raj",empid:102,email:'raj@gmail.com'},
  {name:"dam",empid:103,email:'ram@gmail.com'},
  {name:"sri",empid:104,email:'sri@gmail.com'}
 ];
 //signals
 countr=2000
 sign=signal(100)

 constructor()
 {
  effect(()=>{
    console.log(this.sign())
  })
 }
 updateVal(){     
  // this.countr=1
  this.sign.set(this.sign()+1)
 }
 
























}



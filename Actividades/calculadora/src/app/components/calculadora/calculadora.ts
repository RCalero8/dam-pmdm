import { Component } from '@angular/core';
import { Pantalla } from '../pantalla/pantalla';
import { Boton } from '../boton/boton';

@Component({
  imports: [Pantalla, Boton],
  selector: 'app-calculadora',
  styleUrl: './calculadora.css',
  templateUrl: './calculadora.html',
})
export class Calculadora {
  pantalla = '0';
 operador = '';
 numero1 = 0;
 nuevo = true;

 digito(d: number) {
  if(this.nuevo){
    this.pantalla = String(d);
    this.nuevo = false;
  } else {
    this.pantalla = this.pantalla + d;
  }
 }

 suma() {
  this. numero1 = Number(this.pantalla)
  this.operador = '+'
  this.nuevo = true;
 }
 resta() {
  this. numero1 = Number(this.pantalla)
  this.operador = '-'
  this.nuevo = true;
 }

 igual(){
  const numero2 = Number(this.pantalla);
  if(this.operador === '+'){
    this.pantalla = String(this.numero1 + numero2);
  } else {
    this.pantalla = String(this.numero1 - numero2);
  }
  this.operador = '';
  this.nuevo = true;
 }
}

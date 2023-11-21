import { Component, OnInit } from '@angular/core';
import * as p5 from 'p5';
import { jsPDF } from "jspdf";

@Component({
  selector: 'app-contract',
  templateUrl: './contract.component.html',
  styleUrls: ['./contract.component.scss']
})

export class ContractComponent implements OnInit {

  constructor() { }
  canvas: any;
  c: p5.Color[] = [];

  ngOnInit(): void {

    const sketch = (s: p5) => {
      s.setup = () => {
        let canvas2 = s.createCanvas(s.windowWidth - 1400, s.windowHeight - 600);
        canvas2.parent('sketch-holder');
        s.background(255);
        this.c[0] = s.color(0, 0, 0);
      };

      s.draw = () => {
        if (s.mouseIsPressed) {
          if (s.mouseButton === s.LEFT) {
            s.line(s.mouseX, s.mouseY, s.pmouseX, s.pmouseY);
          } else if (s.mouseButton === s.CENTER) {
            s.background(255);
          }
        }
      };
    };
    this.canvas = new p5(sketch);
  }

  image:string="";

  captureSignature() {
    const signatureDataUrl = this.canvas.canvas.toDataURL();
    this.canvas.clear();
   // this.canvas.isEmpty();
    this.image=signatureDataUrl
    console.log(signatureDataUrl);
    

  }

}

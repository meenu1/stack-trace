import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

import { __platform_browser_private__, 
         SafeResourceUrl, 
         DomSanitizer } from '@angular/platform-browser';

import { PopoverDirective } from 'ng2-bootstrap/popover';

import { StackTraceService } from './stack-trace.service';

@Component({
  selector: 'stack-trace',
  templateUrl: './stack-trace.component.html',
  styleUrls: ['./stack-trace.component.scss'],
  providers: [__platform_browser_private__.BROWSER_SANITIZATION_PROVIDERS]
})
export class StackTraceComponent implements OnInit {
  private stackTraces: any;
  private selectedStack: any;
  private sourceCode: any;
  private values: any[];
  private availableValues: any = {};

  private testDelete: string = "123";
  public html:string = `<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;

  //@ViewChild('p') public popover: PopoverDirective;

  constructor(private elementRef: ElementRef, private stackTraceService: StackTraceService, private sanitizer: DomSanitizer ) {

    /*this.elementRef.nativeElement.querySelector('.right').addEventListener('click', function(e){
      console.log('elementRef.nativeElement: e: ', e);
    });*/
  }

  /*@HostListener('document:keyup', ['$event'])
  onKeyUp(ev: KeyboardEvent) {
    console.log(`The user just pressed ${ev.key} - !`, ev.target);

    this.checkSelection(ev);
  }*/

  @HostListener('document:mouseup', ['$event'])
  onMouseUp(ev: MouseEvent) {
    console.log(`The user just clicked ${ev.type} - !`, ev.target);

    this.checkSelection(ev);
  }

  checkSelection(ev: Event) {
    if (this.elementRef.nativeElement.querySelector('.right').contains(ev.target)) {
      let text = this.getSelectionText();
      console.log('text:', text);

      if (text) {
        this.checkValueIsAvailable(text);
      }
    }

  }

  checkValueIsAvailable(text: string) {
    //console.log('checkValueIsAvailable(): text:', text);

    //console.log('checkValueIsAvailable(): this.sourceCode.resp.availableValues.indexOf(text):', this.sourceCode.resp.availableValues.indexOf(text));

    if (this.sourceCode.resp.availableValues.indexOf(text) != -1) {
      //console.log('checkValueIsAvailable(): if');

      this.stackTraceService.getValue(text).subscribe((data) => {
        console.log('data:', data);


        var selection = this.getSelectedText();
        var selection_text = selection.toString();

        // How do I add a span around the selected text?

        var span = document.createElement('SPAN');
        span.setAttribute("popover", data.val);
        span.textContent = selection_text;

        var range = selection.getRangeAt(0);
        range.deleteContents();
        range.insertNode(span);

      });
    }
  }


  getSelectionText() {
    var text = "";
    if (window.getSelection) {
      text = window.getSelection().toString();
    } /*else if (document.selection && document.selection.type != "Control") {
      text = document.selection.createRange().text;
    }*/
    return text;
  }

  getSelectedText() {
    let t = window.getSelection();

    return t
  }


  ngOnInit() {

    this.stackTraces = [
      {
        "id": 1,
        "error": "transition superseded",
        "file": "App.java"
      },
      {
        "id": 2,
        "error": "transition prevented",
        "file": "Utility.java"
      },
      {
        "id": 3,
        "error": "transition aborted",
        "file": "Scanner.java"
      },
      {
        "id": 4,
        "error": "transition failed",
        "file": "RegUtil.java"
      }
    ];
  }

  setSelectedStack(selectedStack) {
    this.selectedStack = selectedStack;

    this.stackTraceService.getSourceCode(selectedStack.file).subscribe((data) => {
      console.log('data:', data);

      this.sourceCode = data;

      this.sourceCode = this.addPopovers(this.sourceCode);

      console.log('this.sourceCode:', this.sourceCode);
    });
  }

  addPopovers(sourceCode){

    for(let line of sourceCode.resp.lines){
      console.log("line.lineCode:", line.lineCode);

      for(let availableValue of sourceCode.resp.availableValues){
        if(line.lineCode.indexOf(availableValue) != -1){
          console.log("availableValue:", availableValue);

          //line.lineCode.replace(availableValue, "sajith m");
          this.availableValues[availableValue] = "Loading...";
          //let span = '<span [popover]="'+ this.availableValues[availableValue] +'">'+ availableValue +'</span>';
          let span = '<span [popover]="'+ availableValue +'">'+ availableValue +'</span>';
          //span = '<span popover=\"Fri Feb 24 09:54:02 UTC 2017\">java.util.Date</span>';

          //span = this.sanitizer.bypassSecurityTrustHtml(span);
          //line.lineCode = line.lineCode.replace(new RegExp(availableValue, 'g'), span);

          //line.lineCode = this.sanitizer.bypassSecurityTrustHtml(line.lineCode);

          let lineCodeArray = line.lineCode.split(availableValue);
          let lineCode = [];
          //let flag = true;

          console.log('lineCodeArray:', lineCodeArray);

          for(let index in lineCodeArray){
            console.log('index:', index);

            /*let isValueAvailable = false;
            let line = "";

            if(flag){
              line = lineCodeArray[index];
              isValueAvailable = false;
              flag = false;
            }else{
              line = availableValue;
              isValueAvailable = true;
              flag = true;
            }*/

            lineCode.push({
              "line": lineCodeArray[index],
              "isValueAvailable": false
            });

            if(Number(index) < (lineCodeArray.length-1)){
              lineCode.push({
                "line": availableValue,
                "isValueAvailable": true
              });
            }
          }


          console.log("lineCode:", lineCode);

          line.lineCode = lineCode;

          console.log("typeof lineCode:", Array.isArray(lineCode));
          console.log("line.lineCode:", line.lineCode);
          
        }
      }
    }

    console.log("sourceCode:", sourceCode);

    return sourceCode;
  }

  checkAvailableValues(){

  }

  getValue(elem: any, keyword: string){
    console.log('elem:', elem);
    
    this.stackTraceService.getValue(keyword).subscribe((data) => {
      console.log('data:', data);
      this.availableValues[keyword] = data.val;

      elem.hide();
      setTimeout(function(){
        elem.show();
      }, 0);
      
    });
  }

  isArray(obj : any ) {
   return Array.isArray(obj)
  }



}

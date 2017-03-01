import { Component, OnInit, HostListener, ElementRef, ViewChild } from '@angular/core';

import { ActivatedRoute, Params }   from '@angular/router';

import { __platform_browser_private__, 
         SafeResourceUrl, 
         DomSanitizer } from '@angular/platform-browser';

import { PopoverDirective } from 'ng2-bootstrap/popover';

import { StackTraceService } from './stack-trace.service';

import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'stack-trace',
  templateUrl: './stack-trace.component.html',
  styleUrls: ['./stack-trace.component.scss'],
  providers: [__platform_browser_private__.BROWSER_SANITIZATION_PROVIDERS]
})
export class StackTraceComponent implements OnInit {
  private stackTrace: any;
  private selectedStack: any;
  private sourceCode: any;
  //private methodSource: any;
  private values: any[];
  private availableValues: any = {};

  private testDelete: string = "123";
  public html:string = `<span class="btn btn-danger">Never trust not sanitized HTML!!!</span>`;

  //@ViewChild('p') public popover: PopoverDirective;

  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private stackTraceService: StackTraceService, private sanitizer: DomSanitizer ) {

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

    /*this.stackTraces = [
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
    ];*/

    this.route.params
      .subscribe((params: Params) => { 
        console.log('params[id]:', params['id']); 

        this.stackTraceService.getStackTrace(params['id']).subscribe((data) => {
          console.log('data:', data);

          this.stackTrace = data.stack_trace;

          console.log('stackTrace:', this.stackTrace);
        });

      });

    /*this.route.params
      .switchMap((params: Params) => { 
        console.log('params[id]:', +params['id']); 
        this.stackTraceService.getStackTrace(params['id']);
      })
      .subscribe((response: any) => { 
        console.log('response:', response);

        this.stackTrace = response.stack_trace;

        console.log('stackTrace:', this.stackTrace);

      });*/

    /*this.stackTraceService.getStackTrace("logName").subscribe((data) => {
      console.log('data:', data);

      this.stackTrace = data.stack_trace;

      console.log('stackTrace:', this.stackTrace);
    });*/

  }

  setSelectedStack(selectedStack) {
    console.log('setSelectedStack(): selectedStack:', selectedStack);

    this.selectedStack = selectedStack;

    this.sourceCode = this.createVariablesString(this.selectedStack);

    this.sourceCode = this.addPopovers(this.selectedStack);

    /*this.stackTraceService.getSourceCode(selectedStack.file).subscribe((response) => {
      console.log('ngOnInit(): getSourceCode().subscribe(): response:', response);

      this.sourceCode = response;

      this.sourceCode = this.addPopovers(this.sourceCode);

      console.log('ngOnInit(): getSourceCode().subscribe(): sourceCode:', this.sourceCode);
    });*/
  }

  createVariablesString(selectedStack){
    console.log("selectedStack.value:", selectedStack.value);

    if(selectedStack.value && Object.keys(selectedStack.value).length > 0){
      console.log('selectedStack.value.length:', Object.keys(selectedStack.value).length);

      var variablesString = "";

      for(let val in selectedStack.value){
        console.log('val:', val);
        variablesString += "|" + val;
      }

      variablesString = variablesString.substr(1);
      selectedStack.variablesString = variablesString;

      console.log("selectedStack:", selectedStack);

      return selectedStack;

    }else{
      return selectedStack;
    }

  }

  addPopovers(sourceCode){
    console.log("addPopovers(): sourceCode:", sourceCode); 

    for(let line of sourceCode.source){
      //console.log("line.lineCode:", line.lineCode);

      //for(let variable in sourceCode.value){
        //console.log("variable:", variable);

        var patt = new RegExp('\\b'+ sourceCode.variablesString +'\\b(?=([^"]*"[^"]*")*[^"]*$)');
        console.log("patt:", patt);

        //console.log('line.lineCode: %o -> variable: %o', line.lineCode, variable);

        if(patt.test(line.lineCode)){
        /*if(line.lineCode.indexOf(variable) != -1){*/
          //console.log("variable:", variable);

          //line.lineCode.replace(variable, "sajith m");
      //this.availableValues[variable] = sourceCode.value[variable];
          //let span = '<span [popover]="'+ this.availableValues[variable] +'">'+ variable +'</span>';
          //let span = '<span [popover]="'+ variable +'">'+ variable +'</span>';
          //span = '<span popover=\"Fri Feb 24 09:54:02 UTC 2017\">java.util.Date</span>';

          //span = this.sanitizer.bypassSecurityTrustHtml(span);
          //line.lineCode = line.lineCode.replace(new RegExp(variable, 'g'), span);

          //line.lineCode = this.sanitizer.bypassSecurityTrustHtml(line.lineCode);

          var regex = new RegExp('\\b(' + sourceCode.variablesString + ')\\b(?=([^"]*"[^"]*")*[^"]*$)');

          let lineCodeArray = line.lineCode.split(regex);
          let lineCode = [];
          //let flag = true;

          console.log('lineCodeArray:', lineCodeArray);

          for(let index in lineCodeArray){
            //console.log('index: %o -> value; %o', index, lineCodeArray[index]);

            let pushedFlag = false;

            for(let variable in sourceCode.value){
          
              if(lineCodeArray[index] == variable){
                console.log('index: %o -> value: %o -> variable: %o', index, lineCodeArray[index], variable);

                lineCode.push({
                  "line": variable,
                  "isValueAvailable": true
                });

                pushedFlag = true;
              }
          
            }

            if(!pushedFlag){
              lineCode.push({
                "line": lineCodeArray[index],
                "isValueAvailable": false
              });
            }
            

            /*lineCode.push({
              "line": lineCodeArray[index],
              "isValueAvailable": false
            });*/

            /*if(Number(index) < (lineCodeArray.length-1)){
              lineCode.push({
              //"line": variable,
                "isValueAvailable": true
              });
            }*/
          }


          console.log("lineCode:", lineCode);

          line.lineCode = lineCode;

          console.log("typeof lineCode:", Array.isArray(lineCode));
          console.log("line.lineCode:", line.lineCode);
          
        }
      //}
    }

    console.log("sourceCode:", sourceCode);

    return sourceCode;
  }

  getVariableValue(variableName: string){
    console.log('variableName:', variableName);
    return JSON.stringify(this.selectedStack.value[variableName]);
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

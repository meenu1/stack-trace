import { Component, OnInit, HostListener, ElementRef, ViewChild , Pipe, PipeTransform} from '@angular/core';

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
  private values: any[];
  private availableValues: any = {};

  private testDelete: string = "123";
  private exceptionId : string;
  private selectedStackNameValue :  any;
  private showObjectValue : any[];
  constructor(private elementRef: ElementRef, private route: ActivatedRoute, private stackTraceService: StackTraceService, private sanitizer: DomSanitizer ) {

  }
@HostListener('click') c_onEnterrr() {
  if(event.srcElement.className == "glyphicon glyphicon-triangle-bottom"){
      if(event.srcElement.parentElement.nextElementSibling.className.indexOf('close-accordion')<0){
        event.srcElement.parentElement.nextElementSibling.className = 'close-accordion';
      }else{
        event.srcElement.parentElement.nextElementSibling.className = event.srcElement.parentElement.nextElementSibling.className.replace('close-accordion','open')
      }
  }
}
  ngOnInit() {

    this.route.params
      .subscribe((params: Params) => { 
        /**
         * get stack data
         */
        this.exceptionId = params['id'];
        this.stackTraceService.getStackTrace(params['id']).subscribe((data) => {
          this.stackTraceService.getValue(this.exceptionId).subscribe((valueData) => {

                  this.stackTrace = data;
                  for(var j=0;j<this.stackTrace.length;j++){
                      let temp = this.stackTrace[j].methodDefinitions[0].split('\n');
                      this.stackTrace[j].source = [];
                      this.stackTrace[j].alreadyProcessed = false;
                      this.stackTrace[j].method = 'M'+ valueData[j].Method_Id;
                      this.stackTrace[j].value = valueData[j].Variables;
                      let lineNumber = this.stackTrace[j].methodStartLineNumber;
                      for(let i=0;i<temp.length;i++){
                        if(temp[i] !== ""){
                            this.stackTrace[j].source.push({
                                'lineCode':temp[i],
                                'lineNumber':lineNumber++
                            });
                        }
                      }
                  }
                  console.log(this.stackTrace[2].value.pqr);
                  this.setSelectedStack();
          });
            
        });

      });
  }
  selectedStackName(stack) {
      let self = this;
      this.selectedStackNameValue = stack;
      let i = this.elementRef.nativeElement.querySelector('.right').scrollTop;
      let timeout = null;
      let total = this.elementRef.nativeElement.querySelector('.'+this.selectedStackNameValue.className+'-'+this.selectedStackNameValue.method).offsetTop;
      if(i < total){
          timeout =  setInterval(function() {
            i+= 10;
            
            if(i >= total){
               self.elementRef.nativeElement.querySelector('.right').scrollTop = total;
               clearInterval(timeout);
            }else{
              self.elementRef.nativeElement.querySelector('.right').scrollTop = i;
            }
          }, 10);      
      }else{
          timeout =  setInterval(function() {
              i-= 10;
              if(i <= total){
                 self.elementRef.nativeElement.querySelector('.right').scrollTop = total-2;
                 clearInterval(timeout);
              }else{
                 self.elementRef.nativeElement.querySelector('.right').scrollTop = i;
              }
          }, 10);
      }
  }
  setSelectedStack() {
    for(let i=0;i<this.stackTrace.length;i++){
      this.stackTrace[i].valueArray = Object.keys(this.stackTrace[i].value);
      this.stackTrace[i] = this.createVariablesString(this.stackTrace[i]);
      this.stackTrace[i]= this.addPopovers(this.stackTrace[i]);
    }
    
    this.selectedStackNameValue = this.stackTrace[0];
  }

  createVariablesString(selectedStack){

    if(selectedStack.value && Object.keys(selectedStack.value).length > 0){

      var variablesString = "";

      for(let val in selectedStack.value){
        variablesString += "|" + val;
      }

      variablesString = variablesString.substr(1);
      selectedStack.variablesString = variablesString;

      return selectedStack;

    }else{
      return selectedStack;
    }

  }

  addPopovers(sourceCode){
    sourceCode.alreadyProcessed = true;
    for(let line of sourceCode.source){

        var patt = new RegExp('\\b'+ sourceCode.variablesString +'\\b(?=([^"]*"[^"]*")*[^"]*$)');
        

        if(patt.test(line.lineCode)){
       
          var regex = new RegExp('\\b(' + sourceCode.variablesString + ')\\b(?=([^"]*"[^"]*")*[^"]*$)');

          let lineCodeArray = line.lineCode.split(regex);
          let lineCode = [];

          for(let index in lineCodeArray){

            let pushedFlag = false;

            for(let variable in sourceCode.value){
          
              if(lineCodeArray[index] == variable){
 
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

          }

          line.lineCode = lineCode;

        }
    }

    return sourceCode;
  }
  
  getVariableValue(variableName: string,selectedStack){
      var html = "";
      this.selectedStack = selectedStack;
      if(this.selectedStack.value[variableName].length === 0){
        return JSON.stringify(this.selectedStack.value[variableName]);
      }
      if(this.selectedStack.value[variableName] instanceof Object){
        for(let val in this.selectedStack.value[variableName]){
          if(this.selectedStack.value[variableName][val] instanceof Object){
                html = html + '<span class="d-block">'+val+'  :  '+ JSON.stringify(this.selectedStack.value[variableName][val])+'</span><br/>';
          }else{
              html = html + '<span class="d-block">'+val +'  :  '+ this.selectedStack.value[variableName][val]+'</span><br/>';
          }
        }
      }
      else{
        html = '<span class="d-block">'+this.selectedStack.value[variableName]+'</span>';
      }
      return html;
  }
  checkValueOrObject(stackTemp:any,variable:string){
   return stackTemp.value[variable] instanceof Object;
  }
  isArray(obj : any ) {
    return Array.isArray(obj)
  }

}

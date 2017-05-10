import { Component, HostListener, ElementRef,Input, ViewChild , Pipe, PipeTransform} from '@angular/core';
@Component({
  selector: 'show-multiple-object',
  templateUrl: './stack-trace-mulitple-object.component.html',
  styles:[`
   
   .object-expand .col-md-6:first-child{
     border-left: 4px solid #e6e6e6; 
   }
   .object-expand{
       font-size: 13px;
    }
  .ellipses{
      text-overflow: ellipsis;
      white-space: nowrap;
      overflow: hidden;
    }
    .show-more{
        cursor: pointer;
        color: #1bb7e5;
        padding-right: 0;
    }
    
  `]
})
export class ShowMultipleObjectComponent {
  
  @Input() stackTraceValue: any;
  @Input() stackTraceObject: any;
  
  constructor(private el: ElementRef) { 
      
  }
  checkValueOrObject(stackTemp:any,variable:string){
   return stackTemp[variable] instanceof Object;
  }
  checkArray(value){
     return (value.constructor == Array)
  }
}

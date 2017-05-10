import { Component,Input ,OnInit,HostListener, ElementRef, ViewChild} from '@angular/core';
 
@Component({
  selector: 'show-multiple-object-in-modal',
  templateUrl: './modal.component.html',
  styles:[`
    .modal-object-expand .glyphicon-triangle-bottom{
         right:8px;
      }
      .modal-object-expand .object-available{
         padding-left:0;
      }
      .close-accordion{
        display:none;
      }
      .expanded-object{
            border-left: 4px solid #e6e6e6;
            margin-left: 14px;
            padding-left: 0;
            margin-top: 9px;
      }
      .show-more{
            cursor: pointer;
            color: #1bb7e5;
            padding-right: 0;
      }
    
  `]
})
export class ModalComponent implements OnInit{
  private showMore:boolean = true;
  @HostListener('click') c_onEnterrr() {
    if(event.srcElement.className.indexOf("show-more")>-1){
        var elem = <HTMLElement>event.srcElement;
        if(event.srcElement.nextElementSibling.className.indexOf('close-accordion')<0){
          event.srcElement.nextElementSibling.className = 'close-accordion';
          elem.innerText = 'Show More...';
        }else{
          event.srcElement.nextElementSibling.className = event.srcElement.nextElementSibling.className.replace('close-accordion','open')
          let stylElm = <HTMLElement>event.srcElement.nextElementSibling.querySelector('.col-md-12');
          stylElm.className = "col-md-12 expanded-object";
          elem.innerText = 'Show Less...';
      }
        event.stopPropagation();
    }
 }
  @Input() modalObject: any;
  checkArray(value){
     return (value.constructor == Array)
  }
  ngOnInit(){
    console.log(this.modalObject);
  }
  checkValueOrObject(stackTemp:any,variable:string){
    return stackTemp[variable] instanceof Object;
  }
}
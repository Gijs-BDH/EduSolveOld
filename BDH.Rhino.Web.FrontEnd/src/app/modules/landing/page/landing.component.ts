import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit, AfterViewInit, OnDestroy {


    number : number = 5;
    n : number = 0;
    scrollBox? : HTMLElement | null;
    img? : HTMLElement | null;
    
    
    ngOnInit(): void {

        this.scrollBox = document.getElementById('scrollbox')
        this.img = document.getElementById('img');

        if(this.scrollBox){
            this.scrollBox.addEventListener('scroll', this.onScroll.bind(this));
        }

        
    }
   
    ngAfterViewInit(): void {
        for(var i = 0; i<this.number; i++){
            var img = new Image();
            img.src = this.constructUrl(i);
        }
    }
   
    ngOnDestroy(): void {
        if(this.scrollBox){
            this.scrollBox.removeEventListener('scroll', this.onScroll.bind(this));
        }
    }

    private onScroll(ev : Event){
        if(this.scrollBox && this.img){

            this.n = (this.n + 1) % this.number;
            
            var src = this.constructUrl(this.n);
            if(this.img instanceof HTMLImageElement){
                this.img!.src = src;
            }
        }
    }

    private constructUrl(i : number){
        return `../../../../assets/imgs/landing/Frame_${i.toString().padStart(5, '0')}.png`;
    }
}

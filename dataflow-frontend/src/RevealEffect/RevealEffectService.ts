export class RevealEffectService{
    private static onlyInstance: RevealEffectService = new RevealEffectService();

    private constructor(){

    }
    public static getRevealEffectService():RevealEffectService{
        return this.onlyInstance;
    }

   public handleClickRipple(event: React.MouseEvent<Element, MouseEvent>): void{
        console.log("ripple");
        const target = (event.target||event.currentTarget) as Element;
        const circle = document.createElement('div');
    console.dir(target);
        target.appendChild(circle);

        const d = Math.max(target.clientWidth, target.clientHeight);

        circle.style.width = circle.style.height = d + 'px';

        const rect = target.getBoundingClientRect();

        circle.style.left = event.clientX - rect.left - d / 2 +'px';
        circle.style.top = event.clientY - rect.top - d / 2 + 'px';
        circle.classList.add('ripple');

        window.setTimeout(function () {
            circle.remove();
        }, 800);
    }

    public addRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>):void {
        if (!(/Mobi|Android/i.test(navigator.userAgent))) {
            var target = (event.target || event.currentTarget) as HTMLElement;
    
    
            let x = event.pageX - target.getBoundingClientRect().left - window.scrollX;
          let y = event.pageY - target.getBoundingClientRect().top - window.scrollY;
          
            this.drawEffect(target, x, y, getComputedStyle(document.documentElement, null).getPropertyValue('--color-reveal-highlight'), 80);
    
           
        }
       }

    public drawBorderRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>):void {
        if (!(/Mobi|Android/i.test(navigator.userAgent))) {

            const target = (event.target||event.currentTarget) as HTMLElement;

            const x = event.pageX - target.getBoundingClientRect().left - window.scrollX;
            const y = event.pageY - target.getBoundingClientRect().top - window.scrollY;
            
              this.drawEffect(target, x, y, getComputedStyle(document.documentElement, null).getPropertyValue('--color-reveal-highlight-border'), 80);
      /*
            const x = event.pageX - this.borders[i].getBoundingClientRect().left - window.scrollX;
            const y = event.pageY - this.borders[i].getBoundingClientRect().top - window.scrollY;
            if (this.isIntersected(this.borders[i], event.clientX, event.clientY, 80)) {
    
              this.drawEffect(this.borders[i], x, y, getComputedStyle(document.documentElement, null).getPropertyValue('--color-reveal-highlight-border'), 80);
    
            }
    
            else {
    
              this.clearEffect(this.borders[i]);
    
            }*/
          
        }
            
      }
    
      public removeReveal(event: React.MouseEvent<HTMLElement, MouseEvent>):void {
        if (!(/Mobi|Android/i.test(navigator.userAgent))) {
    
            const target = (event.target  || event.currentTarget) as HTMLElement;
            this.clearEffect(target);
        }
      }


      private drawEffect(element: HTMLElement, x: number, y: number, lightColor: string, gradientSize: number, cssLightEffect: string = ''):void {
        let lightBg;
        if (cssLightEffect === '') {
            lightBg = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, ${lightColor}, ${getComputedStyle(document.documentElement, null).getPropertyValue('--color-reveal-highlight-center')}`;
        } else {
            lightBg = cssLightEffect;
        }
        element.style.backgroundImage = lightBg;

    }

    private clearEffect(element: HTMLElement):void {

        element.style.backgroundImage = 'none';

    }
    
}
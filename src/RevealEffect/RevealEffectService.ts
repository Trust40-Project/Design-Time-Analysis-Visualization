/**
 * A reveal effect service is responsible to add light effects on elements that tell it to when hovering over them.
 * @author Malte Reimann
 */
export class RevealEffectService{

    /**
     * The borders that have registered to add reveal effect to.
     */
    private borders: HTMLElement[] = [];

  
    /**
     * Registers an element that wants to receive the border reveal effect.
     * @param borderToAdd for displaying reveal effect on.
     */
    public addBorderElement(borderToAdd: HTMLElement):void{
        if(!this.borders.includes(borderToAdd)){
                    this.borders.push(borderToAdd);

        }
    }

    /**
     * Unregisters a previously registered element that does not want to receive the reveal effect anymore.
     * @param borderToRemove the reveal effect from.
     */
    public removeBorderElement(borderToRemove: HTMLElement):void{
        const index = this.borders.indexOf(borderToRemove);
        if(index > -1){
            this.borders.splice(index, 1);
        }
    }

    /**
     * Displays the reveal effect immediately on a certain element.
     * Itended to be used with mouse move event on the element to add the reveal effect to.
     * @param event of the target to display reveal highlight at.
     */
    public addRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>):void {
        if (!(/Mobi|Android/i.test(navigator.userAgent))) {
            var target = (event.target || event.currentTarget) as HTMLElement;
    
    
            let x = event.pageX - target.getBoundingClientRect().left - window.scrollX;
          let y = event.pageY - target.getBoundingClientRect().top - window.scrollY;
          
            this.drawEffect(target, x, y, getComputedStyle(document.documentElement, null).getPropertyValue('--color-reveal-highlight'), 80);
    
           
        }
       }

       /**
        * Displays the border reveal effect on all applicable registered borders.
        * @param event that is the reason to display the border reveal effect.
        */
    public drawBorderRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>):void {
        if (!(/Mobi|Android/i.test(navigator.userAgent))) {
            for (var i = 0; i < this.borders.length; i++) {
                const x = event.pageX - this.borders[i].getBoundingClientRect().left - window.scrollX;
                const y = event.pageY - this.borders[i].getBoundingClientRect().top - window.scrollY;
                if (this.isIntersected(this.borders[i], event.clientX, event.clientY, 80)) {
        
                  this.drawEffect(this.borders[i], x, y, getComputedStyle(document.documentElement, null).getPropertyValue('--color-reveal-highlight-border'), 80);
        
                }
        
                else {
        
                  this.clearEffect(this.borders[i]);
        
                }
              }
          
        }
            
      }

      /**
       * Removes the reveal effect from all registered border elements.
       * @param event that is the reason to remove the border reveal effect.
       */
      public removeBorderRevealHighlight(event: React.MouseEvent<HTMLElement, MouseEvent>):void {
        if (!(/Mobi|Android/i.test(navigator.userAgent))) {
    
          for (var i = 0; i < this.borders.length; i++) {
            this.clearEffect(this.borders[i]);
          }
        }
      }
    
    
      /**
       * Removes the reveal effect immediately from a certain element.
       * Supposed to be used with mouse leave event.
       * @param event of the target to remove the reveal effect from.
       */
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


    private isIntersected(element: HTMLElement, cursor_x:number, cursor_y: number, gradientSize:number): boolean {

        const cursor_area = {
            left: cursor_x - gradientSize,
            right: cursor_x + gradientSize,
            top: cursor_y - gradientSize,
            bottom: cursor_y + gradientSize
        }
  
  
  
      const el_area = {
          left: element.getBoundingClientRect().left,
          right: element.getBoundingClientRect().right,
          top: element.getBoundingClientRect().top,
          bottom: element.getBoundingClientRect().bottom
  
      }
  
  
  
      function intersectRect(r1: Rectangle, r2:Rectangle) {
          return !(
              r2.left > r1.right ||
              r2.right < r1.left ||
              r2.top > r1.bottom ||
              r2.bottom < r1.top
          )
      }
  
      const result = intersectRect(cursor_area, el_area)
      return result
  
      }
    
}

type Rectangle ={
    left:number,
    right:number,
    top:number,
    bottom: number
}
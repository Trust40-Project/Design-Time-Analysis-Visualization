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
}
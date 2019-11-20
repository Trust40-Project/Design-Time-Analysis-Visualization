import React from 'react';
import './RevealEffect.css';

type RevealEffectProps ={
    childrenToRender: JSX.Element[],
}

export interface IRevealChild{
    onClickRipple?: (event: React.MouseEvent<Element, MouseEvent>) => void
}
export class RevealEffect extends React.Component<RevealEffectProps>{

    constructor(props: RevealEffectProps){
        super(props);
        this.handleClickRipple = this.handleClickRipple.bind(this);
    }
    handleClickRipple(event: React.MouseEvent<Element, MouseEvent>): void{
        console.log("ripple");
        var target = (event.target||event.currentTarget) as Element;
        console.dir(target);

        var circle = document.createElement('div');

        target.appendChild(circle);

        var d = Math.max(target.clientWidth, target.clientHeight);

        circle.style.width = circle.style.height = d + 'px';

        var rect = target.getBoundingClientRect();

        circle.style.left = event.clientX - rect.left - d / 2 +'px';
        circle.style.top = event.clientY - rect.top - d / 2 + 'px';
        circle.classList.add('ripple');

        window.setTimeout(function () {
            circle.remove();
        }, 800);
    }

    render(){
        const children = this.props.childrenToRender;
        const childrenToRender:JSX.Element[] = [];
        for (const child of children) {
            
          childrenToRender.push(React.cloneElement(child, {onClickRipple: this.handleClickRipple}));
        }
        return childrenToRender;
    }
}
import { GenerateView, rangeOfLoading } from "./app";
import { pokemonCollect } from "./generateToDOM";
export enum MenuItem {TYPE='type', GENERAL='general', COLOR='color', GAME='game'};


export class MenuItemEffect{
    constructor(element: string){
        const coverElement = document.querySelector(`.coverMouse__${element}`)! as HTMLDivElement;

        if(element === 'general'){
            window.addEventListener('keyup', function(e){
                if(e.which === 27){
                document.querySelector('.coverMouse')?.classList.toggle('coverMouse--showMouse')
                }
            })
        }

        coverElement.addEventListener('mouseover', ()=> this.hoverEffect(element,'over'));
        coverElement.addEventListener('mouseleave', ()=> this.hoverEffect(element, 'leave'));
        coverElement.addEventListener('click', ()=> this.clickEffect(element));
    }

    clearPokemonSectionBeforeGenerate = (element:string):void =>{
        const pokemonSection = document.querySelector(".pokemon")! as HTMLElement;
        const typesSection = document.querySelector(".sortType__container")! as HTMLElement;
        window.removeEventListener('scroll', GenerateView.scrollFeature, { capture: false });

        if(element === MenuItem.GENERAL){
            pokemonSection.innerHTML = "";
        }else{
            pokemonSection.innerHTML = "<p class='pokemon__dummyText'>There is nothing to display for the moment</p>";
        }
        typesSection.innerHTML = "";
        rangeOfLoading.from = 0;
        rangeOfLoading.type = element;
        pokemonCollect.length = 0;
    }

    clickEffect = (element:string) => {
        const navElement = [...document.querySelectorAll(`.nav__option`)!];
        const nav = document.querySelector('.nav')! as HTMLDivElement;
        const navWrapper = document.querySelector(".navWrapper")! as HTMLDivElement;
        const navLine = document.querySelector('.nav__line')! as HTMLDivElement;
        const navCircle = document.querySelector('.circle')! as HTMLDivElement;
        const navInnerCircle = document.querySelector('.circle__innerCircle')! as HTMLDivElement;
        const coverMouse = document.querySelector('.coverMouse')! as HTMLDivElement;
        const pokedexSection = document.querySelector(".pokedex")! as HTMLElement;
        const cover = document.querySelector(".cover")! as HTMLElement;

        if(coverMouse.id !== 'minimalized'){
            this.hideNavElements(element, navElement ,nav, navCircle, navInnerCircle, navLine, navWrapper, coverMouse, pokedexSection, cover)
        }else{
            this.showNavElements(pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement, cover);
        }
    }

    hideNavElements = (element:string, navElement: Element[],nav: HTMLElement,navCircle: HTMLElement,navInnerCircle: HTMLElement,navLine: HTMLElement,navWrapper: HTMLElement,coverMouse: HTMLElement,pokedexSection: HTMLElement, cover:HTMLElement) => {
        navElement.forEach((ele)=>{
            ele.classList.add("nav__option--hide");
        })
        setTimeout(() => {
            nav.classList.add("nav--hide");
            navCircle.classList.add('circle--hide');
            navInnerCircle.classList.add('circle__innerCircle--hide');
            navLine.classList.add("nav__line--hide")
        }, 500);

        setTimeout(() => {
            navWrapper.classList.add('navWrapper--hide');
            coverMouse.classList.add('coverMouse--hide');
            pokedexSection.classList.add('pokedex--showIt');
            coverMouse.id = 'minimalized';
            cover.classList.add('cover--lowerPosition')
        }, 750);

        
        //Do this with every click in nav element
            this.clearPokemonSectionBeforeGenerate(element);
             const loadMoreButton = document.querySelector(".pokemonSection__loadMore")! as HTMLButtonElement;

            if(element === MenuItem.GENERAL){
                loadMoreButton.classList.remove("pokemonSection__loadMore--disable");

            }else{
                loadMoreButton.classList.add("pokemonSection__loadMore--disable");
            }

            GenerateView.initialGenerate(element);
            document.querySelector('.escape')?.classList.add('escape--disable')
    }

    showNavElements = (pokedexSection: HTMLElement,navWrapper: HTMLElement,coverMouse: HTMLElement,nav: HTMLElement,navCircle: HTMLElement,navInnerCircle: HTMLElement,navLine: HTMLElement,navElement:Element[], cover:HTMLElement) => {
        document.querySelector('.nav__game')!.classList.remove(`nav__game--active`);
        document.querySelector('.nav__general')!.classList.remove(`nav__general--active`);
        document.querySelector('.nav__type')!.classList.remove(`nav__type--active`);
        document.querySelector('.nav__color')!.classList.remove(`nav__color--active`);
        pokedexSection.classList.remove('pokedex--showIt');
        navWrapper.classList.remove('navWrapper--hide');
        coverMouse.classList.remove('coverMouse--hide');
        cover.classList.remove('cover--lowerPosition')
        cover.style.backgroundColor = "rgba(0,0,0,0.1)"
        coverMouse.id = "";

        setTimeout(() => {
            nav.classList.remove("nav--hide", 'nav--active');
            navCircle.classList.remove('circle--hide');
            navInnerCircle.classList.remove('circle__innerCircle--hide', 'circle__innerCircle--active');
            navLine.classList.remove("nav__line--hide", 'nav__line--active')
        }, 500);

        setTimeout(() => {
            navElement.forEach((ele)=>{
                ele.classList.remove("nav__option--hide");
            })
        }, 750);
        const detailsElement = document.querySelector('.details')! as HTMLElement;
        detailsElement.classList.remove('details--onPosition');
        document.body.style.overflow = 'auto';
        document.querySelector('.escape')?.classList.remove('escape--disable')
    }

    hoverEffect = (element:string, eventType:string): void => {
        const navElement = document.querySelector(`.nav__${element}`)! as HTMLDivElement;
        const coverMouse = document.querySelector('.coverMouse')! as HTMLDivElement;

        if(coverMouse.id !== 'minimalized'){
            if(eventType === 'over'){
                navElement.classList.add(`nav__${element}--active`);
            }
            
            if(eventType === 'leave'){
                navElement.classList.remove(`nav__${element}--active`);
            }
        }else {
            const nav = document.querySelector('.nav')! as HTMLDivElement;
            const navLine = document.querySelector('.nav__line')! as HTMLDivElement;
            const navInnerCircle = document.querySelector('.circle__innerCircle')! as HTMLDivElement;

            if(eventType === 'over'){
                nav.classList.add(`nav--active`);
                navLine.classList.add('nav__line--active');
                navInnerCircle.classList.add('circle__innerCircle--active');
            }
            
            if(eventType === 'leave'){
                nav.classList.remove(`nav--active`);
                navLine.classList.remove('nav__line--active');
                navInnerCircle.classList.remove('circle__innerCircle--active');
            }
        }
        
    }
}
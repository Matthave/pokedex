import {GenerateView, rangeOfLoading, currentGeneratedPokemon} from "./app";
export enum MenuItem {TYPE='type', GENERAL='general', COLOR='color', GAME='game'};


export class MenuItemEffect{
    constructor(element: string){
        const coverElement = document.querySelector(`.coverMouse__${element}`)! as HTMLDivElement;
 
        coverElement.addEventListener('mouseover', ()=> this.hoverEffect(element,'over'));
        coverElement.addEventListener('mouseleave', ()=> this.hoverEffect(element, 'leave'));
        coverElement.addEventListener('click', ()=> this.clickEffect(element));

    }

    clearPokemonSectionBeforeGenerate = ():void =>{
        const pokemonSection = document.querySelector(".pokemon")! as HTMLElement;
        const typesSection = document.querySelector(".sortType__container")! as HTMLElement;
        typesSection.innerHTML = "";
        pokemonSection.innerHTML = "";
        rangeOfLoading.from = 0;
        currentGeneratedPokemon.length = 0;


        const loadBtn = document.querySelector(".pokemonSection__loadMore")! as HTMLButtonElement;
        loadBtn.classList.remove('pokemonSection__loadMore--disable')
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

        if(coverMouse.id !== 'minimalized'){
            this.hideNavElements(element, navElement ,nav, navCircle, navInnerCircle, navLine, navWrapper, coverMouse, pokedexSection)
        }else{
            this.showNavElements(pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement);
        }
    }


    hideNavElements = (element:string, navElement: Element[],nav: HTMLElement,navCircle: HTMLElement,navInnerCircle: HTMLElement,navLine: HTMLElement,navWrapper: HTMLElement,coverMouse: HTMLElement,pokedexSection: HTMLElement) => {
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
            coverMouse.id = 'minimalized'
        }, 750);
        
            GenerateView.initialGenerate(element);
    }

    showNavElements = (pokedexSection: HTMLElement,navWrapper: HTMLElement,coverMouse: HTMLElement,nav: HTMLElement,navCircle: HTMLElement,navInnerCircle: HTMLElement,navLine: HTMLElement,navElement:Element[]) => {
        document.querySelector('.nav__game')!.classList.remove(`nav__game--active`);
        document.querySelector('.nav__general')!.classList.remove(`nav__general--active`);
        document.querySelector('.nav__type')!.classList.remove(`nav__type--active`);
        document.querySelector('.nav__color')!.classList.remove(`nav__color--active`);
        pokedexSection.classList.remove('pokedex--showIt');
        navWrapper.classList.remove('navWrapper--hide');
        coverMouse.classList.remove('coverMouse--hide');
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

        this.clearPokemonSectionBeforeGenerate();
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
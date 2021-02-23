class PokemonGet{
    private readonly generalAPI: string;
    constructor(){
        this.generalAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118"
        this.fetchInit();
    }

    fetchInit = () => {
        fetch(this.generalAPI)
        .then(response => response.json())
        .then(data => console.log(data));
    }
}


const getPokemon = new PokemonGet();

enum MenuItem {TYPE='type', GENERAL='general', REGION='region', GAME='game'};


class MenuItemEffect{
    constructor(element: string){
        const coverElement = document.querySelector(`.coverMouse__${element}`)! as HTMLDivElement;
        
        coverElement.addEventListener('mouseover', ()=> this.hoverEffect(element,'over'));
        coverElement.addEventListener('mouseleave', ()=> this.hoverEffect(element, 'leave'));
    }


    hoverEffect = (element:string, eventType:string): void => {
        const navElement = document.querySelector(`.nav__${element}`)! as HTMLDivElement;
        
        if(eventType === 'over'){
            navElement.classList.add(`nav__${element}--active`);
        }
        
        if(eventType === 'leave'){
            navElement.classList.remove(`nav__${element}--active`);
        }
    }
}


const menuItemOne = new MenuItemEffect(MenuItem.TYPE);
const menuItemTwo = new MenuItemEffect(MenuItem.GENERAL);
const menuItemThree = new MenuItemEffect(MenuItem.REGION);
const menuItemFour = new MenuItemEffect(MenuItem.GAME);
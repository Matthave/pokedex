import { MenuItemEffect, MenuItem } from './navigation';

interface GeneralApi{
    counts:number,
    next?:any,
    previous?:any,
    results:Element[]
}
let fetchedGeneral:GeneralApi;

export class PokemonGet{
    private readonly generalAPI: string;
    constructor(typeOfSort: string){
        this.generalAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118"


        fetch(this.generalAPI)
        .then(response => response.json())
        .then(date => this.mapDate(date));

        this.setTitle(typeOfSort);
    }

    setTitle = (type:string) => {
        const sectionTitle = document.querySelector(".sortType__title")!;
        sectionTitle.textContent = type;
    }

    mapDate = (date: GeneralApi) => {
        fetchedGeneral=date;

        const pokemonSection = document.querySelector('.pokemon')! as HTMLElement;
        
        date.results.forEach((pokemon: any, index:number)=>{
            const newCard = document.createElement('div');
            const pokemonId = document.createElement('p');
            newCard.setAttribute("class","pokemon__card");
            newCard.textContent = pokemon.name;

            if(index < 10) pokemonId.textContent = `#00${index + 1}`;
            if(index > 10 && index < 100) pokemonId.textContent = `#0${index + 1}`;
            if(index >= 100) pokemonId.textContent = `#${index + 1}`;

            newCard.appendChild(pokemonId);
            pokemonSection.appendChild(newCard);


            console.log(pokemon)

        })
    }

}


const menuItemOne = new MenuItemEffect(MenuItem.TYPE);
const menuItemTwo = new MenuItemEffect(MenuItem.GENERAL);
const menuItemThree = new MenuItemEffect(MenuItem.REGION);
const menuItemFour = new MenuItemEffect(MenuItem.GAME);
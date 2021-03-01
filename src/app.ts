import { PokemonGet } from "./fetchData";
import { MenuItemEffect, MenuItem } from './navigation';

export const rangeOfLoading = {
    from:0,
    howMany:12,
}

export class GenerateView{
    typeSort:string;
    constructor(typeOfSort:string){
        this.typeSort = typeOfSort;

        //Inicial addEventListener for loadMoreBtn
        const loadBtn = document.querySelector(".pokemonSection__loadMore")! as HTMLButtonElement;
        loadBtn.addEventListener('click', ()=> this.loadMorePokemon());
    }

        static initialGenerate = (typeOfSort: string) => {
            switch(typeOfSort){
                case MenuItem.TYPE:
                    new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                case MenuItem.GENERAL:
                    new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                case MenuItem.COLOR:
                    new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                case MenuItem.GAME:
                    new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                default:
                    new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
            }

            GenerateView.setTitle(typeOfSort);
        }

        loadMorePokemon = () => {
            rangeOfLoading.from = rangeOfLoading.from + 12;
            new PokemonGet(this.typeSort, rangeOfLoading.from, rangeOfLoading.howMany);
        }

        static setTitle = (type:string) => {
        const sectionTitle = document.querySelector(".sortType__title")!;
        sectionTitle.textContent = type;
    }
}

const menuItemOne = new MenuItemEffect(MenuItem.TYPE);
const menuItemTwo = new MenuItemEffect(MenuItem.GENERAL);
const menuItemThree = new MenuItemEffect(MenuItem.COLOR);
const menuItemFour = new MenuItemEffect(MenuItem.GAME);
const getView = new GenerateView('general');
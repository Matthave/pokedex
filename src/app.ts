import { PokemonGet } from "./fetchData";
import { MenuItemEffect, MenuItem } from './navigation';
import { GeneratePokemonToDOM } from "./generateToDOM";

export const rangeOfLoading = {
    from:0,
    howMany:12,
}

export let currentGeneratedPokemon:Element[] = [];

const menuItemOne = new MenuItemEffect(MenuItem.TYPE);
const menuItemTwo = new MenuItemEffect(MenuItem.GENERAL);
const menuItemThree = new MenuItemEffect(MenuItem.REGION);
const menuItemFour = new MenuItemEffect(MenuItem.GAME);


export class GenerateView{
    typeSort:string;
    constructor(typeOfSort:string){
        this.typeSort = typeOfSort;
        GenerateView.initialGenerate(typeOfSort);

        const loadBtn = document.querySelector(".pokemonSection__loadMore")! as HTMLButtonElement;
        loadBtn.addEventListener('click', ()=> this.loadMorePokemon());
    }

        static initialGenerate = (typeOfSort: string) => {
            switch(typeOfSort){
                case MenuItem.TYPE:
                    const getDataType = new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                case MenuItem.GENERAL:
                    const getDataGeneral = new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                case MenuItem.REGION:
                    const getDataRegion = new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                case MenuItem.GAME:
                    const getDataGame = new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
                break;
    
                default:
                    const getData = new PokemonGet(typeOfSort, rangeOfLoading.from, rangeOfLoading.howMany);
            }

            GenerateView.setTitle(typeOfSort);
        }

        loadMorePokemon = () => {
            rangeOfLoading.from = rangeOfLoading.from + 12;
            const getMoreData = new PokemonGet(this.typeSort, rangeOfLoading.from, rangeOfLoading.howMany);
        }

        static setTitle = (type:string) => {
        const sectionTitle = document.querySelector(".sortType__title")!;
        sectionTitle.textContent = type;
    }

        static sortData = (typeOfSort:string, eachPoke:any) => {
        //Sort all pokemoin and return a promise resolve 
        const pokemonArray:Element[] = [];
        pokemonArray.push(eachPoke);
        currentGeneratedPokemon.push(eachPoke);

        const promise: Promise<string> = new Promise((resolve, reject)=>{
            if(pokemonArray !== []){
                pokemonArray.sort(function (a:any, b:any) { return a.id - b.id });
               resolve('done')
            }
            }); 
            
            promise.then( data => {
                //If everything is ok, then
                if(data === 'done' && pokemonArray.length !== 0){
                    const generatePokemon = new GeneratePokemonToDOM(pokemonArray)
                }
            })
    }
}

const getView = new GenerateView('general');
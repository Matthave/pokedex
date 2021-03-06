import { PokemonGet } from "./fetchData";
import { MenuItemEffect, MenuItem } from './navigation';

export const rangeOfLoading = {
    from:0,
    howMany:12,
    type:""
}

export class GenerateView{
    typeSort:string;
    constructor(typeOfSort:string){
        this.typeSort = typeOfSort;

        //Inicial addEventListener for loadMoreBtn
        const loadBtn = document.querySelector(".pokemonSection__loadMore")! as HTMLButtonElement;
        loadBtn.addEventListener('click', ()=> this.loadMorePokemon());

        const closeDetails = document.querySelector('.details__closeBtn')! as HTMLElement;
        closeDetails.addEventListener('click', function(){
            const details = document.querySelector('.details')! as HTMLElement;
            const allStatsBar = [...document.querySelectorAll('.stats__bar')! as any];
            allStatsBar.forEach((ele)=>{
                ele.style.height = '0%';
            })
            document.body.style.overflow = 'auto';
            details.classList.remove('details--onPosition');
        })
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

                window.addEventListener('scroll', GenerateView.scrollFeature, { passive: true })
        }

        static scrollFeature = () => {
                 document.querySelector('.pokemonSection__loadMore')?.classList.add('pokemonSection__loadMore--disable');
                     const scrollHeight = window.scrollY;
                     if ((window.innerHeight + scrollHeight) >= document.body.scrollHeight) {
                         setTimeout(() => {
                             rangeOfLoading.from = rangeOfLoading.from + 12;
                             new PokemonGet('general', rangeOfLoading.from, rangeOfLoading.howMany);
                         }, 400);
                     }
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
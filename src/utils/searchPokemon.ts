import { GenerateView, rangeOfLoading} from "../app";
import { GeneratePokemonToDOM } from "../generateToDOM";

export class FilterPokemonCollect{
    constructor(){
        const input = document.querySelector('.form__input')! as HTMLInputElement;
       const searchButton = document.querySelector('.form__btn')! as HTMLButtonElement;
       if(searchButton) searchButton.addEventListener('click', ()=> FilterPokemonCollect.buttonClickHandler('click'));
       if(input) input.addEventListener('keyup', (e)=> FilterPokemonCollect.buttonClickHandler(e));
    }
    
    static buttonClickHandler = (e:any) => {
        const pokemonSection = document.querySelector(".pokemon")! as HTMLElement;
        const input = document.querySelector('.form__input')! as HTMLInputElement;
        const searchingElement = input.value;

        if(e === 'click' || e.which === 13){
            if(searchingElement !== ""){
                const API = `https://pokeapi.co/api/v2/pokemon/${searchingElement}`;
                fetch(API)
                .then(res => res.json())
                .then(pokemon => {
                    const loadMoreButton = document.querySelector(".pokemonSection__loadMore")! as HTMLButtonElement;
                    loadMoreButton.classList.add("pokemonSection__loadMore--disable");
    
                    const pokeArr = [];
                    pokeArr.push(pokemon);
                    rangeOfLoading.from = 0;
                    pokemonSection.innerHTML = "";
                    return new GeneratePokemonToDOM(pokeArr);
                })
                .catch(err => alert("It's no pokemon with name like that!"))
            }else{
                rangeOfLoading.from = 0;
                pokemonSection.innerHTML = "";
                GenerateView.initialGenerate('general');
            }
        }
    }
}
import {switchTypeForCoverFunc, switchForPokemonTypeFunc} from "./utils/switchType";
import { FilterPokemonCollect } from "./utils/searchPokemon";

export const pokemonCollect:Element[] = [];
export const pokemonCollectInGeneral:Element[] = [];

export class GeneratePokemonToDOM{
    constructor(allPokemon:Element[]){
            this.generatePokemonInDOM(allPokemon);
    }
//Here goes before prepared array of all pokemons (part one by one not all in one) DOM isn't clean here, so every part goes to the end of container
   generatePokemonInDOM = (allPokemon: Element[]) => {
        allPokemon.forEach((pokemon: any, index:number)=>{
                const newCard = document.createElement('div');
                const pokemonId = document.createElement('p');
                const pokemonName = document.createElement('p');
                const pokemonImg = document.createElement('img');
                const typeContainer = document.createElement('div');
                newCard.setAttribute("class","pokemon__card");
    
                pokemonName.setAttribute("class", "pokemon__name");
                pokemonName.textContent = pokemon.name;
                newCard.appendChild(pokemonName);
                pokemonId.setAttribute("class", 'pokemon__id');
    
                const pokemonImgUrl = pokemon?.sprites?.other['official-artwork']?.front_default;
                if(pokemonImgUrl ?? false){
                    pokemonImg.setAttribute("src", `${pokemonImgUrl}`);
                    pokemonImg.setAttribute("class","pokemon__img");
                    pokemonImg.setAttribute("loading","lazy");
                    newCard.appendChild(pokemonImg);
                }else{
                    pokemonImg.setAttribute("src", '/images/questionMark.svg');
                    pokemonImg.setAttribute("class","pokemon__questionMark");
                    newCard.appendChild(pokemonImg);
                }
    //Add ID of pokemon to every container into card
                if(pokemon.id < 10) pokemonId.textContent = `#00${pokemon.id}`;
                if(pokemon.id >= 10 && index < 100) pokemonId.textContent = `#0${pokemon.id}`;
                if(pokemon.id >= 100) pokemonId.textContent = `#${pokemon.id}`;

    //Add type or types of pokemon to every container into card
                    pokemon?.types?.forEach((ele:any)=>{
                        const pokemonType = document.createElement("p");
                        pokemonType.textContent = `${ele.type.name}`;

                        switchForPokemonTypeFunc(ele, pokemonType);

                        typeContainer.appendChild(pokemonType);
                    });
    
        //Get every of these created element and add it into newCard and next - newCard to the end of pokemonSection
                typeContainer.setAttribute("class","pokemon__typeContainer");
                newCard.appendChild(typeContainer);
                newCard.appendChild(pokemonId);
                newCard.setAttribute('id', `${pokemon.id}`);
                const pokemonSection = document.querySelector('.pokemon')! as HTMLElement;
                pokemonSection.insertAdjacentElement('beforeend', newCard);
        })
    }
}

interface EachResult{
    name?:string,
    url:string
}


export class SortPokemon{
    static sortAllPokemon = (eachPoke:any) =>{
        pokemonCollect.push(eachPoke);
        pokemonCollect.sort(function (a:any, b:any) { return a.id - b.id });

        pokemonCollectInGeneral.push(eachPoke);
        pokemonCollectInGeneral.sort(function (a:any, b:any) { return a.id - b.id });
    }
}

export class GenerateTypeToDOM {
    static generateTypesToDOM = (type:EachResult) => {
        if(type?.name && type?.name !== 'unknown' && type?.name !== 'shadow'){
            const sortSection = document.querySelector(".sortType__container")! as HTMLElement;
            const typeElement = document.createElement("div");
            typeElement.setAttribute("class", `sortType__${type?.name} sortType__type`)
            typeElement.addEventListener('click', function(e){
                const pokemonSection = document.querySelector(".pokemon")! as HTMLElement;
                switchTypeForCoverFunc(type);
                pokemonSection.innerHTML = "";

                fetch(type?.url)
                .then(res => res.json())
                .then(data => {
                   if(data.pokemon && Array.isArray(data.pokemon)){
                       const oneTypePokemon = [...data.pokemon];
                        oneTypePokemon.forEach((ele, index)=>{
                            fetch(ele.pokemon.url)
                            .then(response => response.json())
                            .then(eachPoke =>{

                                SortPokemon.sortAllPokemon(eachPoke);
                                if(oneTypePokemon.length === index + 1){
                                    new GeneratePokemonToDOM(pokemonCollect)
                                    pokemonCollect.length = 0;
                                }

                            })
                        })
                   }
                })
            })
    
            typeElement.textContent = type?.name;
         sortSection.appendChild(typeElement);
        }
    }
}

export class GenerateColorToDOM{
   static generateColorsToDOM = (color:EachResult) =>{
    if(color?.name){
    const sortSection = document.querySelector(".sortType__container")! as HTMLElement;
    const typeElement = document.createElement("div");
    typeElement.setAttribute("class", `sortType__${color?.name} sortType__type`)
    typeElement.addEventListener('click', function(e){
        const pokemonSection = document.querySelector(".pokemon")! as HTMLElement;
        pokemonSection.innerHTML = "";

        fetch(color?.url)
        .then(res => res.json())
        .then(data => {
           if(data.pokemon_species && Array.isArray(data.pokemon_species)){
               const oneTypePokemon = [...data.pokemon_species];

                oneTypePokemon.forEach((ele, index)=>{
                    const modificateURL = GenerateColorToDOM.modificateUrl(ele.url);
                    fetch(modificateURL)
                    .then(response => response.json())
                    .then(eachPoke =>{

                        SortPokemon.sortAllPokemon(eachPoke);
                        if(oneTypePokemon.length === index + 1){
                            new GeneratePokemonToDOM(pokemonCollect)
                            pokemonCollect.length = 0;
                        }
                    })
                })
           }
        })
    });
    typeElement.textContent = color?.name;
    sortSection.appendChild(typeElement);
    }
}


static modificateUrl = (url:string):string => {
const splitUrl = url.split("/");
return `${splitUrl[0]}//${splitUrl[2]}/${splitUrl[3]}/${splitUrl[4]}/pokemon/${splitUrl[6]}`;
}
}

export class GenerateGeneralToDOM {
    
    static generateGeneralToDOM = (type:EachResult, index:number) => {
        if(type?.name){
                fetch(type?.url)
                .then(res => res.json())
                .then(eachPoke => {
                    SortPokemon.sortAllPokemon(eachPoke);
                    if(index === 11){
                        const sortSection = document.querySelector(".sortType__container")! as HTMLElement;
                        
                        if(sortSection.childElementCount === 0){
                            const searchTemplate = document.querySelector(".searchTemplate")! as HTMLTemplateElement;
                            const importedNode = document.importNode(searchTemplate.content, true);
                            const putThisElement = importedNode.firstElementChild as HTMLDivElement;
                            sortSection.insertAdjacentElement("afterbegin", putThisElement);
                            new FilterPokemonCollect();
                        }

                    
                        new GeneratePokemonToDOM(pokemonCollect);
                        pokemonCollect.length = 0;
                    }
                })
        }
    }
}
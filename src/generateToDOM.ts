import {GenerateView} from "./app"
enum TypeOfPokemon {
    FIRE= "fire",
    WATER= "water",
    GRASS= "grass",
    POISON= "poison",
    BUG= "bug",
    ELECTRIC= "electric",
    NORMAL= "normal",
    FLYING= "flying",
    ROCK= "rock",
    GROUND= "ground",
    PSYCHIC = "psychic",
    FIGHTING = "fighting",
    DRAGON = "dragon",
    DARK = "dark",
    FAIRY = "fairy",
    GHOST = "ghost",
    ICE = "ice",
    STEEL = "steel",
};

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
                    pokemonImg.setAttribute("src", '../images/questionMark.svg');
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
                        switch(ele.type.name){
                            case TypeOfPokemon.GRASS:
                                pokemonType.setAttribute("class",  `${TypeOfPokemon.GRASS} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.WATER:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.WATER} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.FIRE:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.FIRE} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.BUG:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.BUG} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.POISON:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.POISON} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.ELECTRIC:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.ELECTRIC} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.NORMAL:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.NORMAL} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.FLYING:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.FLYING} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.ROCK:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.ROCK} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.GROUND:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.GROUND} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.PSYCHIC:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.PSYCHIC} pokemon__type`)
                            break;
                            
                            case TypeOfPokemon.FIGHTING:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.FIGHTING} pokemon__type`)
                            break;
                            
                            case TypeOfPokemon.DRAGON:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.DRAGON} pokemon__type`)
                            break;
                            
                            case TypeOfPokemon.DARK:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.DARK} pokemon__type`)
                            break;
                            
                            case TypeOfPokemon.FAIRY:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.FAIRY} pokemon__type`)
                            break;
                            
                            case TypeOfPokemon.GHOST:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.GHOST} pokemon__type`)
                            break;
    
                            case TypeOfPokemon.ICE:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.ICE} pokemon__type`)
                            break;
                            
                            case TypeOfPokemon.STEEL:
                                pokemonType.setAttribute("class", `${TypeOfPokemon.STEEL} pokemon__type`)
                            break;
                            default:
                                return;
                        }
    
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

export class GenerateTypeToDOM {
    static generateTypesToDOM = (type:EachResult) => {
        if(type?.name && type.name !== 'unknown' && type?.name !== 'shadow'){
            const container = document.querySelector(".sortType__container")! as HTMLElement;
            const typeElement = document.createElement("div");
            typeElement.setAttribute("class", `sortType__${type?.name} sortType__type`)
            typeElement.addEventListener('click', function(e){
                const pokemonSection = document.querySelector(".pokemon")! as HTMLElement;
                pokemonSection.innerHTML = "";
                
                fetch(type?.url)
                .then(res => res.json())
                .then(data => {
                   if(data.pokemon && Array.isArray(data.pokemon)){
                       const oneTypePokemon = [...data.pokemon];
                        oneTypePokemon.forEach((ele)=>{
                            fetch(ele.pokemon.url)
                            .then(response => response.json())
                            .then(eachPoke =>{
                                GenerateView.sortData('type', eachPoke);
                            })
                        })
                   }
                })
            })
    
            typeElement.textContent = type?.name;
            container.appendChild(typeElement);
        }
    }
}


export class GenerateColorToDOM{
   static generateColorsToDOM = (color:EachResult) =>{
    if(color?.name){
    const container = document.querySelector(".sortType__container")! as HTMLElement;
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

                oneTypePokemon.forEach((ele)=>{
                    const modificateURL = GenerateColorToDOM.modificateUrl(ele.url);
                    fetch(modificateURL)
                    .then(response => response.json())
                    .then(eachPoke =>{
                        GenerateView.sortData('color', eachPoke);
                    })
                })
           }
        })
    });
    typeElement.textContent = color?.name;
    container.appendChild(typeElement);
    }
}


static modificateUrl = (url:string):string => {
const splitUrl = url.split("/");
return `${splitUrl[0]}//${splitUrl[2]}/${splitUrl[3]}/${splitUrl[4]}/pokemon/${splitUrl[6]}`;
}
}
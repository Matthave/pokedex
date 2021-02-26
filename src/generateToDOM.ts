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

   generatePokemonInDOM = (allPokemon: Element[]) => {
        allPokemon.forEach((pokemon: any, index:number)=>{
            if(index < 12){
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
    
                if(pokemon.id < 10) pokemonId.textContent = `#00${pokemon.id}`;
                if(pokemon.id >= 10 && index < 100) pokemonId.textContent = `#0${pokemon.id}`;
                if(pokemon.id >= 100) pokemonId.textContent = `#${pokemon.id}`;
    
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
    
                typeContainer.setAttribute("class","pokemon__typeContainer");
                newCard.appendChild(typeContainer);
                newCard.appendChild(pokemonId);
                newCard.setAttribute('id', `${pokemon.id}`);
                const pokemonSection = document.querySelector('.pokemon')! as HTMLElement;
                pokemonSection.insertAdjacentElement('beforeend', newCard);

            }
        })
    }
}
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

interface EachResult{
    name?:string,
    url:string
}

export function switchTypeForCoverFunc(type:EachResult){
    const coverElement = document.querySelector(".cover")! as HTMLDivElement;
    const opacityLevel = '0.25';

    switch(type.name){
        case TypeOfPokemon.GRASS:
            coverElement.style.backgroundColor = `rgba(155,204,80,${opacityLevel})`
        break;

        case TypeOfPokemon.WATER:
            coverElement.style.backgroundColor = `rgba(69,146,196,${opacityLevel})`
        break;

        case TypeOfPokemon.FIRE:
            coverElement.style.backgroundColor = `rgba(253,125,36,${opacityLevel})`
        break;

        case TypeOfPokemon.BUG:
            coverElement.style.backgroundColor = `rgba(115,160,64,${opacityLevel})`
        break;

        case TypeOfPokemon.POISON:
            coverElement.style.backgroundColor = `rgb(186,128,202,${opacityLevel})`
        break;

        case TypeOfPokemon.ELECTRIC:
            coverElement.style.backgroundColor = `rgba(238,213,53,${opacityLevel})`
        break;

        case TypeOfPokemon.NORMAL:
            coverElement.style.backgroundColor = `rgba(165,173,176,${opacityLevel})`
        break;

        case TypeOfPokemon.FLYING:
            coverElement.style.backgroundColor = `rgba(181,222,233,${opacityLevel})`
        break;

        case TypeOfPokemon.ROCK:
            coverElement.style.backgroundColor = `rgba(88,83,79,${opacityLevel})`
        break;

        case TypeOfPokemon.GROUND:
            coverElement.style.backgroundColor = `rgba(171,152,66,${opacityLevel})`
        break;

        case TypeOfPokemon.PSYCHIC:
            coverElement.style.backgroundColor = `rgba(244,103,186,${opacityLevel})`
        break;
        
        case TypeOfPokemon.FIGHTING:
            coverElement.style.backgroundColor = `rgba(213,103,35,${opacityLevel})`
        break;
        
        case TypeOfPokemon.DRAGON:
            coverElement.style.backgroundColor = `rgba(83,164,207,${opacityLevel})`
        break;
        
        case TypeOfPokemon.DARK:
            coverElement.style.backgroundColor = `rgba(112,112,112,${opacityLevel})`
        break;
        
        case TypeOfPokemon.FAIRY:
            coverElement.style.backgroundColor = `rgba(253,185,233,${opacityLevel})`
        break;
        
        case TypeOfPokemon.GHOST:
            coverElement.style.backgroundColor = `rgba(123,98,163,${opacityLevel})`
        break;

        case TypeOfPokemon.ICE:
            coverElement.style.backgroundColor = `rgba(81,196,231,${opacityLevel})`
        break;
        
        case TypeOfPokemon.STEEL:
            coverElement.style.backgroundColor = `rgba(158,183,184,${opacityLevel})`
        break;
        default:
            return;
    }
}


export function switchForPokemonTypeFunc(ele:any, pokemonType:HTMLElement){
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
}
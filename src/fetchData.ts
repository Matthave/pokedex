import {GenerateView} from "./app";

interface EachPokemon{
    name:string,
    url:string
}

export class PokemonGet{
    public generalAPI: string;
    public allPokemon: Element[];
    constructor(typeOfSort:string, from:number, howMany:number){
        this.generalAPI = `https://pokeapi.co/api/v2/pokemon/?offset=${from}&limit=${howMany}`;
        this.allPokemon = [];

        //Get all pokemon except this url's that don't work and fetch every single url pokemon, push it to the array and send to sortData function
         fetch(this.generalAPI)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((pokemon:EachPokemon)=>{
                if(
                 pokemon.url === 'https://pokeapi.co/api/v2/pokemon/272/' ||
                 pokemon.url === 'https://pokeapi.co/api/v2/pokemon/375/' || 
                 pokemon.url === 'https://pokeapi.co/api/v2/pokemon/582/' || 
                 pokemon.url === 'https://pokeapi.co/api/v2/pokemon/787/' || 
                 pokemon.url === 'https://pokeapi.co/api/v2/pokemon/881/'
                 ){
                return;
                }else{
                    fetch(pokemon.url)
                    .then(res => res.json())
                    .then(eachPoke => {
                        this.allPokemon.push(eachPoke);
                        GenerateView.sortData(typeOfSort, eachPoke);
                    } )
                    .catch((err)=>{
                        console.log("ERROR", err)
                    })
                }
            })
        })
    }
}

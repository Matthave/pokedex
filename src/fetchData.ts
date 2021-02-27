import {GenerateView} from "./app";
import {MenuItem} from "./navigation";
import {GenerateTypeToDOM, GenerateColorToDOM} from "./generateToDOM"

interface EachResult{
    name?:string,
    url:string
}

export class PokemonGet{
    public generalAPI: string;
    public typeAPI:string;
    public colorAPI: string;
    public allPokemon: Element[];
    public allTypes: Element[];
    constructor(typeOfSort:string, from:number, howMany:number){
        this.typeAPI = `https://pokeapi.co/api/v2/type/`;
        this.generalAPI = `https://pokeapi.co/api/v2/pokemon/?offset=${from}&limit=${howMany}`;
        this.colorAPI = `https://pokeapi.co/api/v2/pokemon-color/`;
        this.allPokemon = [];
        this.allTypes = [];

        switch(typeOfSort){
            case MenuItem.TYPE:
               fetch(this.typeAPI)
               .then(response => response.json())
               .then(data => {
                data.results.forEach((type:EachResult)=>{
                    GenerateTypeToDOM.generateTypesToDOM(type)
                })
               })
            break;

            case MenuItem.GENERAL:
                //Get all pokemon except this url's that don't work and fetch every single url pokemon, push it to the array and send to sortData function
                fetch(this.generalAPI)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach((pokemon:EachResult)=>{
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
            break;

            case MenuItem.COLOR:
                fetch(this.colorAPI)
                .then(response => response.json())
                .then(data => {
                 data.results.forEach((color:EachResult)=>{
                    GenerateColorToDOM.generateColorsToDOM(color)
                 })
                })
            break;

            case MenuItem.GAME:
                console.log('game')
            break;

            default:
                fetch(this.generalAPI)
                .then(response => response.json())
                .then(data => {
                    data.results.forEach((pokemon:EachResult)=>{
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
}

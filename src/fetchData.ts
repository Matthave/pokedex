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
    constructor(typeOfSort:string, from:number, howMany:number){
        this.typeAPI = `https://pokeapi.co/api/v2/type/`;
        this.generalAPI = `https://pokeapi.co/api/v2/pokemon/?offset=${from}&limit=${howMany}`;
        this.colorAPI = `https://pokeapi.co/api/v2/pokemon-color/`;
        this.allPokemon = [];

        switch(typeOfSort){
            case MenuItem.TYPE:
                this.getColorOrTypeFunc(this.typeAPI, MenuItem.TYPE);
            break;

            case MenuItem.GENERAL:
                //Get pokemon and fetch every single url pokemon, push it to the array and send to sortData function
                this.getGeneralFunc(this.generalAPI, typeOfSort);

            break;

            case MenuItem.COLOR:
                this.getColorOrTypeFunc(this.colorAPI, MenuItem.COLOR);
            break;

            case MenuItem.GAME:

            break;

            default:
                this.getGeneralFunc(this.generalAPI, typeOfSort);
        }
    }

    getGeneralFunc = (API:string, typeOfSort:string) =>{
        fetch(API)
        .then(response => response.json())
        .then(data => {
            data.results.forEach((pokemon:EachResult)=>{
                    fetch(pokemon.url)
                    .then(res => res.json())
                    .then(eachPoke => {
                        this.allPokemon.push(eachPoke);
                        GenerateView.sortData(typeOfSort, eachPoke);
                    } )
                    .catch((err)=>{
                        console.log("ERROR", err)
                    })
            })
        })
    }

    getColorOrTypeFunc = (API:string, APIType:string) => {
        fetch(API)
        .then(response => response.json())
        .then(data => {
         data.results.forEach((type:EachResult)=>{
             if(APIType === MenuItem.TYPE){
                GenerateTypeToDOM.generateTypesToDOM(type)
             }else if(APIType === MenuItem.COLOR){
                GenerateColorToDOM.generateColorsToDOM(type)
             }
         })
        })
        .catch((err)=>{
         console.log("ERROR", err)
     })
    }
}

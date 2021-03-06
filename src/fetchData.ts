import {MenuItem} from "./navigation";
import {GenerateTypeToDOM, GenerateColorToDOM, GenerateGeneralToDOM} from "./generateToDOM"

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

        // //TEST
        //     fetch(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=898`)
        //     .then(res => res.json())
        //     .then(data => {
        //         const resultsCopy = [...data.results];
        //         resultsCopy.forEach((ele)=>{
        //             fetch(ele.url)
        //             .then(res => res.json())
        //             .then(eachPoke => {
        //                 pokemonCollect.push(eachPoke);
        //                 pokemonCollect.sort(function (a:any, b:any) { return b.stats[5].base_stat - a.stats[5].base_stat });
        //                 console.log(pokemonCollect)
        //             })
        //         })
        //     })
        // //TEST

        switch(typeOfSort){
            case MenuItem.TYPE:
                this.getColorOrTypeFunc(this.typeAPI, MenuItem.TYPE);
            break;

            case MenuItem.GENERAL:
                //Get pokemon and fetch every single url pokemon, push it to the array and send to sortData function
                this.getColorOrTypeFunc(this.generalAPI, MenuItem.GENERAL);

            break;

            case MenuItem.COLOR:
                this.getColorOrTypeFunc(this.colorAPI, MenuItem.COLOR);
            break;

            case MenuItem.GAME:

            break;

            default:
                this.getColorOrTypeFunc(this.generalAPI, MenuItem.GENERAL);
        }
    }

    // getGeneralFunc = (API:string, typeOfSort:string) =>{
    //     fetch(API)
    //     .then(response => response.json())
    //     .then(data => {
    //         data.results.forEach((pokemon:EachResult)=>{
    //                 fetch(pokemon.url)
    //                 .then(res => res.json())
    //                 .then(eachPoke => {
    //                     this.allPokemon.push(eachPoke);
    //                     GenerateView.sortData(typeOfSort, eachPoke);
    //                 } )
    //                 .catch((err)=>{
    //                     console.log("ERROR", err)
    //                 })
    //         })
    //     })
    // }

    getColorOrTypeFunc = (API:string, APIType:string) => {
        fetch(API)
        .then(response => response.json())
        .then(data => {
         data.results.forEach((type:EachResult, index:number)=>{
             if(APIType === MenuItem.TYPE){
                GenerateTypeToDOM.generateTypesToDOM(type)
             }else if(APIType === MenuItem.COLOR){
                GenerateColorToDOM.generateColorsToDOM(type)
             }else if (APIType === MenuItem.GENERAL){
                GenerateGeneralToDOM.generateGeneralToDOM(type, index)
             }
         })
        })
        .catch((err)=>{
         console.log("ERROR", err)
     })
    }
}

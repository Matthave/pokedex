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
                newCard.addEventListener('click', ()=> this.pokemonDetails(pokemon))


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

                        switchForPokemonTypeFunc(ele, pokemonType, 'pokemon__type');

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


    pokemonDetails = (pokemon:any) => {
        console.log(pokemon);
        document.body.style.overflow = 'hidden';
        const detailsElement = document.querySelector('.details')! as HTMLElement;
        if(detailsElement){
            detailsElement.classList.add('details--onPosition');

            const nameContent = document.querySelector(".details__pokemonName")! as HTMLDivElement;
            const imgContent = document.querySelector(".details__imgContent")! as HTMLImageElement;
            const descContent = document.querySelector(".details__descriptionContent")! as HTMLDivElement;
            const statsContent = document.querySelector(".details__statsContent")! as HTMLDivElement;
            const typeContent = document.querySelector(".details__typeContent")! as HTMLDivElement;
            
            let pokemonOrder = "";
            if(pokemon.id < 10) pokemonOrder = `#00${pokemon.id}`;
            if(pokemon.id >= 10 && pokemon.id < 100) pokemonOrder = `#0${pokemon.id}`;
            if(pokemon.id >= 100) pokemonOrder = `#${pokemon.id}`;

            nameContent.innerHTML = `${pokemon.name} <span class="details__id">${pokemonOrder}</span>`;
            imgContent.setAttribute("src", `${pokemon.sprites.other['official-artwork'].front_default}`);

            //Desc content generate
            descContent.innerHTML = "";
            const detailHeight = document.createElement('div');
            detailHeight.setAttribute('class', 'details__Date pokemonDate')
            detailHeight.innerHTML = `<p class="pokemonDate__label">Height</p><p class="pokemonDate__value">${pokemon.height}'</p>`;
            const detailWeight = document.createElement('div');
            detailWeight.setAttribute('class', 'details__Date pokemonDate')
            detailWeight.innerHTML = `<p class="pokemonDate__label">Weight</p><p class="pokemonDate__value">${pokemon.weight} lbs</p>`;
            descContent.insertAdjacentElement('beforeend', detailHeight);
            descContent.insertAdjacentElement('beforeend', detailWeight);
            
            
            const pokemonAbilitiesArray = [...pokemon.abilities];
            const detailAbilities = document.createElement('div');
            detailAbilities.setAttribute('class', 'details__Date pokemonDate');
            const titleAbilities = document.createElement('p');
            titleAbilities.setAttribute('class', 'pokemonDate__label');
            titleAbilities.textContent = "Abilities";
            detailAbilities.insertAdjacentElement('beforeend', titleAbilities);
            pokemonAbilitiesArray.forEach((abilityEle)=>{
                const currentAbility = document.createElement('p');
                currentAbility.setAttribute('class', 'pokemonDate__value');
                currentAbility.textContent = abilityEle.ability.name;
                detailAbilities.insertAdjacentElement('beforeend', currentAbility);
            })
            descContent.insertAdjacentElement('beforeend', detailAbilities);

            // Type content generate
            typeContent.innerHTML = "";
            const pokemonTypesArray = [...pokemon.types];
            pokemonTypesArray.forEach((abilityEle)=>{
                const currentType = document.createElement('p');
                currentType.textContent = abilityEle.type.name;
                switchForPokemonTypeFunc(abilityEle, currentType, 'details__type');
                typeContent.insertAdjacentElement('beforeend', currentType);
            })

            // Stats generate
            enum MaxStatsValue {HP = 255, ATTACK = 181, DEFENSE = 230, SATTACK = 173, SDEFENSE = 230, SPEED = 200};
            const percentageHP =`${((pokemon.stats[0].base_stat / MaxStatsValue.HP) * 100).toFixed(2)}%` 
            const percentageATT =`${((pokemon.stats[1].base_stat / MaxStatsValue.ATTACK) * 100).toFixed(2)}%` 
            const percentageDEF =`${((pokemon.stats[2].base_stat / MaxStatsValue.DEFENSE) * 100).toFixed(2)}%` 
            const percentageSATT =`${((pokemon.stats[3].base_stat / MaxStatsValue.SATTACK) * 100).toFixed(2)}%` 
            const percentageSDEF =`${((pokemon.stats[4].base_stat / MaxStatsValue.SDEFENSE) * 100).toFixed(2)}%` 
            const percentageSPEED =`${((pokemon.stats[5].base_stat / MaxStatsValue.SPEED) * 100).toFixed(2)}%` 

            setTimeout(() => {
                const barHP = document.querySelector(".stats__barHp")! as HTMLElement;
                barHP.style.height = `${percentageHP}`;
    
                const barATT = document.querySelector(".stats__barAttack")! as HTMLElement;
                barATT.style.height = `${percentageATT}`;
    
                const barDEF = document.querySelector(".stats__barDefense")! as HTMLElement;
                barDEF.style.height = `${percentageDEF}`;
    
                const barSATT = document.querySelector(".stats__barSAttack")! as HTMLElement;
                barSATT.style.height = `${percentageSATT}`;
    
                const barSDEF = document.querySelector(".stats__barSDefense")! as HTMLElement;
                barSDEF.style.height = `${percentageSDEF}`;
    
                const barSPEED = document.querySelector(".stats__barSpeed")! as HTMLElement;
                barSPEED.style.height = `${percentageSPEED}`;
            }, 1500);
        }
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
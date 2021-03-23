import {switchForPokemonTypeFunc } from "./switchType";

interface EachPokemon{
    name: string,
    id: number,
    types: any
    sprites: {
        other?: any
    }
}

interface StatsObjInterface{
    percentageHP: string,
    percentageATT: string,
    percentageDEF: string,
    percentageSATT: string,
    percentageSDEF: string,
    percentageSPEED: string
}

export class GenerateDetails{
    static statsObj:StatsObjInterface;

    static pokemonDetails = (pokemon:any) => {
        document.body.style.overflow = 'hidden';
        const detailsElement = document.querySelector('.details')! as HTMLElement;
        if(detailsElement){
            detailsElement.classList.add('details--onPosition');
    
            const nameContent = document.querySelector(".details__pokemonName")! as HTMLDivElement;
            const imgContent = document.querySelector(".details__imgContent")! as HTMLImageElement;
     
            let pokemonOrder = "";
            if(pokemon.id < 10) pokemonOrder = `#00${pokemon.id}`;
            if(pokemon.id >= 10 && pokemon.id < 100) pokemonOrder = `#0${pokemon.id}`;
            if(pokemon.id >= 100) pokemonOrder = `#${pokemon.id}`;
    
            nameContent.innerHTML = `${pokemon.name} <span class="details__id">${pokemonOrder}</span>`;
            imgContent.setAttribute("src", `${pokemon.sprites.other['official-artwork'].front_default}`);

            GenerateDetails.generateDescriptionContent(pokemon);
            GenerateDetails.generateTypeContent(pokemon);
            GenerateDetails.generateStatsContent(pokemon);
            GenerateDetails.generateEvolutionContent(pokemon);
        }
    }

    static generateDescriptionContent = (pokemon: any) => {
            const descContent = document.querySelector(".details__descriptionContent")! as HTMLDivElement;
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
    }

    static generateTypeContent = (pokemon: any) => {
        const typeContent = document.querySelector(".details__typeContent")! as HTMLDivElement;
        typeContent.innerHTML = "";
        const pokemonTypesArray = [...pokemon.types];
        pokemonTypesArray.forEach((abilityEle)=>{
            const currentType = document.createElement('p');
            currentType.textContent = abilityEle.type.name;
            switchForPokemonTypeFunc(abilityEle, currentType, 'details__type');
            typeContent.insertAdjacentElement('beforeend', currentType);
        })
    }

    static generateStatsContent = (pokemon: any) => {
        enum MaxStatsValue {HP = 255, ATTACK = 181, DEFENSE = 230, SATTACK = 173, SDEFENSE = 230, SPEED = 200};
        const percentageHP =`${((pokemon.stats[0].base_stat / MaxStatsValue.HP) * 100).toFixed(2)}%` 
        const percentageATT =`${((pokemon.stats[1].base_stat / MaxStatsValue.ATTACK) * 100).toFixed(2)}%` 
        const percentageDEF =`${((pokemon.stats[2].base_stat / MaxStatsValue.DEFENSE) * 100).toFixed(2)}%` 
        const percentageSATT =`${((pokemon.stats[3].base_stat / MaxStatsValue.SATTACK) * 100).toFixed(2)}%` 
        const percentageSDEF =`${((pokemon.stats[4].base_stat / MaxStatsValue.SDEFENSE) * 100).toFixed(2)}%` 
        const percentageSPEED =`${((pokemon.stats[5].base_stat / MaxStatsValue.SPEED) * 100).toFixed(2)}%` 

        const statsObj = {
            percentageHP,
            percentageATT,
            percentageDEF,
            percentageSATT,
            percentageSDEF,
            percentageSPEED
        }

        GenerateDetails.statsObj = statsObj;

        const detailWrapper = document.querySelector('.details')! as HTMLElement;
        detailWrapper.addEventListener('scroll', GenerateDetails.showStats, { passive: true });
    }

    static showStats = () =>{
        const detailWrapper = document.querySelector('.details')! as HTMLElement;
        const statsElement = document.querySelector('.stats')! as HTMLDivElement;
        const windowHeight = window.innerHeight;
        const statsElementFromTop = statsElement.getBoundingClientRect().top;
        const { percentageHP, percentageATT, percentageDEF, percentageSATT, percentageSDEF, percentageSPEED} = GenerateDetails.statsObj;
        if(statsElementFromTop <= (windowHeight/2)){
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

            detailWrapper.removeEventListener('scroll', GenerateDetails.showStats, { capture: false });
        }
    }

    static generateEvolutionContent = (pokemon: any) => {
        const pokemonSpeciesAPI = pokemon.species.url;
        fetch(pokemonSpeciesAPI)
        .then(res => res.json())
        .then(species => {
            const evoChainAPI = species.evolution_chain.url;
            fetch(evoChainAPI)
            .then(res => res.json())
            .then(evoData => {
                const isEvolveTo =[...evoData.chain.evolves_to];
                if(isEvolveTo.length === 0){
                    console.log('Ten Pokemon nie ma przemiany!')
                } 
                else{
                    const generateFirstEvo = () => {
                        const firstEvoAPI = evoData.chain.species.name;
                        fetch(`https://pokeapi.co/api/v2/pokemon/${firstEvoAPI}/`)
                        .then(res => res.json())
                        .then(data => {
                            GenerateDetails.createEvolutionDOM(data, 'first');
                        });
                    }
                    generateFirstEvo();
                    setTimeout(() => {
                        isEvolveTo.forEach((evo)=>{
                            const secondEvoAPI = evo.species.name;
                            fetch(`https://pokeapi.co/api/v2/pokemon/${secondEvoAPI}/`)
                            .then(res => res.json())
                            .then(data => {
                                GenerateDetails.createEvolutionDOM(data, 'second');
                            });
                            const anotherEvo = [...evo.evolves_to];
                            setTimeout(() => {
                                if(anotherEvo.length !== 0){
                                    const thirdEvoAPI = evo.evolves_to[0].species.name;
                                    fetch(`https://pokeapi.co/api/v2/pokemon/${thirdEvoAPI}/`)
                                    .then(res => res.json())
                                    .then(data => {
                                      GenerateDetails.createEvolutionDOM(data, 'third');
                                    });
                                  }
                            }, 500);
                        })
                    }, 500);
                }
            })
        })
    }

    static createEvolutionDOM = (pokemonData: EachPokemon, whichEvo: string) => {
            const evoContainer = document.querySelector('.evo')! as HTMLDivElement;
            const firstEvoContainer = document.createElement('div');
            firstEvoContainer.setAttribute('class', `evo__item evo__${whichEvo}Evo`);
            firstEvoContainer.addEventListener('click', function(){
                const evo = document.querySelector('.evo')! as HTMLDivElement;
                evo.innerHTML = '<div class="evoCover"></div>';
                GenerateDetails.pokemonDetails(pokemonData);
            })
            const pokemonName = pokemonData.name;
            let pokemonId;
            if(pokemonData.id < 10) pokemonId = `#00${pokemonData.id}`;
            if(pokemonData.id >= 10 && pokemonData.id < 100) pokemonId = `#0${pokemonData.id}`;
            if(pokemonData.id >= 100) pokemonId = `#${pokemonData.id}`;
            const pokemonImgUrl = pokemonData.sprites.other['official-artwork'].front_default;
            const pokemonTypes = [...pokemonData.types];

            const nameElement = document.createElement('p');
            const imgElement = document.createElement('img');

            nameElement.setAttribute('class', 'evo__name');
            imgElement.setAttribute('class', 'evo__img');
            imgElement.setAttribute('src', pokemonImgUrl);

            nameElement.innerHTML = `${pokemonName} <span class="evo__id">${pokemonId}</span>`;

            firstEvoContainer.insertAdjacentElement('beforeend', imgElement);
            firstEvoContainer.insertAdjacentElement('beforeend', nameElement);

            const evoTypeContainer = document.createElement('div');
            evoTypeContainer.setAttribute('class','evo__typeContainer');
            pokemonTypes.forEach((each)=>{
                const currentType = document.createElement('p');
                currentType.textContent = each.type.name;
                switchForPokemonTypeFunc(each, currentType, 'evo__type');
                evoTypeContainer.insertAdjacentElement('beforeend', currentType);
            });

            firstEvoContainer.insertAdjacentElement('beforeend', evoTypeContainer);
            evoContainer.insertAdjacentElement('beforeend', firstEvoContainer);
    }
}


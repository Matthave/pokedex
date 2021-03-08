/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateView = exports.rangeOfLoading = void 0;
const fetchData_1 = __webpack_require__(/*! ./fetchData */ "./src/fetchData.ts");
const navigation_1 = __webpack_require__(/*! ./navigation */ "./src/navigation.ts");
exports.rangeOfLoading = {
    from: 0,
    howMany: 12,
    type: ""
};
class GenerateView {
    constructor(typeOfSort) {
        this.loadMorePokemon = () => {
            exports.rangeOfLoading.from = exports.rangeOfLoading.from + 12;
            new fetchData_1.PokemonGet(this.typeSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            window.addEventListener('scroll', GenerateView.scrollFeature, { passive: true });
        };
        this.typeSort = typeOfSort;
        //Inicial addEventListener for loadMoreBtn
        const loadBtn = document.querySelector(".pokemonSection__loadMore");
        loadBtn.addEventListener('click', () => this.loadMorePokemon());
        const closeDetails = document.querySelector('.details__closeBtn');
        closeDetails.addEventListener('click', function () {
            const details = document.querySelector('.details');
            const evoContainer = document.querySelector('.evo');
            const allStatsBar = [...document.querySelectorAll('.stats__bar')];
            allStatsBar.forEach((ele) => {
                ele.style.height = '0%';
            });
            document.body.style.overflow = 'auto';
            details.classList.remove('details--onPosition');
            evoContainer.innerHTML = '<div class="evoCover"></div>';
        });
    }
}
exports.GenerateView = GenerateView;
GenerateView.initialGenerate = (typeOfSort) => {
    switch (typeOfSort) {
        case navigation_1.MenuItem.TYPE:
            new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        case navigation_1.MenuItem.GENERAL:
            new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        case navigation_1.MenuItem.COLOR:
            new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        case navigation_1.MenuItem.GAME:
            new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        default:
            new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
    }
    GenerateView.setTitle(typeOfSort);
};
GenerateView.scrollFeature = () => {
    var _a;
    (_a = document.querySelector('.pokemonSection__loadMore')) === null || _a === void 0 ? void 0 : _a.classList.add('pokemonSection__loadMore--disable');
    const scrollHeight = window.scrollY;
    if ((window.innerHeight + scrollHeight) >= document.body.scrollHeight) {
        setTimeout(() => {
            exports.rangeOfLoading.from = exports.rangeOfLoading.from + 12;
            new fetchData_1.PokemonGet('general', exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
        }, 400);
    }
};
GenerateView.setTitle = (type) => {
    const sectionTitle = document.querySelector(".sortType__title");
    sectionTitle.textContent = type;
};
const menuItemOne = new navigation_1.MenuItemEffect(navigation_1.MenuItem.TYPE);
const menuItemTwo = new navigation_1.MenuItemEffect(navigation_1.MenuItem.GENERAL);
const menuItemThree = new navigation_1.MenuItemEffect(navigation_1.MenuItem.COLOR);
const menuItemFour = new navigation_1.MenuItemEffect(navigation_1.MenuItem.GAME);
const getView = new GenerateView('general');


/***/ }),

/***/ "./src/fetchData.ts":
/*!**************************!*\
  !*** ./src/fetchData.ts ***!
  \**************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PokemonGet = void 0;
const navigation_1 = __webpack_require__(/*! ./navigation */ "./src/navigation.ts");
const generateToDOM_1 = __webpack_require__(/*! ./generateToDOM */ "./src/generateToDOM.ts");
class PokemonGet {
    constructor(typeOfSort, from, howMany) {
        this.getColorOrTypeFunc = (API, APIType) => {
            fetch(API)
                .then(response => response.json())
                .then(data => {
                data.results.forEach((type, index) => {
                    if (APIType === navigation_1.MenuItem.TYPE) {
                        generateToDOM_1.GenerateTypeToDOM.generateTypesToDOM(type);
                    }
                    else if (APIType === navigation_1.MenuItem.COLOR) {
                        generateToDOM_1.GenerateColorToDOM.generateColorsToDOM(type);
                    }
                    else if (APIType === navigation_1.MenuItem.GENERAL) {
                        generateToDOM_1.GenerateGeneralToDOM.generateGeneralToDOM(type, index);
                    }
                });
            })
                .catch((err) => {
                console.log("ERROR", err);
            });
        };
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
        switch (typeOfSort) {
            case navigation_1.MenuItem.TYPE:
                this.getColorOrTypeFunc(this.typeAPI, navigation_1.MenuItem.TYPE);
                break;
            case navigation_1.MenuItem.GENERAL:
                //Get pokemon and fetch every single url pokemon, push it to the array and send to sortData function
                this.getColorOrTypeFunc(this.generalAPI, navigation_1.MenuItem.GENERAL);
                break;
            case navigation_1.MenuItem.COLOR:
                this.getColorOrTypeFunc(this.colorAPI, navigation_1.MenuItem.COLOR);
                break;
            case navigation_1.MenuItem.GAME:
                break;
            default:
                this.getColorOrTypeFunc(this.generalAPI, navigation_1.MenuItem.GENERAL);
        }
    }
}
exports.PokemonGet = PokemonGet;


/***/ }),

/***/ "./src/generateToDOM.ts":
/*!******************************!*\
  !*** ./src/generateToDOM.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateGeneralToDOM = exports.GenerateColorToDOM = exports.GenerateTypeToDOM = exports.SortPokemon = exports.GeneratePokemonToDOM = exports.pokemonCollectInGeneral = exports.pokemonCollect = void 0;
const switchType_1 = __webpack_require__(/*! ./utils/switchType */ "./src/utils/switchType.ts");
const searchPokemon_1 = __webpack_require__(/*! ./utils/searchPokemon */ "./src/utils/searchPokemon.ts");
const generateDetails_1 = __webpack_require__(/*! ./utils/generateDetails */ "./src/utils/generateDetails.ts");
exports.pokemonCollect = [];
exports.pokemonCollectInGeneral = [];
class GeneratePokemonToDOM {
    constructor(allPokemon) {
        //Here goes before prepared array of all pokemons (part one by one not all in one) DOM isn't clean here, so every part goes to the end of container
        this.generatePokemonInDOM = (allPokemon) => {
            allPokemon.forEach((pokemon, index) => {
                var _a, _b, _c;
                const newCard = document.createElement('div');
                const pokemonId = document.createElement('p');
                const pokemonName = document.createElement('p');
                const pokemonImg = document.createElement('img');
                const typeContainer = document.createElement('div');
                newCard.setAttribute("class", "pokemon__card");
                newCard.addEventListener('click', () => generateDetails_1.GenerateDetails.pokemonDetails(pokemon));
                pokemonName.setAttribute("class", "pokemon__name");
                pokemonName.textContent = pokemon.name;
                newCard.appendChild(pokemonName);
                pokemonId.setAttribute("class", 'pokemon__id');
                const pokemonImgUrl = (_b = (_a = pokemon === null || pokemon === void 0 ? void 0 : pokemon.sprites) === null || _a === void 0 ? void 0 : _a.other['official-artwork']) === null || _b === void 0 ? void 0 : _b.front_default;
                if (pokemonImgUrl !== null && pokemonImgUrl !== void 0 ? pokemonImgUrl : false) {
                    pokemonImg.setAttribute("src", `${pokemonImgUrl}`);
                    pokemonImg.setAttribute("class", "pokemon__img");
                    pokemonImg.setAttribute("loading", "lazy");
                    newCard.appendChild(pokemonImg);
                }
                else {
                    pokemonImg.setAttribute("src", './images/questionMark.svg');
                    pokemonImg.setAttribute("class", "pokemon__questionMark");
                    newCard.appendChild(pokemonImg);
                }
                //Add ID of pokemon to every container into card
                if (pokemon.id < 10)
                    pokemonId.textContent = `#00${pokemon.id}`;
                if (pokemon.id >= 10 && index < 100)
                    pokemonId.textContent = `#0${pokemon.id}`;
                if (pokemon.id >= 100)
                    pokemonId.textContent = `#${pokemon.id}`;
                //Add type or types of pokemon to every container into card
                (_c = pokemon === null || pokemon === void 0 ? void 0 : pokemon.types) === null || _c === void 0 ? void 0 : _c.forEach((ele) => {
                    const pokemonType = document.createElement("p");
                    pokemonType.textContent = `${ele.type.name}`;
                    switchType_1.switchForPokemonTypeFunc(ele, pokemonType, 'pokemon__type');
                    typeContainer.appendChild(pokemonType);
                });
                //Get every of these created element and add it into newCard and next - newCard to the end of pokemonSection
                typeContainer.setAttribute("class", "pokemon__typeContainer");
                newCard.appendChild(typeContainer);
                newCard.appendChild(pokemonId);
                newCard.setAttribute('id', `${pokemon.id}`);
                const pokemonSection = document.querySelector('.pokemon');
                pokemonSection.insertAdjacentElement('beforeend', newCard);
            });
        };
        this.generatePokemonInDOM(allPokemon);
    }
}
exports.GeneratePokemonToDOM = GeneratePokemonToDOM;
class SortPokemon {
}
exports.SortPokemon = SortPokemon;
SortPokemon.sortAllPokemon = (eachPoke) => {
    exports.pokemonCollect.push(eachPoke);
    exports.pokemonCollect.sort(function (a, b) { return a.id - b.id; });
    exports.pokemonCollectInGeneral.push(eachPoke);
    exports.pokemonCollectInGeneral.sort(function (a, b) { return a.id - b.id; });
};
class GenerateTypeToDOM {
}
exports.GenerateTypeToDOM = GenerateTypeToDOM;
GenerateTypeToDOM.generateTypesToDOM = (type) => {
    if ((type === null || type === void 0 ? void 0 : type.name) && (type === null || type === void 0 ? void 0 : type.name) !== 'unknown' && (type === null || type === void 0 ? void 0 : type.name) !== 'shadow') {
        const sortSection = document.querySelector(".sortType__container");
        const typeElement = document.createElement("div");
        typeElement.setAttribute("class", `sortType__${type === null || type === void 0 ? void 0 : type.name} sortType__type`);
        typeElement.addEventListener('click', function (e) {
            const pokemonSection = document.querySelector(".pokemon");
            switchType_1.switchTypeForCoverFunc(type);
            pokemonSection.innerHTML = "";
            fetch(type === null || type === void 0 ? void 0 : type.url)
                .then(res => res.json())
                .then(data => {
                if (data.pokemon && Array.isArray(data.pokemon)) {
                    const oneTypePokemon = [...data.pokemon];
                    oneTypePokemon.forEach((ele, index) => {
                        fetch(ele.pokemon.url)
                            .then(response => response.json())
                            .then(eachPoke => {
                            SortPokemon.sortAllPokemon(eachPoke);
                            if (oneTypePokemon.length === index + 1) {
                                new GeneratePokemonToDOM(exports.pokemonCollect);
                                exports.pokemonCollect.length = 0;
                            }
                        });
                    });
                }
            });
        });
        typeElement.textContent = type === null || type === void 0 ? void 0 : type.name;
        sortSection.appendChild(typeElement);
    }
};
class GenerateColorToDOM {
}
exports.GenerateColorToDOM = GenerateColorToDOM;
GenerateColorToDOM.generateColorsToDOM = (color) => {
    if (color === null || color === void 0 ? void 0 : color.name) {
        const sortSection = document.querySelector(".sortType__container");
        const typeElement = document.createElement("div");
        typeElement.setAttribute("class", `sortType__${color === null || color === void 0 ? void 0 : color.name} sortType__type`);
        typeElement.addEventListener('click', function (e) {
            const pokemonSection = document.querySelector(".pokemon");
            pokemonSection.innerHTML = "";
            fetch(color === null || color === void 0 ? void 0 : color.url)
                .then(res => res.json())
                .then(data => {
                if (data.pokemon_species && Array.isArray(data.pokemon_species)) {
                    const oneTypePokemon = [...data.pokemon_species];
                    oneTypePokemon.forEach((ele, index) => {
                        const modificateURL = GenerateColorToDOM.modificateUrl(ele.url);
                        fetch(modificateURL)
                            .then(response => response.json())
                            .then(eachPoke => {
                            SortPokemon.sortAllPokemon(eachPoke);
                            if (oneTypePokemon.length === index + 1) {
                                new GeneratePokemonToDOM(exports.pokemonCollect);
                                exports.pokemonCollect.length = 0;
                            }
                        });
                    });
                }
            });
        });
        typeElement.textContent = color === null || color === void 0 ? void 0 : color.name;
        sortSection.appendChild(typeElement);
    }
};
GenerateColorToDOM.modificateUrl = (url) => {
    const splitUrl = url.split("/");
    return `${splitUrl[0]}//${splitUrl[2]}/${splitUrl[3]}/${splitUrl[4]}/pokemon/${splitUrl[6]}`;
};
class GenerateGeneralToDOM {
}
exports.GenerateGeneralToDOM = GenerateGeneralToDOM;
GenerateGeneralToDOM.generateGeneralToDOM = (type, index) => {
    if (type === null || type === void 0 ? void 0 : type.name) {
        fetch(type === null || type === void 0 ? void 0 : type.url)
            .then(res => res.json())
            .then(eachPoke => {
            SortPokemon.sortAllPokemon(eachPoke);
            if (index === 11) {
                const sortSection = document.querySelector(".sortType__container");
                if (sortSection.childElementCount === 0) {
                    const searchTemplate = document.querySelector(".searchTemplate");
                    const importedNode = document.importNode(searchTemplate.content, true);
                    const putThisElement = importedNode.firstElementChild;
                    sortSection.insertAdjacentElement("afterbegin", putThisElement);
                    new searchPokemon_1.FilterPokemonCollect();
                }
                new GeneratePokemonToDOM(exports.pokemonCollect);
                exports.pokemonCollect.length = 0;
            }
        });
    }
};


/***/ }),

/***/ "./src/navigation.ts":
/*!***************************!*\
  !*** ./src/navigation.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.MenuItemEffect = exports.MenuItem = void 0;
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
const generateToDOM_1 = __webpack_require__(/*! ./generateToDOM */ "./src/generateToDOM.ts");
var MenuItem;
(function (MenuItem) {
    MenuItem["TYPE"] = "type";
    MenuItem["GENERAL"] = "general";
    MenuItem["COLOR"] = "color";
    MenuItem["GAME"] = "game";
})(MenuItem = exports.MenuItem || (exports.MenuItem = {}));
;
class MenuItemEffect {
    constructor(element) {
        this.clearPokemonSectionBeforeGenerate = (element) => {
            const pokemonSection = document.querySelector(".pokemon");
            const typesSection = document.querySelector(".sortType__container");
            window.removeEventListener('scroll', app_1.GenerateView.scrollFeature, { capture: false });
            if (element === MenuItem.GENERAL) {
                pokemonSection.innerHTML = "";
            }
            else {
                pokemonSection.innerHTML = "<p class='pokemon__dummyText'>There is nothing to display for the moment</p>";
            }
            typesSection.innerHTML = "";
            app_1.rangeOfLoading.from = 0;
            app_1.rangeOfLoading.type = element;
            generateToDOM_1.pokemonCollect.length = 0;
        };
        this.clickEffect = (element) => {
            const navElement = [...document.querySelectorAll(`.nav__option`)];
            const nav = document.querySelector('.nav');
            const navWrapper = document.querySelector(".navWrapper");
            const navLine = document.querySelector('.nav__line');
            const navCircle = document.querySelector('.circle');
            const navInnerCircle = document.querySelector('.circle__innerCircle');
            const coverMouse = document.querySelector('.coverMouse');
            const pokedexSection = document.querySelector(".pokedex");
            const cover = document.querySelector(".cover");
            if (coverMouse.id !== 'minimalized') {
                this.hideNavElements(element, navElement, nav, navCircle, navInnerCircle, navLine, navWrapper, coverMouse, pokedexSection, cover);
            }
            else {
                this.showNavElements(pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement, cover);
            }
        };
        this.hideNavElements = (element, navElement, nav, navCircle, navInnerCircle, navLine, navWrapper, coverMouse, pokedexSection, cover) => {
            var _a;
            navElement.forEach((ele) => {
                ele.classList.add("nav__option--hide");
            });
            setTimeout(() => {
                nav.classList.add("nav--hide");
                navCircle.classList.add('circle--hide');
                navInnerCircle.classList.add('circle__innerCircle--hide');
                navLine.classList.add("nav__line--hide");
            }, 500);
            setTimeout(() => {
                navWrapper.classList.add('navWrapper--hide');
                coverMouse.classList.add('coverMouse--hide');
                pokedexSection.classList.add('pokedex--showIt');
                coverMouse.id = 'minimalized';
                cover.classList.add('cover--lowerPosition');
            }, 750);
            //Do this with every click in nav element
            this.clearPokemonSectionBeforeGenerate(element);
            const loadMoreButton = document.querySelector(".pokemonSection__loadMore");
            if (element === MenuItem.GENERAL) {
                loadMoreButton.classList.remove("pokemonSection__loadMore--disable");
            }
            else {
                loadMoreButton.classList.add("pokemonSection__loadMore--disable");
            }
            app_1.GenerateView.initialGenerate(element);
            (_a = document.querySelector('.escape')) === null || _a === void 0 ? void 0 : _a.classList.add('escape--disable');
        };
        this.showNavElements = (pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement, cover) => {
            var _a;
            document.querySelector('.nav__game').classList.remove(`nav__game--active`);
            document.querySelector('.nav__general').classList.remove(`nav__general--active`);
            document.querySelector('.nav__type').classList.remove(`nav__type--active`);
            document.querySelector('.nav__color').classList.remove(`nav__color--active`);
            pokedexSection.classList.remove('pokedex--showIt');
            navWrapper.classList.remove('navWrapper--hide');
            coverMouse.classList.remove('coverMouse--hide');
            cover.classList.remove('cover--lowerPosition');
            cover.style.backgroundColor = "rgba(0,0,0,0.1)";
            coverMouse.id = "";
            setTimeout(() => {
                nav.classList.remove("nav--hide", 'nav--active');
                navCircle.classList.remove('circle--hide');
                navInnerCircle.classList.remove('circle__innerCircle--hide', 'circle__innerCircle--active');
                navLine.classList.remove("nav__line--hide", 'nav__line--active');
            }, 500);
            setTimeout(() => {
                navElement.forEach((ele) => {
                    ele.classList.remove("nav__option--hide");
                });
            }, 750);
            const detailsElement = document.querySelector('.details');
            detailsElement.classList.remove('details--onPosition');
            document.body.style.overflow = 'auto';
            (_a = document.querySelector('.escape')) === null || _a === void 0 ? void 0 : _a.classList.remove('escape--disable');
        };
        this.hoverEffect = (element, eventType) => {
            const navElement = document.querySelector(`.nav__${element}`);
            const coverMouse = document.querySelector('.coverMouse');
            if (coverMouse.id !== 'minimalized') {
                if (eventType === 'over') {
                    navElement.classList.add(`nav__${element}--active`);
                }
                if (eventType === 'leave') {
                    navElement.classList.remove(`nav__${element}--active`);
                }
            }
            else {
                const nav = document.querySelector('.nav');
                const navLine = document.querySelector('.nav__line');
                const navInnerCircle = document.querySelector('.circle__innerCircle');
                if (eventType === 'over') {
                    nav.classList.add(`nav--active`);
                    navLine.classList.add('nav__line--active');
                    navInnerCircle.classList.add('circle__innerCircle--active');
                }
                if (eventType === 'leave') {
                    nav.classList.remove(`nav--active`);
                    navLine.classList.remove('nav__line--active');
                    navInnerCircle.classList.remove('circle__innerCircle--active');
                }
            }
        };
        const coverElement = document.querySelector(`.coverMouse__${element}`);
        if (element === 'general') {
            window.addEventListener('keyup', function (e) {
                var _a;
                if (e.which === 27) {
                    (_a = document.querySelector('.coverMouse')) === null || _a === void 0 ? void 0 : _a.classList.toggle('coverMouse--showMouse');
                }
            });
        }
        coverElement.addEventListener('mouseover', () => this.hoverEffect(element, 'over'));
        coverElement.addEventListener('mouseleave', () => this.hoverEffect(element, 'leave'));
        coverElement.addEventListener('click', () => this.clickEffect(element));
    }
}
exports.MenuItemEffect = MenuItemEffect;


/***/ }),

/***/ "./src/utils/generateDetails.ts":
/*!**************************************!*\
  !*** ./src/utils/generateDetails.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateDetails = void 0;
const switchType_1 = __webpack_require__(/*! ./switchType */ "./src/utils/switchType.ts");
class GenerateDetails {
}
exports.GenerateDetails = GenerateDetails;
GenerateDetails.pokemonDetails = (pokemon) => {
    document.body.style.overflow = 'hidden';
    const detailsElement = document.querySelector('.details');
    if (detailsElement) {
        detailsElement.classList.add('details--onPosition');
        const nameContent = document.querySelector(".details__pokemonName");
        const imgContent = document.querySelector(".details__imgContent");
        let pokemonOrder = "";
        if (pokemon.id < 10)
            pokemonOrder = `#00${pokemon.id}`;
        if (pokemon.id >= 10 && pokemon.id < 100)
            pokemonOrder = `#0${pokemon.id}`;
        if (pokemon.id >= 100)
            pokemonOrder = `#${pokemon.id}`;
        nameContent.innerHTML = `${pokemon.name} <span class="details__id">${pokemonOrder}</span>`;
        imgContent.setAttribute("src", `${pokemon.sprites.other['official-artwork'].front_default}`);
        GenerateDetails.generateDescriptionContent(pokemon);
        GenerateDetails.generateTypeContent(pokemon);
        GenerateDetails.generateStatsContent(pokemon);
        GenerateDetails.generateEvolutionContent(pokemon);
    }
};
GenerateDetails.generateDescriptionContent = (pokemon) => {
    const descContent = document.querySelector(".details__descriptionContent");
    descContent.innerHTML = "";
    const detailHeight = document.createElement('div');
    detailHeight.setAttribute('class', 'details__Date pokemonDate');
    detailHeight.innerHTML = `<p class="pokemonDate__label">Height</p><p class="pokemonDate__value">${pokemon.height}'</p>`;
    const detailWeight = document.createElement('div');
    detailWeight.setAttribute('class', 'details__Date pokemonDate');
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
    pokemonAbilitiesArray.forEach((abilityEle) => {
        const currentAbility = document.createElement('p');
        currentAbility.setAttribute('class', 'pokemonDate__value');
        currentAbility.textContent = abilityEle.ability.name;
        detailAbilities.insertAdjacentElement('beforeend', currentAbility);
    });
    descContent.insertAdjacentElement('beforeend', detailAbilities);
};
GenerateDetails.generateTypeContent = (pokemon) => {
    const typeContent = document.querySelector(".details__typeContent");
    typeContent.innerHTML = "";
    const pokemonTypesArray = [...pokemon.types];
    pokemonTypesArray.forEach((abilityEle) => {
        const currentType = document.createElement('p');
        currentType.textContent = abilityEle.type.name;
        switchType_1.switchForPokemonTypeFunc(abilityEle, currentType, 'details__type');
        typeContent.insertAdjacentElement('beforeend', currentType);
    });
};
GenerateDetails.generateStatsContent = (pokemon) => {
    let MaxStatsValue;
    (function (MaxStatsValue) {
        MaxStatsValue[MaxStatsValue["HP"] = 255] = "HP";
        MaxStatsValue[MaxStatsValue["ATTACK"] = 181] = "ATTACK";
        MaxStatsValue[MaxStatsValue["DEFENSE"] = 230] = "DEFENSE";
        MaxStatsValue[MaxStatsValue["SATTACK"] = 173] = "SATTACK";
        MaxStatsValue[MaxStatsValue["SDEFENSE"] = 230] = "SDEFENSE";
        MaxStatsValue[MaxStatsValue["SPEED"] = 200] = "SPEED";
    })(MaxStatsValue || (MaxStatsValue = {}));
    ;
    const percentageHP = `${((pokemon.stats[0].base_stat / MaxStatsValue.HP) * 100).toFixed(2)}%`;
    const percentageATT = `${((pokemon.stats[1].base_stat / MaxStatsValue.ATTACK) * 100).toFixed(2)}%`;
    const percentageDEF = `${((pokemon.stats[2].base_stat / MaxStatsValue.DEFENSE) * 100).toFixed(2)}%`;
    const percentageSATT = `${((pokemon.stats[3].base_stat / MaxStatsValue.SATTACK) * 100).toFixed(2)}%`;
    const percentageSDEF = `${((pokemon.stats[4].base_stat / MaxStatsValue.SDEFENSE) * 100).toFixed(2)}%`;
    const percentageSPEED = `${((pokemon.stats[5].base_stat / MaxStatsValue.SPEED) * 100).toFixed(2)}%`;
    setTimeout(() => {
        const barHP = document.querySelector(".stats__barHp");
        barHP.style.height = `${percentageHP}`;
        const barATT = document.querySelector(".stats__barAttack");
        barATT.style.height = `${percentageATT}`;
        const barDEF = document.querySelector(".stats__barDefense");
        barDEF.style.height = `${percentageDEF}`;
        const barSATT = document.querySelector(".stats__barSAttack");
        barSATT.style.height = `${percentageSATT}`;
        const barSDEF = document.querySelector(".stats__barSDefense");
        barSDEF.style.height = `${percentageSDEF}`;
        const barSPEED = document.querySelector(".stats__barSpeed");
        barSPEED.style.height = `${percentageSPEED}`;
    }, 2500);
};
GenerateDetails.generateEvolutionContent = (pokemon) => {
    const pokemonSpeciesAPI = pokemon.species.url;
    fetch(pokemonSpeciesAPI)
        .then(res => res.json())
        .then(species => {
        const evoChainAPI = species.evolution_chain.url;
        fetch(evoChainAPI)
            .then(res => res.json())
            .then(evoData => {
            const isEvolveTo = [...evoData.chain.evolves_to];
            if (isEvolveTo.length === 0) {
                console.log('Ten Pokemon nie ma przemiany!');
            }
            else {
                const generateFirstEvo = () => {
                    const firstEvoAPI = evoData.chain.species.name;
                    fetch(`https://pokeapi.co/api/v2/pokemon/${firstEvoAPI}/`)
                        .then(res => res.json())
                        .then(data => {
                        GenerateDetails.createEvolutionDOM(data, 'first');
                    });
                };
                generateFirstEvo();
                setTimeout(() => {
                    isEvolveTo.forEach((evo) => {
                        const secondEvoAPI = evo.species.name;
                        fetch(`https://pokeapi.co/api/v2/pokemon/${secondEvoAPI}/`)
                            .then(res => res.json())
                            .then(data => {
                            GenerateDetails.createEvolutionDOM(data, 'second');
                        });
                        const anotherEvo = [...evo.evolves_to];
                        setTimeout(() => {
                            if (anotherEvo.length !== 0) {
                                const thirdEvoAPI = evo.evolves_to[0].species.name;
                                fetch(`https://pokeapi.co/api/v2/pokemon/${thirdEvoAPI}/`)
                                    .then(res => res.json())
                                    .then(data => {
                                    GenerateDetails.createEvolutionDOM(data, 'third');
                                });
                            }
                        }, 500);
                    });
                }, 500);
            }
        });
    });
};
GenerateDetails.createEvolutionDOM = (pokemonData, whichEvo) => {
    const evoContainer = document.querySelector('.evo');
    const firstEvoContainer = document.createElement('div');
    firstEvoContainer.setAttribute('class', `evo__item evo__${whichEvo}Evo`);
    console.log(pokemonData);
    const pokemonName = pokemonData.name;
    let pokemonId;
    if (pokemonData.id < 10)
        pokemonId = `#00${pokemonData.id}`;
    if (pokemonData.id >= 10 && pokemonData.id < 100)
        pokemonId = `#0${pokemonData.id}`;
    if (pokemonData.id >= 100)
        pokemonId = `#${pokemonData.id}`;
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
    evoTypeContainer.setAttribute('class', 'evo__typeContainer');
    pokemonTypes.forEach((each) => {
        const currentType = document.createElement('p');
        currentType.textContent = each.type.name;
        switchType_1.switchForPokemonTypeFunc(each, currentType, 'evo__type');
        evoTypeContainer.insertAdjacentElement('beforeend', currentType);
    });
    firstEvoContainer.insertAdjacentElement('beforeend', evoTypeContainer);
    evoContainer.insertAdjacentElement('beforeend', firstEvoContainer);
};


/***/ }),

/***/ "./src/utils/searchPokemon.ts":
/*!************************************!*\
  !*** ./src/utils/searchPokemon.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.FilterPokemonCollect = void 0;
const app_1 = __webpack_require__(/*! ../app */ "./src/app.ts");
const generateToDOM_1 = __webpack_require__(/*! ../generateToDOM */ "./src/generateToDOM.ts");
class FilterPokemonCollect {
    constructor() {
        const input = document.querySelector('.form__input');
        const searchButton = document.querySelector('.form__btn');
        if (searchButton)
            searchButton.addEventListener('click', () => FilterPokemonCollect.buttonClickHandler('click'));
        if (input)
            input.addEventListener('keyup', (e) => FilterPokemonCollect.buttonClickHandler(e));
    }
}
exports.FilterPokemonCollect = FilterPokemonCollect;
FilterPokemonCollect.buttonClickHandler = (e) => {
    const pokemonSection = document.querySelector(".pokemon");
    const input = document.querySelector('.form__input');
    const loadMoreButton = document.querySelector(".pokemonSection__loadMore");
    const searchingElement = input.value;
    if (e === 'click' || e.which === 13) {
        if (searchingElement !== "") {
            const API = `https://pokeapi.co/api/v2/pokemon/${searchingElement}`;
            fetch(API)
                .then(res => res.json())
                .then(pokemon => {
                loadMoreButton.classList.add("pokemonSection__loadMore--disable");
                const pokeArr = [];
                pokeArr.push(pokemon);
                app_1.rangeOfLoading.from = 0;
                pokemonSection.innerHTML = "";
                return new generateToDOM_1.GeneratePokemonToDOM(pokeArr);
            })
                .catch(err => alert("It's no pokemon with name like that!"));
        }
        else {
            app_1.rangeOfLoading.from = 0;
            pokemonSection.innerHTML = "";
            app_1.GenerateView.initialGenerate('general');
            loadMoreButton.classList.remove("pokemonSection__loadMore--disable");
        }
    }
};


/***/ }),

/***/ "./src/utils/switchType.ts":
/*!*********************************!*\
  !*** ./src/utils/switchType.ts ***!
  \*********************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.switchForPokemonTypeFunc = exports.switchTypeForCoverFunc = void 0;
var TypeOfPokemon;
(function (TypeOfPokemon) {
    TypeOfPokemon["FIRE"] = "fire";
    TypeOfPokemon["WATER"] = "water";
    TypeOfPokemon["GRASS"] = "grass";
    TypeOfPokemon["POISON"] = "poison";
    TypeOfPokemon["BUG"] = "bug";
    TypeOfPokemon["ELECTRIC"] = "electric";
    TypeOfPokemon["NORMAL"] = "normal";
    TypeOfPokemon["FLYING"] = "flying";
    TypeOfPokemon["ROCK"] = "rock";
    TypeOfPokemon["GROUND"] = "ground";
    TypeOfPokemon["PSYCHIC"] = "psychic";
    TypeOfPokemon["FIGHTING"] = "fighting";
    TypeOfPokemon["DRAGON"] = "dragon";
    TypeOfPokemon["DARK"] = "dark";
    TypeOfPokemon["FAIRY"] = "fairy";
    TypeOfPokemon["GHOST"] = "ghost";
    TypeOfPokemon["ICE"] = "ice";
    TypeOfPokemon["STEEL"] = "steel";
})(TypeOfPokemon || (TypeOfPokemon = {}));
;
function switchTypeForCoverFunc(type) {
    const coverElement = document.querySelector(".cover");
    const opacityLevel = '0.25';
    switch (type.name) {
        case TypeOfPokemon.GRASS:
            coverElement.style.backgroundColor = `rgba(155,204,80,${opacityLevel})`;
            break;
        case TypeOfPokemon.WATER:
            coverElement.style.backgroundColor = `rgba(69,146,196,${opacityLevel})`;
            break;
        case TypeOfPokemon.FIRE:
            coverElement.style.backgroundColor = `rgba(253,125,36,${opacityLevel})`;
            break;
        case TypeOfPokemon.BUG:
            coverElement.style.backgroundColor = `rgba(115,160,64,${opacityLevel})`;
            break;
        case TypeOfPokemon.POISON:
            coverElement.style.backgroundColor = `rgb(186,128,202,${opacityLevel})`;
            break;
        case TypeOfPokemon.ELECTRIC:
            coverElement.style.backgroundColor = `rgba(238,213,53,${opacityLevel})`;
            break;
        case TypeOfPokemon.NORMAL:
            coverElement.style.backgroundColor = `rgba(165,173,176,${opacityLevel})`;
            break;
        case TypeOfPokemon.FLYING:
            coverElement.style.backgroundColor = `rgba(181,222,233,${opacityLevel})`;
            break;
        case TypeOfPokemon.ROCK:
            coverElement.style.backgroundColor = `rgba(88,83,79,${opacityLevel})`;
            break;
        case TypeOfPokemon.GROUND:
            coverElement.style.backgroundColor = `rgba(171,152,66,${opacityLevel})`;
            break;
        case TypeOfPokemon.PSYCHIC:
            coverElement.style.backgroundColor = `rgba(244,103,186,${opacityLevel})`;
            break;
        case TypeOfPokemon.FIGHTING:
            coverElement.style.backgroundColor = `rgba(213,103,35,${opacityLevel})`;
            break;
        case TypeOfPokemon.DRAGON:
            coverElement.style.backgroundColor = `rgba(83,164,207,${opacityLevel})`;
            break;
        case TypeOfPokemon.DARK:
            coverElement.style.backgroundColor = `rgba(112,112,112,${opacityLevel})`;
            break;
        case TypeOfPokemon.FAIRY:
            coverElement.style.backgroundColor = `rgba(253,185,233,${opacityLevel})`;
            break;
        case TypeOfPokemon.GHOST:
            coverElement.style.backgroundColor = `rgba(123,98,163,${opacityLevel})`;
            break;
        case TypeOfPokemon.ICE:
            coverElement.style.backgroundColor = `rgba(81,196,231,${opacityLevel})`;
            break;
        case TypeOfPokemon.STEEL:
            coverElement.style.backgroundColor = `rgba(158,183,184,${opacityLevel})`;
            break;
        default:
            return;
    }
}
exports.switchTypeForCoverFunc = switchTypeForCoverFunc;
function switchForPokemonTypeFunc(ele, pokemonType, className) {
    switch (ele.type.name) {
        case TypeOfPokemon.GRASS:
            pokemonType.setAttribute("class", `${TypeOfPokemon.GRASS} ${className}`);
            break;
        case TypeOfPokemon.WATER:
            pokemonType.setAttribute("class", `${TypeOfPokemon.WATER} ${className}`);
            break;
        case TypeOfPokemon.FIRE:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FIRE} ${className}`);
            break;
        case TypeOfPokemon.BUG:
            pokemonType.setAttribute("class", `${TypeOfPokemon.BUG} ${className}`);
            break;
        case TypeOfPokemon.POISON:
            pokemonType.setAttribute("class", `${TypeOfPokemon.POISON} ${className}`);
            break;
        case TypeOfPokemon.ELECTRIC:
            pokemonType.setAttribute("class", `${TypeOfPokemon.ELECTRIC} ${className}`);
            break;
        case TypeOfPokemon.NORMAL:
            pokemonType.setAttribute("class", `${TypeOfPokemon.NORMAL} ${className}`);
            break;
        case TypeOfPokemon.FLYING:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FLYING} ${className}`);
            break;
        case TypeOfPokemon.ROCK:
            pokemonType.setAttribute("class", `${TypeOfPokemon.ROCK} ${className}`);
            break;
        case TypeOfPokemon.GROUND:
            pokemonType.setAttribute("class", `${TypeOfPokemon.GROUND} ${className}`);
            break;
        case TypeOfPokemon.PSYCHIC:
            pokemonType.setAttribute("class", `${TypeOfPokemon.PSYCHIC} ${className}`);
            break;
        case TypeOfPokemon.FIGHTING:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FIGHTING} ${className}`);
            break;
        case TypeOfPokemon.DRAGON:
            pokemonType.setAttribute("class", `${TypeOfPokemon.DRAGON} ${className}`);
            break;
        case TypeOfPokemon.DARK:
            pokemonType.setAttribute("class", `${TypeOfPokemon.DARK} ${className}`);
            break;
        case TypeOfPokemon.FAIRY:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FAIRY} ${className}`);
            break;
        case TypeOfPokemon.GHOST:
            pokemonType.setAttribute("class", `${TypeOfPokemon.GHOST} ${className}`);
            break;
        case TypeOfPokemon.ICE:
            pokemonType.setAttribute("class", `${TypeOfPokemon.ICE} ${className}`);
            break;
        case TypeOfPokemon.STEEL:
            pokemonType.setAttribute("class", `${TypeOfPokemon.STEEL} ${className}`);
            break;
        default:
            return;
    }
}
exports.switchForPokemonTypeFunc = switchForPokemonTypeFunc;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		if(__webpack_module_cache__[moduleId]) {
/******/ 			return __webpack_module_cache__[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.ts");
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2ZldGNoRGF0YS50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2dlbmVyYXRlVG9ET00udHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvdXRpbHMvZ2VuZXJhdGVEZXRhaWxzLnRzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvdXRpbHMvc2VhcmNoUG9rZW1vbi50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL3V0aWxzL3N3aXRjaFR5cGUudHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CLEdBQUcsc0JBQXNCO0FBQzdDLG9CQUFvQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3pDLHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMkJBQTJCO0FBQ3ZDO0FBQ0EsMkVBQTJFLGdCQUFnQjtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJCQUEy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O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2VuZXJhdGVWaWV3ID0gZXhwb3J0cy5yYW5nZU9mTG9hZGluZyA9IHZvaWQgMDtcclxuY29uc3QgZmV0Y2hEYXRhXzEgPSByZXF1aXJlKFwiLi9mZXRjaERhdGFcIik7XHJcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRpb25cIik7XHJcbmV4cG9ydHMucmFuZ2VPZkxvYWRpbmcgPSB7XHJcbiAgICBmcm9tOiAwLFxyXG4gICAgaG93TWFueTogMTIsXHJcbiAgICB0eXBlOiBcIlwiXHJcbn07XHJcbmNsYXNzIEdlbmVyYXRlVmlldyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlT2ZTb3J0KSB7XHJcbiAgICAgICAgdGhpcy5sb2FkTW9yZVBva2Vtb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSA9IGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSArIDEyO1xyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0aGlzLnR5cGVTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdzY3JvbGwnLCBHZW5lcmF0ZVZpZXcuc2Nyb2xsRmVhdHVyZSwgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50eXBlU29ydCA9IHR5cGVPZlNvcnQ7XHJcbiAgICAgICAgLy9JbmljaWFsIGFkZEV2ZW50TGlzdGVuZXIgZm9yIGxvYWRNb3JlQnRuXHJcbiAgICAgICAgY29uc3QgbG9hZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlXCIpO1xyXG4gICAgICAgIGxvYWRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmxvYWRNb3JlUG9rZW1vbigpKTtcclxuICAgICAgICBjb25zdCBjbG9zZURldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlsc19fY2xvc2VCdG4nKTtcclxuICAgICAgICBjbG9zZURldGFpbHMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscycpO1xyXG4gICAgICAgICAgICBjb25zdCBldm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZvJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFsbFN0YXRzQmFyID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5zdGF0c19fYmFyJyldO1xyXG4gICAgICAgICAgICBhbGxTdGF0c0Jhci5mb3JFYWNoKChlbGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGVsZS5zdHlsZS5oZWlnaHQgPSAnMCUnO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdhdXRvJztcclxuICAgICAgICAgICAgZGV0YWlscy5jbGFzc0xpc3QucmVtb3ZlKCdkZXRhaWxzLS1vblBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIGV2b0NvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImV2b0NvdmVyXCI+PC9kaXY+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkdlbmVyYXRlVmlldyA9IEdlbmVyYXRlVmlldztcclxuR2VuZXJhdGVWaWV3LmluaXRpYWxHZW5lcmF0ZSA9ICh0eXBlT2ZTb3J0KSA9PiB7XHJcbiAgICBzd2l0Y2ggKHR5cGVPZlNvcnQpIHtcclxuICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFOlxyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUw6XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uQ09MT1I6XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0FNRTpcclxuICAgICAgICAgICAgbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQodHlwZU9mU29ydCwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmhvd01hbnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICB9XHJcbiAgICBHZW5lcmF0ZVZpZXcuc2V0VGl0bGUodHlwZU9mU29ydCk7XHJcbn07XHJcbkdlbmVyYXRlVmlldy5zY3JvbGxGZWF0dXJlID0gKCkgPT4ge1xyXG4gICAgdmFyIF9hO1xyXG4gICAgKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBva2Vtb25TZWN0aW9uX19sb2FkTW9yZScpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LmFkZCgncG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlLS1kaXNhYmxlJyk7XHJcbiAgICBjb25zdCBzY3JvbGxIZWlnaHQgPSB3aW5kb3cuc2Nyb2xsWTtcclxuICAgIGlmICgod2luZG93LmlubmVySGVpZ2h0ICsgc2Nyb2xsSGVpZ2h0KSA+PSBkb2N1bWVudC5ib2R5LnNjcm9sbEhlaWdodCkge1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20gPSBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20gKyAxMjtcclxuICAgICAgICAgICAgbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQoJ2dlbmVyYWwnLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgfSwgNDAwKTtcclxuICAgIH1cclxufTtcclxuR2VuZXJhdGVWaWV3LnNldFRpdGxlID0gKHR5cGUpID0+IHtcclxuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX3RpdGxlXCIpO1xyXG4gICAgc2VjdGlvblRpdGxlLnRleHRDb250ZW50ID0gdHlwZTtcclxufTtcclxuY29uc3QgbWVudUl0ZW1PbmUgPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFKTtcclxuY29uc3QgbWVudUl0ZW1Ud28gPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKTtcclxuY29uc3QgbWVudUl0ZW1UaHJlZSA9IG5ldyBuYXZpZ2F0aW9uXzEuTWVudUl0ZW1FZmZlY3QobmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKTtcclxuY29uc3QgbWVudUl0ZW1Gb3VyID0gbmV3IG5hdmlnYXRpb25fMS5NZW51SXRlbUVmZmVjdChuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0FNRSk7XHJcbmNvbnN0IGdldFZpZXcgPSBuZXcgR2VuZXJhdGVWaWV3KCdnZW5lcmFsJyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUG9rZW1vbkdldCA9IHZvaWQgMDtcclxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcclxuY29uc3QgZ2VuZXJhdGVUb0RPTV8xID0gcmVxdWlyZShcIi4vZ2VuZXJhdGVUb0RPTVwiKTtcclxuY2xhc3MgUG9rZW1vbkdldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlT2ZTb3J0LCBmcm9tLCBob3dNYW55KSB7XHJcbiAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmMgPSAoQVBJLCBBUElUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKEFQSSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzLmZvckVhY2goKHR5cGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFQSVR5cGUgPT09IG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZVR5cGVUb0RPTS5nZW5lcmF0ZVR5cGVzVG9ET00odHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFQSVR5cGUgPT09IG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVRvRE9NXzEuR2VuZXJhdGVDb2xvclRvRE9NLmdlbmVyYXRlQ29sb3JzVG9ET00odHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFQSVR5cGUgPT09IG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZUdlbmVyYWxUb0RPTS5nZW5lcmF0ZUdlbmVyYWxUb0RPTSh0eXBlLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUlwiLCBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHlwZUFQSSA9IGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3R5cGUvYDtcclxuICAgICAgICB0aGlzLmdlbmVyYWxBUEkgPSBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLz9vZmZzZXQ9JHtmcm9tfSZsaW1pdD0ke2hvd01hbnl9YDtcclxuICAgICAgICB0aGlzLmNvbG9yQVBJID0gYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi1jb2xvci9gO1xyXG4gICAgICAgIHRoaXMuYWxsUG9rZW1vbiA9IFtdO1xyXG4gICAgICAgIC8vIC8vVEVTVFxyXG4gICAgICAgIC8vICAgICBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLz9vZmZzZXQ9MCZsaW1pdD04OThgKVxyXG4gICAgICAgIC8vICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAvLyAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBjb25zdCByZXN1bHRzQ29weSA9IFsuLi5kYXRhLnJlc3VsdHNdO1xyXG4gICAgICAgIC8vICAgICAgICAgcmVzdWx0c0NvcHkuZm9yRWFjaCgoZWxlKT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgIGZldGNoKGVsZS51cmwpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgLnRoZW4oZWFjaFBva2UgPT4ge1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBwb2tlbW9uQ29sbGVjdC5wdXNoKGVhY2hQb2tlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgcG9rZW1vbkNvbGxlY3Quc29ydChmdW5jdGlvbiAoYTphbnksIGI6YW55KSB7IHJldHVybiBiLnN0YXRzWzVdLmJhc2Vfc3RhdCAtIGEuc3RhdHNbNV0uYmFzZV9zdGF0IH0pO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhwb2tlbW9uQ29sbGVjdClcclxuICAgICAgICAvLyAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyAvL1RFU1RcclxuICAgICAgICBzd2l0Y2ggKHR5cGVPZlNvcnQpIHtcclxuICAgICAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uVFlQRTpcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29sb3JPclR5cGVGdW5jKHRoaXMudHlwZUFQSSwgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEUpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUw6XHJcbiAgICAgICAgICAgICAgICAvL0dldCBwb2tlbW9uIGFuZCBmZXRjaCBldmVyeSBzaW5nbGUgdXJsIHBva2Vtb24sIHB1c2ggaXQgdG8gdGhlIGFycmF5IGFuZCBzZW5kIHRvIHNvcnREYXRhIGZ1bmN0aW9uXHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbG9yT3JUeXBlRnVuYyh0aGlzLmdlbmVyYWxBUEksIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUjpcclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29sb3JPclR5cGVGdW5jKHRoaXMuY29sb3JBUEksIG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0FNRTpcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmModGhpcy5nZW5lcmFsQVBJLCBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0VORVJBTCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUG9rZW1vbkdldCA9IFBva2Vtb25HZXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2VuZXJhdGVHZW5lcmFsVG9ET00gPSBleHBvcnRzLkdlbmVyYXRlQ29sb3JUb0RPTSA9IGV4cG9ydHMuR2VuZXJhdGVUeXBlVG9ET00gPSBleHBvcnRzLlNvcnRQb2tlbW9uID0gZXhwb3J0cy5HZW5lcmF0ZVBva2Vtb25Ub0RPTSA9IGV4cG9ydHMucG9rZW1vbkNvbGxlY3RJbkdlbmVyYWwgPSBleHBvcnRzLnBva2Vtb25Db2xsZWN0ID0gdm9pZCAwO1xyXG5jb25zdCBzd2l0Y2hUeXBlXzEgPSByZXF1aXJlKFwiLi91dGlscy9zd2l0Y2hUeXBlXCIpO1xyXG5jb25zdCBzZWFyY2hQb2tlbW9uXzEgPSByZXF1aXJlKFwiLi91dGlscy9zZWFyY2hQb2tlbW9uXCIpO1xyXG5jb25zdCBnZW5lcmF0ZURldGFpbHNfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL2dlbmVyYXRlRGV0YWlsc1wiKTtcclxuZXhwb3J0cy5wb2tlbW9uQ29sbGVjdCA9IFtdO1xyXG5leHBvcnRzLnBva2Vtb25Db2xsZWN0SW5HZW5lcmFsID0gW107XHJcbmNsYXNzIEdlbmVyYXRlUG9rZW1vblRvRE9NIHtcclxuICAgIGNvbnN0cnVjdG9yKGFsbFBva2Vtb24pIHtcclxuICAgICAgICAvL0hlcmUgZ29lcyBiZWZvcmUgcHJlcGFyZWQgYXJyYXkgb2YgYWxsIHBva2Vtb25zIChwYXJ0IG9uZSBieSBvbmUgbm90IGFsbCBpbiBvbmUpIERPTSBpc24ndCBjbGVhbiBoZXJlLCBzbyBldmVyeSBwYXJ0IGdvZXMgdG8gdGhlIGVuZCBvZiBjb250YWluZXJcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUG9rZW1vbkluRE9NID0gKGFsbFBva2Vtb24pID0+IHtcclxuICAgICAgICAgICAgYWxsUG9rZW1vbi5mb3JFYWNoKChwb2tlbW9uLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hLCBfYiwgX2M7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuZXdDYXJkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uSWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uTmFtZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2Vtb25JbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHR5cGVDb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwb2tlbW9uX19jYXJkXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IGdlbmVyYXRlRGV0YWlsc18xLkdlbmVyYXRlRGV0YWlscy5wb2tlbW9uRGV0YWlscyhwb2tlbW9uKSk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uTmFtZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX25hbWVcIik7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uTmFtZS50ZXh0Q29udGVudCA9IHBva2Vtb24ubmFtZTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbk5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9rZW1vbklkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsICdwb2tlbW9uX19pZCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vbkltZ1VybCA9IChfYiA9IChfYSA9IHBva2Vtb24gPT09IG51bGwgfHwgcG9rZW1vbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9rZW1vbi5zcHJpdGVzKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2Eub3RoZXJbJ29mZmljaWFsLWFydHdvcmsnXSkgPT09IG51bGwgfHwgX2IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9iLmZyb250X2RlZmF1bHQ7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9rZW1vbkltZ1VybCAhPT0gbnVsbCAmJiBwb2tlbW9uSW1nVXJsICE9PSB2b2lkIDAgPyBwb2tlbW9uSW1nVXJsIDogZmFsc2UpIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCBgJHtwb2tlbW9uSW1nVXJsfWApO1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JbWcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwb2tlbW9uX19pbWdcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJsb2FkaW5nXCIsIFwibGF6eVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdDYXJkLmFwcGVuZENoaWxkKHBva2Vtb25JbWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgJy9pbWFnZXMvcXVlc3Rpb25NYXJrLnN2ZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JbWcuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwb2tlbW9uX19xdWVzdGlvbk1hcmtcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZChwb2tlbW9uSW1nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vQWRkIElEIG9mIHBva2Vtb24gdG8gZXZlcnkgY29udGFpbmVyIGludG8gY2FyZFxyXG4gICAgICAgICAgICAgICAgaWYgKHBva2Vtb24uaWQgPCAxMClcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWQudGV4dENvbnRlbnQgPSBgIzAwJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgICAgICAgICBpZiAocG9rZW1vbi5pZCA+PSAxMCAmJiBpbmRleCA8IDEwMClcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWQudGV4dENvbnRlbnQgPSBgIzAke3Bva2Vtb24uaWR9YDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uLmlkID49IDEwMClcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSWQudGV4dENvbnRlbnQgPSBgIyR7cG9rZW1vbi5pZH1gO1xyXG4gICAgICAgICAgICAgICAgLy9BZGQgdHlwZSBvciB0eXBlcyBvZiBwb2tlbW9uIHRvIGV2ZXJ5IGNvbnRhaW5lciBpbnRvIGNhcmRcclxuICAgICAgICAgICAgICAgIChfYyA9IHBva2Vtb24gPT09IG51bGwgfHwgcG9rZW1vbiA9PT0gdm9pZCAwID8gdm9pZCAwIDogcG9rZW1vbi50eXBlcykgPT09IG51bGwgfHwgX2MgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9jLmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBva2Vtb25UeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInBcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vblR5cGUudGV4dENvbnRlbnQgPSBgJHtlbGUudHlwZS5uYW1lfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgc3dpdGNoVHlwZV8xLnN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyhlbGUsIHBva2Vtb25UeXBlLCAncG9rZW1vbl9fdHlwZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0dldCBldmVyeSBvZiB0aGVzZSBjcmVhdGVkIGVsZW1lbnQgYW5kIGFkZCBpdCBpbnRvIG5ld0NhcmQgYW5kIG5leHQgLSBuZXdDYXJkIHRvIHRoZSBlbmQgb2YgcG9rZW1vblNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwb2tlbW9uX190eXBlQ29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZCh0eXBlQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbklkKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuc2V0QXR0cmlidXRlKCdpZCcsIGAke3Bva2Vtb24uaWR9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uJyk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIG5ld0NhcmQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQb2tlbW9uSW5ET00oYWxsUG9rZW1vbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVBva2Vtb25Ub0RPTSA9IEdlbmVyYXRlUG9rZW1vblRvRE9NO1xyXG5jbGFzcyBTb3J0UG9rZW1vbiB7XHJcbn1cclxuZXhwb3J0cy5Tb3J0UG9rZW1vbiA9IFNvcnRQb2tlbW9uO1xyXG5Tb3J0UG9rZW1vbi5zb3J0QWxsUG9rZW1vbiA9IChlYWNoUG9rZSkgPT4ge1xyXG4gICAgZXhwb3J0cy5wb2tlbW9uQ29sbGVjdC5wdXNoKGVhY2hQb2tlKTtcclxuICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3Quc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5pZCAtIGIuaWQ7IH0pO1xyXG4gICAgZXhwb3J0cy5wb2tlbW9uQ29sbGVjdEluR2VuZXJhbC5wdXNoKGVhY2hQb2tlKTtcclxuICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3RJbkdlbmVyYWwuc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5pZCAtIGIuaWQ7IH0pO1xyXG59O1xyXG5jbGFzcyBHZW5lcmF0ZVR5cGVUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVR5cGVUb0RPTSA9IEdlbmVyYXRlVHlwZVRvRE9NO1xyXG5HZW5lcmF0ZVR5cGVUb0RPTS5nZW5lcmF0ZVR5cGVzVG9ET00gPSAodHlwZSkgPT4ge1xyXG4gICAgaWYgKCh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgJiYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS5uYW1lKSAhPT0gJ3Vua25vd24nICYmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgIT09ICdzaGFkb3cnKSB7XHJcbiAgICAgICAgY29uc3Qgc29ydFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGBzb3J0VHlwZV9fJHt0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZX0gc29ydFR5cGVfX3R5cGVgKTtcclxuICAgICAgICB0eXBlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2Vtb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uXCIpO1xyXG4gICAgICAgICAgICBzd2l0Y2hUeXBlXzEuc3dpdGNoVHlwZUZvckNvdmVyRnVuYyh0eXBlKTtcclxuICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgZmV0Y2godHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLnVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wb2tlbW9uICYmIEFycmF5LmlzQXJyYXkoZGF0YS5wb2tlbW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uZVR5cGVQb2tlbW9uID0gWy4uLmRhdGEucG9rZW1vbl07XHJcbiAgICAgICAgICAgICAgICAgICAgb25lVHlwZVBva2Vtb24uZm9yRWFjaCgoZWxlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChlbGUucG9rZW1vbi51cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihlYWNoUG9rZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3J0UG9rZW1vbi5zb3J0QWxsUG9rZW1vbihlYWNoUG9rZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25lVHlwZVBva2Vtb24ubGVuZ3RoID09PSBpbmRleCArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR2VuZXJhdGVQb2tlbW9uVG9ET00oZXhwb3J0cy5wb2tlbW9uQ29sbGVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0cy5wb2tlbW9uQ29sbGVjdC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdHlwZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZTtcclxuICAgICAgICBzb3J0U2VjdGlvbi5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XHJcbiAgICB9XHJcbn07XHJcbmNsYXNzIEdlbmVyYXRlQ29sb3JUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZUNvbG9yVG9ET00gPSBHZW5lcmF0ZUNvbG9yVG9ET007XHJcbkdlbmVyYXRlQ29sb3JUb0RPTS5nZW5lcmF0ZUNvbG9yc1RvRE9NID0gKGNvbG9yKSA9PiB7XHJcbiAgICBpZiAoY29sb3IgPT09IG51bGwgfHwgY29sb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbG9yLm5hbWUpIHtcclxuICAgICAgICBjb25zdCBzb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICBjb25zdCB0eXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdHlwZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYHNvcnRUeXBlX18ke2NvbG9yID09PSBudWxsIHx8IGNvbG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2xvci5uYW1lfSBzb3J0VHlwZV9fdHlwZWApO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9rZW1vblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25cIik7XHJcbiAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZldGNoKGNvbG9yID09PSBudWxsIHx8IGNvbG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2xvci51cmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9rZW1vbl9zcGVjaWVzICYmIEFycmF5LmlzQXJyYXkoZGF0YS5wb2tlbW9uX3NwZWNpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25lVHlwZVBva2Vtb24gPSBbLi4uZGF0YS5wb2tlbW9uX3NwZWNpZXNdO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uZVR5cGVQb2tlbW9uLmZvckVhY2goKGVsZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kaWZpY2F0ZVVSTCA9IEdlbmVyYXRlQ29sb3JUb0RPTS5tb2RpZmljYXRlVXJsKGVsZS51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChtb2RpZmljYXRlVVJMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZWFjaFBva2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydFBva2Vtb24uc29ydEFsbFBva2Vtb24oZWFjaFBva2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZVR5cGVQb2tlbW9uLmxlbmd0aCA9PT0gaW5kZXggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdlbmVyYXRlUG9rZW1vblRvRE9NKGV4cG9ydHMucG9rZW1vbkNvbGxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3QubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnRleHRDb250ZW50ID0gY29sb3IgPT09IG51bGwgfHwgY29sb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbG9yLm5hbWU7XHJcbiAgICAgICAgc29ydFNlY3Rpb24uYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xyXG4gICAgfVxyXG59O1xyXG5HZW5lcmF0ZUNvbG9yVG9ET00ubW9kaWZpY2F0ZVVybCA9ICh1cmwpID0+IHtcclxuICAgIGNvbnN0IHNwbGl0VXJsID0gdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIHJldHVybiBgJHtzcGxpdFVybFswXX0vLyR7c3BsaXRVcmxbMl19LyR7c3BsaXRVcmxbM119LyR7c3BsaXRVcmxbNF19L3Bva2Vtb24vJHtzcGxpdFVybFs2XX1gO1xyXG59O1xyXG5jbGFzcyBHZW5lcmF0ZUdlbmVyYWxUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZUdlbmVyYWxUb0RPTSA9IEdlbmVyYXRlR2VuZXJhbFRvRE9NO1xyXG5HZW5lcmF0ZUdlbmVyYWxUb0RPTS5nZW5lcmF0ZUdlbmVyYWxUb0RPTSA9ICh0eXBlLCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS5uYW1lKSB7XHJcbiAgICAgICAgZmV0Y2godHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLnVybClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGVhY2hQb2tlID0+IHtcclxuICAgICAgICAgICAgU29ydFBva2Vtb24uc29ydEFsbFBva2Vtb24oZWFjaFBva2UpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3J0U2VjdGlvbi5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hUZW1wbGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHNlYXJjaFRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB1dFRoaXNFbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgcHV0VGhpc0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ldyBzZWFyY2hQb2tlbW9uXzEuRmlsdGVyUG9rZW1vbkNvbGxlY3QoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIG5ldyBHZW5lcmF0ZVBva2Vtb25Ub0RPTShleHBvcnRzLnBva2Vtb25Db2xsZWN0KTtcclxuICAgICAgICAgICAgICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3QubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLk1lbnVJdGVtRWZmZWN0ID0gZXhwb3J0cy5NZW51SXRlbSA9IHZvaWQgMDtcclxuY29uc3QgYXBwXzEgPSByZXF1aXJlKFwiLi9hcHBcIik7XHJcbmNvbnN0IGdlbmVyYXRlVG9ET01fMSA9IHJlcXVpcmUoXCIuL2dlbmVyYXRlVG9ET01cIik7XHJcbnZhciBNZW51SXRlbTtcclxuKGZ1bmN0aW9uIChNZW51SXRlbSkge1xyXG4gICAgTWVudUl0ZW1bXCJUWVBFXCJdID0gXCJ0eXBlXCI7XHJcbiAgICBNZW51SXRlbVtcIkdFTkVSQUxcIl0gPSBcImdlbmVyYWxcIjtcclxuICAgIE1lbnVJdGVtW1wiQ09MT1JcIl0gPSBcImNvbG9yXCI7XHJcbiAgICBNZW51SXRlbVtcIkdBTUVcIl0gPSBcImdhbWVcIjtcclxufSkoTWVudUl0ZW0gPSBleHBvcnRzLk1lbnVJdGVtIHx8IChleHBvcnRzLk1lbnVJdGVtID0ge30pKTtcclxuO1xyXG5jbGFzcyBNZW51SXRlbUVmZmVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGVhclBva2Vtb25TZWN0aW9uQmVmb3JlR2VuZXJhdGUgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblwiKTtcclxuICAgICAgICAgICAgY29uc3QgdHlwZXNTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0VHlwZV9fY29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICB3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgYXBwXzEuR2VuZXJhdGVWaWV3LnNjcm9sbEZlYXR1cmUsIHsgY2FwdHVyZTogZmFsc2UgfSk7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBNZW51SXRlbS5HRU5FUkFMKSB7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCI8cCBjbGFzcz0ncG9rZW1vbl9fZHVtbXlUZXh0Jz5UaGVyZSBpcyBub3RoaW5nIHRvIGRpc3BsYXkgZm9yIHRoZSBtb21lbnQ8L3A+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHlwZXNTZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGFwcF8xLnJhbmdlT2ZMb2FkaW5nLmZyb20gPSAwO1xyXG4gICAgICAgICAgICBhcHBfMS5yYW5nZU9mTG9hZGluZy50eXBlID0gZWxlbWVudDtcclxuICAgICAgICAgICAgZ2VuZXJhdGVUb0RPTV8xLnBva2Vtb25Db2xsZWN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNsaWNrRWZmZWN0ID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmF2RWxlbWVudCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubmF2X19vcHRpb25gKV07XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2V3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2V3JhcHBlclwiKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2TGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2xpbmUnKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2Q2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpcmNsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBuYXZJbm5lckNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGVfX2lubmVyQ2lyY2xlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdmVyTW91c2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY292ZXJNb3VzZScpO1xyXG4gICAgICAgICAgICBjb25zdCBwb2tlZGV4U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZWRleFwiKTtcclxuICAgICAgICAgICAgY29uc3QgY292ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAoY292ZXJNb3VzZS5pZCAhPT0gJ21pbmltYWxpemVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTmF2RWxlbWVudHMoZWxlbWVudCwgbmF2RWxlbWVudCwgbmF2LCBuYXZDaXJjbGUsIG5hdklubmVyQ2lyY2xlLCBuYXZMaW5lLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBwb2tlZGV4U2VjdGlvbiwgY292ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmF2RWxlbWVudHMocG9rZWRleFNlY3Rpb24sIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIG5hdiwgbmF2Q2lyY2xlLCBuYXZJbm5lckNpcmNsZSwgbmF2TGluZSwgbmF2RWxlbWVudCwgY292ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhpZGVOYXZFbGVtZW50cyA9IChlbGVtZW50LCBuYXZFbGVtZW50LCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIHBva2VkZXhTZWN0aW9uLCBjb3ZlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcIm5hdl9fb3B0aW9uLS1oaWRlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZChcIm5hdi0taGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LmFkZChcIm5hdl9fbGluZS0taGlkZVwiKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXZXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ25hdldyYXBwZXItLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIGNvdmVyTW91c2UuY2xhc3NMaXN0LmFkZCgnY292ZXJNb3VzZS0taGlkZScpO1xyXG4gICAgICAgICAgICAgICAgcG9rZWRleFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncG9rZWRleC0tc2hvd0l0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb3Zlck1vdXNlLmlkID0gJ21pbmltYWxpemVkJztcclxuICAgICAgICAgICAgICAgIGNvdmVyLmNsYXNzTGlzdC5hZGQoJ2NvdmVyLS1sb3dlclBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIH0sIDc1MCk7XHJcbiAgICAgICAgICAgIC8vRG8gdGhpcyB3aXRoIGV2ZXJ5IGNsaWNrIGluIG5hdiBlbGVtZW50XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJQb2tlbW9uU2VjdGlvbkJlZm9yZUdlbmVyYXRlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlXCIpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gTWVudUl0ZW0uR0VORVJBTCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcInBva2Vtb25TZWN0aW9uX19sb2FkTW9yZS0tZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmUtLWRpc2FibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXBwXzEuR2VuZXJhdGVWaWV3LmluaXRpYWxHZW5lcmF0ZShlbGVtZW50KTtcclxuICAgICAgICAgICAgKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmVzY2FwZScpKSA9PT0gbnVsbCB8fCBfYSA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2EuY2xhc3NMaXN0LmFkZCgnZXNjYXBlLS1kaXNhYmxlJyk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNob3dOYXZFbGVtZW50cyA9IChwb2tlZGV4U2VjdGlvbiwgbmF2V3JhcHBlciwgY292ZXJNb3VzZSwgbmF2LCBuYXZDaXJjbGUsIG5hdklubmVyQ2lyY2xlLCBuYXZMaW5lLCBuYXZFbGVtZW50LCBjb3ZlcikgPT4ge1xyXG4gICAgICAgICAgICB2YXIgX2E7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2dhbWUnKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXZfX2dhbWUtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19nZW5lcmFsJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19nZW5lcmFsLS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fdHlwZScpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fdHlwZS0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2NvbG9yJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19jb2xvci0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIHBva2VkZXhTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ3Bva2VkZXgtLXNob3dJdCcpO1xyXG4gICAgICAgICAgICBuYXZXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ25hdldyYXBwZXItLWhpZGUnKTtcclxuICAgICAgICAgICAgY292ZXJNb3VzZS5jbGFzc0xpc3QucmVtb3ZlKCdjb3Zlck1vdXNlLS1oaWRlJyk7XHJcbiAgICAgICAgICAgIGNvdmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2NvdmVyLS1sb3dlclBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIGNvdmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjEpXCI7XHJcbiAgICAgICAgICAgIGNvdmVyTW91c2UuaWQgPSBcIlwiO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LS1oaWRlXCIsICduYXYtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2Q2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZS0taGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2SW5uZXJDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZSgnY2lyY2xlX19pbm5lckNpcmNsZS0taGlkZScsICdjaXJjbGVfX2lubmVyQ2lyY2xlLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fbGluZS0taGlkZVwiLCAnbmF2X19saW5lLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKFwibmF2X19vcHRpb24tLWhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgNzUwKTtcclxuICAgICAgICAgICAgY29uc3QgZGV0YWlsc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscycpO1xyXG4gICAgICAgICAgICBkZXRhaWxzRWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKCdkZXRhaWxzLS1vblBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnYXV0byc7XHJcbiAgICAgICAgICAgIChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lc2NhcGUnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5yZW1vdmUoJ2VzY2FwZS0tZGlzYWJsZScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5ob3ZlckVmZmVjdCA9IChlbGVtZW50LCBldmVudFR5cGUpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmF2RWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5uYXZfXyR7ZWxlbWVudH1gKTtcclxuICAgICAgICAgICAgY29uc3QgY292ZXJNb3VzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3Zlck1vdXNlJyk7XHJcbiAgICAgICAgICAgIGlmIChjb3Zlck1vdXNlLmlkICE9PSAnbWluaW1hbGl6ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnb3ZlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmNsYXNzTGlzdC5hZGQoYG5hdl9fJHtlbGVtZW50fS0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnbGVhdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2RWxlbWVudC5jbGFzc0xpc3QucmVtb3ZlKGBuYXZfXyR7ZWxlbWVudH0tLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2TGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2xpbmUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdklubmVyQ2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpcmNsZV9faW5uZXJDaXJjbGUnKTtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdvdmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QuYWRkKGBuYXYtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LmFkZCgnbmF2X19saW5lLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZJbm5lckNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGVfX2lubmVyQ2lyY2xlLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdsZWF2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShgbmF2LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5yZW1vdmUoJ25hdl9fbGluZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2SW5uZXJDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZSgnY2lyY2xlX19pbm5lckNpcmNsZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIGNvbnN0IGNvdmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5jb3Zlck1vdXNlX18ke2VsZW1lbnR9YCk7XHJcbiAgICAgICAgaWYgKGVsZW1lbnQgPT09ICdnZW5lcmFsJykge1xyXG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICAgICAgaWYgKGUud2hpY2ggPT09IDI3KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgKF9hID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdmVyTW91c2UnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC50b2dnbGUoJ2NvdmVyTW91c2UtLXNob3dNb3VzZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgY292ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsICgpID0+IHRoaXMuaG92ZXJFZmZlY3QoZWxlbWVudCwgJ292ZXInKSk7XHJcbiAgICAgICAgY292ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCAoKSA9PiB0aGlzLmhvdmVyRWZmZWN0KGVsZW1lbnQsICdsZWF2ZScpKTtcclxuICAgICAgICBjb3ZlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLmNsaWNrRWZmZWN0KGVsZW1lbnQpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLk1lbnVJdGVtRWZmZWN0ID0gTWVudUl0ZW1FZmZlY3Q7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2VuZXJhdGVEZXRhaWxzID0gdm9pZCAwO1xyXG5jb25zdCBzd2l0Y2hUeXBlXzEgPSByZXF1aXJlKFwiLi9zd2l0Y2hUeXBlXCIpO1xyXG5jbGFzcyBHZW5lcmF0ZURldGFpbHMge1xyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVEZXRhaWxzID0gR2VuZXJhdGVEZXRhaWxzO1xyXG5HZW5lcmF0ZURldGFpbHMucG9rZW1vbkRldGFpbHMgPSAocG9rZW1vbikgPT4ge1xyXG4gICAgZG9jdW1lbnQuYm9keS5zdHlsZS5vdmVyZmxvdyA9ICdoaWRkZW4nO1xyXG4gICAgY29uc3QgZGV0YWlsc0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZGV0YWlscycpO1xyXG4gICAgaWYgKGRldGFpbHNFbGVtZW50KSB7XHJcbiAgICAgICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NMaXN0LmFkZCgnZGV0YWlscy0tb25Qb3NpdGlvbicpO1xyXG4gICAgICAgIGNvbnN0IG5hbWVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWxzX19wb2tlbW9uTmFtZVwiKTtcclxuICAgICAgICBjb25zdCBpbWdDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWxzX19pbWdDb250ZW50XCIpO1xyXG4gICAgICAgIGxldCBwb2tlbW9uT3JkZXIgPSBcIlwiO1xyXG4gICAgICAgIGlmIChwb2tlbW9uLmlkIDwgMTApXHJcbiAgICAgICAgICAgIHBva2Vtb25PcmRlciA9IGAjMDAke3Bva2Vtb24uaWR9YDtcclxuICAgICAgICBpZiAocG9rZW1vbi5pZCA+PSAxMCAmJiBwb2tlbW9uLmlkIDwgMTAwKVxyXG4gICAgICAgICAgICBwb2tlbW9uT3JkZXIgPSBgIzAke3Bva2Vtb24uaWR9YDtcclxuICAgICAgICBpZiAocG9rZW1vbi5pZCA+PSAxMDApXHJcbiAgICAgICAgICAgIHBva2Vtb25PcmRlciA9IGAjJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgbmFtZUNvbnRlbnQuaW5uZXJIVE1MID0gYCR7cG9rZW1vbi5uYW1lfSA8c3BhbiBjbGFzcz1cImRldGFpbHNfX2lkXCI+JHtwb2tlbW9uT3JkZXJ9PC9zcGFuPmA7XHJcbiAgICAgICAgaW1nQ29udGVudC5zZXRBdHRyaWJ1dGUoXCJzcmNcIiwgYCR7cG9rZW1vbi5zcHJpdGVzLm90aGVyWydvZmZpY2lhbC1hcnR3b3JrJ10uZnJvbnRfZGVmYXVsdH1gKTtcclxuICAgICAgICBHZW5lcmF0ZURldGFpbHMuZ2VuZXJhdGVEZXNjcmlwdGlvbkNvbnRlbnQocG9rZW1vbik7XHJcbiAgICAgICAgR2VuZXJhdGVEZXRhaWxzLmdlbmVyYXRlVHlwZUNvbnRlbnQocG9rZW1vbik7XHJcbiAgICAgICAgR2VuZXJhdGVEZXRhaWxzLmdlbmVyYXRlU3RhdHNDb250ZW50KHBva2Vtb24pO1xyXG4gICAgICAgIEdlbmVyYXRlRGV0YWlscy5nZW5lcmF0ZUV2b2x1dGlvbkNvbnRlbnQocG9rZW1vbik7XHJcbiAgICB9XHJcbn07XHJcbkdlbmVyYXRlRGV0YWlscy5nZW5lcmF0ZURlc2NyaXB0aW9uQ29udGVudCA9IChwb2tlbW9uKSA9PiB7XHJcbiAgICBjb25zdCBkZXNjQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsc19fZGVzY3JpcHRpb25Db250ZW50XCIpO1xyXG4gICAgZGVzY0NvbnRlbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGNvbnN0IGRldGFpbEhlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGV0YWlsSGVpZ2h0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGV0YWlsc19fRGF0ZSBwb2tlbW9uRGF0ZScpO1xyXG4gICAgZGV0YWlsSGVpZ2h0LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cInBva2Vtb25EYXRlX19sYWJlbFwiPkhlaWdodDwvcD48cCBjbGFzcz1cInBva2Vtb25EYXRlX192YWx1ZVwiPiR7cG9rZW1vbi5oZWlnaHR9JzwvcD5gO1xyXG4gICAgY29uc3QgZGV0YWlsV2VpZ2h0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkZXRhaWxXZWlnaHQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkZXRhaWxzX19EYXRlIHBva2Vtb25EYXRlJyk7XHJcbiAgICBkZXRhaWxXZWlnaHQuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwicG9rZW1vbkRhdGVfX2xhYmVsXCI+V2VpZ2h0PC9wPjxwIGNsYXNzPVwicG9rZW1vbkRhdGVfX3ZhbHVlXCI+JHtwb2tlbW9uLndlaWdodH0gbGJzPC9wPmA7XHJcbiAgICBkZXNjQ29udGVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRldGFpbEhlaWdodCk7XHJcbiAgICBkZXNjQ29udGVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRldGFpbFdlaWdodCk7XHJcbiAgICBjb25zdCBwb2tlbW9uQWJpbGl0aWVzQXJyYXkgPSBbLi4ucG9rZW1vbi5hYmlsaXRpZXNdO1xyXG4gICAgY29uc3QgZGV0YWlsQWJpbGl0aWVzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkZXRhaWxBYmlsaXRpZXMuc2V0QXR0cmlidXRlKCdjbGFzcycsICdkZXRhaWxzX19EYXRlIHBva2Vtb25EYXRlJyk7XHJcbiAgICBjb25zdCB0aXRsZUFiaWxpdGllcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgIHRpdGxlQWJpbGl0aWVzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncG9rZW1vbkRhdGVfX2xhYmVsJyk7XHJcbiAgICB0aXRsZUFiaWxpdGllcy50ZXh0Q29udGVudCA9IFwiQWJpbGl0aWVzXCI7XHJcbiAgICBkZXRhaWxBYmlsaXRpZXMuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCB0aXRsZUFiaWxpdGllcyk7XHJcbiAgICBwb2tlbW9uQWJpbGl0aWVzQXJyYXkuZm9yRWFjaCgoYWJpbGl0eUVsZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRBYmlsaXR5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGN1cnJlbnRBYmlsaXR5LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAncG9rZW1vbkRhdGVfX3ZhbHVlJyk7XHJcbiAgICAgICAgY3VycmVudEFiaWxpdHkudGV4dENvbnRlbnQgPSBhYmlsaXR5RWxlLmFiaWxpdHkubmFtZTtcclxuICAgICAgICBkZXRhaWxBYmlsaXRpZXMuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBjdXJyZW50QWJpbGl0eSk7XHJcbiAgICB9KTtcclxuICAgIGRlc2NDb250ZW50Lmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZGV0YWlsQWJpbGl0aWVzKTtcclxufTtcclxuR2VuZXJhdGVEZXRhaWxzLmdlbmVyYXRlVHlwZUNvbnRlbnQgPSAocG9rZW1vbikgPT4ge1xyXG4gICAgY29uc3QgdHlwZUNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbHNfX3R5cGVDb250ZW50XCIpO1xyXG4gICAgdHlwZUNvbnRlbnQuaW5uZXJIVE1MID0gXCJcIjtcclxuICAgIGNvbnN0IHBva2Vtb25UeXBlc0FycmF5ID0gWy4uLnBva2Vtb24udHlwZXNdO1xyXG4gICAgcG9rZW1vblR5cGVzQXJyYXkuZm9yRWFjaCgoYWJpbGl0eUVsZSkgPT4ge1xyXG4gICAgICAgIGNvbnN0IGN1cnJlbnRUeXBlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGN1cnJlbnRUeXBlLnRleHRDb250ZW50ID0gYWJpbGl0eUVsZS50eXBlLm5hbWU7XHJcbiAgICAgICAgc3dpdGNoVHlwZV8xLnN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyhhYmlsaXR5RWxlLCBjdXJyZW50VHlwZSwgJ2RldGFpbHNfX3R5cGUnKTtcclxuICAgICAgICB0eXBlQ29udGVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGN1cnJlbnRUeXBlKTtcclxuICAgIH0pO1xyXG59O1xyXG5HZW5lcmF0ZURldGFpbHMuZ2VuZXJhdGVTdGF0c0NvbnRlbnQgPSAocG9rZW1vbikgPT4ge1xyXG4gICAgbGV0IE1heFN0YXRzVmFsdWU7XHJcbiAgICAoZnVuY3Rpb24gKE1heFN0YXRzVmFsdWUpIHtcclxuICAgICAgICBNYXhTdGF0c1ZhbHVlW01heFN0YXRzVmFsdWVbXCJIUFwiXSA9IDI1NV0gPSBcIkhQXCI7XHJcbiAgICAgICAgTWF4U3RhdHNWYWx1ZVtNYXhTdGF0c1ZhbHVlW1wiQVRUQUNLXCJdID0gMTgxXSA9IFwiQVRUQUNLXCI7XHJcbiAgICAgICAgTWF4U3RhdHNWYWx1ZVtNYXhTdGF0c1ZhbHVlW1wiREVGRU5TRVwiXSA9IDIzMF0gPSBcIkRFRkVOU0VcIjtcclxuICAgICAgICBNYXhTdGF0c1ZhbHVlW01heFN0YXRzVmFsdWVbXCJTQVRUQUNLXCJdID0gMTczXSA9IFwiU0FUVEFDS1wiO1xyXG4gICAgICAgIE1heFN0YXRzVmFsdWVbTWF4U3RhdHNWYWx1ZVtcIlNERUZFTlNFXCJdID0gMjMwXSA9IFwiU0RFRkVOU0VcIjtcclxuICAgICAgICBNYXhTdGF0c1ZhbHVlW01heFN0YXRzVmFsdWVbXCJTUEVFRFwiXSA9IDIwMF0gPSBcIlNQRUVEXCI7XHJcbiAgICB9KShNYXhTdGF0c1ZhbHVlIHx8IChNYXhTdGF0c1ZhbHVlID0ge30pKTtcclxuICAgIDtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2VIUCA9IGAkeygocG9rZW1vbi5zdGF0c1swXS5iYXNlX3N0YXQgLyBNYXhTdGF0c1ZhbHVlLkhQKSAqIDEwMCkudG9GaXhlZCgyKX0lYDtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2VBVFQgPSBgJHsoKHBva2Vtb24uc3RhdHNbMV0uYmFzZV9zdGF0IC8gTWF4U3RhdHNWYWx1ZS5BVFRBQ0spICogMTAwKS50b0ZpeGVkKDIpfSVgO1xyXG4gICAgY29uc3QgcGVyY2VudGFnZURFRiA9IGAkeygocG9rZW1vbi5zdGF0c1syXS5iYXNlX3N0YXQgLyBNYXhTdGF0c1ZhbHVlLkRFRkVOU0UpICogMTAwKS50b0ZpeGVkKDIpfSVgO1xyXG4gICAgY29uc3QgcGVyY2VudGFnZVNBVFQgPSBgJHsoKHBva2Vtb24uc3RhdHNbM10uYmFzZV9zdGF0IC8gTWF4U3RhdHNWYWx1ZS5TQVRUQUNLKSAqIDEwMCkudG9GaXhlZCgyKX0lYDtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2VTREVGID0gYCR7KChwb2tlbW9uLnN0YXRzWzRdLmJhc2Vfc3RhdCAvIE1heFN0YXRzVmFsdWUuU0RFRkVOU0UpICogMTAwKS50b0ZpeGVkKDIpfSVgO1xyXG4gICAgY29uc3QgcGVyY2VudGFnZVNQRUVEID0gYCR7KChwb2tlbW9uLnN0YXRzWzVdLmJhc2Vfc3RhdCAvIE1heFN0YXRzVmFsdWUuU1BFRUQpICogMTAwKS50b0ZpeGVkKDIpfSVgO1xyXG4gICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgY29uc3QgYmFySFAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXRzX19iYXJIcFwiKTtcclxuICAgICAgICBiYXJIUC5zdHlsZS5oZWlnaHQgPSBgJHtwZXJjZW50YWdlSFB9YDtcclxuICAgICAgICBjb25zdCBiYXJBVFQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXRzX19iYXJBdHRhY2tcIik7XHJcbiAgICAgICAgYmFyQVRULnN0eWxlLmhlaWdodCA9IGAke3BlcmNlbnRhZ2VBVFR9YDtcclxuICAgICAgICBjb25zdCBiYXJERUYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXRzX19iYXJEZWZlbnNlXCIpO1xyXG4gICAgICAgIGJhckRFRi5zdHlsZS5oZWlnaHQgPSBgJHtwZXJjZW50YWdlREVGfWA7XHJcbiAgICAgICAgY29uc3QgYmFyU0FUVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHNfX2JhclNBdHRhY2tcIik7XHJcbiAgICAgICAgYmFyU0FUVC5zdHlsZS5oZWlnaHQgPSBgJHtwZXJjZW50YWdlU0FUVH1gO1xyXG4gICAgICAgIGNvbnN0IGJhclNERUYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXRzX19iYXJTRGVmZW5zZVwiKTtcclxuICAgICAgICBiYXJTREVGLnN0eWxlLmhlaWdodCA9IGAke3BlcmNlbnRhZ2VTREVGfWA7XHJcbiAgICAgICAgY29uc3QgYmFyU1BFRUQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnN0YXRzX19iYXJTcGVlZFwiKTtcclxuICAgICAgICBiYXJTUEVFRC5zdHlsZS5oZWlnaHQgPSBgJHtwZXJjZW50YWdlU1BFRUR9YDtcclxuICAgIH0sIDI1MDApO1xyXG59O1xyXG5HZW5lcmF0ZURldGFpbHMuZ2VuZXJhdGVFdm9sdXRpb25Db250ZW50ID0gKHBva2Vtb24pID0+IHtcclxuICAgIGNvbnN0IHBva2Vtb25TcGVjaWVzQVBJID0gcG9rZW1vbi5zcGVjaWVzLnVybDtcclxuICAgIGZldGNoKHBva2Vtb25TcGVjaWVzQVBJKVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKHNwZWNpZXMgPT4ge1xyXG4gICAgICAgIGNvbnN0IGV2b0NoYWluQVBJID0gc3BlY2llcy5ldm9sdXRpb25fY2hhaW4udXJsO1xyXG4gICAgICAgIGZldGNoKGV2b0NoYWluQVBJKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZXZvRGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzRXZvbHZlVG8gPSBbLi4uZXZvRGF0YS5jaGFpbi5ldm9sdmVzX3RvXTtcclxuICAgICAgICAgICAgaWYgKGlzRXZvbHZlVG8ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygnVGVuIFBva2Vtb24gbmllIG1hIHByemVtaWFueSEnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGdlbmVyYXRlRmlyc3RFdm8gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmlyc3RFdm9BUEkgPSBldm9EYXRhLmNoYWluLnNwZWNpZXMubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7Zmlyc3RFdm9BUEl9L2ApXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgR2VuZXJhdGVEZXRhaWxzLmNyZWF0ZUV2b2x1dGlvbkRPTShkYXRhLCAnZmlyc3QnKTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBnZW5lcmF0ZUZpcnN0RXZvKCk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpc0V2b2x2ZVRvLmZvckVhY2goKGV2bykgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWNvbmRFdm9BUEkgPSBldm8uc3BlY2llcy5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7c2Vjb25kRXZvQVBJfS9gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdlbmVyYXRlRGV0YWlscy5jcmVhdGVFdm9sdXRpb25ET00oZGF0YSwgJ3NlY29uZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgYW5vdGhlckV2byA9IFsuLi5ldm8uZXZvbHZlc190b107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGFub3RoZXJFdm8ubGVuZ3RoICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdGhpcmRFdm9BUEkgPSBldm8uZXZvbHZlc190b1swXS5zcGVjaWVzLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke3RoaXJkRXZvQVBJfS9gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEdlbmVyYXRlRGV0YWlscy5jcmVhdGVFdm9sdXRpb25ET00oZGF0YSwgJ3RoaXJkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxufTtcclxuR2VuZXJhdGVEZXRhaWxzLmNyZWF0ZUV2b2x1dGlvbkRPTSA9IChwb2tlbW9uRGF0YSwgd2hpY2hFdm8pID0+IHtcclxuICAgIGNvbnN0IGV2b0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldm8nKTtcclxuICAgIGNvbnN0IGZpcnN0RXZvQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBmaXJzdEV2b0NvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgYGV2b19faXRlbSBldm9fXyR7d2hpY2hFdm99RXZvYCk7XHJcbiAgICBjb25zb2xlLmxvZyhwb2tlbW9uRGF0YSk7XHJcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IHBva2Vtb25EYXRhLm5hbWU7XHJcbiAgICBsZXQgcG9rZW1vbklkO1xyXG4gICAgaWYgKHBva2Vtb25EYXRhLmlkIDwgMTApXHJcbiAgICAgICAgcG9rZW1vbklkID0gYCMwMCR7cG9rZW1vbkRhdGEuaWR9YDtcclxuICAgIGlmIChwb2tlbW9uRGF0YS5pZCA+PSAxMCAmJiBwb2tlbW9uRGF0YS5pZCA8IDEwMClcclxuICAgICAgICBwb2tlbW9uSWQgPSBgIzAke3Bva2Vtb25EYXRhLmlkfWA7XHJcbiAgICBpZiAocG9rZW1vbkRhdGEuaWQgPj0gMTAwKVxyXG4gICAgICAgIHBva2Vtb25JZCA9IGAjJHtwb2tlbW9uRGF0YS5pZH1gO1xyXG4gICAgY29uc3QgcG9rZW1vbkltZ1VybCA9IHBva2Vtb25EYXRhLnNwcml0ZXMub3RoZXJbJ29mZmljaWFsLWFydHdvcmsnXS5mcm9udF9kZWZhdWx0O1xyXG4gICAgY29uc3QgcG9rZW1vblR5cGVzID0gWy4uLnBva2Vtb25EYXRhLnR5cGVzXTtcclxuICAgIGNvbnN0IG5hbWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgaW1nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgbmFtZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdldm9fX25hbWUnKTtcclxuICAgIGltZ0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdldm9fX2ltZycpO1xyXG4gICAgaW1nRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHBva2Vtb25JbWdVcmwpO1xyXG4gICAgbmFtZUVsZW1lbnQuaW5uZXJIVE1MID0gYCR7cG9rZW1vbk5hbWV9IDxzcGFuIGNsYXNzPVwiZXZvX19pZFwiPiR7cG9rZW1vbklkfTwvc3Bhbj5gO1xyXG4gICAgZmlyc3RFdm9Db250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBpbWdFbGVtZW50KTtcclxuICAgIGZpcnN0RXZvQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgbmFtZUVsZW1lbnQpO1xyXG4gICAgY29uc3QgZXZvVHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZXZvVHlwZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2V2b19fdHlwZUNvbnRhaW5lcicpO1xyXG4gICAgcG9rZW1vblR5cGVzLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjdXJyZW50VHlwZS50ZXh0Q29udGVudCA9IGVhY2gudHlwZS5uYW1lO1xyXG4gICAgICAgIHN3aXRjaFR5cGVfMS5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMoZWFjaCwgY3VycmVudFR5cGUsICdldm9fX3R5cGUnKTtcclxuICAgICAgICBldm9UeXBlQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgY3VycmVudFR5cGUpO1xyXG4gICAgfSk7XHJcbiAgICBmaXJzdEV2b0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGV2b1R5cGVDb250YWluZXIpO1xyXG4gICAgZXZvQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZmlyc3RFdm9Db250YWluZXIpO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkZpbHRlclBva2Vtb25Db2xsZWN0ID0gdm9pZCAwO1xyXG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuLi9hcHBcIik7XHJcbmNvbnN0IGdlbmVyYXRlVG9ET01fMSA9IHJlcXVpcmUoXCIuLi9nZW5lcmF0ZVRvRE9NXCIpO1xyXG5jbGFzcyBGaWx0ZXJQb2tlbW9uQ29sbGVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19pbnB1dCcpO1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idG4nKTtcclxuICAgICAgICBpZiAoc2VhcmNoQnV0dG9uKVxyXG4gICAgICAgICAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBGaWx0ZXJQb2tlbW9uQ29sbGVjdC5idXR0b25DbGlja0hhbmRsZXIoJ2NsaWNrJykpO1xyXG4gICAgICAgIGlmIChpbnB1dClcclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4gRmlsdGVyUG9rZW1vbkNvbGxlY3QuYnV0dG9uQ2xpY2tIYW5kbGVyKGUpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkZpbHRlclBva2Vtb25Db2xsZWN0ID0gRmlsdGVyUG9rZW1vbkNvbGxlY3Q7XHJcbkZpbHRlclBva2Vtb25Db2xsZWN0LmJ1dHRvbkNsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblwiKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2lucHV0Jyk7XHJcbiAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlXCIpO1xyXG4gICAgY29uc3Qgc2VhcmNoaW5nRWxlbWVudCA9IGlucHV0LnZhbHVlO1xyXG4gICAgaWYgKGUgPT09ICdjbGljaycgfHwgZS53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICBpZiAoc2VhcmNoaW5nRWxlbWVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBBUEkgPSBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7c2VhcmNoaW5nRWxlbWVudH1gO1xyXG4gICAgICAgICAgICBmZXRjaChBUEkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHBva2Vtb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZChcInBva2Vtb25TZWN0aW9uX19sb2FkTW9yZS0tZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2VBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIHBva2VBcnIucHVzaChwb2tlbW9uKTtcclxuICAgICAgICAgICAgICAgIGFwcF8xLnJhbmdlT2ZMb2FkaW5nLmZyb20gPSAwO1xyXG4gICAgICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgZ2VuZXJhdGVUb0RPTV8xLkdlbmVyYXRlUG9rZW1vblRvRE9NKHBva2VBcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBhbGVydChcIkl0J3Mgbm8gcG9rZW1vbiB3aXRoIG5hbWUgbGlrZSB0aGF0IVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcHBfMS5yYW5nZU9mTG9hZGluZy5mcm9tID0gMDtcclxuICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgYXBwXzEuR2VuZXJhdGVWaWV3LmluaXRpYWxHZW5lcmF0ZSgnZ2VuZXJhbCcpO1xyXG4gICAgICAgICAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwicG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlLS1kaXNhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMgPSBleHBvcnRzLnN3aXRjaFR5cGVGb3JDb3ZlckZ1bmMgPSB2b2lkIDA7XHJcbnZhciBUeXBlT2ZQb2tlbW9uO1xyXG4oZnVuY3Rpb24gKFR5cGVPZlBva2Vtb24pIHtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJGSVJFXCJdID0gXCJmaXJlXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiV0FURVJcIl0gPSBcIndhdGVyXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR1JBU1NcIl0gPSBcImdyYXNzXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiUE9JU09OXCJdID0gXCJwb2lzb25cIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJCVUdcIl0gPSBcImJ1Z1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIkVMRUNUUklDXCJdID0gXCJlbGVjdHJpY1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIk5PUk1BTFwiXSA9IFwibm9ybWFsXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRkxZSU5HXCJdID0gXCJmbHlpbmdcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJST0NLXCJdID0gXCJyb2NrXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR1JPVU5EXCJdID0gXCJncm91bmRcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJQU1lDSElDXCJdID0gXCJwc3ljaGljXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRklHSFRJTkdcIl0gPSBcImZpZ2h0aW5nXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRFJBR09OXCJdID0gXCJkcmFnb25cIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJEQVJLXCJdID0gXCJkYXJrXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRkFJUllcIl0gPSBcImZhaXJ5XCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR0hPU1RcIl0gPSBcImdob3N0XCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiSUNFXCJdID0gXCJpY2VcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJTVEVFTFwiXSA9IFwic3RlZWxcIjtcclxufSkoVHlwZU9mUG9rZW1vbiB8fCAoVHlwZU9mUG9rZW1vbiA9IHt9KSk7XHJcbjtcclxuZnVuY3Rpb24gc3dpdGNoVHlwZUZvckNvdmVyRnVuYyh0eXBlKSB7XHJcbiAgICBjb25zdCBjb3ZlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyXCIpO1xyXG4gICAgY29uc3Qgb3BhY2l0eUxldmVsID0gJzAuMjUnO1xyXG4gICAgc3dpdGNoICh0eXBlLm5hbWUpIHtcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JBU1M6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNTUsMjA0LDgwLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uV0FURVI6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg2OSwxNDYsMTk2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklSRTpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDI1MywxMjUsMzYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5CVUc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxMTUsMTYwLDY0LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUE9JU09OOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYigxODYsMTI4LDIwMiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkVMRUNUUklDOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjM4LDIxMyw1Mywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLk5PUk1BTDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDE2NSwxNzMsMTc2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkxZSU5HOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMTgxLDIyMiwyMzMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5ST0NLOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoODgsODMsNzksJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUk9VTkQ6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNzEsMTUyLDY2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUFNZQ0hJQzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDI0NCwxMDMsMTg2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklHSFRJTkc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgyMTMsMTAzLDM1LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRFJBR09OOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoODMsMTY0LDIwNywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkRBUks6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxMTIsMTEyLDExMiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkZBSVJZOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjUzLDE4NSwyMzMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HSE9TVDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDEyMyw5OCwxNjMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5JQ0U6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg4MSwxOTYsMjMxLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uU1RFRUw6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNTgsMTgzLDE4NCwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuc3dpdGNoVHlwZUZvckNvdmVyRnVuYyA9IHN3aXRjaFR5cGVGb3JDb3ZlckZ1bmM7XHJcbmZ1bmN0aW9uIHN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyhlbGUsIHBva2Vtb25UeXBlLCBjbGFzc05hbWUpIHtcclxuICAgIHN3aXRjaCAoZWxlLnR5cGUubmFtZSkge1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUkFTUzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5HUkFTU30gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5XQVRFUjpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5XQVRFUn0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GSVJFOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkZJUkV9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uQlVHOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkJVR30gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5QT0lTT046XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uUE9JU09OfSAke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkVMRUNUUklDOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkVMRUNUUklDfSAke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLk5PUk1BTDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5OT1JNQUx9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkxZSU5HOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkZMWUlOR30gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5ST0NLOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlJPQ0t9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JPVU5EOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkdST1VORH0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5QU1lDSElDOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlBTWUNISUN9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklHSFRJTkc6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRklHSFRJTkd9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRFJBR09OOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkRSQUdPTn0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5EQVJLOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkRBUkt9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkFJUlk6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRkFJUll9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR0hPU1Q6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uR0hPU1R9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uSUNFOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLklDRX0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5TVEVFTDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5TVEVFTH0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyA9IHN3aXRjaEZvclBva2Vtb25UeXBlRnVuYztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9
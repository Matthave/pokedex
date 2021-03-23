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
        }, 200);
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
                //After insert element
                const appearEffect = () => {
                    const eachPokemonCard = document.querySelectorAll('.pokemon__card');
                    eachPokemonCard.forEach((ele) => {
                        ele.classList.add('class', 'pokemon__card--afterEffect');
                    });
                };
                setTimeout(() => {
                    appearEffect();
                }, 750);
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
    const statsObj = {
        percentageHP,
        percentageATT,
        percentageDEF,
        percentageSATT,
        percentageSDEF,
        percentageSPEED
    };
    GenerateDetails.statsObj = statsObj;
    const detailWrapper = document.querySelector('.details');
    detailWrapper.addEventListener('scroll', GenerateDetails.showStats, { passive: true });
};
GenerateDetails.showStats = () => {
    const detailWrapper = document.querySelector('.details');
    const statsElement = document.querySelector('.stats');
    const windowHeight = window.innerHeight;
    const statsElementFromTop = statsElement.getBoundingClientRect().top;
    const { percentageHP, percentageATT, percentageDEF, percentageSATT, percentageSDEF, percentageSPEED } = GenerateDetails.statsObj;
    if (statsElementFromTop <= (windowHeight / 2)) {
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
        detailWrapper.removeEventListener('scroll', GenerateDetails.showStats, { capture: false });
    }
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
    firstEvoContainer.addEventListener('click', function () {
        const evo = document.querySelector('.evo');
        evo.innerHTML = '<div class="evoCover"></div>';
        GenerateDetails.pokemonDetails(pokemonData);
    });
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2ZldGNoRGF0YS50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2dlbmVyYXRlVG9ET00udHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvdXRpbHMvZ2VuZXJhdGVEZXRhaWxzLnRzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvdXRpbHMvc2VhcmNoUG9rZW1vbi50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL3V0aWxzL3N3aXRjaFR5cGUudHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsb0JBQW9CLEdBQUcsc0JBQXNCO0FBQzdDLG9CQUFvQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3pDLHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDLHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMkJBQTJCO0FBQ3ZDO0FBQ0EsMkVBQTJFLGdCQUFnQjtBQUMzRjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLDJCQUEy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QUcsVUFBVTtBQUNqRjtBQUNBO0FBQ0EsaURBQWlELG9CQUFvQixHQUFHLFVBQVU7QUFDbEY7QUFDQTtBQUNBLGlEQUFpRCxvQkFBb0IsR0FBRyxVQUFVO0FBQ2xGO0FBQ0E7QUFDQSxpREFBaUQsa0JBQWtCLEdBQUcsVUFBVTtBQUNoRjtBQUNBO0FBQ0EsaURBQWlELG9CQUFvQixHQUFHLFVBQVU7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdDQUFnQzs7Ozs7OztVQ3BKaEM7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7VUNyQkE7VUFDQTtVQUNBO1VBQ0EiLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5HZW5lcmF0ZVZpZXcgPSBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nID0gdm9pZCAwO1xyXG5jb25zdCBmZXRjaERhdGFfMSA9IHJlcXVpcmUoXCIuL2ZldGNoRGF0YVwiKTtcclxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcclxuZXhwb3J0cy5yYW5nZU9mTG9hZGluZyA9IHtcclxuICAgIGZyb206IDAsXHJcbiAgICBob3dNYW55OiAxMixcclxuICAgIHR5cGU6IFwiXCJcclxufTtcclxuY2xhc3MgR2VuZXJhdGVWaWV3IHtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGVPZlNvcnQpIHtcclxuICAgICAgICB0aGlzLmxvYWRNb3JlUG9rZW1vbiA9ICgpID0+IHtcclxuICAgICAgICAgICAgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tID0gZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tICsgMTI7XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHRoaXMudHlwZVNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIEdlbmVyYXRlVmlldy5zY3JvbGxGZWF0dXJlLCB7IHBhc3NpdmU6IHRydWUgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnR5cGVTb3J0ID0gdHlwZU9mU29ydDtcclxuICAgICAgICAvL0luaWNpYWwgYWRkRXZlbnRMaXN0ZW5lciBmb3IgbG9hZE1vcmVCdG5cclxuICAgICAgICBjb25zdCBsb2FkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmVcIik7XHJcbiAgICAgICAgbG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMubG9hZE1vcmVQb2tlbW9uKCkpO1xyXG4gICAgICAgIGNvbnN0IGNsb3NlRGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzX19jbG9zZUJ0bicpO1xyXG4gICAgICAgIGNsb3NlRGV0YWlscy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGV2b0NvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ldm8nKTtcclxuICAgICAgICAgICAgY29uc3QgYWxsU3RhdHNCYXIgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnN0YXRzX19iYXInKV07XHJcbiAgICAgICAgICAgIGFsbFN0YXRzQmFyLmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlLnN0eWxlLmhlaWdodCA9ICcwJSc7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICBkZXRhaWxzLmNsYXNzTGlzdC5yZW1vdmUoJ2RldGFpbHMtLW9uUG9zaXRpb24nKTtcclxuICAgICAgICAgICAgZXZvQ29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZXZvQ292ZXJcIj48L2Rpdj4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVWaWV3ID0gR2VuZXJhdGVWaWV3O1xyXG5HZW5lcmF0ZVZpZXcuaW5pdGlhbEdlbmVyYXRlID0gKHR5cGVPZlNvcnQpID0+IHtcclxuICAgIHN3aXRjaCAodHlwZU9mU29ydCkge1xyXG4gICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEU6XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0VORVJBTDpcclxuICAgICAgICAgICAgbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQodHlwZU9mU29ydCwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmhvd01hbnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUjpcclxuICAgICAgICAgICAgbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQodHlwZU9mU29ydCwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmhvd01hbnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FOlxyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgIH1cclxuICAgIEdlbmVyYXRlVmlldy5zZXRUaXRsZSh0eXBlT2ZTb3J0KTtcclxufTtcclxuR2VuZXJhdGVWaWV3LnNjcm9sbEZlYXR1cmUgPSAoKSA9PiB7XHJcbiAgICB2YXIgX2E7XHJcbiAgICAoX2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QuYWRkKCdwb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmUtLWRpc2FibGUnKTtcclxuICAgIGNvbnN0IHNjcm9sbEhlaWdodCA9IHdpbmRvdy5zY3JvbGxZO1xyXG4gICAgaWYgKCh3aW5kb3cuaW5uZXJIZWlnaHQgKyBzY3JvbGxIZWlnaHQpID49IGRvY3VtZW50LmJvZHkuc2Nyb2xsSGVpZ2h0KSB7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSA9IGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSArIDEyO1xyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCgnZ2VuZXJhbCcsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICB9LCAyMDApO1xyXG4gICAgfVxyXG59O1xyXG5HZW5lcmF0ZVZpZXcuc2V0VGl0bGUgPSAodHlwZSkgPT4ge1xyXG4gICAgY29uc3Qgc2VjdGlvblRpdGxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0VHlwZV9fdGl0bGVcIik7XHJcbiAgICBzZWN0aW9uVGl0bGUudGV4dENvbnRlbnQgPSB0eXBlO1xyXG59O1xyXG5jb25zdCBtZW51SXRlbU9uZSA9IG5ldyBuYXZpZ2F0aW9uXzEuTWVudUl0ZW1FZmZlY3QobmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEUpO1xyXG5jb25zdCBtZW51SXRlbVR3byA9IG5ldyBuYXZpZ2F0aW9uXzEuTWVudUl0ZW1FZmZlY3QobmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUwpO1xyXG5jb25zdCBtZW51SXRlbVRocmVlID0gbmV3IG5hdmlnYXRpb25fMS5NZW51SXRlbUVmZmVjdChuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uQ09MT1IpO1xyXG5jb25zdCBtZW51SXRlbUZvdXIgPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FKTtcclxuY29uc3QgZ2V0VmlldyA9IG5ldyBHZW5lcmF0ZVZpZXcoJ2dlbmVyYWwnKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Qb2tlbW9uR2V0ID0gdm9pZCAwO1xyXG5jb25zdCBuYXZpZ2F0aW9uXzEgPSByZXF1aXJlKFwiLi9uYXZpZ2F0aW9uXCIpO1xyXG5jb25zdCBnZW5lcmF0ZVRvRE9NXzEgPSByZXF1aXJlKFwiLi9nZW5lcmF0ZVRvRE9NXCIpO1xyXG5jbGFzcyBQb2tlbW9uR2V0IHtcclxuICAgIGNvbnN0cnVjdG9yKHR5cGVPZlNvcnQsIGZyb20sIGhvd01hbnkpIHtcclxuICAgICAgICB0aGlzLmdldENvbG9yT3JUeXBlRnVuYyA9IChBUEksIEFQSVR5cGUpID0+IHtcclxuICAgICAgICAgICAgZmV0Y2goQVBJKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJlc3VsdHMuZm9yRWFjaCgodHlwZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQVBJVHlwZSA9PT0gbmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVUb0RPTV8xLkdlbmVyYXRlVHlwZVRvRE9NLmdlbmVyYXRlVHlwZXNUb0RPTSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQVBJVHlwZSA9PT0gbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZUNvbG9yVG9ET00uZ2VuZXJhdGVDb2xvcnNUb0RPTSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQVBJVHlwZSA9PT0gbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVUb0RPTV8xLkdlbmVyYXRlR2VuZXJhbFRvRE9NLmdlbmVyYXRlR2VuZXJhbFRvRE9NKHR5cGUsIGluZGV4KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SXCIsIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50eXBlQVBJID0gYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvdHlwZS9gO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhbEFQSSA9IGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vP29mZnNldD0ke2Zyb219JmxpbWl0PSR7aG93TWFueX1gO1xyXG4gICAgICAgIHRoaXMuY29sb3JBUEkgPSBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLWNvbG9yL2A7XHJcbiAgICAgICAgdGhpcy5hbGxQb2tlbW9uID0gW107XHJcbiAgICAgICAgLy8gLy9URVNUXHJcbiAgICAgICAgLy8gICAgIGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vP29mZnNldD0wJmxpbWl0PTg5OGApXHJcbiAgICAgICAgLy8gICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC8vICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAvLyAgICAgICAgIGNvbnN0IHJlc3VsdHNDb3B5ID0gWy4uLmRhdGEucmVzdWx0c107XHJcbiAgICAgICAgLy8gICAgICAgICByZXN1bHRzQ29weS5mb3JFYWNoKChlbGUpPT57XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgZmV0Y2goZWxlLnVybClcclxuICAgICAgICAvLyAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAvLyAgICAgICAgICAgICAudGhlbihlYWNoUG9rZSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIHBva2Vtb25Db2xsZWN0LnB1c2goZWFjaFBva2UpO1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBwb2tlbW9uQ29sbGVjdC5zb3J0KGZ1bmN0aW9uIChhOmFueSwgYjphbnkpIHsgcmV0dXJuIGIuc3RhdHNbNV0uYmFzZV9zdGF0IC0gYS5zdGF0c1s1XS5iYXNlX3N0YXQgfSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHBva2Vtb25Db2xsZWN0KVxyXG4gICAgICAgIC8vICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgLy8gICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICB9KVxyXG4gICAgICAgIC8vIC8vVEVTVFxyXG4gICAgICAgIHN3aXRjaCAodHlwZU9mU29ydCkge1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmModGhpcy50eXBlQVBJLCBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uVFlQRSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0VORVJBTDpcclxuICAgICAgICAgICAgICAgIC8vR2V0IHBva2Vtb24gYW5kIGZldGNoIGV2ZXJ5IHNpbmdsZSB1cmwgcG9rZW1vbiwgcHVzaCBpdCB0byB0aGUgYXJyYXkgYW5kIHNlbmQgdG8gc29ydERhdGEgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29sb3JPclR5cGVGdW5jKHRoaXMuZ2VuZXJhbEFQSSwgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmModGhpcy5jb2xvckFQSSwgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbG9yT3JUeXBlRnVuYyh0aGlzLmdlbmVyYWxBUEksIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Qb2tlbW9uR2V0ID0gUG9rZW1vbkdldDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5HZW5lcmF0ZUdlbmVyYWxUb0RPTSA9IGV4cG9ydHMuR2VuZXJhdGVDb2xvclRvRE9NID0gZXhwb3J0cy5HZW5lcmF0ZVR5cGVUb0RPTSA9IGV4cG9ydHMuU29ydFBva2Vtb24gPSBleHBvcnRzLkdlbmVyYXRlUG9rZW1vblRvRE9NID0gZXhwb3J0cy5wb2tlbW9uQ29sbGVjdEluR2VuZXJhbCA9IGV4cG9ydHMucG9rZW1vbkNvbGxlY3QgPSB2b2lkIDA7XHJcbmNvbnN0IHN3aXRjaFR5cGVfMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3N3aXRjaFR5cGVcIik7XHJcbmNvbnN0IHNlYXJjaFBva2Vtb25fMSA9IHJlcXVpcmUoXCIuL3V0aWxzL3NlYXJjaFBva2Vtb25cIik7XHJcbmNvbnN0IGdlbmVyYXRlRGV0YWlsc18xID0gcmVxdWlyZShcIi4vdXRpbHMvZ2VuZXJhdGVEZXRhaWxzXCIpO1xyXG5leHBvcnRzLnBva2Vtb25Db2xsZWN0ID0gW107XHJcbmV4cG9ydHMucG9rZW1vbkNvbGxlY3RJbkdlbmVyYWwgPSBbXTtcclxuY2xhc3MgR2VuZXJhdGVQb2tlbW9uVG9ET00ge1xyXG4gICAgY29uc3RydWN0b3IoYWxsUG9rZW1vbikge1xyXG4gICAgICAgIC8vSGVyZSBnb2VzIGJlZm9yZSBwcmVwYXJlZCBhcnJheSBvZiBhbGwgcG9rZW1vbnMgKHBhcnQgb25lIGJ5IG9uZSBub3QgYWxsIGluIG9uZSkgRE9NIGlzbid0IGNsZWFuIGhlcmUsIHNvIGV2ZXJ5IHBhcnQgZ29lcyB0byB0aGUgZW5kIG9mIGNvbnRhaW5lclxyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQb2tlbW9uSW5ET00gPSAoYWxsUG9rZW1vbikgPT4ge1xyXG4gICAgICAgICAgICBhbGxQb2tlbW9uLmZvckVhY2goKHBva2Vtb24sIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICB2YXIgX2EsIF9iLCBfYztcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5ld0NhcmQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2Vtb25JZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2Vtb25OYW1lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vbkltZyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX2NhcmRcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdDYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gZ2VuZXJhdGVEZXRhaWxzXzEuR2VuZXJhdGVEZXRhaWxzLnBva2Vtb25EZXRhaWxzKHBva2Vtb24pKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25OYW1lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicG9rZW1vbl9fbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uSWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgJ3Bva2Vtb25fX2lkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uSW1nVXJsID0gKF9iID0gKF9hID0gcG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnNwcml0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vdGhlclsnb2ZmaWNpYWwtYXJ0d29yayddKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZnJvbnRfZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uSW1nVXJsICE9PSBudWxsICYmIHBva2Vtb25JbWdVcmwgIT09IHZvaWQgMCA/IHBva2Vtb25JbWdVcmwgOiBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3Bva2Vtb25JbWdVcmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX2ltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcImxvYWRpbmdcIiwgXCJsYXp5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbkltZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCAnL2ltYWdlcy9xdWVzdGlvbk1hcmsuc3ZnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX3F1ZXN0aW9uTWFya1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdDYXJkLmFwcGVuZENoaWxkKHBva2Vtb25JbWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9BZGQgSUQgb2YgcG9rZW1vbiB0byBldmVyeSBjb250YWluZXIgaW50byBjYXJkXHJcbiAgICAgICAgICAgICAgICBpZiAocG9rZW1vbi5pZCA8IDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjMDAke3Bva2Vtb24uaWR9YDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uLmlkID49IDEwICYmIGluZGV4IDwgMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjMCR7cG9rZW1vbi5pZH1gO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBva2Vtb24uaWQgPj0gMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0eXBlIG9yIHR5cGVzIG9mIHBva2Vtb24gdG8gZXZlcnkgY29udGFpbmVyIGludG8gY2FyZFxyXG4gICAgICAgICAgICAgICAgKF9jID0gcG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnR5cGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vblR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9IGAke2VsZS50eXBlLm5hbWV9YDtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hUeXBlXzEuc3dpdGNoRm9yUG9rZW1vblR5cGVGdW5jKGVsZSwgcG9rZW1vblR5cGUsICdwb2tlbW9uX190eXBlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdHlwZUNvbnRhaW5lci5hcHBlbmRDaGlsZChwb2tlbW9uVHlwZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIC8vR2V0IGV2ZXJ5IG9mIHRoZXNlIGNyZWF0ZWQgZWxlbWVudCBhbmQgYWRkIGl0IGludG8gbmV3Q2FyZCBhbmQgbmV4dCAtIG5ld0NhcmQgdG8gdGhlIGVuZCBvZiBwb2tlbW9uU2VjdGlvblxyXG4gICAgICAgICAgICAgICAgdHlwZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX3R5cGVDb250YWluZXJcIik7XHJcbiAgICAgICAgICAgICAgICBuZXdDYXJkLmFwcGVuZENoaWxkKHR5cGVDb250YWluZXIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZChwb2tlbW9uSWQpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5zZXRBdHRyaWJ1dGUoJ2lkJywgYCR7cG9rZW1vbi5pZH1gKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2Vtb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBva2Vtb24nKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgbmV3Q2FyZCk7XHJcbiAgICAgICAgICAgICAgICAvL0FmdGVyIGluc2VydCBlbGVtZW50XHJcbiAgICAgICAgICAgICAgICBjb25zdCBhcHBlYXJFZmZlY3QgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWFjaFBva2Vtb25DYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBva2Vtb25fX2NhcmQnKTtcclxuICAgICAgICAgICAgICAgICAgICBlYWNoUG9rZW1vbkNhcmQuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QuYWRkKCdjbGFzcycsICdwb2tlbW9uX19jYXJkLS1hZnRlckVmZmVjdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFwcGVhckVmZmVjdCgpO1xyXG4gICAgICAgICAgICAgICAgfSwgNzUwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmdlbmVyYXRlUG9rZW1vbkluRE9NKGFsbFBva2Vtb24pO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVQb2tlbW9uVG9ET00gPSBHZW5lcmF0ZVBva2Vtb25Ub0RPTTtcclxuY2xhc3MgU29ydFBva2Vtb24ge1xyXG59XHJcbmV4cG9ydHMuU29ydFBva2Vtb24gPSBTb3J0UG9rZW1vbjtcclxuU29ydFBva2Vtb24uc29ydEFsbFBva2Vtb24gPSAoZWFjaFBva2UpID0+IHtcclxuICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3QucHVzaChlYWNoUG9rZSk7XHJcbiAgICBleHBvcnRzLnBva2Vtb25Db2xsZWN0LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcclxuICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3RJbkdlbmVyYWwucHVzaChlYWNoUG9rZSk7XHJcbiAgICBleHBvcnRzLnBva2Vtb25Db2xsZWN0SW5HZW5lcmFsLnNvcnQoZnVuY3Rpb24gKGEsIGIpIHsgcmV0dXJuIGEuaWQgLSBiLmlkOyB9KTtcclxufTtcclxuY2xhc3MgR2VuZXJhdGVUeXBlVG9ET00ge1xyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVUeXBlVG9ET00gPSBHZW5lcmF0ZVR5cGVUb0RPTTtcclxuR2VuZXJhdGVUeXBlVG9ET00uZ2VuZXJhdGVUeXBlc1RvRE9NID0gKHR5cGUpID0+IHtcclxuICAgIGlmICgodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLm5hbWUpICYmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgIT09ICd1bmtub3duJyAmJiAodHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLm5hbWUpICE9PSAnc2hhZG93Jykge1xyXG4gICAgICAgIGNvbnN0IHNvcnRTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0VHlwZV9fY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGNvbnN0IHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0eXBlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgc29ydFR5cGVfXyR7dHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLm5hbWV9IHNvcnRUeXBlX190eXBlYCk7XHJcbiAgICAgICAgdHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblwiKTtcclxuICAgICAgICAgICAgc3dpdGNoVHlwZV8xLnN3aXRjaFR5cGVGb3JDb3ZlckZ1bmModHlwZSk7XHJcbiAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZldGNoKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS51cmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9rZW1vbiAmJiBBcnJheS5pc0FycmF5KGRhdGEucG9rZW1vbikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbmVUeXBlUG9rZW1vbiA9IFsuLi5kYXRhLnBva2Vtb25dO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uZVR5cGVQb2tlbW9uLmZvckVhY2goKGVsZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goZWxlLnBva2Vtb24udXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZWFjaFBva2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydFBva2Vtb24uc29ydEFsbFBva2Vtb24oZWFjaFBva2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZVR5cGVQb2tlbW9uLmxlbmd0aCA9PT0gaW5kZXggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdlbmVyYXRlUG9rZW1vblRvRE9NKGV4cG9ydHMucG9rZW1vbkNvbGxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3QubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnRleHRDb250ZW50ID0gdHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLm5hbWU7XHJcbiAgICAgICAgc29ydFNlY3Rpb24uYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xyXG4gICAgfVxyXG59O1xyXG5jbGFzcyBHZW5lcmF0ZUNvbG9yVG9ET00ge1xyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVDb2xvclRvRE9NID0gR2VuZXJhdGVDb2xvclRvRE9NO1xyXG5HZW5lcmF0ZUNvbG9yVG9ET00uZ2VuZXJhdGVDb2xvcnNUb0RPTSA9IChjb2xvcikgPT4ge1xyXG4gICAgaWYgKGNvbG9yID09PSBudWxsIHx8IGNvbG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2xvci5uYW1lKSB7XHJcbiAgICAgICAgY29uc3Qgc29ydFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGBzb3J0VHlwZV9fJHtjb2xvciA9PT0gbnVsbCB8fCBjb2xvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sb3IubmFtZX0gc29ydFR5cGVfX3R5cGVgKTtcclxuICAgICAgICB0eXBlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2Vtb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uXCIpO1xyXG4gICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICBmZXRjaChjb2xvciA9PT0gbnVsbCB8fCBjb2xvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sb3IudXJsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBva2Vtb25fc3BlY2llcyAmJiBBcnJheS5pc0FycmF5KGRhdGEucG9rZW1vbl9zcGVjaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uZVR5cGVQb2tlbW9uID0gWy4uLmRhdGEucG9rZW1vbl9zcGVjaWVzXTtcclxuICAgICAgICAgICAgICAgICAgICBvbmVUeXBlUG9rZW1vbi5mb3JFYWNoKChlbGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG1vZGlmaWNhdGVVUkwgPSBHZW5lcmF0ZUNvbG9yVG9ET00ubW9kaWZpY2F0ZVVybChlbGUudXJsKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2gobW9kaWZpY2F0ZVVSTClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGVhY2hQb2tlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFNvcnRQb2tlbW9uLnNvcnRBbGxQb2tlbW9uKGVhY2hQb2tlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChvbmVUeXBlUG9rZW1vbi5sZW5ndGggPT09IGluZGV4ICsgMSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG5ldyBHZW5lcmF0ZVBva2Vtb25Ub0RPTShleHBvcnRzLnBva2Vtb25Db2xsZWN0KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBleHBvcnRzLnBva2Vtb25Db2xsZWN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0eXBlRWxlbWVudC50ZXh0Q29udGVudCA9IGNvbG9yID09PSBudWxsIHx8IGNvbG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2xvci5uYW1lO1xyXG4gICAgICAgIHNvcnRTZWN0aW9uLmFwcGVuZENoaWxkKHR5cGVFbGVtZW50KTtcclxuICAgIH1cclxufTtcclxuR2VuZXJhdGVDb2xvclRvRE9NLm1vZGlmaWNhdGVVcmwgPSAodXJsKSA9PiB7XHJcbiAgICBjb25zdCBzcGxpdFVybCA9IHVybC5zcGxpdChcIi9cIik7XHJcbiAgICByZXR1cm4gYCR7c3BsaXRVcmxbMF19Ly8ke3NwbGl0VXJsWzJdfS8ke3NwbGl0VXJsWzNdfS8ke3NwbGl0VXJsWzRdfS9wb2tlbW9uLyR7c3BsaXRVcmxbNl19YDtcclxufTtcclxuY2xhc3MgR2VuZXJhdGVHZW5lcmFsVG9ET00ge1xyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVHZW5lcmFsVG9ET00gPSBHZW5lcmF0ZUdlbmVyYWxUb0RPTTtcclxuR2VuZXJhdGVHZW5lcmFsVG9ET00uZ2VuZXJhdGVHZW5lcmFsVG9ET00gPSAodHlwZSwgaW5kZXgpID0+IHtcclxuICAgIGlmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkge1xyXG4gICAgICAgIGZldGNoKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS51cmwpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihlYWNoUG9rZSA9PiB7XHJcbiAgICAgICAgICAgIFNvcnRQb2tlbW9uLnNvcnRBbGxQb2tlbW9uKGVhY2hQb2tlKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09PSAxMSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc29ydFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgICAgICBpZiAoc29ydFNlY3Rpb24uY2hpbGRFbGVtZW50Q291bnQgPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWFyY2hUZW1wbGF0ZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoVGVtcGxhdGVcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaW1wb3J0ZWROb2RlID0gZG9jdW1lbnQuaW1wb3J0Tm9kZShzZWFyY2hUZW1wbGF0ZS5jb250ZW50LCB0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwdXRUaGlzRWxlbWVudCA9IGltcG9ydGVkTm9kZS5maXJzdEVsZW1lbnRDaGlsZDtcclxuICAgICAgICAgICAgICAgICAgICBzb3J0U2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoXCJhZnRlcmJlZ2luXCIsIHB1dFRoaXNFbGVtZW50KTtcclxuICAgICAgICAgICAgICAgICAgICBuZXcgc2VhcmNoUG9rZW1vbl8xLkZpbHRlclBva2Vtb25Db2xsZWN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBuZXcgR2VuZXJhdGVQb2tlbW9uVG9ET00oZXhwb3J0cy5wb2tlbW9uQ29sbGVjdCk7XHJcbiAgICAgICAgICAgICAgICBleHBvcnRzLnBva2Vtb25Db2xsZWN0Lmxlbmd0aCA9IDA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5NZW51SXRlbUVmZmVjdCA9IGV4cG9ydHMuTWVudUl0ZW0gPSB2b2lkIDA7XHJcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xyXG5jb25zdCBnZW5lcmF0ZVRvRE9NXzEgPSByZXF1aXJlKFwiLi9nZW5lcmF0ZVRvRE9NXCIpO1xyXG52YXIgTWVudUl0ZW07XHJcbihmdW5jdGlvbiAoTWVudUl0ZW0pIHtcclxuICAgIE1lbnVJdGVtW1wiVFlQRVwiXSA9IFwidHlwZVwiO1xyXG4gICAgTWVudUl0ZW1bXCJHRU5FUkFMXCJdID0gXCJnZW5lcmFsXCI7XHJcbiAgICBNZW51SXRlbVtcIkNPTE9SXCJdID0gXCJjb2xvclwiO1xyXG4gICAgTWVudUl0ZW1bXCJHQU1FXCJdID0gXCJnYW1lXCI7XHJcbn0pKE1lbnVJdGVtID0gZXhwb3J0cy5NZW51SXRlbSB8fCAoZXhwb3J0cy5NZW51SXRlbSA9IHt9KSk7XHJcbjtcclxuY2xhc3MgTWVudUl0ZW1FZmZlY3Qge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJQb2tlbW9uU2VjdGlvbkJlZm9yZUdlbmVyYXRlID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9rZW1vblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Njcm9sbCcsIGFwcF8xLkdlbmVyYXRlVmlldy5zY3JvbGxGZWF0dXJlLCB7IGNhcHR1cmU6IGZhbHNlIH0pO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gTWVudUl0ZW0uR0VORVJBTCkge1xyXG4gICAgICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmlubmVySFRNTCA9IFwiPHAgY2xhc3M9J3Bva2Vtb25fX2R1bW15VGV4dCc+VGhlcmUgaXMgbm90aGluZyB0byBkaXNwbGF5IGZvciB0aGUgbW9tZW50PC9wPlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHR5cGVzU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICBhcHBfMS5yYW5nZU9mTG9hZGluZy5mcm9tID0gMDtcclxuICAgICAgICAgICAgYXBwXzEucmFuZ2VPZkxvYWRpbmcudHlwZSA9IGVsZW1lbnQ7XHJcbiAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5wb2tlbW9uQ29sbGVjdC5sZW5ndGggPSAwO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5jbGlja0VmZmVjdCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm5hdl9fb3B0aW9uYCldO1xyXG4gICAgICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdldyYXBwZXJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saW5lJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGUnKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2SW5uZXJDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlX19pbm5lckNpcmNsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3Zlck1vdXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdmVyTW91c2UnKTtcclxuICAgICAgICAgICAgY29uc3QgcG9rZWRleFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2VkZXhcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb3ZlclwiKTtcclxuICAgICAgICAgICAgaWYgKGNvdmVyTW91c2UuaWQgIT09ICdtaW5pbWFsaXplZCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuaGlkZU5hdkVsZW1lbnRzKGVsZW1lbnQsIG5hdkVsZW1lbnQsIG5hdiwgbmF2Q2lyY2xlLCBuYXZJbm5lckNpcmNsZSwgbmF2TGluZSwgbmF2V3JhcHBlciwgY292ZXJNb3VzZSwgcG9rZWRleFNlY3Rpb24sIGNvdmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdkVsZW1lbnRzKHBva2VkZXhTZWN0aW9uLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdkVsZW1lbnQsIGNvdmVyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oaWRlTmF2RWxlbWVudHMgPSAoZWxlbWVudCwgbmF2RWxlbWVudCwgbmF2LCBuYXZDaXJjbGUsIG5hdklubmVyQ2lyY2xlLCBuYXZMaW5lLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBwb2tlZGV4U2VjdGlvbiwgY292ZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBuYXZFbGVtZW50LmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoXCJuYXZfX29wdGlvbi0taGlkZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoXCJuYXYtLWhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZCgnY2lyY2xlLS1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZJbm5lckNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGVfX2lubmVyQ2lyY2xlLS1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5hZGQoXCJuYXZfX2xpbmUtLWhpZGVcIik7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2V3JhcHBlci5jbGFzc0xpc3QuYWRkKCduYXZXcmFwcGVyLS1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBjb3Zlck1vdXNlLmNsYXNzTGlzdC5hZGQoJ2NvdmVyTW91c2UtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIHBva2VkZXhTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3Bva2VkZXgtLXNob3dJdCcpO1xyXG4gICAgICAgICAgICAgICAgY292ZXJNb3VzZS5pZCA9ICdtaW5pbWFsaXplZCc7XHJcbiAgICAgICAgICAgICAgICBjb3Zlci5jbGFzc0xpc3QuYWRkKCdjb3Zlci0tbG93ZXJQb3NpdGlvbicpO1xyXG4gICAgICAgICAgICB9LCA3NTApO1xyXG4gICAgICAgICAgICAvL0RvIHRoaXMgd2l0aCBldmVyeSBjbGljayBpbiBuYXYgZWxlbWVudFxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyUG9rZW1vblNlY3Rpb25CZWZvcmVHZW5lcmF0ZShlbGVtZW50KTtcclxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25TZWN0aW9uX19sb2FkTW9yZVwiKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IE1lbnVJdGVtLkdFTkVSQUwpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmUtLWRpc2FibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlLS1kaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFwcF8xLkdlbmVyYXRlVmlldy5pbml0aWFsR2VuZXJhdGUoZWxlbWVudCk7XHJcbiAgICAgICAgICAgIChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5lc2NhcGUnKSkgPT09IG51bGwgfHwgX2EgPT09IHZvaWQgMCA/IHZvaWQgMCA6IF9hLmNsYXNzTGlzdC5hZGQoJ2VzY2FwZS0tZGlzYWJsZScpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5zaG93TmF2RWxlbWVudHMgPSAocG9rZWRleFNlY3Rpb24sIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIG5hdiwgbmF2Q2lyY2xlLCBuYXZJbm5lckNpcmNsZSwgbmF2TGluZSwgbmF2RWxlbWVudCwgY292ZXIpID0+IHtcclxuICAgICAgICAgICAgdmFyIF9hO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19nYW1lJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19nYW1lLS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fZ2VuZXJhbCcpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fZ2VuZXJhbC0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX3R5cGUnKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXZfX3R5cGUtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19jb2xvcicpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fY29sb3ItLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBwb2tlZGV4U2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdwb2tlZGV4LS1zaG93SXQnKTtcclxuICAgICAgICAgICAgbmF2V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCduYXZXcmFwcGVyLS1oaWRlJyk7XHJcbiAgICAgICAgICAgIGNvdmVyTW91c2UuY2xhc3NMaXN0LnJlbW92ZSgnY292ZXJNb3VzZS0taGlkZScpO1xyXG4gICAgICAgICAgICBjb3Zlci5jbGFzc0xpc3QucmVtb3ZlKCdjb3Zlci0tbG93ZXJQb3NpdGlvbicpO1xyXG4gICAgICAgICAgICBjb3Zlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4xKVwiO1xyXG4gICAgICAgICAgICBjb3Zlck1vdXNlLmlkID0gXCJcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi0taGlkZVwiLCAnbmF2LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWhpZGUnLCAnY2lyY2xlX19pbm5lckNpcmNsZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXZfX2xpbmUtLWhpZGVcIiwgJ25hdl9fbGluZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2RWxlbWVudC5mb3JFYWNoKChlbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fb3B0aW9uLS1oaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDc1MCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMnKTtcclxuICAgICAgICAgICAgZGV0YWlsc0VsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZSgnZGV0YWlscy0tb25Qb3NpdGlvbicpO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93ID0gJ2F1dG8nO1xyXG4gICAgICAgICAgICAoX2EgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXNjYXBlJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QucmVtb3ZlKCdlc2NhcGUtLWRpc2FibGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaG92ZXJFZmZlY3QgPSAoZWxlbWVudCwgZXZlbnRUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAubmF2X18ke2VsZW1lbnR9YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdmVyTW91c2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY292ZXJNb3VzZScpO1xyXG4gICAgICAgICAgICBpZiAoY292ZXJNb3VzZS5pZCAhPT0gJ21pbmltYWxpemVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ292ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBuYXZfXyR7ZWxlbWVudH0tLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2xlYXZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbmF2X18ke2VsZW1lbnR9LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saW5lJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZJbm5lckNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGVfX2lubmVyQ2lyY2xlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnb3ZlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZChgbmF2LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5hZGQoJ25hdl9fbGluZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2SW5uZXJDaXJjbGUuY2xhc3NMaXN0LmFkZCgnY2lyY2xlX19pbm5lckNpcmNsZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnbGVhdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoYG5hdi0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGluZS5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2xpbmUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjb3ZlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY292ZXJNb3VzZV9fJHtlbGVtZW50fWApO1xyXG4gICAgICAgIGlmIChlbGVtZW50ID09PSAnZ2VuZXJhbCcpIHtcclxuICAgICAgICAgICAgd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ2tleXVwJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgICAgIHZhciBfYTtcclxuICAgICAgICAgICAgICAgIGlmIChlLndoaWNoID09PSAyNykge1xyXG4gICAgICAgICAgICAgICAgICAgIChfYSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3Zlck1vdXNlJykpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5jbGFzc0xpc3QudG9nZ2xlKCdjb3Zlck1vdXNlLS1zaG93TW91c2UnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGNvdmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB0aGlzLmhvdmVyRWZmZWN0KGVsZW1lbnQsICdvdmVyJykpO1xyXG4gICAgICAgIGNvdmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5ob3ZlckVmZmVjdChlbGVtZW50LCAnbGVhdmUnKSk7XHJcbiAgICAgICAgY292ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbGlja0VmZmVjdChlbGVtZW50KSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5NZW51SXRlbUVmZmVjdCA9IE1lbnVJdGVtRWZmZWN0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkdlbmVyYXRlRGV0YWlscyA9IHZvaWQgMDtcclxuY29uc3Qgc3dpdGNoVHlwZV8xID0gcmVxdWlyZShcIi4vc3dpdGNoVHlwZVwiKTtcclxuY2xhc3MgR2VuZXJhdGVEZXRhaWxzIHtcclxufVxyXG5leHBvcnRzLkdlbmVyYXRlRGV0YWlscyA9IEdlbmVyYXRlRGV0YWlscztcclxuR2VuZXJhdGVEZXRhaWxzLnBva2Vtb25EZXRhaWxzID0gKHBva2Vtb24pID0+IHtcclxuICAgIGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3cgPSAnaGlkZGVuJztcclxuICAgIGNvbnN0IGRldGFpbHNFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMnKTtcclxuICAgIGlmIChkZXRhaWxzRWxlbWVudCkge1xyXG4gICAgICAgIGRldGFpbHNFbGVtZW50LmNsYXNzTGlzdC5hZGQoJ2RldGFpbHMtLW9uUG9zaXRpb24nKTtcclxuICAgICAgICBjb25zdCBuYW1lQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsc19fcG9rZW1vbk5hbWVcIik7XHJcbiAgICAgICAgY29uc3QgaW1nQ29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZGV0YWlsc19faW1nQ29udGVudFwiKTtcclxuICAgICAgICBsZXQgcG9rZW1vbk9yZGVyID0gXCJcIjtcclxuICAgICAgICBpZiAocG9rZW1vbi5pZCA8IDEwKVxyXG4gICAgICAgICAgICBwb2tlbW9uT3JkZXIgPSBgIzAwJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgaWYgKHBva2Vtb24uaWQgPj0gMTAgJiYgcG9rZW1vbi5pZCA8IDEwMClcclxuICAgICAgICAgICAgcG9rZW1vbk9yZGVyID0gYCMwJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgaWYgKHBva2Vtb24uaWQgPj0gMTAwKVxyXG4gICAgICAgICAgICBwb2tlbW9uT3JkZXIgPSBgIyR7cG9rZW1vbi5pZH1gO1xyXG4gICAgICAgIG5hbWVDb250ZW50LmlubmVySFRNTCA9IGAke3Bva2Vtb24ubmFtZX0gPHNwYW4gY2xhc3M9XCJkZXRhaWxzX19pZFwiPiR7cG9rZW1vbk9yZGVyfTwvc3Bhbj5gO1xyXG4gICAgICAgIGltZ0NvbnRlbnQuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3Bva2Vtb24uc3ByaXRlcy5vdGhlclsnb2ZmaWNpYWwtYXJ0d29yayddLmZyb250X2RlZmF1bHR9YCk7XHJcbiAgICAgICAgR2VuZXJhdGVEZXRhaWxzLmdlbmVyYXRlRGVzY3JpcHRpb25Db250ZW50KHBva2Vtb24pO1xyXG4gICAgICAgIEdlbmVyYXRlRGV0YWlscy5nZW5lcmF0ZVR5cGVDb250ZW50KHBva2Vtb24pO1xyXG4gICAgICAgIEdlbmVyYXRlRGV0YWlscy5nZW5lcmF0ZVN0YXRzQ29udGVudChwb2tlbW9uKTtcclxuICAgICAgICBHZW5lcmF0ZURldGFpbHMuZ2VuZXJhdGVFdm9sdXRpb25Db250ZW50KHBva2Vtb24pO1xyXG4gICAgfVxyXG59O1xyXG5HZW5lcmF0ZURldGFpbHMuZ2VuZXJhdGVEZXNjcmlwdGlvbkNvbnRlbnQgPSAocG9rZW1vbikgPT4ge1xyXG4gICAgY29uc3QgZGVzY0NvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRldGFpbHNfX2Rlc2NyaXB0aW9uQ29udGVudFwiKTtcclxuICAgIGRlc2NDb250ZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBjb25zdCBkZXRhaWxIZWlnaHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRldGFpbEhlaWdodC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2RldGFpbHNfX0RhdGUgcG9rZW1vbkRhdGUnKTtcclxuICAgIGRldGFpbEhlaWdodC5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJwb2tlbW9uRGF0ZV9fbGFiZWxcIj5IZWlnaHQ8L3A+PHAgY2xhc3M9XCJwb2tlbW9uRGF0ZV9fdmFsdWVcIj4ke3Bva2Vtb24uaGVpZ2h0fSc8L3A+YDtcclxuICAgIGNvbnN0IGRldGFpbFdlaWdodCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGV0YWlsV2VpZ2h0LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGV0YWlsc19fRGF0ZSBwb2tlbW9uRGF0ZScpO1xyXG4gICAgZGV0YWlsV2VpZ2h0LmlubmVySFRNTCA9IGA8cCBjbGFzcz1cInBva2Vtb25EYXRlX19sYWJlbFwiPldlaWdodDwvcD48cCBjbGFzcz1cInBva2Vtb25EYXRlX192YWx1ZVwiPiR7cG9rZW1vbi53ZWlnaHR9IGxiczwvcD5gO1xyXG4gICAgZGVzY0NvbnRlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBkZXRhaWxIZWlnaHQpO1xyXG4gICAgZGVzY0NvbnRlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBkZXRhaWxXZWlnaHQpO1xyXG4gICAgY29uc3QgcG9rZW1vbkFiaWxpdGllc0FycmF5ID0gWy4uLnBva2Vtb24uYWJpbGl0aWVzXTtcclxuICAgIGNvbnN0IGRldGFpbEFiaWxpdGllcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGV0YWlsQWJpbGl0aWVzLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnZGV0YWlsc19fRGF0ZSBwb2tlbW9uRGF0ZScpO1xyXG4gICAgY29uc3QgdGl0bGVBYmlsaXRpZXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICB0aXRsZUFiaWxpdGllcy5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Bva2Vtb25EYXRlX19sYWJlbCcpO1xyXG4gICAgdGl0bGVBYmlsaXRpZXMudGV4dENvbnRlbnQgPSBcIkFiaWxpdGllc1wiO1xyXG4gICAgZGV0YWlsQWJpbGl0aWVzLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgdGl0bGVBYmlsaXRpZXMpO1xyXG4gICAgcG9rZW1vbkFiaWxpdGllc0FycmF5LmZvckVhY2goKGFiaWxpdHlFbGUpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50QWJpbGl0eSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjdXJyZW50QWJpbGl0eS5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3Bva2Vtb25EYXRlX192YWx1ZScpO1xyXG4gICAgICAgIGN1cnJlbnRBYmlsaXR5LnRleHRDb250ZW50ID0gYWJpbGl0eUVsZS5hYmlsaXR5Lm5hbWU7XHJcbiAgICAgICAgZGV0YWlsQWJpbGl0aWVzLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgY3VycmVudEFiaWxpdHkpO1xyXG4gICAgfSk7XHJcbiAgICBkZXNjQ29udGVudC5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGRldGFpbEFiaWxpdGllcyk7XHJcbn07XHJcbkdlbmVyYXRlRGV0YWlscy5nZW5lcmF0ZVR5cGVDb250ZW50ID0gKHBva2Vtb24pID0+IHtcclxuICAgIGNvbnN0IHR5cGVDb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kZXRhaWxzX190eXBlQ29udGVudFwiKTtcclxuICAgIHR5cGVDb250ZW50LmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICBjb25zdCBwb2tlbW9uVHlwZXNBcnJheSA9IFsuLi5wb2tlbW9uLnR5cGVzXTtcclxuICAgIHBva2Vtb25UeXBlc0FycmF5LmZvckVhY2goKGFiaWxpdHlFbGUpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjdXJyZW50VHlwZS50ZXh0Q29udGVudCA9IGFiaWxpdHlFbGUudHlwZS5uYW1lO1xyXG4gICAgICAgIHN3aXRjaFR5cGVfMS5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMoYWJpbGl0eUVsZSwgY3VycmVudFR5cGUsICdkZXRhaWxzX190eXBlJyk7XHJcbiAgICAgICAgdHlwZUNvbnRlbnQuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBjdXJyZW50VHlwZSk7XHJcbiAgICB9KTtcclxufTtcclxuR2VuZXJhdGVEZXRhaWxzLmdlbmVyYXRlU3RhdHNDb250ZW50ID0gKHBva2Vtb24pID0+IHtcclxuICAgIGxldCBNYXhTdGF0c1ZhbHVlO1xyXG4gICAgKGZ1bmN0aW9uIChNYXhTdGF0c1ZhbHVlKSB7XHJcbiAgICAgICAgTWF4U3RhdHNWYWx1ZVtNYXhTdGF0c1ZhbHVlW1wiSFBcIl0gPSAyNTVdID0gXCJIUFwiO1xyXG4gICAgICAgIE1heFN0YXRzVmFsdWVbTWF4U3RhdHNWYWx1ZVtcIkFUVEFDS1wiXSA9IDE4MV0gPSBcIkFUVEFDS1wiO1xyXG4gICAgICAgIE1heFN0YXRzVmFsdWVbTWF4U3RhdHNWYWx1ZVtcIkRFRkVOU0VcIl0gPSAyMzBdID0gXCJERUZFTlNFXCI7XHJcbiAgICAgICAgTWF4U3RhdHNWYWx1ZVtNYXhTdGF0c1ZhbHVlW1wiU0FUVEFDS1wiXSA9IDE3M10gPSBcIlNBVFRBQ0tcIjtcclxuICAgICAgICBNYXhTdGF0c1ZhbHVlW01heFN0YXRzVmFsdWVbXCJTREVGRU5TRVwiXSA9IDIzMF0gPSBcIlNERUZFTlNFXCI7XHJcbiAgICAgICAgTWF4U3RhdHNWYWx1ZVtNYXhTdGF0c1ZhbHVlW1wiU1BFRURcIl0gPSAyMDBdID0gXCJTUEVFRFwiO1xyXG4gICAgfSkoTWF4U3RhdHNWYWx1ZSB8fCAoTWF4U3RhdHNWYWx1ZSA9IHt9KSk7XHJcbiAgICA7XHJcbiAgICBjb25zdCBwZXJjZW50YWdlSFAgPSBgJHsoKHBva2Vtb24uc3RhdHNbMF0uYmFzZV9zdGF0IC8gTWF4U3RhdHNWYWx1ZS5IUCkgKiAxMDApLnRvRml4ZWQoMil9JWA7XHJcbiAgICBjb25zdCBwZXJjZW50YWdlQVRUID0gYCR7KChwb2tlbW9uLnN0YXRzWzFdLmJhc2Vfc3RhdCAvIE1heFN0YXRzVmFsdWUuQVRUQUNLKSAqIDEwMCkudG9GaXhlZCgyKX0lYDtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2VERUYgPSBgJHsoKHBva2Vtb24uc3RhdHNbMl0uYmFzZV9zdGF0IC8gTWF4U3RhdHNWYWx1ZS5ERUZFTlNFKSAqIDEwMCkudG9GaXhlZCgyKX0lYDtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2VTQVRUID0gYCR7KChwb2tlbW9uLnN0YXRzWzNdLmJhc2Vfc3RhdCAvIE1heFN0YXRzVmFsdWUuU0FUVEFDSykgKiAxMDApLnRvRml4ZWQoMil9JWA7XHJcbiAgICBjb25zdCBwZXJjZW50YWdlU0RFRiA9IGAkeygocG9rZW1vbi5zdGF0c1s0XS5iYXNlX3N0YXQgLyBNYXhTdGF0c1ZhbHVlLlNERUZFTlNFKSAqIDEwMCkudG9GaXhlZCgyKX0lYDtcclxuICAgIGNvbnN0IHBlcmNlbnRhZ2VTUEVFRCA9IGAkeygocG9rZW1vbi5zdGF0c1s1XS5iYXNlX3N0YXQgLyBNYXhTdGF0c1ZhbHVlLlNQRUVEKSAqIDEwMCkudG9GaXhlZCgyKX0lYDtcclxuICAgIGNvbnN0IHN0YXRzT2JqID0ge1xyXG4gICAgICAgIHBlcmNlbnRhZ2VIUCxcclxuICAgICAgICBwZXJjZW50YWdlQVRULFxyXG4gICAgICAgIHBlcmNlbnRhZ2VERUYsXHJcbiAgICAgICAgcGVyY2VudGFnZVNBVFQsXHJcbiAgICAgICAgcGVyY2VudGFnZVNERUYsXHJcbiAgICAgICAgcGVyY2VudGFnZVNQRUVEXHJcbiAgICB9O1xyXG4gICAgR2VuZXJhdGVEZXRhaWxzLnN0YXRzT2JqID0gc3RhdHNPYmo7XHJcbiAgICBjb25zdCBkZXRhaWxXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmRldGFpbHMnKTtcclxuICAgIGRldGFpbFdyYXBwZXIuYWRkRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgR2VuZXJhdGVEZXRhaWxzLnNob3dTdGF0cywgeyBwYXNzaXZlOiB0cnVlIH0pO1xyXG59O1xyXG5HZW5lcmF0ZURldGFpbHMuc2hvd1N0YXRzID0gKCkgPT4ge1xyXG4gICAgY29uc3QgZGV0YWlsV3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5kZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzdGF0c0VsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3RhdHMnKTtcclxuICAgIGNvbnN0IHdpbmRvd0hlaWdodCA9IHdpbmRvdy5pbm5lckhlaWdodDtcclxuICAgIGNvbnN0IHN0YXRzRWxlbWVudEZyb21Ub3AgPSBzdGF0c0VsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkudG9wO1xyXG4gICAgY29uc3QgeyBwZXJjZW50YWdlSFAsIHBlcmNlbnRhZ2VBVFQsIHBlcmNlbnRhZ2VERUYsIHBlcmNlbnRhZ2VTQVRULCBwZXJjZW50YWdlU0RFRiwgcGVyY2VudGFnZVNQRUVEIH0gPSBHZW5lcmF0ZURldGFpbHMuc3RhdHNPYmo7XHJcbiAgICBpZiAoc3RhdHNFbGVtZW50RnJvbVRvcCA8PSAod2luZG93SGVpZ2h0IC8gMikpIHtcclxuICAgICAgICBjb25zdCBiYXJIUCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHNfX2JhckhwXCIpO1xyXG4gICAgICAgIGJhckhQLnN0eWxlLmhlaWdodCA9IGAke3BlcmNlbnRhZ2VIUH1gO1xyXG4gICAgICAgIGNvbnN0IGJhckFUVCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHNfX2JhckF0dGFja1wiKTtcclxuICAgICAgICBiYXJBVFQuc3R5bGUuaGVpZ2h0ID0gYCR7cGVyY2VudGFnZUFUVH1gO1xyXG4gICAgICAgIGNvbnN0IGJhckRFRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHNfX2JhckRlZmVuc2VcIik7XHJcbiAgICAgICAgYmFyREVGLnN0eWxlLmhlaWdodCA9IGAke3BlcmNlbnRhZ2VERUZ9YDtcclxuICAgICAgICBjb25zdCBiYXJTQVRUID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zdGF0c19fYmFyU0F0dGFja1wiKTtcclxuICAgICAgICBiYXJTQVRULnN0eWxlLmhlaWdodCA9IGAke3BlcmNlbnRhZ2VTQVRUfWA7XHJcbiAgICAgICAgY29uc3QgYmFyU0RFRiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHNfX2JhclNEZWZlbnNlXCIpO1xyXG4gICAgICAgIGJhclNERUYuc3R5bGUuaGVpZ2h0ID0gYCR7cGVyY2VudGFnZVNERUZ9YDtcclxuICAgICAgICBjb25zdCBiYXJTUEVFRCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc3RhdHNfX2JhclNwZWVkXCIpO1xyXG4gICAgICAgIGJhclNQRUVELnN0eWxlLmhlaWdodCA9IGAke3BlcmNlbnRhZ2VTUEVFRH1gO1xyXG4gICAgICAgIGRldGFpbFdyYXBwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcignc2Nyb2xsJywgR2VuZXJhdGVEZXRhaWxzLnNob3dTdGF0cywgeyBjYXB0dXJlOiBmYWxzZSB9KTtcclxuICAgIH1cclxufTtcclxuR2VuZXJhdGVEZXRhaWxzLmdlbmVyYXRlRXZvbHV0aW9uQ29udGVudCA9IChwb2tlbW9uKSA9PiB7XHJcbiAgICBjb25zdCBwb2tlbW9uU3BlY2llc0FQSSA9IHBva2Vtb24uc3BlY2llcy51cmw7XHJcbiAgICBmZXRjaChwb2tlbW9uU3BlY2llc0FQSSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihzcGVjaWVzID0+IHtcclxuICAgICAgICBjb25zdCBldm9DaGFpbkFQSSA9IHNwZWNpZXMuZXZvbHV0aW9uX2NoYWluLnVybDtcclxuICAgICAgICBmZXRjaChldm9DaGFpbkFQSSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGV2b0RhdGEgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpc0V2b2x2ZVRvID0gWy4uLmV2b0RhdGEuY2hhaW4uZXZvbHZlc190b107XHJcbiAgICAgICAgICAgIGlmIChpc0V2b2x2ZVRvLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ1RlbiBQb2tlbW9uIG5pZSBtYSBwcnplbWlhbnkhJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBnZW5lcmF0ZUZpcnN0RXZvID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZpcnN0RXZvQVBJID0gZXZvRGF0YS5jaGFpbi5zcGVjaWVzLm5hbWU7XHJcbiAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke2ZpcnN0RXZvQVBJfS9gKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIEdlbmVyYXRlRGV0YWlscy5jcmVhdGVFdm9sdXRpb25ET00oZGF0YSwgJ2ZpcnN0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgZ2VuZXJhdGVGaXJzdEV2bygpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaXNFdm9sdmVUby5mb3JFYWNoKChldm8pID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2Vjb25kRXZvQVBJID0gZXZvLnNwZWNpZXMubmFtZTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZmV0Y2goYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi8ke3NlY29uZEV2b0FQSX0vYClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZW5lcmF0ZURldGFpbHMuY3JlYXRlRXZvbHV0aW9uRE9NKGRhdGEsICdzZWNvbmQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGFub3RoZXJFdm8gPSBbLi4uZXZvLmV2b2x2ZXNfdG9dO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChhbm90aGVyRXZvLmxlbmd0aCAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHRoaXJkRXZvQVBJID0gZXZvLmV2b2x2ZXNfdG9bMF0uc3BlY2llcy5uYW1lO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZldGNoKGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vJHt0aGlyZEV2b0FQSX0vYClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBHZW5lcmF0ZURldGFpbHMuY3JlYXRlRXZvbHV0aW9uRE9NKGRhdGEsICd0aGlyZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbn07XHJcbkdlbmVyYXRlRGV0YWlscy5jcmVhdGVFdm9sdXRpb25ET00gPSAocG9rZW1vbkRhdGEsIHdoaWNoRXZvKSA9PiB7XHJcbiAgICBjb25zdCBldm9Db250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZXZvJyk7XHJcbiAgICBjb25zdCBmaXJzdEV2b0NvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZmlyc3RFdm9Db250YWluZXIuc2V0QXR0cmlidXRlKCdjbGFzcycsIGBldm9fX2l0ZW0gZXZvX18ke3doaWNoRXZvfUV2b2ApO1xyXG4gICAgZmlyc3RFdm9Db250YWluZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgY29uc3QgZXZvID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmV2bycpO1xyXG4gICAgICAgIGV2by5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImV2b0NvdmVyXCI+PC9kaXY+JztcclxuICAgICAgICBHZW5lcmF0ZURldGFpbHMucG9rZW1vbkRldGFpbHMocG9rZW1vbkRhdGEpO1xyXG4gICAgfSk7XHJcbiAgICBjb25zdCBwb2tlbW9uTmFtZSA9IHBva2Vtb25EYXRhLm5hbWU7XHJcbiAgICBsZXQgcG9rZW1vbklkO1xyXG4gICAgaWYgKHBva2Vtb25EYXRhLmlkIDwgMTApXHJcbiAgICAgICAgcG9rZW1vbklkID0gYCMwMCR7cG9rZW1vbkRhdGEuaWR9YDtcclxuICAgIGlmIChwb2tlbW9uRGF0YS5pZCA+PSAxMCAmJiBwb2tlbW9uRGF0YS5pZCA8IDEwMClcclxuICAgICAgICBwb2tlbW9uSWQgPSBgIzAke3Bva2Vtb25EYXRhLmlkfWA7XHJcbiAgICBpZiAocG9rZW1vbkRhdGEuaWQgPj0gMTAwKVxyXG4gICAgICAgIHBva2Vtb25JZCA9IGAjJHtwb2tlbW9uRGF0YS5pZH1gO1xyXG4gICAgY29uc3QgcG9rZW1vbkltZ1VybCA9IHBva2Vtb25EYXRhLnNwcml0ZXMub3RoZXJbJ29mZmljaWFsLWFydHdvcmsnXS5mcm9udF9kZWZhdWx0O1xyXG4gICAgY29uc3QgcG9rZW1vblR5cGVzID0gWy4uLnBva2Vtb25EYXRhLnR5cGVzXTtcclxuICAgIGNvbnN0IG5hbWVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgY29uc3QgaW1nRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xyXG4gICAgbmFtZUVsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdldm9fX25hbWUnKTtcclxuICAgIGltZ0VsZW1lbnQuc2V0QXR0cmlidXRlKCdjbGFzcycsICdldm9fX2ltZycpO1xyXG4gICAgaW1nRWxlbWVudC5zZXRBdHRyaWJ1dGUoJ3NyYycsIHBva2Vtb25JbWdVcmwpO1xyXG4gICAgbmFtZUVsZW1lbnQuaW5uZXJIVE1MID0gYCR7cG9rZW1vbk5hbWV9IDxzcGFuIGNsYXNzPVwiZXZvX19pZFwiPiR7cG9rZW1vbklkfTwvc3Bhbj5gO1xyXG4gICAgZmlyc3RFdm9Db250YWluZXIuaW5zZXJ0QWRqYWNlbnRFbGVtZW50KCdiZWZvcmVlbmQnLCBpbWdFbGVtZW50KTtcclxuICAgIGZpcnN0RXZvQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgbmFtZUVsZW1lbnQpO1xyXG4gICAgY29uc3QgZXZvVHlwZUNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZXZvVHlwZUNvbnRhaW5lci5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ2V2b19fdHlwZUNvbnRhaW5lcicpO1xyXG4gICAgcG9rZW1vblR5cGVzLmZvckVhY2goKGVhY2gpID0+IHtcclxuICAgICAgICBjb25zdCBjdXJyZW50VHlwZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBjdXJyZW50VHlwZS50ZXh0Q29udGVudCA9IGVhY2gudHlwZS5uYW1lO1xyXG4gICAgICAgIHN3aXRjaFR5cGVfMS5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMoZWFjaCwgY3VycmVudFR5cGUsICdldm9fX3R5cGUnKTtcclxuICAgICAgICBldm9UeXBlQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgY3VycmVudFR5cGUpO1xyXG4gICAgfSk7XHJcbiAgICBmaXJzdEV2b0NvbnRhaW5lci5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIGV2b1R5cGVDb250YWluZXIpO1xyXG4gICAgZXZvQ29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCgnYmVmb3JlZW5kJywgZmlyc3RFdm9Db250YWluZXIpO1xyXG59O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkZpbHRlclBva2Vtb25Db2xsZWN0ID0gdm9pZCAwO1xyXG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuLi9hcHBcIik7XHJcbmNvbnN0IGdlbmVyYXRlVG9ET01fMSA9IHJlcXVpcmUoXCIuLi9nZW5lcmF0ZVRvRE9NXCIpO1xyXG5jbGFzcyBGaWx0ZXJQb2tlbW9uQ29sbGVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBjb25zdCBpbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19pbnB1dCcpO1xyXG4gICAgICAgIGNvbnN0IHNlYXJjaEJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb3JtX19idG4nKTtcclxuICAgICAgICBpZiAoc2VhcmNoQnV0dG9uKVxyXG4gICAgICAgICAgICBzZWFyY2hCdXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBGaWx0ZXJQb2tlbW9uQ29sbGVjdC5idXR0b25DbGlja0hhbmRsZXIoJ2NsaWNrJykpO1xyXG4gICAgICAgIGlmIChpbnB1dClcclxuICAgICAgICAgICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5dXAnLCAoZSkgPT4gRmlsdGVyUG9rZW1vbkNvbGxlY3QuYnV0dG9uQ2xpY2tIYW5kbGVyKGUpKTtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLkZpbHRlclBva2Vtb25Db2xsZWN0ID0gRmlsdGVyUG9rZW1vbkNvbGxlY3Q7XHJcbkZpbHRlclBva2Vtb25Db2xsZWN0LmJ1dHRvbkNsaWNrSGFuZGxlciA9IChlKSA9PiB7XHJcbiAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblwiKTtcclxuICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvcm1fX2lucHV0Jyk7XHJcbiAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlXCIpO1xyXG4gICAgY29uc3Qgc2VhcmNoaW5nRWxlbWVudCA9IGlucHV0LnZhbHVlO1xyXG4gICAgaWYgKGUgPT09ICdjbGljaycgfHwgZS53aGljaCA9PT0gMTMpIHtcclxuICAgICAgICBpZiAoc2VhcmNoaW5nRWxlbWVudCAhPT0gXCJcIikge1xyXG4gICAgICAgICAgICBjb25zdCBBUEkgPSBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLyR7c2VhcmNoaW5nRWxlbWVudH1gO1xyXG4gICAgICAgICAgICBmZXRjaChBUEkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHBva2Vtb24gPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LmFkZChcInBva2Vtb25TZWN0aW9uX19sb2FkTW9yZS0tZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHBva2VBcnIgPSBbXTtcclxuICAgICAgICAgICAgICAgIHBva2VBcnIucHVzaChwb2tlbW9uKTtcclxuICAgICAgICAgICAgICAgIGFwcF8xLnJhbmdlT2ZMb2FkaW5nLmZyb20gPSAwO1xyXG4gICAgICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgICAgIHJldHVybiBuZXcgZ2VuZXJhdGVUb0RPTV8xLkdlbmVyYXRlUG9rZW1vblRvRE9NKHBva2VBcnIpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKGVyciA9PiBhbGVydChcIkl0J3Mgbm8gcG9rZW1vbiB3aXRoIG5hbWUgbGlrZSB0aGF0IVwiKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBhcHBfMS5yYW5nZU9mTG9hZGluZy5mcm9tID0gMDtcclxuICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgYXBwXzEuR2VuZXJhdGVWaWV3LmluaXRpYWxHZW5lcmF0ZSgnZ2VuZXJhbCcpO1xyXG4gICAgICAgICAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QucmVtb3ZlKFwicG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlLS1kaXNhYmxlXCIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMgPSBleHBvcnRzLnN3aXRjaFR5cGVGb3JDb3ZlckZ1bmMgPSB2b2lkIDA7XHJcbnZhciBUeXBlT2ZQb2tlbW9uO1xyXG4oZnVuY3Rpb24gKFR5cGVPZlBva2Vtb24pIHtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJGSVJFXCJdID0gXCJmaXJlXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiV0FURVJcIl0gPSBcIndhdGVyXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR1JBU1NcIl0gPSBcImdyYXNzXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiUE9JU09OXCJdID0gXCJwb2lzb25cIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJCVUdcIl0gPSBcImJ1Z1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIkVMRUNUUklDXCJdID0gXCJlbGVjdHJpY1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIk5PUk1BTFwiXSA9IFwibm9ybWFsXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRkxZSU5HXCJdID0gXCJmbHlpbmdcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJST0NLXCJdID0gXCJyb2NrXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR1JPVU5EXCJdID0gXCJncm91bmRcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJQU1lDSElDXCJdID0gXCJwc3ljaGljXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRklHSFRJTkdcIl0gPSBcImZpZ2h0aW5nXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRFJBR09OXCJdID0gXCJkcmFnb25cIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJEQVJLXCJdID0gXCJkYXJrXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRkFJUllcIl0gPSBcImZhaXJ5XCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR0hPU1RcIl0gPSBcImdob3N0XCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiSUNFXCJdID0gXCJpY2VcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJTVEVFTFwiXSA9IFwic3RlZWxcIjtcclxufSkoVHlwZU9mUG9rZW1vbiB8fCAoVHlwZU9mUG9rZW1vbiA9IHt9KSk7XHJcbjtcclxuZnVuY3Rpb24gc3dpdGNoVHlwZUZvckNvdmVyRnVuYyh0eXBlKSB7XHJcbiAgICBjb25zdCBjb3ZlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyXCIpO1xyXG4gICAgY29uc3Qgb3BhY2l0eUxldmVsID0gJzAuMjUnO1xyXG4gICAgc3dpdGNoICh0eXBlLm5hbWUpIHtcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JBU1M6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNTUsMjA0LDgwLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uV0FURVI6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg2OSwxNDYsMTk2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklSRTpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDI1MywxMjUsMzYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5CVUc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxMTUsMTYwLDY0LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUE9JU09OOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYigxODYsMTI4LDIwMiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkVMRUNUUklDOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjM4LDIxMyw1Mywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLk5PUk1BTDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDE2NSwxNzMsMTc2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkxZSU5HOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMTgxLDIyMiwyMzMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5ST0NLOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoODgsODMsNzksJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUk9VTkQ6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNzEsMTUyLDY2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUFNZQ0hJQzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDI0NCwxMDMsMTg2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklHSFRJTkc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgyMTMsMTAzLDM1LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRFJBR09OOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoODMsMTY0LDIwNywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkRBUks6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxMTIsMTEyLDExMiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkZBSVJZOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjUzLDE4NSwyMzMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HSE9TVDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDEyMyw5OCwxNjMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5JQ0U6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg4MSwxOTYsMjMxLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uU1RFRUw6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNTgsMTgzLDE4NCwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuc3dpdGNoVHlwZUZvckNvdmVyRnVuYyA9IHN3aXRjaFR5cGVGb3JDb3ZlckZ1bmM7XHJcbmZ1bmN0aW9uIHN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyhlbGUsIHBva2Vtb25UeXBlLCBjbGFzc05hbWUpIHtcclxuICAgIHN3aXRjaCAoZWxlLnR5cGUubmFtZSkge1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUkFTUzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5HUkFTU30gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5XQVRFUjpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5XQVRFUn0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GSVJFOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkZJUkV9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uQlVHOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkJVR30gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5QT0lTT046XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uUE9JU09OfSAke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkVMRUNUUklDOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkVMRUNUUklDfSAke2NsYXNzTmFtZX1gKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLk5PUk1BTDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5OT1JNQUx9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkxZSU5HOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkZMWUlOR30gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5ST0NLOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlJPQ0t9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JPVU5EOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkdST1VORH0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5QU1lDSElDOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlBTWUNISUN9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklHSFRJTkc6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRklHSFRJTkd9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRFJBR09OOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkRSQUdPTn0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5EQVJLOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkRBUkt9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkFJUlk6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRkFJUll9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR0hPU1Q6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uR0hPU1R9ICR7Y2xhc3NOYW1lfWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uSUNFOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLklDRX0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5TVEVFTDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5TVEVFTH0gJHtjbGFzc05hbWV9YCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyA9IHN3aXRjaEZvclBva2Vtb25UeXBlRnVuYztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9
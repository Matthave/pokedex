/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.GenerateView = exports.currentGeneratedPokemon = exports.rangeOfLoading = void 0;
const fetchData_1 = __webpack_require__(/*! ./fetchData */ "./src/fetchData.ts");
const navigation_1 = __webpack_require__(/*! ./navigation */ "./src/navigation.ts");
const generateToDOM_1 = __webpack_require__(/*! ./generateToDOM */ "./src/generateToDOM.ts");
exports.rangeOfLoading = {
    from: 0,
    howMany: 12,
};
exports.currentGeneratedPokemon = [];
class GenerateView {
    constructor(typeOfSort) {
        this.loadMorePokemon = () => {
            exports.rangeOfLoading.from = exports.rangeOfLoading.from + 12;
            const getMoreData = new fetchData_1.PokemonGet(this.typeSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            const loadBtn = document.querySelector(".pokemonSection__loadMore");
            // loadBtn.classList.add('pokemonSection__loadMore--disable');
        };
        this.typeSort = typeOfSort;
        //Inicial GET pokemon from API
        //Inicial addEventListener for loadMoreBtn
        const loadBtn = document.querySelector(".pokemonSection__loadMore");
        loadBtn.addEventListener('click', () => this.loadMorePokemon());
    }
}
exports.GenerateView = GenerateView;
GenerateView.initialGenerate = (typeOfSort) => {
    switch (typeOfSort) {
        case navigation_1.MenuItem.TYPE:
            const getDataType = new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        case navigation_1.MenuItem.GENERAL:
            const getDataGeneral = new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        case navigation_1.MenuItem.COLOR:
            const getDataRegion = new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        case navigation_1.MenuItem.GAME:
            const getDataGame = new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
            break;
        default:
            const getData = new fetchData_1.PokemonGet(typeOfSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
    }
    GenerateView.setTitle(typeOfSort);
};
GenerateView.setTitle = (type) => {
    const sectionTitle = document.querySelector(".sortType__title");
    sectionTitle.textContent = type;
};
//When have part of data from API, call this function for sort pokemon and call function which will generate view of pokemon
GenerateView.sortData = (typeOfSort, eachPoke) => {
    //Sort all pokemoin and return a promise resolve 
    const pokemonArray = [];
    pokemonArray.push(eachPoke);
    exports.currentGeneratedPokemon.push(eachPoke);
    const promise = new Promise((resolve, reject) => {
        if (pokemonArray !== []) {
            pokemonArray.sort(function (a, b) { return a.id - b.id; });
            resolve('done');
        }
    });
    promise.then(data => {
        //If everything is ok, then
        if (data === 'done' && pokemonArray.length !== 0) {
            const generatePokemon = new generateToDOM_1.GeneratePokemonToDOM(pokemonArray);
        }
    });
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
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
const navigation_1 = __webpack_require__(/*! ./navigation */ "./src/navigation.ts");
const generateToDOM_1 = __webpack_require__(/*! ./generateToDOM */ "./src/generateToDOM.ts");
class PokemonGet {
    constructor(typeOfSort, from, howMany) {
        this.getGeneralFunc = (API, typeOfSort) => {
            fetch(API)
                .then(response => response.json())
                .then(data => {
                data.results.forEach((pokemon) => {
                    fetch(pokemon.url)
                        .then(res => res.json())
                        .then(eachPoke => {
                        this.allPokemon.push(eachPoke);
                        app_1.GenerateView.sortData(typeOfSort, eachPoke);
                    })
                        .catch((err) => {
                        console.log("ERROR", err);
                    });
                });
            });
        };
        this.getColorOrTypeFunc = (API, APIType) => {
            fetch(API)
                .then(response => response.json())
                .then(data => {
                data.results.forEach((type) => {
                    if (APIType === navigation_1.MenuItem.TYPE) {
                        generateToDOM_1.GenerateTypeToDOM.generateTypesToDOM(type);
                    }
                    else if (APIType === navigation_1.MenuItem.COLOR) {
                        generateToDOM_1.GenerateColorToDOM.generateColorsToDOM(type);
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
        switch (typeOfSort) {
            case navigation_1.MenuItem.TYPE:
                this.getColorOrTypeFunc(this.typeAPI, navigation_1.MenuItem.TYPE);
                break;
            case navigation_1.MenuItem.GENERAL:
                //Get pokemon and fetch every single url pokemon, push it to the array and send to sortData function
                this.getGeneralFunc(this.generalAPI, typeOfSort);
                break;
            case navigation_1.MenuItem.COLOR:
                this.getColorOrTypeFunc(this.colorAPI, navigation_1.MenuItem.COLOR);
                break;
            case navigation_1.MenuItem.GAME:
                break;
            default:
                this.getGeneralFunc(this.generalAPI, typeOfSort);
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
exports.GenerateColorToDOM = exports.GenerateTypeToDOM = exports.GeneratePokemonToDOM = void 0;
const app_1 = __webpack_require__(/*! ./app */ "./src/app.ts");
const switchType_1 = __webpack_require__(/*! ./utils/switchType */ "./src/utils/switchType.ts");
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
                    pokemonImg.setAttribute("src", '/images/questionMark.svg');
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
                    switchType_1.switchForPokemonTypeFunc(ele, pokemonType);
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
class GenerateTypeToDOM {
}
exports.GenerateTypeToDOM = GenerateTypeToDOM;
GenerateTypeToDOM.generateTypesToDOM = (type) => {
    if ((type === null || type === void 0 ? void 0 : type.name) && (type === null || type === void 0 ? void 0 : type.name) !== 'unknown' && (type === null || type === void 0 ? void 0 : type.name) !== 'shadow') {
        const container = document.querySelector(".sortType__container");
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
                    oneTypePokemon.forEach((ele) => {
                        fetch(ele.pokemon.url)
                            .then(response => response.json())
                            .then(eachPoke => {
                            app_1.GenerateView.sortData('type', eachPoke);
                        });
                    });
                }
            });
        });
        typeElement.textContent = type === null || type === void 0 ? void 0 : type.name;
        container.appendChild(typeElement);
    }
};
class GenerateColorToDOM {
}
exports.GenerateColorToDOM = GenerateColorToDOM;
GenerateColorToDOM.generateColorsToDOM = (color) => {
    if (color === null || color === void 0 ? void 0 : color.name) {
        const container = document.querySelector(".sortType__container");
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
                    oneTypePokemon.forEach((ele) => {
                        const modificateURL = GenerateColorToDOM.modificateUrl(ele.url);
                        fetch(modificateURL)
                            .then(response => response.json())
                            .then(eachPoke => {
                            app_1.GenerateView.sortData('color', eachPoke);
                        });
                    });
                }
            });
        });
        typeElement.textContent = color === null || color === void 0 ? void 0 : color.name;
        container.appendChild(typeElement);
    }
};
GenerateColorToDOM.modificateUrl = (url) => {
    const splitUrl = url.split("/");
    return `${splitUrl[0]}//${splitUrl[2]}/${splitUrl[3]}/${splitUrl[4]}/pokemon/${splitUrl[6]}`;
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
            if (element === MenuItem.GENERAL) {
                pokemonSection.innerHTML = "";
            }
            else {
                pokemonSection.innerHTML = "<p class='pokemon__dummyText'>There is nothing to display for the moment</p>";
            }
            typesSection.innerHTML = "";
            app_1.rangeOfLoading.from = 0;
            app_1.currentGeneratedPokemon.length = 0;
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
        };
        this.showNavElements = (pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement, cover) => {
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
        coverElement.addEventListener('mouseover', () => this.hoverEffect(element, 'over'));
        coverElement.addEventListener('mouseleave', () => this.hoverEffect(element, 'leave'));
        coverElement.addEventListener('click', () => this.clickEffect(element));
    }
}
exports.MenuItemEffect = MenuItemEffect;


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
function switchForPokemonTypeFunc(ele, pokemonType) {
    switch (ele.type.name) {
        case TypeOfPokemon.GRASS:
            pokemonType.setAttribute("class", `${TypeOfPokemon.GRASS} pokemon__type`);
            break;
        case TypeOfPokemon.WATER:
            pokemonType.setAttribute("class", `${TypeOfPokemon.WATER} pokemon__type`);
            break;
        case TypeOfPokemon.FIRE:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FIRE} pokemon__type`);
            break;
        case TypeOfPokemon.BUG:
            pokemonType.setAttribute("class", `${TypeOfPokemon.BUG} pokemon__type`);
            break;
        case TypeOfPokemon.POISON:
            pokemonType.setAttribute("class", `${TypeOfPokemon.POISON} pokemon__type`);
            break;
        case TypeOfPokemon.ELECTRIC:
            pokemonType.setAttribute("class", `${TypeOfPokemon.ELECTRIC} pokemon__type`);
            break;
        case TypeOfPokemon.NORMAL:
            pokemonType.setAttribute("class", `${TypeOfPokemon.NORMAL} pokemon__type`);
            break;
        case TypeOfPokemon.FLYING:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FLYING} pokemon__type`);
            break;
        case TypeOfPokemon.ROCK:
            pokemonType.setAttribute("class", `${TypeOfPokemon.ROCK} pokemon__type`);
            break;
        case TypeOfPokemon.GROUND:
            pokemonType.setAttribute("class", `${TypeOfPokemon.GROUND} pokemon__type`);
            break;
        case TypeOfPokemon.PSYCHIC:
            pokemonType.setAttribute("class", `${TypeOfPokemon.PSYCHIC} pokemon__type`);
            break;
        case TypeOfPokemon.FIGHTING:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FIGHTING} pokemon__type`);
            break;
        case TypeOfPokemon.DRAGON:
            pokemonType.setAttribute("class", `${TypeOfPokemon.DRAGON} pokemon__type`);
            break;
        case TypeOfPokemon.DARK:
            pokemonType.setAttribute("class", `${TypeOfPokemon.DARK} pokemon__type`);
            break;
        case TypeOfPokemon.FAIRY:
            pokemonType.setAttribute("class", `${TypeOfPokemon.FAIRY} pokemon__type`);
            break;
        case TypeOfPokemon.GHOST:
            pokemonType.setAttribute("class", `${TypeOfPokemon.GHOST} pokemon__type`);
            break;
        case TypeOfPokemon.ICE:
            pokemonType.setAttribute("class", `${TypeOfPokemon.ICE} pokemon__type`);
            break;
        case TypeOfPokemon.STEEL:
            pokemonType.setAttribute("class", `${TypeOfPokemon.STEEL} pokemon__type`);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2ZldGNoRGF0YS50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2dlbmVyYXRlVG9ET00udHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvdXRpbHMvc3dpdGNoVHlwZS50cyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0IsR0FBRywrQkFBK0IsR0FBRyxzQkFBc0I7QUFDL0Usb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekMscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0Msd0JBQXdCLG1CQUFPLENBQUMsK0NBQWlCO0FBQ2pELHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQSwrQkFBK0I7QUFDL0I7QUFDQTtBQUNBO0FBQ0EsWUFBWSwyQkFBMkI7QUFDdkM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9CQUFvQjtBQUNwQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtDQUErQyxvQkFBb0IsRUFBRTtBQUNyRTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNB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aURBQWlELGtCQUFrQjtBQUNuRTtBQUNBO0FBQ0EsaURBQWlELG9CQUFvQjtBQUNyRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDOzs7Ozs7O1VDcEpoQztVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLkdlbmVyYXRlVmlldyA9IGV4cG9ydHMuY3VycmVudEdlbmVyYXRlZFBva2Vtb24gPSBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nID0gdm9pZCAwO1xyXG5jb25zdCBmZXRjaERhdGFfMSA9IHJlcXVpcmUoXCIuL2ZldGNoRGF0YVwiKTtcclxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcclxuY29uc3QgZ2VuZXJhdGVUb0RPTV8xID0gcmVxdWlyZShcIi4vZ2VuZXJhdGVUb0RPTVwiKTtcclxuZXhwb3J0cy5yYW5nZU9mTG9hZGluZyA9IHtcclxuICAgIGZyb206IDAsXHJcbiAgICBob3dNYW55OiAxMixcclxufTtcclxuZXhwb3J0cy5jdXJyZW50R2VuZXJhdGVkUG9rZW1vbiA9IFtdO1xyXG5jbGFzcyBHZW5lcmF0ZVZpZXcge1xyXG4gICAgY29uc3RydWN0b3IodHlwZU9mU29ydCkge1xyXG4gICAgICAgIHRoaXMubG9hZE1vcmVQb2tlbW9uID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20gPSBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20gKyAxMjtcclxuICAgICAgICAgICAgY29uc3QgZ2V0TW9yZURhdGEgPSBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0aGlzLnR5cGVTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvYWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25TZWN0aW9uX19sb2FkTW9yZVwiKTtcclxuICAgICAgICAgICAgLy8gbG9hZEJ0bi5jbGFzc0xpc3QuYWRkKCdwb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmUtLWRpc2FibGUnKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHlwZVNvcnQgPSB0eXBlT2ZTb3J0O1xyXG4gICAgICAgIC8vSW5pY2lhbCBHRVQgcG9rZW1vbiBmcm9tIEFQSVxyXG4gICAgICAgIC8vSW5pY2lhbCBhZGRFdmVudExpc3RlbmVyIGZvciBsb2FkTW9yZUJ0blxyXG4gICAgICAgIGNvbnN0IGxvYWRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25TZWN0aW9uX19sb2FkTW9yZVwiKTtcclxuICAgICAgICBsb2FkQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5sb2FkTW9yZVBva2Vtb24oKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVZpZXcgPSBHZW5lcmF0ZVZpZXc7XHJcbkdlbmVyYXRlVmlldy5pbml0aWFsR2VuZXJhdGUgPSAodHlwZU9mU29ydCkgPT4ge1xyXG4gICAgc3dpdGNoICh0eXBlT2ZTb3J0KSB7XHJcbiAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uVFlQRTpcclxuICAgICAgICAgICAgY29uc3QgZ2V0RGF0YVR5cGUgPSBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUw6XHJcbiAgICAgICAgICAgIGNvbnN0IGdldERhdGFHZW5lcmFsID0gbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQodHlwZU9mU29ydCwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmhvd01hbnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUjpcclxuICAgICAgICAgICAgY29uc3QgZ2V0RGF0YVJlZ2lvbiA9IG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0FNRTpcclxuICAgICAgICAgICAgY29uc3QgZ2V0RGF0YUdhbWUgPSBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIGNvbnN0IGdldERhdGEgPSBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICB9XHJcbiAgICBHZW5lcmF0ZVZpZXcuc2V0VGl0bGUodHlwZU9mU29ydCk7XHJcbn07XHJcbkdlbmVyYXRlVmlldy5zZXRUaXRsZSA9ICh0eXBlKSA9PiB7XHJcbiAgICBjb25zdCBzZWN0aW9uVGl0bGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX190aXRsZVwiKTtcclxuICAgIHNlY3Rpb25UaXRsZS50ZXh0Q29udGVudCA9IHR5cGU7XHJcbn07XHJcbi8vV2hlbiBoYXZlIHBhcnQgb2YgZGF0YSBmcm9tIEFQSSwgY2FsbCB0aGlzIGZ1bmN0aW9uIGZvciBzb3J0IHBva2Vtb24gYW5kIGNhbGwgZnVuY3Rpb24gd2hpY2ggd2lsbCBnZW5lcmF0ZSB2aWV3IG9mIHBva2Vtb25cclxuR2VuZXJhdGVWaWV3LnNvcnREYXRhID0gKHR5cGVPZlNvcnQsIGVhY2hQb2tlKSA9PiB7XHJcbiAgICAvL1NvcnQgYWxsIHBva2Vtb2luIGFuZCByZXR1cm4gYSBwcm9taXNlIHJlc29sdmUgXHJcbiAgICBjb25zdCBwb2tlbW9uQXJyYXkgPSBbXTtcclxuICAgIHBva2Vtb25BcnJheS5wdXNoKGVhY2hQb2tlKTtcclxuICAgIGV4cG9ydHMuY3VycmVudEdlbmVyYXRlZFBva2Vtb24ucHVzaChlYWNoUG9rZSk7XHJcbiAgICBjb25zdCBwcm9taXNlID0gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xyXG4gICAgICAgIGlmIChwb2tlbW9uQXJyYXkgIT09IFtdKSB7XHJcbiAgICAgICAgICAgIHBva2Vtb25BcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7IHJldHVybiBhLmlkIC0gYi5pZDsgfSk7XHJcbiAgICAgICAgICAgIHJlc29sdmUoJ2RvbmUnKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIHByb21pc2UudGhlbihkYXRhID0+IHtcclxuICAgICAgICAvL0lmIGV2ZXJ5dGhpbmcgaXMgb2ssIHRoZW5cclxuICAgICAgICBpZiAoZGF0YSA9PT0gJ2RvbmUnICYmIHBva2Vtb25BcnJheS5sZW5ndGggIT09IDApIHtcclxuICAgICAgICAgICAgY29uc3QgZ2VuZXJhdGVQb2tlbW9uID0gbmV3IGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZVBva2Vtb25Ub0RPTShwb2tlbW9uQXJyYXkpO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59O1xyXG5jb25zdCBtZW51SXRlbU9uZSA9IG5ldyBuYXZpZ2F0aW9uXzEuTWVudUl0ZW1FZmZlY3QobmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEUpO1xyXG5jb25zdCBtZW51SXRlbVR3byA9IG5ldyBuYXZpZ2F0aW9uXzEuTWVudUl0ZW1FZmZlY3QobmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUwpO1xyXG5jb25zdCBtZW51SXRlbVRocmVlID0gbmV3IG5hdmlnYXRpb25fMS5NZW51SXRlbUVmZmVjdChuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uQ09MT1IpO1xyXG5jb25zdCBtZW51SXRlbUZvdXIgPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FKTtcclxuY29uc3QgZ2V0VmlldyA9IG5ldyBHZW5lcmF0ZVZpZXcoJ2dlbmVyYWwnKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5Qb2tlbW9uR2V0ID0gdm9pZCAwO1xyXG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcclxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcclxuY29uc3QgZ2VuZXJhdGVUb0RPTV8xID0gcmVxdWlyZShcIi4vZ2VuZXJhdGVUb0RPTVwiKTtcclxuY2xhc3MgUG9rZW1vbkdldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlT2ZTb3J0LCBmcm9tLCBob3dNYW55KSB7XHJcbiAgICAgICAgdGhpcy5nZXRHZW5lcmFsRnVuYyA9IChBUEksIHR5cGVPZlNvcnQpID0+IHtcclxuICAgICAgICAgICAgZmV0Y2goQVBJKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBkYXRhLnJlc3VsdHMuZm9yRWFjaCgocG9rZW1vbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGZldGNoKHBva2Vtb24udXJsKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZWFjaFBva2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFsbFBva2Vtb24ucHVzaChlYWNoUG9rZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFwcF8xLkdlbmVyYXRlVmlldy5zb3J0RGF0YSh0eXBlT2ZTb3J0LCBlYWNoUG9rZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgICAgICAgICAgLmNhdGNoKChlcnIpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUlwiLCBlcnIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmMgPSAoQVBJLCBBUElUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKEFQSSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzLmZvckVhY2goKHR5cGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoQVBJVHlwZSA9PT0gbmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEUpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZ2VuZXJhdGVUb0RPTV8xLkdlbmVyYXRlVHlwZVRvRE9NLmdlbmVyYXRlVHlwZXNUb0RPTSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSBpZiAoQVBJVHlwZSA9PT0gbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZUNvbG9yVG9ET00uZ2VuZXJhdGVDb2xvcnNUb0RPTSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoZXJyKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcIkVSUk9SXCIsIGVycik7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50eXBlQVBJID0gYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvdHlwZS9gO1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhbEFQSSA9IGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vP29mZnNldD0ke2Zyb219JmxpbWl0PSR7aG93TWFueX1gO1xyXG4gICAgICAgIHRoaXMuY29sb3JBUEkgPSBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLWNvbG9yL2A7XHJcbiAgICAgICAgdGhpcy5hbGxQb2tlbW9uID0gW107XHJcbiAgICAgICAgc3dpdGNoICh0eXBlT2ZTb3J0KSB7XHJcbiAgICAgICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEU6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbG9yT3JUeXBlRnVuYyh0aGlzLnR5cGVBUEksIG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMOlxyXG4gICAgICAgICAgICAgICAgLy9HZXQgcG9rZW1vbiBhbmQgZmV0Y2ggZXZlcnkgc2luZ2xlIHVybCBwb2tlbW9uLCBwdXNoIGl0IHRvIHRoZSBhcnJheSBhbmQgc2VuZCB0byBzb3J0RGF0YSBmdW5jdGlvblxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRHZW5lcmFsRnVuYyh0aGlzLmdlbmVyYWxBUEksIHR5cGVPZlNvcnQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmModGhpcy5jb2xvckFQSSwgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldEdlbmVyYWxGdW5jKHRoaXMuZ2VuZXJhbEFQSSwgdHlwZU9mU29ydCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUG9rZW1vbkdldCA9IFBva2Vtb25HZXQ7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2VuZXJhdGVDb2xvclRvRE9NID0gZXhwb3J0cy5HZW5lcmF0ZVR5cGVUb0RPTSA9IGV4cG9ydHMuR2VuZXJhdGVQb2tlbW9uVG9ET00gPSB2b2lkIDA7XHJcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xyXG5jb25zdCBzd2l0Y2hUeXBlXzEgPSByZXF1aXJlKFwiLi91dGlscy9zd2l0Y2hUeXBlXCIpO1xyXG5jbGFzcyBHZW5lcmF0ZVBva2Vtb25Ub0RPTSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhbGxQb2tlbW9uKSB7XHJcbiAgICAgICAgLy9IZXJlIGdvZXMgYmVmb3JlIHByZXBhcmVkIGFycmF5IG9mIGFsbCBwb2tlbW9ucyAocGFydCBvbmUgYnkgb25lIG5vdCBhbGwgaW4gb25lKSBET00gaXNuJ3QgY2xlYW4gaGVyZSwgc28gZXZlcnkgcGFydCBnb2VzIHRvIHRoZSBlbmQgb2YgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVBva2Vtb25JbkRPTSA9IChhbGxQb2tlbW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFBva2Vtb24uZm9yRWFjaCgocG9rZW1vbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vbklkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vbk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBuZXdDYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicG9rZW1vbl9fY2FyZFwiKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25OYW1lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicG9rZW1vbl9fbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uSWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgJ3Bva2Vtb25fX2lkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uSW1nVXJsID0gKF9iID0gKF9hID0gcG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnNwcml0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vdGhlclsnb2ZmaWNpYWwtYXJ0d29yayddKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZnJvbnRfZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uSW1nVXJsICE9PSBudWxsICYmIHBva2Vtb25JbWdVcmwgIT09IHZvaWQgMCA/IHBva2Vtb25JbWdVcmwgOiBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3Bva2Vtb25JbWdVcmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX2ltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcImxvYWRpbmdcIiwgXCJsYXp5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbkltZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCAnL2ltYWdlcy9xdWVzdGlvbk1hcmsuc3ZnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX3F1ZXN0aW9uTWFya1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdDYXJkLmFwcGVuZENoaWxkKHBva2Vtb25JbWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9BZGQgSUQgb2YgcG9rZW1vbiB0byBldmVyeSBjb250YWluZXIgaW50byBjYXJkXHJcbiAgICAgICAgICAgICAgICBpZiAocG9rZW1vbi5pZCA8IDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjMDAke3Bva2Vtb24uaWR9YDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uLmlkID49IDEwICYmIGluZGV4IDwgMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjMCR7cG9rZW1vbi5pZH1gO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBva2Vtb24uaWQgPj0gMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0eXBlIG9yIHR5cGVzIG9mIHBva2Vtb24gdG8gZXZlcnkgY29udGFpbmVyIGludG8gY2FyZFxyXG4gICAgICAgICAgICAgICAgKF9jID0gcG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnR5cGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vblR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9IGAke2VsZS50eXBlLm5hbWV9YDtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hUeXBlXzEuc3dpdGNoRm9yUG9rZW1vblR5cGVGdW5jKGVsZSwgcG9rZW1vblR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0dldCBldmVyeSBvZiB0aGVzZSBjcmVhdGVkIGVsZW1lbnQgYW5kIGFkZCBpdCBpbnRvIG5ld0NhcmQgYW5kIG5leHQgLSBuZXdDYXJkIHRvIHRoZSBlbmQgb2YgcG9rZW1vblNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwb2tlbW9uX190eXBlQ29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZCh0eXBlQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbklkKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuc2V0QXR0cmlidXRlKCdpZCcsIGAke3Bva2Vtb24uaWR9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uJyk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIG5ld0NhcmQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQb2tlbW9uSW5ET00oYWxsUG9rZW1vbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVBva2Vtb25Ub0RPTSA9IEdlbmVyYXRlUG9rZW1vblRvRE9NO1xyXG5jbGFzcyBHZW5lcmF0ZVR5cGVUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVR5cGVUb0RPTSA9IEdlbmVyYXRlVHlwZVRvRE9NO1xyXG5HZW5lcmF0ZVR5cGVUb0RPTS5nZW5lcmF0ZVR5cGVzVG9ET00gPSAodHlwZSkgPT4ge1xyXG4gICAgaWYgKCh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgJiYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS5uYW1lKSAhPT0gJ3Vua25vd24nICYmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgIT09ICdzaGFkb3cnKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zb3J0VHlwZV9fY29udGFpbmVyXCIpO1xyXG4gICAgICAgIGNvbnN0IHR5cGVFbGVtZW50ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgICB0eXBlRWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgc29ydFR5cGVfXyR7dHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLm5hbWV9IHNvcnRUeXBlX190eXBlYCk7XHJcbiAgICAgICAgdHlwZUVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblwiKTtcclxuICAgICAgICAgICAgc3dpdGNoVHlwZV8xLnN3aXRjaFR5cGVGb3JDb3ZlckZ1bmModHlwZSk7XHJcbiAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZldGNoKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS51cmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9rZW1vbiAmJiBBcnJheS5pc0FycmF5KGRhdGEucG9rZW1vbikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBvbmVUeXBlUG9rZW1vbiA9IFsuLi5kYXRhLnBva2Vtb25dO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uZVR5cGVQb2tlbW9uLmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChlbGUucG9rZW1vbi51cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihlYWNoUG9rZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhcHBfMS5HZW5lcmF0ZVZpZXcuc29ydERhdGEoJ3R5cGUnLCBlYWNoUG9rZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0eXBlRWxlbWVudC50ZXh0Q29udGVudCA9IHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS5uYW1lO1xyXG4gICAgICAgIGNvbnRhaW5lci5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XHJcbiAgICB9XHJcbn07XHJcbmNsYXNzIEdlbmVyYXRlQ29sb3JUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZUNvbG9yVG9ET00gPSBHZW5lcmF0ZUNvbG9yVG9ET007XHJcbkdlbmVyYXRlQ29sb3JUb0RPTS5nZW5lcmF0ZUNvbG9yc1RvRE9NID0gKGNvbG9yKSA9PiB7XHJcbiAgICBpZiAoY29sb3IgPT09IG51bGwgfHwgY29sb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbG9yLm5hbWUpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGBzb3J0VHlwZV9fJHtjb2xvciA9PT0gbnVsbCB8fCBjb2xvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sb3IubmFtZX0gc29ydFR5cGVfX3R5cGVgKTtcclxuICAgICAgICB0eXBlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2Vtb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uXCIpO1xyXG4gICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICBmZXRjaChjb2xvciA9PT0gbnVsbCB8fCBjb2xvciA9PT0gdm9pZCAwID8gdm9pZCAwIDogY29sb3IudXJsKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBva2Vtb25fc3BlY2llcyAmJiBBcnJheS5pc0FycmF5KGRhdGEucG9rZW1vbl9zcGVjaWVzKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uZVR5cGVQb2tlbW9uID0gWy4uLmRhdGEucG9rZW1vbl9zcGVjaWVzXTtcclxuICAgICAgICAgICAgICAgICAgICBvbmVUeXBlUG9rZW1vbi5mb3JFYWNoKChlbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kaWZpY2F0ZVVSTCA9IEdlbmVyYXRlQ29sb3JUb0RPTS5tb2RpZmljYXRlVXJsKGVsZS51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChtb2RpZmljYXRlVVJMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZWFjaFBva2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYXBwXzEuR2VuZXJhdGVWaWV3LnNvcnREYXRhKCdjb2xvcicsIGVhY2hQb2tlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnRleHRDb250ZW50ID0gY29sb3IgPT09IG51bGwgfHwgY29sb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbG9yLm5hbWU7XHJcbiAgICAgICAgY29udGFpbmVyLmFwcGVuZENoaWxkKHR5cGVFbGVtZW50KTtcclxuICAgIH1cclxufTtcclxuR2VuZXJhdGVDb2xvclRvRE9NLm1vZGlmaWNhdGVVcmwgPSAodXJsKSA9PiB7XHJcbiAgICBjb25zdCBzcGxpdFVybCA9IHVybC5zcGxpdChcIi9cIik7XHJcbiAgICByZXR1cm4gYCR7c3BsaXRVcmxbMF19Ly8ke3NwbGl0VXJsWzJdfS8ke3NwbGl0VXJsWzNdfS8ke3NwbGl0VXJsWzRdfS9wb2tlbW9uLyR7c3BsaXRVcmxbNl19YDtcclxufTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5NZW51SXRlbUVmZmVjdCA9IGV4cG9ydHMuTWVudUl0ZW0gPSB2b2lkIDA7XHJcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xyXG52YXIgTWVudUl0ZW07XHJcbihmdW5jdGlvbiAoTWVudUl0ZW0pIHtcclxuICAgIE1lbnVJdGVtW1wiVFlQRVwiXSA9IFwidHlwZVwiO1xyXG4gICAgTWVudUl0ZW1bXCJHRU5FUkFMXCJdID0gXCJnZW5lcmFsXCI7XHJcbiAgICBNZW51SXRlbVtcIkNPTE9SXCJdID0gXCJjb2xvclwiO1xyXG4gICAgTWVudUl0ZW1bXCJHQU1FXCJdID0gXCJnYW1lXCI7XHJcbn0pKE1lbnVJdGVtID0gZXhwb3J0cy5NZW51SXRlbSB8fCAoZXhwb3J0cy5NZW51SXRlbSA9IHt9KSk7XHJcbjtcclxuY2xhc3MgTWVudUl0ZW1FZmZlY3Qge1xyXG4gICAgY29uc3RydWN0b3IoZWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY2xlYXJQb2tlbW9uU2VjdGlvbkJlZm9yZUdlbmVyYXRlID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcG9rZW1vblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25cIik7XHJcbiAgICAgICAgICAgIGNvbnN0IHR5cGVzU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IE1lbnVJdGVtLkdFTkVSQUwpIHtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbm5lckhUTUwgPSBcIjxwIGNsYXNzPSdwb2tlbW9uX19kdW1teVRleHQnPlRoZXJlIGlzIG5vdGhpbmcgdG8gZGlzcGxheSBmb3IgdGhlIG1vbWVudDwvcD5cIjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0eXBlc1NlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgYXBwXzEucmFuZ2VPZkxvYWRpbmcuZnJvbSA9IDA7XHJcbiAgICAgICAgICAgIGFwcF8xLmN1cnJlbnRHZW5lcmF0ZWRQb2tlbW9uLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmNsaWNrRWZmZWN0ID0gKGVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmF2RWxlbWVudCA9IFsuLi5kb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGAubmF2X19vcHRpb25gKV07XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2V3JhcHBlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubmF2V3JhcHBlclwiKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2TGluZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2xpbmUnKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2Q2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpcmNsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBuYXZJbm5lckNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGVfX2lubmVyQ2lyY2xlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdmVyTW91c2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY292ZXJNb3VzZScpO1xyXG4gICAgICAgICAgICBjb25zdCBwb2tlZGV4U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZWRleFwiKTtcclxuICAgICAgICAgICAgY29uc3QgY292ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyXCIpO1xyXG4gICAgICAgICAgICBpZiAoY292ZXJNb3VzZS5pZCAhPT0gJ21pbmltYWxpemVkJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5oaWRlTmF2RWxlbWVudHMoZWxlbWVudCwgbmF2RWxlbWVudCwgbmF2LCBuYXZDaXJjbGUsIG5hdklubmVyQ2lyY2xlLCBuYXZMaW5lLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBwb2tlZGV4U2VjdGlvbiwgY292ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93TmF2RWxlbWVudHMocG9rZWRleFNlY3Rpb24sIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIG5hdiwgbmF2Q2lyY2xlLCBuYXZJbm5lckNpcmNsZSwgbmF2TGluZSwgbmF2RWxlbWVudCwgY292ZXIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhpZGVOYXZFbGVtZW50cyA9IChlbGVtZW50LCBuYXZFbGVtZW50LCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIHBva2VkZXhTZWN0aW9uLCBjb3ZlcikgPT4ge1xyXG4gICAgICAgICAgICBuYXZFbGVtZW50LmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZWxlLmNsYXNzTGlzdC5hZGQoXCJuYXZfX29wdGlvbi0taGlkZVwiKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoXCJuYXYtLWhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICBuYXZDaXJjbGUuY2xhc3NMaXN0LmFkZCgnY2lyY2xlLS1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZJbm5lckNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGVfX2lubmVyQ2lyY2xlLS1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5hZGQoXCJuYXZfX2xpbmUtLWhpZGVcIik7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2V3JhcHBlci5jbGFzc0xpc3QuYWRkKCduYXZXcmFwcGVyLS1oaWRlJyk7XHJcbiAgICAgICAgICAgICAgICBjb3Zlck1vdXNlLmNsYXNzTGlzdC5hZGQoJ2NvdmVyTW91c2UtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIHBva2VkZXhTZWN0aW9uLmNsYXNzTGlzdC5hZGQoJ3Bva2VkZXgtLXNob3dJdCcpO1xyXG4gICAgICAgICAgICAgICAgY292ZXJNb3VzZS5pZCA9ICdtaW5pbWFsaXplZCc7XHJcbiAgICAgICAgICAgICAgICBjb3Zlci5jbGFzc0xpc3QuYWRkKCdjb3Zlci0tbG93ZXJQb3NpdGlvbicpO1xyXG4gICAgICAgICAgICB9LCA3NTApO1xyXG4gICAgICAgICAgICAvL0RvIHRoaXMgd2l0aCBldmVyeSBjbGljayBpbiBuYXYgZWxlbWVudFxyXG4gICAgICAgICAgICB0aGlzLmNsZWFyUG9rZW1vblNlY3Rpb25CZWZvcmVHZW5lcmF0ZShlbGVtZW50KTtcclxuICAgICAgICAgICAgY29uc3QgbG9hZE1vcmVCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25TZWN0aW9uX19sb2FkTW9yZVwiKTtcclxuICAgICAgICAgICAgaWYgKGVsZW1lbnQgPT09IE1lbnVJdGVtLkdFTkVSQUwpIHtcclxuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5yZW1vdmUoXCJwb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmUtLWRpc2FibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBsb2FkTW9yZUJ1dHRvbi5jbGFzc0xpc3QuYWRkKFwicG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlLS1kaXNhYmxlXCIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGFwcF8xLkdlbmVyYXRlVmlldy5pbml0aWFsR2VuZXJhdGUoZWxlbWVudCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnNob3dOYXZFbGVtZW50cyA9IChwb2tlZGV4U2VjdGlvbiwgbmF2V3JhcHBlciwgY292ZXJNb3VzZSwgbmF2LCBuYXZDaXJjbGUsIG5hdklubmVyQ2lyY2xlLCBuYXZMaW5lLCBuYXZFbGVtZW50LCBjb3ZlcikgPT4ge1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19nYW1lJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19nYW1lLS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fZ2VuZXJhbCcpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fZ2VuZXJhbC0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX3R5cGUnKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXZfX3R5cGUtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19jb2xvcicpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fY29sb3ItLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBwb2tlZGV4U2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdwb2tlZGV4LS1zaG93SXQnKTtcclxuICAgICAgICAgICAgbmF2V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCduYXZXcmFwcGVyLS1oaWRlJyk7XHJcbiAgICAgICAgICAgIGNvdmVyTW91c2UuY2xhc3NMaXN0LnJlbW92ZSgnY292ZXJNb3VzZS0taGlkZScpO1xyXG4gICAgICAgICAgICBjb3Zlci5jbGFzc0xpc3QucmVtb3ZlKCdjb3Zlci0tbG93ZXJQb3NpdGlvbicpO1xyXG4gICAgICAgICAgICBjb3Zlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBcInJnYmEoMCwwLDAsMC4xKVwiO1xyXG4gICAgICAgICAgICBjb3Zlck1vdXNlLmlkID0gXCJcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi0taGlkZVwiLCAnbmF2LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWhpZGUnLCAnY2lyY2xlX19pbm5lckNpcmNsZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXZfX2xpbmUtLWhpZGVcIiwgJ25hdl9fbGluZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2RWxlbWVudC5mb3JFYWNoKChlbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fb3B0aW9uLS1oaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDc1MCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhvdmVyRWZmZWN0ID0gKGVsZW1lbnQsIGV2ZW50VHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm5hdl9fJHtlbGVtZW50fWApO1xyXG4gICAgICAgICAgICBjb25zdCBjb3Zlck1vdXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdmVyTW91c2UnKTtcclxuICAgICAgICAgICAgaWYgKGNvdmVyTW91c2UuaWQgIT09ICdtaW5pbWFsaXplZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdvdmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbmF2X18ke2VsZW1lbnR9LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdsZWF2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fJHtlbGVtZW50fS0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fbGluZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2SW5uZXJDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlX19pbm5lckNpcmNsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ292ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoYG5hdi0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGluZS5jbGFzc0xpc3QuYWRkKCduYXZfX2xpbmUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2xlYXZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19saW5lLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZJbm5lckNpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGVfX2lubmVyQ2lyY2xlLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgY292ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvdmVyTW91c2VfXyR7ZWxlbWVudH1gKTtcclxuICAgICAgICBjb3ZlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4gdGhpcy5ob3ZlckVmZmVjdChlbGVtZW50LCAnb3ZlcicpKTtcclxuICAgICAgICBjb3ZlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaG92ZXJFZmZlY3QoZWxlbWVudCwgJ2xlYXZlJykpO1xyXG4gICAgICAgIGNvdmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xpY2tFZmZlY3QoZWxlbWVudCkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuTWVudUl0ZW1FZmZlY3QgPSBNZW51SXRlbUVmZmVjdDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMgPSBleHBvcnRzLnN3aXRjaFR5cGVGb3JDb3ZlckZ1bmMgPSB2b2lkIDA7XHJcbnZhciBUeXBlT2ZQb2tlbW9uO1xyXG4oZnVuY3Rpb24gKFR5cGVPZlBva2Vtb24pIHtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJGSVJFXCJdID0gXCJmaXJlXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiV0FURVJcIl0gPSBcIndhdGVyXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR1JBU1NcIl0gPSBcImdyYXNzXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiUE9JU09OXCJdID0gXCJwb2lzb25cIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJCVUdcIl0gPSBcImJ1Z1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIkVMRUNUUklDXCJdID0gXCJlbGVjdHJpY1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIk5PUk1BTFwiXSA9IFwibm9ybWFsXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRkxZSU5HXCJdID0gXCJmbHlpbmdcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJST0NLXCJdID0gXCJyb2NrXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR1JPVU5EXCJdID0gXCJncm91bmRcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJQU1lDSElDXCJdID0gXCJwc3ljaGljXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRklHSFRJTkdcIl0gPSBcImZpZ2h0aW5nXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRFJBR09OXCJdID0gXCJkcmFnb25cIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJEQVJLXCJdID0gXCJkYXJrXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRkFJUllcIl0gPSBcImZhaXJ5XCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiR0hPU1RcIl0gPSBcImdob3N0XCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiSUNFXCJdID0gXCJpY2VcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJTVEVFTFwiXSA9IFwic3RlZWxcIjtcclxufSkoVHlwZU9mUG9rZW1vbiB8fCAoVHlwZU9mUG9rZW1vbiA9IHt9KSk7XHJcbjtcclxuZnVuY3Rpb24gc3dpdGNoVHlwZUZvckNvdmVyRnVuYyh0eXBlKSB7XHJcbiAgICBjb25zdCBjb3ZlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvdmVyXCIpO1xyXG4gICAgY29uc3Qgb3BhY2l0eUxldmVsID0gJzAuMjUnO1xyXG4gICAgc3dpdGNoICh0eXBlLm5hbWUpIHtcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JBU1M6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNTUsMjA0LDgwLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uV0FURVI6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg2OSwxNDYsMTk2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklSRTpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDI1MywxMjUsMzYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5CVUc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxMTUsMTYwLDY0LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUE9JU09OOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYigxODYsMTI4LDIwMiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkVMRUNUUklDOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjM4LDIxMyw1Mywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLk5PUk1BTDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDE2NSwxNzMsMTc2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkxZSU5HOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMTgxLDIyMiwyMzMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5ST0NLOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoODgsODMsNzksJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUk9VTkQ6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNzEsMTUyLDY2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUFNZQ0hJQzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDI0NCwxMDMsMTg2LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklHSFRJTkc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgyMTMsMTAzLDM1LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRFJBR09OOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoODMsMTY0LDIwNywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkRBUks6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxMTIsMTEyLDExMiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkZBSVJZOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjUzLDE4NSwyMzMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HSE9TVDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDEyMyw5OCwxNjMsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5JQ0U6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg4MSwxOTYsMjMxLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uU1RFRUw6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxNTgsMTgzLDE4NCwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuc3dpdGNoVHlwZUZvckNvdmVyRnVuYyA9IHN3aXRjaFR5cGVGb3JDb3ZlckZ1bmM7XHJcbmZ1bmN0aW9uIHN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyhlbGUsIHBva2Vtb25UeXBlKSB7XHJcbiAgICBzd2l0Y2ggKGVsZS50eXBlLm5hbWUpIHtcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JBU1M6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uR1JBU1N9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLldBVEVSOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLldBVEVSfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GSVJFOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkZJUkV9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkJVRzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5CVUd9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLlBPSVNPTjpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5QT0lTT059IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkVMRUNUUklDOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkVMRUNUUklDfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5OT1JNQUw6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uTk9STUFMfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GTFlJTkc6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRkxZSU5HfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5ST0NLOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlJPQ0t9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkdST1VORDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5HUk9VTkR9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLlBTWUNISUM6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uUFNZQ0hJQ30gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRklHSFRJTkc6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRklHSFRJTkd9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkRSQUdPTjpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5EUkFHT059IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkRBUks6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uREFSS30gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkFJUlk6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRkFJUll9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkdIT1NUOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkdIT1NUfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5JQ0U6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uSUNFfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5TVEVFTDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5TVEVFTH0gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5zd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmMgPSBzd2l0Y2hGb3JQb2tlbW9uVHlwZUZ1bmM7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdGlmKF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0pIHtcblx0XHRyZXR1cm4gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBpcyByZWZlcmVuY2VkIGJ5IG90aGVyIG1vZHVsZXMgc28gaXQgY2FuJ3QgYmUgaW5saW5lZFxudmFyIF9fd2VicGFja19leHBvcnRzX18gPSBfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9zcmMvYXBwLnRzXCIpO1xuIl0sInNvdXJjZVJvb3QiOiIifQ==
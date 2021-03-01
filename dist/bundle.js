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
};
class GenerateView {
    constructor(typeOfSort) {
        this.loadMorePokemon = () => {
            exports.rangeOfLoading.from = exports.rangeOfLoading.from + 12;
            new fetchData_1.PokemonGet(this.typeSort, exports.rangeOfLoading.from, exports.rangeOfLoading.howMany);
        };
        this.typeSort = typeOfSort;
        //Inicial addEventListener for loadMoreBtn
        const loadBtn = document.querySelector(".pokemonSection__loadMore");
        loadBtn.addEventListener('click', () => this.loadMorePokemon());
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
exports.GenerateGeneralToDOM = exports.GenerateColorToDOM = exports.GenerateTypeToDOM = exports.SortPokemon = exports.GeneratePokemonToDOM = exports.pokemonCollect = void 0;
const switchType_1 = __webpack_require__(/*! ./utils/switchType */ "./src/utils/switchType.ts");
exports.pokemonCollect = [];
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
class SortPokemon {
}
exports.SortPokemon = SortPokemon;
SortPokemon.sortAllPokemon = (eachPoke) => {
    exports.pokemonCollect.push(eachPoke);
    exports.pokemonCollect.sort(function (a, b) { return a.id - b.id; });
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
            if (element === MenuItem.GENERAL) {
                pokemonSection.innerHTML = "";
            }
            else {
                pokemonSection.innerHTML = "<p class='pokemon__dummyText'>There is nothing to display for the moment</p>";
            }
            typesSection.innerHTML = "";
            app_1.rangeOfLoading.from = 0;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2ZldGNoRGF0YS50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2dlbmVyYXRlVG9ET00udHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC8uL3NyYy9uYXZpZ2F0aW9uLnRzIiwid2VicGFjazovL3Bva2VkZXgvLi9zcmMvdXRpbHMvc3dpdGNoVHlwZS50cyIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3Bva2VkZXgvd2VicGFjay9zdGFydHVwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxvQkFBb0IsR0FBRyxzQkFBc0I7QUFDN0Msb0JBQW9CLG1CQUFPLENBQUMsdUNBQWE7QUFDekMscUJBQXFCLG1CQUFPLENBQUMseUNBQWM7QUFDM0Msc0JBQXNCO0FBQ3RCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVksMkJBQTJCO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvQkFBb0I7QUFDcEI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDakRhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELGtCQUFrQjtBQUNsQixxQkFBcUIsbUJBQU8sQ0FBQyx5Q0FBYztBQUMzQyx3QkFBd0IsbUJBQU8sQ0FBQywrQ0FBaUI7QUFDakQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUIsb0JBQW9CO0FBQ3BCLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakIsYUFBYTtBQUNiO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBLHVFQUF1RSxLQUFLLFNBQVMsUUFBUTtBQUM3RjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWtCOzs7Ozs7Ozs7OztBQ2xFTDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCw0QkFBNEIsR0FBRywwQkFBMEIsR0FBRyx5QkFBeUIsR0FBRyxtQkFBbUIsR0FBRyw0QkFBNEIsR0FBRyxzQkFBc0I7QUFDbksscUJBQXFCLG1CQUFPLENBQUMscURBQW9CO0FBQ2pELHNCQUFzQjtBQUN0QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzREFBc0QsY0FBYztBQUNwRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELFdBQVc7QUFDN0Q7QUFDQSxpREFBaUQsV0FBVztBQUM1RDtBQUNBLGdEQUFnRCxXQUFXO0FBQzNEO0FBQ0E7QUFDQTtBQUNBLGlEQUFpRCxjQUFjO0FBQy9EO0FBQ0E7QUFDQSxpQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsV0FBVztBQUN6RDtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCO0FBQzVCO0FBQ0E7QUFDQSxtQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGlEQUFpRCxvQkFBb0IsRUFBRTtBQUN2RTtBQUNBO0FBQ0E7QUFDQSx5QkFBeUI7QUFDekI7QUFDQTtBQUNBO0FBQ0E7QUFDQSx1REFBdUQsc0RBQXNEO0FBQzdHO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDZCQUE2QjtBQUM3RDtBQUNBLHlCQUF5QjtBQUN6QixxQkFBcUI7QUFDckI7QUFDQSxhQUFhO0FBQ2IsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCQUEwQjtBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBLHVEQUF1RCx5REFBeUQ7QUFDaEg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0MsNkJBQTZCO0FBQzdEO0FBQ0EseUJBQXlCO0FBQ3pCLHFCQUFxQjtBQUNyQjtBQUNBLGFBQWE7QUFDYixTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYyxZQUFZLElBQUksWUFBWSxHQUFHLFlBQVksR0FBRyxZQUFZLFdBQVcsWUFBWTtBQUMvRjtBQUNBO0FBQ0E7QUFDQSw0QkFBNEI7QUFDNUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWdCLDZCQUE2QjtBQUM3QztBQUNBLFNBQVM7QUFDVDtBQUNBOzs7Ozs7Ozs7OztBQ25LYTtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxzQkFBc0IsR0FBRyxnQkFBZ0I7QUFDekMsY0FBYyxtQkFBTyxDQUFDLDJCQUFPO0FBQzdCLHdCQUF3QixtQkFBTyxDQUFDLCtDQUFpQjtBQUNqRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDLGtDQUFrQyxnQkFBZ0IsS0FBSztBQUN4RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLCtEQUErRCxRQUFRO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxRQUFRO0FBQzdEO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsUUFBUTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7Ozs7OztBQ2pJVDtBQUNiLDhDQUE2QyxDQUFDLGNBQWMsRUFBQztBQUM3RCxnQ0FBZ0MsR0FBRyw4QkFBOEI7QUFDakU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMsc0NBQXNDO0FBQ3ZDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9FQUFvRSxhQUFhO0FBQ2pGO0FBQ0E7QUFDQSxvRUFBb0UsYUFBYTtBQUNqRjtBQUNBO0FBQ0Esb0VBQW9FLGFBQWE7QUFDakY7QUFDQTtBQUNBLG9FQUFvRSxhQUFhO0FBQ2pGO0FBQ0E7QUFDQSxvRUFBb0UsYUFBYTtBQUNqRjtBQUNBO0FBQ0Esb0VBQW9FLGFBQWE7QUFDakY7QUFDQTtBQUNBLHFFQUFxRSxhQUFhO0FBQ2xGO0FBQ0E7QUFDQSxxRUFBcUUsYUFBYTtBQUNsRjtBQUNBO0FBQ0Esa0VBQWtFLGFBQWE7QUFDL0U7QUFDQTtBQUNBLG9FQUFvRSxhQUFhO0FBQ2pGO0FBQ0E7QUFDQSxxRUFBcUUsYUFBYTtBQUNsRjtBQUNBO0FBQ0Esb0VBQW9FLGFBQWE7QUFDakY7QUFDQTtBQUNBLG9FQUFvRSxhQUFhO0FBQ2pGO0FBQ0E7QUFDQSxxRUFBcUUsYUFBYTtBQUNsRjtBQUNBO0FBQ0EscUVBQXFFLGFBQWE7QUFDbEY7QUFDQTtBQUNBLG9FQUFvRSxhQUFhO0FBQ2pGO0FBQ0E7QUFDQSxvRUFBb0UsYUFBYTtBQUNqRjtBQUNBO0FBQ0EscUVBQXFFLGFBQWE7QUFDbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhCQUE4QjtBQUM5QjtBQUNBO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQSxpREFBaUQsbUJBQW1CO0FBQ3BFO0FBQ0E7QUFDQSxpREFBaUQsa0JBQWtCO0FBQ25FO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQSxpREFBaUQsdUJBQXVCO0FBQ3hFO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQSxpREFBaUQsbUJBQW1CO0FBQ3BFO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQSxpREFBaUQsc0JBQXNCO0FBQ3ZFO0FBQ0E7QUFDQSxpREFBaUQsdUJBQXVCO0FBQ3hFO0FBQ0E7QUFDQSxpREFBaUQscUJBQXFCO0FBQ3RFO0FBQ0E7QUFDQSxpREFBaUQsbUJBQW1CO0FBQ3BFO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQSxpREFBaUQsa0JBQWtCO0FBQ25FO0FBQ0E7QUFDQSxpREFBaUQsb0JBQW9CO0FBQ3JFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQ0FBZ0M7Ozs7Ozs7VUNwSmhDO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7O1VDckJBO1VBQ0E7VUFDQTtVQUNBIiwiZmlsZSI6ImJ1bmRsZS5qcyIsInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuR2VuZXJhdGVWaWV3ID0gZXhwb3J0cy5yYW5nZU9mTG9hZGluZyA9IHZvaWQgMDtcclxuY29uc3QgZmV0Y2hEYXRhXzEgPSByZXF1aXJlKFwiLi9mZXRjaERhdGFcIik7XHJcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRpb25cIik7XHJcbmV4cG9ydHMucmFuZ2VPZkxvYWRpbmcgPSB7XHJcbiAgICBmcm9tOiAwLFxyXG4gICAgaG93TWFueTogMTIsXHJcbn07XHJcbmNsYXNzIEdlbmVyYXRlVmlldyB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlT2ZTb3J0KSB7XHJcbiAgICAgICAgdGhpcy5sb2FkTW9yZVBva2Vtb24gPSAoKSA9PiB7XHJcbiAgICAgICAgICAgIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSA9IGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSArIDEyO1xyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0aGlzLnR5cGVTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnR5cGVTb3J0ID0gdHlwZU9mU29ydDtcclxuICAgICAgICAvL0luaWNpYWwgYWRkRXZlbnRMaXN0ZW5lciBmb3IgbG9hZE1vcmVCdG5cclxuICAgICAgICBjb25zdCBsb2FkQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmVcIik7XHJcbiAgICAgICAgbG9hZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMubG9hZE1vcmVQb2tlbW9uKCkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuR2VuZXJhdGVWaWV3ID0gR2VuZXJhdGVWaWV3O1xyXG5HZW5lcmF0ZVZpZXcuaW5pdGlhbEdlbmVyYXRlID0gKHR5cGVPZlNvcnQpID0+IHtcclxuICAgIHN3aXRjaCAodHlwZU9mU29ydCkge1xyXG4gICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLlRZUEU6XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0VORVJBTDpcclxuICAgICAgICAgICAgbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQodHlwZU9mU29ydCwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmhvd01hbnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUjpcclxuICAgICAgICAgICAgbmV3IGZldGNoRGF0YV8xLlBva2Vtb25HZXQodHlwZU9mU29ydCwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5mcm9tLCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmhvd01hbnkpO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FOlxyXG4gICAgICAgICAgICBuZXcgZmV0Y2hEYXRhXzEuUG9rZW1vbkdldCh0eXBlT2ZTb3J0LCBleHBvcnRzLnJhbmdlT2ZMb2FkaW5nLmZyb20sIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuaG93TWFueSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIG5ldyBmZXRjaERhdGFfMS5Qb2tlbW9uR2V0KHR5cGVPZlNvcnQsIGV4cG9ydHMucmFuZ2VPZkxvYWRpbmcuZnJvbSwgZXhwb3J0cy5yYW5nZU9mTG9hZGluZy5ob3dNYW55KTtcclxuICAgIH1cclxuICAgIEdlbmVyYXRlVmlldy5zZXRUaXRsZSh0eXBlT2ZTb3J0KTtcclxufTtcclxuR2VuZXJhdGVWaWV3LnNldFRpdGxlID0gKHR5cGUpID0+IHtcclxuICAgIGNvbnN0IHNlY3Rpb25UaXRsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX3RpdGxlXCIpO1xyXG4gICAgc2VjdGlvblRpdGxlLnRleHRDb250ZW50ID0gdHlwZTtcclxufTtcclxuY29uc3QgbWVudUl0ZW1PbmUgPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFKTtcclxuY29uc3QgbWVudUl0ZW1Ud28gPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKTtcclxuY29uc3QgbWVudUl0ZW1UaHJlZSA9IG5ldyBuYXZpZ2F0aW9uXzEuTWVudUl0ZW1FZmZlY3QobmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKTtcclxuY29uc3QgbWVudUl0ZW1Gb3VyID0gbmV3IG5hdmlnYXRpb25fMS5NZW51SXRlbUVmZmVjdChuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0FNRSk7XHJcbmNvbnN0IGdldFZpZXcgPSBuZXcgR2VuZXJhdGVWaWV3KCdnZW5lcmFsJyk7XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuUG9rZW1vbkdldCA9IHZvaWQgMDtcclxuY29uc3QgbmF2aWdhdGlvbl8xID0gcmVxdWlyZShcIi4vbmF2aWdhdGlvblwiKTtcclxuY29uc3QgZ2VuZXJhdGVUb0RPTV8xID0gcmVxdWlyZShcIi4vZ2VuZXJhdGVUb0RPTVwiKTtcclxuY2xhc3MgUG9rZW1vbkdldCB7XHJcbiAgICBjb25zdHJ1Y3Rvcih0eXBlT2ZTb3J0LCBmcm9tLCBob3dNYW55KSB7XHJcbiAgICAgICAgLy8gZ2V0R2VuZXJhbEZ1bmMgPSAoQVBJOnN0cmluZywgdHlwZU9mU29ydDpzdHJpbmcpID0+e1xyXG4gICAgICAgIC8vICAgICBmZXRjaChBUEkpXHJcbiAgICAgICAgLy8gICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAvLyAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgLy8gICAgICAgICBkYXRhLnJlc3VsdHMuZm9yRWFjaCgocG9rZW1vbjpFYWNoUmVzdWx0KT0+e1xyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICBmZXRjaChwb2tlbW9uLnVybClcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIC50aGVuKGVhY2hQb2tlID0+IHtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWxsUG9rZW1vbi5wdXNoKGVhY2hQb2tlKTtcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIEdlbmVyYXRlVmlldy5zb3J0RGF0YSh0eXBlT2ZTb3J0LCBlYWNoUG9rZSk7XHJcbiAgICAgICAgLy8gICAgICAgICAgICAgICAgIH0gKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICAuY2F0Y2goKGVycik9PntcclxuICAgICAgICAvLyAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiRVJST1JcIiwgZXJyKVxyXG4gICAgICAgIC8vICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgIC8vICAgICAgICAgfSlcclxuICAgICAgICAvLyAgICAgfSlcclxuICAgICAgICAvLyB9XHJcbiAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmMgPSAoQVBJLCBBUElUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGZldGNoKEFQSSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgZGF0YS5yZXN1bHRzLmZvckVhY2goKHR5cGUsIGluZGV4KSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKEFQSVR5cGUgPT09IG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZVR5cGVUb0RPTS5nZW5lcmF0ZVR5cGVzVG9ET00odHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFQSVR5cGUgPT09IG5hdmlnYXRpb25fMS5NZW51SXRlbS5DT0xPUikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBnZW5lcmF0ZVRvRE9NXzEuR2VuZXJhdGVDb2xvclRvRE9NLmdlbmVyYXRlQ29sb3JzVG9ET00odHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGVsc2UgaWYgKEFQSVR5cGUgPT09IG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGdlbmVyYXRlVG9ET01fMS5HZW5lcmF0ZUdlbmVyYWxUb0RPTS5nZW5lcmF0ZUdlbmVyYWxUb0RPTSh0eXBlLCBpbmRleCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKGVycikgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJFUlJPUlwiLCBlcnIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHlwZUFQSSA9IGBodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3R5cGUvYDtcclxuICAgICAgICB0aGlzLmdlbmVyYWxBUEkgPSBgaHR0cHM6Ly9wb2tlYXBpLmNvL2FwaS92Mi9wb2tlbW9uLz9vZmZzZXQ9JHtmcm9tfSZsaW1pdD0ke2hvd01hbnl9YDtcclxuICAgICAgICB0aGlzLmNvbG9yQVBJID0gYGh0dHBzOi8vcG9rZWFwaS5jby9hcGkvdjIvcG9rZW1vbi1jb2xvci9gO1xyXG4gICAgICAgIHRoaXMuYWxsUG9rZW1vbiA9IFtdO1xyXG4gICAgICAgIHN3aXRjaCAodHlwZU9mU29ydCkge1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5UWVBFOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmModGhpcy50eXBlQVBJLCBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uVFlQRSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSBuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0VORVJBTDpcclxuICAgICAgICAgICAgICAgIC8vR2V0IHBva2Vtb24gYW5kIGZldGNoIGV2ZXJ5IHNpbmdsZSB1cmwgcG9rZW1vbiwgcHVzaCBpdCB0byB0aGUgYXJyYXkgYW5kIHNlbmQgdG8gc29ydERhdGEgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIHRoaXMuZ2V0Q29sb3JPclR5cGVGdW5jKHRoaXMuZ2VuZXJhbEFQSSwgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkdFTkVSQUwpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDb2xvck9yVHlwZUZ1bmModGhpcy5jb2xvckFQSSwgbmF2aWdhdGlvbl8xLk1lbnVJdGVtLkNPTE9SKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FOlxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdldENvbG9yT3JUeXBlRnVuYyh0aGlzLmdlbmVyYWxBUEksIG5hdmlnYXRpb25fMS5NZW51SXRlbS5HRU5FUkFMKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5Qb2tlbW9uR2V0ID0gUG9rZW1vbkdldDtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5HZW5lcmF0ZUdlbmVyYWxUb0RPTSA9IGV4cG9ydHMuR2VuZXJhdGVDb2xvclRvRE9NID0gZXhwb3J0cy5HZW5lcmF0ZVR5cGVUb0RPTSA9IGV4cG9ydHMuU29ydFBva2Vtb24gPSBleHBvcnRzLkdlbmVyYXRlUG9rZW1vblRvRE9NID0gZXhwb3J0cy5wb2tlbW9uQ29sbGVjdCA9IHZvaWQgMDtcclxuY29uc3Qgc3dpdGNoVHlwZV8xID0gcmVxdWlyZShcIi4vdXRpbHMvc3dpdGNoVHlwZVwiKTtcclxuZXhwb3J0cy5wb2tlbW9uQ29sbGVjdCA9IFtdO1xyXG5jbGFzcyBHZW5lcmF0ZVBva2Vtb25Ub0RPTSB7XHJcbiAgICBjb25zdHJ1Y3RvcihhbGxQb2tlbW9uKSB7XHJcbiAgICAgICAgLy9IZXJlIGdvZXMgYmVmb3JlIHByZXBhcmVkIGFycmF5IG9mIGFsbCBwb2tlbW9ucyAocGFydCBvbmUgYnkgb25lIG5vdCBhbGwgaW4gb25lKSBET00gaXNuJ3QgY2xlYW4gaGVyZSwgc28gZXZlcnkgcGFydCBnb2VzIHRvIHRoZSBlbmQgb2YgY29udGFpbmVyXHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZVBva2Vtb25JbkRPTSA9IChhbGxQb2tlbW9uKSA9PiB7XHJcbiAgICAgICAgICAgIGFsbFBva2Vtb24uZm9yRWFjaCgocG9rZW1vbiwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgIHZhciBfYSwgX2IsIF9jO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmV3Q2FyZCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vbklkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vbk5hbWUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uSW1nID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW1nJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlQ29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBuZXdDYXJkLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicG9rZW1vbl9fY2FyZFwiKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25OYW1lLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIFwicG9rZW1vbl9fbmFtZVwiKTtcclxuICAgICAgICAgICAgICAgIHBva2Vtb25OYW1lLnRleHRDb250ZW50ID0gcG9rZW1vbi5uYW1lO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZChwb2tlbW9uTmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uSWQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgJ3Bva2Vtb25fX2lkJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uSW1nVXJsID0gKF9iID0gKF9hID0gcG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnNwcml0ZXMpID09PSBudWxsIHx8IF9hID09PSB2b2lkIDAgPyB2b2lkIDAgOiBfYS5vdGhlclsnb2ZmaWNpYWwtYXJ0d29yayddKSA9PT0gbnVsbCB8fCBfYiA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2IuZnJvbnRfZGVmYXVsdDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uSW1nVXJsICE9PSBudWxsICYmIHBva2Vtb25JbWdVcmwgIT09IHZvaWQgMCA/IHBva2Vtb25JbWdVcmwgOiBmYWxzZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JbWcuc2V0QXR0cmlidXRlKFwic3JjXCIsIGAke3Bva2Vtb25JbWdVcmx9YCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX2ltZ1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcImxvYWRpbmdcIiwgXCJsYXp5XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbkltZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uSW1nLnNldEF0dHJpYnV0ZShcInNyY1wiLCAnL2ltYWdlcy9xdWVzdGlvbk1hcmsuc3ZnJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9rZW1vbkltZy5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBcInBva2Vtb25fX3F1ZXN0aW9uTWFya1wiKTtcclxuICAgICAgICAgICAgICAgICAgICBuZXdDYXJkLmFwcGVuZENoaWxkKHBva2Vtb25JbWcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy9BZGQgSUQgb2YgcG9rZW1vbiB0byBldmVyeSBjb250YWluZXIgaW50byBjYXJkXHJcbiAgICAgICAgICAgICAgICBpZiAocG9rZW1vbi5pZCA8IDEwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjMDAke3Bva2Vtb24uaWR9YDtcclxuICAgICAgICAgICAgICAgIGlmIChwb2tlbW9uLmlkID49IDEwICYmIGluZGV4IDwgMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjMCR7cG9rZW1vbi5pZH1gO1xyXG4gICAgICAgICAgICAgICAgaWYgKHBva2Vtb24uaWQgPj0gMTAwKVxyXG4gICAgICAgICAgICAgICAgICAgIHBva2Vtb25JZC50ZXh0Q29udGVudCA9IGAjJHtwb2tlbW9uLmlkfWA7XHJcbiAgICAgICAgICAgICAgICAvL0FkZCB0eXBlIG9yIHR5cGVzIG9mIHBva2Vtb24gdG8gZXZlcnkgY29udGFpbmVyIGludG8gY2FyZFxyXG4gICAgICAgICAgICAgICAgKF9jID0gcG9rZW1vbiA9PT0gbnVsbCB8fCBwb2tlbW9uID09PSB2b2lkIDAgPyB2b2lkIDAgOiBwb2tlbW9uLnR5cGVzKSA9PT0gbnVsbCB8fCBfYyA9PT0gdm9pZCAwID8gdm9pZCAwIDogX2MuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcG9rZW1vblR5cGUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwicFwiKTtcclxuICAgICAgICAgICAgICAgICAgICBwb2tlbW9uVHlwZS50ZXh0Q29udGVudCA9IGAke2VsZS50eXBlLm5hbWV9YDtcclxuICAgICAgICAgICAgICAgICAgICBzd2l0Y2hUeXBlXzEuc3dpdGNoRm9yUG9rZW1vblR5cGVGdW5jKGVsZSwgcG9rZW1vblR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHR5cGVDb250YWluZXIuYXBwZW5kQ2hpbGQocG9rZW1vblR5cGUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAvL0dldCBldmVyeSBvZiB0aGVzZSBjcmVhdGVkIGVsZW1lbnQgYW5kIGFkZCBpdCBpbnRvIG5ld0NhcmQgYW5kIG5leHQgLSBuZXdDYXJkIHRvIHRoZSBlbmQgb2YgcG9rZW1vblNlY3Rpb25cclxuICAgICAgICAgICAgICAgIHR5cGVDb250YWluZXIuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgXCJwb2tlbW9uX190eXBlQ29udGFpbmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgbmV3Q2FyZC5hcHBlbmRDaGlsZCh0eXBlQ29udGFpbmVyKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuYXBwZW5kQ2hpbGQocG9rZW1vbklkKTtcclxuICAgICAgICAgICAgICAgIG5ld0NhcmQuc2V0QXR0cmlidXRlKCdpZCcsIGAke3Bva2Vtb24uaWR9YCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBwb2tlbW9uU2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wb2tlbW9uJyk7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbnNlcnRBZGphY2VudEVsZW1lbnQoJ2JlZm9yZWVuZCcsIG5ld0NhcmQpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVQb2tlbW9uSW5ET00oYWxsUG9rZW1vbik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVBva2Vtb25Ub0RPTSA9IEdlbmVyYXRlUG9rZW1vblRvRE9NO1xyXG5jbGFzcyBTb3J0UG9rZW1vbiB7XHJcbn1cclxuZXhwb3J0cy5Tb3J0UG9rZW1vbiA9IFNvcnRQb2tlbW9uO1xyXG5Tb3J0UG9rZW1vbi5zb3J0QWxsUG9rZW1vbiA9IChlYWNoUG9rZSkgPT4ge1xyXG4gICAgZXhwb3J0cy5wb2tlbW9uQ29sbGVjdC5wdXNoKGVhY2hQb2tlKTtcclxuICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3Quc29ydChmdW5jdGlvbiAoYSwgYikgeyByZXR1cm4gYS5pZCAtIGIuaWQ7IH0pO1xyXG59O1xyXG5jbGFzcyBHZW5lcmF0ZVR5cGVUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZVR5cGVUb0RPTSA9IEdlbmVyYXRlVHlwZVRvRE9NO1xyXG5HZW5lcmF0ZVR5cGVUb0RPTS5nZW5lcmF0ZVR5cGVzVG9ET00gPSAodHlwZSkgPT4ge1xyXG4gICAgaWYgKCh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgJiYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS5uYW1lKSAhPT0gJ3Vua25vd24nICYmICh0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZSkgIT09ICdzaGFkb3cnKSB7XHJcbiAgICAgICAgY29uc3Qgc29ydFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgY29uc3QgdHlwZUVsZW1lbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGBzb3J0VHlwZV9fJHt0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZX0gc29ydFR5cGVfX3R5cGVgKTtcclxuICAgICAgICB0eXBlRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2Vtb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uXCIpO1xyXG4gICAgICAgICAgICBzd2l0Y2hUeXBlXzEuc3dpdGNoVHlwZUZvckNvdmVyRnVuYyh0eXBlKTtcclxuICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCJcIjtcclxuICAgICAgICAgICAgZmV0Y2godHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLnVybClcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wb2tlbW9uICYmIEFycmF5LmlzQXJyYXkoZGF0YS5wb2tlbW9uKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG9uZVR5cGVQb2tlbW9uID0gWy4uLmRhdGEucG9rZW1vbl07XHJcbiAgICAgICAgICAgICAgICAgICAgb25lVHlwZVBva2Vtb24uZm9yRWFjaCgoZWxlLCBpbmRleCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChlbGUucG9rZW1vbi51cmwpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAudGhlbihlYWNoUG9rZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBTb3J0UG9rZW1vbi5zb3J0QWxsUG9rZW1vbihlYWNoUG9rZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAob25lVHlwZVBva2Vtb24ubGVuZ3RoID09PSBpbmRleCArIDEpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBuZXcgR2VuZXJhdGVQb2tlbW9uVG9ET00oZXhwb3J0cy5wb2tlbW9uQ29sbGVjdCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXhwb3J0cy5wb2tlbW9uQ29sbGVjdC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdHlwZUVsZW1lbnQudGV4dENvbnRlbnQgPSB0eXBlID09PSBudWxsIHx8IHR5cGUgPT09IHZvaWQgMCA/IHZvaWQgMCA6IHR5cGUubmFtZTtcclxuICAgICAgICBzb3J0U2VjdGlvbi5hcHBlbmRDaGlsZCh0eXBlRWxlbWVudCk7XHJcbiAgICB9XHJcbn07XHJcbmNsYXNzIEdlbmVyYXRlQ29sb3JUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZUNvbG9yVG9ET00gPSBHZW5lcmF0ZUNvbG9yVG9ET007XHJcbkdlbmVyYXRlQ29sb3JUb0RPTS5nZW5lcmF0ZUNvbG9yc1RvRE9NID0gKGNvbG9yKSA9PiB7XHJcbiAgICBpZiAoY29sb3IgPT09IG51bGwgfHwgY29sb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbG9yLm5hbWUpIHtcclxuICAgICAgICBjb25zdCBzb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICBjb25zdCB0eXBlRWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7XHJcbiAgICAgICAgdHlwZUVsZW1lbnQuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYHNvcnRUeXBlX18ke2NvbG9yID09PSBudWxsIHx8IGNvbG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2xvci5uYW1lfSBzb3J0VHlwZV9fdHlwZWApO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgY29uc3QgcG9rZW1vblNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2Vtb25cIik7XHJcbiAgICAgICAgICAgIHBva2Vtb25TZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGZldGNoKGNvbG9yID09PSBudWxsIHx8IGNvbG9yID09PSB2b2lkIDAgPyB2b2lkIDAgOiBjb2xvci51cmwpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucG9rZW1vbl9zcGVjaWVzICYmIEFycmF5LmlzQXJyYXkoZGF0YS5wb2tlbW9uX3NwZWNpZXMpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgb25lVHlwZVBva2Vtb24gPSBbLi4uZGF0YS5wb2tlbW9uX3NwZWNpZXNdO1xyXG4gICAgICAgICAgICAgICAgICAgIG9uZVR5cGVQb2tlbW9uLmZvckVhY2goKGVsZSwgaW5kZXgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgbW9kaWZpY2F0ZVVSTCA9IEdlbmVyYXRlQ29sb3JUb0RPTS5tb2RpZmljYXRlVXJsKGVsZS51cmwpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmZXRjaChtb2RpZmljYXRlVVJMKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4gcmVzcG9uc2UuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLnRoZW4oZWFjaFBva2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgU29ydFBva2Vtb24uc29ydEFsbFBva2Vtb24oZWFjaFBva2UpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG9uZVR5cGVQb2tlbW9uLmxlbmd0aCA9PT0gaW5kZXggKyAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbmV3IEdlbmVyYXRlUG9rZW1vblRvRE9NKGV4cG9ydHMucG9rZW1vbkNvbGxlY3QpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV4cG9ydHMucG9rZW1vbkNvbGxlY3QubGVuZ3RoID0gMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHR5cGVFbGVtZW50LnRleHRDb250ZW50ID0gY29sb3IgPT09IG51bGwgfHwgY29sb3IgPT09IHZvaWQgMCA/IHZvaWQgMCA6IGNvbG9yLm5hbWU7XHJcbiAgICAgICAgc29ydFNlY3Rpb24uYXBwZW5kQ2hpbGQodHlwZUVsZW1lbnQpO1xyXG4gICAgfVxyXG59O1xyXG5HZW5lcmF0ZUNvbG9yVG9ET00ubW9kaWZpY2F0ZVVybCA9ICh1cmwpID0+IHtcclxuICAgIGNvbnN0IHNwbGl0VXJsID0gdXJsLnNwbGl0KFwiL1wiKTtcclxuICAgIHJldHVybiBgJHtzcGxpdFVybFswXX0vLyR7c3BsaXRVcmxbMl19LyR7c3BsaXRVcmxbM119LyR7c3BsaXRVcmxbNF19L3Bva2Vtb24vJHtzcGxpdFVybFs2XX1gO1xyXG59O1xyXG5jbGFzcyBHZW5lcmF0ZUdlbmVyYWxUb0RPTSB7XHJcbn1cclxuZXhwb3J0cy5HZW5lcmF0ZUdlbmVyYWxUb0RPTSA9IEdlbmVyYXRlR2VuZXJhbFRvRE9NO1xyXG5HZW5lcmF0ZUdlbmVyYWxUb0RPTS5nZW5lcmF0ZUdlbmVyYWxUb0RPTSA9ICh0eXBlLCBpbmRleCkgPT4ge1xyXG4gICAgaWYgKHR5cGUgPT09IG51bGwgfHwgdHlwZSA9PT0gdm9pZCAwID8gdm9pZCAwIDogdHlwZS5uYW1lKSB7XHJcbiAgICAgICAgZmV0Y2godHlwZSA9PT0gbnVsbCB8fCB0eXBlID09PSB2b2lkIDAgPyB2b2lkIDAgOiB0eXBlLnVybClcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGVhY2hQb2tlID0+IHtcclxuICAgICAgICAgICAgU29ydFBva2Vtb24uc29ydEFsbFBva2Vtb24oZWFjaFBva2UpO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT09IDExKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzb3J0U2VjdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc29ydFR5cGVfX2NvbnRhaW5lclwiKTtcclxuICAgICAgICAgICAgICAgIGlmIChzb3J0U2VjdGlvbi5jaGlsZEVsZW1lbnRDb3VudCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlYXJjaFRlbXBsYXRlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2hUZW1wbGF0ZVwiKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBpbXBvcnRlZE5vZGUgPSBkb2N1bWVudC5pbXBvcnROb2RlKHNlYXJjaFRlbXBsYXRlLmNvbnRlbnQsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHB1dFRoaXNFbGVtZW50ID0gaW1wb3J0ZWROb2RlLmZpcnN0RWxlbWVudENoaWxkO1xyXG4gICAgICAgICAgICAgICAgICAgIHNvcnRTZWN0aW9uLmluc2VydEFkamFjZW50RWxlbWVudChcImFmdGVyYmVnaW5cIiwgcHV0VGhpc0VsZW1lbnQpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbmV3IEdlbmVyYXRlUG9rZW1vblRvRE9NKGV4cG9ydHMucG9rZW1vbkNvbGxlY3QpO1xyXG4gICAgICAgICAgICAgICAgZXhwb3J0cy5wb2tlbW9uQ29sbGVjdC5sZW5ndGggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn07XHJcbiIsIlwidXNlIHN0cmljdFwiO1xyXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHsgdmFsdWU6IHRydWUgfSk7XHJcbmV4cG9ydHMuTWVudUl0ZW1FZmZlY3QgPSBleHBvcnRzLk1lbnVJdGVtID0gdm9pZCAwO1xyXG5jb25zdCBhcHBfMSA9IHJlcXVpcmUoXCIuL2FwcFwiKTtcclxuY29uc3QgZ2VuZXJhdGVUb0RPTV8xID0gcmVxdWlyZShcIi4vZ2VuZXJhdGVUb0RPTVwiKTtcclxudmFyIE1lbnVJdGVtO1xyXG4oZnVuY3Rpb24gKE1lbnVJdGVtKSB7XHJcbiAgICBNZW51SXRlbVtcIlRZUEVcIl0gPSBcInR5cGVcIjtcclxuICAgIE1lbnVJdGVtW1wiR0VORVJBTFwiXSA9IFwiZ2VuZXJhbFwiO1xyXG4gICAgTWVudUl0ZW1bXCJDT0xPUlwiXSA9IFwiY29sb3JcIjtcclxuICAgIE1lbnVJdGVtW1wiR0FNRVwiXSA9IFwiZ2FtZVwiO1xyXG59KShNZW51SXRlbSA9IGV4cG9ydHMuTWVudUl0ZW0gfHwgKGV4cG9ydHMuTWVudUl0ZW0gPSB7fSkpO1xyXG47XHJcbmNsYXNzIE1lbnVJdGVtRWZmZWN0IHtcclxuICAgIGNvbnN0cnVjdG9yKGVsZW1lbnQpIHtcclxuICAgICAgICB0aGlzLmNsZWFyUG9rZW1vblNlY3Rpb25CZWZvcmVHZW5lcmF0ZSA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2Vtb25TZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlbW9uXCIpO1xyXG4gICAgICAgICAgICBjb25zdCB0eXBlc1NlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNvcnRUeXBlX19jb250YWluZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50ID09PSBNZW51SXRlbS5HRU5FUkFMKSB7XHJcbiAgICAgICAgICAgICAgICBwb2tlbW9uU2VjdGlvbi5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgcG9rZW1vblNlY3Rpb24uaW5uZXJIVE1MID0gXCI8cCBjbGFzcz0ncG9rZW1vbl9fZHVtbXlUZXh0Jz5UaGVyZSBpcyBub3RoaW5nIHRvIGRpc3BsYXkgZm9yIHRoZSBtb21lbnQ8L3A+XCI7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdHlwZXNTZWN0aW9uLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgICAgICAgICAgIGFwcF8xLnJhbmdlT2ZMb2FkaW5nLmZyb20gPSAwO1xyXG4gICAgICAgICAgICBnZW5lcmF0ZVRvRE9NXzEucG9rZW1vbkNvbGxlY3QubGVuZ3RoID0gMDtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuY2xpY2tFZmZlY3QgPSAoZWxlbWVudCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gWy4uLmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoYC5uYXZfX29wdGlvbmApXTtcclxuICAgICAgICAgICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdicpO1xyXG4gICAgICAgICAgICBjb25zdCBuYXZXcmFwcGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5uYXZXcmFwcGVyXCIpO1xyXG4gICAgICAgICAgICBjb25zdCBuYXZMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fbGluZScpO1xyXG4gICAgICAgICAgICBjb25zdCBuYXZDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdklubmVyQ2lyY2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNpcmNsZV9faW5uZXJDaXJjbGUnKTtcclxuICAgICAgICAgICAgY29uc3QgY292ZXJNb3VzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb3Zlck1vdXNlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBva2VkZXhTZWN0aW9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wb2tlZGV4XCIpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3ZlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXJcIik7XHJcbiAgICAgICAgICAgIGlmIChjb3Zlck1vdXNlLmlkICE9PSAnbWluaW1hbGl6ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXZFbGVtZW50cyhlbGVtZW50LCBuYXZFbGVtZW50LCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIHBva2VkZXhTZWN0aW9uLCBjb3Zlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dOYXZFbGVtZW50cyhwb2tlZGV4U2VjdGlvbiwgbmF2V3JhcHBlciwgY292ZXJNb3VzZSwgbmF2LCBuYXZDaXJjbGUsIG5hdklubmVyQ2lyY2xlLCBuYXZMaW5lLCBuYXZFbGVtZW50LCBjb3Zlcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGlkZU5hdkVsZW1lbnRzID0gKGVsZW1lbnQsIG5hdkVsZW1lbnQsIG5hdiwgbmF2Q2lyY2xlLCBuYXZJbm5lckNpcmNsZSwgbmF2TGluZSwgbmF2V3JhcHBlciwgY292ZXJNb3VzZSwgcG9rZWRleFNlY3Rpb24sIGNvdmVyKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcIm5hdl9fb3B0aW9uLS1oaWRlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZChcIm5hdi0taGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LmFkZChcIm5hdl9fbGluZS0taGlkZVwiKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXZXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ25hdldyYXBwZXItLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIGNvdmVyTW91c2UuY2xhc3NMaXN0LmFkZCgnY292ZXJNb3VzZS0taGlkZScpO1xyXG4gICAgICAgICAgICAgICAgcG9rZWRleFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncG9rZWRleC0tc2hvd0l0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb3Zlck1vdXNlLmlkID0gJ21pbmltYWxpemVkJztcclxuICAgICAgICAgICAgICAgIGNvdmVyLmNsYXNzTGlzdC5hZGQoJ2NvdmVyLS1sb3dlclBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIH0sIDc1MCk7XHJcbiAgICAgICAgICAgIC8vRG8gdGhpcyB3aXRoIGV2ZXJ5IGNsaWNrIGluIG5hdiBlbGVtZW50XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJQb2tlbW9uU2VjdGlvbkJlZm9yZUdlbmVyYXRlKGVsZW1lbnQpO1xyXG4gICAgICAgICAgICBjb25zdCBsb2FkTW9yZUJ1dHRvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucG9rZW1vblNlY3Rpb25fX2xvYWRNb3JlXCIpO1xyXG4gICAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gTWVudUl0ZW0uR0VORVJBTCkge1xyXG4gICAgICAgICAgICAgICAgbG9hZE1vcmVCdXR0b24uY2xhc3NMaXN0LnJlbW92ZShcInBva2Vtb25TZWN0aW9uX19sb2FkTW9yZS0tZGlzYWJsZVwiKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGxvYWRNb3JlQnV0dG9uLmNsYXNzTGlzdC5hZGQoXCJwb2tlbW9uU2VjdGlvbl9fbG9hZE1vcmUtLWRpc2FibGVcIik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgYXBwXzEuR2VuZXJhdGVWaWV3LmluaXRpYWxHZW5lcmF0ZShlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2hvd05hdkVsZW1lbnRzID0gKHBva2VkZXhTZWN0aW9uLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdkVsZW1lbnQsIGNvdmVyKSA9PiB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2dhbWUnKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXZfX2dhbWUtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19nZW5lcmFsJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19nZW5lcmFsLS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fdHlwZScpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fdHlwZS0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2NvbG9yJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19jb2xvci0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIHBva2VkZXhTZWN0aW9uLmNsYXNzTGlzdC5yZW1vdmUoJ3Bva2VkZXgtLXNob3dJdCcpO1xyXG4gICAgICAgICAgICBuYXZXcmFwcGVyLmNsYXNzTGlzdC5yZW1vdmUoJ25hdldyYXBwZXItLWhpZGUnKTtcclxuICAgICAgICAgICAgY292ZXJNb3VzZS5jbGFzc0xpc3QucmVtb3ZlKCdjb3Zlck1vdXNlLS1oaWRlJyk7XHJcbiAgICAgICAgICAgIGNvdmVyLmNsYXNzTGlzdC5yZW1vdmUoJ2NvdmVyLS1sb3dlclBvc2l0aW9uJyk7XHJcbiAgICAgICAgICAgIGNvdmVyLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IFwicmdiYSgwLDAsMCwwLjEpXCI7XHJcbiAgICAgICAgICAgIGNvdmVyTW91c2UuaWQgPSBcIlwiO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKFwibmF2LS1oaWRlXCIsICduYXYtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2Q2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZS0taGlkZScpO1xyXG4gICAgICAgICAgICAgICAgbmF2SW5uZXJDaXJjbGUuY2xhc3NMaXN0LnJlbW92ZSgnY2lyY2xlX19pbm5lckNpcmNsZS0taGlkZScsICdjaXJjbGVfX2lubmVyQ2lyY2xlLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fbGluZS0taGlkZVwiLCAnbmF2X19saW5lLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmZvckVhY2goKGVsZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsZS5jbGFzc0xpc3QucmVtb3ZlKFwibmF2X19vcHRpb24tLWhpZGVcIik7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgNzUwKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaG92ZXJFZmZlY3QgPSAoZWxlbWVudCwgZXZlbnRUeXBlKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAubmF2X18ke2VsZW1lbnR9YCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvdmVyTW91c2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY292ZXJNb3VzZScpO1xyXG4gICAgICAgICAgICBpZiAoY292ZXJNb3VzZS5pZCAhPT0gJ21pbmltYWxpemVkJykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ292ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2RWxlbWVudC5jbGFzc0xpc3QuYWRkKGBuYXZfXyR7ZWxlbWVudH0tLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2xlYXZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShgbmF2X18ke2VsZW1lbnR9LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXYnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hdkxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saW5lJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZJbm5lckNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGVfX2lubmVyQ2lyY2xlJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnb3ZlcicpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZChgbmF2LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5hZGQoJ25hdl9fbGluZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2SW5uZXJDaXJjbGUuY2xhc3NMaXN0LmFkZCgnY2lyY2xlX19pbm5lckNpcmNsZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAoZXZlbnRUeXBlID09PSAnbGVhdmUnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5yZW1vdmUoYG5hdi0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGluZS5jbGFzc0xpc3QucmVtb3ZlKCduYXZfX2xpbmUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICBjb25zdCBjb3ZlckVsZW1lbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuY292ZXJNb3VzZV9fJHtlbGVtZW50fWApO1xyXG4gICAgICAgIGNvdmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCAoKSA9PiB0aGlzLmhvdmVyRWZmZWN0KGVsZW1lbnQsICdvdmVyJykpO1xyXG4gICAgICAgIGNvdmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgKCkgPT4gdGhpcy5ob3ZlckVmZmVjdChlbGVtZW50LCAnbGVhdmUnKSk7XHJcbiAgICAgICAgY292ZXJFbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5jbGlja0VmZmVjdChlbGVtZW50KSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5NZW51SXRlbUVmZmVjdCA9IE1lbnVJdGVtRWZmZWN0O1xyXG4iLCJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLnN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyA9IGV4cG9ydHMuc3dpdGNoVHlwZUZvckNvdmVyRnVuYyA9IHZvaWQgMDtcclxudmFyIFR5cGVPZlBva2Vtb247XHJcbihmdW5jdGlvbiAoVHlwZU9mUG9rZW1vbikge1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIkZJUkVcIl0gPSBcImZpcmVcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJXQVRFUlwiXSA9IFwid2F0ZXJcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJHUkFTU1wiXSA9IFwiZ3Jhc3NcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJQT0lTT05cIl0gPSBcInBvaXNvblwiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIkJVR1wiXSA9IFwiYnVnXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiRUxFQ1RSSUNcIl0gPSBcImVsZWN0cmljXCI7XHJcbiAgICBUeXBlT2ZQb2tlbW9uW1wiTk9STUFMXCJdID0gXCJub3JtYWxcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJGTFlJTkdcIl0gPSBcImZseWluZ1wiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIlJPQ0tcIl0gPSBcInJvY2tcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJHUk9VTkRcIl0gPSBcImdyb3VuZFwiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIlBTWUNISUNcIl0gPSBcInBzeWNoaWNcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJGSUdIVElOR1wiXSA9IFwiZmlnaHRpbmdcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJEUkFHT05cIl0gPSBcImRyYWdvblwiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIkRBUktcIl0gPSBcImRhcmtcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJGQUlSWVwiXSA9IFwiZmFpcnlcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJHSE9TVFwiXSA9IFwiZ2hvc3RcIjtcclxuICAgIFR5cGVPZlBva2Vtb25bXCJJQ0VcIl0gPSBcImljZVwiO1xyXG4gICAgVHlwZU9mUG9rZW1vbltcIlNURUVMXCJdID0gXCJzdGVlbFwiO1xyXG59KShUeXBlT2ZQb2tlbW9uIHx8IChUeXBlT2ZQb2tlbW9uID0ge30pKTtcclxuO1xyXG5mdW5jdGlvbiBzd2l0Y2hUeXBlRm9yQ292ZXJGdW5jKHR5cGUpIHtcclxuICAgIGNvbnN0IGNvdmVyRWxlbWVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY292ZXJcIik7XHJcbiAgICBjb25zdCBvcGFjaXR5TGV2ZWwgPSAnMC4yNSc7XHJcbiAgICBzd2l0Y2ggKHR5cGUubmFtZSkge1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUkFTUzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDE1NSwyMDQsODAsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5XQVRFUjpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDY5LDE0NiwxOTYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GSVJFOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjUzLDEyNSwzNiwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkJVRzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDExNSwxNjAsNjQsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5QT0lTT046XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiKDE4NiwxMjgsMjAyLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRUxFQ1RSSUM6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgyMzgsMjEzLDUzLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uTk9STUFMOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMTY1LDE3MywxNzYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GTFlJTkc6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgxODEsMjIyLDIzMywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLlJPQ0s6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg4OCw4Myw3OSwke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkdST1VORDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDE3MSwxNTIsNjYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5QU1lDSElDOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMjQ0LDEwMywxODYsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GSUdIVElORzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDIxMywxMDMsMzUsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5EUkFHT046XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSg4MywxNjQsMjA3LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uREFSSzpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDExMiwxMTIsMTEyLCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRkFJUlk6XHJcbiAgICAgICAgICAgIGNvdmVyRWxlbWVudC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBgcmdiYSgyNTMsMTg1LDIzMywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkdIT1NUOlxyXG4gICAgICAgICAgICBjb3ZlckVsZW1lbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gYHJnYmEoMTIzLDk4LDE2Mywke29wYWNpdHlMZXZlbH0pYDtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLklDRTpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDgxLDE5NiwyMzEsJHtvcGFjaXR5TGV2ZWx9KWA7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5TVEVFTDpcclxuICAgICAgICAgICAgY292ZXJFbGVtZW50LnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGByZ2JhKDE1OCwxODMsMTg0LCR7b3BhY2l0eUxldmVsfSlgO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0cy5zd2l0Y2hUeXBlRm9yQ292ZXJGdW5jID0gc3dpdGNoVHlwZUZvckNvdmVyRnVuYztcclxuZnVuY3Rpb24gc3dpdGNoRm9yUG9rZW1vblR5cGVGdW5jKGVsZSwgcG9rZW1vblR5cGUpIHtcclxuICAgIHN3aXRjaCAoZWxlLnR5cGUubmFtZSkge1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5HUkFTUzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5HUkFTU30gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uV0FURVI6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uV0FURVJ9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkZJUkU6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRklSRX0gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uQlVHOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkJVR30gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUE9JU09OOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlBPSVNPTn0gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRUxFQ1RSSUM6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uRUxFQ1RSSUN9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLk5PUk1BTDpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5OT1JNQUx9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLkZMWUlORzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5GTFlJTkd9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLlJPQ0s6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uUk9DS30gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR1JPVU5EOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkdST1VORH0gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uUFNZQ0hJQzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5QU1lDSElDfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GSUdIVElORzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5GSUdIVElOR30gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uRFJBR09OOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLkRSQUdPTn0gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uREFSSzpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5EQVJLfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGNhc2UgVHlwZU9mUG9rZW1vbi5GQUlSWTpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5GQUlSWX0gcG9rZW1vbl9fdHlwZWApO1xyXG4gICAgICAgICAgICBicmVhaztcclxuICAgICAgICBjYXNlIFR5cGVPZlBva2Vtb24uR0hPU1Q6XHJcbiAgICAgICAgICAgIHBva2Vtb25UeXBlLnNldEF0dHJpYnV0ZShcImNsYXNzXCIsIGAke1R5cGVPZlBva2Vtb24uR0hPU1R9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLklDRTpcclxuICAgICAgICAgICAgcG9rZW1vblR5cGUuc2V0QXR0cmlidXRlKFwiY2xhc3NcIiwgYCR7VHlwZU9mUG9rZW1vbi5JQ0V9IHBva2Vtb25fX3R5cGVgKTtcclxuICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgY2FzZSBUeXBlT2ZQb2tlbW9uLlNURUVMOlxyXG4gICAgICAgICAgICBwb2tlbW9uVHlwZS5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBgJHtUeXBlT2ZQb2tlbW9uLlNURUVMfSBwb2tlbW9uX190eXBlYCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgIH1cclxufVxyXG5leHBvcnRzLnN3aXRjaEZvclBva2Vtb25UeXBlRnVuYyA9IHN3aXRjaEZvclBva2Vtb25UeXBlRnVuYztcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9
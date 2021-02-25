/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.ts":
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.PokemonGet = void 0;
const navigation_1 = __webpack_require__(/*! ./navigation */ "./src/navigation.ts");
class PokemonGet {
    constructor(typeOfSort) {
        this.fetchInit = () => {
            fetch(this.generalAPI)
                .then(response => response.json());
        };
        this.generalAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
        this.fetchInit();
        console.log(typeOfSort);
    }
}
exports.PokemonGet = PokemonGet;
const menuItemOne = new navigation_1.MenuItemEffect(navigation_1.MenuItem.TYPE);
const menuItemTwo = new navigation_1.MenuItemEffect(navigation_1.MenuItem.GENERAL);
const menuItemThree = new navigation_1.MenuItemEffect(navigation_1.MenuItem.REGION);
const menuItemFour = new navigation_1.MenuItemEffect(navigation_1.MenuItem.GAME);


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
    MenuItem["REGION"] = "region";
    MenuItem["GAME"] = "game";
})(MenuItem = exports.MenuItem || (exports.MenuItem = {}));
;
class MenuItemEffect {
    constructor(element) {
        this.clickEffect = (element) => {
            const navElement = [...document.querySelectorAll(`.nav__option`)];
            const nav = document.querySelector('.nav');
            const navWrapper = document.querySelector(".navWrapper");
            const navLine = document.querySelector('.nav__line');
            const navCircle = document.querySelector('.circle');
            const navInnerCircle = document.querySelector('.circle__innerCircle');
            const coverMouse = document.querySelector('.coverMouse');
            const pokedexSection = document.querySelector(".pokedex");
            if (coverMouse.id !== 'minimalized') {
                this.hideNavElements(element, navElement, nav, navCircle, navInnerCircle, navLine, navWrapper, coverMouse, pokedexSection);
            }
            else {
                this.showNavElements(pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement);
            }
        };
        this.hideNavElements = (element, navElement, nav, navCircle, navInnerCircle, navLine, navWrapper, coverMouse, pokedexSection) => {
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
            }, 750);
            const pokemonGetSort = new app_1.PokemonGet(element);
        };
        this.showNavElements = (pokedexSection, navWrapper, coverMouse, nav, navCircle, navInnerCircle, navLine, navElement) => {
            document.querySelector('.nav__game').classList.remove(`nav__game--active`);
            document.querySelector('.nav__general').classList.remove(`nav__general--active`);
            document.querySelector('.nav__type').classList.remove(`nav__type--active`);
            document.querySelector('.nav__region').classList.remove(`nav__region--active`);
            pokedexSection.classList.remove('pokedex--showIt');
            navWrapper.classList.remove('navWrapper--hide');
            coverMouse.classList.remove('coverMouse--hide');
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL2FwcC50cyIsIndlYnBhY2s6Ly9wb2tlZGV4Ly4vc3JjL25hdmlnYXRpb24udHMiLCJ3ZWJwYWNrOi8vcG9rZWRleC93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9wb2tlZGV4L3dlYnBhY2svc3RhcnR1cCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWE7QUFDYiw4Q0FBNkMsQ0FBQyxjQUFjLEVBQUM7QUFDN0Qsa0JBQWtCO0FBQ2xCLHFCQUFxQixtQkFBTyxDQUFDLHlDQUFjO0FBQzNDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBa0I7QUFDbEI7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDbkJhO0FBQ2IsOENBQTZDLENBQUMsY0FBYyxFQUFDO0FBQzdELHNCQUFzQixHQUFHLGdCQUFnQjtBQUN6QyxjQUFjLG1CQUFPLENBQUMsMkJBQU87QUFDN0I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyxrQ0FBa0MsZ0JBQWdCLEtBQUs7QUFDeEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixhQUFhO0FBQ2I7QUFDQTtBQUNBLCtEQUErRCxRQUFRO0FBQ3ZFO0FBQ0E7QUFDQTtBQUNBLHFEQUFxRCxRQUFRO0FBQzdEO0FBQ0E7QUFDQSx3REFBd0QsUUFBUTtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxvRUFBb0UsUUFBUTtBQUM1RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCOzs7Ozs7O1VDdEd0QjtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7OztVQ3JCQTtVQUNBO1VBQ0E7VUFDQSIsImZpbGUiOiJidW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtcclxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7IHZhbHVlOiB0cnVlIH0pO1xyXG5leHBvcnRzLlBva2Vtb25HZXQgPSB2b2lkIDA7XHJcbmNvbnN0IG5hdmlnYXRpb25fMSA9IHJlcXVpcmUoXCIuL25hdmlnYXRpb25cIik7XHJcbmNsYXNzIFBva2Vtb25HZXQge1xyXG4gICAgY29uc3RydWN0b3IodHlwZU9mU29ydCkge1xyXG4gICAgICAgIHRoaXMuZmV0Y2hJbml0ID0gKCkgPT4ge1xyXG4gICAgICAgICAgICBmZXRjaCh0aGlzLmdlbmVyYWxBUEkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiByZXNwb25zZS5qc29uKCkpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5nZW5lcmFsQVBJID0gXCJodHRwczovL3Bva2VhcGkuY28vYXBpL3YyL3Bva2Vtb24vP29mZnNldD0wJmxpbWl0PTExMThcIjtcclxuICAgICAgICB0aGlzLmZldGNoSW5pdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHR5cGVPZlNvcnQpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuUG9rZW1vbkdldCA9IFBva2Vtb25HZXQ7XHJcbmNvbnN0IG1lbnVJdGVtT25lID0gbmV3IG5hdmlnYXRpb25fMS5NZW51SXRlbUVmZmVjdChuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uVFlQRSk7XHJcbmNvbnN0IG1lbnVJdGVtVHdvID0gbmV3IG5hdmlnYXRpb25fMS5NZW51SXRlbUVmZmVjdChuYXZpZ2F0aW9uXzEuTWVudUl0ZW0uR0VORVJBTCk7XHJcbmNvbnN0IG1lbnVJdGVtVGhyZWUgPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5SRUdJT04pO1xyXG5jb25zdCBtZW51SXRlbUZvdXIgPSBuZXcgbmF2aWdhdGlvbl8xLk1lbnVJdGVtRWZmZWN0KG5hdmlnYXRpb25fMS5NZW51SXRlbS5HQU1FKTtcclxuIiwiXCJ1c2Ugc3RyaWN0XCI7XHJcbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwgeyB2YWx1ZTogdHJ1ZSB9KTtcclxuZXhwb3J0cy5NZW51SXRlbUVmZmVjdCA9IGV4cG9ydHMuTWVudUl0ZW0gPSB2b2lkIDA7XHJcbmNvbnN0IGFwcF8xID0gcmVxdWlyZShcIi4vYXBwXCIpO1xyXG52YXIgTWVudUl0ZW07XHJcbihmdW5jdGlvbiAoTWVudUl0ZW0pIHtcclxuICAgIE1lbnVJdGVtW1wiVFlQRVwiXSA9IFwidHlwZVwiO1xyXG4gICAgTWVudUl0ZW1bXCJHRU5FUkFMXCJdID0gXCJnZW5lcmFsXCI7XHJcbiAgICBNZW51SXRlbVtcIlJFR0lPTlwiXSA9IFwicmVnaW9uXCI7XHJcbiAgICBNZW51SXRlbVtcIkdBTUVcIl0gPSBcImdhbWVcIjtcclxufSkoTWVudUl0ZW0gPSBleHBvcnRzLk1lbnVJdGVtIHx8IChleHBvcnRzLk1lbnVJdGVtID0ge30pKTtcclxuO1xyXG5jbGFzcyBNZW51SXRlbUVmZmVjdCB7XHJcbiAgICBjb25zdHJ1Y3RvcihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5jbGlja0VmZmVjdCA9IChlbGVtZW50KSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkVsZW1lbnQgPSBbLi4uZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChgLm5hdl9fb3B0aW9uYCldO1xyXG4gICAgICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdldyYXBwZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm5hdldyYXBwZXJcIik7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkxpbmUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X19saW5lJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hdkNpcmNsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jaXJjbGUnKTtcclxuICAgICAgICAgICAgY29uc3QgbmF2SW5uZXJDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlX19pbm5lckNpcmNsZScpO1xyXG4gICAgICAgICAgICBjb25zdCBjb3Zlck1vdXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdmVyTW91c2UnKTtcclxuICAgICAgICAgICAgY29uc3QgcG9rZWRleFNlY3Rpb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBva2VkZXhcIik7XHJcbiAgICAgICAgICAgIGlmIChjb3Zlck1vdXNlLmlkICE9PSAnbWluaW1hbGl6ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhpZGVOYXZFbGVtZW50cyhlbGVtZW50LCBuYXZFbGVtZW50LCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIHBva2VkZXhTZWN0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd05hdkVsZW1lbnRzKHBva2VkZXhTZWN0aW9uLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdkVsZW1lbnQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhpZGVOYXZFbGVtZW50cyA9IChlbGVtZW50LCBuYXZFbGVtZW50LCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdldyYXBwZXIsIGNvdmVyTW91c2UsIHBva2VkZXhTZWN0aW9uKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdkVsZW1lbnQuZm9yRWFjaCgoZWxlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LmFkZChcIm5hdl9fb3B0aW9uLS1oaWRlXCIpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LmFkZChcIm5hdi0taGlkZVwiKTtcclxuICAgICAgICAgICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QuYWRkKCdjaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LmFkZChcIm5hdl9fbGluZS0taGlkZVwiKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXZXcmFwcGVyLmNsYXNzTGlzdC5hZGQoJ25hdldyYXBwZXItLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIGNvdmVyTW91c2UuY2xhc3NMaXN0LmFkZCgnY292ZXJNb3VzZS0taGlkZScpO1xyXG4gICAgICAgICAgICAgICAgcG9rZWRleFNlY3Rpb24uY2xhc3NMaXN0LmFkZCgncG9rZWRleC0tc2hvd0l0Jyk7XHJcbiAgICAgICAgICAgICAgICBjb3Zlck1vdXNlLmlkID0gJ21pbmltYWxpemVkJztcclxuICAgICAgICAgICAgfSwgNzUwKTtcclxuICAgICAgICAgICAgY29uc3QgcG9rZW1vbkdldFNvcnQgPSBuZXcgYXBwXzEuUG9rZW1vbkdldChlbGVtZW50KTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuc2hvd05hdkVsZW1lbnRzID0gKHBva2VkZXhTZWN0aW9uLCBuYXZXcmFwcGVyLCBjb3Zlck1vdXNlLCBuYXYsIG5hdkNpcmNsZSwgbmF2SW5uZXJDaXJjbGUsIG5hdkxpbmUsIG5hdkVsZW1lbnQpID0+IHtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fZ2FtZScpLmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fZ2FtZS0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5uYXZfX2dlbmVyYWwnKS5jbGFzc0xpc3QucmVtb3ZlKGBuYXZfX2dlbmVyYWwtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2X190eXBlJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X190eXBlLS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fcmVnaW9uJykuY2xhc3NMaXN0LnJlbW92ZShgbmF2X19yZWdpb24tLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICBwb2tlZGV4U2VjdGlvbi5jbGFzc0xpc3QucmVtb3ZlKCdwb2tlZGV4LS1zaG93SXQnKTtcclxuICAgICAgICAgICAgbmF2V3JhcHBlci5jbGFzc0xpc3QucmVtb3ZlKCduYXZXcmFwcGVyLS1oaWRlJyk7XHJcbiAgICAgICAgICAgIGNvdmVyTW91c2UuY2xhc3NMaXN0LnJlbW92ZSgnY292ZXJNb3VzZS0taGlkZScpO1xyXG4gICAgICAgICAgICBjb3Zlck1vdXNlLmlkID0gXCJcIjtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnJlbW92ZShcIm5hdi0taGlkZVwiLCAnbmF2LS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIG5hdkNpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGUtLWhpZGUnKTtcclxuICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5yZW1vdmUoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWhpZGUnLCAnY2lyY2xlX19pbm5lckNpcmNsZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICBuYXZMaW5lLmNsYXNzTGlzdC5yZW1vdmUoXCJuYXZfX2xpbmUtLWhpZGVcIiwgJ25hdl9fbGluZS0tYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbmF2RWxlbWVudC5mb3JFYWNoKChlbGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlbGUuY2xhc3NMaXN0LnJlbW92ZShcIm5hdl9fb3B0aW9uLS1oaWRlXCIpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDc1MCk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLmhvdmVyRWZmZWN0ID0gKGVsZW1lbnQsIGV2ZW50VHlwZSkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYXZFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLm5hdl9fJHtlbGVtZW50fWApO1xyXG4gICAgICAgICAgICBjb25zdCBjb3Zlck1vdXNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvdmVyTW91c2UnKTtcclxuICAgICAgICAgICAgaWYgKGNvdmVyTW91c2UuaWQgIT09ICdtaW5pbWFsaXplZCcpIHtcclxuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdvdmVyJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkVsZW1lbnQuY2xhc3NMaXN0LmFkZChgbmF2X18ke2VsZW1lbnR9LS1hY3RpdmVgKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChldmVudFR5cGUgPT09ICdsZWF2ZScpIHtcclxuICAgICAgICAgICAgICAgICAgICBuYXZFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoYG5hdl9fJHtlbGVtZW50fS0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubmF2Jyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYXZMaW5lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm5hdl9fbGluZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmF2SW5uZXJDaXJjbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY2lyY2xlX19pbm5lckNpcmNsZScpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ292ZXInKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC5hZGQoYG5hdi0tYWN0aXZlYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmF2TGluZS5jbGFzc0xpc3QuYWRkKCduYXZfX2xpbmUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdklubmVyQ2lyY2xlLmNsYXNzTGlzdC5hZGQoJ2NpcmNsZV9faW5uZXJDaXJjbGUtLWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGV2ZW50VHlwZSA9PT0gJ2xlYXZlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QucmVtb3ZlKGBuYXYtLWFjdGl2ZWApO1xyXG4gICAgICAgICAgICAgICAgICAgIG5hdkxpbmUuY2xhc3NMaXN0LnJlbW92ZSgnbmF2X19saW5lLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgICAgICBuYXZJbm5lckNpcmNsZS5jbGFzc0xpc3QucmVtb3ZlKCdjaXJjbGVfX2lubmVyQ2lyY2xlLS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgY29uc3QgY292ZXJFbGVtZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLmNvdmVyTW91c2VfXyR7ZWxlbWVudH1gKTtcclxuICAgICAgICBjb3ZlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgKCkgPT4gdGhpcy5ob3ZlckVmZmVjdChlbGVtZW50LCAnb3ZlcicpKTtcclxuICAgICAgICBjb3ZlckVsZW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsICgpID0+IHRoaXMuaG92ZXJFZmZlY3QoZWxlbWVudCwgJ2xlYXZlJykpO1xyXG4gICAgICAgIGNvdmVyRWxlbWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuY2xpY2tFZmZlY3QoZWxlbWVudCkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydHMuTWVudUl0ZW1FZmZlY3QgPSBNZW51SXRlbUVmZmVjdDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0aWYoX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSkge1xuXHRcdHJldHVybiBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGlzIHJlZmVyZW5jZWQgYnkgb3RoZXIgbW9kdWxlcyBzbyBpdCBjYW4ndCBiZSBpbmxpbmVkXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18oXCIuL3NyYy9hcHAudHNcIik7XG4iXSwic291cmNlUm9vdCI6IiJ9
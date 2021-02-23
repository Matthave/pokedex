"use strict";
var PokemonGet = /** @class */ (function () {
    function PokemonGet() {
        var _this = this;
        this.fetchInit = function () {
            fetch(_this.generalAPI)
                .then(function (response) { return response.json(); })
                .then(function (data) { return console.log(data); });
        };
        this.generalAPI = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1118";
        this.fetchInit();
    }
    return PokemonGet;
}());
var getPokemon = new PokemonGet();
var MenuItem;
(function (MenuItem) {
    MenuItem["TYPE"] = "type";
    MenuItem["GENERAL"] = "general";
    MenuItem["REGION"] = "region";
    MenuItem["GAME"] = "game";
})(MenuItem || (MenuItem = {}));
;
var MenuItemEffect = /** @class */ (function () {
    function MenuItemEffect(element) {
        var _this = this;
        this.hoverEffect = function (element, eventType) {
            var navElement = document.querySelector(".nav__" + element);
            if (eventType === 'over') {
                navElement.classList.add("nav__" + element + "--active");
            }
            if (eventType === 'leave') {
                navElement.classList.remove("nav__" + element + "--active");
            }
        };
        var coverElement = document.querySelector(".coverMouse__" + element);
        coverElement.addEventListener('mouseover', function () { return _this.hoverEffect(element, 'over'); });
        coverElement.addEventListener('mouseleave', function () { return _this.hoverEffect(element, 'leave'); });
    }
    return MenuItemEffect;
}());
var menuItemOne = new MenuItemEffect(MenuItem.TYPE);
var menuItemTwo = new MenuItemEffect(MenuItem.GENERAL);
var menuItemThree = new MenuItemEffect(MenuItem.REGION);
var menuItemFour = new MenuItemEffect(MenuItem.GAME);

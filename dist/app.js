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
        this.clickEffect = function (element) {
            var navElement = document.querySelectorAll(".nav__option");
            var nav = document.querySelector('.nav');
            var navWrapper = document.querySelector(".navWrapper");
            var navLine = document.querySelector('.nav__line');
            var navCircle = document.querySelector('.circle');
            var navInnerCircle = document.querySelector('.circle__innerCircle');
            var coverMouse = document.querySelector('.coverMouse');
            if (coverMouse.id !== 'minimalized') {
                navElement.forEach(function (ele) {
                    ele.classList.add("nav__option--hide");
                });
                setTimeout(function () {
                    nav.classList.add("nav--hide");
                    navCircle.classList.add('circle--hide');
                    navInnerCircle.classList.add('circle__innerCircle--hide');
                    navLine.classList.add("nav__line--hide");
                }, 500);
                setTimeout(function () {
                    navWrapper.classList.add('navWrapper--hide');
                    coverMouse.classList.add('coverMouse--hide');
                    coverMouse.id = 'minimalized';
                }, 750);
            }
            else {
                document.querySelector('.nav__game').classList.remove("nav__game--active");
                document.querySelector('.nav__general').classList.remove("nav__general--active");
                document.querySelector('.nav__type').classList.remove("nav__type--active");
                document.querySelector('.nav__region').classList.remove("nav__region--active");
                navWrapper.classList.remove('navWrapper--hide');
                coverMouse.classList.remove('coverMouse--hide');
                coverMouse.id = "";
                setTimeout(function () {
                    nav.classList.remove("nav--hide", 'nav--active');
                    navCircle.classList.remove('circle--hide');
                    navInnerCircle.classList.remove('circle__innerCircle--hide', 'circle__innerCircle--active');
                    navLine.classList.remove("nav__line--hide", 'nav__line--active');
                }, 500);
                setTimeout(function () {
                    navElement.forEach(function (ele) {
                        ele.classList.remove("nav__option--hide");
                    });
                }, 750);
            }
        };
        this.hoverEffect = function (element, eventType) {
            var navElement = document.querySelector(".nav__" + element);
            var coverMouse = document.querySelector('.coverMouse');
            if (coverMouse.id !== 'minimalized') {
                if (eventType === 'over') {
                    navElement.classList.add("nav__" + element + "--active");
                }
                if (eventType === 'leave') {
                    navElement.classList.remove("nav__" + element + "--active");
                }
            }
            else {
                var nav = document.querySelector('.nav');
                var navLine = document.querySelector('.nav__line');
                var navInnerCircle = document.querySelector('.circle__innerCircle');
                if (eventType === 'over') {
                    nav.classList.add("nav--active");
                    navLine.classList.add('nav__line--active');
                    navInnerCircle.classList.add('circle__innerCircle--active');
                }
                if (eventType === 'leave') {
                    nav.classList.remove("nav--active");
                    navLine.classList.remove('nav__line--active');
                    navInnerCircle.classList.remove('circle__innerCircle--active');
                }
            }
        };
        var coverElement = document.querySelector(".coverMouse__" + element);
        coverElement.addEventListener('mouseover', function () { return _this.hoverEffect(element, 'over'); });
        coverElement.addEventListener('mouseleave', function () { return _this.hoverEffect(element, 'leave'); });
        coverElement.addEventListener('click', function () { return _this.clickEffect(element); });
    }
    return MenuItemEffect;
}());
var menuItemOne = new MenuItemEffect(MenuItem.TYPE);
var menuItemTwo = new MenuItemEffect(MenuItem.GENERAL);
var menuItemThree = new MenuItemEffect(MenuItem.REGION);
var menuItemFour = new MenuItemEffect(MenuItem.GAME);

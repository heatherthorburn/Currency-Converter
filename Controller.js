"use strict";

var model = new Model();
var view = new View();
var controller = null;

function Controller() {

    this.updateNumber = function(x) {
        view.updateNumberDisplay(x);
    }

    this.updateCurrencies = function() {
        view.closeNavBar();
        model.setHomeAndAway();
        view.updateCurrenciesDisplay(model.getHome(), model.getAway());
        model.setFees();
    }

    this.calculate = function() {
        view.displayResult(model.calculation());
        view.updateCurrenciesDisplay(model.getHome(), model.getAway());
    }

    this.init = function() {

        view.setButton7ClickCallback(function () {
            controller.updateNumber('7');
        });
        view.setButton8ClickCallback(function () {
            controller.updateNumber('8');
        });
        view.setButton9ClickCallback(function () {
            controller.updateNumber('9');
        });
        view.setButton4ClickCallback(function () {
            controller.updateNumber('4');
        });
        view.setButton5ClickCallback(function () {
            controller.updateNumber('5');
        });
        view.setButton6ClickCallback(function () {
            controller.updateNumber('6');
        });
        view.setButton1ClickCallback(function () {
            controller.updateNumber('1');
        });
        view.setButton2ClickCallback(function () {
            controller.updateNumber('2');
        });
        view.setButton3ClickCallback(function () {
            controller.updateNumber('3');
        });
        view.setButton0ClickCallback(function () {
            controller.updateNumber('0');
        });
        view.setButtonCClickCallback(function () {
            controller.updateNumber('c');
        });
        view.setOpenNavBarCallback(function () {
            view.openNavBar();
        });
        view.setCloseNavBarCallback(function () {
            view.updateFlagGraphics(model.getHome(), model.getAway());
            view.updateSelect(model.getHome(), model.getAway(), model.getFees());
            view.closeNavBar();
        });
        view.setSubmitCallback(function () {
            controller.updateCurrencies();
        });
        view.setCalculateCallback(function() {
            controller.calculate();
        });

        /* some functions for initialising first view */

        model.updateRates();
        model.initialiseHomeAndAway();
        view.updateCurrenciesDisplay(model.getHome(), model.getAway());
        view.updateFlagGraphics(model.getHome(), model.getAway());
        view.updateSelect(model.getHome(), model.getAway(), model.getFees());
    };
}

controller = new Controller();
window.addEventListener("load", controller.init);


"use strict";

function View() {

    /* populate an assosciative array with flag emoji codes */

    var flags = {};
    flags['EUR'] = "&#127466;&#127482;";flags['USD'] = "&#127482;&#127480;";flags['JPY'] = "&#127471;&#127477;";flags['BGN'] = "&#127463;&#127468;";flags['CZK'] = "&#127464;&#127487;";flags['DKK'] = "&#127465;&#127472;";flags['GBP'] = "&#127468;&#127463;";flags['HUF'] = "&#127469;&#127482;";
    flags['PLN'] = "&#127477;&#127473;";flags['RON'] = "&#127479;&#127476;";flags['SEK'] = "&#127480;&#127466;";flags['CHF'] = "&#127464;&#127469;";flags['ISK'] = "&#127470;&#127480;";flags['NOK'] = "&#127475;&#127476;";flags['HRK'] = "&#127469;&#127479;";flags['RUB'] = "&#127479;&#127482;";flags['TRY'] = "&#127481;&#127479;";flags['AUD'] = "&#127462;&#127481;";flags['BRL'] = "&#127463;&#127479;";flags['CAD'] = "&#127464;&#127462;";flags['CNY'] = "&#127464;&#127475;";
    flags['HKD'] = "&#127469;&#127472;";flags['IDR'] = "&#127470;&#127465;";flags['ILS'] = "&#127470;&#127473;";flags['INR'] = "&#127470;&#127475;";flags['KRW'] = "&#127472;&#127479;";flags['MXN'] = "&#127474;&#127485;";flags['MYR'] = "&#127474;&#127486;";flags['NZD'] = "&#127475;&#127487;";
    flags['PHP'] = "&#127477;&#127469;";flags['SGD'] = "&#127480;&#127468;";flags['THB'] = "&#127481;&#127469;";flags['ZAR'] = "&#127487;&#127462;";

    /* event listers to update the flag emojis when selects are changed*/

    document.getElementById('home-money').addEventListener('change', function() {
        var h = document.getElementById("home-money");
        var home = h.options[h.selectedIndex].text;
        document.getElementById('home-flag').innerHTML = flags[home];
    });

    document.getElementById('abroad-money').addEventListener('change', function() {
        var a = document.getElementById("abroad-money");
        var away = a.options[a.selectedIndex].text;
        document.getElementById('abroad-flag').innerHTML = flags[away];
    });

    var exchange_display = document.getElementById("dest_info");
    var home_curr_display = document.getElementById("home_curr");
    var num_display = document.getElementById("home_amount");
    num_display.innerHTML = '0';

    /*methods that update the view */

    this.updateFlagGraphics = function (h, a) {
        document.getElementById('home-flag').innerHTML = flags[h];
        document.getElementById('abroad-flag').innerHTML = flags[a];
    };

    this.updateSelect = function (h, a, f) {
        var x=document.getElementById("home-money")
        x.options[x.selectedIndex].text=h;
        var y=document.getElementById("abroad-money")
        y.options[y.selectedIndex].text=a;
        var z=document.getElementById("bank-fees")
        z.value = f;
    };

    this.updateCurrenciesDisplay = function (home, away) {
        home_curr_display.innerHTML = home;
        exchange_display.innerHTML = home + " &#8680; " + away;
    };

    this.updateNumberDisplay = function (n)
    {
        if (num_display.innerHTML == '0' && n == '0') {
            num_display.innerHTML = '0';
        }
        else if (n=='c') {
            num_display.innerHTML = '0';
        }
        else if (num_display.innerHTML == '0' && n != '0') {
          num_display.innerHTML = n;
        }
        else {
          num_display.innerHTML += n;
        }
    };

    this.displayResult = function(x) {
        num_display.innerHTML = x;
    }

    /* functions relating to the dynamic nav bar */

    this.openNavBar = function()
    {
        document.getElementById("opened_nav").style.width = "80vw";
        document.getElementById("closed_nav").style.visibility = "hidden";
        document.getElementById("nav-container").style.visibility = "visible";
    };

    this.closeNavBar = function()
    {
        document.getElementById("opened_nav").style.width = "0";
        document.getElementById("closed_nav").style.visibility = "visible";
        document.getElementById("nav-container").style.visibility = "hidden";
    };

    /* callback functions for button clicks for use in controller */

    this.setButton7ClickCallback = function (callback) {
        button7.addEventListener("click", callback);
    };

    this.setButton8ClickCallback = function (callback) {
        button8.addEventListener("click", callback);
    };
    this.setButton9ClickCallback = function (callback) {
        button9.addEventListener("click", callback);
    };
    this.setButton4ClickCallback = function (callback) {
        button4.addEventListener("click", callback);
    };
    this.setButton5ClickCallback = function (callback) {
        button5.addEventListener("click", callback);
    };
    this.setButton6ClickCallback = function (callback) {
            button6.addEventListener("click", callback);
    };
    this.setButton1ClickCallback = function (callback) {
            button1.addEventListener("click", callback);
    };
    this.setButton2ClickCallback = function (callback) {
            button2.addEventListener("click", callback);
    };
    this.setButton3ClickCallback = function (callback) {
        button3.addEventListener("click", callback);
    };
    this.setButton0ClickCallback = function (callback) {
            button0.addEventListener("click", callback);
    };
    this.setButtonCClickCallback = function (callback) {
        buttonC.addEventListener("click", callback);
    };
    this.setOpenNavBarCallback = function (callback) {
        closed_nav.addEventListener("click", callback);
    };
    this.setCloseNavBarCallback = function (callback) {
        closeToggle.addEventListener("click", callback);
    };
    this.setSubmitCallback = function (callback) {
        submit_vals.addEventListener("click", callback);
    };
    this.setCalculateCallback = function (callback) {
        buttonEq.addEventListener("click", callback);
    };


}
function Model() {

    var currencies = {};
    var home;
    var away;
    var fees;
    var time;

    /* from lectures, to check local storage exists */
    this.haveLocalStorage = function() {
        var mod = 'mod', mod2='';
        try {
            localStorage.setItem(mod, mod);
            mod2 = localStorage.getItem(mod);
            localStorage.removeItem(mod);
            return (mod === mod2);
        } catch(e) {
        return false;
        }
    }

    /*main function to retrieve ECB rates. will update the footer with the time that the ECB file was last updated.
    if http request is not successful, then the app will take the rates most recently stored in local storage.*/

    this.updateRates = function() {

        var http = new XMLHttpRequest();
        http.onreadystatechange = function() {

            if (http.readyState == 4 && http.status == 200) {
                var httpDoc = http.responseXML;
                var x = httpDoc.getElementsByTagName("Cube");
                var i, c, r, obj;
                for (i = 2; i < x.length; i++) {
                    c = x[i].getAttribute("currency");
                    r = x[i].getAttribute("rate");
                    currencies[c] = r;
                    if (model.haveLocalStorage) {
                        obj = {'currency': c, 'rate': r};
                        localStorage.setItem('c' + i, JSON.stringify(obj));
                    }
                };
                currencies['EUR'] = 1;
                time = x[1].getAttribute("time");
                if (model.haveLocalStorage()) {
                    localStorage.setItem('refreshTime', time);
                }
                       document.getElementById("footer").innerHTML = "Heather Thorburn 2020 Rates Updated: " + time;
                }
                else {
                    model.offlineRates();
                }
            }
            http.open("GET","https://devweb2019.cis.strath.ac.uk/~aes02112/ecbxml.php", true);
        try{
        http.send();
        }
        catch(e) {
            model.offlineRates();
        }
    };

    this.offlineRates = function() {
        if (model.haveLocalStorage) {
            if (localStorage.getItem('c3') != null) {
            var i;
            for (i = 2; i < 34; i++) {
                if (localStorage.getItem('c' + i) != null) {
                    var JSONobj = localStorage.getItem('c' + i);
                    var obj = JSON.parse(JSONobj);
                    currencies[obj.currency] = obj.rate;
                }
        }
        currencies['EUR'] = 1;
        time = localStorage.getItem('refreshTime');
        document.getElementById("footer").innerHTML = "Heather Thorburn 2020 Rates Updated: " + time;
        }
        else if (!navigator.onLine) {
        alert("No currencies stored. Please connect to Wifi and reload the app.");
        document.getElementById("buttonEq").style.visibility = "hidden";
        }
        }
        }

    /* either default to GBP and EUR if there user has not used app before, or default to last countries in local storage */

    this.initialiseHomeAndAway = function() {
        if (this.haveLocalStorage) {
            if (localStorage.home && localStorage.home !== '') {
                home = localStorage.home;
            }
            else {
                home = 'GBP';
            }
            if (localStorage.away && localStorage !== '') {
                away = localStorage.away;
            }
            else {
                away = 'EUR';
            }
            if (localStorage.fees && localStorage !== '') {
                fees = localStorage.fees;
            }
            else {
                fees = 1;
            }
        }
    }

    /* retrieve values from selects if user has okayed the submission */

    this.setHomeAndAway = function () {
        var h = document.getElementById("home-money");
        home = h.options[h.selectedIndex].text;
        var a = document.getElementById("abroad-money");
        away = a.options[a.selectedIndex].text;
        if (this.haveLocalStorage) {
            localStorage.setItem('home', home);
            localStorage.setItem('away', away); }
    }

    this.setFees = function() {
        var f = document.getElementById("bank-fees");
        fees = f.options[f.selectedIndex].value;
        if (this.haveLocalStorage) {
            localStorage.setItem('fees', fees);
        }
    };

    this.reverseHomeAndAway = function() {
        var tempHome = home;
        var tempAway = away;
        away = tempHome;
        home = tempAway;
    };

    /* main calculation including bank fees. rounded to nearest int as per specs */

    this.calculation = function() {
        var h = currencies[home];
        var a = currencies[away];
        var val = document.getElementById("home_amount").innerHTML;
        var cal = ((a/h)*val)*fees;
        this.reverseHomeAndAway();
        return Math.round(cal);
    };

    /* getters and setters for use in the controller and view */

    this.getHome = function() {
        return home;
    };

    this.getAway = function() {
        return away;
    };

    this.getFees = function() {
        return fees;
    }

    this.getRefreshTime = function() {
        return time;
    }


}



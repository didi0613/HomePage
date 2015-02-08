// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {

    var ko = require('knockout');

    // Constructor function for this module
    function Portfolio() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;

        //variables
        self.isGeneral = ko.observable(true);
        self.isDetail = ko.observable(false);
        self.type = ko.observable();

        //click to see thed detailed info of each project
        self.detail = function (val) {
            self.isGeneral(false);
            self.type(val);

            setTimeout(function(){
                self.isDetail(true);
            }, 1000);
        };

        self.back = function () {
            self.isDetail(false);
            self.type("");

            setTimeout(function(){
                self.isGeneral(true);
            }, 1000);
        };
    }

    // This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = Portfolio;
});
// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {

    var ko = require('knockout');

    // Constructor function for this module
    function Portfolio() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;

        self.general = ko.observable(true);
        self.type = ko.observable();

        self.detail = function(val){
            self.general(false);
            self.type(val);
        };
    }

    // This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = Portfolio;
});
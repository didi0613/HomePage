// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {
    var ins = require('instafeed');
    var $ = require('jquery');

    // Constructor function for this module
    function Home() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;

        var feed = new Instafeed({
            get: "user",
            userId: 471220422,
            accessToken: '471220422.f517982.3d5b579ed5464add809c2cb8fcb759ae',
            clientId: 'f51798263d50429e99f8a3e92f6932b4',
            limit: 18,
            after: function () {
                var images = $("#instafeed").find('a');
                $.each(images, function (index, image) {
                    var delay = (index * 75) + 'ms';
                    $(image).css('-webkit-animation-delay', delay);
                    $(image).css('-moz-animation-delay', delay);
                    $(image).css('-ms-animation-delay', delay);
                    $(image).css('-o-animation-delay', delay);
                    $(image).css('animation-delay', delay);
                    $(image).addClass('animated flipInX');
                });
            },
            template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /><div class="likes">&hearts; {{likes}}</div></a>'
        });

        self.activate = function () {
            feed.run();
        };
    }

// This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = Home;
});
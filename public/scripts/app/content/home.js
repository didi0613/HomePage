// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {

    var InstaSheng = require('instafeed');
    var $ = require('jquery');
    //var Maps = require('maps');
    //var MapsHelperSheng = require('maps.helper');

    // Constructor function for this module
    function Home() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;

        function initialize() {
            var mapCanvas = document.getElementById('map-canvas');
            var myLatLng = new google.maps.LatLng(34.436283, -119.8634346);
            var mapOptions = {
                center: myLatLng,
                zoom: 5,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            var map = new google.maps.Map(mapCanvas, mapOptions);
            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: "Working Place",
                infoWindow: {
                    content: '<p>Working Here!</p>'
                }
            });
        };

        self.activate = function () {
            var feed = new Instafeed({
                get: "user",
                userId: 471220422,
                accessToken: '471220422.f517982.3d5b579ed5464add809c2cb8fcb759ae',
                clientId: 'f51798263d50429e99f8a3e92f6932b4',
                limit: 12,
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
                template: '<a href="{{link}}" target="_blank"><img src="{{image}}" /></a>'
            });

            feed.run();

            //google.maps.event.addDomListener(window, 'load', initialize);
        };

    }

    // This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = Home;
});
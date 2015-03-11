// This define call is requirejs boilerplate used to define the module and isolate the scope:
define(function (require, exports, module) {
    var Instafeed = require('instafeed');
    var $ = require('jquery');
    var onScroll = require('animation.on.scroll');
    var easyPieChart = require('jquery-easypiechart');

    // Constructor function for this module
    function Home() {
        // This is (one) convention used to manage the scope of 'this', common in Knockout examples:
        var self = this;
        var $window = $(window),
            win_height_padded = $window.height() * 1.1,
            isTouch = Modernizr.touch;

        var index=0;

        /*
         * Instagram Feed
         *
         */
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

        /*
         * Reveal On Scroll
         *
         */

        if (isTouch) {
            $('.revealOnScroll').addClass('animated');
        }

        $window.on('scroll', revealOnScroll);

        function revealOnScroll() {
            var scrolled = $window.scrollTop(),
                win_height_padded = $window.height() * 1.1;

            // Showed...
            $(".revealOnScroll:not(.animated)").each(function () {
                var $this = $(this),
                    offsetTop = $this.offset().top;

                if (scrolled + win_height_padded > offsetTop) {
                    if ($this.data('timeout')) {
                        window.setTimeout(function () {
                            $this.addClass('animated ' + $this.data('animation'));
                        }, parseInt($this.data('timeout'), 10));
                    } else {
                        $this.addClass('animated ' + $this.data('animation'));
                    }
                }
            });
            // Hidden...
            $(".revealOnScroll.animated").each(function (index) {
                var $this = $(this),
                    offsetTop = $this.offset().top;
                if (scrolled + win_height_padded < offsetTop) {
                    $(this).removeClass('animated fadeInUp flipInX lightSpeedIn')
                }
            });
        }

        self.activate = function () {
            feed.run();
            revealOnScroll();
            $(document).scroll(function(){
                var top = $('.technical').height()-$(window).scrollTop();
                if(top<-3600){
                    console.log(top);
                    if(index==0){
                        $('.chart').easyPieChart({
                            barColor: '#e9a1b9',
                            size: 152,
                            lineWidth: 10,
                            onStep: function(from, to, percent) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }
                        });

                    }
                    index++;
                }
            });
        };
    }

// This returns the constructor function, will be called automatically by Durandal when composing view:
    module.exports = Home;
});
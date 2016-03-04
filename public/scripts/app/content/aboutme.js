define(function (require, exports, module) {
    require('animation.on.scroll');
    require('jquery-easypiechart');
    
    var Instafeed = require('instafeed');
    var $ = require('jquery');

    function Aboutme() {
        var self = this;

        var $window = $(window),
            win_height_padded = $window.height() * 1.1,
            isTouch = Modernizr.touch;

        var index = 0;

        var feed = new Instafeed({
            get: "user",
            userId: 471220422,
            accessToken: '471220422.f517982.3d5b579ed5464add809c2cb8fcb759ae',
            clientId: 'f51798263d50429e99f8a3e92f6932b4',
            limit: 6,
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

        if (isTouch) {
            $('.revealOnScroll').addClass('animated');
        }

        $window.on('scroll', revealOnScroll);

        function revealOnScroll() {
            var scrolled = $window.scrollTop();
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
            $(document).scroll(function () {
                var top = $('.technical').height() - $(window).scrollTop();

                if (top < -55) {
                    if (index == 0) {
                        $('.chart').easyPieChart({
                            barColor: '#e9a1b9',
                            size: 152,
                            lineWidth: 10,
                            onStep: function (from, to, percent) {
                                $(this.el).find('.percent').text(Math.round(percent));
                            }
                        });

                    }
                    index++;
                }
            });
        }
    }

    module.exports = Aboutme;
});
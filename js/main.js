(function () {
    var createCSS = document.createElement('link');
    createCSS.type = 'text/css';
    createCSS.rel = 'stylesheet';
    createCSS.href = './css/main.css';
    $('head').append(createCSS);
    setTimeout(function () {
        start()
    }, 250);

    function start() {
        /*Variables*/
        var vueJsElement = '.VueJsElement';
        /*Vue*/
        new Vue({
            el: vueJsElement,
            data: {
                button: {
                    findRetailerClicked: false
                },
                headerNavActive: false,
                resizeObs: '',
                headerBackground: '',
                headerBackgroundPicture: '',
                headerBackgroundTitle: '',
                navigationItemSpace: '',
                device: {
                    isDesktop: window.matchMedia('(min-width:1025px)').matches,
                    isTablet: window.matchMedia('(max-width:1025px)').matches,
                    isMobile: window.matchMedia('(max-width:414px)').matches
                }
            },
            mounted: function () {
                var _this = this;
                var el = $(this.$el);
                this.headerBackground = el.find('header.background');
                this.headerBackgroundPicture = el.find('header.background').find('.header-background__vectorized-picture');
                this.headerBackgroundTitle = el.find('.header-background__wrapper__title');
                this.navigationItemSpace = el.find('.navigation-items__space');
                this.resizeObs = new ResizeObserver(function (items) {
                    items.forEach(function (item) {
                        var data = item.contentRect;
                        _this.RepositionHeaderBackgroundPicture(data.width);
                        _this.setDeviceVariables(data.width)
                    })
                });
                this.RepositionHeaderBackgroundPicture($(window).width());
                this.resizeObs.observe(this.headerBackground[0]);
                this.setTouchClassDevice();
                this.headerNavActive = ($(window).scrollTop() > 100) ? true : false;
                $(window).on('scroll', function () {
                    var scroll = $(this).scrollTop();
                    _this.headerNavActive = (scroll > 100) ? true : false;
                })
            },
            methods: {
                setDeviceVariables: function (width) {
                    this.device.isDesktop = width >= 1025;
                    this.device.isTablet = width > 414 && width < 1025;
                    this.device.isMobile = width <= 414;
                },
                setTouchClassDevice:function(){
                    if (this.device.isMobile || this.device.isTablet) {
                       $('html').removeClass('no-touch').addClass('touch')
                    } else {
                        $('html').removeClass('touch').addClass('no-touch')
                    }
                },
                RepositionHeaderBackgroundPicture: function (width) {
                    var _this = this;
                    var titleOffset = function () {
                        return (width > 1100) ? 450 : -100;
                    };
                    var pictureOffset = function () {
                        return (width > 1100) ? 320 : -100;
                    };
                    TweenLite.set(this.headerBackgroundTitle, {
                        left: _this.navigationItemSpace.position().left - titleOffset()
                    });
                    TweenLite.set(this.headerBackgroundPicture, {
                        left: _this.navigationItemSpace.position().left - pictureOffset()
                    });
                }
            },
            watch: {
                'device': {
                    handler: function (value) {
                       this.setTouchClassDevice()
                    }, deep: true
                }
            }
        });
    }
})();

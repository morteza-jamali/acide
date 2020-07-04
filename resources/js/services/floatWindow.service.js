export function FloatWindow($location , j) {
    var _this = this;

    this.path = function (path = '') {
        $location.path('/' + path);
    };

    this.show = function () {
        _this.popUp(false);
        j._()('.window').removeClass('size-0');
    };

    this.hide = function () {
        j._()('.window').addClass('size-0');
        _this.path();
    };

    this.title = function (title) {
        j._()('.window .window-caption .title').html(title);
    };

    this.changeProperty = function (properties) {
        if(properties.size !== undefined) {
            j._()('.window').css({
                'width' : properties.size.width ,
                'height' : properties.size.height ,
                'top' : 0 ,
                'bottom' : 0 ,
                'left' : 0 ,
                'right' : 0 ,
                'margin' : 'auto'
            });
        }

        if(properties.resizable !== undefined) {
            if(properties.resizable) {
                j._()('.window .resize-element').removeClass('d-none');
            } else {
                j._()('.window .resize-element').addClass('d-none');
            }
        }
    };

    this.popUp = function (value) {
        if(value) {
            j._()('.window .window-caption .buttons').addClass('d-none');
            j._()('.window .window-caption .title').css('text-align' , 'center');
        } else {
            j._()('.window .window-caption .buttons').removeClass('d-none');
            j._()('.window .window-caption .title').css('text-align' , '');
        }
    };
}
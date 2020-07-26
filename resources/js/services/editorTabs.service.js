export function editorTabs(j) {
    this.clean = function () {
        j._()('.editor-tabs ul li').each(function () {
            j._()(this).remove();
        });
    };

    this.activate = function (slug) {
        j._()('.editor-tabs ul li').each(function () {
            j._()(this).removeClass('active');
        });
        if(j._()('.editor-tabs ul li[data-slug="' + slug + '"]').length) {
            j._()('.editor-tabs ul li[data-slug="' + slug + '"]').addClass('active');
        } else {
            j._()('.editor-tabs ul li').last().addClass('active');
        }
    };

    this.append = function (name , icon , slug) {
        var _founded = false;
        j._()('.editor-tabs ul li').each(function () {
            if(j._()(this).attr('data-slug') === slug) {
                _founded = true;
            }
        });
        if(!_founded) {
            j._()('.editor-tabs ul li').each(function () {
                j._()(this).removeClass('active');
            });
            var _html = '<li class="pr-2 d-flex flex-align-center active" data-slug="' +
                slug + '"><div class="py-1 pl-2 d-flex"><img src="' + icon +
                '" class="mr-1"><span class="name">' + name + '</span>' +
                '</div><span class="close-tab ml-2">x</span></li>';
            j._()('.editor-tabs ul').append(_html);
        } else {
            this.activate(slug);
        }
    };
}
import he from "he";

export function editorContent(editorHandler , j , ACE , elementHandler , simpleBar) {
    this.clean = function () {
        j._()('.code-editor .editor').empty();
    };

    this.activate = function (slug) {
        j._()('.code-editor .editor .child').each(function () {
            j._()(this).removeClass('active');
        });

        j._()('.code-editor .editor .child[id="' + slug + '"]').addClass('active');
    };

    this.append = function (slug , content , name) {
        content = content === undefined ? '' : he.encode(content);
        var _founded = false;
        j._()('.code-editor .editor .child').each(function () {
            if(j._()(this).attr('id') === slug) {
                _founded = true;
            }
        });
        if(!_founded) {
            j._()('.code-editor .editor .child').each(function () {
                j._()(this).removeClass('active');
            });
            if(/^.+(jpg|jpeg|png|gif)$/.test(name)) {
                j._()('.code-editor .editor').append(
                    '<div id="' + slug + '" class="w-100 h-100 active child">' +
                    '<img src="' + elementHandler.getSelectedItemURL() + '"></div>'
                );
                simpleBar.init('.code-editor .editor .child#' + slug);
                j._()('.code-editor .editor .child#' + slug + ' .simplebar-content-wrapper .simplebar-content')
                    .addClass('w-100 h-100 d-flex flex-align-center flex-justify-center');
            } else {
                j._()('.code-editor .editor').append('<div id="' + slug + '" class="w-100 h-100 active child">' + content + '</div>');
                editorHandler.init(slug , ACE.getMode(name));
            }
        } else {
            this.activate(slug);
        }
    };
}
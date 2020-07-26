import he from "he";

export function editorContent(editorHandler , j , ACE , simpleBar) {
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
            j._()('.code-editor .editor').append('<div id="' + slug + '" class="w-100 h-100 active child">' + content + '</div>');
            editorHandler.init(slug , ACE.getMode(name));
            /*simpleBar.add('.editor #' + slug + ' .ace_scrollbar.ace_scrollbar-v' , {
                forceVisible : 'y'
            });*/
            //simpleBar.add('.editor #' + slug + ' .ace_scrollbar.ace_scrollbar-h');
        } else {
            this.activate(slug);
        }
    };
}
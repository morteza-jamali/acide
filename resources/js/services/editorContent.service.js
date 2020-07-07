import {extensions} from "../modules/extensions.module";
import he from "he";

export function editorContent(editorHandler , j) {
    this.clean = function () {
        j._()('.code-editor .editor').empty();
    };

    this.activate = function (slug) {
        j._()('.code-editor .editor .child').each(function () {
            j._()(this).removeClass('active');
        });

        j._()('.code-editor .editor .child[id="' + slug + '"]').addClass('active');
    };

    this.append = function (slug , content , ext) {
        content = content === undefined ? '' : content;
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
            if(extensions[ext] !== undefined && extensions[ext].encode) {
                content = he.encode(content);
            }
            j._()('.code-editor .editor').append('<div id="' + slug + '" class="w-100 h-100 active child">' + content + '</div>');
            editorHandler.init(slug , (extensions[ext] !== undefined && extensions[ext].mode !== '' ? extensions[ext].mode : 'plain_text'));
        } else {
            this.activate(slug);
        }
    };
}
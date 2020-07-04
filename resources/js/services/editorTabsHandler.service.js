export function editorTabsHandler(editorContent , editorTabs , j) {
    this.init = function () {
        j._()(document).on('click' , '.editor-tabs li .close-tab' , function() {
            var _is_active = j._()(this).parent().hasClass('active');
            j._()('#' + j._()(this).parent().attr('data-slug')).remove();
            j._()(this).parent().remove();
            if(_is_active) {
                var _elm = j._()('.editor-tabs ul li').last();
                _elm.addClass('active');
                editorContent.activate(_elm.attr('data-slug'));
            }
        });
        j._()(document).on('click' , '.editor-tabs ul li div' , function () {
            editorTabs.activate(j._()(this).parent().attr('data-slug'));
            editorContent.activate(j._()(this).parent().attr('data-slug'));
        });
    };
}
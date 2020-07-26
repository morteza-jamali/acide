export function ProgressBar(j) {
    var _this = this;

    this.getObject = function(position) {
        _this.progress_obj = j._()('[data-role="progress"][data-position="' + position + '"]');
        return _this;
    };

    this.show = function() {
        _this.progress_obj.removeClass('d-none');
        return _this;
    };

    this.hide = function() {
        _this.progress_obj.addClass('d-none');
        return _this;
    };

    this.value = function(v = null) {
        if(v === null) {
            return _this.progress_obj.attr('data-value');
        } else {
            _this.progress_obj.attr('data-value' , v);
            return _this;
        }
    };
}
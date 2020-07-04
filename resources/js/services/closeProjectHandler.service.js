export function closeProjectHandler(j) {
    var service_obj = this;

    this.getItem = function () {
        return j._()('.close_project .database_list li , .close_project .files_list li');
    };

    this.getActiveItem = function () {
        return j._()('.close_project .database_list li.active , .close_project .files_list li.active');
    };

    this.validate = function (scope) {
        scope.error = '';
        if(!service_obj.getActiveItem().length) {
            scope.error = 'selection';
        }
    };

    this.init = function () {
        j._()(document).on('click' , '.close_project .database_list li , .close_project .files_list li' , function () {
            service_obj.getItem().removeClass('active');
            j._()(this).addClass('active');
        });
    };
}
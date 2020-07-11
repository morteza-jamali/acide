export const _ACIDE = {
    getWebsiteUrl : function() {
        if(window.location.host === 'localhost') {
            return (window.location.origin + '/' + 'acide').toLowerCase();
        } else {
            return window.location.origin;
        }
    } ,
    getTemplateURL : function(name) {
        return this.getWebsiteUrl() + '/assets/html/' + name + '.html';
    } ,
    getIconURL : function(name) {
        return this.getWebsiteUrl() + '/assets/img/icons/' + name + '.svg';
    } ,
    getFullRoute : function(controller) {
        return this.getWebsiteUrl() + '/controller/' + controller;
    }
}
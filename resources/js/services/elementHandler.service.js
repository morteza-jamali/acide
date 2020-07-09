export function elementHandler(ACIDE , j) {
    this.getSelectedElm = function () {
        return j._()('.directory-structure li.li-selected');
    };

    this.getSelectedDir = function () {
        return j._()('.directory-structure li.li-selected').next();
    };

    this.getParentDir = function () {
        return j._()('.directory-structure li.li-selected').parents('ul');
    };

    this.getSelectedItemType = function () {
        var _elm = this.getSelectedElm();
        if(_elm.hasClass('dir') || _elm.hasClass('Directory')) {
            return 'directory';
        }
        return 'file';
    };

    this.getSelectedItemPath = function () {
        return this.getSelectedItemType() === 'file' ?
            this.getParentDir().attr('data-path') + '/' + this.getSelectedElm().attr('data-name') :
            this.getSelectedDir().attr('data-path');
    };

    this.getSelectedItemURL = function () {
        var path = this.getSelectedItemPath();
        return (ACIDE.getWebsiteUrl() + path.slice(path.indexOf('acide') + 'acide'.length , path.length))
            .replace(/\\/g, '/');
    };

    this.getBaseDir = function () {
        return j._()('.directory-structure li.Directory').attr('data-slug');
    };
}
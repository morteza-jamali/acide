export const ContextMenus = {
    '.directory-structure .database' : [{
        name: 'New',
        subMenu : [
            {
                name : 'Record' ,
                img : 'assets/img/icons/credits.svg' ,
                fun : function () {
                    window.location.hash = '#!newrecord';
                }
            } ,
            {
                name: 'PHP Record' ,
                img : 'assets/img/icons/php.svg'
            } ,
            {
                name : 'HTML Record' ,
                img : 'assets/img/icons/html.svg'
            } ,
            {
                name : 'Stylesheet',
                img : 'assets/img/icons/css.svg'
            } ,
            {
                name : 'Javascript Record' ,
                img : 'assets/img/icons/js.svg'
            } ,
            {
                name : 'Typescript Record' ,
                img : 'assets/img/icons/typescript.svg'
            } ,
            {
                name : 'Pug/Jade Record' ,
                img : 'assets/img/icons/pug.svg'
            } ,
            {
                name : 'Coffeescript Record' ,
                img : 'assets/img/icons/coffee.svg'
            }
        ]
    }] ,
    '.directory-structure .Directory , .directory-structure li.dir' : [{
        name: 'New',
        subMenu : [
            {
                name : 'File' ,
                img : 'assets/img/icons/file.svg' ,
                fun : function () {
                    window.location.hash = '#!newfile';
                }
            } ,
            {
                name : 'Directory' ,
                img : 'assets/img/icons/folder-custom.svg' ,
                fun: function () {
                    window.location.hash = '#!newdirectory';
                }
            } ,
            {
                name: 'PHP File' ,
                img : 'assets/img/icons/php.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'php');
                    Metro.storage.setItem('new_file_name' , 'PHP');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'HTML File' ,
                img : 'assets/img/icons/html.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'html');
                    Metro.storage.setItem('new_file_name' , 'HTML');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'Stylesheet',
                img : 'assets/img/icons/css.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'css');
                    Metro.storage.setItem('new_file_name' , 'CSS');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'JavaScript File' ,
                img : 'assets/img/icons/javascript.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'js');
                    Metro.storage.setItem('new_file_name' , 'JavaScript');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'TypeScript File' ,
                img : 'assets/img/icons/typescript.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'ts');
                    Metro.storage.setItem('new_file_name' , 'TypeScript');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'Pug/Jade File' ,
                img : 'assets/img/icons/jade.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'pug');
                    Metro.storage.setItem('new_file_name' , 'PUG/Jade');
                    window.location.hash = '#!newexefile';
                }
            } ,
            {
                name : 'CoffeeScript File' ,
                img : 'assets/img/icons/coffee.svg' ,
                fun : function () {
                    Metro.storage.setItem('new_file_type' , 'coffee');
                    Metro.storage.setItem('new_file_name' , 'CoffeeScript');
                    window.location.hash = '#!newexefile';
                }
            }
        ]
    } , {
        name: 'Cut' ,
        img : 'assets/img/tabler-icons/scissors.png' ,
        fun : function () {
            window.location.hash = '#!cutitem';
        }
    } , {
        name: 'Copy' ,
        img : 'assets/img/tabler-icons/copy.png' ,
        fun : function () {
            window.location.hash = '#!copyitem';
        }
    } , {
        name: 'Paste' ,
        img : 'assets/img/tabler-icons/paste.png' ,
        disable : true ,
        fun : function () {
            window.location.hash = '#!pasteitem';
        }
    } , {
        name: 'Rename' ,
        fun : function () {
            window.location.hash = '#!renamedirectory';
        }
    } , {
        name : 'Download' ,
        img : 'assets/img/tabler-icons/download.png' ,
        fun : function () {
            window.location.hash = '#!downloaditem';
        }
    } , {
        name: 'Delete' ,
        fun : function () {
            window.location.hash = '#!deleteitem';
        }
    }] ,
    '.directory-structure li:not(.dir):not(.Directory)' : [
        {
            name: 'Cut' ,
            img : 'assets/img/tabler-icons/scissors.png' ,
            fun : function () {
                window.location.hash = '#!cutitem';
            }
        } , {
            name: 'Copy' ,
            img : 'assets/img/tabler-icons/copy.png' ,
            fun : function () {
                window.location.hash = '#!copyitem';
            }
        } ,
        {
            name: 'Rename' ,
            fun : function () {
                window.location.hash = '#!renamefile';
            }
        } ,
        {
            name : 'Run' ,
            img : 'assets/img/tabler-icons/run.png' ,
            fun : function () {
                window.location.hash = '#!runfile';
            }
        } ,
        {
            name : 'Download' ,
            img : 'assets/img/tabler-icons/download.png' ,
            fun : function () {
                window.location.hash = '#!downloaditem';
            }
        } ,
        {
            name: 'Delete' ,
            fun : function () {
                window.location.hash = '#!deleteitem';
            }
        }]

}
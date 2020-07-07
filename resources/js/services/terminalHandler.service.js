import terminal from 'jquery.terminal/js/jquery.terminal';

export function terminalHandler(UUID , j) {
    terminal(window, j._());
    var service_object = this;
    var _counter = -1;

    this.hide = function () {
        j._()('.terminal-app').addClass('d-none');
        j._()('.ide-content').removeClass('terminal-size');
    };

    this.toggle = function () {
        j._()('.terminal-app').toggleClass('d-none');
        j._()('.ide-content').toggleClass('terminal-size');
    };

    this.activeTerminal = function (slug = undefined) {
        j._()('.terminal-app .terminal-tabs li').each(function () {
            j._()(this).removeClass('active');
        });
        j._()('.terminal-app .terminal-body .child').each(function () {
            j._()(this).removeClass('active');
        });
        if(slug === undefined) {
            j._()('.terminal-app .terminal-body .child').last().addClass('active');
            j._()('.terminal-app .terminal-tabs li').last().addClass('active');
        } else {
            j._()('.terminal-app .terminal-body .child[data-terminal-slug="' + slug + '"]').addClass('active');
            j._()('.terminal-app .terminal-tabs li[data-terminal-slug="' + slug + '"]').addClass('active');
        }
    };

    this.isInitiate = function () {
        return j._()('.terminal-app .terminal-body .child').length;
    };

    this.append = function () {
        var _terminal_slug = UUID.getUUID4();
        var _counter_slug = '';
        ++_counter;
        if(_counter > 0) {
            _counter_slug = '(' + _counter + ')';
        }

        j._()('.terminal-app .terminal-tabs').append(
            '<li data-terminal-slug="' + _terminal_slug +
            '"><a><div>Local ' + _counter_slug +
            '</div><span class="close-terminal ml-2">X</span></a></li>'
        );
        j._()('.terminal-app .terminal-body').append(
            '<div class="h-100 child" data-terminal-slug="' + _terminal_slug + '"></div>'
        );

        this.activeTerminal();

        j._()(".terminal-app .terminal-body div[data-terminal-slug='" + _terminal_slug + "']").terminal({
            open: function(value) {
                console.log(value);
            }
        } , {
            greetings : 'Welcome to ACID-E terminal'
        });
    };

    this.setEvents = function () {
        j._()(document).on('click' , '.terminal-app .terminal-tabs li span.close-terminal', function() {
            var _parent_li = j._()(this).parents('li');
            var _is_active = _parent_li.hasClass('active');
            j._()('.terminal-app .terminal-body .child[data-terminal-slug="' + _parent_li.attr('data-terminal-slug') +
                '"]').remove();
            _parent_li.remove();
            if(_is_active) {
                service_object.activeTerminal();
            }
            if(j._()('.terminal-app .terminal-tabs li').length === 0) {
                service_object.hide();
            }
        });

        j._()(document).on('click' , '.terminal-app .terminal-tabs li a div' , function() {
            service_object.activeTerminal(j._()(this).parents('li').attr('data-terminal-slug'));
        });
    };
}
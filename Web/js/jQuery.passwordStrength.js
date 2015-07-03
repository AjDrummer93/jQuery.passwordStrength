(function ($) {
    "use strict";

    $.passwordStrength = function (element, options) {

        var self;

        this.init = function () {

            self = this;

            this.elem = element;
            this.$elem = $(element);
            this.settings = $.extend(true, {}, $.passwordStrength.defaults, options);
            this.$elem.addClass('passwordStrength');
        };
    };

    $.fn.passwordStrength = function (options) {

        return this.each(function () {

            var passwordStrength = new $.passwordStrength(this, options);
            $(this).data('passwordStrength', passwordStrength);

            passwordStrength.init();
        });
    };

    $.passwordStrength.defaults = {

    };

})(jQuery);

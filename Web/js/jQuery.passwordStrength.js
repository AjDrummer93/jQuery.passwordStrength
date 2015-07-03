(function ($) {
    "use strict";

    $.passwordStrength = function (element, options) {

        var self;

        this.init = function () {

            self = this;

            this.elem = element;
            this.$elem = $(element);
            this.$form = this.$elem.parents('form');
            this.settings = $.extend(true, {}, $.passwordStrength.defaults, options);
            this.$elem.addClass('passwordStrength');
        };

        this.checkStrength = function() {

            var password = this.$elem.val(),
                strengthScore = 0;

            if(this.settings.rules.uppercase) {
                strengthScore = password.match(/([A-Z])/) ? strengthScore += 1 : strengthScore;
            }

            if(this.settings.rules.lowercase) {
                strengthScore = password.match(/([a-z])/) ? strengthScore += 1 : strengthScore;
            }

            if(this.settings.rules.numbers) {
                strengthScore = password.match(/([0-9])/) ? strengthScore += 1 : strengthScore;
            }

            if(this.settings.rules.special) {
                strengthScore = password.match(/([!,%,&,@,#,$,^,*,?,_,~])/) ? strengthScore += 1 : strengthScore;
            }

            if(this.settings.rules.length > 0) {
                strengthScore = password.length > this.settings.rules.length ? strengthScore += 1 : strengthScore;
            }

            getStrengthMessage(strengthScore);
        };

        var getStrengthMessage = function(strengthScore) {

            var strengthMessage;

            if(strengthScore < 2) {
                strengthMessage = self.settings.messages.weak;
            }

            if(strengthScore > 2 && strengthScore <= 4) {
                strengthMessage = self.settings.messages.medium;
            }

            if(strengthScore > 4) {
                strengthMessage = self.settings.messages.strong;
            }

            showMessage(strengthMessage);
        };

        var showMessage = function(strengthMessage) {

            if ($('.password-strength-error', self.$form).length) {
                updateMessageContainer(strengthMessage);
            } else {
                var container = createMessageContainer(strengthMessage);
                $(self.$elem).after(container);
                $('.password-strength-error', self.$form).css('margin-left', self.$elem.position().left + 'px');
            }
        };

        var updateMessageContainer = function(strengthMessage) {
            $('.password-strength-error', self.$form).text(strengthMessage);
        };

        var createMessageContainer = function(strengthMessage) {
            return '<div class="password-strength-error">' + strengthMessage + '</div>';
        };
    };

    $.fn.passwordStrength = function (options) {

        return this.each(function () {

            var passwordStrength = new $.passwordStrength(this, options);
            $(this).data('passwordStrength', passwordStrength);

            passwordStrength.init();

            passwordStrength.$elem.keyup(function() {
                passwordStrength.checkStrength();
            });
        });
    };

    $.passwordStrength.defaults = {
        rules: {
          uppercase: true,
          lowercase: true,
          numbers: true,
          special: true,
          length: 8
        },
        messages: {
            weak: 'Password is too weak.',
            medium: 'Password is okay, but could be stronger.',
            strong: 'Password is strong and secure.'
        }
    };

})(jQuery);

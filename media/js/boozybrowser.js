/*

    orgz:
    ====
        BoozyBrowser: just sets booziness 

        // wasn't sure how to organize but if I make an object for each I 
        // should be able to inherit, as doing BoozyBrowser.prototype.keys.start() 
        // is apparently bad practice in JS world... hmmmmm

        BoozyLean: does all lean stuffs, inherits booziness from BoozyBrowser
        BoozyFocus: does all focus stuffs, inherits booziness from BoozyBrowser
        BoozyKeys: does all keys stuffs, inherits booziness from BoozyBrowser
        BoozyButtons: does all buttons stuffs, inherits booziness from BoozyBrowser

*/

// TODO: bust out into its own file (or something) mannnnn
// utility functions 
var someMaths = {
    boundedRandomInterval: function(min, max) {
        return Math.floor(Math.random()*(max-min+1)+min);
    },
    posNeg: function() {
        return Math.random() < 0.555555 ? -1 : 1;
    },
    randDirection: function(randSize) { 
        return this.posNeg() * Math.floor((Math.random()*randSize)+1);
    }
};

(function($, someMaths){

    var BoozyBrowser = function() {
        this.setBooziness("sober"); 
        this.setBoozyTypes(["lean", "focus", "keys", "buttons"]);
        this.setBoozySelectors({
            "keys": "textarea, input, [role='input'], [role='textarea']",   
            "buttons": ".button, button, .btn, [role='button']",
            "lean": "body",
            "focus": "body",
            "replace": true 
        });

    };

    BoozyBrowser.prototype = {
        constructor: BoozyBrowser,
        setBooziness: function(drunkLevel) {
            this.drunkLevel = drunkLevel; 
        },
        setBoozyTypes: function(boozyTypes) {
            // allow people to pass in a single string if they like
            if(Array.isArray(boozyTypes)) {
                this.boozyTypes = boozyTypes;
            } else {
                this.boozyTypes = [boozyTypes];
            }
        },
        removeBoozyTypes: function(boozyTypes) {
        },
        setBoozySelectors: function(selectorObject) {
            for(var key in selectorObject) {
                // don't want to iterate on the replace option
                if(selectorObject.hasOwnProperty(key) && key !== 'replace') {
                    if(selectorObject.replace === true) {
                        this[key]._selectors = selectorObject[key];
                    } else {
                        // make sure to handle case where selector is empty
                        if(!this[key]._selectors) {
                            this[key]._selectors = selectorObject[key];
                        } else {
                            this[key]._selectors += ', ' + selectorObject[key];
                        }
                    }
                }
            }
        },
        start: function(boozyType) {
            if(boozyType) {
                this[boozyType].start(this.drunkLevel);
            } else {
                var boozyTypes = this.boozyTypes;
                for(var i = 0, len = boozyTypes.length; i < len; i++) {
                    this[boozyTypes[i]].start(this.drunkLevel);
                }
            }
        },
        stop: function(boozyType) {
            if(boozyType) {
                this[boozyType].stop();
            } else {
                for(var i = 0, len = boozyTypes.length; i < len; i++) {
                    this[boozyTypes[i]].stop();
                }
            }
        },
        lean: {
            _leanIntervalId: undefined,
            _transitionClass: 'transition-ease-out',
            start: function(drunkLevel) {
                var lean = this,
                    $page = $(lean._selectors);

                // ensure we've cleaned up after ourselves before we start
                lean.stop();
                lean._setBooziness(drunkLevel);

                if(!$page.hasClass(lean._transitionClass)) {
                    $page.addClass(lean._transitionClass);
                }
                if(!$page.hasClass('hardware-acceleration')) {
                    $page.addClass('hardware-acceleration');
                }

                lean._goHomeYoureDrunk($page);
                lean._leanIntervalId = setInterval(function() {
                    lean._goHomeYoureDrunk($page);
                }, lean._howFast);
            },
            stop: function() {
                var lean = this;
                clearInterval(lean._leanIntervalId);
                $(lean._selectors)
                    .removeClass('rotate-' + lean._howDrunk)
                    .removeClass('rotate-neg-' + lean._howDrunk)
                    .removeClass('hardware-acceleration');
            },
            _setBooziness: function(drunkLevel) {
                var lean = this;
                if(drunkLevel === 'buzzed') {
                    lean._howDrunk = 1;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'im-fine') {
                    lean._howDrunk = 2;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'drunk') {
                    lean._howDrunk = 3;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'wooo') {
                    lean._howDrunk = 4;
                    lean._howFast = 2000;

                } else if (drunkLevel === 'blackout') {
                    lean.lean._howDrunk = 5;
                    lean._howFast = 2000;

                }
            },
            _goHomeYoureDrunk: function($whatsThat) {
                var lean = this,
                    posRotate = 'rotate-' + lean._howDrunk,
                    negRotate = 'rotate-neg-' + lean._howDrunk;

                if($whatsThat.hasClass(posRotate)) {
                    $whatsThat
                        .removeClass(posRotate)
                        .addClass(negRotate);
                } else if($whatsThat.hasClass(negRotate)){
                    $whatsThat
                        .removeClass(negRotate)
                        .addClass(posRotate);
                } else {
                    $whatsThat.addClass(posRotate);
                }
            }
        },
        focus: {
            _transitionClass: 'transition-ease-out',
            _focusIntervalId: undefined,
            _focusTimeoutId: undefined,
            start: function(drunkLevel) {
                var focus = this, 
                    $page = $(focus._selectors);
                // ensure we've cleaned up after ourselves before we start 
                focus.stop();
                focus._setBooziness(drunkLevel);


                if(!$page.hasClass(focus._transitionClass)) {
                    $page.addClass(focus._transitionClass);
                }
                
                focus._focusIntervalId = setInterval(function(){
                    focus._goHomeYoureDrunk($page);
                }, focus._displayInterval);
            },
            stop: function() {
                var focus = this;

                clearInterval(focus._focusIntervalId);
                clearInterval(focus._focusTimeoutId);

                $(focus._selectors)
                    .removeClass(focus._transitionClass)
                    .removeClass(focus._soberClass)
                    .removeClass(focus._drunkClass);
            },
            _setBooziness: function(drunkLevel) {
                var focus = this;

                if(drunkLevel === 'buzzed') {
                    focus._drunkClass = 'blur-2';
                    focus._drunkTransitionClass = 'buzzed-transition';
                    focus._displayTimeout = someMaths.boundedRandomInterval(600, 900);
                    focus._displayInterval = someMaths.boundedRandomInterval(10000, 60000);

                } else if (drunkLevel === 'im-fine') {
                    focus._drunkClass = 'blur-3';
                    focus._drunkTransitionClass = 'im-fine-transition';
                    focus._displayTimeout = someMaths.boundedRandomInterval(600, 1100);
                    focus._displayInterval = someMaths.boundedRandomInterval(10000, 40000);

                } else if (drunkLevel === 'drunk') {
                    focus._drunkClass = 'blur-4';
                    focus._drunkTransitionClass = 'drunk-transition';
                    focus._displayTimeout = someMaths.boundedRandomInterval(1500, 2000);
                    focus._displayInterval = someMaths.boundedRandomInterval(8000, 10000);

                } else if (drunkLevel === 'wooo') {
                    focus._drunkClass = 'blur-5';
                    focus._drunkTransitionClass = 'wooo-transition';
                    focus._displayTimeout = someMaths.boundedRandomInterval(2000, 3000);
                    focus._displayInterval = someMaths.boundedRandomInterval(5000, 7000);

                } else if (drunkLevel === 'blackout') {
                    focus._drunkClass = 'blur-6';
                    focus._drunkTransitionClass = 'blackout-transition';
                    focus._displayTimeout = someMaths.boundedRandomInterval(3000, 4000);
                    focus._displayInterval = someMaths.boundedRandomInterval(4000, 6000);
                }
            },
            _goHomeYoureDrunk: function($whatsThat) {
                $whatsThat
                    .removeClass(focus._soberClass)
                    .addClass(focus._drunkClass);
                focus._focusTimeoutId = setTimeout(function(){
                    $whatsThat
                        .removeClass(focus._drunkClass)
                        .addClass(focus._soberClass);
                }, focus._displayTimeout);
            }
        },
        keys: {
            _abc: 'abcdefghijklmnopqrstuvwxyz'.split(''),
            _boozySpace: 'keyup.boozy-space',
            _keyCounter: 0,
            _randomInterval: 10,
            start: function(drunkLevel) {
                var keys = this;
                // ensure we've cleaned up after ourselves before we start
                keys.stop();
                keys._setBooziness(drunkLevel);

                $(boozy._selectors)
                    .on(keys._boozySpace, {"keys": keys}, keys._goHomeYoureDrunk);
                keys._setRandomInterval();
            },
            _setBooziness: function(drunkLevel) {
                var keys = this;

                if(drunkLevel === 'buzzed') {
                    keys._howDrunk = 50;
                    keys._howSober = 80;

                } else if (drunkLevel === 'im-fine') {
                    keys._howDrunk = 30;
                    keys._howSober = 40;

                } else if (drunkLevel === 'drunk') {
                    keys._howDrunk = 20;
                    keys._howSober = 30;

                } else if (drunkLevel === 'wooo') {
                    keys._howDrunk = 15;
                    keys._howSober = 25;

                } else if (drunkLevel === 'blackout') {
                    keys._howDrunk = 8;
                    keys._howSober = 14;

                }
            },
            _setRandomInterval: function() {
                var keys = this;

                // higher value == less drunk cause higher value lets you type more without type-o's
                keys._randomInterval = someMaths.boundedRandomInterval(keys._howDrunk, keys._howSober);
            },
            _goHomeYoureDrunk: function(event) {
                var keys = event.data.keys;

                if(keys._keyCounter == keys._randomInterval){
                    var $textField = $(keys),
                        randomBurst = Math.floor((Math.random()*3)+1),
                        randomLetters = '',
                        boozyType = $textField.val();

                    for(j=0; j<randomBurst; j++) {
                        randCount = Math.floor((Math.random()*26));
                        randomLetters += keys._abc[randCount];
                    }

                    $textField.val(boozyType + randomLetters);

                    keys._setRandomInterval();
                    keys._keyCounter = 0;
                }
                keys._keyCounter ++;
            },
            stop: function() {
                $(boozy._selectors).off(this._boozyNamespace);
            }
        },
        buttons: {
            _boozyNamespace:'mouseover.boozy-space',
            start: function(drunkLevel) {
                var buttons = this;
                // ensure we've cleaned up after ourselves before we start
                buttons.stop();
                buttons._setBooziness(drunkLevel);

                $(boozy._selectors)
                    .on(buttons._boozyNamespace, {"buttons": buttons}, buttons._goHomeYoureDrunk);
            },
        _setBooziness: function(drunkLevel) {
                var buttons = this;

                if(drunkLevel === 'buzzed') {
                    buttons._howDrunk = 0;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'im-fine') {
                    buttons._howDrunk = 2;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'drunk') {
                    buttons._howDrunk = 15;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'wooo') {
                    buttons._howDrunk = 25;
                    buttons._howFast = 250;

                } else if (drunkLevel === 'blackout') {
                    buttons._howDrunk = 140;
                    buttons._howFast = 350;

                }
            },
            _goHomeYoureDrunk: function(event) {
                var buttons = event.data.buttons, 
                    $button = $(this),
                    randSize = buttons._howDrunk,
                    moveLeft = someMaths.randDirection(randSize),
                    moveTop = someMaths.randDirection(randSize),
                    animationOffset, animationTop, animationLeft;

                $button
                    .animate({
                        "left": "+=" + moveLeft + "px", 
                        "top": "+=" + moveTop + "px", 
                    },{
                        duration: buttons._howFast,
                        complete: function() {
                            // if buttons leave the clickable region 
                            // of a page bounce 'em right back! (only top/left)
                            animationOffset = $button.offset(); 
                            animationTop = animationOffset.top;
                            animationLeft = animationOffset.left;
                            if(animationTop < 0) {
                                $button
                                    .animate({
                                        "left": moveLeft + "px", 
                                        "top": "5px", 
                                    },{
                                        duration: buttons._howFast
                                    });
                            }
                            if(animationLeft < 0) {
                                $button
                                    .animate({
                                        "left": "5px", 
                                        "top": moveTop + "px", 
                                    },{
                                        duration: buttons._howFast
                                    });
                            }
                        }
                    });
            },
            stop: function() {
                var buttons = this;
                $(buttons._selectors)
                    .off(buttons._boozyNamespace);
            }
        }
    };

    window.boozy = { 
        _typingSelectors: 'textarea, input, [role="input"], [role="textarea"]',
        _buttonSelectors: '.button, button, .btn, [role="button"]',
        _pageSelectors: 'body',
        init: function() {
            // only initialize after the menu is loaded
            boozy._menu.init();

            $('.button').click(function() {
                $('.button').removeClass('pressed');
                $(this).addClass('pressed');
            });

        },
        _howDrunkHandler: function(event) {
            var $drunkDrop =  $(event.target).closest('.drunk-level'),
                $controlContainer = $drunkDrop.parents('.control'),
                controlId = $controlContainer.attr('id'),
                drunkLevel = $drunkDrop.val(),
                drunkObject = {
                    "controlId": controlId,
                    "drunkLevel": drunkLevel
                };
            boozy._howDrunk(drunkObject); 
        },
        _notDrunk: 'sober',
        _drunkLevels: ['buzzed', 'im-fine', 'drunk', 'wooo', 'blackout'],
        _howDrunk: function(drunkObject) {
            if(drunkObject) {
                if(drunkObject.controlId === 'bulk') {
                    // change them all
                    $('.boozy-menu .drunk-level.single-control').val(drunkObject.drunkLevel).change();
                } else if(drunkObject.drunkLevel === boozy._notDrunk) {
                    // be sober
                    boozy[drunkObject.controlId].stop();
                } else if(_.contains(boozy._drunkLevels, drunkObject.drunkLevel)) {
                    // be drunk
                    boozy[drunkObject.controlId].start(drunkObject.drunkLevel);
                }
                // I am god! (lol #ihtw)
            }
        },
        // menu control rendering/event handling
        _menu: {
            init: function() {
                var $boozyMenuTemplate = $('#boozy-menu-template');
                $('html').append($boozyMenuTemplate.html());

                $('.boozy-menu .drunk-level')
                    .on('change', boozy._howDrunkHandler);
                $('.boozy-menu .hide')
                    .on('click', boozy._menu.handleHideClicks);
                $('.boozy-menu .show')
                    .on('click', boozy._menu.handleShowClicks);
            },
            handleHideClicks: function(event) {
                var $menu = $('.boozy-menu');
                $menu.addClass('hide-menu');
                // TODO: these toggles suck, come up with something better
                $('.hide', $menu).toggleClass('fade-out');
                $('.show', $menu).toggleClass('fade-out');
            },
            handleShowClicks: function(event) {
                var $menu = $('.boozy-menu');
                $menu.removeClass('hide-menu');
                // TODO: these toggles suck, come up with something better
                $('.hide', $menu).toggleClass('fade-out');
                $('.show', $menu).toggleClass('fade-out');
            }
        }
    };

    $(document).ready(function() {
        window.BoozyBrowser = BoozyBrowser;     
    });

})(jQuery, someMaths);

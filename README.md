# boozybrowser
_This is just about teaching the internet how to drink._
<a href="http://www.boozybrowser.com" target="_blank">Check Out The Demo</a>

## example usage!! \o/ 
### (tech spec I guess)
``` JavaScript
// init boozy object, brah!
var bb = new BoozyBrowser();
// choose a string to set booziness, default will be sober
// NOTE: re-setting booziness will trigger a start/stop for all 
// boozy functions
bb.setBooziness("sober | buzzed | drunk | wooo | blackout");
// pass in an array (or single string if you're just doin one)
bb.setBoozyTypes(["lean", "focus", "keys", "buttons"]);
// alternatively you can remove boozy types from the array after the fact (NOTE: only for lean and focus ofr some reason :/)
// NOTE: removing boozy type will stop that functions boozy shenanigans (double NOTE: not yet!!!)
bb.removeBoozyTypes(["lean", "focus", "keys", "buttons"]);
// set selectors and whether they should be additive or just replace, 
// below are the current default selectors
bb.setBoozySelectors({
    "keys": "textarea, input, [role='input'], [role='textarea']",   
    "buttons": ".button, button, .btn, [role='button']",
    "lean": "body",
    "focus": "body",
    "replace": false | true // optional: replace current selectors, defautlts to false
});
// start all boozy functions
bb.start();
// stop all boozy functions
bb.stop();
// or start/stop individual functions
bb.stop('lean');
bb.start('lean');
``` 

## drunk classifications 
    * sober: everything off
    * buzzed: slightly noticible
        - keys: slight type-o's (so slight the user might think it's their type-o)
        - buttons: very slight motion.. noticible but very much usuable (buttons should stay within their region desite number of hovers)
        - lean: no lean
        - focus: no focus
    * I'm fine: definitely noticiable but not annoying 
        - keys: noticible type-o's (user should now noticed but still not really be annoyed by them)
        - buttons: noticible motion.. still usable but close to annoying
        - lean: very slight intermittent lean.. kinda like small flashes of rolls
        - focus: very slight intermittent blurring in and out.. not enough to prevent reading and slight enough that most may not notice
    * drunk: annoying but useful
        - keys: type-o's are now impossible to ignore and happen in seemingly every word
        - buttons: quite dynamic motion, should border on frustrating, perhaps random keys are more difficult to chase down than others
        - lean: lean should be in full effect, the page should sway back and forth constantly but not by too much
        - focus: focus now throbs in and out.  The max blur should still be fairly  readable
    * wooo!: holy shit I can barely use this webpage
        - keys: type-o's should happen with every word, in fact a fair number of words should have more than one injected type-o
        - buttons: buttons should now be close to impossible to click.. perhaps some random buttons are easier to click
        - lean: the sway should be constant and quite large.. the user should be getting sea sick at this point
        - focus: focus should throb in and out, with the max blur being impossible to read
    * blackout drunk: completely unusable (black sceen? no.... hmm)

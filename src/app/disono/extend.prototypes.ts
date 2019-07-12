/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */

interface Date {
    addHours(hour: any): any;

    minusHours(hour: any): any;
}

// add hours
Date.prototype.addHours = function (h) {
    this.setTime(this.getTime() + (h * 60 * 60 * 1000));
    return this;
};

// minus hours
Date.prototype.minusHours = function (h) {
    this.setTime(this.getTime() - (h * 60 * 60 * 1000));
    return this;
};

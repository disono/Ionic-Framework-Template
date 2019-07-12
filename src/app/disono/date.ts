/**
 * @author          Archie, Disono (webmonsph@gmail.com)
 * @link            https://webmons.com
 * @copyright       Archie Disono - Webmons Development Studio. (webmons.com), 2018
 * @license         Apache, 2.0 https://github.com/disono/Ionic-Framework-Template/blob/master/LICENSE
 */
import * as moment from 'moment';
import 'moment-timezone';

export class DateHelper {
    /**
     * Sever time and date difference
     *
     * @param serverTime
     */
    public timeDifferenceInSeconds(serverTime) {
        // let's use the server server_timestamp
        let server_time = new Date(this.SQLDateToJS(serverTime));
        let current_time = new Date();

        // let's check the difference on date-time(seconds)
        // between our phone and server date-time
        // cast string to number +your_string
        return Math.floor((current_time.getTime() - server_time.getTime()) / 1000);
    }

    /**
     * SQL date to JS date
     *
     * @param sqlDate
     * @constructor
     */
    public SQLDateToJS(sqlDate) {
        return new Date(Date.parse(sqlDate.replace(/-/g, "/")));
    }

    /**
     * Get the current timezone
     * /\((.*)\)/.exec(new Date().toString())[1].replace(" Standard Time", "")
     */
    public getTimezone() {
        return moment.tz.guess();
    }
}
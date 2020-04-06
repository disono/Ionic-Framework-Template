export class Configurations {
    public app = 'app_name';

    public browser = true;
    public production = false;

    public productionURI = '';
    public developmentURI = 'http://domain:40101';
    public socketURI = 'http://domain:4000';

    public apiPath = '/api/v1/';

    public uri() {
        return (this.production === true ? this.productionURI : this.developmentURI) + this.apiPath;
    }
}
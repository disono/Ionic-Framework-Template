export class Configurations {
    public app = 'app_name';

    public browser = true;
    public production = false;

    public developmentURI = 'http://localhost:port';
    public productionURI = '';

    public apiPath = '/api/v1/';

    public uri() {
        return (this.production === true ? this.productionURI : this.developmentURI) + this.apiPath;
    }
}
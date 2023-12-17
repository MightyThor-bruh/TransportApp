import { createConnection } from 'mongoose';
import { DB_MODELS } from './db.models.js'; 

class DataBase {
    db_connection;
    db_models;
    constructor(db_url) {
        this.db_connection = createConnection(db_url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        this.db_models = DB_MODELS;
    }

    getModel(collection) {
        const model = this.db_models[collection];
        return this.db_connection.model(model.name, model.scheme);
    }
}

export default DataBase;
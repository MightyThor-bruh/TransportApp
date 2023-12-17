import DriverSchema from './schemas/drivers.schema.js';
import UserSchema from './schemas/user.schema.js';
import { TransportRouteSchema, TransportTypeSchema } from './schemas/transport.scheme.js';

const DB_MODELS = {
    Drivers: {
        name: "Drivers",
        scheme: DriverSchema
    },
    Routes: {
        name: "transport_routes",
        scheme: TransportRouteSchema
    },
    Users: {
        name: "Users",
        scheme: UserSchema
    },
    Transport: {
        name: "transporttypes",
        scheme: TransportTypeSchema
    }
}

export {
    DB_MODELS
}
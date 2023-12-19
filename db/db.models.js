import DriverSchema from './schemas/drivers.schema.js';
import UserSchema from './schemas/user.schema.js';
import { TransportRouteSchema, TransportTypeSchema } from './schemas/transport.scheme.js';
import { TripsSchema, StatusSchema } from './schemas/trips.schema.js';
import BookmarksSchema from './schemas/bookmarks.schema.js';

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
    },
    Trips: {
        name: "trips",
        scheme: TripsSchema
    },
    Statuses: {
        name: "statuses",
        scheme: StatusSchema
    },
    Bookmarks: {
        name: "bookmarks",
        scheme: BookmarksSchema
    }
}

export {
    DB_MODELS
}
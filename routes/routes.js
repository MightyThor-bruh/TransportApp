const routes = {
    index: "/",
    schedule: {
        list: "/schedule",
        weekend: "/schedule-weekend"
    },    
    user: {
        login: "/login",
        signin: "/register",
        logout: "/logout",
        page: "/autouser",
        routes: "/user/:type",
        type: "/types"
    },
    transport: {
        type: "/types",
        routes: "/transport/:type",
        protected: "/protected-route",
        stops: "/route-stops"
    },
    admin: {
        index: "/admin",
        bus: "/adminbus",
        addroute: "/addroute",
        addtrip: "/addtrip",
        schedule: "/adminschedule",
        trip: "/admintrip"
    },
    driver: {
        list: "/drivers",
        index: "/autodriver"
    }
}


export default routes;
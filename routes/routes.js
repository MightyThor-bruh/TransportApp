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
        page: "/autouser"
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
        schedule: "/adminschedule",
        trip: "/admintrip"
    },
    driver: {
        list: "/drivers",
        index: "/autodriver"
    }
}


export default routes;
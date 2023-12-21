const routes = {
    index: "/",
    schedule: {
        list: "/schedule-weekday",
        weekend: "/schedule-weekend"
    },    
    user: {
        login: "/login",
        signin: "/register",
        logout: "/logout",
        page: "/autouser",
        routes: "/user/:type",
        type: "/types",
        newbookmark: "/newbookmark/:number",
        bookmarks: "/bookmarks",
        stops: "/user/route-stops/:number"

    },
    transport: {
        type: "/types",
        routes: "/transport/:type",
        protected: "/protected-route",
        stops: "/route-stops/:number"
    },
    admin: {
        index: "/admin",
        bus: "/adminbus",
        addroute: "/addroute",
        addtrip: "/addtrip",
        trip: "/admintrip",
        deleteroute: "/deleteroute",
        updateroute: "/updateroute",
        addschedule: "/addschedule",
        updatetrip: "/updatetrip",
        deletetrip: "/deletetrip"
    },
    driver: {
        list: "/drivers",
        index: "/autodriver"
    }
}


export default routes;
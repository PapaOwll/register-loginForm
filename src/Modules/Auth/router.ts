export default [
    {
        path: "/login/:phone",
        name: "Login",
        component: import("../Auth/Pages/Login.vue"),
        meta: {
            simple: true,
        },
    },
];

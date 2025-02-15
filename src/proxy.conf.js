
const PROXY_CONFIG = [
    {
        context: [
        '/getBooks',
        ],

        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        "^/": ""
        }
    },
    
    {
        context: [
        '/api/books/search/**',
        ],

        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        "^/": ""
        }
    },

    {
        context: [
            '/api/books/books/getDetails',
        ],

        target: "http://localhost:8080",
        secure: false,
        changeOrigin: true,
        pathRewrite: {
        "^/": ""
        }
    },
]



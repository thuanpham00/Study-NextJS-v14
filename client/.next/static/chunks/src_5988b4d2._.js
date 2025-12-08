(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push([typeof document === "object" ? document.currentScript : undefined, {

"[project]/src/config.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/index.js [app-client] (ecmascript) <locals>");
;
const configSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    NEXT_PUBLIC_API_ENDPOINT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
});
const configProject = configSchema.safeParse({
    NEXT_PUBLIC_API_ENDPOINT: ("TURBOPACK compile-time value", "http://localhost:4000")
});
if (!configProject.success) {
    console.error(configProject.error.issues);
    throw new Error("Các giá trị khai báo trong file .env không hợp lệ");
}
const envConfig = configProject.data;
const __TURBOPACK__default__export__ = envConfig;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/lib/http.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__),
    "sessionToken": (()=>sessionToken)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config.ts [app-client] (ecmascript)");
;
class HttpError extends Error {
    status;
    payload;
    constructor({ status, payload }){
        super(`HTTP Error`);
        this.status = status;
        this.payload = payload;
    }
}
const request = async (method, url, options)=>{
    const body = options?.body ? JSON.stringify(options.body) : undefined;
    const baseHeaders = {
        "Content-Type": "application/json"
    };
    const baseUrl = options?.baseUrl === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
    const fullUrl = url.startsWith("/") ? `${baseUrl}${url}` : `${baseUrl}/${url}`;
    const res = await fetch(fullUrl, {
        ...options,
        headers: {
            ...baseHeaders,
            ...options?.headers
        },
        method,
        body
    });
    const payload = await res.json();
    const data = {
        status: res.status,
        payload
    };
    if (!res.ok) {
        throw new HttpError(data);
    }
    return data;
};
class SessionToken {
    token = "";
    get value() {
        return this.token;
    }
    set value(token) {
        // nếu gọi method này ở server thì sẽ bị lỗi - chỉ chạy ở client
        if ("TURBOPACK compile-time falsy", 0) {
            "TURBOPACK unreachable";
        }
        this.token = token;
    }
}
const sessionToken = new SessionToken();
const http = {
    get (url, options) {
        return request("GET", url, options);
    },
    post (url, body, options) {
        return request("POST", url, {
            ...options,
            body
        });
    },
    put (url, body, options) {
        return request("PUT", url, {
            ...options,
            body
        });
    },
    delete (url, body, options) {
        return request("DELETE", url, {
            ...options,
            body
        });
    }
};
const __TURBOPACK__default__export__ = http;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/apiRequest/account.ts [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-client] (ecmascript)");
;
const accountApi = {
    me: (sessionToken)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].get("/account/me", {
            headers: {
                Authorization: `Bearer ${sessionToken}`
            }
        });
    }
};
const __TURBOPACK__default__export__ = accountApi;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/src/app/me/profile.tsx [app-client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>Profile)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$apiRequest$2f$account$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/apiRequest/account.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/AppProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
function Profile() {
    _s();
    const { sessionToken } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Profile.useEffect": ()=>{
            const fetchReq = {
                "Profile.useEffect.fetchReq": async ()=>{
                    await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$apiRequest$2f$account$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].me(sessionToken || "");
                }
            }["Profile.useEffect.fetchReq"];
            fetchReq();
        }
    }["Profile.useEffect"], [
        sessionToken
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: "profile"
    }, void 0, false, {
        fileName: "[project]/src/app/me/profile.tsx",
        lineNumber: 15,
        columnNumber: 10
    }, this);
}
_s(Profile, "0xWf2bwYHjIBOu3TERQ55BuOO0I=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$AppProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useAppContext"]
    ];
});
_c = Profile;
var _c;
__turbopack_context__.k.register(_c, "Profile");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
}]);

//# sourceMappingURL=src_5988b4d2._.js.map
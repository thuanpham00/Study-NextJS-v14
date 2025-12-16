module.exports = {

"[project]/.next-internal/server/app/products/[id]/page/actions.js [app-rsc] (server actions loader, ecmascript)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
}}),
"[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/favicon.ico.mjs { IMAGE => \"[project]/src/app/favicon.ico (static in ecmascript)\" } [app-rsc] (structured image object, ecmascript)"));
}}),
"[project]/src/app/layout.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/layout.tsx [app-rsc] (ecmascript)"));
}}),
"[project]/src/config.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/zod/index.js [app-rsc] (ecmascript) <locals>");
;
const configSchema = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].object({
    NEXT_PUBLIC_API_ENDPOINT: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].string()
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
}}),
"[externals]/buffer [external] (buffer, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("buffer", () => require("buffer"));

module.exports = mod;
}}),
"[externals]/stream [external] (stream, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("stream", () => require("stream"));

module.exports = mod;
}}),
"[externals]/util [external] (util, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("util", () => require("util"));

module.exports = mod;
}}),
"[externals]/crypto [external] (crypto, cjs)": (function(__turbopack_context__) {

var { g: global, __dirname, m: module, e: exports } = __turbopack_context__;
{
const mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}}),
"[project]/src/lib/utils.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s({
    "cn": (()=>cn),
    "decodeJWT": (()=>decodeJWT),
    "handleErrorApi": (()=>handleErrorApi),
    "normalizePath": (()=>normalizePath)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/sonner/dist/index.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/jsonwebtoken/index.js [app-rsc] (ecmascript)");
;
;
;
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
const handleErrorApi = ({ errors, setError, duration })=>{
    if (errors instanceof __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["EntityError"] && setError) {
        errors.payload.errors.forEach((item)=>{
            setError(item.field, {
                type: "server",
                message: item.message
            });
        });
    } else {
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$sonner$2f$dist$2f$index$2e$mjs__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["toast"].error("Lỗi", {
            description: errors?.payload?.message || "Có lỗi xảy ra, vui lòng thử lại sau",
            duration: duration || 5000
        });
    }
};
const normalizePath = (path)=>{
    return path.startsWith("/") ? path.slice(1) : `/${path}`;
};
const decodeJWT = (token)=>{
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$jsonwebtoken$2f$index$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].decode(token);
};
}}),
"[project]/src/lib/http.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
/* eslint-disable @typescript-eslint/no-explicit-any */ __turbopack_context__.s({
    "EntityError": (()=>EntityError),
    "HttpError": (()=>HttpError),
    "clientSessionToken": (()=>clientSessionToken),
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/config.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/utils.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$api$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__$3c$module__evaluation$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/api/navigation.react-server.js [app-rsc] (ecmascript) <module evaluation>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/components/navigation.react-server.js [app-rsc] (ecmascript)");
;
;
;
const ENTITY_ERROR_STATUS = 422;
const AUTHENTICATION_ERROR_STATUS = 401;
class HttpError extends Error {
    status;
    payload;
    constructor({ status, payload }){
        super(`HTTP Error`);
        this.status = status;
        this.payload = payload;
    }
}
class EntityError extends HttpError {
    status;
    payload;
    constructor({ status, payload }){
        super({
            status,
            payload
        });
        this.status = ENTITY_ERROR_STATUS;
        this.payload = payload;
    }
}
class ClientSessionToken {
    token = "";
    _expiresAt = new Date().toISOString();
    get value() {
        return this.token;
    }
    set value(token) {
        // nếu gọi method này ở server thì sẽ bị lỗi - chỉ chạy ở client
        if ("TURBOPACK compile-time truthy", 1) {
            throw new Error("Cannot set session token on server side");
        }
        this.token = token;
    }
    get expiresAt() {
        return this._expiresAt;
    }
    set expiresAt(expiresAt) {
        if ("TURBOPACK compile-time truthy", 1) {
            throw new Error("Cannot set session token on server side");
        }
        this._expiresAt = expiresAt;
    }
}
const clientSessionToken = new ClientSessionToken();
const request = async (method, url, options)=>{
    const body = options?.body ? options?.body instanceof FormData ? options.body : JSON.stringify(options.body) : undefined;
    const baseHeaders = body instanceof FormData ? {
        Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ""
    } : {
        "Content-Type": "application/json",
        Authorization: clientSessionToken.value ? `Bearer ${clientSessionToken.value}` : ""
    };
    const baseUrl = options?.baseUrl === undefined ? __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$config$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].NEXT_PUBLIC_API_ENDPOINT : options.baseUrl;
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
    // đưa về 1 kiểu dữ liệu response chung
    // chỉ có next client mới gọi được tới next server và lấy được cookie ra
    if (!res.ok) {
        if (res.status === ENTITY_ERROR_STATUS) {
            throw new EntityError(data);
        } else if (res.status === AUTHENTICATION_ERROR_STATUS) {
            // xử lý token hết hạn hoặc ko hợp lệ thì logout - xử lý ở client
            if ("TURBOPACK compile-time falsy", 0) {
                "TURBOPACK unreachable";
            } else {
                // xử lý token hết hạn hoặc ko hợp lệ thì logout - xử lý ở server
                const sessionToken = options?.headers?.Authorization.split("Bearer ")[1];
                (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$components$2f$navigation$2e$react$2d$server$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["redirect"])(`/logout?sessionToken=${sessionToken}`); // chạy ở server
            }
        } else {
            throw new HttpError(data);
        }
    }
    if ("undefined" !== undefined) {
        // chỉ chạy ở client
        if ([
            "/auth/login",
            "/auth/register"
        ].some((item)=>item === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePath"])(url))) {
            clientSessionToken.value = payload.data.token;
            clientSessionToken.expiresAt = payload.data.expiresAt;
        } else if ("/auth/logout" === (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["normalizePath"])(url)) {
            clientSessionToken.value = "";
            clientSessionToken.expiresAt = new Date().toISOString();
        }
    }
    return data;
};
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
}}),
"[project]/src/apiRequest/product.ts [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/http.ts [app-rsc] (ecmascript)");
;
const productApi = {
    getList: ()=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get("/products");
    },
    getDetail: (id)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].get(`/products/${id}`);
    },
    create: (body)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post("/products", body);
    },
    uploadImage: (body)=>{
        return __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$http$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].post("/media/upload", body);
    }
};
const __TURBOPACK__default__export__ = productApi;
}}),
"[project]/src/app/products/[id]/page.tsx [app-rsc] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>ProductDetailPage)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/rsc/react-jsx-dev-runtime.js [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$apiRequest$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/apiRequest/product.ts [app-rsc] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/image.js [app-rsc] (ecmascript)");
;
;
;
async function ProductDetailPage({ params }) {
    let product = null;
    try {
        const { payload } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$apiRequest$2f$product$2e$ts__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"].getDetail(Number(params.id));
        product = payload.data;
    } catch (error) {
        console.log(error);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-2",
        children: [
            !product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: "Không tìm thấy sản phẩm..."
            }, void 0, false, {
                fileName: "[project]/src/app/products/[id]/page.tsx",
                lineNumber: 14,
                columnNumber: 20
            }, this),
            product && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "ID: ",
                            product.id
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 17,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        children: product.name
                    }, void 0, false, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 18,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: product.description
                    }, void 0, false, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 19,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$image$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["default"], {
                        src: product.image,
                        alt: product.name,
                        width: 200,
                        height: 200,
                        className: "w-32 h-32 object-cover"
                    }, void 0, false, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 20,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "Giá: ",
                            product.price
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 27,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "Ngày tạo: ",
                            new Date(product.createdAt).toLocaleDateString("vi-VN")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 28,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$rsc$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$rsc$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            "Ngày cập nhật: ",
                            new Date(product.updatedAt).toLocaleDateString("vi-VN")
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/products/[id]/page.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/products/[id]/page.tsx",
                lineNumber: 16,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/products/[id]/page.tsx",
        lineNumber: 13,
        columnNumber: 5
    }, this);
}
}}),
"[project]/src/app/products/[id]/page.tsx [app-rsc] (ecmascript, Next.js server component)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/src/app/products/[id]/page.tsx [app-rsc] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot-of-the-server%5D__b0232791._.js.map
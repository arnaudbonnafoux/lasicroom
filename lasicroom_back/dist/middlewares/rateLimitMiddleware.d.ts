declare const generalLimiter: import("express-rate-limit").RateLimitRequestHandler;
declare const loginLimiter: import("express-rate-limit").RateLimitRequestHandler;
declare const stripeLimiter: import("express-rate-limit").RateLimitRequestHandler;
declare const formLimiter: import("express-rate-limit").RateLimitRequestHandler;
export { generalLimiter, loginLimiter, stripeLimiter, formLimiter };

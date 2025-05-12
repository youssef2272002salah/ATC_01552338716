"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const logging_1 = require("./utils/logging");
const swagger_1 = require("./config/swagger");
const compression_1 = __importDefault(require("compression"));
const security_1 = __importDefault(require("./utils/security"));
require("reflect-metadata");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, compression_1.default)());
// Setup Swagger
(0, swagger_1.setupSwagger)(app);
// Apply security middleware
(0, security_1.default)(app);
// Logging
app.use(logging_1.morganMiddleware);
// Routes
const routes_1 = require("./routes/routes");
(0, routes_1.setupRoutes)(app);
// Global error handler
const errorHandler_1 = require("./utils/errorHandler");
app.use(errorHandler_1.globalErrorHandler);
process.on('SIGINT', async () => {
    console.log('Shutting down gracefully...');
    await mongoose_1.default.disconnect();
    process.exit(0);
});
exports.default = app;
//# sourceMappingURL=app.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
const dbConnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            maxPoolSize: 20,
        });
        console.log('database connected\n ------------------------------------------');
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
};
exports.default = dbConnect;
//# sourceMappingURL=database.js.map
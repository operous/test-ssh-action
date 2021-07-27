"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lib_1 = require("./lib");
const core_1 = require("@actions/core");
lib_1.main().catch((err) => {
    core_1.setFailed(err);
});
//# sourceMappingURL=main.js.map
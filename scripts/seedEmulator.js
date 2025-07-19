"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var firebase_admin_1 = require("firebase-admin");
var node_fetch_1 = require("node-fetch");
var path = require("path");
var fs = require("fs");
// Path to your service account key
var serviceAccountPath = path.resolve(__dirname, "../firebase/prepwise-d8190-firebase-adminsdk-fbsvc-5bf1a95117.json");
if (!fs.existsSync(serviceAccountPath)) {
    console.error("Service account file not found:", serviceAccountPath);
    process.exit(1);
}
firebase_admin_1.default.initializeApp({
    credential: firebase_admin_1.default.credential.cert(require(serviceAccountPath)),
});
var db = firebase_admin_1.default.firestore();
var AUTH_EMULATOR_URL = "http://127.0.0.1:9099/identitytoolkit.googleapis.com/v1/accounts:signUp?key=fake-api-key";
function createTestUser(email, password) {
    return __awaiter(this, void 0, void 0, function () {
        var res, data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, node_fetch_1.default)(AUTH_EMULATOR_URL, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ email: email, password: password, returnSecureToken: true }),
                    })];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    data = _a.sent();
                    if (!data.localId)
                        throw new Error("Failed to create user: " + JSON.stringify(data));
                    return [2 /*return*/, data.localId];
            }
        });
    });
}
function seed() {
    return __awaiter(this, void 0, void 0, function () {
        var email, password, userId;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    email = "testuser@example.com";
                    password = "password123";
                    console.log("Creating test user...");
                    return [4 /*yield*/, createTestUser(email, password)];
                case 1:
                    userId = _a.sent();
                    console.log("Test user created with UID:", userId);
                    console.log("Adding sample interview...");
                    return [4 /*yield*/, db.collection("interviews").add({
                            userId: userId,
                            createdAt: firebase_admin_1.default.firestore.Timestamp.now(),
                            type: "text",
                            logs: [],
                        })];
                case 2:
                    _a.sent();
                    console.log("Sample interview added.");
                    return [2 /*return*/];
            }
        });
    });
}
seed().then(function () {
    console.log("Seeding complete!");
    process.exit(0);
}).catch(function (err) {
    console.error("Seeding failed:", err);
    process.exit(1);
});

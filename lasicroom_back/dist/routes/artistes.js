"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const artisteControleur = __importStar(require("../controleurs/artiste_controleur"));
const compressionImage_1 = __importDefault(require("../middlewares/compressionImage"));
const multerConfig_1 = __importDefault(require("../middlewares/multerConfig"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const isAdmin_1 = __importDefault(require("../middlewares/isAdmin"));
const routeur = express_1.default.Router();
// Route publique : tout le monde peut voir la liste des artistes
routeur.get("/", artisteControleur.obtenirArtiste);
// Routes sécurisées : seul admin peut créer, modifier ou supprimer
routeur.post("/", authMiddleware_1.default, isAdmin_1.default, multerConfig_1.default.single("photo"), compressionImage_1.default, artisteControleur.creerArtiste);
routeur.put("/:id", authMiddleware_1.default, isAdmin_1.default, multerConfig_1.default.single("photo"), compressionImage_1.default, artisteControleur.mettreAJourArtiste);
routeur.delete("/:id", authMiddleware_1.default, isAdmin_1.default, artisteControleur.supprimerArtiste);
exports.default = routeur;
//# sourceMappingURL=artistes.js.map
import multer from "multer";

// TODO: Migrer la configuration de Multer

const upload = multer({ dest: "photos_artistes/" });

export default upload;

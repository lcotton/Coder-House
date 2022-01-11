import dotenv from 'dotenv'

dotenv.config({path: '/Users/lcotton/Documents/Git-Hub/Coder-House/14-Proceso-Principal-Servidor/src/.env'});

const credenciales = {
    MONGO_ATLAS_USER: process.env.MONGO_ATLAS_USER || 'coderhouse',
    MONGO_ATLAS_PASSWORD: process.env.MONGO_ATLAS_PASSWORD || 'coderhouse',
    MONGO_ATLAS_CLUSTER: process.env.MONGO_ATLAS_CLUSTER || 'coderhouse.naatu.mongodb.net',
    MONGO_ATLAS_DBNAME: process.env.MONGO_ATLAS_DBNAME || 'blog',
    SESSION_SECRET_KEY: process.env.SESSION_SECRET_KEY || 'coderhouse'
};

export { credenciales }
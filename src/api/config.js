import 'dotenv/config'

const backend_local = process.env.VITE_BACKEND_URI_LOCAL;
const backend_prod = process.env.VITE_BACKEND_URI_PROD;

export {
    backend_local,
    backend_prod
}

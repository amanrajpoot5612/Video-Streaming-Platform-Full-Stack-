const backend_local = import.meta.env.VITE_BACKEND_URI_LOCAL || null;
const backend_prod = import.meta.env.VITE_BACKEND_URI_PROD;

export {
    backend_local,
    backend_prod
}

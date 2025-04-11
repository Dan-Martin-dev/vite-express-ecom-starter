import { startServer } from './server.js';
// Future-proof for:
// - Cluster mode (Node.js worker_threads)
// - Serverless entry (Lambda/Cloudflare)
startServer();

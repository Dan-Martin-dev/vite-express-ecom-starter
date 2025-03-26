import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import routes from './routes/index.js'; // Use relative import
import { errorHandler } from './middleware/error-handler.js'; // Use relative import
// Load environment variables
dotenv.config();
// Create Express app
const app = express();
const port = process.env.PORT || 3000;
// Apply middleware
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Apply routes
app.use('/api', routes);
// Apply error handler
app.use(errorHandler);
// Start server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});

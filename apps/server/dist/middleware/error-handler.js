export const errorHandler = (err, req, res, next) => {
    const status = 'status' in err ? err.status : 500;
    const message = err.message || 'Something went wrong';
    console.error(`[ERROR] ${status}: ${message}`);
    res.status(status).json({
        status,
        message
    });
};
//# sourceMappingURL=error-handler.js.map
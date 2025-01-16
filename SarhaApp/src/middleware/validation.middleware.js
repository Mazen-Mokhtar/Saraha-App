export const validation = (schema) => {
    return (req, res, next) => {
        const allRequst = { ...req.body, ...req.params, ...req.query };
        if (req.headers.authorization) {
            allRequst.authorization = req.headers.authorization;
        }
        const ruslt = schema.validate(allRequst, { aborEarly: false })
        if (ruslt.error) {
            return next({ message: ruslt.error.details, cause: 400 });
        }
        return next();
    }
}
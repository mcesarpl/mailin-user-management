import express from 'express';

class createHealthRouter {
    public static route() {
        const router = express.Router();

        router.get('/', (req, res) => {
            res.status(200).send();
        });

        return router;
    }
}

export default createHealthRouter;
import { Router } from 'express'

const router = Router()

router.get('/', (req, res) => {
    res.send({ message: 'Request recived.'})
})

export default router
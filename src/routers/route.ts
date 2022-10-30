import express from 'express'
import { listCards, getCard, findCardsByName } from '../handlers/card.handler'

const router = express.Router()

router.get('/cards', listCards)
router.get('/cards/:id', getCard)
router.get('/cards/:name', findCardsByName)

export default router
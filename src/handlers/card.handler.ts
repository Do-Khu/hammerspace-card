import { Response, Request } from 'express'
import { CardRepository } from '../utils/repositories/cardRepository'

const cardRepository = new CardRepository()

export const listCards = async(req: Request, res: Response) =>{
    console.log("GET api/cards")
    
    // TODO: adicionar autenticação, OU comunicação por menssageria
    const cards = await cardRepository.getAll()
    if (cards instanceof Error) {
        console.log("error on user creation: " + cards.message)
        console.log(cards.stack)
        return res.status(500).send()
    }

    return res.status(200).send(cards)
}

export const findCardsByName = async(req: Request, res: Response) =>{
    console.log("GET api/cards/search/:name")
    const cardName = req.params.name || ''
    console.log(cardName)

    if(typeof cardName !== "string" || cardName == ''){
        console.log("couldn't get name param value")
        return res.status(400).send("couldn't get name param value")
    }
    // TODO: adicionar autenticação, OU comunicação por menssageria
    const cards = await cardRepository.findCardByName(cardName)
    if (cards instanceof Error) {
        console.log("error on getting cards list by card name: " + cards.message)
        console.log(cards.stack)
        return res.status(500).send()
    }

    return res.status(200).send(cards)
}

export const getCard = async(req: Request, res: Response) => {
    console.log("GET api/cards/:id")
    const param = req.params.id || ''

    if(typeof param !== "string" || param === ''){
        console.log("couldn't get id param value")
        return res.status(400).send("couldn't get id param value")
    }

    const cardId : number = parseInt(param)
    const card = await cardRepository.get(cardId)
    if (card instanceof Error) {
        console.log("error on getting card data: " + card.message)
        console.log(card.stack)
        return res.status(500).send()
    }

    return res.status(200).send(card)

}

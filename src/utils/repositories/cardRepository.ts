import { Like, Repository } from "typeorm";
import { Card } from "../../models/entities/card.model";
import { db } from "../database.utils"

// Classe que realiza a conexão e consulta com a tabela 'cards' do banco de dados
// OBS: esse repositório não possui metódo de Criação, pois seus dados vem do registro oficial do Scryfall
export class CardRepository{
    private cardRepository!: Repository<Card>;
    constructor(){
        this.init()
    }

    private async init(){
        if (!db.isInitialized)
            await db.initialize()
            .then(()=>{
                this.cardRepository = db.getRepository(Card)
            }).catch((error) => {
                console.log("Error on db conn: " + error.message)
                console.log(error.stack)
            })
    }

    // list all Cards
    async getAll() : Promise<Card[] | Error> {
        await this.init()
        // TODO: Fazer paginação deste metodo
        const cards = await this.cardRepository.find({
            // take:100
        })
        .catch((err) => {
            console.log("Db error while getting Card list: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
        return cards || [];
    }

    // get card data by id
    async get(id: number) : Promise<Card | Error>{
        await this.init()
        const card = await this.cardRepository.query(`select * from "cards" where id='${id}' LIMIT 1;`).catch((err) => {
            console.log("Db error on getting specific card data: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
        return card
    }

    // list all Cards by name
    async findCardByName(cardName: string) : Promise<Card[] | Error> {
        await this.init()
        // TODO: Fazer paginação deste metodo
        const cards = await this.cardRepository.find({
            where: { cardname: Like(`%${cardName}%`) },
            take: 10
        })
        .catch((err) => {
            console.log("Db error while getting Card list: " + err.message)
            console.log(err.stack)
            return err
        })
        .finally(()=>{db.destroy()})
        return cards || [];
    }
}
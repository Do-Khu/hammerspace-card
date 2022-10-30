import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
    database: "hammerspace_cards",
    name: "cards",
    schema: "public"
})
export class Card{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column()
    imglink!: string;

    @Column()
    cardname!: string;

    @Column()
    coloridentity!: string;

    @Column()
    isvalid!: boolean;
}
import { UUID } from "crypto";

interface Initiative{
    uuid: UUID,
    title: string,
    image: string,
    countries: string,
    pillar: string
    status: string
}

export default Initiative
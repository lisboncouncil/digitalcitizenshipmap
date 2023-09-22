interface Initiative{
    id: number,
    title: string,
    image: string,
    countries: number[],
    pillars: number[],
    audiences: number[],
    status: string,
    url: string,
    description: string,
    created_at: Date
}

export default Initiative
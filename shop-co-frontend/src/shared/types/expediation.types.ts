export interface IExpediation{
    id: number
    address: string
    phoneNumber: string
    userId: string
    createdAt: string
    status: boolean
    cost: number
}

export interface IExpediationItem{
    id: number
    expediationId: number
    productId: number
    quantity: number
    unitPrice: number
    detailsId: number
}
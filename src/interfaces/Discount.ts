export interface Discount{
    id: number,
    name: string,
    type: '%' | '$',
    value: number,
    expiry: string,
    isActive: boolean
}
export let entityName: string
export let businessType: string
export let ownership: string
export let initialMembers: string[]
export let articlesFiled: boolean
export let dateFiled: string
export let stateFiled: string
export let management: string
export let fiscalYearStart: number[]
export let fiscalYearEnd: number[]
export let sharesA: number
export let sharesB: number
export let createShares: boolean
export let sizeOfShares: number
export let votingMech: string

export const handleName = (e: any) => {
    const {value} = e.target
    entityName = value
}
export const handleBusinessType = (e: any) => {
    const {value} = e.target
    businessType = value
}
export const handleOwnership = (e: any) => {
    const {value} = e.target
    ownership = value
}
export const handleInitialMembers = (e: any) => {
    const {value} = e.target
    initialMembers = value.split(',')
}
export const handleArticlesFiled = (e: any) => {
    const {checked} = e.target
    articlesFiled = checked
}
export const handleDateFiled = (e: any) => { 
    const {value} = e.target
    dateFiled = value || null
}
export const handleStateFiled = (e: any) => {
    const {value} = e.target
    stateFiled = value || null
}
export const handleManagement = (e: any) => {
    const {value} = e.target
    management = value
}
export const handleMonth = (e: any) => {
    const {name, value} = e.target
    console.log(e.target.value)
    switch(name){
        case 'FS':
            fiscalYearStart = [Number(value)]
            console.log(fiscalYearStart)
            break
        case 'FE':
            fiscalYearEnd = [Number(value)]
            break
        default:
            break
    }
}
export const handleDate= (e: any) => {
    const {name, value} = e.target
    switch(name){
        case 'FS':
            fiscalYearStart[1] = Number(value)
            break
        case 'FE':
            fiscalYearEnd[1] = Number(value)
            break
        default:
            break
    }
}
export const handleSharesA = (e: any) => {
    const {value} = e.target
    sharesA = Number(value)
}
export const handleSharesB = (e: any) => {
    const {value} = e.target
    sharesB = Number(value)
}
export const handleCreateShares = (e: any) => {
    const {checked} = e.target
    createShares = checked
}
export const handleSizeOfShares = (e: any) => {
    const {value} = e.target
    sizeOfShares = Number(value) || 0
}

export const handleVotingMech = (e: any) => {
    const {value} = e.target
    votingMech = value
}
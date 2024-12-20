import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import { CryptoPrice, Cryptocurrency, Pair } from './types'
import { getCryptos, fetchCurrentCryptoPrice } from './services/CryptoService'

type CrypStore = {
    cryptocurrencies: Cryptocurrency[]
    result: CryptoPrice
    loading: boolean
    fetchCryptos: () => Promise<void>
    fetchData: (pair: Pair) => Promise<void>
}

export const useCryptoStore = create<CrypStore>()(devtools((set) => ({
    cryptocurrencies: [],
    // result: {} as CryptoPrice, // este objeto trátalo como CryptoPrice y así tiene todos los atributos y te evitas lo siguiente...
    result: {
        IMAGEURL: '',
        PRICE: '',
        HIGHDAY: '',
        LOWDAY: '',
        CHANGEPCT24HOUR: '',
        LASTUPDATE: ''
    },
    loading: false,
    fetchCryptos: async () => {
        const cryptocurrencies = await getCryptos()
        set(() => ({
            cryptocurrencies: cryptocurrencies
        }))
    },
    fetchData: async (pair) => {
        set(() => ({
            loading: true
        }))
        const result = await fetchCurrentCryptoPrice(pair)
        set(() => ({
            result: result,
            loading: false
        }))
    }
})))
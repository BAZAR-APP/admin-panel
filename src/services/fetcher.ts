import AxiosBase from './axios/AxiosBase'

export const fetcher = async (url: string) => {
    const res = await AxiosBase.get(url)

    return res?.data
}

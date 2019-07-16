import Axios, { AxiosInstance, AxiosResponse, Method } from 'axios';

export declare interface KunaTimestampInfo {
    timestamp: number;
    timestamp_miliseconds: number;
}

export declare interface Currency {
    id: number;
    code: string;
    name: string;
    has_memo: boolean;
    icons: {
        std?: string;
        xl?: string;
        png_2x?: string;
        png_3x?: string;
    };
    coin: boolean;
    explorer_link?: string;
    sort_order: number;
    precision: {
        real: number;
        trade: number;
    };
};

export declare interface ExchangeRate {
    currency: string;
    usd: number;
    uah: number;
    btc: number;
    eur: number;
    rub: number;
}

export class KunaAccessToken {

    constructor(
        public publicKey: string,
        public secretKey: string
    ) { }

}

export class KunaClient {
    private baseURL: string = 'https://api.kuna.io/v3';
    private axios: AxiosInstance = Axios.create({
        baseURL: this.baseURL
    });

    constructor(private accessToken?: KunaAccessToken) { }

    public async getTimestamp(): Promise<KunaTimestampInfo> {
        const response = await this.request('/timestamp', 'GET');
        return response.data as KunaTimestampInfo;
    }

    public async getCurrencies(): Promise<Array<Currency>> {
        const response = await this.request('/currencies', 'GET');
        return response.data as Array<Currency>;
    }

    public async getExchangeRates(): Promise<Array<ExchangeRate>> {
        const response = await this.request('/exchange-rates', 'GET');
        return response.data as Array<ExchangeRate>;
    }

    private async request(path: string, method: Method = 'GET', body: object = {}): Promise<AxiosResponse<any>> {
        let headers: any = {
            'Accept': 'application/json'
        }
        if (Object.keys(body).length > 0)
            headers['Content-Type'] = 'application/json';
        return await this.axios.request({
            url: path,
            method: method,
            data: body,
            headers: headers
        });
    }

}
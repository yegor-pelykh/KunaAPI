import Axios, { AxiosInstance, AxiosResponse, Method } from 'axios';

// Request types
export declare interface ExchangeRatesRequestParams {
    currency: string;
}

export declare interface TickersRequestParams {
    symbols: Array<string> | 'ALL';
}

export declare interface OrderbookRequestParams {
    symbol: string;
}

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

export declare interface Market {
    id: string;
    base_unit: string;
    quote_unit: string;
    base_precision: number;
    quote_precision: number;
    display_precision: number;
    price_change: number;
}

export declare interface Ticker {
    symbol: string;
    bid: number;
    bid_volume: number;
    ask: number;
    ask_volume: number;
    day_change_quote: number;
    day_change_quote_percent: number;
    last_price: number;
    day_volume: number;
    day_min: number;
    day_max: number;
}

export declare interface OrderbookRecord {
    price: number;
    volume: number;
    orders: number;
}

export declare interface Orderbook {
    ask: Array<OrderbookRecord>;
    bid: Array<OrderbookRecord>;
}

export class KunaAccessToken {

    constructor(
        public publicKey: string,
        public secretKey: string
    ) { }

}

class KunaUtils {

    public static mapTickers(data: Array<Array<any>>): Array<Ticker> {
        return data.map(a => <Ticker>{
            symbol: a[0],
            bid: a[1],
            bid_volume: a[2],
            ask: a[3],
            ask_volume: a[4],
            day_change_quote: a[5],
            day_change_quote_percent: a[6],
            last_price: a[7],
            day_volume: a[8],
            day_min: a[9],
            day_max: a[10],
        });
    }

    public static mapOrderbook(data: Array<Array<any>>): Orderbook {
        const ask = new Array<OrderbookRecord>();
        const bid = new Array<OrderbookRecord>();
        for (let i = 0; i < data.length; i++) {
            const rec = <OrderbookRecord>{
                price: data[i][0],
                volume: data[i][1],
                orders: data[i][2]
            };
            if (rec.volume < 0) {
                rec.volume = Math.abs(rec.volume);
                ask.push(rec);
            } else {
                bid.push(rec);
            }
        }
        return <Orderbook>{
            ask: ask,
            bid: bid
        }
    }
    
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

    public async getExchangeRates(params?: ExchangeRatesRequestParams): Promise<Array<ExchangeRate>> {
        const currency = params != undefined ? params.currency : undefined;
        const path = currency != undefined ? `/exchange-rates/${currency}` : '/exchange-rates';
        const response = await this.request(path, 'GET');
        return response.data as Array<ExchangeRate>;
    }

    public async getMarkets(): Promise<Array<Market>> {
        const response = await this.request('/markets', 'GET');
        return response.data as Array<Market>;
    }

    public async getTickers(params?: TickersRequestParams): Promise<Array<Ticker>> {
        const symbols = params != undefined ? params.symbols : 'ALL';
        const path = `/tickers?symbols=${Array.isArray(symbols) ? symbols.join(',') : symbols}`;
        const response = await this.request(path, 'GET');
        return KunaUtils.mapTickers(response.data);
    }

    public async getOrderbook(params: OrderbookRequestParams): Promise<Orderbook> {
        const symbol = params.symbol;
        const path = `/book/${symbol}`;
        const response = await this.request(path, 'GET');
        return KunaUtils.mapOrderbook(response.data);
    }

    public async getTradesHistory(): Promise<undefined> {
        // Not implemented yet
        return undefined;
    }

    public async getPriceChart(): Promise<undefined> {
        // Not implemented yet
        return undefined;
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
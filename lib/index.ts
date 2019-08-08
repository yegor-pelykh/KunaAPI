import { createHmac } from 'crypto';
import Axios, { AxiosInstance, AxiosResponse, Method } from 'axios';

enum TradePosition {
    Maker = 1,
    Taker = -1
}

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

export declare interface CancelOrdersRequestParams {
    order_ids: Array<number>;
}

export declare interface UserActiveOrdersRequestParams {
    markets: Array<string>;
}

export declare interface UserFilledOrdersRequestParams {
    markets: Array<string>;
    filters?: {
        start: number;
        end: number;
        limit: number;
        sort: 1 | -1
    }
}

export declare interface UserTradesByOrderRequestParams {
    market: string;
    order_id: number;
}

export declare interface DepositAddressRequestParams {
    currency: string;
}

export declare interface DepositRequestParams {
    currency: string;
    amount: number;
    payment_service?: 'default';
}

export declare interface DepositDetailsRequestParams {
    id: number;
}

export declare interface WithdrawRequestParams {
    withdraw_type: string;
    amount: number;
    address?: string;
    gateway?: string;
    fields?: object
    fund_source_id?: number;
    payment_id?: string;
    allow_blank_memo?: boolean;
    withdrawall?: boolean;
}

export declare interface WithdrawDetailsRequestParams {
    id: number;
}

export declare interface UserAssetsHistoryRequestParams {
    type?: 'withdraws' | 'deposits';
    currency_ids?: Array<number>;
    statuses?: Array<string>;
    date_from?: number;
    date_to?: number;
    page?: number;
    per_page?: number;
    order_by?: string;
    order_dir?: string;
}

export declare interface FiatDepositMethodsRequestParams {
    currency: string;
    public_key: string;
}

export declare interface FiatWithdrawMethodsRequestParams {
    amount: number;
    currency: string;
    public_key: string;
}

export declare interface KunaCodeRequestParams {
    code: string;
}

export declare interface KunaCodeIdRequestParams {
    id: number;
}

export declare interface CreateKunaCodeRequestParams {
    amount: number;
    currency: string;
    recipient?: string;
    non_refundable_before?: string;
    comment?: string;
    private_comment?: string;
}

export declare interface IssuedKunaCodesRequestParams {
    page?: number;
    per_page?: number;
    order_by?: string;
    order_dir?: string;
    status?: Array<string>;
}

export declare interface RedeemedKunaCodesRequestParams {
    page?: number;
    per_page?: number;
    order_by?: string;
    order_dir?: string;
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

export declare interface FixedFee {
    type: 'fixed';
    asset: {
        amount: number;
        currency: string;
        to_usd: number;
    };
}

export declare interface PercentFee {
    type: 'percent';
    amount: number;
}

export declare interface FiatFeeInformation {
    code: string;
    category: string;
    deposit_fees: Array<FixedFee|PercentFee>;
    withdraw_fees: Array<FixedFee|PercentFee>;
}

export declare interface CryptoFeeInformation {
    code: string;
    category: 'coin';
    deposit_fees: Array<FixedFee>;
    withdraw_fees: Array<FixedFee>;
    min_deposit: {
        amount: number;
        currency: string;
        to_usd: number;
    };
    min_withdraw: {
        amount: number;
        currency: string;
        to_usd: number;
    };
}

export declare interface AccountInfo {
    email: string;
    kunaid: string;
    two_factor: boolean;
    withdraw_confirmation: boolean;
    public_keys: {
        deposit_sdk_uah_public_key: string;
        deposit_sdk_usd_public_key: string;
        deposit_sdk_rub_public_key: string;
        deposit_sdk_uah_worldwide_public_key: string;
    };
    announcements: boolean;
}

export declare interface WalletInfo {
    currency: string;
    available: number;
    total: number;
}

export declare interface CancelledOrderInfo {
    id: number;
    side: string;
    type: string;
    price: number;
    avg_execution_price: number;
    symbol: string;
    timestamp: number;
    original_amount: number;
    remaining_amount: number;
    executed_amount: number;
    is_cancelled: null;
    is_hidden: null;
    is_live: null;
    was_forced: null;
    exchange: null;
}

export declare interface UserOrderInfo {
    id: number;
    side: string;
    market: string;
    created_at: number;
    updated_at: number;
    volume: number;
    initial_volume: number;
    type: string;
    status: string;
    price: number;
    avg_price: number;
}

export declare interface UserTradeInfo {
    trade_id: number;
    market: string;
    timestamp: number;
    order_id: number;
    amount: number;
    price: number;
    position: TradePosition;
    fee: number;
    currency: string;
}

export declare interface DepositAddressInfo {
    confirmations: number;
    min_deposit: number;
    address: string;
    memo: string;
}

export declare interface DepositInfo {
    withdrawal_id: number;
}

export declare interface DepositDetails {
    id: number;
    type: string;
    created_at: string;
    destination: string;
    txid: string;
    currency: number;
    amount: number;
    status: string;
    sn: string;
    provider: any;
}

export declare interface WithdrawInfo {
    status: string;
    message: string;
    withdrawal_id: number;
}

export declare interface WithdrawDetails {
    id: number;
    created_at: string;
    destination: string;
    currency: string;
    amount: number;
    status: string;
    txid: string;
    sn: string;
    fee: number;
    total_amount: number;
    reference_id: string;
}

export declare interface AssetsHistoryInfo {
    total_items: number;
    items: Array<{
        id: number;
        type: string;
        created_at: string;
        destination: string;
        currency: number;
        amount: number;
        status: string;
    }>;
    currencies: Array<string>;
}

export declare interface FiatDepositMethodsInfo {
    data: {
        currency: string;
        test_mode: boolean;
        services: {
            [key: string]: {
                code: string;
                method: string;
                flow: string;
                currency: string;
                fields: Array<{
                    key: string;
                    type: string;
                    label: { [key: string]: string; };
                    example: any;
                    hint: { [key: string]: string; };
                    regexp: string;
                    required: boolean;
                    position: number;
                }>;
                amount_min: number;
                amount_max: number;
                fee: {
                    rate: number;
                    fixed: number;
                    min: number;
                    max: number;
                };
            };
        };
        methods: {
            payment_card: {
                code: string;
                category: string;
                description: string;
                name: { [key: string]: string; };
                logo: string;
                icon: string;
                metadata: Array<any>;
                position: number;
                hide: boolean;
            }
        };
        account: {
            name: string;
            description: string;
            icon: string;
            website: string;
        };
    };
}

export declare interface FiatWithdrawMethodsInfo {
    data: {
        currency: string;
        amount: number;
        test_mode: boolean;
        services: {
            [key: string]: {
                code: string;
                method: string;
                currency: string;
                fields: Array<{
                    key: string;
                    type: string;
                    label: { [key: string]: string; };
                    example: any;
                    hint: { [key: string]: string; };
                    regexp: string;
                    required: boolean;
                    position: number;
                }>;
                amount_min: number;
                amount_max: number;
                exchange_rate: number;
                amount: number;
                fee: {
                    rate: number;
                    fixed: number;
                    min: number;
                    max: number;
                };
            };
        };
        methods: {
            payment_card: {
                code: string;
                category: string;
                description: string;
                name: { [key: string]: string; };
                logo: string;
                icon: string;
                metadata: Array<any>;
                position: number;
                hide: boolean;
            }
        };
        account: {
            name: string;
            description: string;
            icon: string;
            website: string;
        };
    };
}

export declare interface KunaCodeInfo {
    id: number;
    sn: string;
    code: string;
    recipient: string;
    amount: number;
    currency: string;
    status: string;
    non_refundable_before: string;
    created_at: string;
    redeemed_at: string;
    comment: string;
    private_comment: string;
}

export declare interface SuccessInfo {
    success: boolean;
}

export interface KunaAccessToken {
    publicKey: string;
    secretKey: string;
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

    public static mapWallets(data: Array<Array<any>>): Array<WalletInfo> {
        return data.map(a => <WalletInfo>{
            currency: a[1],
            total: a[2],
            available: a[4]
        });
    }

    public static mapUserOrders(data: Array<Array<any>>): Array<UserOrderInfo> {
        return data.map(a => {
            const initial_volume: number = parseFloat(a[7]);
            const side: string = initial_volume > 0 ? 'BUY' : 'SELL';
            return <UserOrderInfo>{
                id: a[0],
                side: side,
                market: a[3],
                created_at: a[4],
                updated_at: a[5],
                volume: parseFloat(a[6]),
                initial_volume: Math.abs(initial_volume),
                type: a[8],
                status: a[13],
                price: parseFloat(a[16]),
                avg_price: parseFloat(a[17])
            };
        });
    }

    public static mapUserTrades(data: Array<Array<any>>): Array<UserTradeInfo> {
        return data.map(a => <UserTradeInfo>{
            trade_id: a[0],
            market: a[1],
            timestamp: a[2],
            order_id: a[3],
            amount: parseFloat(a[4]),
            price: parseFloat(a[5]),
            position: a[8] as TradePosition,
            fee: parseFloat(a[9]),
            currency: a[10]
        });
    }

    public static mapCancelledOrderInfo(data: any): CancelledOrderInfo {
        return <CancelledOrderInfo>{
            id: data.id,
            side: data.side,
            type: data.type,
            price: parseFloat(data.price),
            avg_execution_price: parseFloat(data.avg_execution_price),
            symbol: data.symbol,
            timestamp: data.timestamp,
            original_amount: parseFloat(data.original_amount),
            remaining_amount: parseFloat(data.remaining_amount),
            executed_amount: parseFloat(data.executed_amount),
            is_cancelled: null,
            is_hidden: null,
            is_live: null,
            was_forced: null,
            exchange: null
        };
    }
    
}

export class KunaClient {
    private baseURLCommon: string = 'https://api.kuna.io';
    private baseURLPay: string = 'https://pay.kuna.io';
    private axiosCommon: AxiosInstance = Axios.create({
        baseURL: this.baseURLCommon
    });
    private axiosPay: AxiosInstance = Axios.create({
        baseURL: this.baseURLPay
    });

    constructor(private accessToken?: KunaAccessToken) { }

    public async getTimestamp(): Promise<KunaTimestampInfo> {
        const response = await this.request('/v3/timestamp', 'GET');
        return response.data as KunaTimestampInfo;
    }

    public async getCurrencies(): Promise<Array<Currency>> {
        const response = await this.request('/v3/currencies', 'GET');
        return response.data as Array<Currency>;
    }

    public async getExchangeRates(params?: ExchangeRatesRequestParams): Promise<Array<ExchangeRate>> {
        const currency = params != undefined ? params.currency : undefined;
        const path = currency != undefined ? `/v3/exchange-rates/${currency}` : '/exchange-rates';
        const response = await this.request(path, 'GET');
        return response.data as Array<ExchangeRate>;
    }

    public async getMarkets(): Promise<Array<Market>> {
        const response = await this.request('/v3/markets', 'GET');
        return response.data as Array<Market>;
    }

    public async getTickers(params?: TickersRequestParams): Promise<Array<Ticker>> {
        const symbols = params != undefined ? params.symbols : 'ALL';
        const path = `/v3/tickers?symbols=${Array.isArray(symbols) ? symbols.join(',') : symbols}`;
        const response = await this.request(path, 'GET');
        return KunaUtils.mapTickers(response.data);
    }

    public async getOrderbook(params: OrderbookRequestParams): Promise<Orderbook> {
        const symbol = params.symbol;
        const path = `/v3/book/${symbol}`;
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

    public async getFees(): Promise<Array<CryptoFeeInformation|FiatFeeInformation>> {
        const response = await this.request('/v3/fees', 'GET');
        return response.data as Array<CryptoFeeInformation|FiatFeeInformation>;
    }
    
    public async getUserAccountInfo(): Promise<AccountInfo> {
        const response = await this.requestPrivate('/v3/auth/me', 'POST');
        return response.data as AccountInfo;
    }

    public async getUserWallets(): Promise<Array<WalletInfo>> {
        const response = await this.requestPrivate('/v3/auth/r/wallets', 'POST');
        return KunaUtils.mapWallets(response.data);
    }

    public async createOrder(): Promise<undefined> {
        // Not implemented yet
        return undefined;
    }

    public async cancelOrder(params: CancelOrdersRequestParams): Promise<CancelledOrderInfo> {
        const ids = params.order_ids != undefined ? params.order_ids : undefined;
        const response = await this.requestPrivate('/v3/order/cancel', 'POST', {
            order_ids: ids
        });
        return KunaUtils.mapCancelledOrderInfo(response.data);
    }

    public async getUserActiveOrders(params?: UserActiveOrdersRequestParams): Promise<Array<UserOrderInfo>> {
        const markets = params != undefined ? params.markets : undefined;
        const path = `/v3/auth/r/orders${Array.isArray(markets) ? `/${markets.join(',')}` : ''}`;
        const response = await this.requestPrivate(path, 'POST');
        return KunaUtils.mapUserOrders(response.data);
    }

    public async getUserFilledOrders(params?: UserFilledOrdersRequestParams): Promise<Array<UserOrderInfo>> {
        const markets = params != undefined ? params.markets : undefined;
        const body = params != undefined ? params.filters : undefined;
        const path = `/v3/auth/r/orders${Array.isArray(markets) ? `/${markets.join(',')}` : ''}/hist`;
        const response = await this.requestPrivate(path, 'POST', body);
        return KunaUtils.mapUserOrders(response.data);
    }

    public async getUserTradesByOrder(params: UserTradesByOrderRequestParams): Promise<Array<UserTradeInfo>> {
        const market = params.market;
        const order_id = params.order_id;
        const path = `/v3/auth/r/order/${market}:${order_id}/trades`;
        const response = await this.requestPrivate(path, 'POST');
        return KunaUtils.mapUserTrades(response.data);
    }

    public async getSavedCards(): Promise<undefined> {
        // Not implemented yet
        return undefined;
    }

    public async addSavedCard(): Promise<undefined> {
        // Not implemented yet
        return undefined;
    }

    public async removedSavedCard(): Promise<undefined> {
        // Not implemented yet
        return undefined;
    }

    public async getDepositAddress(params: DepositAddressRequestParams): Promise<DepositAddressInfo> {
        const currency = params.currency;
        const response = await this.requestPrivate('/v3/auth/deposit/info', 'POST', {
            currency: currency
        });
        return response.data as DepositAddressInfo;
    }

    public async generateDepositAddress(params: DepositAddressRequestParams): Promise<SuccessInfo> {
        const currency = params.currency;
        const response = await this.requestPrivate('/v3/auth/payment_addresses', 'POST', {
            currency: currency
        });
        return response.data as SuccessInfo;
    }

    public async deposit(params: DepositRequestParams): Promise<Array<DepositInfo>> {
        const response = await this.requestPrivate('/v3/auth/deposit', 'POST', params);
        return response.data as Array<DepositInfo>;
    }

    public async getDepositDetails(params: DepositDetailsRequestParams): Promise<DepositDetails> {
        const id = params.id;
        const response = await this.requestPrivate('/v3/auth/deposit/details', 'POST', {
            id: id
        });
        return response.data as DepositDetails;
    }

    public async withdraw(params: WithdrawRequestParams): Promise<Array<WithdrawInfo>> {
        const response = await this.requestPrivate('/v3/auth/withdraw', 'POST', params);
        return response.data as Array<WithdrawInfo>;
    }

    public async getWithdrawDetails(params: WithdrawDetailsRequestParams): Promise<WithdrawDetails> {
        const response = await this.requestPrivate('/v3/auth/withdraw/details', 'POST', params);
        return response.data as WithdrawDetails;
    }
    
    public async getUserAssetsHistory(params: UserAssetsHistoryRequestParams): Promise<AssetsHistoryInfo> {
        const path = `/v3/auth/assets-history${params != null && params.type != null ? `/${params.type}` : ''}`;
        const body = Object.assign({}, params);
        delete body.type;
        const response = await this.requestPrivate(path, 'POST', body);
        return response.data as AssetsHistoryInfo;
    }

    public async getFiatDepositMethods(params: FiatDepositMethodsRequestParams): Promise<FiatDepositMethodsInfo> {
        const response = await this.requestPrivate('/public-api/payment-prerequest', 'POST', params, this.axiosPay);
        return response.data as FiatDepositMethodsInfo;
    }

    public async getFiatWithdrawMethods(params: FiatWithdrawMethodsRequestParams): Promise<FiatWithdrawMethodsInfo> {
        const response = await this.requestPrivate('/public-api/payout-prerequest', 'POST', params, this.axiosPay);
        return response.data as FiatWithdrawMethodsInfo;
    }

    public validateKunaCode(params: KunaCodeRequestParams): boolean {
        const base58Alphabet = '123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ';
        const body = params.code.split('-').slice(0, -2).join('');
        const checksum = base58Alphabet.indexOf(body[0]);
        const str = body.slice(1);
        let i = str.length;
        let sum = 0;
        while (i--) {
            sum += base58Alphabet.indexOf(str.charAt(i));
        }
        if (sum % 58 !== checksum)
            throw new Error('Invalid checksum');
        return true;
    }

    public async getKunaCodeInfo(params: KunaCodeRequestParams): Promise<KunaCodeInfo> {
        const path = `/v3/kuna_codes/${params.code.substr(0, 5)}/check`;
        const response = await this.requestPrivate(path, 'GET');
        return response.data as KunaCodeInfo;
    }

    public async getKunaCodeInfoById(params: KunaCodeIdRequestParams): Promise<KunaCodeInfo> {
        const response = await this.requestPrivate('/v3/auth/kuna_codes/details', 'GET', {
            id: params.id
        });
        return response.data as KunaCodeInfo;
    }

    public async createKunaCode(params: CreateKunaCodeRequestParams): Promise<KunaCodeInfo> {
        const response = await this.requestPrivate('/v3/auth/kuna_codes', 'POST', params);
        return response.data as KunaCodeInfo;
    }

    public async redeemKunaCode(params: KunaCodeRequestParams): Promise<KunaCodeInfo> {
        const response = await this.requestPrivate('/v3/auth/kuna_codes/redeem', 'PUT', params);
        return response.data as KunaCodeInfo;
    }

    public async getIssuedKunaCodes(params: IssuedKunaCodesRequestParams): Promise<Array<KunaCodeInfo>> {
        const response = await this.requestPrivate('/v3/auth/kuna_codes/issued-by-me', 'POST', params);
        return response.data as Array<KunaCodeInfo>;
    }

    public async getRedeemedKunaCodes(params: RedeemedKunaCodesRequestParams): Promise<Array<KunaCodeInfo>> {
        const response = await this.requestPrivate('/v3/auth/kuna_codes/redeemed-by-me', 'POST', params);
        return response.data as Array<KunaCodeInfo>;
    }

    private async request(path: string, method: Method = 'GET', body: object = {}, client: AxiosInstance = this.axiosCommon): Promise<AxiosResponse<any>> {
        let headers: any = {
            'Accept': 'application/json'
        }
        if (Object.keys(body).length > 0)
            headers['Content-Type'] = 'application/json';
        
        return await client.request({
            url: path,
            method: method,
            data: body,
            headers: headers
        });
    }

    private async requestPrivate(path: string, method: Method = 'GET', body: object = {}, client: AxiosInstance = this.axiosCommon): Promise<AxiosResponse<any>> {
        if (this.accessToken == null || !this.isAccessTokenValid(this.accessToken))
            throw new Error('AccessToken is invalid. You cannot use private methods.');
        
        const nonce = new Date().getTime();
        const signatureContent = `${path}${nonce}${JSON.stringify(body)}`;
        const signature = createHmac('sha384', this.accessToken.secretKey)
            .update(signatureContent).digest('hex');
        
        let headers: any = {
            'Accept': 'application/json',
            'Kun-Nonce': nonce,
            'Kun-ApiKey': this.accessToken.publicKey,
            'Kun-Signature': signature,
        }
        if (Object.keys(body).length > 0)
            headers['Content-Type'] = 'application/json';

        return await client.request({
            url: path,
            method: method,
            data: body,
            headers: headers
        });
    }

    private isAccessTokenValid(accessToken: KunaAccessToken): boolean {
        return typeof accessToken.publicKey === 'string'
            && typeof accessToken.secretKey === 'string'
            && accessToken.publicKey.length === 40
            && accessToken.secretKey.length === 40;
    }

}
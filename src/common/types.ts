export type Rates = {
  [key: string]: number;
}

type Currency = {
  [key: string]: number;
}

export type Wallet = {
  currencies: Currency;
}


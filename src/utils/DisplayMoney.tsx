import { CURRENCY_POSITION_END } from '../config/constants.ts';

interface DisplayMoneyProps {
  classes: string;
  symbol: string;
  amount: number;
}

export const DisplayMoney = ({ classes, symbol, amount }: DisplayMoneyProps) => {
  if (CURRENCY_POSITION_END) {
    return (
      <span>
        {amount}
        <span className={'ms-1' + classes}>{symbol}</span>
      </span>
    );
  }
  return (
    <span>
      <span className={classes}>{symbol}</span>
      {amount}
    </span>
  );
};

import { Formatter } from './formatter';

const DEFAULT_PRECISION = 2;

export class NumberFormatter {
  public static getFormattedNumberString = (
    value: number,
    precision = DEFAULT_PRECISION
  ): string => {
    const roundedValueString = value.toFixed(precision);
    const truncatedZerosString = parseFloat(roundedValueString).toString();

    return truncatedZerosString;
  };

  public static getLocalizedNumberString: Formatter<number> = function (value) {
    return value.toLocaleString(undefined, { maximumFractionDigits: 10 });
  };
}

import { UseFormProps as UseFormPropsRHK, FieldValues } from 'react-hook-form';
import { z } from 'zod';

export type UseFormProps<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown
> = Omit<UseFormPropsRHK<TFieldValues, TContext>, 'resolver'> & {
  schema?: z.Schema;
};

import {
  useForm as useFormRHF,
  FieldValues,
  UseFormReturn
} from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { UseFormProps } from './useFormProps';

export function useForm<
  TFieldValues extends FieldValues = FieldValues,
  TContext = unknown
>(
  props?: UseFormProps<TFieldValues, TContext>
): UseFormReturn<TFieldValues, TContext> {
  return useFormRHF({
    ...props,
    resolver: props?.schema ? zodResolver(props.schema) : undefined
  });
}

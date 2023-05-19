import { memo, useEffect, useRef } from 'react';

import { useJitRef } from 'utils/hooks/useJitRef';
import { Product } from 'types/Product';

import styles from './ProductsPieChart.module.sass';
import { Painter } from './Painter';

export interface ProductsPieChartProps {
  data: Product[];
}

export const ProductsPieChart = memo(({ data }: ProductsPieChartProps) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const painter = useJitRef(() => new Painter(svgRef.current as HTMLElement));

  useEffect(() => {
    painter.current.render(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div className={styles.root} ref={svgRef} />;
});

ProductsPieChart.displayName = 'ProductsPieChart';

import { memo, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import { useJitRef } from 'utils/hooks/useJitRef';
import { ProductByFactory } from 'types/Product';
import { URL_FACTORY } from 'infrastructure/routes/paths';

import styles from './ProductsBarChart.module.sass';
import { Painter } from './Painter';

export interface ProductsBarChartProps {
  data: ProductByFactory[];
}

export const ProductsBarChart = memo(({ data }: ProductsBarChartProps) => {
  const svgRef = useRef<HTMLDivElement>(null);
  const painter = useJitRef(() => new Painter(svgRef.current as HTMLElement));
  const navigate = useNavigate();

  useEffect(() => {
    painter.current.render(data, {
      onClick: (d, factory_id) => {
        navigate(URL_FACTORY.DETAIL(factory_id, d.getMonth()));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return <div className={styles.root} ref={svgRef} />;
});

ProductsBarChart.displayName = 'ProductsBarChart';

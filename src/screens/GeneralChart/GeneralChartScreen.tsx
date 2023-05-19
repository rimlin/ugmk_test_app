import { useEffect, useMemo, useState, useTransition } from 'react';
import cn from 'classnames';

import { ProductsBarChart } from 'components/ProductsBarChart';
import { api } from 'infrastructure/network/request';
import { Product } from 'types/Product';

import styles from './GeneralChartScreen.module.sass';

const filterKey = 'filter';

export const GeneralChartScreen = (): JSX.Element => {
  const [data, setData] = useState<Product[]>([]);
  const [filter, setFilter] = useState(localStorage.getItem(filterKey) || '');
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    api
      .get('/products')
      .json<Product[]>()
      .then(data => {
        setData(data);
      })
      .catch(err => {
        console.log(err);
      });
  }, []);

  const filteredData = useMemo(() => {
    const getValue = (item: Product) => {
      if (filter) {
        return (item as any)[`product${filter}`] || 0;
      } else {
        return item.product1 + item.product2 + item.product3;
      }
    };

    return data.map(item => {
      return {
        date: item.date,
        factory_id: item.factory_id,
        id: item.id,
        value: getValue(item)
      };
    });
  }, [data, filter]);

  return (
    <div
      className={cn(styles.root, {
        [styles.pending]: isPending
      })}>
      <div className={cn(styles.box, styles.filter)}>
        <label htmlFor="product">Фильтру по типу продукции</label>
        <select
          id="product"
          value={filter}
          onChange={e => {
            startTransition(() => {
              const value = e.target.value;
              setFilter(value);
              localStorage.setItem(filterKey, value);
            });
          }}>
          <option value="">Все продукты</option>
          <option value="1">Продукт 1</option>
          <option value="2">Продукт 2</option>
          <option value="3">Продукт 3</option>
        </select>
      </div>
      <div className={styles.box}>
        <ProductsBarChart data={filteredData} />
      </div>
    </div>
  );
};

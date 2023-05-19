import { useEffect, useState } from 'react';
import cn from 'classnames';
import { useParams } from 'react-router-dom';

import { api } from 'infrastructure/network/request';
import { Product } from 'types/Product';
import { ProductsPieChart } from 'components/ProductsPieChart';
import { shortMonths } from 'infrastructure/date';

import styles from './DetailChartScreen.module.sass';

const factoryName: any = { 1: 'А', 2: 'Б' };

export const DetailChartScreen = (): JSX.Element => {
  const [data, setData] = useState<Product[]>([]);
  const params = useParams();
  const factory = +(params.factory || 0);
  const month = +(params.month || 0);

  useEffect(() => {
    api
      .get('/products')
      .json<Product[]>()
      .then(data => {
        const filtered = data.filter(item => {
          if (!item.date) return false;
          const split = item.date?.split('/');
          const isSameMonth = +split[1] === month + 1;

          return item.factory_id === factory && isSameMonth;
        });

        setData(filtered);
      })
      .catch(err => {
        console.log(err);
      });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={styles.root}>
      <div className={cn(styles.box, styles.title)}>
        <h1>
          Статистика по продукции фабрики {factoryName[factory]} за {shortMonths[month]}
        </h1>
      </div>
      <div className={styles.box}>
        <ProductsPieChart data={data} />
      </div>
    </div>
  );
};

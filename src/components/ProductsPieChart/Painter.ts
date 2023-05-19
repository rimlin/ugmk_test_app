/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';

import { Product } from 'types/Product';

export class Painter {
  private margin = 50;
  private width = 800;
  private height = 450;
  private radius = Math.min(this.width, this.height) / 2 - this.margin;

  private svg: d3.Selection<d3.BaseType, unknown, null, undefined>;

  constructor(el: HTMLElement) {
    d3.select(el)
      .append('svg')
      .attr('width', this.width)
      .attr('height', this.height)
      .append('g')
      .attr(
        'transform',
        'translate(' + this.width / 2 + ',' + this.height / 2 + ')'
      );

    this.svg = d3.select(el).select('g');
  }

  render(rawData: Product[]) {
    if (rawData.length === 0) {
      return null;
    }

    const product1 = d3.sum(rawData, d => d.product1);
    const product2 = d3.sum(rawData, d => d.product2);
    const product3 = d3.sum(rawData, d => d.product3);

    this.svg.selectAll('.arc').remove();
    this.svg.select('.legend').remove();

    const data = [product1, product2, product3];

    // Color of group
    const color = d3
      .scaleOrdinal()
      .domain(['1', '2', '3'])
      .range(['green', 'orange', 'red']);

    const pie = d3.pie().value(function (d: any) {
      return d;
    } as any);

    const arc = d3
      .arc()
      .outerRadius(this.radius - 10)
      .innerRadius(0);

    const g = this.svg
      .selectAll('.arc')
      .data(pie(data))
      .enter()
      .append('g')
      .attr('class', 'arc');

    g.append('path')
      .attr('d', arc as any)
      .attr('fill', function (d) {
        return color(d.index as any) as any;
      });

    g.append('svg:text') //add a label to each slice
      .attr('transform', d => {
        const c = arc.centroid(d as any);
        const x = c[0];
        const y = c[1];
        // pythagorean theorem for hypotenuse
        const h = Math.sqrt(x * x + y * y);

        return (
          'translate(' +
          (x / h) * this.radius +
          ',' +
          (y / h) * this.radius +
          ')'
        );
      })
      .attr('text-anchor', function (d) {
		const angle = (d.endAngle + d.startAngle) / 2

		if (angle > Math.PI && d.endAngle - d.startAngle < Math.PI / 6) {
			return 'middle';
		}

        return angle > Math.PI ? 'end' : 'start';
      })
      .text(function (d) {
        return d.data as any;
      });

    // Add legend to chart
    const len = color.domain().length;
    const legendItemWidth = 120;

    const legend = this.svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(-40,${this.height / 2 - 30})`)
      .selectAll('g')
      .data(data)
      .enter()
      .append('g')
      .attr(
        'transform',
        (d, i) => `translate(${(i % len) * legendItemWidth}, 0)`
      );

    legend
      .append('text')
      .attr('x', 0)
      .attr('y', 8)
      .attr('dy', '0.35em')
      .attr('text-anchor', 'end')
      .text((d, i) => `Продукт ${i + 1}`);

    legend
      .append('rect')
      .attr('x', -105)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', color as any);
  }
}

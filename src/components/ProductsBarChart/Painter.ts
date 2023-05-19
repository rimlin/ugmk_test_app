/* eslint-disable @typescript-eslint/no-explicit-any */
import * as d3 from 'd3';

import { shortMonths } from 'infrastructure/date';
import { ProductByFactory } from 'types/Product';

type RenderProps = {
  onClick: (d: Date, factory_id: string) => void;
};

const dateFormat = (date: Date) => shortMonths[date.getMonth()];
const factoryName: any = { 1: 'А', 2: 'Б' };

export class Painter {
  private color1 = 'red';
  private color2 = 'blue';

  private padding = { top: 20, right: 20, bottom: 70, left: 50 };
  private width = 900 - this.padding.left - this.padding.right;
  private height = 400 - this.padding.top - this.padding.bottom;

  private svg: d3.Selection<d3.BaseType, unknown, null, undefined>;

  constructor(el: HTMLElement) {
    d3.select(el)
      .append('svg')
      .attr('width', this.width + this.padding.left + this.padding.right)
      .attr('height', this.height + this.padding.top + this.padding.bottom)
      .append('g')
      .attr('transform', `translate(${this.padding.left},${this.padding.top})`);

    this.svg = d3.select(el).select('g');
  }

  render(data: ProductByFactory[], props: RenderProps) {
    if (data.length === 0) {
      return null;
    }

    const { onClick } = props;

    this.svg.selectAll('.slice').remove();
    this.svg.select('.legend').remove();
    this.svg.select('.xAxis').remove();
    this.svg.select('.yAxis').remove();

    const parseTime = d3.timeParse('%d/%m/%Y');
    const filteredData = data.filter(d => d.date);

    const values = d3.rollup(
      filteredData,
      v => d3.sum(v, d => d.value),
      d => d3.timeMonth(parseTime(d.date) as Date),
      d => d.factory_id
    );

    const dates = [...values.keys()].sort(
      (a, b) => a.getMonth() - b.getMonth()
    );

    // Set up x-axis scale using data values
    const xScale0 = d3
      .scaleBand()
      .range([0, this.width])
      .padding(0.1)
      .domain(dates as any);

    const xScale1 = d3
      .scaleBand()
      .domain(['1', '2'])
      .padding(0.1)
      .range([0, xScale0.bandwidth()]);

    // Set up y-axis scale using data values
    const maxScore = d3.max(
      [...values.values()].map(function (internMap: d3.InternMap) {
        return d3.max(internMap.values());
      })
    );

    const yScale = d3
      .scaleLinear()
      .domain([0, maxScore])
      .range([this.height, 0]);

    // Color of group
    const color = d3
      .scaleOrdinal()
      .domain(['1', '2'])
      .range([this.color1, this.color2]);

    // Add x-axis to chart
    this.svg
      .append('g')
      .attr('class', 'xAxis')
      .style('font-size', '14px')
      .attr('transform', `translate(0,${this.height})`)
      .call(d3.axisBottom(xScale0).tickFormat(dateFormat as any) as any);

    // Add y-axis to chart
    const formatLabel = (d: number) =>
      Math.floor((d as number) / 1000).toString();

    this.svg
      .append('g')
      .attr('class', 'yAxis')
      .style('font-size', '14px')
      .call(d3.axisLeft(yScale).tickFormat(formatLabel as any));

    // Create slice of bar
    const slice = this.svg
      .selectAll('.slice')
      .data(values.keys())
      .enter()
      .append('g')
      .attr('class', 'slice')
	  .attr('style', 'cursor: pointer')
      .attr('transform', d => `translate(${xScale0(d3.timeMonth(d) as any)},0)`)
      .on('click', function (e, d) {
        onClick(d, e.target.dataset.factory);
      });

    slice
      .selectAll('rect')
      .data(function (d) {
        return values.get(d) as d3.InternMap<number, number>;
      })
      .enter()
      .append('rect')
      .attr('width', xScale1.bandwidth())
      .attr('data-factory', d => d[0].toString())
      .attr('x', function (d) {
        return xScale1(d[0].toString()) as any;
      })
      .style('fill', function (d) {
        return color(d[0].toString()) as any;
      })
      .attr('y', function (d) {
        return yScale(d[1]);
      })
      .attr('height', d => {
        return this.height - yScale(d[1]);
      })
      .on('mouseover', function (e, d) {
        d3.select(this).style(
          'fill',
          d3.rgb(color(d[0].toString()) as any).darker(1) as any
        );
      })
      .on('mouseout', function (e, d) {
        d3.select(this).style('fill', color(d[0].toString()) as any);
      });

    // Add legend to chart
    const len = color.domain().length;
    const legendItemWidth = 120;

    const legend = this.svg
      .append('g')
      .attr('class', 'legend')
      .attr('transform', `translate(${this.width / 2},${this.height + 50})`)
      .selectAll('g')
      .data(color.domain().slice())
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
      .text(d => `Фабрика ${factoryName[d]}`);

    legend
      .append('rect')
      .attr('x', -105)
      .attr('width', 20)
      .attr('height', 15)
      .attr('fill', color as any);
  }
}

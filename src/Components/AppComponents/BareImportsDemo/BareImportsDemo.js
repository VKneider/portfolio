import dayjs from 'dayjs';
import 'dayjs/locale/es';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Chart, registerables } from 'chart.js';
import anime from 'animejs';
import DOMPurify from 'dompurify';
import * as d3 from 'd3';

dayjs.extend(advancedFormat);
dayjs.extend(relativeTime);

window._sliceBareImportsReady = true;

export default class BareImportsDemo extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
  }

  init() {
    this.statusEl = this.querySelector('.bi-status');
    this.dayjsDemo = this.querySelector('.bi-dayjs');
    this.chartCanvas = this.querySelector('.bi-chart-canvas');
    this.chartStatus = this.querySelector('.bi-chart-status');
    this.animeBox = this.querySelector('.bi-anime-box');
    this.animeStatus = this.querySelector('.bi-anime-status');
    this.dompurifyDemo = this.querySelector('.bi-dompurify');
    this.dompurifyStatus = this.querySelector('.bi-dompurify-status');
    this.d3Container = this.querySelector('.bi-d3-container');
    this.d3Status = this.querySelector('.bi-d3-status');

    this.testDayjs();
    this.testChartjs();
    this.testAnimejs();
    this.testDompurify();
    this.testD3();
  }

  testDayjs() {
    dayjs.locale('es');
    const now = dayjs();
    const formatted = now.format('dddd, D [de] MMMM [de] YYYY');
    const relative = now.from(dayjs('2025-01-01'));
    this.dayjsDemo.textContent = `${formatted} (${relative})`;
    this.addPass('dayjs');
  }

  testChartjs() {
    Chart.register(...registerables);
    if (typeof Chart !== 'function') {
      this.chartStatus.textContent = '❌ Chart is not a constructor';
      return;
    }
    try {
      const ctx = this.chartCanvas.getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['A', 'B', 'C', 'D'],
          datasets: [{ label: 'Test', data: [3, 7, 2, 5], backgroundColor: '#219ebc' }]
        },
        options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }
      });
      this.chartStatus.textContent = '✅ Chart.js canvas rendered';
      this.addPass('chart.js');
    } catch (e) {
      this.chartStatus.textContent = `❌ Chart.js error: ${e.message}`;
    }
  }

  testAnimejs() {
    if (typeof anime !== 'function') {
      this.animeStatus.textContent = '❌ anime is not a function';
      return;
    }
    this.animeBox.style.transform = 'translateX(0)';
    anime({
      targets: this.animeBox,
      translateX: [0, 180],
      direction: 'alternate',
      loop: true,
      easing: 'easeInOutQuad',
      duration: 1200
    });
    this.animeStatus.textContent = '✅ Anime.js animating (pulsing box)';
    this.addPass('animejs');
  }

  testDompurify() {
    const dirty = '<img src=x onerror="alert(1)"> <b>clean</b>';
    const clean = DOMPurify.sanitize(dirty, { ALLOWED_TAGS: ['b'] });
    this.dompurifyDemo.innerHTML = clean;
    this.dompurifyStatus.textContent = `✅ DOMPurify: "${clean}" (script stripped)`;
    this.addPass('dompurify');
  }

  testD3() {
    if (typeof d3 !== 'object' || !d3.select) {
      this.d3Status.textContent = '❌ d3 is not available';
      return;
    }
    try {
      const container = this.d3Container;
      container.innerHTML = '';

      const data = [
        { name: 'Python', value: 28 },
        { name: 'JavaScript', value: 22 },
        { name: 'TypeScript', value: 18 },
        { name: 'Rust', value: 14 },
        { name: 'Go', value: 10 },
        { name: 'Zig', value: 8 }
      ];

      const width = container.clientWidth || 320;
      const height = 220;
      const margin = { top: 20, right: 20, bottom: 40, left: 60 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const svg = d3.select(container)
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', `0 0 ${width} ${height}`);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const x = d3.scaleBand()
        .domain(data.map(d => d.name))
        .range([0, innerWidth])
        .padding(0.3);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.value)])
        .range([innerHeight, 0]);

      g.append('g')
        .call(d3.axisLeft(y).ticks(4))
        .selectAll('text')
        .attr('font-size', '10px');

      g.append('g')
        .attr('transform', `translate(0,${innerHeight})`)
        .call(d3.axisBottom(x))
        .selectAll('text')
        .attr('font-size', '10px')
        .attr('text-anchor', 'end')
        .attr('transform', 'rotate(-20)');

      const color = d3.scaleOrdinal(d3.schemeSet2);

      g.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', d => x(d.name))
        .attr('y', d => y(d.value))
        .attr('width', x.bandwidth())
        .attr('height', d => innerHeight - y(d.value))
        .attr('fill', (d, i) => color(i))
        .attr('rx', 3)
        .append('title')
        .text(d => `${d.name}: ${d.value}%`);

      g.selectAll('label')
        .data(data)
        .enter()
        .append('text')
        .attr('x', d => x(d.name) + x.bandwidth() / 2)
        .attr('y', d => y(d.value) - 5)
        .attr('text-anchor', 'middle')
        .attr('font-size', '11px')
        .attr('font-weight', 'bold')
        .attr('fill', '#e0e0e0')
        .text(d => `${d.value}%`);

      this.d3Status.textContent = '✅ D3.js bar chart rendered';
      this.addPass('d3');
    } catch (e) {
      this.d3Status.textContent = `❌ D3.js error: ${e.message}`;
    }
  }

  addPass(lib) {
    if (!this.statusEl) return;
    this.statusEl.innerHTML += `<li class="bi-pass">${lib}</li>`;
  }
}

customElements.define('slice-bare-imports', BareImportsDemo);

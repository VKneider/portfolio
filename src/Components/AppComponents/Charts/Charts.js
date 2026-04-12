import '../../../libs/chartjs/chart.umd.js';
import domPurify from '../../../libs/DOMpurify/purify.es.mjs';

const ChartLib = typeof window !== 'undefined' ? window.Chart : null;

export default class Charts extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
    this.chart = null;
    this.handleUpdateClick = this.updateChartData.bind(this);
  }

  init() {
    this.canvas = this.querySelector('.charts-canvas');
    this.updateButton = this.querySelector('.charts-update-button');
    this.sanitizeBox = this.querySelector('.charts-sanitize');

    this.renderChart();
    this.updateButton.addEventListener('click', this.handleUpdateClick);
    this.showSanitizeDemo();
  }

  disconnectedCallback() {
    if (this.updateButton) {
      this.updateButton.removeEventListener('click', this.handleUpdateClick);
    }

    if (this.chart) {
      this.chart.destroy();
      this.chart = null;
    }
  }

  renderChart() {
    if (!ChartLib) {
      this.sanitizeBox.textContent = 'Chart library is unavailable.';
      return;
    }

    this.chart = new ChartLib(this.canvas, {
      type: 'bar',
      data: {
        labels: ['Q1', 'Q2', 'Q3', 'Q4'],
        datasets: [
          {
            label: 'Revenue',
            data: [120, 180, 140, 210],
            backgroundColor: ['#8ecae6', '#219ebc', '#023047', '#ffb703']
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false
      }
    });
  }

  updateChartData() {
    if (!this.chart) {
      return;
    }

    const nextValues = Array.from({ length: 4 }, () => Math.floor(Math.random() * 220) + 40);
    this.chart.data.datasets[0].data = nextValues;
    this.chart.update();

    const dirtyLabel = '<img src=x onerror="alert(1)"> Updated chart dataset';
    const safeLabel = domPurify.sanitize(dirtyLabel, { ALLOWED_TAGS: [] });
    this.chart.data.datasets[0].label = safeLabel;
    this.chart.update();

    this.sanitizeBox.textContent = `Sanitized label applied: ${safeLabel}`;
  }

  showSanitizeDemo() {
    const dirty = '<svg onload=alert(1)>Unsafe Label</svg>';
    const safe = domPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
    this.sanitizeBox.textContent = `Initial sanitize check: ${safe}`;
  }
}

customElements.define('slice-charts', Charts);

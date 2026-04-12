import '../../../libs/chartjs/chart.umd.js';
import domPurify from '../../../libs/DOMpurify/purify.es.mjs';

const ChartLib = typeof window !== 'undefined' ? window.Chart : null;

const SHOWCASE_IDS = ['revenue', 'traffic', 'channels', 'team'];
const REVENUE_LABELS = ['Q1', 'Q2', 'Q3', 'Q4'];
const REVENUE_COLORS = ['#8ecae6', '#219ebc', '#023047', '#ffb703'];
const REVENUE_ACTIVE_COLORS = ['#bde7f4', '#52c6da', '#234c6a', '#ffd166'];

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSeries(length, min, max) {
  return Array.from({ length }, () => randomNumber(min, max));
}

function scaleSeries(values, factor) {
  return values.map((value) => Math.round(value * factor));
}

export default class Charts extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
    this.charts = [];
    this.baseSeries = {
      revenue: [120, 180, 140, 210],
      traffic: [180, 220, 210, 260, 290, 250, 310],
      channels: [32, 24, 18, 26],
      team: [86, 78, 91, 82, 74]
    };
    this.selectedRevenueIndex = null;
    this.handleUpdateClick = this.updateChartData.bind(this);
    this.handleControlsInput = this.applyUserControls.bind(this);
    this.handleRevenueClick = this.handleRevenueChartClick.bind(this);
  }

  init() {
    this.canvases = Array.from(this.querySelectorAll('.charts-canvas'));
    this.updateButton = this.querySelector('.charts-update-button');
    this.intensityInput = this.querySelector('.charts-intensity-input');
    this.lineStyleSelect = this.querySelector('.charts-line-style-select');
    this.fillToggle = this.querySelector('.charts-fill-toggle');
    this.interactionBox = this.querySelector('.charts-interaction');
    this.sanitizeBox = this.querySelector('.charts-sanitize');

    this.renderCharts();
    this.updateButton.addEventListener('click', this.handleUpdateClick);
    this.intensityInput.addEventListener('input', this.handleControlsInput);
    this.lineStyleSelect.addEventListener('change', this.handleControlsInput);
    this.fillToggle.addEventListener('change', this.handleControlsInput);
    this.getRevenueCanvas()?.addEventListener('click', this.handleRevenueClick);
    this.applyUserControls();
    this.showSanitizeDemo();
  }

  disconnectedCallback() {
    if (this.updateButton) {
      this.updateButton.removeEventListener('click', this.handleUpdateClick);
    }

    if (this.intensityInput) {
      this.intensityInput.removeEventListener('input', this.handleControlsInput);
    }

    if (this.lineStyleSelect) {
      this.lineStyleSelect.removeEventListener('change', this.handleControlsInput);
    }

    if (this.fillToggle) {
      this.fillToggle.removeEventListener('change', this.handleControlsInput);
    }

    this.getRevenueCanvas()?.removeEventListener('click', this.handleRevenueClick);

    this.destroyCharts();
  }

  destroyCharts() {
    this.charts.forEach((chart) => chart.destroy());
    this.charts = [];
  }

  getRevenueCanvas() {
    return this.querySelector('.charts-canvas[data-chart="revenue"]');
  }

  getChartById(chartId) {
    return this.charts.find((chart) => chart.canvas.dataset.chart === chartId) || null;
  }

  getControlState() {
    return {
      intensity: Number(this.intensityInput?.value || 1),
      lineStyle: this.lineStyleSelect?.value || 'smooth',
      fillTraffic: Boolean(this.fillToggle?.checked)
    };
  }

  renderCharts() {
    if (!ChartLib) {
      this.sanitizeBox.textContent = 'Chart library is unavailable.';
      return;
    }

    this.destroyCharts();

    const chartConfigs = {
      revenue: {
        type: 'bar',
        data: {
          labels: REVENUE_LABELS,
          datasets: [
            {
              label: 'Revenue',
              data: [...this.baseSeries.revenue],
              backgroundColor: [...REVENUE_COLORS],
              borderRadius: 8
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      },
      traffic: {
        type: 'line',
        data: {
          labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
          datasets: [
            {
              label: 'Sessions',
              data: [...this.baseSeries.traffic],
              borderColor: '#219ebc',
              backgroundColor: 'rgba(33, 158, 188, 0.18)',
              pointBackgroundColor: '#023047',
              fill: true,
              tension: 0.35
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      },
      channels: {
        type: 'doughnut',
        data: {
          labels: ['Organic', 'Ads', 'Email', 'Referral'],
          datasets: [
            {
              label: 'Acquisition',
              data: [...this.baseSeries.channels],
              backgroundColor: ['#ffb703', '#fb8500', '#8ecae6', '#219ebc'],
              hoverOffset: 12
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: 'bottom'
            }
          }
        }
      },
      team: {
        type: 'radar',
        data: {
          labels: ['DX', 'Performance', 'Testing', 'Accessibility', 'Docs'],
          datasets: [
            {
              label: 'Platform Team',
              data: [...this.baseSeries.team],
              backgroundColor: 'rgba(2, 48, 71, 0.2)',
              borderColor: '#023047',
              pointBackgroundColor: '#ffb703'
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            r: {
              beginAtZero: true,
              suggestedMax: 100
            }
          }
        }
      }
    };

    this.charts = this.canvases
      .map((canvas) => {
        const chartId = canvas.dataset.chart;
        const config = chartConfigs[chartId];

        if (!config) {
          return null;
        }

        return new ChartLib(canvas, config);
      })
      .filter(Boolean);
  }

  applyUserControls() {
    const { intensity, lineStyle, fillTraffic } = this.getControlState();
    const revenueChart = this.getChartById('revenue');
    const trafficChart = this.getChartById('traffic');
    const channelsChart = this.getChartById('channels');
    const teamChart = this.getChartById('team');

    if (revenueChart) {
      revenueChart.data.datasets[0].data = scaleSeries(this.baseSeries.revenue, intensity);
      revenueChart.data.datasets[0].backgroundColor = this.getRevenueColors();
      revenueChart.update();
    }

    if (trafficChart) {
      trafficChart.data.datasets[0].fill = fillTraffic;
      trafficChart.data.datasets[0].tension = lineStyle === 'smooth' ? 0.35 : 0;
      trafficChart.data.datasets[0].stepped = lineStyle === 'stepped';
      trafficChart.data.datasets[0].data = scaleSeries(this.baseSeries.traffic, 0.75 + intensity * 0.25);
      trafficChart.update();
    }

    if (channelsChart) {
      channelsChart.options.plugins.legend.position = intensity > 1.2 ? 'right' : 'bottom';
      channelsChart.data.datasets[0].hoverOffset = Math.round(8 + intensity * 8);
      channelsChart.update();
    }

    if (teamChart) {
      teamChart.options.scales.r.suggestedMax = Math.max(100, Math.round(92 + intensity * 12));
      teamChart.data.datasets[0].data = scaleSeries(this.baseSeries.team, 0.8 + intensity * 0.2).map((value) => Math.min(value, 100));
      teamChart.update();
    }

    this.updateInteractionBox();
  }

  getRevenueColors() {
    return REVENUE_COLORS.map((color, index) => {
      if (this.selectedRevenueIndex === null) {
        return color;
      }

      return index === this.selectedRevenueIndex ? REVENUE_ACTIVE_COLORS[index] : color;
    });
  }

  handleRevenueChartClick(event) {
    const revenueChart = this.getChartById('revenue');

    if (!revenueChart) {
      return;
    }

    const activeElements = revenueChart.getElementsAtEventForMode(
      event,
      'nearest',
      { intersect: true },
      true
    );

    if (!activeElements.length) {
      this.selectedRevenueIndex = null;
    } else {
      this.selectedRevenueIndex = activeElements[0].index;
    }

    revenueChart.data.datasets[0].backgroundColor = this.getRevenueColors();
    revenueChart.update();
    this.updateInteractionBox();
  }

  updateInteractionBox() {
    if (!this.interactionBox) {
      return;
    }

    const { intensity, lineStyle, fillTraffic } = this.getControlState();

    if (this.selectedRevenueIndex === null) {
      this.interactionBox.textContent = `Interactive mode active. Revenue intensity ${intensity.toFixed(1)}, traffic curve ${lineStyle}, fill ${fillTraffic ? 'on' : 'off'}. Click a revenue bar to inspect a quarter.`;
      return;
    }

    const revenueValue = scaleSeries(this.baseSeries.revenue, intensity)[this.selectedRevenueIndex];
    const quarter = REVENUE_LABELS[this.selectedRevenueIndex];
    this.interactionBox.textContent = `Selected ${quarter}: revenue ${revenueValue}. Traffic curve ${lineStyle} with fill ${fillTraffic ? 'enabled' : 'disabled'}.`;
  }

  updateChartData() {
    if (!this.charts.length) {
      return;
    }

    this.baseSeries = {
      revenue: randomSeries(4, 70, 240),
      traffic: randomSeries(7, 160, 340),
      channels: randomSeries(4, 12, 40),
      team: randomSeries(5, 60, 98)
    };

    this.applyUserControls();

    const dirtyLabel = '<img src=x onerror="alert(1)"> Updated chart dataset';
    const safeLabel = domPurify.sanitize(dirtyLabel, { ALLOWED_TAGS: [] });

    const revenueChart = this.getChartById('revenue');

    if (revenueChart) {
      revenueChart.data.datasets[0].label = safeLabel;
      revenueChart.update();
    }

    this.sanitizeBox.textContent = `Sanitized label applied to the bar chart: ${safeLabel}. Updated showcases: ${SHOWCASE_IDS.join(', ')}.`;
    this.updateInteractionBox();
  }

  showSanitizeDemo() {
    const dirty = '<svg onload=alert(1)>Unsafe Label</svg>';
    const safe = domPurify.sanitize(dirty, { ALLOWED_TAGS: [] });
    this.sanitizeBox.textContent = `Initial sanitize check: ${safe}`;
  }
}

customElements.define('slice-charts', Charts);

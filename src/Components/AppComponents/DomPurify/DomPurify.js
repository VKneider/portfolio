import domPurify from '../../../libs/DOMpurify/purify.es.mjs';

export default class DomPurify extends HTMLElement {
  constructor(props) {
    super();
    slice.attachTemplate(this);
    slice.controller.setComponentProps(this, props);
    this.demoId = `dompurify-xss-demo-${Math.random().toString(36).slice(2)}`;
    this.messageHandler = null;
  }

  init() {
    this.$root = this.querySelector('.dompurify');
    this.renderPlayground();
  }

  disconnectedCallback() {
    if (this.messageHandler) {
      window.removeEventListener('message', this.messageHandler);
    }
  }

  getPayloadSamples() {
    return [
      {
        label: 'Image onerror + javascript: link',
        value: `<div>\n  <h4>Example user bio</h4>\n  <p>Hello, this content came from user input.</p>\n  <img src="x" onerror="alert('XSS via onerror')" />\n  <a href="javascript:alert('XSS link')">Click me</a>\n</div>`
      },
      {
        label: 'SVG onload payload',
        value: `<svg xmlns="http://www.w3.org/2000/svg" onload="alert('svg onload')">\n  <circle cx="40" cy="40" r="20"></circle>\n</svg>`
      },
      {
        label: 'Script tag payload',
        value: `<div>Safe text before<script>alert('script tag')</script><p>Safe text after</p></div>`
      },
      {
        label: 'Inline event in button',
        value: `<button onclick="alert('XSS button click executed')">Click for surprise</button>`
      }
    ];
  }

  renderPlayground() {
    const payloadSamples = this.getPayloadSamples();

    this.$root.innerHTML = '';
    this.$root.style.marginTop = '1.5rem';
    this.$root.style.padding = '1rem';
    this.$root.style.border = '1px solid var(--color-border, #d0d7de)';
    this.$root.style.borderRadius = '10px';
    this.$root.style.background = 'var(--color-surface, rgba(255, 255, 255, 0.6))';

    const title = document.createElement('h3');
    title.textContent = 'DOMPurify Interactive Demo';
    title.style.margin = '0 0 0.75rem 0';

    const subtitle = document.createElement('p');
    subtitle.textContent = 'Select a payload or write your own HTML, then compare sanitized output vs a controlled vulnerable sandbox execution.';
    subtitle.style.margin = '0 0 0.75rem 0';

    const controls = document.createElement('div');
    controls.style.display = 'flex';
    controls.style.flexWrap = 'wrap';
    controls.style.gap = '0.5rem';
    controls.style.marginBottom = '0.75rem';

    const sampleSelect = document.createElement('select');
    sampleSelect.style.minWidth = '250px';
    sampleSelect.style.padding = '0.5rem';
    sampleSelect.style.borderRadius = '8px';
    sampleSelect.style.border = '1px solid var(--color-border, #d0d7de)';

    payloadSamples.forEach((sample, index) => {
      const option = document.createElement('option');
      option.value = String(index);
      option.textContent = sample.label;
      sampleSelect.appendChild(option);
    });

    const sanitizeButton = document.createElement('button');
    sanitizeButton.type = 'button';
    sanitizeButton.textContent = 'Sanitize';
    sanitizeButton.style.padding = '0.5rem 0.8rem';
    sanitizeButton.style.borderRadius = '8px';
    sanitizeButton.style.border = '1px solid var(--color-border, #d0d7de)';
    sanitizeButton.style.cursor = 'pointer';

    const resetButton = document.createElement('button');
    resetButton.type = 'button';
    resetButton.textContent = 'Reset sample';
    resetButton.style.padding = '0.5rem 0.8rem';
    resetButton.style.borderRadius = '8px';
    resetButton.style.border = '1px solid var(--color-border, #d0d7de)';
    resetButton.style.cursor = 'pointer';

    const runVulnerableButton = document.createElement('button');
    runVulnerableButton.type = 'button';
    runVulnerableButton.textContent = 'Run vulnerable sandbox';
    runVulnerableButton.style.padding = '0.5rem 0.8rem';
    runVulnerableButton.style.borderRadius = '8px';
    runVulnerableButton.style.border = '1px solid var(--color-border, #d0d7de)';
    runVulnerableButton.style.cursor = 'pointer';

    controls.appendChild(sampleSelect);
    controls.appendChild(sanitizeButton);
    controls.appendChild(resetButton);
    controls.appendChild(runVulnerableButton);

    const unsafeTitle = document.createElement('p');
    unsafeTitle.textContent = 'Input HTML to test:';
    unsafeTitle.style.margin = '0 0 0.4rem 0';
    unsafeTitle.style.fontWeight = '600';

    const inputArea = document.createElement('textarea');
    inputArea.rows = 8;
    inputArea.style.width = '100%';
    inputArea.style.padding = '0.75rem';
    inputArea.style.borderRadius = '8px';
    inputArea.style.border = '1px solid var(--color-border, #d0d7de)';
    inputArea.style.fontFamily = 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace';
    inputArea.style.fontSize = '0.9rem';
    inputArea.style.boxSizing = 'border-box';
    inputArea.value = payloadSamples[0].value;

    const resultState = document.createElement('p');
    resultState.style.margin = '0.75rem 0';
    resultState.style.fontWeight = '600';

    const outputLayout = document.createElement('div');
    outputLayout.style.display = 'grid';
    outputLayout.style.gridTemplateColumns = 'repeat(auto-fit, minmax(260px, 1fr))';
    outputLayout.style.gap = '0.75rem';

    const outputCodePanel = document.createElement('div');
    const outputCodeTitle = document.createElement('p');
    outputCodeTitle.textContent = 'Sanitized HTML (string output):';
    outputCodeTitle.style.margin = '0 0 0.4rem 0';
    outputCodeTitle.style.fontWeight = '600';

    const outputCode = document.createElement('pre');
    outputCode.style.margin = '0';
    outputCode.style.padding = '0.75rem';
    outputCode.style.overflowX = 'auto';
    outputCode.style.background = 'rgba(0, 0, 0, 0.05)';
    outputCode.style.borderRadius = '8px';
    outputCode.style.minHeight = '120px';

    outputCodePanel.appendChild(outputCodeTitle);
    outputCodePanel.appendChild(outputCode);

    const sanitizedPanel = document.createElement('div');
    const sanitizedTitle = document.createElement('p');
    sanitizedTitle.textContent = 'Sanitized output rendered:';
    sanitizedTitle.style.margin = '0 0 0.4rem 0';
    sanitizedTitle.style.fontWeight = '600';

    const sanitizedOutput = document.createElement('div');
    sanitizedOutput.style.minHeight = '120px';
    sanitizedOutput.style.padding = '0.75rem';
    sanitizedOutput.style.background = 'rgba(0, 0, 0, 0.03)';
    sanitizedOutput.style.borderRadius = '8px';

    sanitizedPanel.appendChild(sanitizedTitle);
    sanitizedPanel.appendChild(sanitizedOutput);

    const vulnerablePanel = document.createElement('div');
    const vulnerableTitle = document.createElement('p');
    vulnerableTitle.textContent = 'Vulnerable render (sandboxed):';
    vulnerableTitle.style.margin = '0 0 0.4rem 0';
    vulnerableTitle.style.fontWeight = '600';

    const vulnerableHint = document.createElement('p');
    vulnerableHint.textContent = 'Runs raw HTML in isolated iframe. Some payloads require interaction (click).';
    vulnerableHint.style.margin = '0 0 0.4rem 0';
    vulnerableHint.style.fontSize = '0.85rem';
    vulnerableHint.style.opacity = '0.85';

    const vulnerableFrame = document.createElement('iframe');
    vulnerableFrame.setAttribute('sandbox', 'allow-scripts allow-modals');
    vulnerableFrame.style.width = '100%';
    vulnerableFrame.style.height = '180px';
    vulnerableFrame.style.border = '1px solid var(--color-border, #d0d7de)';
    vulnerableFrame.style.borderRadius = '8px';
    vulnerableFrame.style.background = '#fff';

    const vulnerableLog = document.createElement('pre');
    vulnerableLog.style.margin = '0.5rem 0 0 0';
    vulnerableLog.style.padding = '0.75rem';
    vulnerableLog.style.overflowX = 'auto';
    vulnerableLog.style.background = 'rgba(0, 0, 0, 0.05)';
    vulnerableLog.style.borderRadius = '8px';
    vulnerableLog.style.minHeight = '90px';

    vulnerablePanel.appendChild(vulnerableTitle);
    vulnerablePanel.appendChild(vulnerableHint);
    vulnerablePanel.appendChild(vulnerableFrame);
    vulnerablePanel.appendChild(vulnerableLog);

    outputLayout.appendChild(outputCodePanel);
    outputLayout.appendChild(sanitizedPanel);
    outputLayout.appendChild(vulnerablePanel);

    const writeVulnerableLog = (line) => {
      const current = vulnerableLog.textContent || '';
      vulnerableLog.textContent = `${current}${line}\n`;
    };

    const runVulnerablePreview = () => {
      vulnerableLog.textContent = '';
      const dirtyHtml = inputArea.value;
      const instrumentedHtml = `<!doctype html>
<html>
<head><meta charset="utf-8"><style>body{font-family:system-ui;padding:8px;margin:0}</style></head>
<body>
${dirtyHtml}
<script>
(() => {
  const send = (type, payload) => {
    parent.postMessage({ source: 'dompurify-xss-demo', id: '${this.demoId}', type, payload }, '*');
  };
  const nativeAlert = window.alert ? window.alert.bind(window) : null;
  const nativeConfirm = window.confirm ? window.confirm.bind(window) : null;
  const nativePrompt = window.prompt ? window.prompt.bind(window) : null;

  window.alert = (message) => {
    send('dialog', { fn: 'alert', message: String(message) });
    return nativeAlert ? nativeAlert(message) : undefined;
  };

  window.confirm = (message) => {
    send('dialog', { fn: 'confirm', message: String(message) });
    return nativeConfirm ? nativeConfirm(message) : true;
  };

  window.prompt = (message, defaultValue) => {
    send('dialog', { fn: 'prompt', message: String(message) });
    return nativePrompt ? nativePrompt(message, defaultValue) : '';
  };
  window.addEventListener('error', (event) => {
    send('error', { message: event.message || 'Unknown error' });
  });
  send('loaded', { note: 'Sandbox loaded raw payload' });
})();
</script>
</body>
</html>`;
      vulnerableFrame.srcdoc = instrumentedHtml;
    };

    this.messageHandler = (event) => {
      const data = event && event.data;
      if (!data || data.source !== 'dompurify-xss-demo' || data.id !== this.demoId) {
        return;
      }

      if (data.type === 'dialog') {
        writeVulnerableLog(`[XSS executed] ${data.payload.fn}: ${data.payload.message}`);
        return;
      }

      if (data.type === 'error') {
        writeVulnerableLog(`[Sandbox error] ${data.payload.message}`);
        return;
      }

      if (data.type === 'loaded') {
        writeVulnerableLog('[Sandbox ready] Raw payload rendered');
      }
    };

    window.addEventListener('message', this.messageHandler);

    const updateSanitizedOutput = () => {
      const dirtyHtml = inputArea.value;
      const cleanHtml = domPurify.sanitize(dirtyHtml);
      outputCode.textContent = cleanHtml;
      sanitizedOutput.innerHTML = cleanHtml;

      if (dirtyHtml !== cleanHtml) {
        resultState.textContent = 'Status: DOMPurify removed or transformed potentially dangerous markup.';
        resultState.style.color = 'var(--color-warning, #b76e00)';
      } else {
        resultState.textContent = 'Status: No suspicious changes detected by current configuration.';
        resultState.style.color = 'var(--color-success, #1f7a1f)';
      }
    };

    sampleSelect.addEventListener('change', () => {
      const selected = payloadSamples[Number(sampleSelect.value)] || payloadSamples[0];
      inputArea.value = selected.value;
      updateSanitizedOutput();
    });

    sanitizeButton.addEventListener('click', updateSanitizedOutput);
    runVulnerableButton.addEventListener('click', runVulnerablePreview);

    resetButton.addEventListener('click', () => {
      const selected = payloadSamples[Number(sampleSelect.value)] || payloadSamples[0];
      inputArea.value = selected.value;
      updateSanitizedOutput();
      runVulnerablePreview();
    });

    inputArea.addEventListener('input', updateSanitizedOutput);

    updateSanitizedOutput();
    runVulnerablePreview();

    this.$root.appendChild(title);
    this.$root.appendChild(subtitle);
    this.$root.appendChild(controls);
    this.$root.appendChild(unsafeTitle);
    this.$root.appendChild(inputArea);
    this.$root.appendChild(resultState);
    this.$root.appendChild(outputLayout);
  }
}

customElements.define('slice-dompurify', DomPurify);

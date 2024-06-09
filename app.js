import {documentReady} from 'https://unpkg.com/html-ready';
import {BrowserQRCodeSvgWriter} from 'https://unpkg.com/@zxing/library?module';

await documentReady;

const params = new URLSearchParams(location.search);
const text = document.querySelector('#text');
const qrcode = document.querySelector('#qrcode');

text.value = params.get('text') ?? null;

function generateCode() {
  if (text.value.length === 0) {
    qrcode.alt = '';
    qrcode.src = '';
    return;
  }

  const qrcodeWriter = new BrowserQRCodeSvgWriter();
  const svg = qrcodeWriter.write(text.value, 256, 256);
  svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
  qrcode.alt = text.value;
  qrcode.src = `data:image/svg+xml,${encodeURIComponent(svg.outerHTML.replaceAll(/\r?\n/g, ''))}`;
}

text.addEventListener('input', () => {
  generateCode();
});

generateCode();

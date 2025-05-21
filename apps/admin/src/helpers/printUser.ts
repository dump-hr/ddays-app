import { UserPublicDto } from '@ddays-app/types/src/dto/user';

export const printUser = async (user: Partial<UserPublicDto> | undefined) => {
  if (!user) return;

  const firstName = user.firstName || '';
  const lastName = user.lastName || '';
  const longerNameLength = Math.max(firstName.length, lastName.length);

  let fontSize = 30;
  if (longerNameLength >= 11) {
    fontSize -= (longerNameLength - 9) * 1.7;
  }

  const dynamicStyle = `
    @font-face {
      font-family: NeueMachina;
      src: url('/admin/PPNeueMachina-PlainMedium.woff2') format('woff2');
    }

    @media print {
      @page {
        size: 105mm 148mm;
        margin: 0;
      }

      body {
        position: relative;
        height: 148mm;
        width: 105mm;
        margin: 0;
        padding: 0;
      }

      .name-container {
        position: absolute;
        bottom: 25px;
        left: 48.5px;
        width: 215px;
      }
    }

    h1 {
      font-family: NeueMachina;
      font-weight: 200;
      font-size: ${Math.floor(fontSize)}px;
      line-height: 100%;
      letter-spacing: -4%;
      vertical-align: middle;
      text-transform: uppercase;
      color: #171615;
    }
  `;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <style>${dynamicStyle}</style>
    </head>
    <body>
      <div class="name-container">
        <h1 class="name">${firstName}<br>${lastName}</h1>
      </div>
    </body>
    </html>
  `;

  // Create hidden iframe
  const iframe = document.createElement('iframe');
  iframe.style.position = 'fixed';
  iframe.style.right = '0';
  iframe.style.bottom = '0';
  iframe.style.width = '0';
  iframe.style.height = '0';
  iframe.style.border = '0';
  document.body.appendChild(iframe);

  // Write to iframe
  const doc = iframe.contentWindow?.document;
  if (!doc) return;

  doc.open();
  doc.write(htmlContent);
  doc.close();

  // Wait for font to load
  iframe.onload = async () => {
    await iframe.contentWindow?.document.fonts.ready;
    setTimeout(() => {
      iframe.contentWindow?.focus();
      iframe.contentWindow?.print();
      document.body.removeChild(iframe); // cleanup
    }, 300); // small delay ensures render
  };
};

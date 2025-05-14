import { UserPublicDto } from '@ddays-app/types/src/dto/user';

export const userPrintStyle = `
  @font-face {
    font-family: NeueMachina;
    font-style: normal;
    src: url('${window.location.origin}/admin/src/assets/fonts/PPNeueMachina-PlainMedium.woff2') format('woff2');
  }

  @media print {
    @page {
      size: 105mm 148mm;
      margin: 0;
    }
    
    body {
      position: relative;
      height: 148mm; /* Match paper height */
      width: 105mm;  /* Match paper width */
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
   font-size: 30px;
   line-height: 100%;
   letter-spacing: -4%;
   vertical-align: middle;
   text-transform: uppercase;
   color: #171615;
  }
`;

export const printUser = async (user: UserPublicDto | undefined) => {
  if (!user) return;

  const { Printd } = await import('printd');
  const printer = new Printd();

  const firstName = user?.firstName || '';
  const lastName = user?.lastName || '';

  // Find the longer name for font size calculation
  const longerNameLength = Math.max(firstName.length, lastName.length);

  let fontSize = 30; // Default size

  if (longerNameLength >= 11) {
    // Reduce font size gradually as name gets longer
    fontSize = fontSize - (longerNameLength - 9) * 1.7;
  }

  const dynamicStyle = `
    ${userPrintStyle}
    h1.name {
      font-size: ${Math.floor(fontSize)}px;
    }
  `;

  const content = window.document.createElement('div');
  content.innerHTML = `
    <div class="name-container">
      <h1 class="name">${user.firstName}<br>${user.lastName}</h1>
    </div>
  `;

  printer.print(content, [dynamicStyle]);
};

import { UserPublicDto } from '@ddays-app/types/src/dto/user';

export const userPrintStyle = `
  @font-face {
    font-style: normal;
    font-weight: 400;
  }

  @media print {
    @page {
      margin: 0;
    }
    body {
      margin-top: 412px;
      margin-left: 44px;
      margin-right: 44px;
    }
  }

  h1 {
    font-family: 'PP', sans-serif;
    font-weight: 400;
    font-size: 30px;
    line-height: 1.2;
    letter-spacing: -0.5%;
    color: black;
    text-transform: uppercase;
  }
`;

export const printUser = async (user: UserPublicDto | undefined) => {
  if (!user) {
    return;
  }
  const { Printd } = await import('printd');
  const printer = new Printd();
  const content = window.document.createElement('div');

  content.innerHTML = `<h1>${user.firstName}<br>${user.lastName}</h1>`;

  printer.print(content, [userPrintStyle]);
};

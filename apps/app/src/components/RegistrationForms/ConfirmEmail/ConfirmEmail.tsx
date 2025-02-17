import Button from '../../Button/Button';
import c from './ConfirmEmail.module.scss';

export const ConfirmEmail = () => {
  return (
    <div className={c.confirmEmail}>
      <div className={c.confirmEmailUpper}>
        <h2>Potvrdi svoj e-mail</h2>
        <p>
          Poslali smo ti e-mail na mikejla@dump.hr da potvrdimo ispravnost
          unesene adrese. Nakon što se e-mail pojavi u tvom sandučiću, klikni na
          link kako bi registracija bila uspješna.
        </p>
      </div>

      <Button children='Potvrdi email' variant='orange' />
    </div>
  );
};

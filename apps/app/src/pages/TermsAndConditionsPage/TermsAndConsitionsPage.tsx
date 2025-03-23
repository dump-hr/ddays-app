import c from './TermsAndConditionsPage.module.scss';
import ArrowLeftWhite from '@/assets/icons/arrow-left-white.svg';
import ArrowLeft from '@/assets/icons/arrow-left.svg';
import { useNavigate } from 'react-router-dom';
import { useDeviceType } from '../../hooks/UseDeviceType';
import Button from '../../components/Button';

export const TermsAndConditionsPage = () => {
  const { isMobile } = useDeviceType({});

  const navigate = useNavigate();

  return (
    <div className={c.wrapper}>
      <button className={c.backButton} onClick={() => navigate(-1)}>
        <img src={isMobile ? ArrowLeft : ArrowLeftWhite} alt='' />
      </button>
      <div className={c.sectionsWrapper}>
        <h1 className={c.title}>Uvjeti i odredbe</h1>
        <p className={c.text}>
          Korisnik registracijom na days.dump.hr web stranicama potvrđuje da je
          pročitao i da u cijelosti prihvaća ove Uvjete korištenja web stranice
          days.dump.hr (dalje u tekstu: Uvjeti korištenja), a svakim korištenjem
          days.dump.hr, Korisnik potvrđuje da je u tome trenutku upoznat s
          aktualnom verzijom Uvjeta korištenja i da iste u cijelosti prihvaća.
          Prihvaćanjem Uvjeta korištenja Korisnik daje DUMP Udruzi mladih
          programera (dalje u tekstu: Udruga) izričitu suglasnost da smije
          podatke dostavljene prilikom registracije u skladu sa Zakonom o
          zaštiti osobnih podataka obrađivati u svrhu registracije, odnosno
          ispunjavanja prava i obveza temeljem ovih Uvjeta.
        </p>
        <p className={c.text}>Ovim Uvjetima korištenja regulira se:</p>
        <ul>
          <li className={c.bullet}>Način i svrha korištenja days.dump.hr</li>
          <li className={c.bullet}>
            Način izravnog i neizravnog prikupljanja podataka korisnika
          </li>
          <li className={c.bullet}>Vrsta podataka koji se prikupljaju</li>
          <li className={c.bullet}>Način korištenja i obrađivanja podataka</li>
          <li className={c.bullet}>Prosljeđivanje korisničkih podataka</li>
          <li className={c.bullet}>Zadržavanje korisničkih podataka</li>
          <li className={c.bullet}>Sigurnosne procedure</li>
          <li className={c.bullet}>Promjena Uvjeta</li>
        </ul>
        <section>
          <h2 className={c.subtitle}>Način i svrha korištenja days.dump.hr</h2>
          <p className={c.text}>
            Dokumenti, podaci i informacije objavljeni na days.dump.hr ne smiju
            se reproducirati, distribuirati ili na bilo koji način koristiti u
            komercijalne svrhe bez izričitog pristanka Udruge te se mogu
            koristiti isključivo za individualne potrebe korisnika uz poštivanje
            svih autorskih i vlasničkih prava i prava trećih osoba. Korištenjem
            sadržaja days.dump.hr korisnik prihvaća sve rizike koji nastaju iz
            korištenja te prihvaća koristiti sav sadržaj isključivo za osobnu
            uporabu i vlastitu odgovornost. Udruga neće biti odgovorna za način
            korištenja days.dump.hr, za radnje korisnika uporabom ili
            zlouporabom sadržaja kao niti za bilo kakvu štetu koja može nastati
            korisniku ili trećoj strani u vezi s uporabom ili zlouporabom
            sadržaja days.dump.hr.
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Način prikupljanja osobnih podataka</h2>
          <p className={c.text}>
            Izravno od korisnika prilikom registracije na stranici.
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Vrsta informacija koje se prikupljaju</h2>
          <p className={c.text}>
            Prilikom registracije korisnik izravno daje sljedeće osobne podatke:
            <ul>
              <li className={c.bullet}>Ime i prezime</li>
              <li className={c.bullet}>E-mail adresu</li>
            </ul>
            Prilikom prijave na newsletter putem weba korisnik izravno daje
            sljedeće osobne podatke:
            <ul>
              <li className={c.bullet}>Ime i prezime</li>
              <li className={c.bullet}>E-mail adresu</li>
            </ul>
            Prilikom prijave na flytalks putem weba korisnik izravno daje
            sljedeće osobni podatke:
            <ul>
              <li className={c.bullet}>Životopis</li>
              <li className={c.bullet}>
                Poveznicu na osobni profil na društvenim mrežama
              </li>
              <li className={c.bullet}>Opis</li>
            </ul>
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Korištenje prikupljenih informacija</h2>
          <p className={c.text}>
            Prihvaćanjem ovih Uvjeta korištenja korisnik daje svoju privolu da
            se podaci prikupljeni putem days.dump.hr mogu koristiti u neku od
            sljedećih svrha:
          </p>
          <ul>
            <li className={c.bullet}>
              Omogućiti korisniku pristup određenim web stranicama i/ili
              funkcionalnostima na days.dump.hr
            </li>
            <li className={c.bullet}>
              Preventirati zlouporabu provjerom korisničkog identiteta
            </li>
            <li className={c.bullet}>
              Analizirati korisničko korištenje days.dump.hr i raditi web
              statističke izvještaje za interne potrebe Udruge.
            </li>
            <li className={c.bullet}>
              Proslijediti korisničke podatke trećim stranama s kojima Udruga
              poslovno surađuje, a u svrhu zadovoljavanja korisničke
              funkcionalnosti vezane uz iste.
            </li>
          </ul>
        </section>
        <section>
          <h2 className={c.subtitle}>Prosljeđivanje korisničkih podataka</h2>
          <p className={c.text}>
            Prihvaćanjem ovih Uvjeta korištenja korisnik daje svoju privolu da
            Udruga korisničke podatke prikupljene putem days.dump.hr može
            prosljeđivati:
          </p>
          <ul>
            <li className={c.bullet}>
              Poslovnim partnerima koji su uključeni u pružanje usluge temeljem
              korisničkog upita
            </li>
            <li className={c.bullet}>
              Nadležnim tijelima javne i državne uprave ukoliko se radi o sumnji
              na zlouporabu days.dump.hr web stranica ili o drugim pitanjima iz
              njihove nadležnosti
            </li>
            <li className={c.bullet}>U svrhu ispunjavanja zakonskih obveza</li>
            <div className={c.bullet}>
              Poslovnim partnerima u svrhu zapošljavanja
            </div>
          </ul>
          <p className={c.text}>
            Kao odgovor na žalbu da je došlo do povrede Općih uvjeta korištenja
            usluga Udruge Prigodom korištenja, tj. posjeta days.dump.hr,
            poslužitelj pohranjuje određene informacije u obliku "lokalne
            pohrane" ("localstorage") u Korisnikovom internetskom pregledniku.
            "Lokalna pohrana" se koristi za prepoznavanje Korisnika u tijeku
            njegovog jednog spajanja i nakon toga se briše. "Lokalna pohrana" je
            skup podataka koje generira poslužitelj mrežnih stranica, a koje
            internetski preglednik sprema u vlastitu pohranu. "Lokalna pohrana"
            se ne može koristiti za pokretanje programa ili unošenje virusa na
            Korisnikovo računalo. Poslužitelji pri posjeti days.dump.hr
            stranicama spremaju jedinstveni korisnički token, koji identificira
            korisnika pri njegovoj posjeti days.dump.hr web stranicama i
            omogućuje mu da koristi korisničke funkcionalnosti tih stranica.
            Udruga korištenjem "lokalne pohrane" ni na koji način ne prikuplja
            informacije u vezi s korištenjem računala ili pregledavanjem drugih
            stranica na internetu Korisnika. S obzirom na to da se "lokalna
            pohrana" nalazi na računalu Korisnika, Udruga ga ne može pronaći ako
            Korisnik posjeti web stranice Udruge s nekoga drugog računala.
            "Lokalna pohrana" se standardno koristi u mrežnim aplikacijama koje
            Korisniku nakon identifikacije moraju omogućiti autorizirani pristup
            privatnim poslužiteljima. Ovo je rješenje uvjetovano tehnologijom
            izrade mrežnih aplikacija te ga rabe i web stranice Udruge, koje za
            ispravno funkcioniranje u pregledniku zahtijevaju od Korisnika da
            postavi "lokalnu pohranu" koji je aktivan tijekom korištenja
            days.dump.hr. U slučaju da korisnik odbije prihvaćanje "lokalne
            pohrane", registracija i cjelokupne korisničke funkcionalnosti
            days.dump.hr mu neće biti dostupni.
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Zadržavanje korisničkih podataka</h2>
          <p className={c.text}>
            Udruga će zadržati prikupljene podatke o korisnicima samo do
            sljedećeg izdanja događaja.
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Sigurnosne procedure</h2>
          <p className={c.text}>
            Udruga na redovitoj osnovi razmatra procedure kako bi se korisnički
            osobni podaci zaštitili od neautoriziranog pristupa, slučajnog
            gubitka ili uništenja. Koristi se tržišni standard (SSL tehnologija)
            kako bi se enkriptirali osjetljivi korisnički podaci. Treće strane
            kojima se osobni podaci sukladno ovim Uvjetima korištenja
            prosljeđuju obvezani su za čuvanje prikupljenih podataka ugovorima o
            povjerljivosti sklopljenim s Udrugom. U svakom slučaju, Udruga u
            pružanju usluga inzistira na sigurnosti korisničkih podataka i
            nastoji da treće strane kojima se isti prosljeđuju održavaju istu
            razinu zaštite korisničkih podataka. Korisnici trebaju biti svjesni
            da je komunikacija putem interneta, u smislu e-mail i web
            komunikacije nesigurna osim u slučajevima SSL enkripcije. Sama
            priroda interneta je da podaci mogu prolaziti kroz internetske veze
            u mnogim zemljama prije nego što su isporučeni. Udruga ne može
            prihvatiti odgovornost za neautorizirani pristup ili gubitak
            informacija ukoliko se radi o slučajevima nad kojima Udruga nema
            izravni nadzor.
          </p>
        </section>
        <section>
          <h2 className={c.subtitle}>Promjena Uvjeta</h2>
          <p className={c.text}>
            Udruga pridržava pravo izmjene ovih Uvjeta korištenja, o čemu će
            Korisnik biti pravodobno obaviješten putem days.dump.hr web stranice
            ili na drugi primjeren način.
          </p>
        </section>
        <Button
          variant='orange'
          className={c.button}
          onClick={() => navigate(-1)}>
          Povratak
        </Button>
      </div>
    </div>
  );
};

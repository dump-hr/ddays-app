import { useState } from 'react';
import Tab from '../../components/Tab';
import TabGroup from '../../components/TabGroup';
import c from './Home.module.scss';

const Home = () => {
  const [lecturesTab, setLecturesTab] = useState<string>('tab1');

  return (
    <div className={c.page}>
      <header className={c.header}></header>
      <main className={c.main}>
        <section>
          <h1>{lecturesTab}</h1>
          <TabGroup setter={setLecturesTab}>
            <Tab id='tab1'>Tab 1</Tab>
            <Tab id='tab2'>Tab 2</Tab>
            <Tab id='tab3'>Tab 3</Tab>
          </TabGroup>
        </section>
      </main>
    </div>
  );
};

export default Home;

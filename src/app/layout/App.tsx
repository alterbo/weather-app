import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import styles from './App.module.css';

const App = () => {

  return (
    <>
      <header className={ styles.header }>
        <nav className={ styles.nav }>
          <Navbar />
        </nav>
      </header>
      <main className={ styles.content }>
        <Outlet />
      </main>
      <footer className={ styles.footer }>
        <p>Weather app de alberto ferrero. 2024</p>
      </footer>
    </>
  )
};

export default App

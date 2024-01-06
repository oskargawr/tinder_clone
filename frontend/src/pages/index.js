import React from 'react'
import HomePage from './Home';
import DashboardPage from './dashboard';
import Boarding from './boarding';
import { useRouter } from 'next/router'
import '../style/index.scss';


function App() {
    const router = useRouter();
    let Component;

    switch (router.pathname) {
        case '/':
            Component = HomePage;
            break;
        case '/dashboard':
            Component = DashboardPage;
            break;
        case '/boarding':
            Component = Boarding;
            break;
        default:
            Component = HomePage;
    }

    return <Component />
}

export default App;
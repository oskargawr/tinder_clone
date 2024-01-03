import React from 'react'
import HomePage from './homePage';
import Dashboard from './dashboard';
import OnBoarding from './onBoarding';
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
            Component = Dashboard;
            break;
        case '/onboarding':
            Component = OnBoarding;
            break;
        default:
            Component = HomePage;
    }

    return <Component />
}

export default App;
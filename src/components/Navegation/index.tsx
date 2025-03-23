import { useState, useEffect } from "react";
import './style.css';

interface NavegationProps {
    menuOpen: boolean;
    openMenu: () => void;
    closeMenu: () => void;
    logoutUser: () => void;
}

function Navegation({logoutUser, menuOpen, openMenu, closeMenu}: NavegationProps) {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [transform, setTransform] = useState("");

    useEffect(() => {
        window.addEventListener('resize', () => {
            setWindowWidth(window.innerWidth)
        });

        if (windowWidth >= 950) {
            setTransform("")
        }

        if (windowWidth < 950 && !menuOpen) {
            closeMenu();
            setTransform('hide-menu-content')
        }

        if (windowWidth < 950 && menuOpen) {
            openMenu();
            setTransform('show-menu-content')
        } 

    }, [windowWidth, menuOpen, closeMenu, openMenu]);

    
    return (
        <nav className={`menu-content ${transform}`}>
            <ul>
                <button className="logout-button" onClick={logoutUser}>Logout</button>
            </ul>       
        </nav>
    );
}

export default Navegation;
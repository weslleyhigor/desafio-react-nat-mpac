import { useState } from 'react';

import './style.css';
import menuOpenImg from '../../assets/menu-open.svg';
import menuCloseImg from '../../assets/menu-close.svg';
import Navegation from '../Navegation';

interface HeaderProps {
    logoutUser: () => void;
    userEmail: string;
}

function Header({logoutUser, userEmail}: HeaderProps) {
    const [menuOpen, setMenuOpen] = useState(false);    

    function openMenu (){
        setMenuOpen(true);
    }

    function closeMenu () {
        setMenuOpen(false);
    }  
    
    return (
        <header>
            <div className='header-content'>
      
                <p className='good-welcome'>Bem-vindo(a) <span>{userEmail}</span></p>          

                <div>
                    { 
                        menuOpen ? 
                            <div>
                                <div>
                                    <img className='menu-close display-flex' src={menuCloseImg} onClick={closeMenu}/>
                                </div>
                            </div> 
                        :
                            <div>
                                <img className='menu-open display-flex' src={menuOpenImg} onClick={openMenu}/>
                            </div>    
                    }
                </div>
            </div>

            <Navegation logoutUser={logoutUser} menuOpen={menuOpen} openMenu={openMenu} closeMenu={closeMenu} />
        </header>
    )
}

export default Header;  
import type { FunctionalComponent } from 'preact'
import { h, Fragment } from 'preact'
import { useState, useEffect } from 'preact/hooks'

const MenuButton: FunctionalComponent = () => {
    const [menuOpen, setMenuOpen] = useState(false)

    useEffect(() => {
        const logoContainer = document.getElementsByClassName('logo-container')[0];
        const navContainer = document.getElementsByClassName('nav-container')[0];
        const innerMenu = document.getElementsByClassName('menu')[0];
        const menuButton = document.getElementById('menu-toggle');
    
        let toggleEls = [logoContainer, navContainer, innerMenu, menuButton];
    
        if (menuOpen) {
            toggleEls.forEach((el) => el.classList.add('menu-open'))
        } else {
            toggleEls.forEach((el) => {el.classList.remove('menu-open')})
        }
    }, [menuOpen])

    return (
        <button type="button" aria-pressed={menuOpen ? 'true' : 'false'} id="menu-toggle" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? "Close Menu" : "Menu"}
        </button>
    )
}

export default MenuButton;


import React from 'react'
import '../styles/header.scss'

export function Header () {
    return (
        <header className="header">
            <div className="header__content">
                <img src="/logo.svg" alt="to.do logo" />
            </div>
        </header>
    )
}
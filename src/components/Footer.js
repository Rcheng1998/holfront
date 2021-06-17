import React from 'react'
import { Navbar, Container, NavLink, NavItem, Nav } from 'react-bootstrap'

class Footer extends React.Component{
    render(){
        return(
            <div className="fixed-bottom">
                <Navbar color="light">
                    <Container className="justify-content-center">
                        <Nav>
                            <NavItem>
                                <NavLink href="/">Home</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="/faq">FAQ</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://www.buymeacoffee.com/RickC">Support Me</NavLink>
                            </NavItem>
                            <NavItem>
                                <NavLink href="https://twitter.com/RC98_17">🔨 by RickC</NavLink>
                            </NavItem>

                        </Nav>
                    </Container>
                </Navbar>
            </div>

        );
    }
}

export default Footer
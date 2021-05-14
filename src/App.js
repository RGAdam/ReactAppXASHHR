import React, { useState } from 'react'
import Home from './components/Home'
import GuardedRoute from "./components/GuardedRoute"
import GetPlayerStats from "./components/GetPlayerStats"
import DataTable from "./components/DataTable"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"
import { Button, Navbar, Nav } from 'react-bootstrap'

function App() {
    const[isAuthenticated, setIsAuthenticated] = useState(false)

    function login() {
        setIsAuthenticated(true)
        alert("Logged in")
    }

    function logout() {
	    setIsAuthenticated(false)
	    alert("Logged out")
    }

    return (
        <Router>
            <div>
                <Navbar bg="light" expand="lg">
                    <Navbar.Brand href="/">XASHHR</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Link to={'/'}><Button variant="outline-dark">Home</Button></Link>{' '}
                            <Button variant="outline-dark" onClick={ login }>Login</Button>{' '}
                            <Button variant="outline-dark" onClick={ logout }>Logout</Button>{' '}
                            <Link to={'/getplayerstats'}><Button variant="outline-dark">Get Player Stats</Button></Link>{' '}
                            <Link to={'/datatable'}><Button variant="outline-dark">Data Table</Button></Link>{' '}
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>

                <Switch>
                    <Route exact path='/' component={Home}/>
                    <GuardedRoute path='/getplayerstats' component={GetPlayerStats} auth={isAuthenticated}/>
                    <GuardedRoute path='/datatable' component={DataTable} auth={isAuthenticated}/>
                </Switch>
             </div>
        </Router>
    )
}

export default App

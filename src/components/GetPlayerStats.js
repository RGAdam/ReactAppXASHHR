import React from 'react'
import { Button, Col, Form } from 'react-bootstrap'

class GetPlayerStats extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            apiKey: 'b94ca6d1-3238-4997-8afe-5c147cd94aa4',
            username: '',
            playerData: [],
            hasData: false
        }
    }

    onInputChange = (event) => {
        this.setState({ username: event.target.value })
    }

    submitHandler = (event) => {
        event.preventDefault()

        let apiKey = this.state.apiKey
        let username = this.state.username

        fetch(`https://api.hypixel.net/player?key=${apiKey}&name=${username}`)
            .then(result => result.json())
            .then((data) => { this.setState({ playerData: data }) })
            .catch(console.log)

        this.setState( {hasData: true} )
    }

    render() {
        const playerData = this.state.playerData
        const hasData = this.state.hasData

        return(
            <div>
                <h1>Get Specific Player's Statistics</h1>
                <Form onSubmit={ this.submitHandler }>
                    <Form.Row>
                        <Col xs={3}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                name="username"
                                type="text"
                                placeholder="Enter Username"
                                onChange={ this.onInputChange }
                            />
                        </Col>
                    </Form.Row>
                    <Form.Text className="text-muted">
                        Usernames to try: RGAdam, Capstical, TommyInnit, The99thDasher, ThirtyVirus
                    </Form.Text>
                    <p></p>
                    <Button variant="primary" type="submit">Get Stats</Button>
                </Form>

                { hasData? (
                    <pre>{ JSON.stringify(playerData.player, null, 2) }</pre>
                ) : (
                    <p></p>
                )}
            </div>
        )
    }
}

export default GetPlayerStats


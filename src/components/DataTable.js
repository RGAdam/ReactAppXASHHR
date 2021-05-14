import React from 'react'
import {Button, Col, Form, ListGroup, ListGroupItem} from "react-bootstrap"

class DataTable extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            act: 0,
            index: '',
            listOfNames: []
        }
    }

    componentDidMount(){

        let listFromLocalStorage = JSON.parse(localStorage.getItem("listOfNames"))

        if (listFromLocalStorage != null) {
            this.setState({ listOfNames: listFromLocalStorage })
        }

        this.refs.username.focus()
    }

    submitUsername = (e) => {
        e.preventDefault()

        let listOfNames = this.state.listOfNames
        let username = this.refs.username.value

        if(this.state.act === 0) {
            let data = { username }
            listOfNames.push(data)
        }
        else {
            let index = this.state.index
            listOfNames[index].username = username
        }

        this.setState({
            listOfNames: listOfNames,
            act: 0
        })

        this.refs.myForm.reset()
        this.refs.username.focus()

        localStorage.setItem("listOfNames", JSON.stringify(this.state.listOfNames))
    }

    removeUser = (i) => {
        let data = this.state.listOfNames

        data.splice(i, 1)
        this.setState({
            data: data
        })

        this.refs.myForm.reset()
        this.refs.username.focus()
    }

    editUser = (i) => {
        let data = this.state.listOfNames[i]
        this.refs.username.value = data.username

        this.setState({
            act: 1,
            index: i
        })

        this.refs.username.focus()
    }

    render() {
        let data = this.state.listOfNames
        return (
            <div>
                <h1>Player Database</h1>
                <Form ref="myForm">
                    <Form.Row>
                        <Col xs={3}>
                            <Form.Label>Username</Form.Label>
                            <Form.Control ref="username" type="text" placeholder="Enter Username" />
                        </Col>
                    </Form.Row>
                    <p></p>
                    <Button onClick={ (e)=> this.submitUsername(e) }>Submit</Button>
                </Form>
                <pre>
                    {data.map((data, i) =>
                        <ListGroup key={i}>
                            <ListGroupItem>
                                <p>{i+1}. {data.username}</p>
                                <Button className='mr-1' onClick={ () => this.removeUser(i) }>Remove</Button>
                                <Button onClick={ () => this.editUser(i) }>Edit</Button>
                            </ListGroupItem>

                        </ListGroup>
                    )}
                </pre>
            </div>
        )
    }
}

export default DataTable

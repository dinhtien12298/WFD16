import React, { Component } from 'react'
import { Form, FormGroup, Input, Button } from 'reactstrap';

class NewGame extends Component {
    state = {
        game: {
            
        }
    }

    render() {
        return (
            <div>
                <form style={{ marginTop: "15px" }}>
                    <FormGroup>
                        <Input type="text" name="player1" placeholder="Player 1" required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="player2" placeholder="Player 2" required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="player3" placeholder="Player 3" required />
                    </FormGroup>
                    <FormGroup>
                        <Input type="text" name="player4" placeholder="Player 4" required />
                    </FormGroup>
                    <div className="text-center">
                        <Button type="submit" color="danger">Create New Game</Button>
                    </div>
                </form>
            </div>
        );
    }
}

export default NewGame;
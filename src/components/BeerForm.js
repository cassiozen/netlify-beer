import React, { Component } from 'react'
import { Segment, Form, Input, Select, Button, Rating } from 'stardust'

export default class BeerList extends Component {
  state = {
    name: '',
    style: '',
    rating: 3,
  }

  beerStyles = [
    { value: 'Lager', text: 'Lager' },
    { value: 'Pilsener', text: 'Pilsener' },
    { value: 'Weissbier', text: 'Weissbier' },
    { value: 'Pale Ale', text:'Pale Ale' },
    { value: 'Amber Ale', text:'Amber Ale' },
    { value: 'Bock', text: 'Bock' },
    { value: 'Stout', text: 'Stout' },
  ]

  handleName = (evt) => {
    this.setState({name: evt.target.value});
  }

  handleStyle = (evt, style) => {
    this.setState({style});
  }

  handleRating = (evt, rate) => {
    this.setState({rating: rate.rating});
  }

  handleSubmit = (evt) => {
    this.props.create(JSON.stringify(this.state));
  }

  render() {
    const {name, rating} = this.state;
    return (
      <Segment>
        <Form>
          <Form.Fields evenlyDivided>
            <Form.Field label='Beer Name'>
              <Input placeholder='Beer Name' value={name} onChange={this.handleName} />
            </Form.Field>
            <Form.Field label='Style'>
              <Select name='style' options={this.beerStyles} onChange={this.handleStyle} />
            </Form.Field>
          </Form.Fields>
          <Form.Field label='Beer Rating'>
            <Rating maxRating={5} defaultRating={rating} icon='star' size='massive' onRate={this.handleRating} />
          </Form.Field>
          <Button type='submit' onClick={this.handleSubmit}>Submit</Button>
        </Form>
      </Segment>
    )
  }
}

import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Card, Button, Icon, Image, Loader, Rating } from 'stardust';

class BeerList extends Component {
  handleNew = () => {
    this.props.router.push('/new');
  }

  render() {
    const {fetchingData, beers} = this.props;
    return (
      <div>
        <Card.Group>
          { fetchingData?
            <div className='ui active dimmer'>
              <Loader>Loading</Loader>
            </div>
          :
          beers.map(beer => (
            <Card key={beer.id}>
              <Image src={'https://s3.amazonaws.com/slsbeer/'+beer.picture} />
              <Card.Content>
                <Card.Header>{beer.name}</Card.Header>
                <Card.Meta>{beer.style}</Card.Meta>
                <Card.Description>
                  <Rating defaultRating={beer.rating} maxRating={5} disabled />
                </Card.Description>
              </Card.Content>
            </Card>
          ))
        }
        </Card.Group>

        <Button className='add-button orange animated' onClick={this.handleNew}>
          <div className='visible content'><Icon name='bar' /></div>
          <div className='hidden content'><Icon name='plus'/></div>
        </Button>
      </div>
    )
  }
}


// Export the decorated class
export default withRouter(BeerList);

// PropTypes
BeerList.propTypes = {
  fetchingData: React.PropTypes.bool,
  beers: React.PropTypes.array.isRequired,
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

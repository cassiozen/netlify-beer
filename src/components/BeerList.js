import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Segment, List, Button, Icon, Image, Loader } from 'stardust';

class BeerList extends Component {
  handleNew = () => {
    this.props.router.push('/new');
  }

  render() {
    const {fetchingData, beers} = this.props;
    return (
      <div>
        <Segment>
          { fetchingData?
            <div>
              <div className='ui active dimmer'>
                <Loader>Loading</Loader>
              </div>
              <Image src='http://semantic-ui.com/images/wireframe/short-paragraph.png' />
            </div>
          :
          <List className='relaxed divided'>
            {beers.map(beer => (
              <List.Item key={beer.id} header={beer.name} description={`${beer.style} -  ${beer.rating} stars.`} />
            ))}
          </List>
          }
        </Segment>
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
  router: React.PropTypes.shape({
    push: React.PropTypes.func.isRequired
  }).isRequired
};

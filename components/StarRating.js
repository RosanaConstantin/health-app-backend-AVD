import React from 'react'
import StarRating from 'react-native-star-rating';


export default  class StarRatingForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      starCount: 1
    };
  }

  onStarRatingPress(rating) {
    this.setState({
      starCount: rating
    });
    global.stars = rating;
  }

  render() {
    return (
      <StarRating
        disabled={false}
        maxStars={5}
        isHalfStarEnabled={true}
        rating={this.state.starCount}
        selectedStar={(rating) => this.onStarRatingPress(rating)}
      />
    );
  }
}

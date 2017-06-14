import React, { Component } from 'react'
import _ from 'lodash';
import { connect } from 'react-redux';
import './Intersections.css';
import classNames from 'classnames';
import { getCombinations, imgPrefix } from '../utility';
import { BLANK_POSTER } from '../constants'

const POSTER_PREFIX = imgPrefix(300);

const isSelected = p => !!p.data;
const getCredits = p => isSelected(p) ? p.data.combined_credits.cast.concat(p.data.combined_credits.crew) : [];

const Person = ({style, data, index, combination}) => {
  let styleName = 'cell';
  if(data) {
    const hit = _.includes(combination, index);
    const hitLeft = hit && _.includes(combination, index - 1)
    const hitRight = hit && _.includes(combination, index + 1)
    styleName = classNames('cell', {
      'hit': hit,
      'hit-left': hitLeft,
      'hit-right': hitRight
    });
  }
  return <div styleName={styleName} style={style}><div/></div>
}

const Credit = ({id, media_type, index, people, combination}) => {
  const peoplesCredit = people.map((p, i) => getCredits(p).find(c => c.id === id && c.media_type === media_type))
  const firstCredit = peoplesCredit.find(_.identity);
  // if(peoplesCredit) {
    return <div>
      <img src={firstCredit.poster_path ? (POSTER_PREFIX + firstCredit.poster_path) : BLANK_POSTER} />
      <h4>{firstCredit.title || firstCredit.name}</h4>
      {combination.map(i => people[i] && <div style={people[i].style}>{people[i].data.name} as {peoplesCredit[i].character || peoplesCredit[i].job || people[i].data.name}</div>)}
    </div>
  // }
}

const Intersection = ({combination, sharedCredits, people, index}) => (
  <div styleName="Intersection" tabIndex="0">
    <span styleName="count">{sharedCredits.length + ' - '}</span>
    {people.map((person, index) => <Person key={`person-${index}`} {...person} index={index} combination={combination} />)}
    <div styleName="credits">
      <h3>{combination.length === 1 ? 'Credits of only ' : 'Shared credits of '} {combination.map(i => <span style={people[i].style}>{people[i].data.name}</span>)}</h3>
      <div styleName="credits-list">
      {sharedCredits.map((credit, index) => <Credit key={[index, ...combination].join('-')} {...credit} index={index} people={people} combination={combination} />)}
      </div>
    </div>
  </div>
);

class Intersections extends Component {
  constructor(props){
    super(props);
    this.state = {}
  }
  componentWillReceiveProps({people}){
    this.setState(() => {
      const hasSelected = people.filter(isSelected).length > 1;
      let intersections = [];
      // @TODO only recompute this if `people` has changed.
      if(hasSelected) {
        // get combinations of only selected people.
        const combinations = getCombinations(people.reduce((r, e, i) => isSelected(e) ? r.concat(i) : r, []));
        intersections = combinations.map(combination => ({
          combination,
          sharedCredits: _.intersectionWith(
            ...combination.map(i => getCredits(people[i])),
            (c1, c2) => c1.id === c2.id && c1.media_type === c2.media_type
          ).map(({id, media_type}) => ({id, media_type})) // This isn't needed really, could be taken out.
        }))
      }
      return { hasSelected, intersections };
    })
  }
  render() {
    const { hasSelected, intersections } = this.state;
    const { people } = this.props;
    return <div styleName="Intersections">
      {hasSelected && intersections.map((intersection, index) => <Intersection key={`intersection-${index}`} {...intersection} index={index} people={people} />)}
    </div>;
  }
}

Intersections = connect(({people}) => ({people}))(Intersections)

export default Intersections;

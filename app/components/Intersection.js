import React, { Component } from 'react'
import _ from 'lodash';
import './Intersection.css';

function getCombinationIndices(arr) {
  const indices = arr.map((e, i) => i);
  const result = [];
  const fn = (prefix, arr) => {
    arr.forEach((e, i) => {
      if(prefix.length){
        result.push(prefix.concat(e));
      }
      fn(prefix.concat(e), arr.slice(i + 1))
    })
  }
  fn([], indices);
  return result;
}

// function getCombinationKeys(arr, key) {
//   const result = [];
//   const fn = (prefix, arr) => {
//     arr.forEach((e, i) => {
//       if(prefix.length){
//         result.push(prefix.concat(e[key]));
//       }
//       fn(prefix.concat(e[key]), arr.slice(i + 1))
//     })
//   }
//   fn([], arr);
//   return result;
// }

class Intersection extends Component {
  constructor(props){
    super(props);
    this._renderPerson = this._renderPerson.bind(this);
    this._renderCredit = this._renderCredit.bind(this);
    this._renderIntersection = this._renderIntersection.bind(this);
    this.state = {}
  }
  componentWillReceiveProps({people}){
    this.setState(() => {
      const selected = people.reduce((r, p) => p.data ? r.concat(p.data) : r, []);
      const intersections = getCombinationIndices(selected);
      const mutualCredits = intersections.map(group => {
        return {
          group,
          intersections: _.intersectionWith(
            ...group.map(i => selected[i].combined_credits.cast.concat(selected[i].combined_credits.crew)),
            (g1, g2) => {
              return g1.id === g2.id && g1.media_type === g2.media_type 
            }).map(({id, media_type}) => ({id, media_type}))
        };
      });
      return { selected, mutualCredits };
    })
  }
  _renderCredit(c, key) {
    return <div className="credit" key={[c.credit_id, key].join('-')}>
      <strong>Title: {c.title || c.name} - {c.year}</strong>
      {' '}
      Role: {c.character || c.job}
    </div>;
  }
  _renderPerson(p, i){
    const { mutualCredits } = this.state;
    const relevantCredits = _.filter(mutualCredits, c => _.includes(c.group, i));
    return <div className="person" key={p.id}>
      <h3>{p.name}</h3>
      {p.combined_credits.cast.concat(p.combined_credits.crew).map(c => {
        // const relevantIntersections = _.filter(relevantCredits, r => _.includes(r.intersections, c.id))
        const isShared = _.some(relevantCredits, r => _.some(r.intersections, {id: c.id, media_type: c.media_type}))
        if(isShared){
          return '';
        }
        return this._renderCredit(c);
      })}
    </div>
  }
  _renderIntersection({group, intersections}, index){
    const { selected } = this.state;
    return <div className="intersection" key={`intersection-${index}`}>
      <h3>Intersection of {group.map(personId => selected[personId].name).join(' & ')}</h3>
      {intersections.map(({id, media_type}, i) => {
        const credits = selected.map(s => _.find(s.combined_credits.cast, (c) => c.id === id && c.media_type === media_type));
        if(credits) {
          return <div key={[i, ...group].join('-')}>
            <strong>Title: {credits[group[0]].title || credits[group[0]].name} - {credits[group[0]].year}</strong>
            {' '}
            Roles: {group.map(i => {
              if(credits[i]){ 
                return `${selected[i].name} as ${credits[i].character || credits[i].job || selected[i].name}`
              }
            }).join(' & ')
          }
          </div>;
        }
      })}
    </div>;
  }
  render() {
    const { selected, mutualCredits } = this.state;
    const hasSelected = !_.isEmpty(selected) && selected.length > 1;
    return <div styleName="Intersection">
      <div className="people">
        {hasSelected && selected.map(this._renderPerson)}
      </div>
      <div className="intersections">
        {(hasSelected && mutualCredits.length) && mutualCredits.map(this._renderIntersection)}
      </div>
    </div>;
  }
  // oh no the role god dammit this is harder than i though
}

export default Intersection;

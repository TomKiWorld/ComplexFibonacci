import React, { Component } from 'react';
import axios from 'axios';

import { FlexContainer, SecondaryTitle, FormElm, InputElm, SmallText, ErrorText } from '../styledComponents/styledComponents';
import SubmitBtn from '../components/SubmitBtn/SubmitBtn';

class FibPage extends Component {
  state = {
    seenIndexes: [],
    values: {},
    index: '',
    errorMsg: ''
  };

  componentDidMount = () => {
    this.fetchValues();
    this.fetchIndexes();
  };

  fetchValues = async () => {
    const values = await axios.get('/api/values/current');
    this.setState({ values: values.data });
  };

  fetchIndexes = async () => {
    const seenIndexes = await axios.get('/api/values/all');
    this.setState({
      seenIndexes: seenIndexes.data,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    const indexToCheck = this.state.index;
    const submittedIndexs = Object.keys(this.state.values);
    if (!indexToCheck) {
      return this.setState({ errorMsg: 'Missing index, please submit a value.'});
    } else if (submittedIndexs.includes(indexToCheck)) { 
      return this.setState({ index: '', errorMsg: 'Please see previous results.'});
    } else if (indexToCheck > 40) {
      return this.setState({ index: '', errorMsg: 'Max allowed index is 40.'});
    } else if (indexToCheck <= 40) {
      return this.addIndex(indexToCheck);
    } else {
      return this.setState({ errorMsg: 'Missing information please try again.'});
    }
  };

  addIndex = async (index) => {
    try {
      await axios.post('/api/values/add', {
        index: index,
      });
      this.setState({ index: '', errorMsg: '' });
      this.fetchValues();
      this.fetchIndexes();
    } catch (err) {
      console.log(err)
      if (err.response && err.response.data) {
        console.log(err.response.data)
        this.setState({ errorMsg: err.response.data.message })
      } else {
        this.setState({ errorMsg: err.message })
      }
    }
  };

  renderSeenIndexes = () => {
    return this.state.seenIndexes.length ? 
      this.state.seenIndexes.map(({ number }) => number).join(', ')
      : 'Submit your first index to start';
  };

  renderValues = () => {
    const entries = [];

    for (let key in this.state.values) {
      entries.push(
        <p key={key}>
          For index {key} I calculated {this.state.values[key]}
        </p>
      );
    }

    return entries;
  };

  renderError =() => {
    return this.state.errorMsg ? <ErrorText>{ this.state.errorMsg }</ErrorText> : null;
  };

  render() {
    return (
      <FlexContainer>
        <SecondaryTitle>Enter your index</SecondaryTitle>
        <FormElm onSubmit={this.handleSubmit} >
          <InputElm 
            type='text'
            label='enter index'
            value={ this.state.index }
            onChange={e => this.setState({index: e.target.value })}
          />
          {this.renderError()}
          <SmallText>( Max 40 )</SmallText>
          <SubmitBtn>Submit</SubmitBtn>
        </FormElm>
        <section>
          <SecondaryTitle>Submitted so far:</SecondaryTitle>
          <p>{this.renderSeenIndexes()}</p>
        </section>
        <section>
          <SecondaryTitle>Previous results:</SecondaryTitle>
          {this.renderValues()}
        </section>
      </FlexContainer>
    )
  }
};

export default FibPage;

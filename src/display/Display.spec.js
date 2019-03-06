import React from 'react';
import { render, fireEvent } from 'react-testing-library';
import 'jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import 'react-testing-library/cleanup-after-each';
import Display from './Display'
import Dashboard from '../dashboard/Dashboard'
import Controls from '../controls/Dashboard'


describe('<Display />', () => {
    it('matches snapshot', () => {
      const tree = renderer.create(<Display />) 
      expect(tree.toJSON()).toMatchSnapshot()
    });
  
})

import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Register from '../pages/register';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});
    
describe('Register component tests', ()=> {
        const wrapper = shallow(<Register />);

        it('should have two btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('Button')).toHaveLength(2);

            //Button should be of type button
            expect(wrapper.find('.Register-Btn')
            .type().defaultProps.type)
            .toEqual('button');

            expect(wrapper.find('.Back-Btn')
            .type().defaultProps.type)
            .toEqual('button');

            //Button should have matching text
            expect(wrapper.find('.Register-Btn').text()).toEqual('Register');
            expect(wrapper.find('.Back-Btn').text()).toEqual('Return');
        });

        it('should have four Fields', ()=> {
            //Fields should be present
            expect(wrapper.find('.Register-Field')).toHaveLength(4);                      
        });

      it('should have an empty email, firstName, lastName, password state var', ()=> {
          //Optionally test to check if email, firstName, lastName, password are empty strings on   
          expect(wrapper.find('email')).toEqual({});            
          expect(wrapper.find('firstName')).toEqual({});         
          expect(wrapper.find('lastName')).toEqual({});            
          expect(wrapper.find('password')).toEqual({});          
      });

    });
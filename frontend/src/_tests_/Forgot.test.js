import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Forgot from '../pages/forgot';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});
    
describe('Forgot component tests', ()=> {
        const wrapper = shallow(<Forgot />);

        it('should have two btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('Button')).toHaveLength(2);

            //console.log(wrapper.debug());

            //Button should be of type button
            expect(wrapper.find('.Forgot-Btn')
            .type().defaultProps.type)
            .toEqual('button');

            expect(wrapper.find('.Back-Btn')
            .type().defaultProps.type)
            .toEqual('button');

            //Button should have matching text
            expect(wrapper.find('.Forgot-Btn').text()).toEqual('Remind');
            expect(wrapper.find('.Back-Btn').text()).toEqual('Return');
        });

        it('should have Field for email', ()=> {
            //Email and password Field should be present
            expect(wrapper.find('.Forgot-Field')).toHaveLength(1);                      
        });

        it('should have an empty email state var', ()=> {
            //Optionally test to check if email are empty strings on           
            expect(wrapper.find('email')).toEqual({});                              
        });

    });
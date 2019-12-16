import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Login from '../pages/login';

Enzyme.configure({
  adapter: new EnzymeAdapter()
});
    
describe('Login component tests', ()=> {
        const wrapper = shallow(<Login />);

        it('should have a btn component', ()=> {

            //There should be only one button
            expect(wrapper.find('Button')).toHaveLength(1);

            //Button should be of type button
            expect(wrapper.find('Button')
            .type().defaultProps.type)
            .toEqual('button');

            //Button should have matching text
            expect(wrapper.find('Button').text()).toEqual('Login');
        });

        it('should have Field for email and password', ()=> {
            //Email and password Field should be present
            expect(wrapper.find('.Login-Field')).toHaveLength(1);          
            expect(wrapper.find('.Password-Field')).toHaveLength(1);
        });

        it('should have an empty email and password state var', ()=> {
            //Optionally test to check if password and email are empty strings on           
            expect(wrapper.find('email')).toEqual({});            
            expect(wrapper.find('password')).toEqual({});          
        });

    });
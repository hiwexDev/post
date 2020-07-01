import React from 'react';
import { shallow } from 'enzyme';

import Login, { styles } from '../app/views/login';

/**
 * Numero de subcomponentes
 * Contenido de etiquetas
 * Estilos
 * Tipos
 */
const props = {
	cont: 'box',
	click: jest.fn(),
};

describe('Redering', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Login />);
	});

	it('Testing TextInput', () => {
		expect(wrapper.find('TextInput')).toHaveLength(2);
	});

	it('Testing TouchableOpacity', () => {
		expect(wrapper.find('TouchableOpacity')).toHaveLength(1);
	});

	it('Label Text', () => {
		expect(wrapper.find('Text').contains('Email')).toBe(true);
		expect(wrapper.find('Text').contains('Password')).toBe(true);
	});

	it('Style', () => {
		expect(wrapper.find('View').prop('style')).toEqual(styles.container);
	});

	let _wrapper;
	beforeEach(() => {
		_wrapper = shallow(<Login cont="box" />);
	});

	it('Type Style', () => {
		expect(_wrapper.find('View').prop('style')).toEqual(styles.box);
	});
});

describe('Interaction', () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Login {...props} />);
	});

	it('Click Button', () => {
		wrapper.find('TouchableOpacity').prop('onPress')();
		wrapper.find('TouchableOpacity').prop('onPress')();
		expect(props.click).toHaveBeenCalledTimes(2);
	});
});

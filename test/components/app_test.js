import {renderComponent,expect} from '../test_helper';
import App from '../../src/components/app';

describe('App Component',()=>{
	let component;
	beforeEach(()=>{
		component = renderComponent(App);
	});

	it('it has the header',()=>{
		expect(component.find('.header')).to.exist;
	});

	it('it has the body',()=>{
		expect(component.find('.main')).to.exist;
	});

	it('it has the footer',()=>{
		expect(component.find('.footer')).to.exist;
	});
})
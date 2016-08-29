import {renderComponent,expect} from '../test_helper';
import PageBody from '../../src/components/page_body';

describe('PageBody component content',()=>{
	let component;
	beforeEach(()=>{
		component = renderComponent(PageBody);
	});

	it('it has the header text',()=>{
		expect(component).to.contain('A better way');
		expect(component).to.contain('to enjoy every day.');
	});

	it('it has the content text',()=>{
		expect(component).to.contain('Be the first to know when we launch.');
	});

	it('it has the request button',()=>{
		expect(component.find('#requestButton')).to.exist;
	});

	it('it is not visable for the form modal when component is initialized',()=>{
		expect(component.find('.form-modal')).not.to.exist;
	});

	it('it is not visable for the dialog modal when component is initialized',()=>{
		expect(component.find('.dialog-modal')).not.to.exist;
	});
})

describe('pagebody request button is clicked',()=>{
	let component;
	beforeEach(()=>{
		component = renderComponent(PageBody);
	});
	it('it shows the form modal',()=>{
		component.simulate('click');
		expect(component.find('.form-modal')).to.exist;
	})
})
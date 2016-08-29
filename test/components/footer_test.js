import {renderComponent,expect} from '../test_helper';
import Footer from '../../src/components/footer';

describe('Footer',()=>{

	it('shows the correct text',()=>{
		const component = renderComponent(Footer);
		expect(component).to.contain('Made with love in Melbourne');
		expect(component).to.contain('@ 2016 Broccoli & Co. All rights reserved.');

	});
})

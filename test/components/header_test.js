import {renderComponent,expect} from '../test_helper';
import Header from '../../src/components/header';

describe('Header',()=>{

	it('shows the correct text',()=>{
		const component = renderComponent(Header);
		expect(component).to.contain('BROCCOLI & CO.');
	});
})

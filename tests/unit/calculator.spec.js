import { mount } from '@vue/test-utils';
import Calculator from '../../src/components/Calculator.vue';

describe('component Calculator', () => {
    const wrapper = mount(Calculator);
    it('is currency pasted', () => {
        expect( wrapper.vm.currency ).not.toBe(null);
    });
    it('ok button default state', () => {
        expect( wrapper.vm.installment ).toBeNull();
    });
    it('ok button click response', () => {
        wrapper.find('button').trigger('click');
        setTimeout(() => {
            expect(wrapper.vm.installment).toBe(Object);
        }, 500);

    });
})
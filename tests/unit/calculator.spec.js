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
            expect(wrapper.vm.installment).toBe(String);
        }, 500);
    });
    it('valid propAmount', () => {
        const { value, min, max } = wrapper.vm.propAmount;
        expect( value ).toEqual(jasmine.any(Number));
        expect( min ).toEqual(jasmine.any(Number));
        expect( max ).toEqual(jasmine.any(Number));
        expect( min ).toBeLessThan(max);
    });
    it('valid propDuration', () => {
        const { value, min, max } = wrapper.vm.propDuration;
        expect( value ).toEqual(jasmine.any(Number));
        expect( min ).toEqual(jasmine.any(Number));
        expect( max ).toEqual(jasmine.any(Number));
        expect( min ).toBeLessThan(max);
    });
    it('validate input object', () => {
        const { validate } = wrapper.vm;

        expect( validate({
            value: 10000,
            min: 10000,
            max: 50000,
        }) ).toBe(true);

        expect( validate({
            value: 6000,
            min: 10000,
            max: 50000,
        }) ).toBe(false);

        expect( validate({
            value: 60000,
            min: 10000,
            max: 50000,
        }) ).toBe(false);

        expect( validate({
            value: '40,000',
            min: 10000,
            max: 50000,
        }) ).toBe(false);
    });
})
<template>
    <div class="calculator-wrapper">
        <div class="inputs">
            <label for="amount">amount: </label>
            <vue-numeric
                id="amount"
                separator=","
                :min="amount.min"
                :max="amount.max"
                v-model="amount.value"
            ></vue-numeric>

            <label for="duration">duration: </label>
            <vue-numeric
                    id="duration"
                    separator=","
                    :min="duration.min"
                    :max="duration.max"
                    v-model="duration.value"
            ></vue-numeric>
            <button type="button uppercase" @click="calculate">ok</button>
        </div>
        <div class="installment">
            <div>
                Monthly Installment:
                <span class="value" v-show="installment">{{installment}} </span>
                <span class="currency uppercase">{{currency}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import fetchApi from '../api/api';
    import VueNumeric from 'vue-numeric'

    export default {
        components: {
            VueNumeric
        },
        props: {
            currency: {
                type: String,
                default: 'eur'
            },
            propAmount: {
                type: Object,
                default() {
                    return {
                        value: 10000,
                        min: 10000,
                        max: 50000,
                    }
                }
            },
            propDuration: {
                type: Object,
                default() {
                    return {
                        value: 5,
                        min: 1,
                        max: 5,
                    }
                }
            },
        },
        data() {
            return {
                amount: {...this.propAmount},
                duration: {...this.propDuration},
                installment: null,
            }
        },
        methods: {
            validate (valueObj) {
                const { value, min, max } = valueObj;
                if (
                    parseFloat(value)
                    && value >= min
                    && value <= max
                ) {
                    return true;
                }
                return false;
            },
            async calculate() {
                this.$emit('calculateClicked');
                if (this.validate(this.amount) && this.validate(this.duration)) {
                    const { value: amount} = this.amount;
                    const { value: duration} = this.duration;
                    const { installment } = await fetchApi('/response.json', {
                        amount,
                        duration,
                    }, 'POST');

                    if (installment) {
                        this.installment = installment;
                    }
                }
            },
        }
    }
</script>

<style scoped>
    .calculator-wrapper {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }
    .inputs {
        display: flex;
        align-items: center;
        justify-content: center;
        background: #f5f5f5;
        border: 1px solid black;
        border-radius: 4px;
        height: 80px;
        width: 600px;
        margin-bottom: 35px;
    }
    .inputs input {
        background: #fff2cc;
        border: 1px solid #dabf6e;
        margin: 0 15px 0 5px;
    }
    .inputs button {
        text-transform: uppercase;
        background: #d5e8d4;
        border: 1px solid #87b66d;
        border-radius: 4px;
    }
    .installment {
        background: #f5f5f5;
        border: 1px solid black;
        border-radius: 4px;
        height: 150px;
        width: 600px;
        justify-content: center;
        align-items: center;
        display: flex;
        font-weight: 600;
    }
    .installment .value {
        font-weight: 800;
    }
    .installment .currency {
        font-weight: 800;
        text-transform: uppercase;
    }
    .uppercase {
        text-transform: uppercase;
    }
</style>
// JavaScript Document
var elements = {
	components: {
		input: {
			type: 'text',
			tag: 'input',
			text: 'Input'
		},
		radio: {
			type: 'radio',
			tag: 'input',
			text: 'Radio'
		}	
	}
};
elements.getComponentConfig = function (component) {
	return elements.components[component];
}
console.log(elements.getComponentConfig('input'));
module.exports = elements;
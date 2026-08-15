export interface ValidationMessageMap {
  [key: string]: string;
}

export const DEFAULT_VALIDATION_MESSAGES: ValidationMessageMap = {
  required: 'This field is required.',
  email: 'This email is not valid.',
  minlength: 'Keyword must be greater than {{requiredLength}} characters, current length is {{actualLength}}.',
  maxlength: 'Keyword must not exceed {{requiredLength}} characters, current length is {{actualLength}}.',
  min: 'Number must be greater than {{min}}.',
  max: 'Number must not exceed {{max}}.',
  compare: 'This field is not valid or matched with {{compareWith}}.',
  exists: 'Already in use, please try with other.',
  mask: '"{{actualValue}}" is not valid, require e.g "{{requiredMask}}".'
};

export class ValidationMessageLogic {
  formatMessages(
    errors: any,
    validationRegexMessage?: string,
    constants: ValidationMessageMap = DEFAULT_VALIDATION_MESSAGES
  ): string {
    if (!errors || typeof errors !== 'object') {
      return '';
    }

    let messages = '';
    for (const key of Object.keys(errors)) {
      const errorValue = errors[key];

      if (errorValue === null || errorValue === undefined) {
        continue;
      }

      if (typeof errorValue === 'object') {
        if (key === 'pattern') {
          messages += `${validationRegexMessage || ''}<br>`;
        } else {
          const template = `${constants[key] || ''}<br>`;
          messages += this.interpolateTemplate(template, errorValue);
        }
      } else {
        messages += `${constants[key] || ''}<br>`;
      }
    }

    return messages;
  }

  private interpolateTemplate(template: string, context: any): string {
    let message = template;
    for (const propKey of Object.keys(context || {})) {
      const expression = new RegExp(`{{${propKey}}}`, 'g');
      message = message.replace(expression, context[propKey]);
    }

    return message;
  }
}
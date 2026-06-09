# ControlValueAccessor Migration Guide

## Overview

Version 0.0.22+ introduces a major architectural improvement: all form controls now implement Angular's `ControlValueAccessor` interface. This change significantly improves performance, reusability, and follows Angular best practices.

## What Changed

### Before (Old Pattern)
```typescript
// Component
<lib-text-box 
  [control]="textControl" 
  [form]="myForm">
</lib-text-box>

// Controls received the entire FormGroup
@Input() form: FormGroup;
```

### After (New Pattern)
```typescript
// Component
<lib-text-box 
  [control]="textControl" 
  [formControlName]="textControl.key">
</lib-text-box>

// Controls implement ControlValueAccessor
// No form input needed!
```

## Benefits

1. **Better Performance**
   - Reduced change detection cycles
   - No need to pass entire FormGroup down the component tree
   - Less memory overhead

2. **Better Encapsulation**
   - Controls are self-contained
   - No tight coupling to parent form
   - Easier to test and maintain

3. **More Flexibility**
   - Can use with `formControlName`, `ngModel`, or `[(ngModel)]`
   - Can be used in template-driven or reactive forms
   - Can be used standalone

4. **Standard Angular Pattern**
   - Follows official Angular recommendations
   - Better IDE support and type safety
   - Familiar pattern for Angular developers

## Migration Steps

### Step 1: Update Component Templates

**Old Way:**
```html
<div [formGroup]="myForm">
  <lib-text-box [control]="nameControl" [form]="myForm"></lib-text-box>
  <lib-select-dropdown [control]="typeControl" [form]="myForm"></lib-select-dropdown>
  <lib-check-box [control]="activeControl" [form]="myForm"></lib-check-box>
</div>
```

**New Way:**
```html
<div [formGroup]="myForm">
  <lib-text-box [control]="nameControl" [formControlName]="nameControl.key"></lib-text-box>
  <lib-select-dropdown [control]="typeControl" [formControlName]="typeControl.key"></lib-select-dropdown>
  <lib-check-box [control]="activeControl" [formControlName]="activeControl.key"></lib-check-box>
</div>
```

### Step 2: Remove Direct Form Access

If you were accessing form controls directly in your custom components:

**Old Way:**
```typescript
// DON'T DO THIS ANYMORE
@Input() form: FormGroup;

someMethod() {
  const value = this.form.controls[this.control.key].value;
  this.form.controls[this.control.key].setValue(newValue);
}
```

**New Way:**
```typescript
// Use ControlValueAccessor methods
export class MyControl extends BaseControlValueAccessor {
  someMethod() {
    // Read value
    const currentValue = this.value;
    
    // Update value
    this.updateValue(newValue);
  }
}
```

### Step 3: Update Custom Components

If you created custom components using the `CustomComponent` interface:

**Old Interface:**
```typescript
export interface CustomComponent extends ControlValueAccessor {
  control: FilterCustomControl;
  form: FormGroup;  // ❌ Removed
}
```

**New Interface:**
```typescript
export interface CustomComponent extends ControlValueAccessor {
  control: FilterCustomControl;
  valueChange?: (value: any) => void;  // ✅ Use this instead
}
```

**Old Implementation:**
```typescript
export class MyCustomComponent implements CustomComponent {
  @Input() control: FilterCustomControl;
  @Input() form: FormGroup;
  
  updateValue(newValue: any) {
    this.form.controls[this.control.key].setValue(newValue);
  }
}
```

**New Implementation:**
```typescript
import { BaseControlValueAccessor } from 'generic-crud';

@Component({
  // ... component metadata
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => MyCustomComponent),
    multi: true
  }]
})
export class MyCustomComponent extends BaseControlValueAccessor 
  implements CustomComponent {
  
  @Input() control: FilterCustomControl;
  
  updateValue(newValue: any) {
    // Use inherited method from BaseControlValueAccessor
    super.updateValue(newValue);
    
    // Or use valueChange callback if provided
    if (this.valueChange) {
      this.valueChange(newValue);
    }
  }
}
```

## Affected Components

All form control components have been updated:

- ✅ `TextBoxComponent`
- ✅ `TextAreaComponent`
- ✅ `CheckBoxComponent`
- ✅ `SelectDropdownComponent`
- ✅ `SingleDateComponent`
- ✅ `RangeDateComponent`
- ✅ `DateOfBirthComponent`
- ✅ `CustomFilterComponent`

## Using the Library

The `dynamic-control` and `dynamic-form` components have been updated internally, so if you're using them, **no changes are required** on your part! The migration is transparent.

## BaseControlValueAccessor API

The new base class provides these members:

### Properties
- `value: T` - Current value of the control
- `disabled: boolean` - Whether control is disabled

### Methods
- `writeValue(value: T): void` - Set value from forms API
- `registerOnChange(fn): void` - Register change callback
- `registerOnTouched(fn): void` - Register touched callback
- `setDisabledState(isDisabled: boolean): void` - Handle disabled state
- `updateValue(value: T): void` - Update value and notify form

### Protected Members
- `onChange(value: T): void` - Callback when value changes
- `onTouched(): void` - Callback when control is touched

## Common Issues

### Issue 1: Control not updating
**Problem:** Value changes don't propagate to form

**Solution:** Make sure you're calling `updateValue()` instead of directly setting `this.value`

```typescript
// ❌ Wrong
this.value = newValue;

// ✅ Correct
this.updateValue(newValue);
```

### Issue 2: Validation not working
**Problem:** Form validation doesn't trigger

**Solution:** Call `onTouched()` when user interacts with control

```typescript
onBlur() {
  this.onTouched();  // Marks control as touched
}
```

### Issue 3: Disabled state not working
**Problem:** Control doesn't respond to `form.disable()`

**Solution:** Use the `disabled` property in your template

```typescript
<input 
  [disabled]="disabled || control.isDisabled"
  (input)="updateValue($event.target.value)">
```

## Need Help?

If you encounter issues during migration:

1. Check the updated components in `projects/generic-crud/src/lib/shared/_controls/`
2. Review the `BaseControlValueAccessor` class
3. Refer to Angular's official ControlValueAccessor documentation
4. Open an issue on GitHub with details about your use case

## Rollback

If you need to temporarily rollback to the old version:

```bash
npm install generic-crud@0.0.21
```

Note: We strongly recommend migrating to the new pattern for better performance and maintainability.

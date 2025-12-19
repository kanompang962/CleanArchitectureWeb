import { CommonModule } from '@angular/common';
import { Component, EventEmitter, forwardRef, Input, Output } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import { MatError, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
  selector: 'app-input',
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatError,
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor{
 @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: string = 'text';
  @Input() appearance: 'outline' | 'fill'  = 'outline';
  @Input() errorMessages: { [key: string]: string } = {};
  @Input() control: AbstractControl | null | undefined;

  value: any = '';
  disabled: boolean = false;

  protected onChange: (value: any) => void = () => {};
  protected onTouched: () => void = () => {};

  // ControlValueAccessor methods
  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onInputChange(event: any): void {
    this.value = event.target.value;
    this.onChange(this.value);
    this.onTouched();
  }

  // Get error message based on validation errors
  getErrorMessage(): string {
    console.log('first')
    if (!this.control || !this.control.errors) {
      return '';
    }
    const errors = this.control.errors;
    // Check for custom error messages first
    for (const errorKey in errors) {
      if (this.errorMessages && this.errorMessages[errorKey]) {
        console.log(this.errorMessages[errorKey])
        return this.errorMessages[errorKey];
      }
    }
    console.log(errors)
    console.log('errorMessages:', this.errorMessages);
    // Default error messages
    if (errors['required']) {
      return `${this.label || 'This field'} is required`;
    }
    if (errors['email']) {
      return 'Please enter a valid email';
    }
    if (errors['minlength']) {
      return `Minimum length is ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['maxlength']) {
      return `Maximum length is ${errors['maxlength'].requiredLength} characters`;
    }
    if (errors['pattern']) {
      return 'Invalid format';
    }

    return 'Invalid input';
  }

  hasError(): boolean {
    return !!(this.control && this.control.invalid && (this.control.dirty || this.control.touched));
  }
}

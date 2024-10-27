import {
  Directive,
  ElementRef,
  forwardRef,
  HostListener,
  Provider,
} from "@angular/core";
import { NG_VALUE_ACCESSOR } from "@angular/forms";

const DATE_VALUE_ACCESSOR: Provider = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => DateValueAccessorDirective),
  multi: true,
};

@Directive({
  selector:
    'input([type="date"])[ngModel], input([type="date"])[formControl], input([type="date"])[formControlName]',
  standalone: true,
  providers: [DATE_VALUE_ACCESSOR],
})
export class DateValueAccessorDirective {
  constructor(private element: ElementRef) {}

  @HostListener("input", ["$event.target.valueAsDate"])
  private onChange!: Function;
  @HostListener("blur", [])
  private onTouched!: Function;

  registerOnChange(fn: Function): void {
    this.onChange = (valueAsDate: Date) => {
      fn(valueAsDate);
    };
  }

  writeValue(newValue: Date): void {
    if (newValue instanceof Date) {
      this.element.nativeElement.valueAsDate = newValue;
    }
  }

  registerOnTouched(fn: Function): void {
    this.onTouched = fn;
  }
}

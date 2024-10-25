import { Directive, Input } from "@angular/core";
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator,
} from "@angular/forms";

@Directive({
  selector: "[restrictedWords]",
  standalone: true,
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: RestrictedWordsValidator,
      multi: true,
    },
  ],
})
export class RestrictedWordsValidator implements Validator {
  @Input("restrictedWords") restrictedWords: string[] = [];

  validate(control: AbstractControl): ValidationErrors | null {
    if (!control.value) return null;

    const invalidWords = this.restrictedWords
      .map((w) =>
        control.value.toLowerCase().includes(w.toLocaleLowerCase()) ? w : null
      )
      .filter((w) => w !== null);

    return invalidWords && invalidWords.length > 0
      ? { restrictedWords: invalidWords.join(", ") }
      : null;
  }
}

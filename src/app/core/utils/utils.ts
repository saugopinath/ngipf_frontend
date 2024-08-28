import { FormGroup } from "@angular/forms";
export function getInvalidControls(form: FormGroup) {
    return Object.keys(form.controls).filter((name: any) => form.controls[name].invalid)
}

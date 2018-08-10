import { AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";
import { of } from "rxjs";

import { ProductService } from "shared/services/product.service";

export class CustomValidators {

    static shouldBeUnique(productService: ProductService, isEditMode: boolean, name: string) {
        return (control: AbstractControl) => {
            if(isEditMode && control.value == name)
                return of(null);
            else {
                return productService.isUnique(control.value).pipe(
                    map(result => {
                        if(result)
                            return null;
                        else
                            return { shouldBeUnique : true };
                    })
                );
            }
        }
    }
}

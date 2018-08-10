import { AbstractControl } from "@angular/forms";
import { map } from "rxjs/operators";

import { ProductService } from "shared/services/product.service";

export class CustomValidators {

    static shouldBeUnique(productService: ProductService) {
        return (control: AbstractControl) => {
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

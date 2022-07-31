import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { slideInOutAnimation } from '../../_animations';
import { PubSubService } from '../../_service/pub-sub.service';

@Component({
  selector: 'lib-property-panel',
  templateUrl: './property-panel.component.html',
  styleUrls: ['./property-panel.component.css'],

  // make slide in/out animation available to this component
  animations: [slideInOutAnimation],
  // attach the slide in/out animation to the host (root) element of this component
  host: { '[@slideInOutAnimation]': '' }
})
export class PropertyPanelComponent implements OnInit {
  title: string;
  product: any = {};
  saving = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private pubSubService: PubSubService
  ) { }

  ngOnInit() {
    this.title = 'Add Product';
    const productId = Number(this.route.snapshot.params['id']);
    if (productId) {
      this.title = 'Edit Product';
      // this.productService.getById(productId).subscribe(x => this.product = x);
    }
  }

  saveProduct() {
    // save product
    this.saving = true;
    const action = this.product.id ? 'update' : 'create';
    // this.productService[action](this.product)
      // .subscribe(() => {
        this.saving = false;

        // redirect to products view
        this.router.navigate(['products']);

        // publish event so list component refreshes
        this.pubSubService.publish('products-updated');
      // });
  }

}

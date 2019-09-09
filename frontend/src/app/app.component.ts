import { Component } from '@angular/core';
import { SelectItem } from 'primeng/components/common/selectitem';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  environments: SelectItem[] = [
     { label: 'sapg', value: 'sapg' },
     { label: 'bali', value: 'bali' },
     { label: 'bonn', value: 'bonn' },
     { label: 'abfo', value: 'abfo' },
     { label: 'logi', value: 'logi' },
     { label: 'lohn', value: 'lohn' },
     { label: 'abve', value: 'abve' }
  ];
}

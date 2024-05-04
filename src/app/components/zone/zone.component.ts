import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewEncapsulation} from "@angular/core";
import {Location} from "../../models/location.model";
import {TreeNode} from "primeng/api";
import {v4 as uuid} from "uuid";

@Component({
  selector: "app-zone",
  templateUrl: "./zone.component.html",
  styleUrls: ["./zone.component.scss"],
})
export class ZoneComponent implements OnChanges {
  @Input() name: string = "";
  @Input() icon: string = "";
  @Input() items: Location[] = [];
  selectedFiles!: TreeNode[];
  treeNodes: TreeNode[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (this.items.length > 0) {
      let index =1;
      this.treeNodes = [];
      for (const item of this.items) {
        const node: TreeNode = {
          key: `${index}`,
          // icon: item.icon,
          label: item.name,
          children: []
        }
        let tIndex = 1;
        for (const tItem of item.items) {
          const childNode: TreeNode = {
            key: `${index}-${tIndex}`,
            icon: tItem.icon,
            data: tItem,
            label: tItem.name,
            type: 'location-item',
            children: []
          };
          node.children!.push(childNode);
          tIndex++;
        }
        index++;
        this.treeNodes.push(node);
      }

    }
    console.log(this.treeNodes);
  }
}

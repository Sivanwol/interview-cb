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
      this.items.forEach(item => {
        const node: TreeNode = {
          key: uuid(),
          icon: item.icon,
          data: item,
          label: item.name,
          children: []
        }
        this.items.forEach(tItem => {
          const childNode: TreeNode = {
            key: uuid(),
            icon: tItem.icon,
            data: tItem,
            label: tItem.name,
            children: []
          };
          node.children!.push(childNode);
        })
        this.treeNodes.push(node);
      })

    }
    console.log(this.treeNodes);
  }
}

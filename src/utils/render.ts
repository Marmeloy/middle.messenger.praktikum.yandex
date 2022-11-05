import { View } from './view';

export function render(query:string, block:InstanceType<typeof View>) {
  const root:HTMLElement|null = document.querySelector(query);
  if (root) {
    root.appendChild(block.getContent());
  }
  return root;
}

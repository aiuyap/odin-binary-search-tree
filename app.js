import { Tree, prettyPrint } from "./bst.js";

let array = [];

while (array.length !== 100) {
  array.push(Math.floor(Math.random() * 100));
}

const binaryTree = Tree(array);
prettyPrint(binaryTree.root);
binaryTree.insert(120);
binaryTree.insert(121);
binaryTree.insert(122);
console.log(binaryTree.isBalanced());
binaryTree.rebalance();
console.log(binaryTree.isBalanced());

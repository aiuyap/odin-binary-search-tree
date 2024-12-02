import { mergeSort } from "./mergesort.js";

function Node(data) {
  const left = null;
  const right = null;
  return { data, left, right };
}

function Tree(arr) {
  const sortedArr = mergeSort(arr);
  const root = buildTree(sortedArr, 0, sortedArr.length - 1);

  return root;
}

function buildTree(arr, start, end) {
  if (start > end) {
    return null;
  }

  let mid = start + Math.floor((end - start) / 2);
  let root = Node(arr[mid]);
  root.left = buildTree(arr, start, mid - 1);
  root.right = buildTree(arr, mid + 1, end);

  return root;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

const testArr = [7, 6, 5, 4, 3, 2, 1, 2, 2, 2, 2];
const test = Tree(testArr);
prettyPrint(test);

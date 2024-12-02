import { mergeSort } from "./mergesort.js";

function Node(data) {
  const left = null;
  const right = null;
  return { data, left, right };
}

function Tree(arr) {
  const sortedArr = mergeSort(arr);
  const root = buildTree(sortedArr, 0, sortedArr.length - 1);

  function insert(value, currNode) {
    if (currNode === undefined) {
      currNode = root;
    }

    if (value === currNode.data) {
      console.log("Value already exists in the tree");
    }

    if (value < currNode.data) {
      if (currNode.left !== null) {
        insert(value, currNode.left);
      } else {
        const newValue = Node(value);
        currNode.left = newValue;
      }
    } else if (value > currNode.data) {
      if (currNode.right !== null) {
        insert(value, currNode.right);
      } else {
        const newValue = Node(value);
        currNode.right = newValue;
      }
    }
  }

  return { root, insert };
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

const testArr = [2, 4, 6, 8, 10, 12, 14];
const test = Tree(testArr);
test.insert(13);
prettyPrint(test.root);

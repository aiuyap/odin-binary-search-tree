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

  function remove(value, currNode) {
    if (currNode === undefined) {
      currNode = root;
    }
    if (currNode === null) {
      return currNode;
    }

    if (currNode.data > value) {
      currNode.left = remove(value, currNode.left);
    } else if (currNode.data < value) {
      currNode.right = remove(value, currNode.right);
    } else {
      if (currNode.left === null) return currNode.right;

      if (currNode.right === null) return currNode.left;

      let succ = getSuccessor(currNode);
      currNode.data = succ.data;
      currNode.right = remove(succ.data, currNode.right);
    }
    return currNode;
  }

  function find(value, currNode) {
    if (currNode === undefined) {
      currNode = root;
    }
    if (value === currNode.data) {
      return currNode;
    }

    if (currNode.left !== null || currNode.right !== null) {
      if (value < currNode.data) {
        return find(value, currNode.left);
      } else if (value > currNode.data) {
        return find(value, currNode.right);
      }
    } else {
      console.log("Data not found");
    }
  }

  return { root, insert, remove, find };
}

function getSuccessor(curr) {
  curr = curr.right;
  while (curr !== null && curr.left !== null) {
    curr = curr.left;
  }
  return curr;
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
prettyPrint(test.root);
console.log(test.find(12));

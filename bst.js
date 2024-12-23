import { mergeSort } from "./mergesort.js";

function Node(data) {
  const left = null;
  const right = null;
  return { data, left, right };
}

export function Tree(arr) {
  const sortedArr = mergeSort(arr);
  let root = buildTree(sortedArr, 0, sortedArr.length - 1);

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

  function levelOrder(callback) {
    if (root === null) return;
    if (callback === undefined) {
      throw new Error("Function: levelOrder requires callback!");
    }

    let queue = [];
    queue.push(root);

    while (queue.length !== 0) {
      let current = queue[0];
      callback(current);
      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
      queue.shift();
    }
  }

  function preOrder(callback, currNode) {
    if (currNode === undefined) {
      currNode = root;
    }
    if (callback === undefined) {
      throw new Error("Function: preOrder requires callback!");
    }
    if (currNode === null) {
      return;
    }
    callback(currNode);
    preOrder(callback, currNode.left);
    preOrder(callback, currNode.right);
  }

  function inOrder(callback, currNode) {
    if (currNode === undefined) {
      currNode = root;
    }
    if (callback === undefined) {
      throw new Error("Function: inOrder requires callback!");
    }
    if (currNode === null) {
      return;
    }
    inOrder(callback, currNode.left);
    callback(currNode);
    inOrder(callback, currNode.right);
  }

  function postOrder(callback, currNode) {
    if (currNode === undefined) {
      currNode = root;
    }
    if (callback === undefined) {
      throw new Error("Function: postOrder requires callback!");
    }
    if (currNode === null) {
      return;
    }
    postOrder(callback, currNode.left);
    postOrder(callback, currNode.right);
    callback(currNode);
  }

  function height(node) {
    if (node === null) return 0;

    let lHeight = height(node.left);
    let rHeight = height(node.right);

    return Math.max(lHeight, rHeight) + 1;
  }

  function depth(node, currNode) {
    if (node === null) return 0;
    if (node === root) return 1;
    if (currNode === undefined) currNode = root;

    if (node === currNode) return 1;

    if (currNode.left !== null) {
      const left = depth(node, currNode.left);
      if (left !== 0) return 1 + left;
    }

    if (currNode.right !== null) {
      const right = depth(node, currNode.right);
      if (right !== 0) return 1 + right;
    }

    return 0;
  }

  function isBalanced(node) {
    if (node === undefined) node = root;
    if (node == null) return true;

    let lh = height(node.left);
    let rh = height(node.right);

    if (Math.abs(lh - rh) <= 1 && isBalanced(node.left) == true && isBalanced(node.right) == true) return true;

    return false;
  }

  function rebalance() {
    let nodes = [];

    inOrder((x) => {
      nodes.push(x);
    }, root);

    root = buildTree(nodes, 0, nodes.length - 1);
  }

  return { root, insert, remove, find, levelOrder, preOrder, inOrder, postOrder, height, depth, isBalanced, rebalance };
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

export const prettyPrint = (node, prefix = "", isLeft = true) => {
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

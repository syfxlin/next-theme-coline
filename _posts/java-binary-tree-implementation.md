---
title: Java二叉树实现
slug: java-binary-tree-implementation
status: publish
published_time: 2019-05-05T00:00:00.000Z
modified_time: 2021-07-28T07:17:09.399Z
layout: post
categories:
  - 折腾记录
tags:
  - Java
  - 算法
---

> 这是一篇水文，逃，代码已经经过一定的测试，但无法保证没有 Bug。介绍网上一大堆这里就不介绍了，直接放代码吧(￣ ▽ ￣)"

```java
package MyTreeDemo;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedList;
import java.util.List;
import java.util.Scanner;

/**
 * MyTreeDemo
 */
public class MyTreeDemo {
    public static void main(String[] args) {
        Scanner in = new Scanner(System.in);
        // MyTree<Integer> tree = new MyTree<Integer>();
        // MyTree.Node temp = tree.addRoot(1);
        // tree.add(temp, -1, 2);
        // temp = tree.add(temp, 1, 3);
        // MyTree.Node temp1 = tree.add(temp, -1, 4);
        // MyTree.Node temp2 = tree.add(temp, 1, 5);
        // tree.add(temp2, -1, 6);
        // tree.add(temp2, 1, 7);
        // System.out.println(tree.layerOrder(false));
        // Object[] arr = tree.toArrayTree(-1);
        // Integer[] arr2 = new Integer[arr.length];
        // for (int i = 0; i < arr.length; i++) {
        //     arr2[i] = (Integer)arr[i];
        // }
        // MyTree<Integer> tree2 = new MyTree<Integer>();
        // tree2.arrayToTree(arr2, -1);
        // System.out.println(tree2.layerOrder(false));
        // System.out.println(Arrays.toString(arr));
        // System.out.println(tree.search(tree.root, 4).data);
        // Character[] arr = {'A','B','C','D','.','E','F','.','G'};
        // MyTree<Character> tree = new MyTree<Character>();
        // tree.arrayToTree(arr, '.');
        // tree.layerOrder(true);
        // Object[] arr2 = tree.toArrayTree(' ');
        // System.out.println(Arrays.toString(arr2));
        // System.out.println(tree.LeafNodeList());
        while(in.hasNext()) {
            MyTree<String> tree = new MyTree<String>();
            tree.stringListsToTree(in.nextLine(), '(', ')', ',', "^");
            tree.preOrder(true);
        }
        in.close();
    }
}

/**
 * MyTree
 */
class MyTree<T extends Comparable> {
    // 根节点
    Node root = null;
    // Build临时存放节点
    Node build = null;
    // 节点类
    class Node {
        // 父节点
        Node parent;
        // 左子树
        Node left;
        // 右子树
        Node right;
        // 数据域
        T data;

        Node() {
        }

        Node(T data) {
            this.data = data;
        }
    }

    /**
     * 添加根节点
     */
    public Node addRoot(T data) {
        this.root = new Node(data);
        return this.root;
    }

    /**
     * 添加节点
     * @param Node root 添加节点的根节点
     * @param int LeftOrRight 添加方向 {-1:添加到左子树,1:添加到右子树}
     * @param T data 数据
     */
    public Node add(Node root, int LeftOrRight, T data) {
        Node reNode = null;
        if (root == null) {
            this.root = new Node(data);
            reNode = this.root;
        } else if (LeftOrRight == -1) {
            root.left = new Node(data);
            root.left.parent = root;
            reNode = root.left;
        } else if (LeftOrRight == 1) {
            root.right = new Node(data);
            root.right.parent = root;
            reNode = root.right;
        }
        return reNode;
    }

    /**
     * 添加节点
     * @param Node root 添加节点的根节点
     * @param int LeftOrRight 添加方向 {-1:添加到左子树,1:添加到右子树}
     * @param Node havaNode 要添加的节点
     */
    public Node add(Node root, int LeftOrRight, Node havaNode) {
        Node reNode = havaNode;
        if (root == null) {
            this.root = havaNode;
            reNode = this.root;
        } else if (LeftOrRight == -1) {
            root.left = havaNode;
            root.left.parent = root;
            reNode = root.left;
        } else if (LeftOrRight == 1) {
            root.right = havaNode;
            root.right.parent = root;
            reNode = root.right;
        }
        return reNode;
    }

    /**
     * 建立层次结构的二叉树 - 不完全版
     * 目前缺失功能：添加空节点
     */
    public void buildAdd(Node root, T data) {
        // add this.root
        if(this.root == null) {
            this.root = new Node(data);
            this.build = this.root;
            return;
        }
        // add this.root.left or this.root.right
        if(root.parent == null) {
            if(root.left == null) {
                root.left = new Node(data);
                root.left.parent = root;
                this.build = root.left;
                return;
            } else {
                root.right = new Node(data);
                root.right.parent = root;
                this.build = root.right;
                return;
            }
        }
        if(root.parent.left == root) {
            root.parent.right = new Node(data);
            root.parent.right.parent = root.parent;
            this.build = root.parent.right;
            return;
        }
        if(root.parent.right == root) {
            root = root.parent;
            int i = 1;
            while (root.parent != null) {
                if(root.parent.left == root) {
                    for (int j = 0; j < i; j++) {
                        root = root.left;
                    }
                    root.left = new Node(data);
                    root.left.parent = root;
                    this.build = root.left;
                    return;
                } else {
                    root = root.parent;
                    i++;
                }
            }
            while(true) {
                if(root.left == null) {
                    root.left = new Node(data);
                    root.left.parent = root;
                    this.build = root.left;
                    return;
                }
                root = root.left;
            }
        }
    }
    public boolean buildAdd(T data) {
        if(root != null && this.build == null) return false;
        // if(this.build == null) {
            // root = build
            this.buildAdd(this.build, data);
        // }
        return true;
    }

    /**
     * 获取树高
     */
    public int getHeight() {
        return this.getHeight(this.root);
    }

    private int getHeight(Node root) {
        if (root == null) {
            return 0;
        } else {
            int leftHeight = this.getHeight(root.left);
            int rightHeight = this.getHeight(root.right);
            return leftHeight > rightHeight ? (leftHeight + 1) : (rightHeight + 1);
        }
    }

    /**
     * 获取节点总数
     */
    public int getSize() {
        return getSize(this.root);
    }

    private int getSize(Node root) {
        if (root == null) {
            return 0;
        } else {
            return 1 + this.getSize(root.left) + this.getSize(root.right);
        }
    }

    /**
     * 获取父节点
     * @param Node child 子节点
     */
    public Node getParentNode(Node child) {
        if (child == null) {
            return null;
        } else {
            return child.parent;
        }
    }

    /**
     * 获取左子树
     * @param Node root 父节点
     */
    public Node getLeftChildNode(Node root) {
        if (root == null) {
            return null;
        } else {
            return root.left;
        }
    }

    /**
     * 获取右子树
     * @param Node root 父节点
     */
    public Node getRightChildNode(Node root) {
        if (root == null) {
            return null;
        } else {
            return root.right;
        }
    }

    /**
     * 获取root树
     */
    public Node getRoot() {
        return this.root;
    }

    /**
     * 删除指定节点
     * @param Node root 父节点
     * @param int LeftOrRight 方向
     */
    public void delete(Node root, int LeftOrRight) {
        if(root == null) {
            return;
        } else if(LeftOrRight == -1) {
            root.left = null;
        } else if(LeftOrRight == 1) {
            root.right = null;
        }
    }

    /**
     * 销毁整棵树
     */
    public void destroy() {
        if (root==null)
            return ;
        root = null;
    }

    /**
     * 自动搜寻子树删除
     */
    public void delete(Node root, Node target) {
        if(root == null) return;
        if(root.left == target) root.left = null;
        if(root.right == target) root.right = null;
    }

    /**
     * 搜索节点
     * 需修改
     */
    public Node search(Node root, T data) {
        if(root == null) {
            return null;
        } else if(root.data.compareTo(data) == 0) {
            return root;
        } else {
            Node temp = search(root.left, data);
            if(temp == null) {
                return search(root.right, data);
            } else {
                return temp;
            }
        }
    }

    /**
     * 前序遍历
     */
    private void preOrder(Node tree, List<T> list) {
        if(tree != null) {
            list.add(tree.data);
            preOrder(tree.left, list);
            preOrder(tree.right, list);
        }
    }
    public List<T> preOrder(boolean print) {
        List<T> list = new LinkedList<T>();
        preOrder(root, list);
        if(print) {
            System.out.println(list);
            return null;
        } else {
            return list;
        }
    }

    /**
     * 中序遍历
     */
    private void inOrder(Node tree, List<T> list) {
        if(tree != null) {
            inOrder(tree.left, list);
            list.add(tree.data);
            inOrder(tree.right, list);
        }
    }
    public List<T> inOrder(boolean print) {
        List<T> list = new LinkedList<T>();
        inOrder(root, list);
        if(print) {
            System.out.println(list);
            return null;
        } else {
            return list;
        }
    }

    /**
     * 后序遍历
     */
    private void postOrder(Node tree, List<T> list) {
        if(tree != null)
        {
            postOrder(tree.left, list);
            postOrder(tree.right, list);
            list.add(tree.data);
        }
    }
    public List<T> postOrder(boolean print) {
        List<T> list = new LinkedList<T>();
        postOrder(root, list);
        if(print) {
            System.out.println(list);
            return null;
        } else {
            return list;
        }
    }

    /**
     * 层次遍历
     */
    private void layerOrder(List<T> list) {
        if(root != null) {
            List<Node> queue = new LinkedList<Node>();
            queue.add(root);
            while (!queue.isEmpty()) {
                Node node = queue.remove(0);
                list.add(node.data);
                if(node.left != null) {
                    queue.add(node.left);
                }
                if(node.right != null) {
                    queue.add(node.right);
                }
            }
        }
    }
    public List<T> layerOrder(boolean print) {
        List<T> list = new LinkedList<T>();
        this.layerOrder(list);
        if(print) {
            System.out.println(list);
            return null;
        } else {
            return list;
        }
    }

    /**
     * 普通二叉树转换为数组二叉树
     */
    private void toArrayTree(Object[] array, Node root, int start, T emptyData) {
        int lnode = 2*start + 1;
        int rnode = 2*start + 2;
        if(start >= (int)(Math.pow(2, this.getHeight())-1)) return;
        if(root == null) {
            array[start] = emptyData;
            toArrayTree(array, null, lnode, emptyData);
            toArrayTree(array, null, rnode, emptyData);
        } else {
            array[start] = root.data;
            toArrayTree(array, root.left, lnode, emptyData);
            toArrayTree(array, root.right, rnode, emptyData);
        }
    }
    public Object[] toArrayTree(T emptyData) {
        Object[] array = new Object[(int)(Math.pow(2, this.getHeight())-1)];
        this.toArrayTree(array, this.root, 0, emptyData);
        return array;
    }

    /**
     * 将数组二叉树转化为普通二叉树
     */
    private Node arrayToTree(List<T> list, int start, T emptyData) {
        if(list.get(start).compareTo(emptyData) == 0) {
            return null;
        }
        Node root = new Node(list.get(start));
        int lnode = 2*start + 1;
        int rnode = 2*start + 2;
        if(lnode > list.size() -1) {
            root.left = null;
        } else {
            root.left = arrayToTree(list, lnode, emptyData);
        }
        if(rnode > list.size() -1) {
            root.right = null;
        } else {
            root.right = arrayToTree(list, rnode, emptyData);
        }
        return root;
    }
    public void arrayToTree(T[] array, T emptyData) {
        List<T> list = new LinkedList<T>(Arrays.asList(array));
        this.root = arrayToTree(list, 0, emptyData);
    }

    /**
     * 将String广义表转换为二叉树
     */
    private Node stringListsToTreeFun(String lists, char leftMark, char rightMark, char midMark, String emptyData) {
        if(lists.equals(emptyData)) return null;
        int index = lists.indexOf(leftMark);
        Node root = null;
        if(index == -1) {
            root = new Node((T)lists);
            return root;
        }
        root = new Node((T)lists.substring(0, index));
        List<Character> queue = new LinkedList<Character>();
        int midIndex = 0;
        int i = lists.indexOf(leftMark)+1;
        queue.add(leftMark);
        while(!queue.isEmpty()) {
            if(lists.charAt(i) == leftMark) {
                queue.add(leftMark);
            } else if(lists.charAt(i) == rightMark) {
                if(queue.get(queue.size()-1) == midMark && queue.get(queue.size()-2) == leftMark) {
                    queue.remove(queue.size()-1);
                    queue.remove(queue.size()-1);
                } else {
                    queue.add(rightMark);
                }
            } else if(lists.charAt(i) == midMark) {
                if(queue.size() == 1) {
                    midIndex = i;
                    break;
                } else {
                    queue.add(midMark);
                    midIndex = i;
                }
            }
            i++;
        }
        root.left = stringListsToTreeFun(lists.substring(lists.indexOf(leftMark)+1, midIndex), leftMark, rightMark, midMark, emptyData);
        root.right = stringListsToTreeFun(lists.substring(midIndex+1, lists.lastIndexOf(rightMark)), leftMark, rightMark, midMark, emptyData);
        return root;
    }
    public void stringListsToTree(String lists, char leftMark, char rightMark, char midMark, String emptyData) {
        this.root = stringListsToTreeFun(lists, leftMark, rightMark, midMark, emptyData);
    }

    /**
     * 将二叉树转换为String广义表
     */
    private String toListsString(Node root, char leftMark, char rightMark, char midMark, String emptyData) {
        if(root != null) {
            if(root.left != null || root.right != null) {
                String leftString = emptyData;
                String rightString = emptyData;
                if(root.left != null) leftString = toListsString(root.left, leftMark, rightMark, midMark, emptyData);
                if(root.right != null) rightString = toListsString(root.right, leftMark, rightMark, midMark, emptyData);
                return root.data.toString()+leftMark+leftString+midMark+rightString+rightMark;
            } else {
                return root.data.toString();
            }
        }
        return "";
    }
    public String toListsString(char leftMark, char rightMark, char midMark, String emptyData) {
        return toListsString(this.root, leftMark, rightMark, midMark, emptyData);
    }

    /**
     * 判断是否是叶节点
     */
    public boolean isLeafNode(Node node) {
        if(node.left == null && node.right == null) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * 获得二叉树叶节点的个数
     */
    public int LeafNodeSize() {
        if(root != null) {
            int size = 0;
            List<Node> queue = new LinkedList<Node>();
            queue.add(root);
            while (!queue.isEmpty()) {
                Node node = queue.remove(0);
                if(node.left == null && node.right == null) size++;
                if(node.left != null) {
                    queue.add(node.left);
                }
                if(node.right != null) {
                    queue.add(node.right);
                }
            }
            return size;
        }
        return 0;
    }

    /**
     * 获得叶节点列表，层次遍历
     */
    public List<T> LeafNodeList() {
        if(root != null) {
            List<T> list = new LinkedList<T>();
            List<Node> queue = new LinkedList<Node>();
            queue.add(root);
            while (!queue.isEmpty()) {
                Node node = queue.remove(0);
                if(node.left == null && node.right == null) {
                    list.add(node.data);
                }
                if(node.left != null) {
                    queue.add(node.left);
                }
                if(node.right != null) {
                    queue.add(node.right);
                }
            }
            return list;
        }
        return null;
    }

    /**
     * 获得叶节点列表，中序遍历
     */
    private void inLeafNodeList(Node tree, List<T> list) {
        if(tree != null) {
            inLeafNodeList(tree.left, list);
            if(tree.left == null && tree.right == null) {
                list.add(tree.data);
            }
            inLeafNodeList(tree.right, list);
        }
    }
    public List<T> inLeafNodeList() {
        if(root != null) {
            List<T> list = new LinkedList<T>();
            this.inLeafNodeList(this.root, list);
            return list;
        }
        return null;
    }

    /**
     * 判断是否是完全二叉树
     */
    public boolean isGoodTree() {
        if(root != null) {
            List<Node> queue = new LinkedList<Node>();
            queue.add(root);
            while(!queue.isEmpty()) {
                Node node = queue.remove(0);
                if(node != null) {
                if(node.left != null) {
                    queue.add(node.left);
                }
                if(node.right != null) {
                    queue.add(node.right);
                }
                if(node.left == null && node.right != null) {
                    return false;
                }
                if (node.left == null && node.right == null) {
                    while (!queue.isEmpty()) {
                        node = queue.get(0);
                        if((node.left != null && node.right == null) || (node.left == null && node.right == null)) {
                            queue.remove(0);
                        } else {
                            return false;
                        }
                    }
                    return true;
                }}
            }
            return true;
        }
        return false;
    }
}
```

class SegmentTree {
    int n;
    int[] tree;

    SegmentTree(int N, int[] A) {
        this.n = N;
        while (Integer.bitCount(n) != 1) {
            n++;
        }
        build(N, A);
    }

    void build(int N, int[] A) {
        tree = new int[2 * n];
        Arrays.fill(tree, Integer.MIN_VALUE);
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = Math.max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    int query(int l, int r) {
        int res = Integer.MIN_VALUE;
        for (l += n, r += n + 1; l < r; l >>= 1, r >>= 1) {
            if ((l & 1) == 1) res = Math.max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.max(res, tree[--r]);
        }
        return res;
    }
}

public class Solution {
    public int[] maxSlidingWindow(int[] nums, int k) {
        int n = nums.length;
        SegmentTree segTree = new SegmentTree(n, nums);
        int[] output = new int[n - k + 1];
        for (int i = 0; i <= n - k; i++) {
            output[i] = segTree.query(i, i + k - 1);
        }
        return output;
    }
}
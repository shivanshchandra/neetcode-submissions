public class SegmentTree {
    public int n;
    public int[] tree;

    public SegmentTree(int N, int[] A) {
        this.n = N;
        while (System.Numerics.BitOperations.PopCount((uint)n) != 1) {
            n++;
        }
        Build(N, A);
    }

    public void Build(int N, int[] A) {
        tree = new int[2 * n];
        Array.Fill(tree, int.MinValue);
        for (int i = 0; i < N; i++) {
            tree[n + i] = A[i];
        }
        for (int i = n - 1; i > 0; --i) {
            tree[i] = Math.Max(tree[i << 1], tree[i << 1 | 1]);
        }
    }

    public int Query(int l, int r) {
        int res = int.MinValue;
        l += n;
        r += n + 1;
        while (l < r) {
            if ((l & 1) == 1) res = Math.Max(res, tree[l++]);
            if ((r & 1) == 1) res = Math.Max(res, tree[--r]);
            l >>= 1;
            r >>= 1;
        }
        return res;
    }
}

public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        int n = nums.Length;
        SegmentTree segTree = new SegmentTree(n, nums);
        int[] output = new int[n - k + 1];
        for (int i = 0; i <= n - k; i++) {
            output[i] = segTree.Query(i, i + k - 1);
        }
        return output;
    }
}
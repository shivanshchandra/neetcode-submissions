class SegmentTree {
    /**
     * @constructor
     * @param {number} N
     * @param {number[]} A
     */
    constructor(N, A) {
        this.n = N;
        while ((this.n & (this.n - 1)) !== 0) {
            this.n++;
        }
        this.build(N, A);
    }

    /**
     * @param {number} N
     * @param {number[]} A
     * @return {void}
     */
    build(N, A) {
        this.tree = new Array(2 * this.n).fill(-Infinity);
        for (let i = 0; i < N; i++) {
            this.tree[this.n + i] = A[i];
        }
        for (let i = this.n - 1; i > 0; i--) {
            this.tree[i] = Math.max(this.tree[i << 1], this.tree[(i << 1) | 1]);
        }
    }

    /**
     * @param {number} l
     * @param {number} r
     * @return {number}
     */
    query(l, r) {
        let res = -Infinity;
        l += this.n;
        r += this.n + 1;

        while (l < r) {
            if (l & 1) res = Math.max(res, this.tree[l++]);
            if (r & 1) res = Math.max(res, this.tree[--r]);
            l >>= 1;
            r >>= 1;
        }

        return res;
    }
}

class Solution {
    /**
     * @param {number[]} nums
     * @param {number} k
     * @return {number[]}
     */
    maxSlidingWindow(nums, k) {
        let n = nums.length;
        let segTree = new SegmentTree(n, nums);
        let output = [];

        for (let i = 0; i <= n - k; i++) {
            output.push(segTree.query(i, i + k - 1));
        }

        return output;
    }
}
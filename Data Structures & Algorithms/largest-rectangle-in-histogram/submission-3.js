class MinIdx_Segtree {
    /**
     * @param {number} N
     * @param {number[]} heights
     */
    constructor(N, heights) {
        this.n = N;
        this.INF = 1e9;
        this.A = heights.slice();
        while ((this.n & (this.n - 1)) !== 0) {
            this.A.push(this.INF);
            this.n++;
        }
        this.tree = new Array(2 * this.n).fill(0);
        this.build();
    }

    build() {
        for (let i = 0; i < this.n; i++) {
            this.tree[this.n + i] = i;
        }
        for (let j = this.n - 1; j >= 1; j--) {
            let a = this.tree[j << 1];
            let b = this.tree[(j << 1) + 1];
            this.tree[j] = this.A[a] <= this.A[b] ? a : b;
        }
    }

    /**
     * @param {number} i
     * @param {number} val
     */
    update(i, val) {
        this.A[i] = val;
        for (let j = (this.n + i) >> 1; j >= 1; j >>= 1) {
            let a = this.tree[j << 1];
            let b = this.tree[(j << 1) + 1];
            this.tree[j] = this.A[a] <= this.A[b] ? a : b;
        }
    }

    /**
     * @param {number} ql
     * @param {number} qh
     * @return {number}
     */
    query(ql, qh) {
        return this._query(1, 0, this.n - 1, ql, qh);
    }

    _query(node, l, h, ql, qh) {
        if (ql > h || qh < l) return this.INF;
        if (l >= ql && h <= qh) return this.tree[node];
        let a = this._query(node << 1, l, (l + h) >> 1, ql, qh);
        let b = this._query((node << 1) + 1, ((l + h) >> 1) + 1, h, ql, qh);
        if (a === this.INF) return b;
        if (b === this.INF) return a;
        return this.A[a] <= this.A[b] ? a : b;
    }
}

class Solution {
    /**
     * @param {number[]} heights
     * @return {number}
     */
    largestRectangleArea(heights) {
        const n = heights.length;
        const st = new MinIdx_Segtree(n, heights);
        return this.getMaxArea(heights, 0, n - 1, st);
    }

    /**
     * @param {number[]} heights
     * @param {number} l
     * @param {number} r
     * @param {MinIdx_Segtree} st
     * @return {number}
     */
    getMaxArea(heights, l, r, st) {
        if (l > r) return 0;
        if (l === r) return heights[l];

        const minIdx = st.query(l, r);
        return Math.max(
            this.getMaxArea(heights, l, minIdx - 1, st),
            this.getMaxArea(heights, minIdx + 1, r, st),
            (r - l + 1) * heights[minIdx],
        );
    }
}
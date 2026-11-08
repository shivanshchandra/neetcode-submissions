class Solution {
    /**
     * @param {number[]} nums1
     * @param {number[]} nums2
     * @return {number}
     */
    findMedianSortedArrays(nums1, nums2) {
        const m = nums1.length;
        const n = nums2.length;
        const left = Math.floor((m + n + 1) / 2);
        const right = Math.floor((m + n + 2) / 2);

        return (
            (this.getKth(nums1, m, nums2, n, left) +
                this.getKth(nums1, m, nums2, n, right)) /
            2.0
        );
    }

    /**
     * @param {number[]} a
     * @param {number} m
     * @param {number[]} b
     * @param {number} n
     * @param {number} k
     * @param {number} aStart
     * @param {number} bStart
     * @return {number}
     */
    getKth(a, m, b, n, k, aStart = 0, bStart = 0) {
        if (m > n) {
            return this.getKth(b, n, a, m, k, bStart, aStart);
        }
        if (m === 0) {
            return b[bStart + k - 1];
        }
        if (k === 1) {
            return Math.min(a[aStart], b[bStart]);
        }

        const i = Math.min(m, Math.floor(k / 2));
        const j = Math.min(n, Math.floor(k / 2));

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return this.getKth(a, m, b, n - j, k - j, aStart, bStart + j);
        } else {
            return this.getKth(a, m - i, b, n, k - i, aStart + i, bStart);
        }
    }
}
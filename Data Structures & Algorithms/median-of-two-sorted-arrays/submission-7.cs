public class Solution {
    public double FindMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.Length;
        int n = nums2.Length;
        int left = (m + n + 1) / 2;
        int right = (m + n + 2) / 2;

        return (GetKth(nums1, m, nums2, n, left, 0, 0) +
                GetKth(nums1, m, nums2, n, right, 0, 0)) / 2.0;
    }

    public int GetKth(int[] a, int m, int[] b, int n, int k, int aStart, int bStart) {
        if (m > n) {
            return GetKth(b, n, a, m, k, bStart, aStart);
        }
        if (m == 0) {
            return b[bStart + k - 1];
        }
        if (k == 1) {
            return Math.Min(a[aStart], b[bStart]);
        }

        int i = Math.Min(m, k / 2);
        int j = Math.Min(n, k / 2);

        if (a[aStart + i - 1] > b[bStart + j - 1]) {
            return GetKth(a, m, b, n - j, k - j, aStart, bStart + j);
        }
        else {
            return GetKth(a, m - i, b, n, k - i, aStart + i, bStart);
        }
    }
}
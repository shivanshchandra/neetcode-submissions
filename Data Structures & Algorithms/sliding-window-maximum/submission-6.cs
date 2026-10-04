public class Solution {
    public int[] MaxSlidingWindow(int[] nums, int k) {
        PriorityQueue<(int val, int idx), int> pq = new PriorityQueue<(int val, int idx), int>(
            Comparer<int>.Create((a, b) => b.CompareTo(a))
        );

        int[] output = new int[nums.Length - k + 1];
        int idx = 0;

        for (int i = 0; i < nums.Length; i++) {
            pq.Enqueue((nums[i], i), nums[i]);

            if (i >= k - 1) {
                while (pq.Peek().idx <= i - k) {
                    pq.Dequeue();
                }
                output[idx++] = pq.Peek().val;
            }
        }

        return output;
    }
}
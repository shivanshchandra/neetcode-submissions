public class Solution {
    public int Search(int[] nums, int target) {
        int index = Array.BinarySearch(nums, target);
        return index >= 0 ? index : -1;
    }
}
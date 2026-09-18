class Solution {
    public int[] topKFrequent(int[] nums, int k) {

        // Step 1: Count frequency
        HashMap<Integer, Integer> map = new HashMap<>();

        for (int num : nums) {
            map.put(num, map.getOrDefault(num, 0) + 1);
        }

        // Step 2: Create buckets
        List<Integer>[] bucket = new List[nums.length + 1];

        for (int i = 0; i < bucket.length; i++) {
            bucket[i] = new ArrayList<>();
        }

        // Step 3: Put numbers into their frequency bucket
        for (int num : map.keySet()) {
            int frequency = map.get(num);
            bucket[frequency].add(num);
        }

        // Step 4: Take top k elements from highest frequency
        int[] result = new int[k];
        int index = 0;

        for (int i = bucket.length - 1; i >= 0 && index < k; i--) {

            for (int num : bucket[i]) {
                result[index] = num;
                index++;

                if (index == k) {
                    break;
                }
            }
        }

        return result;
    }
}
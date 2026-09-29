public class Solution {
    public int MaxProfit(int[] prices) {
        int maxP = 0;
        int minBuy = prices[0];

        foreach (int sell in prices) {
            maxP = Math.Max(maxP, sell - minBuy);
            minBuy = Math.Min(minBuy, sell);
        }
        return maxP;
    }
}
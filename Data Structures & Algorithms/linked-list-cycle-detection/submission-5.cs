/**
 * Definition for singly-linked list.
 * public class ListNode {
 *     public int val;
 *     public ListNode next;
 *     public ListNode(int val=0, ListNode next=null) {
 *         this.val = val;
 *         this.next = next;
 *     }
 * }
 */

public class Solution {
    public bool HasCycle(ListNode head) {
        HashSet<ListNode> seen = new HashSet<ListNode>();
        ListNode cur = head;
        while (cur != null) {
            if (seen.Contains(cur)) {
                return true;
            }
            seen.Add(cur);
            cur = cur.next;
        }
        return false;
    }
}
class Solution:
    def isAnagram(self, s: str, t: str) -> bool:
        # this one line code can also give result for this question
        # as Counter is data structire in python which is hashmap but counts the things automatically for you. So we can run a counter onn s and one on t and if they arew equal then ture otherwise false. 
        return Counter(s) == Counter(t)
class Solution {
    /**
     * @param {string} s1
     * @param {string} s2
     * @return {boolean}
     */
    checkInclusion(s1, s2) {
        let count1 = {};
        for (let c of s1) {
            count1[c] = (count1[c] || 0) + 1;
        }

        let need = Object.keys(count1).length;
        for (let i = 0; i < s2.length; i++) {
            let count2 = {};
            let cur = 0;
            for (let j = i; j < s2.length; j++) {
                let c = s2[j];
                count2[c] = (count2[c] || 0) + 1;

                if ((count1[c] || 0) < count2[c]) {
                    break;
                }

                if ((count1[c] || 0) === count2[c]) {
                    cur++;
                }

                if (cur === need) {
                    return true;
                }
            }
        }
        return false;
    }
}
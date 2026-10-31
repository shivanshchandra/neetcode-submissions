public class TimeMap {
    private Dictionary<string, SortedList<int, string>> m;

    public TimeMap() {
        m = new Dictionary<string, SortedList<int, string>>();
    }

    public void Set(string key, string value, int timestamp) {
        if (!m.ContainsKey(key)) {
            m[key] = new SortedList<int, string>();
        }
        m[key][timestamp] = value;
    }

    public string Get(string key, int timestamp) {
        if (!m.ContainsKey(key)) return "";
        var timestamps = m[key];
        int left = 0;
        int right = timestamps.Count - 1;

        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (timestamps.Keys[mid] == timestamp) {
                return timestamps.Values[mid];
            } else if (timestamps.Keys[mid] < timestamp) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }

        if (right >= 0) {
            return timestamps.Values[right];
        }
        return "";
    }
}
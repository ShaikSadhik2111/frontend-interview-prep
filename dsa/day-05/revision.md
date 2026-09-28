# Day 5 Revision

Fixed window = exactly k elements.

Variable window = expand right, contract left until valid.

Window length = right - left + 1.

Typical time = O(n). Space depends on tracked state.

Interview proof: pointers move forward only, so total pointer movement is linear.
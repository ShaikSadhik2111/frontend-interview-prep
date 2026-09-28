function longestUniqueSubstring(s){const seen=new Set();let left=0,best=0;for(let right=0;right<s.length;right++){while(seen.has(s[right]))seen.delete(s[left++]);seen.add(s[right]);best=Math.max(best,right-left+1)}return best}
function maxSumSizeK(nums,k){if(k<=0||k>nums.length)return null;let sum=0;for(let i=0;i<k;i++)sum+=nums[i];let best=sum;for(let r=k;r<nums.length;r++){sum+=nums[r]-nums[r-k];best=Math.max(best,sum)}return best}
console.log(longestUniqueSubstring('abcabcbb')); console.log(maxSumSizeK([2,1,5,1,3,2],3));

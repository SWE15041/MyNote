#!/bin/bash
arr=(a b "c" d)
echo "first element: ${arr[0]}"
echo "loop char arr:";
for i in ${arr[@]}
do 
   echo "$i"
done

echo "loop number arr"
for i in 1 2 3 4 5
do
   echo "$i"
done

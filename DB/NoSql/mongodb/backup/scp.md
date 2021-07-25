## 
1. backup  
`mongodump -d student`  
2. copy  
`scp -r dump/student zhaixiang@pi:~/ `  
3. restore  
`mongorestore -d student ./student`   


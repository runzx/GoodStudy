#!/bin/sh
backupFolder=/data/mongodb/
dateNow=`date +%Y_%m_%d_%H_%M`
#backupFileName=db_$dateNow
cd $backupFolder

db=pd123
backupFileName=$db-$dateNow
mkdir -p $backupFileName
mongodump -h localhost:27017 -d $db -o $backupFileName
tar zcvf $backupFileName.tar.gz $backupFileName
rm -rf $backupFileName

db=student
backupFileName=$db-$dateNow
mkdir -p $backupFileName
mongodump -h localhost:27017 -d $db -o $backupFileName
tar zcvf $backupFileName.tar.gz $backupFileName
rm -rf $backupFileName
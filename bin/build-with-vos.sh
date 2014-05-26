#!/bin/bash

# Change to the 'target' folder
targetDir="../target"

cd `dirname "$0"`
mkdir -p "$targetDir"
cd "$targetDir"



# Simple script for building and installing virtuoso open source from source
# Usage: install-vos.sh [version]
# Example: ./install-vos.sh 6.1.5

version="$1"

if [ -z "$version" ]; then
    echo "Please specify the virtuoso open source version to install. e.g. 6.1.5"
    exit 1
fi

sudo apt-get install autoconf automake libtool flex bison gperf gawk m4 make openssl libssl-dev libreadline-dev

#For centos (and the likes)
#sudo yum install autoconf automake flex bison gperf gawk m4 make readline-devel openssl-devel 

mkdir -p cache
cd cache

virtFileBase="virtuoso-opensource-$version"

if [ ! -f "$virtFileBase.tar.gz.md5" ]; then
    wget -c "http://downloads.sourceforge.net/project/virtuoso/virtuoso/$version/$virtFileBase.tar.gz"
    md5sum "$virtFileBase.tar.gz" > "$virtFileBase.tar.gz.md5"
fi

if [ ! -d "$virtFileBase" ]; then
    tar -zxf "$virtFileBase.tar.gz"
fi


dbpFileBase="dbpedia-vad-i18n"

if [ ! -d "$dbpFileBase" ]; then
    git clone "https://github.com/lukovnikov/$dbpFileBase.git"
fi

cd "$dbpFileBase"
git pull
cd ..

cp -rf "$dbpFileBase"'/dbpedia/' "$virtFileBase/binsrc/dbpedia"

cd "$virtFileBase"


./configure --with-readline=/usr/lib/libreadline.so
make





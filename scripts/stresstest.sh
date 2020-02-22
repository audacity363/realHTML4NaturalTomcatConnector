#!/bin/bash

prog() {
    local w=80 p=$1;  shift
    # create a string of spaces, then change them to dots
    printf -v dots "%*s" "$(( $p*$w/100 ))" ""; dots=${dots// /=};
    # print those dots on a fixed-width space plus the percentage etc. 
    printf "\r\e[K|%-*s| %3d %% %s" "$w" "$dots" "$p" "$*"; 
}

i=0
errors=0

while [ $i -ne 20000 ];
do
    clear;
    printf "Request %.5d/20000\n" $i;
    let percent=($i * 100)/20000
    prog "$percent"
    output=`curl -s -o /dev/null -w "%{http_code}" http://localhost:8080/realHTML4Natural/nat/env1/simple`
    if [ $? -ne 0 ]
    then
        printf "Something went totally wrong\n"
        exit 0;   
    fi

    if [ $output -ne '200' ]
    then
        errors=`expr $errors + 1`;
    fi
    
    i=`expr $i + 1`
done
echo

printf "Errors: %d\n" 
